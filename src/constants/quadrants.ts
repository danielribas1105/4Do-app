import { QuadrantConfig } from "../types/quadrants-config"
import { Colors } from "./colors"

export const QUADRANTS: QuadrantConfig[] = [
   {
      id: "Q1",
      label: "Fazer Agora",
      subtitle: "Urgente & Importante",
      emoji: "🔥",
      color: Colors.q1,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
      badgeColor: "bg-red-100",
   },
   {
      id: "Q2",
      label: "Agendar",
      subtitle: "Não Urgente & Importante",
      emoji: "🎯",
      color: Colors.q2,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      badgeColor: "bg-blue-100",
   },
   {
      id: "Q3",
      label: "Delegar",
      subtitle: "Urgente & Não Importante",
      emoji: "🤝",
      color: Colors.q3,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
      badgeColor: "bg-amber-100",
   },
   {
      id: "Q4",
      label: "Eliminar",
      subtitle: "Não Urgente & Não Importante",
      emoji: "🗑️",
      color: Colors.q4,
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      textColor: "text-gray-600",
      badgeColor: "bg-gray-100",
   },
]
