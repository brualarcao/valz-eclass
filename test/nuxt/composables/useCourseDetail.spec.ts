import { describe, it, expect, vi, beforeAll } from 'vitest'
import { registerEndpoint, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useCourseDetail } from '~/composables/useCourseDetail'
import type { CourseDetail } from '~/types/course'
import type { Lesson } from '~/types/lesson'

const { navigateToMock } = vi.hoisted(() => ({
  navigateToMock: vi.fn(),
}))

const lesson1: Lesson = {
  id: 'l1',
  title: 'Lesson 1',
  duration: '5m',
  description: 'Desc',
  level: 'beginner',
  updatedAt: '2024-01-01',
  completed: true,
  locked: false,
  order: 0,
  materials: [],
}

const lesson2: Lesson = {
  id: 'l2',
  title: 'Lesson 2',
  duration: '10m',
  description: 'Desc 2',
  level: 'beginner',
  updatedAt: '2024-01-01',
  completed: false,
  locked: false,
  order: 1,
  materials: [],
}

const lesson3Locked: Lesson = {
  id: 'l3',
  title: 'Lesson 3',
  duration: '8m',
  description: 'Desc 3',
  level: 'beginner',
  updatedAt: '2024-01-01',
  completed: false,
  locked: true,
  order: 2,
  materials: [],
}

const mockDetail: CourseDetail = {
  course: {
    id: 'detail1',
    title: 'Detail Course',
    shortDescription: 'Desc',
    coverImage: '/img.jpg',
    category: { name: 'Cat', icon: 'heroicons:academic-cap' },
    lessonsCount: 3,
    duration: '23m',
    progress: 33,
  },
  modules: [
    {
      id: 'mod1',
      title: 'Module 1',
      lessons: [lesson1, lesson2, lesson3Locked],
    },
  ],
}

describe('useCourseDetail', () => {
  beforeAll(() => {
    registerEndpoint('/data/courses/detail1.json', () => mockDetail)
    mockNuxtImport('useRoute', () => () => ({
      path: '/courses/detail1',
      query: {},
    }))
    mockNuxtImport('navigateTo', () => navigateToMock)
  })

  it('loads detail and exposes allLessons', async () => {
    const { allLessons, pending } = useCourseDetail('detail1')

    await new Promise<void>(resolve => {
      const stop = watch(pending, (p) => {
        if (!p) {
          stop()
          resolve()
        }
      })
      if (!pending.value) resolve()
    })

    expect(allLessons.value).toHaveLength(3)
    expect(allLessons.value[0].id).toBe('l1')
    expect(allLessons.value[1].id).toBe('l2')
    expect(allLessons.value[2].id).toBe('l3')
  })

  it('sets currentLessonId to first unlocked when no query', async () => {
    const { currentLessonId, currentLesson, pending } = useCourseDetail('detail1')

    await new Promise<void>(resolve => {
      const stop = watch(pending, (p) => {
        if (!p) {
          stop()
          resolve()
        }
      })
      if (!pending.value) resolve()
    })

    expect(currentLessonId.value).toBe('l1')
    expect(currentLesson.value?.id).toBe('l1')
  })

  it('computes progressPercent from completed lessons', async () => {
    const { progressPercent, completedCount, totalLessons, pending } =
      useCourseDetail('detail1')

    await new Promise<void>(resolve => {
      const stop = watch(pending, (p) => {
        if (!p) {
          stop()
          resolve()
        }
      })
      if (!pending.value) resolve()
    })

    expect(totalLessons.value).toBe(3)
    expect(completedCount.value).toBe(1)
    expect(progressPercent.value).toBe(33)
  })

  it('exposes previousLesson and nextLesson', async () => {
    const { previousLesson, nextLesson, currentLessonId, pending } =
      useCourseDetail('detail1')

    await new Promise<void>(resolve => {
      const stop = watch(pending, (p) => {
        if (!p) {
          stop()
          resolve()
        }
      })
      if (!pending.value) resolve()
    })

    expect(currentLessonId.value).toBe('l1')
    expect(previousLesson.value).toBeNull()
    expect(nextLesson.value?.id).toBe('l2')
  })

  it('goNext calls navigateTo with next lesson in query', async () => {
    const { goNext, pending } = useCourseDetail('detail1')

    await new Promise<void>(resolve => {
      const stop = watch(pending, (p) => {
        if (!p) {
          stop()
          resolve()
        }
      })
      if (!pending.value) resolve()
    })

    navigateToMock.mockClear()
    goNext()

    expect(navigateToMock).toHaveBeenCalledWith({
      path: '/courses/detail1',
      query: { lesson: 'l2' },
    })
  })

  it('selectLesson does nothing for locked lesson', async () => {
    const { selectLesson, pending } = useCourseDetail('detail1')

    await new Promise<void>(resolve => {
      const stop = watch(pending, (p) => {
        if (!p) {
          stop()
          resolve()
        }
      })
      if (!pending.value) resolve()
    })

    navigateToMock.mockClear()
    selectLesson('l3')

    expect(navigateToMock).not.toHaveBeenCalled()
  })
})
