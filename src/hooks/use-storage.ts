import AsyncStorage from "@react-native-async-storage/async-storage"
import { differenceInDays, parseISO } from "date-fns"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import { useCallback, useEffect, useState } from "react"
import {
   APP_VERSION,
   BACKUP_INTERVAL_DAYS,
   BACKUP_METADATA_KEY,
   STORAGE_KEY,
} from "../constants/other-constants"
import { BackupMetadata, Task } from "../types/other-types"

export function useStorage() {
   const [tasks, setTasks] = useState<Task[]>([])
   const [loading, setLoading] = useState(true)
   const [lastBackupDate, setLastBackupDate] = useState<string | null>(null)
   const [backupSuggestion, setBackupSuggestion] = useState(false)

   // Load tasks from AsyncStorage
   const loadTasks = useCallback(async () => {
      try {
         const stored = await AsyncStorage.getItem(STORAGE_KEY)
         if (stored) {
            setTasks(JSON.parse(stored))
         }
         const lastBackup = await AsyncStorage.getItem(BACKUP_METADATA_KEY)
         if (lastBackup) {
            setLastBackupDate(lastBackup)
            const daysSince = differenceInDays(new Date(), parseISO(lastBackup))
            if (daysSince >= BACKUP_INTERVAL_DAYS) {
               setBackupSuggestion(true)
            }
         } else {
            // First time — suggest backup after some tasks
            setLastBackupDate(null)
         }
      } catch (e) {
         console.error("Error loading tasks:", e)
      } finally {
         setLoading(false)
      }
   }, [])

   useEffect(() => {
      loadTasks()
   }, [loadTasks])

   // Persist tasks
   const saveTasks = useCallback(async (updatedTasks: Task[]) => {
      try {
         await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))
         setTasks(updatedTasks)
      } catch (e) {
         console.error("Error saving tasks:", e)
      }
   }, [])

   const addTask = useCallback(
      async (task: Task) => {
         const updated = [task, ...tasks]
         await saveTasks(updated)
      },
      [tasks, saveTasks],
   )

   const updateTask = useCallback(
      async (updated: Task) => {
         const newTasks = tasks.map((t) => (t.id === updated.id ? updated : t))
         await saveTasks(newTasks)
      },
      [tasks, saveTasks],
   )

   const deleteTask = useCallback(
      async (id: string) => {
         const newTasks = tasks.filter((t) => t.id !== id)
         await saveTasks(newTasks)
      },
      [tasks, saveTasks],
   )

   const toggleComplete = useCallback(
      async (id: string) => {
         const newTasks = tasks.map((t) => {
            if (t.id !== id) return t
            return {
               ...t,
               completed: !t.completed,
               completedAt: !t.completed ? new Date().toISOString() : undefined,
            }
         })
         await saveTasks(newTasks)
      },
      [tasks, saveTasks],
   )

   // Export backup as JSON file
   const exportBackup = useCallback(async () => {
      try {
         const backup: BackupMetadata = {
            version: APP_VERSION,
            createdAt: new Date().toISOString(),
            taskCount: tasks.length,
            tasks,
         }
         const fileName = `eisenhower-backup-${new Date().toISOString().split("T")[0]}.json`
         const fileUri = FileSystem.documentDirectory + fileName
         await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(backup, null, 2), {
            encoding: FileSystem.EncodingType.UTF8,
         })
         await Sharing.shareAsync(fileUri, {
            mimeType: "application/json",
            dialogTitle: "Salvar Backup das Tarefas",
         })
         const now = new Date().toISOString()
         await AsyncStorage.setItem(BACKUP_METADATA_KEY, now)
         setLastBackupDate(now)
         setBackupSuggestion(false)
         return true
      } catch (e) {
         console.error("Error exporting backup:", e)
         return false
      }
   }, [tasks])

   // Import backup from JSON file
   const importBackup = useCallback(async () => {
      try {
         const result = await DocumentPicker.getDocumentAsync({
            type: "application/json",
            copyToCacheDirectory: true,
         })
         if (result.canceled || !result.assets?.[0]) return false
         const content = await FileSystem.readAsStringAsync(result.assets[0].uri)
         const backup: BackupMetadata = JSON.parse(content)
         if (!backup.tasks || !Array.isArray(backup.tasks)) {
            throw new Error("Arquivo de backup inválido")
         }
         await saveTasks(backup.tasks)
         return true
      } catch (e) {
         console.error("Error importing backup:", e)
         return false
      }
   }, [saveTasks])

   const dismissBackupSuggestion = useCallback(() => {
      setBackupSuggestion(false)
   }, [])

   return {
      tasks,
      loading,
      lastBackupDate,
      backupSuggestion,
      addTask,
      updateTask,
      deleteTask,
      toggleComplete,
      exportBackup,
      importBackup,
      dismissBackupSuggestion,
   }
}
