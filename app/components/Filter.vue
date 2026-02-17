<template>
  <div
    role="tablist"
    class="w-full flex items-center gap-6 pb-0 border-b border-brand-border"
  >
    <button
      type="button"
      role="tab"
      :aria-selected="modelValue === 'in-progress'"
      class="flex items-center gap-2 py-2 border-b-2 -mb-px transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded-t"
      :class="modelValue === 'in-progress' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-text-secondary hover:text-text-primary'"
      @click="emit('update:modelValue', 'in-progress')"
    >
      <Icon name="heroicons:play-circle" class="w-5 h-5 shrink-0" />
      <span class="font-medium">In Progress</span>
      <span
        class="px-2 py-0.5 rounded-full text-sm font-medium min-w-[1.5rem] text-center"
        :class="modelValue === 'in-progress' ? 'bg-brand-surface text-brand-primary' : 'bg-brand-surface/50 text-text-secondary'"
      >
        {{ inProgressCount }}
      </span>
    </button>
    <button
      type="button"
      role="tab"
      :aria-selected="modelValue === 'completed'"
      class="flex items-center gap-2 py-2 border-b-2 -mb-px transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded-t"
      :class="modelValue === 'completed' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-text-secondary hover:text-text-primary'"
      @click="emit('update:modelValue', 'completed')"
    >
      <Icon name="heroicons:check-circle" class="w-5 h-5 shrink-0" />
      <span class="font-medium">Completed</span>
      <span
        class="px-2 py-0.5 rounded-full text-sm font-medium min-w-[1.5rem] text-center"
        :class="modelValue === 'completed' ? 'bg-brand-surface text-brand-primary' : 'bg-brand-surface/50 text-text-secondary'"
      >
        {{ completedCount }}
      </span>
    </button>
    <button
      type="button"
      role="tab"
      :aria-selected="modelValue === 'not-started'"
      class="flex items-center gap-2 py-2 border-b-2 -mb-px transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded-t"
      :class="modelValue === 'not-started' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-text-secondary hover:text-text-primary'"
      @click="emit('update:modelValue', 'not-started')"
    >
      <Icon name="heroicons:bookmark" class="w-5 h-5 shrink-0" />
      <span class="font-medium">Not Started</span>
      <span
        class="px-2 py-0.5 rounded-full text-sm font-medium min-w-[1.5rem] text-center"
        :class="modelValue === 'not-started' ? 'bg-brand-surface text-brand-primary' : 'bg-brand-surface/50 text-text-secondary'"
      >
        {{ notStartedCount }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
export type CourseFilterValue = 'in-progress' | 'completed' | 'not-started'

withDefaults(
  defineProps<{
    modelValue: CourseFilterValue
    inProgressCount?: number
    completedCount?: number
    notStartedCount?: number
  }>(),
  {
    inProgressCount: 0,
    completedCount: 0,
    notStartedCount: 0,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: CourseFilterValue]
}>()
</script>
