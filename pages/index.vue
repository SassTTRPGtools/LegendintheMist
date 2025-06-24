<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="text-center py-20">      <!-- Hero Section -->
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          <span class="block text-2xl md:text-3xl font-normal text-gray-600 mt-2">數位輔助工具</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 mb-4">
          探索多元的角色扮演遊戲世界
        </p>
        <p class="text-lg text-gray-500 mb-6">
          選擇你喜愛的遊戲系統，開始你的傳奇冒險
        </p>
        <div class="text-sm text-gray-500 mb-12">
          <Icon name="lucide:info" class="w-4 h-4 inline mr-1" />
          基於 <a href="https://sonofoak.com/" target="_blank">Son of Oak Game Studio</a> 的迷霧引擎系統製作
        </div>
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
                <h2 class="text-2xl font-bold text-white mb-2">
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
      </div>
    </div>
  </div>
</template>

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
