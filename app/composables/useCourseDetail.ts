import type { CourseDetail } from '../types/course'
import type { Lesson } from '../types/lesson'

function allLessonsFromDetail(detail: CourseDetail): Lesson[] {
  return detail.modules.flatMap(m => m.lessons)
}

function firstUnlockedLesson(detail: CourseDetail): Lesson | null {
  const lessons = allLessonsFromDetail(detail)
  return lessons.find(l => !l.locked) ?? null
}

export function useCourseDetail(courseId: MaybeRefOrGetter<string>) {
  const url = computed(() => `/api/courses/${toValue(courseId)}`)
  const { data: detailData, pending, error } = useFetch<CourseDetail>(url)

  const detail = computed<CourseDetail | null>(() => detailData.value ?? null)

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
    pending,
    error,
  }
}
