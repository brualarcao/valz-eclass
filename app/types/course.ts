import type { Module } from './lesson'

export interface Course {
  id: string
  title: string
  shortDescription: string
  coverImage: string
  category: {
    name: string
    icon: string
  }
  lessonsCount: number
  duration: string
  progress: number
  statusBadge?: string
}

export interface CourseDetail {
  course: Course
  modules: Module[]
}
