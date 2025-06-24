<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-8">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="px-4 py-6">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-gray-600 hover:text-gray-800 transition-colors">
            <Icon name="lucide:arrow-left" class="w-6 h-6" />
          </NuxtLink>
          <h1 class="text-xl font-bold text-gray-900 flex items-center">
            <Icon name="lucide:clock" class="w-5 h-5 mr-2" />
            其他系統
          </h1>
          <div class="w-6"></div> <!-- Spacer -->
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 py-12 max-w-4xl mx-auto text-center">
      <!-- Coming Soon Icon -->
      <div class="mb-8">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
          <Icon name="lucide:sparkles" class="w-12 h-12 text-white" />
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        即將推出
      </h1>
      
      <!-- Description -->
      <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        我們正在開發更多精彩的角色扮演遊戲系統，為您帶來更豐富的遊戲體驗。
      </p>

      <!-- Features Coming -->
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white rounded-xl shadow-sm border p-6">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:gamepad-2" class="w-6 h-6 text-blue-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">新遊戲系統</h3>
          <p class="text-gray-600 text-sm">全新的遊戲機制與世界觀</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border p-6">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:users" class="w-6 h-6 text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">多人協作</h3>
          <p class="text-gray-600 text-sm">更好的多人遊戲體驗</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border p-6">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:palette" class="w-6 h-6 text-purple-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">豐富內容</h3>
          <p class="text-gray-600 text-sm">更多主題與角色選項</p>
        </div>
      </div>

      <!-- Progress Indicator -->
      <div class="bg-white rounded-xl shadow-sm border p-8 mb-8">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">開發進度</h3>
        <div class="relative">
          <div class="flex mb-2 items-center justify-between">
            <div>
              <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                規劃階段
              </span>
            </div>
            <div class="text-right">
              <span class="text-xs font-semibold inline-block text-blue-600">
                25%
              </span>
            </div>
          </div>
          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div style="width:25%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"></div>
          </div>
        </div>
        <p class="text-gray-600 text-sm">
          我們正在仔細規劃新系統的核心機制與世界觀設定
        </p>
      </div>

      <!-- Back to Home -->
      <div class="space-y-4">
        <p class="text-gray-600">
          在新系統完成之前，不妨先體驗一下
        </p>
        <NuxtLink 
          to="/LitM"
          class="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <Icon name="lucide:sparkles" class="w-5 h-5 mr-2 inline" />
          體驗迷霧傳奇
        </NuxtLink>
      </div>

      <!-- Contact Info -->
      <div class="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <h4 class="text-lg font-semibold text-gray-900 mb-2">想要了解更多？</h4>
        <p class="text-gray-600 text-sm mb-4">
          如果您對即將推出的新系統有任何建議或想法，歡迎與我們聯繫
        </p>
        <a href="#" class="text-blue-600 hover:text-blue-700 font-medium text-sm">
          聯絡我們 →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '其他系統 - 即將推出',
  meta: [
    { name: 'description', content: '更多精彩的角色扮演遊戲系統正在開發中，敬請期待' }
  ]
})
</script>

<style scoped>
/* 進度條動畫 */
.transition-all {
  transition: all 0.5s ease-in-out;
}

/* 卡片懸停效果 */
.bg-white {
  transition: all 0.2s ease-in-out;
}

.bg-white:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
</style>
