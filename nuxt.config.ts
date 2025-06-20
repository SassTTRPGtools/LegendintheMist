// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  
  // 引入主要 CSS 檔案
  css: ['~/assets/css/main.css'],
  
  // GitHub Pages 部署配置 
  app: {
    baseURL: '/LegendintheMist/'
  },
  
  // SPA 模式，避免 SSR 相關問題
  ssr: false,
  
  // GitHub Pages 建構配置
  nitro: {
    preset: 'github-pages'
  }
})