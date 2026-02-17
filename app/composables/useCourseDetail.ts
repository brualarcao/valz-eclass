import type { Course } from '../types/course'
import type { CourseDetail } from '../types/course'
import type { Lesson, Module } from '../types/lesson'
import { MOCK_COURSES } from './useMockCourses'

function buildCourse1Detail(course: Course): CourseDetail {
  return {
    course,
    modules: [
      {
        id: 'm1',
        title: 'MODULE 1: FUNDAMENTALS',
        lessons: [
          { id: 'l-1', title: 'Intro to Nuxt 3', duration: '05:22', description: 'Introduction to Nuxt 3 and its core features.', level: 'Beginner', updatedAt: 'Jan 2024', completed: true, locked: false, order: 1, materials: [{ id: 'm1-1', name: 'Lesson_1_Slides.pdf', size: '2.4 MB', url: '/api/download/materials/Lesson_1_Slides.pdf' }, { id: 'm1-2', name: 'Source_Code_1.zip', size: '156 KB', url: '/api/download/materials/Source_Code_1.zip' }] },
          { id: 'l-2', title: 'Setup & Configuration', duration: '08:15', description: 'Setting up your Nuxt 3 project and configuration options.', level: 'Beginner', updatedAt: 'Jan 2024', completed: true, locked: false, order: 2, materials: [{ id: 'm2-1', name: 'Lesson_2_Slides.pdf', size: '2.1 MB', url: '/api/download/materials/Lesson_2_Slides.pdf' }, { id: 'm2-2', name: 'Source_Code_2.zip', size: '142 KB', url: '/api/download/materials/Source_Code_2.zip' }] },
          { id: 'l-3', title: 'File Based Routing', duration: '14:02', description: 'Understanding file-based routing in Nuxt 3.', level: 'Beginner', updatedAt: 'Feb 2024', completed: true, locked: false, order: 3, materials: [{ id: 'm3-1', name: 'Lesson_3_Slides.pdf', size: '2.4 MB', url: '/api/download/materials/Lesson_3_Slides.pdf' }, { id: 'm3-2', name: 'Source_Code_3.zip', size: '156 KB', url: '/api/download/materials/Source_Code_3.zip' }] },
        ],
      },
      {
        id: 'm2',
        title: 'MODULE 2: CORE CONCEPTS',
        lessons: [
          { id: 'l-4', title: 'Composition API Deep Dive', duration: '12:45', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', description: "In this comprehensive deep dive, we'll explore the nuances of the Vue 3 Composition API. We will cover setup(), reactive references with ref and reactive, computed properties, and watchers. By the end of this lesson, you'll understand how to organize code by logical concern.", level: 'Advanced', updatedAt: 'Mar 2024', completed: false, locked: false, order: 4, materials: [{ id: 'm4-1', name: 'Lesson_Slides_Composition_API.pdf', size: '2.4 MB', url: '/api/download/materials/Lesson_Slides_Composition_API.pdf' }, { id: 'm4-2', name: 'Source_Code_Composition_API.zip', size: '156 KB', url: '/api/download/materials/Source_Code_Composition_API.zip' }] },
          { id: 'l-5', title: 'State Management', duration: '18:30', description: 'Managing state in Vue 3 applications.', level: 'Advanced', updatedAt: 'Mar 2024', completed: false, locked: true, order: 5, materials: [{ id: 'm5-1', name: 'Lesson_5_Slides.pdf', size: '1.8 MB', url: '/api/download/materials/Lesson_5_Slides.pdf' }, { id: 'm5-2', name: 'Source_Code_5.zip', size: '89 KB', url: '/api/download/materials/Source_Code_5.zip' }] },
          { id: 'l-6', title: 'Middleware Basics', duration: '09:45', description: 'Introduction to Nuxt middleware.', level: 'Advanced', updatedAt: 'Mar 2024', completed: false, locked: true, order: 6, materials: [{ id: 'm6-1', name: 'Lesson_6_Slides.pdf', size: '1.8 MB', url: '/api/download/materials/Lesson_6_Slides.pdf' }, { id: 'm6-2', name: 'Source_Code_6.zip', size: '89 KB', url: '/api/download/materials/Source_Code_6.zip' }] },
          { id: 'l-7', title: 'Server Routes', duration: '15:20', description: 'Building server routes and API in Nuxt.', level: 'Advanced', updatedAt: 'Mar 2024', completed: false, locked: true, order: 7, materials: [{ id: 'm7-1', name: 'Lesson_7_Slides.pdf', size: '1.8 MB', url: '/api/download/materials/Lesson_7_Slides.pdf' }, { id: 'm7-2', name: 'Source_Code_7.zip', size: '89 KB', url: '/api/download/materials/Source_Code_7.zip' }] },
          { id: 'l-8', title: 'Deployment', duration: '10:15', description: 'Deploying Nuxt applications to production.', level: 'Advanced', updatedAt: 'Mar 2024', completed: false, locked: true, order: 8, materials: [{ id: 'm8-1', name: 'Lesson_8_Slides.pdf', size: '1.8 MB', url: '/api/download/materials/Lesson_8_Slides.pdf' }, { id: 'm8-2', name: 'Source_Code_8.zip', size: '89 KB', url: '/api/download/materials/Source_Code_8.zip' }] },
          { id: 'l-9', title: 'Testing Strategies', duration: '11:00', description: 'Testing Vue and Nuxt applications.', level: 'Advanced', updatedAt: 'Mar 2024', completed: false, locked: true, order: 9, materials: [{ id: 'm9-1', name: 'Lesson_9_Slides.pdf', size: '1.8 MB', url: '/api/download/materials/Lesson_9_Slides.pdf' }, { id: 'm9-2', name: 'Source_Code_9.zip', size: '89 KB', url: '/api/download/materials/Source_Code_9.zip' }] },
          { id: 'l-10', title: 'Performance Optimization', duration: '13:20', description: 'Optimizing Nuxt app performance.', level: 'Advanced', updatedAt: 'Mar 2024', completed: false, locked: true, order: 10, materials: [{ id: 'm10-1', name: 'Lesson_10_Slides.pdf', size: '1.8 MB', url: '/api/download/materials/Lesson_10_Slides.pdf' }, { id: 'm10-2', name: 'Source_Code_10.zip', size: '89 KB', url: '/api/download/materials/Source_Code_10.zip' }] },
          { id: 'l-11', title: 'Advanced Patterns', duration: '16:45', description: 'Advanced Vue 3 patterns in practice.', level: 'Advanced', updatedAt: 'Mar 2024', completed: false, locked: true, order: 11, materials: [{ id: 'm11-1', name: 'Lesson_11_Slides.pdf', size: '1.8 MB', url: '/api/download/materials/Lesson_11_Slides.pdf' }, { id: 'm11-2', name: 'Source_Code_11.zip', size: '89 KB', url: '/api/download/materials/Source_Code_11.zip' }] },
          { id: 'l-12', title: 'Final Project', duration: '14:30', description: 'Building a complete project with Nuxt 3.', level: 'Advanced', updatedAt: 'Mar 2024', completed: false, locked: true, order: 12, materials: [{ id: 'm12-1', name: 'Lesson_12_Slides.pdf', size: '1.8 MB', url: '/api/download/materials/Lesson_12_Slides.pdf' }, { id: 'm12-2', name: 'Source_Code_12.zip', size: '89 KB', url: '/api/download/materials/Source_Code_12.zip' }] },
        ],
      },
    ],
  }
}

function buildDefaultModulesForCourse(course: Course): Module[] {
  const count = course.lessonsCount
  const half = Math.max(1, Math.floor(count / 2))
  const completedCount = Math.floor((course.progress / 100) * count)
  const lessons1 = Array.from({ length: half }, (_, i) => {
    const order = i + 1
    const completed = order <= completedCount
    const locked = order > completedCount + 1
    return {
      id: `l-${order}`,
      title: `Lesson ${order}`,
      duration: `${5 + i}:${String(10 + i * 2).padStart(2, '0')}`,
      description: `Description for lesson ${order}.`,
      level: 'Beginner',
      updatedAt: 'Jan 2024',
      completed,
      locked,
      order,
      materials: [
        { id: `mat-${order}-1`, name: `Lesson_${order}_Slides.pdf`, size: '2.4 MB', url: `/api/download/materials/Lesson_${order}_Slides.pdf` },
        { id: `mat-${order}-2`, name: `Source_Code_${order}.zip`, size: '156 KB', url: `/api/download/materials/Source_Code_${order}.zip` },
      ],
    } as Lesson
  })
  const lessons2 = Array.from({ length: count - half }, (_, i) => {
    const order = half + i + 1
    const completed = order <= completedCount
    const locked = order > completedCount + 1
    return {
      id: `l-${order}`,
      title: `Lesson ${order}`,
      duration: `${10 + i}:${String(i * 3).padStart(2, '0')}`,
      description: `Description for lesson ${order}.`,
      level: 'Advanced',
      updatedAt: 'Mar 2024',
      completed,
      locked,
      order,
      materials: [
        { id: `mat-${order}-1`, name: `Lesson_${order}_Slides.pdf`, size: '1.8 MB', url: `/api/download/materials/Lesson_${order}_Slides.pdf` },
        { id: `mat-${order}-2`, name: `Source_Code_${order}.zip`, size: '89 KB', url: `/api/download/materials/Source_Code_${order}.zip` },
      ],
    } as Lesson
  })
  return [
    { id: 'm1', title: 'MODULE 1: FUNDAMENTALS', lessons: lessons1 },
    { id: 'm2', title: 'MODULE 2: CORE CONCEPTS', lessons: lessons2 },
  ]
}

const COURSE_DETAIL_MOCKS: Record<string, CourseDetail> = {}

function getOrCreateCourseDetail(courseId: string): CourseDetail | null {
  if (COURSE_DETAIL_MOCKS[courseId])
    return COURSE_DETAIL_MOCKS[courseId]

  const course = MOCK_COURSES.find(c => c.id === courseId)
  if (!course)
    return null

  const detail: CourseDetail = { course, modules: buildDefaultModulesForCourse(course) }
  COURSE_DETAIL_MOCKS[courseId] = detail
  return detail
}

function allLessonsFromDetail(detail: CourseDetail): Lesson[] {
  return detail.modules.flatMap(m => m.lessons)
}

function firstUnlockedLesson(detail: CourseDetail): Lesson | null {
  const lessons = allLessonsFromDetail(detail)
  return lessons.find(l => !l.locked) ?? null
}

export function useCourseDetail(courseId: MaybeRefOrGetter<string>) {
  const id = toValue(courseId)
  const detail = computed<CourseDetail | null>(() => getOrCreateCourseDetail(id))
  const allLessons = computed<Lesson[]>(() =>
    detail.value ? allLessonsFromDetail(detail.value) : [],
  )

  const route = useRoute()
  const currentLessonId = computed(() => {
    const q = route.query.lesson as string | undefined
    if (q && allLessons.value.some(l => l.id === q))
      return q
    if (!detail.value)
      return null
    const first = firstUnlockedLesson(detail.value)
    return first?.id ?? allLessons.value[0]?.id ?? null
  })

  const currentLesson = computed<Lesson | null>(() => {
    const lid = currentLessonId.value
    if (!lid)
      return null
    return allLessons.value.find(l => l.id === lid) ?? null
  })

  const completedCount = computed(() =>
    allLessons.value.filter(l => l.completed).length,
  )
  const totalLessons = computed(() => allLessons.value.length)
  const progressPercent = computed(() =>
    totalLessons.value === 0 ? 0 : Math.round((completedCount.value / totalLessons.value) * 100),
  )

  const previousLesson = computed<Lesson | null>(() => {
    const idx = allLessons.value.findIndex(l => l.id === currentLessonId.value)
    if (idx <= 0)
      return null
    return allLessons.value[idx - 1] ?? null
  })

  const nextLesson = computed<Lesson | null>(() => {
    const idx = allLessons.value.findIndex(l => l.id === currentLessonId.value)
    if (idx < 0 || idx >= allLessons.value.length - 1)
      return null
    return allLessons.value[idx + 1] ?? null
  })

  function selectLesson(lessonId: string) {
    const lesson = allLessons.value.find(l => l.id === lessonId)
    if (!lesson || lesson.locked)
      return
    navigateTo({
      path: route.path,
      query: { ...route.query, lesson: lessonId },
    })
  }

  function goPrevious() {
    if (previousLesson.value)
      selectLesson(previousLesson.value.id)
  }

  function goNext() {
    if (nextLesson.value)
      selectLesson(nextLesson.value.id)
  }

  return {
    detail,
    allLessons,
    currentLessonId,
    currentLesson,
    completedCount,
    totalLessons,
    progressPercent,
    previousLesson,
    nextLesson,
    selectLesson,
    goPrevious,
    goNext,
  }
}
