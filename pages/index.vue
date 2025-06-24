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
          </div>          <!-- MO Card -->
          <div class="bg-gray-900 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border border-cyan-500/30">
            <div class="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-6 relative overflow-hidden">
              <!-- 賽博龐克網格背景 -->
              <div class="absolute inset-0 opacity-20">
                <div class="absolute inset-0" style="background-image: linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px); background-size: 20px 20px;"></div>
              </div>
              <div class="relative z-10">
                <h2 class="text-2xl font-bold text-white mb-2 flex items-center">
                  <Icon name="lucide:cpu" class="w-6 h-6 mr-2" />
                  都市異景
                </h2>
                <p class="text-cyan-100">Metro :Otherscape</p>
              </div>
            </div>
            <div class="p-6 bg-gray-900">
              <p class="text-gray-300 mb-6">
                在霓虹閃爍的賽博龐克都市中，探索科技與人性的邊界。駭客、改造人、企業特工在這個數位迷宮中追尋真相與自由。
              </p>
              <div class="space-y-3 mb-6">
                <div class="flex items-center text-sm text-cyan-400">
                  <Icon name="lucide:check-circle" class="w-4 h-4 mr-2 text-cyan-500" />
                  賽博龐克世界觀
                </div>
                <div class="flex items-center text-sm text-cyan-400">
                  <Icon name="lucide:check-circle" class="w-4 h-4 mr-2 text-cyan-500" />
                  科技強化角色
                </div>
                <div class="flex items-center text-sm text-cyan-400">
                  <Icon name="lucide:check-circle" class="w-4 h-4 mr-2 text-cyan-500" />
                  企業陰謀劇情
                </div>
              </div>
              <NuxtLink 
                to="/MO"
                class="block w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 text-center shadow-lg hover:shadow-cyan-500/25"
              >
                進入都市異景
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>      <!-- Quick Access -->
      <div class="max-w-4xl mx-auto px-4">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">快速導覽</h3>
        
        <!-- LitM Links -->
        <div class="mb-8">
          <h4 class="text-lg font-semibold text-purple-700 mb-4 flex items-center">
            <Icon name="lucide:sparkles" class="w-5 h-5 mr-2" />
            迷霧傳奇
          </h4>
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

        <!-- MO Links -->
        <div>
          <h4 class="text-lg font-semibold text-cyan-400 mb-4 flex items-center">
            <Icon name="lucide:cpu" class="w-5 h-5 mr-2" />
            都市異景
          </h4>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <NuxtLink 
              to="/MO/character-creation-guide"
              class="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors duration-200 group border border-cyan-500/30"
            >
              <div class="flex items-center text-cyan-300 group-hover:text-cyan-200">
                <Icon name="lucide:user-plus" class="w-5 h-5 mr-2" />
                <span class="font-medium">角色創建指南</span>
              </div>
              <p class="text-cyan-400 text-sm mt-1">打造賽博角色</p>
            </NuxtLink>

            <NuxtLink 
              to="/MO/character-reference"
              class="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors duration-200 group border border-purple-500/30"
            >
              <div class="flex items-center text-purple-300 group-hover:text-purple-200">
                <Icon name="lucide:microchip" class="w-5 h-5 mr-2" />
                <span class="font-medium">角色創建參考</span>
              </div>
              <p class="text-purple-400 text-sm mt-1">賽博龐克主題</p>
            </NuxtLink>

            <NuxtLink 
              to="/MO/how-to-play"
              class="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors duration-200 group border border-blue-500/30"
            >
              <div class="flex items-center text-blue-300 group-hover:text-blue-200">
                <Icon name="lucide:terminal" class="w-5 h-5 mr-2" />
                <span class="font-medium">如何遊玩</span>
              </div>
              <p class="text-blue-400 text-sm mt-1">都市異景規則</p>
            </NuxtLink>
          </div>
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
