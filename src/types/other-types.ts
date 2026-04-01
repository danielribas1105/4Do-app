import { Quadrant } from "./quadrants-config"

export interface Task {
   id: string
   title: string
   description?: string
   quadrant: Quadrant
   completed: boolean
   createdAt: string
   completedAt?: string
   dueDate?: string
   tags?: string[]
}

export interface BackupMetadata {
   version: string
   createdAt: string
   taskCount: number
   tasks: Task[]
}

export type FilterType = "all" | "active" | "completed"
export type ViewMode = "matrix" | "list"
