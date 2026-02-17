<template>
  <div class="relative w-full md:max-w-md md:shrink-0 min-w-0">
    <span
      class="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
      aria-hidden="true"
    >
      <Icon name="heroicons:magnifying-glass" class="w-5 h-5 shrink-0" />
    </span>
    <input
      :value="modelValue"
      type="search"
      placeholder="Search courses by name..."
      autocomplete="off"
      class="w-full pl-10 pr-4 py-2.5 rounded-lg bg-brand-surface border border-brand-border text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary text-base min-w-0"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
