// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],
  css: ['~/assets/app.css'],
  
  app: {
    baseURL: "/LegendintheMist/",
    buildAssetsDir: '/_nuxt/',
  },
  
  // 確保正確的建構設定
  nitro: {
    preset: 'static'
  }
})
