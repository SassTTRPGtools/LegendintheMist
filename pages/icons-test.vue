<!-- Icon 測試頁面 -->
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">
        圖示測試頁面
      </h1>
      
      <!-- 基本圖示測試 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">基本圖示</h2>        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <!-- Fluent Emoji High Contrast -->
          <div class="flex flex-col items-center p-4 border rounded-lg bg-blue-50">
            <Icon name="fluent-emoji-high-contrast:leaf-fluttering-in-wind" class="w-8 h-8 mb-2" />
            <span class="text-sm text-gray-600 font-semibold">Leaf (Fluent)</span>
          </div>
          
          <div class="flex flex-col items-center p-4 border rounded-lg bg-blue-50">
            <Icon name="fluent-emoji-high-contrast:crossed-swords" class="w-8 h-8 mb-2" />
            <span class="text-sm text-gray-600 font-semibold">Swords (Fluent)</span>
          </div>
          
          <div class="flex flex-col items-center p-4 border rounded-lg bg-blue-50">
            <Icon name="fluent-emoji-high-contrast:crown" class="w-8 h-8 mb-2" />
            <span class="text-sm text-gray-600 font-semibold">Crown (Fluent)</span>
          </div>
          
          <!-- Leaf -->
          <div class="flex flex-col items-center p-4 border rounded-lg">
            <Icon name="material-symbols:eco" class="w-8 h-8 text-green-600 mb-2" />
            <span class="text-sm text-gray-600">Leaf (Eco)</span>
          </div>
          
          <!-- Sword -->
          <div class="flex flex-col items-center p-4 border rounded-lg">
            <Icon name="game-icons:crossed-swords" class="w-8 h-8 text-red-600 mb-2" />
            <span class="text-sm text-gray-600">Crossed Swords</span>
          </div>
          
          <!-- Crown -->
          <div class="flex flex-col items-center p-4 border rounded-lg">
            <Icon name="material-symbols:crown" class="w-8 h-8 text-yellow-600 mb-2" />
            <span class="text-sm text-gray-600">Crown</span>
          </div>
          
          <!-- Alternative Leaf -->
          <div class="flex flex-col items-center p-4 border rounded-lg">
            <Icon name="lucide:leaf" class="w-8 h-8 text-green-500 mb-2" />
            <span class="text-sm text-gray-600">Leaf (Lucide)</span>
          </div>
          
          <!-- Alternative Sword -->
          <div class="flex flex-col items-center p-4 border rounded-lg">
            <Icon name="lucide:sword" class="w-8 h-8 text-gray-700 mb-2" />
            <span class="text-sm text-gray-600">Sword (Lucide)</span>
          </div>
          
          <!-- Alternative Crown -->
          <div class="flex flex-col items-center p-4 border rounded-lg">
            <Icon name="lucide:crown" class="w-8 h-8 text-purple-600 mb-2" />
            <span class="text-sm text-gray-600">Crown (Lucide)</span>
          </div>
        </div>
      </div>

      <!-- 主題相關圖示 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">主題相關圖示</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <!-- Destiny -->
          <div class="flex flex-col items-center p-4 border rounded-lg">
            <Icon name="material-symbols:star" class="w-8 h-8 text-blue-600 mb-2" />
            <span class="text-sm text-gray-600">Destiny</span>
          </div>
          
          <!-- Mastery -->
          <div class="flex flex-col items-center p-4 border rounded-lg">
            <Icon name="material-symbols:school" class="w-8 h-8 text-purple-600 mb-2" />
            <span class="text-sm text-gray-600">Mastery</span>
          </div>
          
          <!-- Dominion -->
          <div class="flex flex-col items-center p-4 border rounded-lg">
            <Icon name="material-symbols:castle" class="w-8 h-8 text-red-600 mb-2" />
            <span class="text-sm text-gray-600">Dominion</span>
          </div>
          
          <!-- Monstrosity -->
          <div class="flex flex-col items-center p-4 border rounded-lg">
            <Icon name="game-icons:dragon-head" class="w-8 h-8 text-gray-800 mb-2" />
            <span class="text-sm text-gray-600">Monstrosity</span>
          </div>
        </div>
      </div>

      <!-- 使用說明 -->
      <div class="bg-blue-50 rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4 text-blue-900">使用說明</h2>
        <div class="space-y-2 text-blue-800">
          <p><strong>基本語法：</strong> <code class="bg-white px-2 py-1 rounded">&lt;Icon name="圖示名稱" class="樣式類別" /&gt;</code></p>          <p><strong>可用圖示庫：</strong></p>
          <ul class="list-disc list-inside ml-4 space-y-1">
            <li><strong>Fluent Emoji High Contrast:</strong> fluent-emoji-high-contrast:icon-name <span class="text-blue-600">(推薦)</span></li>
            <li><strong>Material Symbols:</strong> material-symbols:icon-name</li>
            <li><strong>Lucide:</strong> lucide:icon-name</li>
            <li><strong>Game Icons:</strong> game-icons:icon-name</li>
            <li><strong>Heroicons:</strong> heroicons:icon-name</li>
          </ul>
          <p><strong>尺寸控制：</strong> 使用 Tailwind 的 w-* 和 h-* 類別</p>
          <p><strong>顏色控制：</strong> 使用 Tailwind 的 text-* 類別</p>
        </div>
      </div>

      <!-- 返回連結 -->
      <div class="text-center mt-8">
        <NuxtLink to="/" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
          返回首頁
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// 頁面配置
definePageMeta({
  title: '圖示測試'
})
</script>
