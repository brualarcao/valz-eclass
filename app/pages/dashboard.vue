<template>
  <div class="flex flex-col min-h-screen bg-brand-dark">
    <Header />
    <main class="flex-1 p-8">
      <h1 class="text-2xl font-bold text-text-primary">
        Dashboard
      </h1>
      <p class="text-text-secondary mt-2">
        Página de destino após login. (placeholder)
      </p>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>
