// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  
  // 確保包含 Tailwind CSS
  css: ['~/assets/css/main.css'],
  
  // GitHub Pages 部署配置
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/LegendintheMist/' : '/',
    buildAssetsDir: '/_nuxt/',
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: process.env.NODE_ENV === 'production' ? '/LegendintheMist/favicon.ico' : '/favicon.ico' }
      ]
    }
  },
  
  // SPA 模式避免預渲染問題
  ssr: false,
  
  // 靜態生成配置 - 改用 static preset
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/'],
      crawlLinks: false
    }
  },
  
  // 實驗性功能
  experimental: {
    payloadExtraction: false
  }
})