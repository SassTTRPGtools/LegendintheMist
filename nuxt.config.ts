// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  
  // 明確的 Tailwind CSS 配置
  tailwindcss: {
    exposeConfig: true,
    configPath: './tailwind.config.js'
  },
  
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
  
  // SPA 模式，避免 SSR 相關問題
  ssr: false,
  
  // GitHub Pages 建構配置
  nitro: {
    preset: 'static'
  }
})