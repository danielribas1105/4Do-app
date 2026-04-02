import { BackupBanner } from "@/src/components/backup-banner"
import { QuadrantPanel } from "@/src/components/quadrant-panel"
import { TaskModal } from "@/src/components/task-modal"
import { Colors } from "@/src/constants/colors"
import { QUADRANTS } from "@/src/constants/quadrants"
import { useStorage } from "@/src/hooks/use-storage"
import { AboutScreen } from "@/src/screens/about-screen"
import { SettingsScreen } from "@/src/screens/settings-screen"
import { SplashScreen } from "@/src/screens/splash-screen"
import { FilterType, Task } from "@/src/types/other-types"
import { Quadrant } from "@/src/types/quadrants-config"
import { Ionicons } from "@expo/vector-icons"
import React, { useCallback, useState } from "react"
import {
   Alert,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

type Tab = "matrix" | "settings" | "about"

export default function App() {
   const {
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
   } = useStorage()

   const [activeTab, setActiveTab] = useState<Tab>("matrix")
   const [modalVisible, setModalVisible] = useState(false)
   const [editingTask, setEditingTask] = useState<Task | null>(null)
   const [defaultQ, setDefaultQ] = useState<Quadrant>("Q1")
   const [filter, setFilter] = useState<FilterType>("active")
   const [showSplash, setShowSplash] = useState(true)

   const openNewTask = useCallback((quadrant: Quadrant) => {
      setEditingTask(null)
      setDefaultQ(quadrant)
      setModalVisible(true)
   }, [])

   const openEdit = useCallback((task: Task) => {
      setEditingTask(task)
      setDefaultQ(task.quadrant)
      setModalVisible(true)
   }, [])

   const handleSave = useCallback(
      (task: Task) => {
         if (editingTask) {
            updateTask(task)
         } else {
            addTask(task)
         }
      },
      [editingTask, addTask, updateTask],
   )

   const handleClearCompleted = useCallback(() => {
      const active = tasks.filter((t) => !t.completed)
      // Rebuild storage via repeated deletes or direct overwrite through save mechanism
      tasks.filter((t) => t.completed).forEach((t) => deleteTask(t.id))
   }, [tasks, deleteTask])

   const handleImport = useCallback(async () => {
      const success = await importBackup()
      Alert.alert(
         success ? "Backup importado!" : "Erro",
         success
            ? "Suas tarefas foram restauradas com sucesso."
            : "Não foi possível importar o backup. Verifique o arquivo.",
      )
   }, [importBackup])

   const handleExport = useCallback(async () => {
      await exportBackup()
   }, [exportBackup])

   const getFilteredTasks = useCallback(
      (quadrant: Quadrant) => {
         return tasks.filter((t) => {
            if (t.quadrant !== quadrant) return false
            if (filter === "active") return !t.completed
            if (filter === "completed") return t.completed
            return true
         })
      },
      [tasks, filter],
   )

   const activeTotalCount = tasks.filter((t) => !t.completed).length
   const completedTotalCount = tasks.filter((t) => t.completed).length

   /* if (loading) {
      return (
         <View style={styles.loading}>
            <Text style={styles.loadingEmoji}>⚡</Text>
            <Text style={styles.loadingText}>Carregando tarefas...</Text>
         </View>
      )
   } */

   return (
      <SafeAreaProvider>
         <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
               <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

               {showSplash && (
                  <SplashScreen ready={!loading} onFinish={() => setShowSplash(false)} />
               )}

               {/* Header */}
               <View style={styles.header}>
                  <View>
                     <Text style={styles.appTitle}>4Do - Task Matrix</Text>
                     <Text style={styles.appSubtitle}>
                        {activeTotalCount} ativa{activeTotalCount !== 1 ? "s" : ""} ·{" "}
                        {completedTotalCount} concluída{completedTotalCount !== 1 ? "s" : ""}
                     </Text>
                  </View>
                  <TouchableOpacity onPress={() => openNewTask("Q1")} style={styles.fabHeader}>
                     <Ionicons name="add" size={22} color="#FFF" />
                  </TouchableOpacity>
               </View>

               {/* Tab Bar */}
               <View style={styles.tabBar}>
                  {(["matrix", "settings", "about"] as Tab[]).map((tab) => (
                     <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        style={[styles.tab, activeTab === tab && styles.tabActive]}
                     >
                        <Ionicons
                           name={
                              tab === "matrix"
                                 ? "grid-outline"
                                 : tab === "settings"
                                   ? "settings-outline"
                                   : "information-circle-outline"
                           }
                           size={16}
                           color={activeTab === tab ? Colors.foreground : Colors.muted}
                        />
                        <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                           {tab === "matrix" ? "Matriz" : tab === "settings" ? "Config" : "Sobre"}
                        </Text>
                     </TouchableOpacity>
                  ))}
               </View>

               {activeTab === "matrix" && (
                  <>
                     {/* Filter Pills */}
                     <View style={styles.filterRow}>
                        {(["all", "active", "completed"] as FilterType[]).map((f) => (
                           <TouchableOpacity
                              key={f}
                              onPress={() => setFilter(f)}
                              style={[styles.filterPill, filter === f && styles.filterPillActive]}
                           >
                              <Text
                                 style={[
                                    styles.filterPillText,
                                    filter === f && styles.filterPillTextActive,
                                 ]}
                              >
                                 {f === "all" ? "Todas" : f === "active" ? "Ativas" : "Concluídas"}
                              </Text>
                           </TouchableOpacity>
                        ))}
                     </View>

                     <ScrollView
                        style={styles.scroll}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                     >
                        {/* Backup Banner */}
                        {backupSuggestion && (
                           <BackupBanner
                              onBackup={handleExport}
                              onDismiss={dismissBackupSuggestion}
                           />
                        )}

                        {/* Eisenhower Matrix Legend */}
                        <View style={styles.matrixLegend}>
                           <View style={styles.legendAxis}>
                              <Text style={styles.legendAxisLabel}>↑ IMPORTANTE ↓</Text>
                           </View>
                           <View style={styles.legendAxisH}>
                              <Text style={styles.legendAxisLabel}>← NÃO URGENTE · URGENTE →</Text>
                           </View>
                        </View>

                        {/* Quadrant Panels */}
                        {QUADRANTS.map((q) => {
                           const filteredTasks =
                              filter === "all"
                                 ? tasks.filter((t) => t.quadrant === q.id)
                                 : filter === "active"
                                   ? tasks.filter((t) => t.quadrant === q.id && !t.completed)
                                   : tasks.filter((t) => t.quadrant === q.id && t.completed)

                           return (
                              <QuadrantPanel
                                 key={q.id}
                                 quadrant={q}
                                 tasks={filteredTasks}
                                 onAddTask={() => openNewTask(q.id)}
                                 onToggle={toggleComplete}
                                 onEdit={openEdit}
                                 onDelete={deleteTask}
                              />
                           )
                        })}

                        <View style={{ height: 32 }} />
                     </ScrollView>
                  </>
               )}
               {activeTab === "settings" && (
                  <SettingsScreen
                     taskCount={tasks.length}
                     lastBackupDate={lastBackupDate}
                     onExport={handleExport}
                     onImport={handleImport}
                     onClearCompleted={handleClearCompleted}
                  />
               )}
               {activeTab === "about" && <AboutScreen />}

               {/* Task Modal */}
               <TaskModal
                  visible={modalVisible}
                  editTask={editingTask}
                  defaultQuadrant={defaultQ}
                  onSave={handleSave}
                  onClose={() => {
                     setModalVisible(false)
                     setEditingTask(null)
                  }}
               />
            </SafeAreaView>
         </GestureHandlerRootView>
      </SafeAreaProvider>
   )
}

const styles = StyleSheet.create({
   safe: {
      flex: 1,
      backgroundColor: Colors.background,
   },
   loading: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.background,
      gap: 12,
   },
   loadingEmoji: { fontSize: 60 },
   loadingText: {
      fontSize: 20,
      color: Colors.muted,
      fontWeight: "600",
   },
   header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 12,
   },
   appTitle: {
      fontSize: 28,
      fontWeight: "900",
      color: Colors.foreground,
      letterSpacing: -0.8,
   },
   appSubtitle: {
      fontSize: 12,
      color: Colors.muted,
      fontWeight: "500",
      marginTop: 2,
   },
   fabHeader: {
      backgroundColor: Colors.accent,
      width: 42,
      height: 42,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
   },
   tabBar: {
      flexDirection: "row",
      marginHorizontal: 20,
      backgroundColor: "#F3F4F6",
      borderRadius: 12,
      padding: 4,
      marginBottom: 12,
   },
   tab: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 8,
      borderRadius: 9,
   },
   tabActive: {
      backgroundColor: "#FFF",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 1,
   },
   tabText: {
      fontSize: 13,
      fontWeight: "600",
      color: Colors.muted,
   },
   tabTextActive: {
      color: Colors.foreground,
   },
   filterRow: {
      flexDirection: "row",
      gap: 8,
      paddingHorizontal: 20,
      marginBottom: 12,
   },
   filterPill: {
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 6,
      backgroundColor: "#F3F4F6",
   },
   filterPillActive: {
      backgroundColor: Colors.foreground,
   },
   filterPillText: {
      fontSize: 12,
      fontWeight: "700",
      color: "#6B7280",
   },
   filterPillTextActive: {
      color: "#FFF",
   },
   scroll: { flex: 1 },
   scrollContent: {
      paddingHorizontal: 16,
      paddingTop: 4,
   },
   matrixLegend: {
      marginBottom: 12,
      gap: 2,
   },
   legendAxis: {
      alignItems: "center",
   },
   legendAxisH: {
      alignItems: "center",
   },
   legendAxisLabel: {
      fontSize: 9,
      color: "#D1D5DB",
      fontWeight: "700",
      letterSpacing: 1,
      textTransform: "uppercase",
   },
})
