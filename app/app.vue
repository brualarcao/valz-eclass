<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) => title ? `${title} - Valz eClass` : 'Valz eClass - Login',
  htmlAttrs: {
    lang: 'pt-BR'
  }
})
</script>