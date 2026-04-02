import { Ionicons } from "@expo/vector-icons"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import React from "react"
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../constants/colors"

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
            <Text style={[styles.sectionTitle, { color: Colors.q1 }]}>Zona de Risco</Text>
            <TouchableOpacity onPress={handleClear} style={[styles.actionBtn, styles.dangerBtn]}>
               <Ionicons name="trash-outline" size={18} color={Colors.q1} />
               <Text style={[styles.actionBtnText, { color: Colors.q1 }]}>
                  Limpar Tarefas Concluídas
               </Text>
            </TouchableOpacity>
         </View>

         {/* About */}
         <View style={styles.about}>
            <Text style={styles.aboutTitle}>4Do - Task Matriz</Text>
            <Text style={styles.aboutText}>
               É um sistema de gestão e priorização de tarefas baseado na famosa matriz de
               prioridades do presidente{" "}
               <Text style={{ fontStyle: "italic", fontWeight: "600" }}>Dwight D. Eisenhower</Text>,
               daí o nome{" "}
               <Text style={{ fontStyle: "italic", fontWeight: "600" }}>Matriz de Eisenhower</Text>.
            </Text>
            <Text style={styles.aboutText}>
               Essa matriz divide as tarefas em 4 quadrantes segundo urgência e importância. Ela
               ajuda a decidir o que fazer imediatamente, agendar, delegar ou eliminar, focando no
               que realmente gera valor e evitando a &quot;armadilha da urgência&quot;.
            </Text>
            <Text style={styles.aboutSubTitle}>Os Quatro Quadrantes:</Text>
            <Text style={styles.aboutText}>
               <Text style={{ fontWeight: "500" }}>1. Fazer (Urgente e Importante):</Text> Tarefas
               com prazos imediatos e consequências sérias, como crises ou problemas.
            </Text>
            <Text style={styles.aboutText}>
               <Text style={{ fontWeight: "500" }}>2. Agendar (Importante, mas Não Urgente):</Text>{" "}
               Tarefas estratégicas de longo prazo, planejamento e desenvolvimento pessoal.
            </Text>
            <Text style={styles.aboutText}>
               <Text style={{ fontWeight: "500" }}>3. Delegar (Urgente, mas Não Importante):</Text>{" "}
               Interrupções, e-mails ou reuniões que outros podem resolver.
            </Text>
            <Text style={styles.aboutText}>
               <Text style={{ fontWeight: "500" }}>
                  4. Eliminar (Não Importante e Não Urgente):
               </Text>{" "}
               Distrações, atividades de desperdício de tempo.
            </Text>
            <Text style={styles.version}>v1.0.0</Text>
         </View>
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.background,
   },
   content: {
      padding: 20,
      gap: 16,
   },
   pageTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: Colors.foreground,
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
      color: Colors.foreground,
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
      color: Colors.foreground,
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
      backgroundColor: Colors.foreground,
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
   aboutSubTitle: {
      fontSize: 13,
      fontWeight: "600",
      textDecorationLine: "underline",
      color: Colors.muted,
   },
   aboutText: {
      fontSize: 13,
      color: Colors.muted,
      lineHeight: 18,
      textAlign: "justify",
   },
   version: {
      fontSize: 12,
      color: "#D1D5DB",
   },
})
