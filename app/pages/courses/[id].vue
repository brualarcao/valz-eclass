<template>
  <div class="flex flex-col w-full max-w-full min-w-0">
    <section class="w-full py-4 md:py-5 px-0">
      <h1 class="text-2xl sm:text-3xl font-bold text-text-primary">
        Detalhe do curso
      </h1>
      <p class="text-text-secondary text-sm sm:text-base mt-2">
        Curso ID: {{ route.params.id }}
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
