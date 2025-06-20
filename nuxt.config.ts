// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  
  // GitHub Pages 部署配置 
  app: {
    baseURL: '/LegendintheMist/'
  },
  
  // SPA 模式，避免 SSR 相關問題
  ssr: false
})