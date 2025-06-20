// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  
  // GitHub Pages 部署配置
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  
  // 如果你的 GitHub 倉庫名稱不是 username.github.io，需要設定 base URL
  // 例如：倉庫名稱是 LegendintheMist，則取消下面註釋並修改
  app: {
    baseURL: '/LegendintheMist/'
  }
})