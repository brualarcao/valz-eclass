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
          <span class="text-brand-primary font-medium">{{ coursesInProgress }}</span>
          <span class="text-brand-primary font-medium"> courses</span>
          in progress. Keep it up!
        </p>
      </div>
      <div class="relative w-full md:max-w-md md:shrink-0 min-w-0">
        <span
          class="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
          aria-hidden="true"
        >
          <Icon name="heroicons:magnifying-glass" class="w-5 h-5 shrink-0" />
        </span>
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search your library..."
          autocomplete="off"
          class="w-full pl-10 pr-4 py-2.5 rounded-lg bg-brand-surface border border-brand-border text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary text-base min-w-0"
        >
      </div>
    </section>
    <section
      class="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 py-4 md:py-5 px-0"
    >
      <Filter
        v-model="courseFilter"
        :in-progress-count="coursesInProgress"
        :completed-count="completedCount"
        :not-started-count="notStartedCount"
      />
    </section>
    <section
      class="w-full flex flex-col gap-4 md:gap-6 py-4 md:py-5 px-0"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 w-full">
        <CourseCard
          v-for="course in courses"
          :key="course.id"
          :course="course"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const userName = ref('Bruno Alarcão')
const coursesInProgress = ref(4)
const searchQuery = ref('')
const courseFilter = ref<'in-progress' | 'completed' | 'not-started'>('in-progress')
const completedCount = ref(12)
const notStartedCount = ref(5)
const courses = useMockCourses()
</script>