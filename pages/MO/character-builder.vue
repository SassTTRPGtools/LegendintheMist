<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
    <!-- 主要容器 -->
    <div class="container mx-auto px-4 py-8">
      <!-- 頂部區域 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- 左上角：雷達圖 -->
        <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-purple-500/30">
          <h3 class="text-xl font-bold text-purple-300 mb-4">角色能力雷達圖</h3>
          <div class="aspect-square relative bg-slate-700/50 rounded-lg flex items-center justify-center">
            <!-- 簡化的雷達圖 placeholder -->
            <div class="w-48 h-48 relative">
              <svg viewBox="0 0 200 200" class="w-full h-full">
                <!-- 雷達圖背景 -->
                <polygon 
                  points="100,20 173,50 173,150 100,180 27,150 27,50" 
                  fill="none" 
                  stroke="rgb(139, 92, 246)" 
                  stroke-width="1" 
                  opacity="0.3"
                />
                <!-- 雷達圖數據 -->
                <polygon 
                  :points="radarPoints" 
                  fill="rgb(139, 92, 246)" 
                  fill-opacity="0.3" 
                  stroke="rgb(139, 92, 246)" 
                  stroke-width="2"
                />
                <!-- 標籤 -->
                <text x="100" y="15" text-anchor="middle" fill="white" font-size="12">TECH</text>
                <text x="178" y="55" text-anchor="start" fill="white" font-size="12">COMBAT</text>
                <text x="178" y="155" text-anchor="start" fill="white" font-size="12">SOCIAL</text>
                <text x="100" y="195" text-anchor="middle" fill="white" font-size="12">MENTAL</text>
                <text x="22" y="155" text-anchor="end" fill="white" font-size="12">PHYSICAL</text>
                <text x="22" y="55" text-anchor="end" fill="white" font-size="12">SURVIVAL</text>
              </svg>
            </div>
          </div>
          <div class="mt-4 text-sm text-gray-300">
            <p>選擇主題卡將影響角色能力分布</p>
          </div>
        </div>

        <!-- 右上角：角色基本資訊 -->
        <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-purple-500/30">
          <h3 class="text-xl font-bold text-purple-300 mb-4">角色資訊</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">角色名稱</label>
              <input 
                v-model="character.name" 
                type="text" 
                class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="輸入角色名稱"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">背景描述</label>
              <textarea 
                v-model="character.background" 
                class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent h-20 resize-none"
                placeholder="角色的背景故事..."
              />
            </div>
          </div>
        </div>

        <!-- HOW TO PLAY 區塊 -->
        <div class="bg-slate-800/80 backdrop-blur rounded-lg border border-purple-500/30 overflow-hidden">
          <button 
            @click="showHowToPlay = !showHowToPlay"
            class="w-full px-6 py-4 text-left bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            <h3 class="text-xl font-bold text-white flex items-center justify-between">
              如何遊玩
              <svg 
                :class="['w-5 h-5 transition-transform', showHowToPlay ? 'rotate-180' : '']"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </h3>
          </button>
          <div v-show="showHowToPlay" class="p-6">
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 class="font-semibold text-purple-300">建立角色</h4>
                  <p class="text-sm text-gray-400">選擇四張主題卡來定義你的角色</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 class="font-semibold text-purple-300">進行行動</h4>
                  <p class="text-sm text-gray-400">根據情況選擇合適的行動方式</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 class="font-semibold text-purple-300">解決結果</h4>
                  <p class="text-sm text-gray-400">使用主題卡的能力來面對挑戰</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 四個主題卡區塊 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- EXPOSURE 卡 -->
        <div class="bg-gradient-to-br from-purple-800/80 to-purple-900/80 backdrop-blur rounded-lg p-6 border border-purple-400/50">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-bold text-purple-200">EXPOSURE</h3>
            <div class="w-8 h-8 bg-purple-500 rounded-full"></div>
          </div>
          <p class="text-purple-300 mb-4">你在都市異景中的暴露程度與適應能力</p>
          
          <div class="space-y-3">
            <div 
              v-for="option in exposureOptions" 
              :key="option.id"
              @click="selectThemeOption('exposure', option)"
              :class="[
                'p-3 rounded-lg border-2 cursor-pointer transition-all',
                character.exposure?.id === option.id 
                  ? 'border-purple-400 bg-purple-700/50' 
                  : 'border-purple-600/30 hover:border-purple-500 bg-purple-800/30'
              ]"
            >
              <h4 class="font-semibold text-purple-200">{{ option.name }}</h4>
              <p class="text-sm text-purple-300">{{ option.description }}</p>
              <div class="flex flex-wrap gap-1 mt-2">
                <span 
                  v-for="tag in option.tags" 
                  :key="tag"
                  class="px-2 py-1 bg-purple-600/40 text-purple-200 text-xs rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- ASSETS 卡 -->
        <div class="bg-gradient-to-br from-red-800/80 to-red-900/80 backdrop-blur rounded-lg p-6 border border-red-400/50">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-bold text-red-200">ASSETS</h3>
            <div class="w-8 h-8 bg-red-500 rounded-full"></div>
          </div>
          <p class="text-red-300 mb-4">你擁有的資源、財富與社會地位</p>
          
          <div class="space-y-3">
            <div 
              v-for="option in assetsOptions" 
              :key="option.id"
              @click="selectThemeOption('assets', option)"
              :class="[
                'p-3 rounded-lg border-2 cursor-pointer transition-all',
                character.assets?.id === option.id 
                  ? 'border-red-400 bg-red-700/50' 
                  : 'border-red-600/30 hover:border-red-500 bg-red-800/30'
              ]"
            >
              <h4 class="font-semibold text-red-200">{{ option.name }}</h4>
              <p class="text-sm text-red-300">{{ option.description }}</p>
              <div class="flex flex-wrap gap-1 mt-2">
                <span 
                  v-for="tag in option.tags" 
                  :key="tag"
                  class="px-2 py-1 bg-red-600/40 text-red-200 text-xs rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- PERSONALITY 卡 -->
        <div class="bg-gradient-to-br from-pink-800/80 to-pink-900/80 backdrop-blur rounded-lg p-6 border border-pink-400/50">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-bold text-pink-200">PERSONALITY</h3>
            <div class="w-8 h-8 bg-pink-500 rounded-full"></div>
          </div>
          <p class="text-pink-300 mb-4">你的性格特質與行為模式</p>
          
          <div class="space-y-3">
            <div 
              v-for="option in personalityOptions" 
              :key="option.id"
              @click="selectThemeOption('personality', option)"
              :class="[
                'p-3 rounded-lg border-2 cursor-pointer transition-all',
                character.personality?.id === option.id 
                  ? 'border-pink-400 bg-pink-700/50' 
                  : 'border-pink-600/30 hover:border-pink-500 bg-pink-800/30'
              ]"
            >
              <h4 class="font-semibold text-pink-200">{{ option.name }}</h4>
              <p class="text-sm text-pink-300">{{ option.description }}</p>
              <div class="flex flex-wrap gap-1 mt-2">
                <span 
                  v-for="tag in option.tags" 
                  :key="tag"
                  class="px-2 py-1 bg-pink-600/40 text-pink-200 text-xs rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- DRONES 卡 -->
        <div class="bg-gradient-to-br from-cyan-800/80 to-cyan-900/80 backdrop-blur rounded-lg p-6 border border-cyan-400/50">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-bold text-cyan-200">DRONES</h3>
            <div class="w-8 h-8 bg-cyan-500 rounded-full"></div>
          </div>
          <p class="text-cyan-300 mb-4">你的科技裝備與數位化程度</p>
          
          <div class="space-y-3">
            <div 
              v-for="option in dronesOptions" 
              :key="option.id"
              @click="selectThemeOption('drones', option)"
              :class="[
                'p-3 rounded-lg border-2 cursor-pointer transition-all',
                character.drones?.id === option.id 
                  ? 'border-cyan-400 bg-cyan-700/50' 
                  : 'border-cyan-600/30 hover:border-cyan-500 bg-cyan-800/30'
              ]"
            >
              <h4 class="font-semibold text-cyan-200">{{ option.name }}</h4>
              <p class="text-sm text-cyan-300">{{ option.description }}</p>
              <div class="flex flex-wrap gap-1 mt-2">
                <span 
                  v-for="tag in option.tags" 
                  :key="tag"
                  class="px-2 py-1 bg-cyan-600/40 text-cyan-200 text-xs rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部操作按鈕 -->
      <div class="mt-8 flex justify-center space-x-4">
        <button 
          @click="resetCharacter"
          class="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
        >
          重新開始
        </button>
        <button 
          @click="saveCharacter"
          :disabled="!isCharacterComplete"
          :class="[
            'px-6 py-3 rounded-lg transition-colors',
            isCharacterComplete 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-slate-600 text-gray-400 cursor-not-allowed'
          ]"
        >
          完成角色建立
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 頁面標題
useHead({
  title: '都市異景 - 角色建立器',
  meta: [
    { name: 'description', content: '建立你的都市異景角色' }
  ]
})

// 響應式數據
const showHowToPlay = ref(false)
const character = ref({
  name: '',
  background: '',
  exposure: null,
  assets: null,
  personality: null,
  drones: null
})

// 主題選項（假資料，後續可從 API 或 JSON 檔案載入）
const exposureOptions = ref([
  {
    id: 'newcomer',
    name: '新來者',
    description: '剛接觸都市異景，對一切都感到新奇',
    tags: ['好奇', '脆弱', '學習']
  },
  {
    id: 'experienced',
    name: '老手',
    description: '在異景中生存多年，已經適應這個環境',
    tags: ['經驗', '謹慎', '適應']
  },
  {
    id: 'hunter',
    name: '獵人',
    description: '主動尋找並對抗異景現象',
    tags: ['勇敢', '危險', '主動']
  }
])

const assetsOptions = ref([
  {
    id: 'wealthy',
    name: '富有',
    description: '擁有大量財富和社會資源',
    tags: ['金錢', '人脈', '影響力']
  },
  {
    id: 'middle-class',
    name: '中產',
    description: '擁有穩定的收入和基本資源',
    tags: ['穩定', '平衡', '務實']
  },
  {
    id: 'struggling',
    name: '掙扎',
    description: '資源匱乏，需要努力求生',
    tags: ['堅韌', '創新', '求生']
  }
])

const personalityOptions = ref([
  {
    id: 'analytical',
    name: '分析型',
    description: '理性思考，喜歡分析問題',
    tags: ['邏輯', '冷靜', '精確']
  },
  {
    id: 'social',
    name: '社交型',
    description: '善於與人交往，具有領導魅力',
    tags: ['魅力', '溝通', '領導']
  },
  {
    id: 'intuitive',
    name: '直覺型',
    description: '依靠直覺行動，富有創造力',
    tags: ['創意', '靈感', '冒險']
  }
])

const dronesOptions = ref([
  {
    id: 'high-tech',
    name: '高科技',
    description: '配備最先進的數位設備',
    tags: ['AI', '自動化', '連接']
  },
  {
    id: 'moderate-tech',
    name: '中等科技',
    description: '使用實用的科技工具',
    tags: ['實用', '可靠', '平衡']
  },
  {
    id: 'low-tech',
    name: '低科技',
    description: '偏好傳統方法，避免過度依賴科技',
    tags: ['傳統', '獨立', '簡單']
  }
])

// 計算屬性
const isCharacterComplete = computed(() => {
  return character.value.name && 
         character.value.exposure && 
         character.value.assets && 
         character.value.personality && 
         character.value.drones
})

const radarPoints = computed(() => {
  // 根據選擇的主題計算雷達圖點位
  const baseValues = { tech: 50, combat: 50, social: 50, mental: 50, physical: 50, survival: 50 }
  
  // 這裡可以根據選擇的主題調整數值
  if (character.value.drones?.id === 'high-tech') baseValues.tech += 30
  if (character.value.exposure?.id === 'hunter') baseValues.combat += 20
  if (character.value.personality?.id === 'social') baseValues.social += 25
  if (character.value.personality?.id === 'analytical') baseValues.mental += 25
  if (character.value.assets?.id === 'struggling') baseValues.physical += 15
  if (character.value.exposure?.id === 'experienced') baseValues.survival += 20
  
  // 轉換為 SVG 座標
  const scale = 0.8 // 縮放因子
  const center = 100
  const maxRadius = 80 * scale
  
  const points = [
    // TECH (top)
    { x: center, y: center - (baseValues.tech / 100) * maxRadius },
    // COMBAT (top-right)
    { x: center + (baseValues.combat / 100) * maxRadius * Math.cos(Math.PI / 6), 
      y: center - (baseValues.combat / 100) * maxRadius * Math.sin(Math.PI / 6) },
    // SOCIAL (bottom-right)
    { x: center + (baseValues.social / 100) * maxRadius * Math.cos(Math.PI / 6), 
      y: center + (baseValues.social / 100) * maxRadius * Math.sin(Math.PI / 6) },
    // MENTAL (bottom)
    { x: center, y: center + (baseValues.mental / 100) * maxRadius },
    // PHYSICAL (bottom-left)
    { x: center - (baseValues.physical / 100) * maxRadius * Math.cos(Math.PI / 6), 
      y: center + (baseValues.physical / 100) * maxRadius * Math.sin(Math.PI / 6) },
    // SURVIVAL (top-left)
    { x: center - (baseValues.survival / 100) * maxRadius * Math.cos(Math.PI / 6), 
      y: center - (baseValues.survival / 100) * maxRadius * Math.sin(Math.PI / 6) }
  ]
  
  return points.map(p => `${p.x},${p.y}`).join(' ')
})

// 方法
function selectThemeOption(theme, option) {
  character.value[theme] = option
}

function resetCharacter() {
  character.value = {
    name: '',
    background: '',
    exposure: null,
    assets: null,
    personality: null,
    drones: null
  }
}

function saveCharacter() {
  if (isCharacterComplete.value) {
    // 這裡可以實作儲存角色的邏輯
    console.log('角色建立完成:', character.value)
    alert('角色建立完成！')
    // 可以導向到角色表頁面或其他頁面
    // await navigateTo('/MO/character-sheet')
  }
}
</script>

<style scoped>
/* 自定義樣式 */
.backdrop-blur {
  backdrop-filter: blur(10px);
}
</style>
