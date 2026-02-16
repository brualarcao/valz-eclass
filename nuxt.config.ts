// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  ssr: true,
  nitro: {
    static: true,
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  typescript: {
    strict: true
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    loginEmail: '',
    loginPassword: '',
  },
})