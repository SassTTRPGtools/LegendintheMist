<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="px-4 py-6">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-gray-600 hover:text-gray-800 transition-colors">
            <Icon name="lucide:arrow-left" class="w-6 h-6" />
          </NuxtLink>
          <h1 class="text-xl font-bold text-gray-900 flex items-center">
            <Icon name="lucide:sparkles" class="w-5 h-5 mr-2" />
            迷霧傳奇
          </h1>
          <div class="w-6"></div> <!-- Spacer -->
        </div>
      </div>
    </div>

    <div class="text-center py-20">
      <!-- Hero Section -->
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          <span class="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            迷霧傳奇
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 mb-4">
          Legend in the Mist
        </p>
        <p class="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          一個以標籤為核心的角色扮演遊戲系統，讓你創造任何想像得到的英雄，在神秘的迷霧世界中展開冒險。
        </p>
      </div>

      <!-- Features -->
      <div class="max-w-6xl mx-auto px-4 mb-16">
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:tag" class="w-6 h-6 text-green-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">標籤驅動系統</h3>
            <p class="text-gray-600 text-sm">用簡潔的標籤描述角色特質，靈活且直觀的角色建構方式</p>
          </div>

          <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:layers" class="w-6 h-6 text-purple-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">主題創建</h3>
            <p class="text-gray-600 text-sm">通過起源、冒險、偉業等主題，塑造多面向的英雄角色</p>
          </div>

          <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:zap" class="w-6 h-6 text-blue-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">動態故事</h3>
            <p class="text-gray-600 text-sm">角色與使命隨故事發展而演變，創造獨特的敘事體驗</p>
          </div>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="mt-12 space-y-4">
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/LitM/character-creation-guide"
            class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl inline-block"
          >
            <Icon name="lucide:user-plus" class="w-5 h-5 mr-2 inline" />
            角色創建指南
          </NuxtLink>
          <NuxtLink 
            to="/LitM/character-reference"
            class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl inline-block"
          >
            <Icon name="lucide:scroll-text" class="w-5 h-5 mr-2 inline" />
            角色創建參考
          </NuxtLink>
          <NuxtLink 
            to="/LitM/how-to-play"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl inline-block"
          >
            <Icon name="lucide:book-open" class="w-5 h-5 mr-2 inline" />
            如何遊玩
          </NuxtLink>
        </div>
      </div>

      <!-- Quick Navigation -->
      <div class="max-w-4xl mx-auto px-4 mt-16">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">快速開始</h3>
        <div class="grid sm:grid-cols-2 gap-6">
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h4 class="text-lg font-semibold text-green-800 mb-2">新手玩家</h4>
            <p class="text-green-700 text-sm mb-4">第一次接觸迷霧傳奇？從這裡開始</p>
            <NuxtLink 
              to="/LitM/character-creation-guide"
              class="text-green-600 hover:text-green-800 font-medium text-sm"
            >
              查看創建指南 →
            </NuxtLink>
          </div>

          <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
            <h4 class="text-lg font-semibold text-purple-800 mb-2">資深玩家</h4>
            <p class="text-purple-700 text-sm mb-4">需要詳細的規則與參考資料</p>
            <NuxtLink 
              to="/LitM/how-to-play"
              class="text-purple-600 hover:text-purple-800 font-medium text-sm"
            >
              查看完整規則 →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '迷霧傳奇 - 角色扮演遊戲系統',
  meta: [
    { name: 'description', content: '探索神秘世界，建立獨特角色，展開傳奇冒險' }
  ]
})
</script>

<style scoped>
/* 卡片懸停效果 */
.bg-white {
  transition: all 0.2s ease-in-out;
}

.bg-white:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* 按鈕懸停效果 */
.shadow-lg:hover {
  transform: translateY(-1px);
}
</style>
