<template>
  <div class="flex flex-col w-full max-w-full min-w-0">
    <template v-if="!detail">
      <section class="w-full py-4 md:py-5 px-0">
        <p class="text-text-secondary">
          Curso não encontrado.
        </p>
        <NuxtLink
          to="/dashboard"
          class="mt-2 inline-flex text-brand-primary hover:underline"
        >
          Voltar ao Dashboard
        </NuxtLink>
      </section>
    </template>

    <template v-else>
      <div class="flex items-center gap-3 w-full py-2">
        <NuxtLink
          to="/dashboard"
          class="flex items-center justify-center w-10 h-10 shrink-0 rounded-lg text-text-secondary hover:text-brand-primary hover:bg-brand-surface transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          aria-label="Voltar ao Dashboard"
        >
          <Icon name="heroicons:arrow-left" class="w-5 h-5" />
        </NuxtLink>
        <h2 class="text-lg font-semibold text-brand-primary truncate min-w-0">
          {{ detail.course.title }}
        </h2>
      </div>


      <div class="flex items-center justify-between gap-4 py-3">
        <h1 class="text-xl sm:text-2xl font-bold text-text-primary truncate min-w-0">
          {{ currentLesson?.title ?? 'Selecione uma aula' }}
        </h1>
        <div class="flex items-center gap-1 shrink-0">
          <button
            type="button"
            class="p-2 rounded-lg text-text-secondary hover:text-brand-primary hover:bg-brand-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            :disabled="!previousLesson"
            aria-label="Aula anterior"
            @click="goPrevious"
          >
            <Icon name="heroicons:chevron-left" class="w-5 h-5" />
          </button>
          <button
            type="button"
            class="p-2 rounded-lg text-text-secondary hover:text-brand-primary hover:bg-brand-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            :disabled="!nextLesson"
            aria-label="Próxima aula"
            @click="goNext"
          >
            <Icon name="heroicons:chevron-right" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 w-full py-4 lg:min-h-0">
        <div class="flex flex-col gap-6 min-w-0">
          <VideoPlayer
            :key="currentLessonId"
            :src="currentLesson?.videoUrl"
            :poster="detail.course.coverImage"
            :placeholder-label="currentLesson ? `Aula ${currentLesson.order}: ${currentLesson.title}` : ''"
          />

          <section v-if="currentLesson" class="flex flex-col gap-4">
            <h2 class="text-lg font-bold text-text-primary">
              About this lesson
            </h2>
            <p class="text-sm text-text-secondary leading-relaxed">
              {{ currentLesson.description }}
            </p>
            <div class="flex flex-wrap gap-3">
              <span class="inline-flex items-center gap-1.5 text-sm text-text-secondary">
                <Icon name="heroicons:clock" class="w-4 h-4 shrink-0 text-brand-primary" />
                {{ currentLesson.duration }}
              </span>
              <span class="inline-flex items-center gap-1.5 text-sm text-text-secondary">
                <Icon name="heroicons:chart-bar" class="w-4 h-4 shrink-0 text-brand-primary" />
                {{ currentLesson.level }}
              </span>
              <span class="inline-flex items-center gap-1.5 text-sm text-text-secondary">
                <Icon name="heroicons:calendar" class="w-4 h-4 shrink-0 text-brand-primary" />
                Updated {{ currentLesson.updatedAt }}
              </span>
            </div>
          </section>

          <MaterialsList
            v-if="currentLesson && currentLesson.materials.length > 0"
            :materials="currentLesson.materials"
          />
        </div>

        <LessonSidebar
          :modules="detail.modules"
          :current-lesson-id="currentLessonId"
          :completed-count="completedCount"
          :total-lessons="totalLessons"
          :progress-percent="progressPercent"
          @select-lesson="selectLesson"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const courseId = computed(() => route.params.id as string)

const {
  detail,
  currentLesson,
  currentLessonId,
  completedCount,
  totalLessons,
  progressPercent,
  previousLesson,
  nextLesson,
  selectLesson,
  goPrevious,
  goNext,
} = useCourseDetail(courseId)
</script>
