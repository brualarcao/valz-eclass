<template>
  <header
    class="w-full bg-brand-dark border-b border-brand-border px-6 py-4 flex items-center justify-between"
  >
    <NuxtLink
      to="/dashboard"
      class="flex items-center gap-2 text-text-primary font-bold text-xl hover:opacity-90 transition-opacity"
    >
      <img
        src="/valz-icon.png"
        alt="Valz logo"
        class="w-auto h-10"
      >
    </NuxtLink>

    <div class="flex items-center gap-4">
      
      <div
        class="flex items-center justify-center w-10 h-10 rounded-full bg-brand-surface border border-brand-border text-text-primary font-semibold text-sm overflow-hidden shrink-0"
        role="img"
        :aria-label="`Avatar de ${userName}`"
      >
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          :alt="userName"
          class="w-full h-full object-cover"
        >
        <span v-else>{{ userInitials }}</span>
      </div>

      <span class="text-text-primary font-medium">{{ userName }}</span>

      <button
        type="button"
        class="p-1.5 text-text-secondary hover:text-brand-primary transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
        aria-label="Logout"
        @click="handleLogout"
      >
        <Icon name="heroicons:arrow-right-on-rectangle" class="w-5 h-5" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    userName?: string
    userInitials?: string
    avatarUrl?: string
  }>(),
  {
    userName: 'Bruno Alarcão',
    userInitials: 'BA',
    avatarUrl: undefined,
  }
)

function handleLogout() {
  navigateTo('/login')
}
</script>
