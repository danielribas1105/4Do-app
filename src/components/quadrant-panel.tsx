import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Task } from "../types/other-types"
import { QuadrantConfig } from "../types/quadrants-config"
import { TaskCard } from "./task-card"

interface Props {
   quadrant: QuadrantConfig
   tasks: Task[]
   onAddTask: () => void
   onToggle: (id: string) => void
   onEdit: (task: Task) => void
   onDelete: (id: string) => void
   compact?: boolean
}

export function QuadrantPanel({
   quadrant,
   tasks,
   onAddTask,
   onToggle,
   onEdit,
   onDelete,
   compact = false,
}: Props) {
   const activeTasks = tasks.filter((t) => !t.completed)
   const completedTasks = tasks.filter((t) => t.completed)

   return (
      <View
         style={[
            styles.panel,
            { borderColor: quadrant.color + "30", borderTopColor: quadrant.color },
         ]}
      >
         {/* Header */}
         <View style={styles.header}>
            <View style={styles.headerLeft}>
               <Text style={styles.emoji}>{quadrant.emoji}</Text>
               <View>
                  <Text style={[styles.title, { color: quadrant.color }]}>{quadrant.label}</Text>
                  <Text style={styles.subtitle}>{quadrant.subtitle}</Text>
               </View>
            </View>
            <View style={styles.headerRight}>
               {activeTasks.length > 0 && (
                  <View style={[styles.badge, { backgroundColor: quadrant.color + "18" }]}>
                     <Text style={[styles.badgeText, { color: quadrant.color }]}>
                        {activeTasks.length}
                     </Text>
                  </View>
               )}
               <TouchableOpacity
                  onPress={onAddTask}
                  style={[styles.addBtn, { backgroundColor: quadrant.color }]}
               >
                  <Ionicons name="add" size={16} color="#FFF" />
               </TouchableOpacity>
            </View>
         </View>

         {/* Tasks */}
         {tasks.length === 0 ? (
            <TouchableOpacity onPress={onAddTask} style={styles.emptyState}>
               <Ionicons name="add-circle-outline" size={20} color="#D1D5DB" />
               <Text style={styles.emptyText}>Adicionar tarefa</Text>
            </TouchableOpacity>
         ) : (
            <View style={styles.taskList}>
               {activeTasks.map((task) => (
                  <TaskCard
                     key={task.id}
                     task={task}
                     quadrant={quadrant}
                     onToggle={onToggle}
                     onEdit={onEdit}
                     onDelete={onDelete}
                  />
               ))}
               {completedTasks.length > 0 && (
                  <>
                     <View style={styles.completedDivider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>Concluídas ({completedTasks.length})</Text>
                        <View style={styles.dividerLine} />
                     </View>
                     {completedTasks.map((task) => (
                        <TaskCard
                           key={task.id}
                           task={task}
                           quadrant={quadrant}
                           onToggle={onToggle}
                           onEdit={onEdit}
                           onDelete={onDelete}
                        />
                     ))}
                  </>
               )}
            </View>
         )}
      </View>
   )
}

const styles = StyleSheet.create({
   panel: {
      backgroundColor: "#FFF",
      borderRadius: 16,
      borderWidth: 1,
      borderTopWidth: 3,
      padding: 14,
      marginBottom: 14,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 2,
   },
   header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
   },
   headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
   },
   emoji: { fontSize: 22 },
   title: {
      fontSize: 15,
      fontWeight: "800",
      letterSpacing: -0.3,
   },
   subtitle: {
      fontSize: 11,
      color: "#9CA3AF",
      marginTop: 1,
   },
   headerRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
   },
   badge: {
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 2,
      minWidth: 24,
      alignItems: "center",
   },
   badgeText: {
      fontSize: 12,
      fontWeight: "800",
   },
   addBtn: {
      width: 28,
      height: 28,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
   },
   emptyState: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 16,
   },
   emptyText: {
      fontSize: 13,
      color: "#D1D5DB",
   },
   taskList: { gap: 0 },
   completedDivider: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginVertical: 8,
   },
   dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: "#F3F4F6",
   },
   dividerText: {
      fontSize: 10,
      color: "#D1D5DB",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
   },
})
