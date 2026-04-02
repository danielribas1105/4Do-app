import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import {
   KeyboardAvoidingView,
   Modal,
   Platform,
   ScrollView,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native"
import uuid from "react-native-uuid"
import { Colors } from "../constants/colors"
import { QUADRANTS } from "../constants/quadrants"
import { Task } from "../types/other-types"
import { Quadrant } from "../types/quadrants-config"

interface Props {
   visible: boolean
   editTask?: Task | null
   defaultQuadrant?: Quadrant
   onSave: (task: Task) => void
   onClose: () => void
}

export function TaskModal({ visible, editTask, defaultQuadrant = "Q1", onSave, onClose }: Props) {
   const [title, setTitle] = useState("")
   const [description, setDescription] = useState("")
   const [quadrant, setQuadrant] = useState<Quadrant>(defaultQuadrant)
   const [dueDate, setDueDate] = useState("")
   const [tagInput, setTagInput] = useState("")
   const [tags, setTags] = useState<string[]>([])

   useEffect(() => {
      if (editTask) {
         setTitle(editTask.title)
         setDescription(editTask.description || "")
         setQuadrant(editTask.quadrant)
         setDueDate(editTask.dueDate ? editTask.dueDate.split("T")[0] : "")
         setTags(editTask.tags || [])
      } else {
         setTitle("")
         setDescription("")
         setQuadrant(defaultQuadrant)
         setDueDate("")
         setTags([])
      }
      setTagInput("")
   }, [editTask, defaultQuadrant, visible])

   const handleSave = () => {
      if (!title.trim()) return
      const task: Task = {
         id: editTask?.id || (uuid.v4() as string),
         title: title.trim(),
         description: description.trim() || undefined,
         quadrant,
         completed: editTask?.completed || false,
         createdAt: editTask?.createdAt || new Date().toISOString(),
         completedAt: editTask?.completedAt,
         dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
         tags: tags.length > 0 ? tags : undefined,
      }
      onSave(task)
      onClose()
   }

   const addTag = () => {
      const t = tagInput.trim().toLowerCase().replace(/\s+/g, "-")
      if (t && !tags.includes(t) && tags.length < 5) {
         setTags([...tags, t])
         setTagInput("")
      }
   }

   const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag))

   const selectedQ = QUADRANTS.find((q) => q.id === quadrant)!

   return (
      <Modal
         visible={visible}
         animationType="slide"
         presentationStyle="pageSheet"
         onRequestClose={onClose}
      >
         <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
         >
            <View style={styles.container}>
               {/* Header */}
               <View style={styles.header}>
                  <TouchableOpacity onPress={onClose} style={styles.headerBtn}>
                     <Ionicons name="close" size={22} color="#6B7280" />
                  </TouchableOpacity>
                  <Text style={styles.headerTitle}>
                     {editTask ? "Editar Tarefa" : "Nova Tarefa"}
                  </Text>
                  <TouchableOpacity
                     onPress={handleSave}
                     disabled={!title.trim()}
                     style={[styles.saveBtn, { opacity: title.trim() ? 1 : 0.4 }]}
                  >
                     <Text style={styles.saveBtnText}>Salvar</Text>
                  </TouchableOpacity>
               </View>

               <ScrollView
                  style={styles.scroll}
                  contentContainerStyle={styles.scrollContent}
                  keyboardShouldPersistTaps="handled"
               >
                  {/* Title */}
                  <View style={styles.section}>
                     <Text style={styles.label}>Título *</Text>
                     <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="O que precisa ser feito?"
                        placeholderTextColor={Colors.muted}
                        autoFocus={!editTask}
                        maxLength={100}
                     />
                  </View>

                  {/* Description */}
                  <View style={styles.section}>
                     <Text style={styles.label}>Descrição</Text>
                     <TextInput
                        style={[styles.input, styles.textarea]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Detalhes adicionais..."
                        placeholderTextColor={Colors.muted}
                        multiline
                        numberOfLines={3}
                        maxLength={500}
                     />
                  </View>

                  {/* Quadrant Selector */}
                  <View style={styles.section}>
                     <Text style={styles.label}>Quadrante</Text>
                     <View style={styles.quadrantGrid}>
                        {QUADRANTS.map((q) => (
                           <TouchableOpacity
                              key={q.id}
                              onPress={() => setQuadrant(q.id)}
                              style={[
                                 styles.quadrantOption,
                                 {
                                    borderColor: quadrant === q.id ? q.color : "#E5E7EB",
                                    backgroundColor: quadrant === q.id ? q.color + "12" : "#F9FAFB",
                                 },
                              ]}
                           >
                              <Text style={styles.quadrantEmoji}>{q.emoji}</Text>
                              <Text
                                 style={[
                                    styles.quadrantLabel,
                                    { color: quadrant === q.id ? q.color : "#374151" },
                                 ]}
                              >
                                 {q.label}
                              </Text>
                              <Text
                                 style={[
                                    styles.quadrantSub,
                                    { color: quadrant === q.id ? q.color : "#9CA3AF" },
                                 ]}
                              >
                                 {q.subtitle}
                              </Text>
                           </TouchableOpacity>
                        ))}
                     </View>
                  </View>

                  {/* Due Date */}
                  <View style={styles.section}>
                     <Text style={styles.label}>Data de vencimento</Text>
                     <TextInput
                        style={styles.input}
                        value={dueDate}
                        onChangeText={setDueDate}
                        placeholder="DD-MM-AAAA"
                        placeholderTextColor={Colors.muted}
                        keyboardType="numeric"
                        maxLength={10}
                     />
                  </View>

                  {/* Tags */}
                  <View style={styles.section}>
                     <Text style={styles.label}>Tags</Text>
                     <View style={styles.tagInputRow}>
                        <TextInput
                           style={[styles.input, { flex: 1 }]}
                           value={tagInput}
                           onChangeText={setTagInput}
                           placeholder="Ex: trabalho, pessoal..."
                           placeholderTextColor={Colors.muted}
                           onSubmitEditing={addTag}
                           returnKeyType="done"
                           maxLength={20}
                        />
                        <TouchableOpacity onPress={addTag} style={styles.addTagBtn}>
                           <Ionicons name="add" size={20} color="#FFF" />
                        </TouchableOpacity>
                     </View>
                     {tags.length > 0 && (
                        <View style={styles.tagList}>
                           {tags.map((tag) => (
                              <TouchableOpacity
                                 key={tag}
                                 onPress={() => removeTag(tag)}
                                 style={[
                                    styles.tagChip,
                                    { backgroundColor: selectedQ.color + "18" },
                                 ]}
                              >
                                 <Text style={[styles.tagChipText, { color: selectedQ.color }]}>
                                    #{tag}
                                 </Text>
                                 <Ionicons name="close" size={12} color={selectedQ.color} />
                              </TouchableOpacity>
                           ))}
                        </View>
                     )}
                  </View>
               </ScrollView>
            </View>
         </KeyboardAvoidingView>
      </Modal>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#FFF",
   },
   header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#F3F4F6",
   },
   headerBtn: {
      padding: 4,
   },
   headerTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: "#111827",
   },
   saveBtn: {
      backgroundColor: Colors.accent,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 7,
   },
   saveBtnText: {
      color: "#FFF",
      fontWeight: "700",
      fontSize: 14,
   },
   scroll: { flex: 1 },
   scrollContent: { padding: 20, gap: 20 },
   section: { gap: 8 },
   label: {
      fontSize: 13,
      fontWeight: "600",
      color: "#374151",
      textTransform: "uppercase",
      letterSpacing: 0.5,
   },
   input: {
      backgroundColor: Colors.background,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 11,
      fontSize: 15,
      color: "#111827",
   },
   textarea: {
      height: 80,
      textAlignVertical: "top",
   },
   quadrantGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
   },
   quadrantOption: {
      width: "47%",
      borderWidth: 1.5,
      borderRadius: 12,
      padding: 12,
      gap: 3,
   },
   quadrantEmoji: { fontSize: 20 },
   quadrantLabel: { fontSize: 13, fontWeight: "700" },
   quadrantSub: { fontSize: 10, lineHeight: 13 },
   tagInputRow: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
   },
   addTagBtn: {
      backgroundColor: Colors.accent,
      borderRadius: 10,
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
   },
   tagList: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
   },
   tagChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 4,
   },
   tagChipText: {
      fontSize: 12,
      fontWeight: "600",
   },
})
