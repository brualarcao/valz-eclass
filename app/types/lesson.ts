export interface Material {
  id: string
  name: string
  size: string
  url: string
}

export interface Lesson {
  id: string
  title: string
  duration: string
  videoUrl?: string
  description: string
  level: string
  updatedAt: string
  completed: boolean
  locked: boolean
  order: number
  materials: Material[]
}

export interface Module {
  id: string
  title: string
  lessons: Lesson[]
}
