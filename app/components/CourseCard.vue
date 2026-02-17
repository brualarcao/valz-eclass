<template>
  <article
    class="flex flex-col w-full max-w-[350px] rounded-lg overflow-hidden bg-brand-surface border border-brand-border"
  >
    <div class="relative w-full aspect-[2/1] shrink-0 bg-brand-dark">
      <img
        :src="course.coverImage"
        :alt="course.title"
        class="w-full h-full object-cover"
      >
      <span
        v-if="course.statusBadge"
        class="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-medium bg-brand-dark/90 text-text-primary border border-brand-border"
      >
        {{ course.statusBadge }}
      </span>
    </div>
    <div class="flex flex-col gap-3 p-4">
      <div class="flex items-center gap-2 text-brand-primary text-xs font-medium uppercase tracking-wide">
        <Icon :name="course.category.icon" class="w-4 h-4 shrink-0" />
        <span>{{ course.category.name }}</span>
      </div>
      <h2 class="text-lg font-bold text-text-primary line-clamp-2">
        {{ course.title }}
      </h2>
      <p class="text-sm text-text-secondary line-clamp-2">
        {{ course.shortDescription }}
      </p>
      <div class="flex flex-col gap-1">
        <div class="flex items-center justify-between text-xs text-text-secondary">
          <span>{{ course.progress }}%</span>
        </div>
        <div
          class="h-1.5 w-full rounded-full bg-brand-dark overflow-hidden"
          role="progressbar"
          :aria-valuenow="course.progress"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            class="h-full rounded-full bg-brand-primary transition-[width]"
            :style="{ width: `${course.progress}%` }"
          />
        </div>
      </div>
      <div class="flex items-center gap-4 text-sm text-text-secondary">
        <span class="flex items-center gap-1.5">
          <Icon name="heroicons:document-text" class="w-4 h-4 shrink-0" />
          {{ course.lessonsCount }} Lessons
        </span>
        <span class="flex items-center gap-1.5">
          <Icon name="heroicons:clock" class="w-4 h-4 shrink-0" />
          {{ course.duration }}
        </span>
      </div>
      <div class="flex flex-col gap-2 pt-1">
        <ButtonAction
          label="Continue"
          type="button"
          @click="handleContinue"
        />
        <NuxtLink
          :to="`/courses/${course.id}`"
          class="w-full text-center text-sm font-medium text-brand-primary hover:text-brand-primary transition-colors py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          @click="emit('viewDetails', course)"
        >
          View details
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Course } from '../types/course'

const props = defineProps<{
  course: Course
}>()

const emit = defineEmits<{
  continue: [course: Course]
  viewDetails: [course: Course]
}>()

function handleContinue() {
  navigateTo(`/courses/${props.course.id}`)
  emit('continue', props.course)
}
</script>
