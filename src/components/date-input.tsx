import { Ionicons } from "@expo/vector-icons"
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import React, { useState } from "react"
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import MaskInput from "react-native-mask-input"
import { Colors } from "../constants/colors"
import { displayToIso, isoToDisplay } from "../utils/date"

interface Props {
   value: string | undefined // ISO string ou undefined
   onChange: (iso: string | undefined) => void
}

const DATE_MASK = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
//                  D     D         M     M         A     A     A     A

export function DateInput({ value, onChange }: Props) {
   const [showPicker, setShowPicker] = useState(false)

   // O que aparece no TextInput — sempre no formato DD/MM/AAAA
   const displayValue = value ? isoToDisplay(value) : ""

   const handleMaskChange = (masked: string) => {
      // masked já vem formatado com as barras pela máscara
      const iso = displayToIso(masked)
      onChange(iso) // undefined enquanto não estiver completo — normal
   }

   const handlePickerChange = (event: DateTimePickerEvent, date?: Date) => {
      setShowPicker(Platform.OS === "ios") // no Android fecha sozinho
      if (event.type === "dismissed") return
      if (date) onChange(date.toISOString())
   }

   const pickerDate = value ? new Date(value) : new Date()

   return (
      <View style={styles.wrapper}>
         <MaskInput
            style={styles.input}
            value={displayValue}
            onChangeText={handleMaskChange}
            mask={DATE_MASK}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={Colors.muted}
            keyboardType="numeric"
            maxLength={10}
         />

         <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.calendarBtn}>
            <Ionicons name="calendar-outline" size={18} color={Colors.accent} />
         </TouchableOpacity>

         {showPicker && (
            <DateTimePicker
               value={pickerDate}
               mode="date"
               display={Platform.OS === "ios" ? "inline" : "default"}
               locale="pt-BR"
               onChange={handlePickerChange}
               minimumDate={new Date()}
            />
         )}
      </View>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors.background,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 10,
      paddingHorizontal: 14,
   },
   input: {
      flex: 1,
      paddingVertical: 11,
      fontSize: 15,
      color: "#111827",
   },
   calendarBtn: {
      padding: 6,
   },
})
