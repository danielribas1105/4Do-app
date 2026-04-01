import { Ionicons } from "@expo/vector-icons"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import React, { useState } from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Task } from "../types/other-types"
import { QuadrantConfig } from "../types/quadrants-config"

interface Props {
   task: Task
   quadrant: QuadrantConfig
   onToggle: (id: string) => void
   onEdit: (task: Task) => void
   onDelete: (id: string) => void
}

export function TaskCard({ task, quadrant, onToggle, onEdit, onDelete }: Props) {
   const [pressed, setPressed] = useState(false)

   const handleDelete = () => {
      Alert.alert("Excluir Tarefa", `Deseja excluir "${task.title}"?`, [
         { text: "Cancelar", style: "cancel" },
         { text: "Excluir", style: "destructive", onPress: () => onDelete(task.id) },
      ])
   }

   return (
      <TouchableOpacity
         onPress={() => onEdit(task)}
         onPressIn={() => setPressed(true)}
         onPressOut={() => setPressed(false)}
         activeOpacity={0.85}
         style={[
            styles.card,
            {
               backgroundColor: task.completed ? "#F9FAFB" : "#FFFFFF",
               borderLeftColor: quadrant.color,
               opacity: pressed ? 0.92 : 1,
               transform: [{ scale: pressed ? 0.985 : 1 }],
               shadowColor: quadrant.color,
            },
         ]}
      >
         {/* Checkbox + Title Row */}
         <View style={styles.row}>
            <TouchableOpacity
               onPress={() => onToggle(task.id)}
               hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
               style={[
                  styles.checkbox,
                  {
                     backgroundColor: task.completed ? quadrant.color : "transparent",
                     borderColor: task.completed ? quadrant.color : "#D1D5DB",
                  },
               ]}
            >
               {task.completed && <Ionicons name="checkmark" size={12} color="#FFF" />}
            </TouchableOpacity>

            <Text style={[styles.title, task.completed && styles.titleCompleted]} numberOfLines={2}>
               {task.title}
            </Text>

            <TouchableOpacity
               onPress={handleDelete}
               hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
               style={styles.deleteBtn}
            >
               <Ionicons name="trash-outline" size={16} color="#9CA3AF" />
            </TouchableOpacity>
         </View>

         {/* Description */}
         {task.description ? (
            <Text style={styles.description} numberOfLines={2}>
               {task.description}
            </Text>
         ) : null}

         {/* Footer */}
         <View style={styles.footer}>
            {task.dueDate ? (
               <View style={styles.dueDateRow}>
                  <Ionicons name="calendar-outline" size={11} color="#9CA3AF" />
                  <Text style={styles.dueDate}>
                     {format(new Date(task.dueDate), "d MMM", { locale: ptBR })}
                  </Text>
               </View>
            ) : null}
            {task.tags && task.tags.length > 0 ? (
               <View style={styles.tags}>
                  {task.tags.slice(0, 2).map((tag) => (
                     <View
                        key={tag}
                        style={[styles.tag, { backgroundColor: quadrant.color + "18" }]}
                     >
                        <Text style={[styles.tagText, { color: quadrant.color }]}>#{tag}</Text>
                     </View>
                  ))}
               </View>
            ) : null}
            <Text style={styles.date}>
               {format(new Date(task.createdAt), "d/MM", { locale: ptBR })}
            </Text>
         </View>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   card: {
      borderRadius: 12,
      borderLeftWidth: 3,
      padding: 12,
      marginBottom: 8,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
   },
   row: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
   },
   checkbox: {
      width: 20,
      height: 20,
      borderRadius: 6,
      borderWidth: 1.5,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 1,
      flexShrink: 0,
   },
   title: {
      flex: 1,
      fontSize: 14,
      fontWeight: "600",
      color: "#111827",
      lineHeight: 20,
   },
   titleCompleted: {
      textDecorationLine: "line-through",
      color: "#9CA3AF",
   },
   deleteBtn: {
      padding: 2,
   },
   description: {
      fontSize: 12,
      color: "#6B7280",
      marginTop: 6,
      marginLeft: 30,
      lineHeight: 16,
   },
   footer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
      marginLeft: 30,
      gap: 6,
   },
   dueDateRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
   },
   dueDate: {
      fontSize: 11,
      color: "#9CA3AF",
   },
   tags: {
      flexDirection: "row",
      gap: 4,
      flex: 1,
   },
   tag: {
      borderRadius: 4,
      paddingHorizontal: 5,
      paddingVertical: 1,
   },
   tagText: {
      fontSize: 10,
      fontWeight: "600",
   },
   date: {
      fontSize: 11,
      color: "#D1D5DB",
      marginLeft: "auto",
   },
})
