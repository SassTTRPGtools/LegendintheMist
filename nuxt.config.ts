// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  
  // 確保包含 Tailwind CSS
  css: ['~/assets/css/main.css'],
  
  // GitHub Pages 部署配置 
  app: {
    baseURL: '/LegendintheMist/',
    buildAssetsDir: '/_nuxt/',
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/LegendintheMist/favicon.ico' }
      ]
    }
  },
  
  // SPA 模式，完全避免 SSR
  ssr: false,
  
  // Nitro 配置 - 關閉預渲染
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: false,
      routes: []
    }
  },
  
  // 關閉可能造成問題的功能
  experimental: {
    payloadExtraction: false
  }
})