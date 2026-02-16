<template>
  <div class="flex flex-col h-screen bg-brand-dark overflow-hidden">
    <Header />

    <main class="flex-1 overflow-y-auto container px-6 py-4">
      <slot /> 
    </main>

    <Footer />
  </div>
</template>