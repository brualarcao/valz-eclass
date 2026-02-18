import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useCourseFilter } from '../../../app/composables/useCourseFilter'
import type { Course } from '../../../app/types/course'
import type { CourseFilterValue } from '../../../app/types/courseFilter'

function createCourse(overrides: Partial<Course> & { progress: number }): Course {
  return {
    id: '1',
    title: 'Test Course',
    shortDescription: 'Description',
    coverImage: '/cover.jpg',
    category: { name: 'Category', icon: 'heroicons:academic-cap' },
    lessonsCount: 10,
    duration: '1h',
    progress: overrides.progress,
    ...overrides,
  }
}

describe('useCourseFilter', () => {
  it('counts all courses', () => {
    const courses = ref<Course[]>([
      createCourse({ id: '1', progress: 0 }),
      createCourse({ id: '2', progress: 50 }),
      createCourse({ id: '3', progress: 100 }),
    ])
    const filterValue = ref<CourseFilterValue>('all')
    const { allCount, inProgressCount, completedCount, notStartedCount } =
      useCourseFilter(courses, filterValue)

    expect(allCount.value).toBe(3)
    expect(inProgressCount.value).toBe(1)
    expect(completedCount.value).toBe(1)
    expect(notStartedCount.value).toBe(1)
  })

  it('filters by all', () => {
    const courses = ref<Course[]>([
      createCourse({ id: '1', progress: 0 }),
      createCourse({ id: '2', progress: 50 }),
    ])
    const filterValue = ref<CourseFilterValue>('all')
    const { filteredCourses } = useCourseFilter(courses, filterValue)

    expect(filteredCourses.value).toHaveLength(2)
    expect(filteredCourses.value.map(c => c.id)).toEqual(['1', '2'])
  })

  it('filters by in-progress', () => {
    const courses = ref<Course[]>([
      createCourse({ id: '1', progress: 0 }),
      createCourse({ id: '2', progress: 50 }),
      createCourse({ id: '3', progress: 100 }),
    ])
    const filterValue = ref<CourseFilterValue>('in-progress')
    const { filteredCourses } = useCourseFilter(courses, filterValue)

    expect(filteredCourses.value).toHaveLength(1)
    expect(filteredCourses.value[0].id).toBe('2')
    expect(filteredCourses.value[0].progress).toBe(50)
  })

  it('filters by completed', () => {
    const courses = ref<Course[]>([
      createCourse({ id: '1', progress: 0 }),
      createCourse({ id: '2', progress: 100 }),
    ])
    const filterValue = ref<CourseFilterValue>('completed')
    const { filteredCourses } = useCourseFilter(courses, filterValue)

    expect(filteredCourses.value).toHaveLength(1)
    expect(filteredCourses.value[0].id).toBe('2')
    expect(filteredCourses.value[0].progress).toBe(100)
  })

  it('filters by not-started', () => {
    const courses = ref<Course[]>([
      createCourse({ id: '1', progress: 0 }),
      createCourse({ id: '2', progress: 50 }),
    ])
    const filterValue = ref<CourseFilterValue>('not-started')
    const { filteredCourses } = useCourseFilter(courses, filterValue)

    expect(filteredCourses.value).toHaveLength(1)
    expect(filteredCourses.value[0].id).toBe('1')
    expect(filteredCourses.value[0].progress).toBe(0)
  })

  it('returns empty when no courses match filter', () => {
    const courses = ref<Course[]>([
      createCourse({ id: '1', progress: 0 }),
      createCourse({ id: '2', progress: 100 }),
    ])
    const filterValue = ref<CourseFilterValue>('in-progress')
    const { filteredCourses } = useCourseFilter(courses, filterValue)

    expect(filteredCourses.value).toHaveLength(0)
  })

  it('reacts to filter value changes', () => {
    const courses = ref<Course[]>([
      createCourse({ id: '1', progress: 0 }),
      createCourse({ id: '2', progress: 100 }),
    ])
    const filterValue = ref<CourseFilterValue>('all')
    const { filteredCourses } = useCourseFilter(courses, filterValue)

    expect(filteredCourses.value).toHaveLength(2)

    filterValue.value = 'completed'
    expect(filteredCourses.value).toHaveLength(1)
    expect(filteredCourses.value[0].progress).toBe(100)

    filterValue.value = 'not-started'
    expect(filteredCourses.value).toHaveLength(1)
    expect(filteredCourses.value[0].progress).toBe(0)
  })

  it('reacts to courses list changes', () => {
    const courses = ref<Course[]>([createCourse({ id: '1', progress: 0 })])
    const filterValue = ref<CourseFilterValue>('all')
    const { filteredCourses, allCount } = useCourseFilter(courses, filterValue)

    expect(filteredCourses.value).toHaveLength(1)
    expect(allCount.value).toBe(1)

    courses.value = [
      ...courses.value,
      createCourse({ id: '2', progress: 50 }),
    ]
    expect(filteredCourses.value).toHaveLength(2)
    expect(allCount.value).toBe(2)
  })
})
