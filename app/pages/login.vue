<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-brand-dark bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08)_0%,transparent_50%)]"
  >
    <div class="flex flex-col items-center gap-2 mb-10">
      <img
      src="/valz-icon.png"
      alt="Valz"
      class="h-12 w-auto"
      width="48"
      height="48"
    >
      <span class="font-bold text-xl text-brand-primary">eClass</span>
    </div>

    <div
      class="w-full max-w-md rounded-xl bg-brand-surface border border-brand-border shadow-lg p-8"
    >
      <h1 class="text-2xl font-bold text-text-primary mb-1">
        Welcome back
      </h1>
      <p class="text-text-secondary text-sm mb-6">
        Enter your credentials to access your courses.
      </p>

      <p
        v-if="errorMessage"
        role="alert"
        class="mb-4 py-2.5 px-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
      >
        {{ errorMessage }}
      </p>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="block text-sm font-medium text-text-primary mb-1.5">
            Email
          </label>
          <div class="relative">
            <span
              class="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
              aria-hidden="true"
            >
              <Icon name="heroicons:envelope" class="w-5 h-5" />
            </span>
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="name@example.com"
              class="w-full pl-10 pr-4 py-2.5 rounded-lg bg-brand-dark border border-brand-border text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
            >
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-text-primary mb-1.5">
            Password
          </label>
          <div class="relative">
            <span
              class="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
              aria-hidden="true"
            >
              <Icon name="heroicons:lock-closed" class="w-5 h-5" />
            </span>
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full pl-10 pr-12 py-2.5 rounded-lg bg-brand-dark border border-brand-border text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
            >
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded p-0.5"
              :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
              @click="showPassword = !showPassword"
            >
              <Icon
                v-if="showPassword"
                name="heroicons:eye-slash"
                class="w-5 h-5"
              />
              <Icon
                v-else
                name="heroicons:eye"
                class="w-5 h-5"
              />
            </button>
          </div>
          <div class="flex justify-end mt-1.5">
            <NuxtLink
              to="https://valzdigital.com/" 
              target="_blank"
              class="text-sm text-text-secondary hover:text-brand-primary transition-colors"
            >
              Forgot password?
            </NuxtLink>
          </div>
        </div>

        <ButtonAction type="submit" :loading="loading">
          Sign In
        </ButtonAction>
      </form>

      <p class="text-center text-text-secondary text-sm mt-6">
        Don't have an account?
        <NuxtLink to="https://valzdigital.com/" target="_blank" class="text-brand-primary font-medium hover:underline">
          Sign up
        </NuxtLink>
      </p>
    </div>

    <footer class="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-text-secondary text-sm">
      <NuxtLink to="https://valzdigital.com/" target="_blank" class="hover:text-brand-primary transition-colors">
        Privacy Policy
      </NuxtLink>
      <span class="text-brand-border" aria-hidden="true">|</span>
      <NuxtLink to="https://valzdigital.com/" target="_blank" class="hover:text-brand-primary transition-colors">
        Terms of Service
      </NuxtLink>
      <span class="text-brand-border" aria-hidden="true">|</span>
      <NuxtLink to="https://valzdigital.com/" target="_blank" class="hover:text-brand-primary transition-colors">
        Help Center
      </NuxtLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  errorMessage.value = ''
  loading.value = true
  try {
    const auth = await $fetch<{ loginEmail: string; loginPassword: string }>('/data/auth.json')
    const validEmail = (auth.loginEmail ?? '').trim()
    const validPassword = (auth.loginPassword ?? '').trim()
    const success =
      validEmail && validPassword &&
      email.value.trim() === validEmail &&
      String(password.value) === String(validPassword)
    if (success) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      await navigateTo('/dashboard')
      return
    }
    errorMessage.value = 'Invalid credentials, please try again'
  } catch {
    errorMessage.value = 'Invalid credentials, please try again'
  } finally {
    loading.value = false
  }
}
</script>
