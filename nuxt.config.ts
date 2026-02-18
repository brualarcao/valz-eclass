// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pwa: {
    strategies: 'generateSW',
    registerType: 'autoUpdate',
    manifest: {
      name: 'Valz eClass',
      short_name: 'Valz-eClass',
      theme_color: '#6366f1',
      icons: [
        { src: 'icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icon-512x512.png', sizes: '512x512', type: 'image/png' }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
    }
  },
  future: {
    compatibilityVersion: 4,
  },
  ssr: true,
  nitro: {
    static: true,
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@vite-pwa/nuxt', '@nuxt/test-utils/module'],
  typescript: {
    strict: true
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      loginEmail: '',
      loginPassword: '',
    },
    loginEmail: '',
    loginPassword: '',
    emptyState: false,
  },
})