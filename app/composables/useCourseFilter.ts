import type { Ref } from 'vue'
import type { Course } from '../types/course'
import type { CourseFilterValue } from '../types/courseFilter'

function isInProgress(course: Course): boolean {
  return course.progress > 0 && course.progress < 100
}

function isCompleted(course: Course): boolean {
  return course.progress === 100
}

function isNotStarted(course: Course): boolean {
  return course.progress === 0
}

export function useCourseFilter(
  courses: Ref<Course[]>,
  filterValue: Ref<CourseFilterValue>,
) {
  const inProgressCount = computed(() =>
    courses.value.filter(isInProgress).length,
  )
  const completedCount = computed(() =>
    courses.value.filter(isCompleted).length,
  )
  const notStartedCount = computed(() =>
    courses.value.filter(isNotStarted).length,
  )
  const allCount = computed(() =>
    courses.value.length,
  )

  const filteredCourses = computed<Course[]>(() => {
    switch (filterValue.value) {
      case 'in-progress':
        return courses.value.filter(isInProgress)
      case 'completed':
        return courses.value.filter(isCompleted)
      case 'not-started':
        return courses.value.filter(isNotStarted)
      case 'all':
        return courses.value
      default:
        return courses.value
    }
  })

  return {
    inProgressCount,
    completedCount,
    notStartedCount,
    allCount,
    filteredCourses,
  }
}
