<template>
  <footer
    class="w-full bg-brand-dark border-t border-brand-border px-6 py-4 flex items-center justify-between text-text-secondary text-sm"
  >
    <p class="shrink-0">
      © {{ copyrightYear }} {{ companyName }}. All rights reserved.
    </p>
    <nav class="flex items-center gap-x-4 shrink-0" aria-label="Rodapé">
      <NuxtLink
        to="https://valzdigital.com/"
        target="_blank"
        class="text-text-secondary hover:text-brand-primary transition-colors"
      >
        Help Center
      </NuxtLink>
      <span class="text-brand-border" aria-hidden="true">|</span>
      <NuxtLink
        to="https://valzdigital.com/"
        target="_blank"
        class="text-text-secondary hover:text-brand-primary transition-colors"
      >
        Privacy Policy
      </NuxtLink>
      <span class="text-brand-border" aria-hidden="true">|</span>
      <NuxtLink
        to="https://valzdigital.com/"
        target="_blank"
        class="text-text-secondary hover:text-brand-primary transition-colors"
      >
        Terms of Service
      </NuxtLink>
    </nav>
  </footer>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    copyrightYear?: number
    companyName?: string
  }>(),
  {
    copyrightYear: 2026,
    companyName: 'Bruno Alarcão',
  }
)
</script>
