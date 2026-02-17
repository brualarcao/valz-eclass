<template>
  <div class="flex flex-col w-full max-w-full min-w-0">
    <section
      class="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 py-4 md:py-5 px-0"
    >
      <div class="flex flex-col gap-1 min-w-0">
        <h1 class="text-2xl sm:text-3xl font-bold text-text-primary truncate">
          Welcome back, {{ userName }}
        </h1>
        <p class="text-text-secondary text-sm sm:text-base">
          You have
          <span class="text-brand-primary font-medium">{{ inProgressCount }}</span>
          <span class="text-brand-primary font-medium"> courses</span>
          in progress.
        </p>
      </div>
      <SearchCourse v-model="searchQuery" />
    </section>
    <section
      class="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 py-4 md:py-5 px-0 min-w-0"
    >
      <Filter
        v-model="courseFilter"
        :in-progress-count="inProgressCount"
        :completed-count="completedCount"
        :not-started-count="notStartedCount"
        :all-count="allCount"
      />
    </section>
    <section
      class="w-full flex flex-col gap-4 md:gap-6 py-4 md:py-5 px-0"
    >
      <div
        v-if="showSkeleton"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 w-full"
      >
        <CourseCardSkeleton
          v-for="n in 12"
          :key="n"
        />
      </div>
      <div
        v-else-if="coursesToShow.length === 0"
        class="w-full py-12 flex flex-col items-center justify-center gap-3 text-center"
      >
        <p class="text-text-secondary text-base font-medium">
          Start your journey
        </p>
        <p class="text-text-secondary text-sm max-w-md">
          We couldn't find any courses. Try refreshing the page or searching for something else.
        </p>
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 w-full"
      >
        <CourseCard
          v-for="course in coursesToShow"
          :key="course.id"
          :course="course"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { CourseFilterValue } from '../types/courseFilter'
const userName = ref('Bruno Alarcão')
const searchQuery = ref('')
const courseFilter = ref<CourseFilterValue>('in-progress')
const { courses, pending } = useCoursesApi()
const {
  inProgressCount,
  completedCount,
  notStartedCount,
  filteredCourses,
  allCount,
} = useCourseFilter(courses, courseFilter)

const isMinLoadingActive = ref(true)
onMounted(() => {
  setTimeout(() => {
    isMinLoadingActive.value = false
  }, 3000)
})
const showSkeleton = computed(() => pending.value || isMinLoadingActive.value)

const coursesToShow = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query)
    return filteredCourses.value
  return filteredCourses.value.filter(course =>
    course.title.toLowerCase().includes(query),
  )
})
</script>