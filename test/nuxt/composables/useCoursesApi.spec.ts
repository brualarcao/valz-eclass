import { describe, it, expect, beforeAll } from 'vitest'
import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { useCoursesApi } from '~/composables/useCoursesApi'
import type { CourseDetail } from '~/types/course'

const mockCourseDetail: CourseDetail = {
  course: {
    id: 'c1',
    title: 'Course One',
    shortDescription: 'Desc',
    coverImage: '/img.jpg',
    category: { name: 'Cat', icon: 'heroicons:academic-cap' },
    lessonsCount: 2,
    duration: '30m',
    progress: 50,
  },
  modules: [
    {
      id: 'm1',
      title: 'Module 1',
      lessons: [],
    },
  ],
}

describe('useCoursesApi', () => {
  beforeAll(() => {
    registerEndpoint('/data/courses.json', () => ({
      courses: [mockCourseDetail],
    }))
  })

  it('loads courses from API', async () => {
    const { courses, pending } = useCoursesApi()

    await new Promise<void>(resolve => {
      const stop = watch(pending, (p) => {
        if (!p) {
          stop()
          resolve()
        }
      })
      if (!pending.value) resolve()
    })

    expect(courses.value).toHaveLength(1)
    expect(courses.value[0].id).toBe('c1')
    expect(courses.value[0].title).toBe('Course One')
    expect(courses.value[0].progress).toBe(50)
  })

  it('maps courseDetail.course to courses', async () => {
    const { courses, pending } = useCoursesApi()

    await new Promise<void>(resolve => {
      const stop = watch(pending, (p) => {
        if (!p) {
          stop()
          resolve()
        }
      })
      if (!pending.value) resolve()
    })

    expect(courses.value[0]).toEqual(mockCourseDetail.course)
  })
})
