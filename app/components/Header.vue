<template>
  <header
    class="w-full bg-brand-dark border-b border-brand-border px-6 py-4 flex items-center justify-between"
  >
    <NuxtLink
      to="/"
      class="flex items-center gap-2 text-text-primary font-bold text-xl hover:opacity-90 transition-opacity"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-7 h-7 text-brand-primary"
        aria-hidden="true"
      >
        <path d="M2 2l10 20 10-20h-6l-4 8-4-8H2z" />
      </svg>
      <span>Valz eClass</span>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9a.75.75 0 01-1.5 0V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
            clip-rule="evenodd"
          />
        </svg>
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
