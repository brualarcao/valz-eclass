<template>
  <aside class="flex flex-col w-full lg:max-w-sm shrink-0">
    <h2 class="text-lg font-bold text-text-primary mb-2">
      Course Content
    </h2>
    <p class="text-sm text-text-secondary mb-3">
      {{ completedCount }} of {{ totalLessons }} Lessons Completed
    </p>
    <div class="flex items-center gap-2 mb-4">
      <div
        class="h-2 flex-1 rounded-full bg-brand-dark overflow-hidden"
        role="progressbar"
        :aria-valuenow="progressPercent"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="h-full rounded-full bg-brand-primary transition-[width]"
          :style="{ width: `${progressPercent}%` }"
        />
      </div>
      <span class="text-sm font-medium text-text-primary">{{ progressPercent }}%</span>
    </div>
    <div class="flex flex-col gap-4 overflow-y-auto max-h-[60vh] lg:max-h-none">
      <div
        v-for="module in modules"
        :key="module.id"
        class="flex flex-col gap-2"
      >
        <h3 class="text-xs font-semibold uppercase tracking-wide text-text-secondary">
          {{ module.title }}
        </h3>
        <ul class="flex flex-col gap-0" role="list">
          <li
            v-for="lesson in module.lessons"
            :key="lesson.id"
            class="rounded-lg border transition-colors"
            :class="isCurrentLesson(lesson.id)
              ? 'bg-brand-surface border-brand-primary'
              : lesson.locked
                ? 'border-transparent'
                : 'border-transparent'"
          >
            <button
              v-if="!lesson.locked"
              type="button"
              class="w-full flex items-center gap-3 py-2.5 px-3 text-left rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-inset"
              :class="isCurrentLesson(lesson.id) ? 'text-text-primary' : 'text-text-primary hover:bg-brand-surface/70'"
              :aria-current="isCurrentLesson(lesson.id) ? 'true' : undefined"
              :aria-label="`${lesson.title}, ${lesson.duration}${isCurrentLesson(lesson.id) ? ', reproduzindo' : ''}`"
              @click="emit('select-lesson', lesson.id)"
            >
              <span class="shrink-0 w-6 text-sm text-text-secondary" aria-hidden="true">
                {{ lesson.order }}
              </span>
              <template v-if="lesson.completed">
                <Icon name="heroicons:check-circle" class="w-5 h-5 shrink-0 text-brand-primary" aria-hidden="true" />
              </template>
              <template v-else-if="isCurrentLesson(lesson.id)">
                <Icon name="heroicons:play-circle" class="w-5 h-5 shrink-0 text-brand-primary" aria-hidden="true" />
              </template>
              <template v-else>
                <Icon name="heroicons:play-circle" class="w-5 h-5 shrink-0 text-text-secondary" aria-hidden="true" />
              </template>
              <div class="min-w-0 flex-1">
                <span class="block text-sm font-medium truncate">{{ lesson.title }}</span>
                <span class="block text-xs text-text-secondary">
                  {{ lesson.duration }}
                  <span v-if="isCurrentLesson(lesson.id)" class="text-brand-primary"> • Playing Now</span>
                </span>
              </div>
            </button>
            <div
              v-else
              class="flex items-center gap-3 py-2.5 px-3 text-text-secondary cursor-not-allowed"
              aria-disabled="true"
              role="presentation"
            >
              <span class="shrink-0 w-6 text-sm" aria-hidden="true">{{ lesson.order }}</span>
              <Icon name="heroicons:lock-closed" class="w-5 h-5 shrink-0" aria-hidden="true" />
              <div class="min-w-0 flex-1">
                <span class="block text-sm font-medium truncate">{{ lesson.title }}</span>
                <span class="block text-xs">{{ lesson.duration }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Module } from '../types/lesson'

const props = defineProps<{
  modules: Module[]
  currentLessonId: string | null
  completedCount: number
  totalLessons: number
  progressPercent: number
}>()

const emit = defineEmits<{
  'select-lesson': [lessonId: string]
}>()

const isCurrentLesson = (lessonId: string) => props.currentLessonId === lessonId
</script>
