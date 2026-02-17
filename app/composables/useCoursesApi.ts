import type { Course } from '../types/course'
import type { CourseDetail } from '../types/course'

export function useCoursesApi() {
  const { data: coursesData, pending, error, refresh } = useFetch<{ courses: CourseDetail[] }>('/data/courses.json')

  const courses = computed<Course[]>(() =>
    (coursesData.value?.courses ?? []).map(d => d.course),
  )

  return {
    coursesData,
    courses,
    pending,
    error,
    refresh,
  }
}
