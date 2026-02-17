<template>
  <section class="flex flex-col gap-3">
    <h3 class="flex items-center gap-2 text-base font-semibold text-text-primary">
      <Icon name="heroicons:folder" class="w-5 h-5 text-brand-primary shrink-0" />
      Materials
    </h3>
    <ul class="flex flex-col gap-2">
      <li
        v-for="material in materials"
        :key="material.id"
        class="flex items-center justify-between gap-3 p-3 rounded-lg bg-brand-surface border border-brand-border hover:border-brand-primary/50 transition-colors"
      >
        <a
          :href="'/materials/material1.pdf'"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-3 min-w-0 flex-1 text-text-primary hover:text-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded"
        >
          <Icon name="heroicons:document" class="w-5 h-5 shrink-0 text-text-secondary" />
          <span class="truncate text-sm">{{ material.name }}</span>
        </a>
        <span class="text-xs text-text-secondary shrink-0">{{ material.size }}</span>
        <a
          :href="'/materials/material1.pdf'"
          target="_blank"
          rel="noopener noreferrer"
          class="p-1.5 text-text-secondary hover:text-brand-primary transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          :aria-label="`Baixar ${material.name}`"
        >
          <Icon name="heroicons:arrow-down-tray" class="w-5 h-5" />
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Material } from '../types/lesson'

defineProps<{
  materials: Material[]
}>()
</script>
