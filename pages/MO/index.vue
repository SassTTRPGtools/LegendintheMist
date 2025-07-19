<template>
  <div class="min-h-screen bg-gray-900 relative overflow-hidden">

    <!-- 賽博龐克網格背景 -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px); background-size: 20px 20px;"></div>
    </div>
    
    <!-- Header -->
    <div class="bg-black/80 backdrop-blur-sm shadow-xl border-b border-cyan-500/30 relative z-10">
      <div class="px-4 py-6">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-cyan-300 hover:text-cyan-100 transition-colors">
            <Icon name="lucide:arrow-left" class="w-6 h-6" />
          </NuxtLink>
          <h1 class="text-xl font-bold text-cyan-100 flex items-center">
            <Icon name="lucide:cpu" class="w-5 h-5 mr-2 text-cyan-400" />
            都市異景
          </h1>
          <div class="w-6"></div> <!-- Spacer -->
        </div>
      </div>
    </div>    <div class="text-center py-20 relative z-10">
      <!-- Hero Section -->
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
          <span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            都市異景
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-cyan-300 mb-4">
          Metro :Otherscape
        </p>        <p class="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
          在霓虹閃爍的賽博龐克都市中，透過標籤與主題系統打造你的獨特角色。從賽博義體改造到企業從屬關係，每個標籤都代表你在這個數位迷宮中的生存技能與身份定位。
        </p>
      </div>

      <!-- Features -->
      <div class="max-w-6xl mx-auto px-4 mb-16">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">          <div class="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-cyan-500/30 p-6 hover:border-cyan-400/50 transition-all">
            <div class="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
              <Icon name="lucide:cpu" class="w-6 h-6 text-cyan-400" />
            </div>
            <h3 class="text-lg font-semibold text-cyan-100 mb-2">標籤驅動</h3>
            <p class="text-gray-300 text-sm">用直覺的標籤系統描述角色能力與特質——從「賽博義體」到「駭客專家」，每個標籤都是你在都市中的生存優勢</p>
          </div>

          <div class="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-purple-500/30 p-6 hover:border-purple-400/50 transition-all">
            <div class="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
              <Icon name="lucide:layers3" class="w-6 h-6 text-purple-400" />
            </div>
            <h3 class="text-lg font-semibold text-purple-100 mb-2">主題創建</h3>
            <p class="text-gray-300 text-sm">透過「改造」、「從屬」、「雜音」等主題深度塑造角色背景，每個主題都有獨特的能力標籤與弱點標籤</p>
          </div>

          <div class="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-500/30 p-6 hover:border-blue-400/50 transition-all">
            <div class="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
              <Icon name="lucide:globe" class="w-6 h-6 text-blue-400" />
            </div>
            <h3 class="text-lg font-semibold text-blue-100 mb-2">賽博空間</h3>
            <p class="text-gray-300 text-sm">深入虛擬現實的數位世界，駭入企業網路與AI系統，用「資料竊取」、「系統入侵」等標籤展現你的網路戰技能</p>
          </div>

          <div class="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-green-500/30 p-6 hover:border-green-400/50 transition-all">
            <div class="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-green-500/30">
              <Icon name="lucide:target" class="w-6 h-6 text-green-400" />
            </div>
            <h3 class="text-lg font-semibold text-green-100 mb-2">動態進化</h3>
            <p class="text-gray-300 text-sm">標籤隨故事發展而變化——獲得新改造、建立新關係、掌握新技能，角色持續成長適應都市環境</p>
          </div>
        </div>
      </div>

      <!-- 系統特色 -->
      <div class="max-w-6xl mx-auto px-4 mb-16">
        <h3 class="text-2xl font-bold text-center text-cyan-100 mb-8 flex items-center justify-center">
          <Icon name="lucide:cpu" class="w-6 h-6 mr-2 text-cyan-400" />
          都市異景系統特色
        </h3>
        <div class="grid md:grid-cols-2 gap-6">          <div class="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-6 rounded-xl border border-cyan-500/30 backdrop-blur-sm">
            <h4 class="text-lg font-semibold text-cyan-200 mb-3 flex items-center">
              <Icon name="lucide:tag" class="w-5 h-5 mr-2" />
              直覺標籤系統
            </h4>
            <p class="text-gray-300 text-sm">
              從「反應晶片」到「企業特工」，用簡潔的標籤描述角色所有能力。每個標籤都有其獨特價值，讓你在街頭或企業大樓中都能發揮作用。
            </p>
          </div>
          
          <div class="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-6 rounded-xl border border-purple-500/30 backdrop-blur-sm">
            <h4 class="text-lg font-semibold text-purple-200 mb-3 flex items-center">
              <Icon name="lucide:book-open" class="w-5 h-5 mr-2" />
              主題驅動角色
            </h4>
            <p class="text-gray-300 text-sm">
              選擇「改造」獲得賽博義體，選擇「從屬」加入強大組織，選擇「雜音」掌握前沿科技。每個主題都提供獨特的標籤池與背景故事。
            </p>
          </div>
          
          <div class="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-6 rounded-xl border border-blue-500/30 backdrop-blur-sm">
            <h4 class="text-lg font-semibold text-blue-200 mb-3 flex items-center">
              <Icon name="lucide:zap" class="w-5 h-5 mr-2" />
              能力與弱點平衡
            </h4>
            <p class="text-gray-300 text-sm">
              每個主題都有能力標籤與弱點標籤。賽博義體讓你超越人類極限，但也可能讓你被黑市醫生或企業控制。力量伴隨代價。
            </p>
          </div>
          
          <div class="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-6 rounded-xl border border-green-500/30 backdrop-blur-sm">
            <h4 class="text-lg font-semibold text-green-200 mb-3 flex items-center">
              <Icon name="lucide:trending-up" class="w-5 h-5 mr-2" />
              標籤進化機制
            </h4>
            <p class="text-gray-300 text-sm">
              隨故事發展，標籤會升級、轉換或消失。「街頭駭客」可能進化為「企業間諜」，「基礎義肢」可能升級為「軍規改造」。
            </p>
          </div>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="mt-12 space-y-4">
        <!-- 主要功能按鈕 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <NuxtLink 
            to="/MO/character-builder"
            class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25 inline-block border border-purple-500/30 text-lg"
          >
            <Icon name="lucide:cpu" class="w-6 h-6 mr-2 inline" />
            互動式角色建立器
          </NuxtLink>
          <NuxtLink 
            to="/MO/character-creation-guide"
            class="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 inline-block border border-cyan-500/30"
          >
            <Icon name="lucide:book-open" class="w-5 h-5 mr-2 inline" />
            角色創建指南
          </NuxtLink>
        </div>      
        
        <!-- 額外工具按鈕 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <NuxtLink 
            to="/MO/template-creator"
            class="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 inline-block border border-emerald-500/30"
          >
            <Icon name="lucide:file-plus" class="w-5 h-5 mr-2 inline" />
            模板創建工具
          </NuxtLink>
          <NuxtLink 
            to="/MO/character-reference"
            class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25 inline-block border border-purple-500/30"
          >
            <Icon name="lucide:microchip" class="w-5 h-5 mr-2 inline" />
            角色創建參考
          </NuxtLink>
          <NuxtLink 
            to="/MO/megacity-generator"
            class="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 inline-block border border-cyan-500/30"
          >
            <Icon name="lucide:globe" class="w-5 h-5 mr-2 inline" />
            巨型都市產生器
          </NuxtLink>
          <NuxtLink 
            to="/MO/how-to-play"
            class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25 inline-block border border-blue-500/30"
          >
            <Icon name="lucide:terminal" class="w-5 h-5 mr-2 inline" />
            如何遊玩
          </NuxtLink>
        </div>

        <!-- 工具按鈕 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/MO/equipment-viewer"
            class="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-orange-500/25 inline-block border border-orange-500/30"
          >
            <Icon name="lucide:package" class="w-5 h-5 mr-2 inline" />
            裝備資料庫
          </NuxtLink>
          <NuxtLink 
            to="/MO/challenge-database"
            class="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-red-500/25 inline-block border border-red-500/30"
          >
            <Icon name="lucide:sword" class="w-5 h-5 mr-2 inline" />
            挑戰資料庫
          </NuxtLink>
          <NuxtLink 
            to="/MO/action-database"
            class="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-teal-500/25 inline-block border border-teal-500/30"
          >
            <Icon name="lucide:database" class="w-5 h-5 mr-2 inline" />
            行動資料庫
          </NuxtLink>
        </div>
      </div>      
    </div>
  </div>
</template>

<script setup>
import jsPDF from 'jspdf'
import { notoSansTCBase64 } from '~/utils/pdf-font-noto-sans-tc'

// PDF 匯出測試功能（中文，嵌入思源黑體）
const exportTestPDF = () => {
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  // 註冊字型
  pdf.addFileToVFS('NotoSansTC-Regular.ttf', notoSansTCBase64)
  pdf.addFont('NotoSansTC-Regular.ttf', 'NotoSansTC', 'normal')
  pdf.setFont('NotoSansTC')
  pdf.setFontSize(24)
  pdf.text('PDF 中文測試成功！', 40, 100)
  pdf.save('test.pdf')
}
useHead({
  title: '都市異景 - 賽博龐克角色扮演遊戲',
  meta: [
    { name: 'description', content: '透過標籤與主題系統打造獨特的賽博龐克角色。從賽博義體改造到企業從屬關係，每個標籤都代表你在霓虹都市中的生存技能與身份定位。' }
  ]
})

import MegacityGenerator from '~/components/MegacityGenerator/MegacityGenerator.vue'
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
