<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-brand-primary text-text-primary font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
  >
    <span v-if="loading">Loading...</span>
    <template v-else>
      <span>{{ label }}</span>
      <Icon name="heroicons:arrow-right" class="w-5 h-5" />
    </template>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    loading?: boolean
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    label: 'Sign In',
    loading: false,
    disabled: false,
    type: 'button',
  }
)
</script>
