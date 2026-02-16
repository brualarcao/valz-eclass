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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z"
                />
                <path
                  d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                  clip-rule="evenodd"
                />
              </svg>
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
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.322-1.323a7.012 7.012 0 003.3-3.3L19 10v1a.75.75 0 01-1.5 0v-1a.75.75 0 01-.181-.513 7.012 7.012 0 00-3.3-3.3L15 4.56V4a.75.75 0 01-1.5 0v.06l-1.97 1.97a9.916 9.916 0 00-2.56-.34c-2.6 0-5.02.97-6.94 2.64L3.28 2.22zM7 6.06l.94.94A2.5 2.5 0 017 6.06zm-2.72 5.12a9.92 9.92 0 001.46 1.46l1.37-1.37a4 4 0 015.66 5.66l1.37-1.37a9.92 9.92 0 001.46-1.46.75.75 0 000-1.06l-.01-.01a.75.75 0 00-1.06 0 8.44 8.44 0 01-1.43 1.2 7.96 7.96 0 01-1.2-1.43.75.75 0 00-1.06-.01l-.01.01a.75.75 0 000 1.06z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                />
                <path
                  fill-rule="evenodd"
                  d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
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

        <SignInButton type="submit" :loading="loading">
          Sign In
        </SignInButton>
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
    const { success } = await $fetch<{ success: boolean }>('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
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
