import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Colors } from "../constants/colors"

export function AboutScreen() {
   return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
         <Text style={styles.aboutTitle}>4Do</Text>
         <View style={styles.about}>
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
            <Text style={styles.aboutSubTitle}>Como Aplicar (Passo a Passo)</Text>
            <Text style={styles.aboutText}>
               <Text style={{ fontWeight: "500" }}>1. Liste todas as tarefas:</Text> Coloque tudo no
               papel.
            </Text>
            <Text style={styles.aboutText}>
               <Text style={{ fontWeight: "500" }}>2. Avalie Urgência vs. Importância:</Text>
               Classifique cada item nos quadrantes.
            </Text>
            <Text style={styles.aboutText}>
               <Text style={{ fontWeight: "500" }}>3. Aplique as ações:</Text> Foque no Quadrante 1,
               agende tempo para o Q2, delegue o Q3 e descarte o Q4.
            </Text>
            <Text style={styles.aboutText}>
               Essa técnica permite focar no planejamento (Quadrante 2) em vez de apenas
               &quot;apagar incêndios&quot;.
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
   about: {
      padding: 4,
      gap: 8,
   },
   aboutTitle: {
      fontSize: 24,
      fontWeight: "800",
      fontStyle: "italic",
      color: Colors.foreground,
      marginBottom: 4,
      letterSpacing: -0.5,
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
