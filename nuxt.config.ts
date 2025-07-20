// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@vueuse/nuxt'],
  css: ['~/assets/app.css'],
  
  app: {
    baseURL: "/LegendintheMist/",
    buildAssetsDir: '/_nuxt/',
  },
  
  // 靜態生成設定
  nitro: {
    preset: 'github-pages',
    prerender: {
      routes: ['/']
    }
  },
  
  // 確保 SPA 模式用於 GitHub Pages
  ssr: false
})