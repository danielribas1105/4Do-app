import { Ionicons } from "@expo/vector-icons"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import React from "react"
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface Props {
   taskCount: number
   lastBackupDate: string | null
   onExport: () => void
   onImport: () => void
   onClearCompleted: () => void
}

export function SettingsScreen({
   taskCount,
   lastBackupDate,
   onExport,
   onImport,
   onClearCompleted,
}: Props) {
   const handleClear = () => {
      Alert.alert(
         "Limpar concluídas",
         "Deseja remover todas as tarefas concluídas? Essa ação não pode ser desfeita.",
         [
            { text: "Cancelar", style: "cancel" },
            { text: "Limpar", style: "destructive", onPress: onClearCompleted },
         ],
      )
   }

   const handleImport = () => {
      Alert.alert(
         "Importar Backup",
         "Isso irá substituir todas as suas tarefas atuais. Deseja continuar?",
         [
            { text: "Cancelar", style: "cancel" },
            { text: "Importar", onPress: onImport },
         ],
      )
   }

   return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
         <Text style={styles.pageTitle}>Configurações</Text>

         {/* Stats */}
         <View style={styles.card}>
            <Text style={styles.sectionTitle}>Estatísticas</Text>
            <View style={styles.statRow}>
               <Ionicons name="list-outline" size={18} color="#6B7280" />
               <Text style={styles.statLabel}>Total de tarefas</Text>
               <Text style={styles.statValue}>{taskCount}</Text>
            </View>
            {lastBackupDate && (
               <View style={styles.statRow}>
                  <Ionicons name="cloud-done-outline" size={18} color="#6B7280" />
                  <Text style={styles.statLabel}>Último backup</Text>
                  <Text style={styles.statValue}>
                     {format(new Date(lastBackupDate), "d MMM, HH:mm", { locale: ptBR })}
                  </Text>
               </View>
            )}
         </View>

         {/* Backup */}
         <View style={styles.card}>
            <Text style={styles.sectionTitle}>Backup & Restauração</Text>
            <Text style={styles.sectionDesc}>
               Exportar salva um arquivo JSON com todas suas tarefas. Importar substitui os dados
               atuais pelo backup selecionado.
            </Text>

            <TouchableOpacity onPress={onExport} style={[styles.actionBtn, styles.primaryBtn]}>
               <Ionicons name="cloud-upload-outline" size={18} color="#FFF" />
               <Text style={[styles.actionBtnText, { color: "#FFF" }]}>Exportar Backup</Text>
            </TouchableOpacity>

            <TouchableOpacity
               onPress={handleImport}
               style={[styles.actionBtn, styles.secondaryBtn]}
            >
               <Ionicons name="cloud-download-outline" size={18} color="#374151" />
               <Text style={[styles.actionBtnText, { color: "#374151" }]}>Importar Backup</Text>
            </TouchableOpacity>
         </View>

         {/* Danger Zone */}
         <View style={[styles.card, styles.dangerCard]}>
            <Text style={[styles.sectionTitle, { color: "#EF4444" }]}>Zona de Risco</Text>
            <TouchableOpacity onPress={handleClear} style={[styles.actionBtn, styles.dangerBtn]}>
               <Ionicons name="trash-outline" size={18} color="#EF4444" />
               <Text style={[styles.actionBtnText, { color: "#EF4444" }]}>
                  Limpar Tarefas Concluídas
               </Text>
            </TouchableOpacity>
         </View>

         {/* About */}
         <View style={styles.about}>
            <Text style={styles.aboutTitle}>Matriz de Eisenhower</Text>
            <Text style={styles.aboutText}>
               Um sistema de gestão de tarefas baseado na famosa matriz de prioridades do presidente
               Dwight D. Eisenhower — que divide as tarefas em 4 quadrantes segundo urgência e
               importância.
            </Text>
            <Text style={styles.version}>v1.0.0</Text>
         </View>
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#F9FAFB",
   },
   content: {
      padding: 20,
      gap: 16,
   },
   pageTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: "#111827",
      marginBottom: 4,
      letterSpacing: -0.5,
   },
   card: {
      backgroundColor: "#FFF",
      borderRadius: 16,
      padding: 16,
      gap: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 1,
   },
   dangerCard: {
      borderWidth: 1,
      borderColor: "#FEE2E2",
      backgroundColor: "#FFF5F5",
   },
   sectionTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: "#111827",
   },
   sectionDesc: {
      fontSize: 13,
      color: "#6B7280",
      lineHeight: 18,
   },
   statRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
   },
   statLabel: {
      flex: 1,
      fontSize: 14,
      color: "#374151",
   },
   statValue: {
      fontSize: 14,
      fontWeight: "700",
      color: "#111827",
   },
   actionBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      borderRadius: 12,
      paddingVertical: 13,
      paddingHorizontal: 16,
   },
   primaryBtn: {
      backgroundColor: "#111827",
   },
   secondaryBtn: {
      backgroundColor: "#F3F4F6",
   },
   dangerBtn: {
      backgroundColor: "#FEE2E2",
   },
   actionBtnText: {
      fontSize: 14,
      fontWeight: "700",
   },
   about: {
      padding: 4,
      gap: 8,
   },
   aboutTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: "#374151",
   },
   aboutText: {
      fontSize: 13,
      color: "#9CA3AF",
      lineHeight: 18,
   },
   version: {
      fontSize: 12,
      color: "#D1D5DB",
   },
})
