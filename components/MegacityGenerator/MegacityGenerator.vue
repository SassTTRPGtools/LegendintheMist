<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-0 px-0 flex flex-col items-center">
    <!-- Header -->
    <div class="w-full bg-black/80 backdrop-blur-sm shadow-xl border-b border-cyan-500/30 sticky top-0 z-10">
      <div class="px-4 py-6 max-w-2xl mx-auto flex items-center justify-between">
        <NuxtLink to="/MO" class="text-cyan-300 hover:text-cyan-100 transition-colors">
          <Icon name="lucide:arrow-left" class="w-6 h-6" />
        </NuxtLink>
        <h1 class="text-2xl md:text-3xl font-bold text-cyan-100 flex items-center">
          <Icon name="lucide:globe" class="w-7 h-7 mr-2 text-cyan-400" />
          巨型都市產生器
        </h1>
        <div class="w-6"></div>
      </div>
    </div>
    <!-- Main -->
    <div class="max-w-2xl w-full bg-gray-800/90 rounded-2xl shadow-2xl border border-cyan-500/30 p-8 mb-8 mt-10">
      <h2 class="text-3xl font-bold text-cyan-200 mb-2 flex items-center">
        <Icon name="lucide:globe" class="w-7 h-7 mr-2 text-cyan-400" />
        巨型都市產生器
      </h2>
      <p class="text-cyan-300 mb-6">隨機生成一個充滿都市異景風格的巨型都市主題與細節。</p>
      <button @click="generateMegacity" class="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 border border-cyan-500/30 mb-4">
        <Icon name="lucide:refresh-cw" class="w-5 h-5 mr-2 inline" />
        產生巨型都市
      </button>
      <div v-if="result" class="mt-6">
        <div class="mb-4">
          <span class="text-lg font-semibold text-cyan-100">主題支柱：</span>
          <span class="text-xl font-bold text-purple-300">{{ result.pillar }}</span>
        </div>
        <div v-if="result.subclass" class="mb-2">
          <span class="text-cyan-200">子類型：</span>
          <span class="text-purple-200">{{ result.subclass }}</span>
        </div>
        <div v-if="result.development" class="mb-2">
          <span class="text-cyan-200">發展細節：</span>
          <span class="text-purple-100">{{ result.development }}</span>
        </div>
      </div>
    </div>
    <div class="text-gray-400 text-xs opacity-60">資料來源：ThematicPillarsTable 與 MegacityGenerator/pillar</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const result = ref(null)

// 動態取得 basePath
function getBasePath() {
  if (process.env.NODE_ENV === 'production') {
    return '/LegendintheMist'
  }
  return ''
}

// 載入 JSON
async function fetchJson(path) {
  const basePath = getBasePath()
  const url = `${basePath}${path}`
  return await $fetch(url)
}

// 隨機產生巨型都市主題
async function generateMegacity() {
  // 1. 載入主題支柱表
  const pillarsTable = await fetchJson('/MO/MegacityGenerator/ThematicPillarsTable.json')
  // 2. 隨機選一個支柱
  const pillarIdx = Math.floor(Math.random() * pillarsTable.length)
  const pillarRow = pillarsTable[pillarIdx]
  // 3. 根據支柱名稱找對應 pillar json
  const pillarMap = {
    '廢墟之城': 'CitiesinRuins',
    '幫派、邪教與反文化': 'GangsCultsCountercultures',
    '武裝神話': 'MythologyWeaponized',
    '寡頭腐化': 'OligarchicCorruption',
    '網路空間蔓延': 'SprawlingCyberspace',
    '黑色科幻': 'TechNoir',
    '科技過載': 'TechnologicalOverdrive',
    '超人類主義': 'Transhumanism'
  }
  const pillarFile = pillarMap[pillarRow.pillar]
  if (!pillarFile) {
    result.value = { pillar: pillarRow.pillar, error: '找不到對應資料' }
    return
  }
  const pillarData = await fetchJson(`/MO/MegacityGenerator/pillar/${pillarFile}.json`)
  // 4. 隨機選一個子類型
  const subclasses = pillarData.subclasses
  const subclassIdx = Math.floor(Math.random() * subclasses.length)
  const subclass = subclasses[subclassIdx]
  // 5. 隨機選一個發展細節
  const developments = subclass.developments
  const devIdx = Math.floor(Math.random() * developments.length)
  const development = developments[devIdx]
  // 6. 輸出
  result.value = {
    pillar: pillarData.pillar,
    subclass: subclass.subclass,
    development
  }
}
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #6d28d9 100%);
}
</style>
