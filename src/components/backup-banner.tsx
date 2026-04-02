import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../constants/colors"

interface Props {
   onBackup: () => void
   onDismiss: () => void
}

export function BackupBanner({ onBackup, onDismiss }: Props) {
   return (
      <View style={styles.banner}>
         <Ionicons name="cloud-upload-outline" size={18} color="#1D4ED8" />
         <View style={styles.textBlock}>
            <Text style={styles.title}>Hora do backup semanal!</Text>
            <Text style={styles.subtitle}>Exporte suas tarefas para não perdê-las.</Text>
         </View>
         <TouchableOpacity onPress={onBackup} style={styles.backupBtn}>
            <Text style={styles.backupBtnText}>Fazer backup</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={onDismiss} style={styles.dismissBtn}>
            <Ionicons name="close" size={16} color="#6B7280" />
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   banner: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#EFF6FF",
      borderWidth: 1,
      borderColor: "#BFDBFE",
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      gap: 10,
   },
   textBlock: { flex: 1 },
   title: {
      fontSize: 13,
      fontWeight: "700",
      color: "#1D4ED8",
   },
   subtitle: {
      fontSize: 11,
      color: Colors.q2,
      marginTop: 1,
   },
   backupBtn: {
      backgroundColor: "#1D4ED8",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
   },
   backupBtnText: {
      color: "#FFF",
      fontSize: 12,
      fontWeight: "700",
   },
   dismissBtn: {
      padding: 2,
   },
})
