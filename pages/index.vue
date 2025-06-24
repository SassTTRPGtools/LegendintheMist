<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="text-center py-20">
      <!-- Hero Section -->
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          迷霧引擎
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 mb-8">
          探索多元的角色扮演遊戲世界
        </p>
        <p class="text-lg text-gray-500 mb-12">
          選擇你喜愛的遊戲系統，開始你的傳奇冒險
        </p>
      </div>

      <!-- System Cards -->
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <!-- LitM Card -->
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <div class="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
              <h2 class="text-2xl font-bold text-white mb-2">迷霧傳奇</h2>
              <p class="text-purple-100">Legend in the Mist</p>
            </div>
            <div class="p-6">
              <p class="text-gray-600 mb-6">
                一個以標籤為核心的角色扮演遊戲系統，讓你創造任何想像得到的英雄，在神秘的迷霧世界中展開冒險。
              </p>
              <div class="space-y-3 mb-6">
                <div class="flex items-center text-sm text-gray-500">
                  <Icon name="lucide:check-circle" class="w-4 h-4 mr-2 text-green-500" />
                  標籤驅動的角色系統
                </div>
                <div class="flex items-center text-sm text-gray-500">
                  <Icon name="lucide:check-circle" class="w-4 h-4 mr-2 text-green-500" />
                  靈活的主題創建
                </div>
                <div class="flex items-center text-sm text-gray-500">
                  <Icon name="lucide:check-circle" class="w-4 h-4 mr-2 text-green-500" />
                  動態的故事發展
                </div>
              </div>
              <NuxtLink 
                to="/LitM"
                class="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
              >
                進入迷霧傳奇
              </NuxtLink>
            </div>
          </div>

          <!-- Coming Soon Card -->
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden opacity-75">
            <div class="bg-gradient-to-r from-gray-500 to-gray-600 p-6">
              <h2 class="text-2xl font-bold text-white mb-2">其他系統</h2>
              <p class="text-gray-200">More Systems Coming</p>
            </div>
            <div class="p-6">
              <p class="text-gray-600 mb-6">
                更多精彩的角色扮演遊戲系統正在規劃中，敬請期待！
              </p>
              <div class="space-y-3 mb-6">
                <div class="flex items-center text-sm text-gray-400">
                  <Icon name="lucide:clock" class="w-4 h-4 mr-2" />
                  正在開發中
                </div>
                <div class="flex items-center text-sm text-gray-400">
                  <Icon name="lucide:star" class="w-4 h-4 mr-2" />
                  敬請期待
                </div>
                <div class="flex items-center text-sm text-gray-400">
                  <Icon name="lucide:heart" class="w-4 h-4 mr-2" />
                  更多驚喜
                </div>
              </div>
              <button 
                disabled
                class="block w-full bg-gray-400 text-white font-bold py-3 px-6 rounded-lg cursor-not-allowed text-center"
              >
                即將推出
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Access -->
      <div class="max-w-4xl mx-auto px-4">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">快速導覽</h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink 
            to="/LitM/character-creation-guide"
            class="bg-emerald-100 hover:bg-emerald-200 p-4 rounded-lg transition-colors duration-200 group"
          >
            <div class="flex items-center text-emerald-700 group-hover:text-emerald-800">
              <Icon name="lucide:user-plus" class="w-5 h-5 mr-2" />
              <span class="font-medium">角色創建指南</span>
            </div>
            <p class="text-emerald-600 text-sm mt-1">學習如何創建英雄</p>
          </NuxtLink>

          <NuxtLink 
            to="/LitM/character-reference"
            class="bg-purple-100 hover:bg-purple-200 p-4 rounded-lg transition-colors duration-200 group"
          >
            <div class="flex items-center text-purple-700 group-hover:text-purple-800">
              <Icon name="lucide:scroll-text" class="w-5 h-5 mr-2" />
              <span class="font-medium">角色創建參考</span>
            </div>
            <p class="text-purple-600 text-sm mt-1">查看主題與範例</p>
          </NuxtLink>

          <NuxtLink 
            to="/LitM/how-to-play"
            class="bg-blue-100 hover:bg-blue-200 p-4 rounded-lg transition-colors duration-200 group"
          >
            <div class="flex items-center text-blue-700 group-hover:text-blue-800">
              <Icon name="lucide:book-open" class="w-5 h-5 mr-2" />
              <span class="font-medium">如何遊玩</span>
            </div>
            <p class="text-blue-600 text-sm mt-1">了解遊戲規則</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '迷霧引擎 - 角色扮演遊戲平台',
  meta: [
    { name: 'description', content: '探索多元的角色扮演遊戲世界，從迷霧傳奇開始你的冒險旅程' }
  ]
})
</script>

<style scoped>
/* 卡片懸停效果 */
.transform:hover {
  transform: translateY(-4px) scale(1.02);
}

/* 自定義動畫 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}
</style>
