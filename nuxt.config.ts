export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },

  css: [
    '~/assets/css/main.css',
    '~/assets/css/variables.css',
  ],

  modules: [
    '@pinia/nuxt',
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  nitro: {
    preset: 'node-server',
  },

  compatibilityDate: '2026-07-16',
})
