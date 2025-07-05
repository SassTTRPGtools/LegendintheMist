<template>
  <div 
    v-if="show" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
    style="z-index: 9999;"
  >
    <div class="bg-slate-800 border border-purple-500 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- 標題列 -->
      <div class="bg-gradient-to-r from-purple-600 to-purple-800 p-4 rounded-t-lg">
        <h3 class="text-xl font-bold text-white">改進你的遊戲</h3>
        <p class="text-purple-200 text-sm mt-1">從你的主題卡中選擇要改進的卡片（{{ completedImprovements.length }}/7）</p>
      </div>

      <!-- 內容區 -->
      <div class="p-6">
        <!-- 改進進度 -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-gray-300">已完成改進</span>
            <span class="text-purple-400 font-bold">{{ completedImprovements.length }} / 7</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2">
            <div 
              class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${(completedImprovements.length / 7) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- 已完成的改進列表 -->
        <div v-if="completedImprovements.length > 0" class="mb-6">
          <h4 class="text-lg font-semibold text-white mb-3">已完成的改進：</h4>
          <div class="space-y-2">
            <div 
              v-for="(improvement, index) in completedImprovements" 
              :key="index"
              class="bg-slate-700 p-3 rounded-lg border-l-4 border-green-500"
            >
              <div class="font-medium text-white">
                {{ improvement.themeName }} - {{ improvement.improvementDescription }}
              </div>
              <div class="text-sm text-gray-400 mt-1">
                改進 {{ index + 1 }}：{{ improvement.timestamp }}
              </div>
            </div>
          </div>
        </div>

        <!-- 主題卡選擇 -->
        <div v-if="completedImprovements.length < 7">
          <h4 class="text-lg font-semibold text-white mb-3">選擇要改進的主題卡：</h4>
          <div class="grid grid-cols-1 gap-4">
            <div 
              v-for="(card, cardIndex) in themeCards"
              :key="cardIndex"
              :class="[
                'bg-slate-700 rounded-lg p-4 border-2 transition-all duration-200 cursor-pointer',
                getThemeBorderClass(card.selectedThemeType),
                getThemeHoverClass(card.selectedThemeType)
              ]"
              @click="selectThemeCard(cardIndex)"
            >
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <h5 class="font-semibold text-white text-lg">{{ card.title || '未命名主題卡' }}</h5>
                    <span class="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                      卡片 {{ cardIndex + 1 }}
                    </span>
                  </div>
                  
                  <!-- 主題類型與主題名稱 -->
                  <div class="flex items-center gap-2 mb-2">
                    <span 
                      :class="[
                        'text-sm text-white px-2 py-1 rounded font-medium',
                        getThemeColorClass(card.selectedThemeType)
                      ]"
                    >
                      {{ getThemeTypeName(card.selectedThemeType) }}
                    </span>
                    <span class="text-sm text-yellow-300 font-medium">
                      {{ getThemeChineseName(card) }}
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- 概念描述 -->
              <div v-if="card.concept" class="text-sm text-gray-300 mb-3 bg-slate-600 p-2 rounded">
                <span class="text-xs text-gray-400 block mb-1">概念：</span>
                {{ card.concept }}
              </div>
              
              <!-- 能力標籤 -->
              <div class="mb-3">
                <div class="text-xs text-gray-400 mb-2 font-medium">能力標籤：</div>
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="(ability, index) in getCardAbilities(card)"
                    :key="index"
                    class="text-xs bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    {{ ability }}
                  </span>
                  <span v-if="getCardAbilities(card).length === 0" class="text-xs text-gray-500 italic">
                    暫無能力標籤
                  </span>
                </div>
              </div>
              
              <!-- 弱點標籤 -->
              <div class="mb-3">
                <div class="text-xs text-gray-400 mb-2 font-medium">弱點標籤：</div>
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="(weakness, index) in getCardWeaknesses(card)"
                    :key="index"
                    class="text-xs bg-red-600 text-white px-2 py-1 rounded"
                  >
                    {{ weakness }}
                  </span>
                  <span v-if="getCardWeaknesses(card).length === 0" class="text-xs text-gray-500 italic">
                    暫無弱點標籤
                  </span>
                </div>
              </div>
              
              <div class="mt-3 text-center">
                <span class="text-purple-400 text-sm">點擊選擇此卡片進行改進</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 完成提示 -->
        <div v-else class="text-center py-8">
          <div class="text-green-400 text-2xl mb-4">🎉</div>
          <h4 class="text-xl font-bold text-white mb-2">所有改進已完成！</h4>
          <p class="text-gray-300">你已經完成了7次主題改進。</p>
        </div>
      </div>

      <!-- 按鈕列 -->
      <div class="flex justify-end space-x-3 p-6 border-t border-slate-600">
        <button 
          @click="cancelLevelUpGame"
          v-if="completedImprovements.length === 0"
          class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          取消
        </button>
        <button 
          @click="finishLevelUpGame"
          v-if="completedImprovements.length === 7"
          class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          完成改進
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  themeCards: {
    type: Array,
    default: () => []
  },
  mythosThemes: {
    type: Object,
    default: () => ({})
  },
  noiseThemes: {
    type: Object,
    default: () => ({})
  },
  selfThemes: {
    type: Object,
    default: () => ({})
  }
})

// Emits
const emit = defineEmits(['close', 'selectCard', 'finish', 'cancel'])

// 資料
const completedImprovements = ref([])

// 計算屬性
const getThemeTypeName = (themeType) => {
  const typeNames = {
    mythos: '神話',
    noise: '喧囂', 
    self: '自我'
  }
  return typeNames[themeType] || '未選擇類型'
}

// 獲取主題的中文名稱
const getThemeChineseName = (card) => {
  if (!card.selectedThemeType || !card.selectedTheme) {
    return '未選擇主題'
  }
  
  let themeData = null
  switch (card.selectedThemeType) {
    case 'mythos':
      themeData = props.mythosThemes[card.selectedTheme]
      break
    case 'noise':
      themeData = props.noiseThemes[card.selectedTheme]
      break
    case 'self':
      themeData = props.selfThemes[card.selectedTheme]
      break
  }
  
  return themeData?.theme || card.selectedTheme || '未知主題'
}

// 根據主題類型獲取配色類別
const getThemeColorClass = (themeType) => {
  switch (themeType) {
    case 'mythos':
      return 'bg-purple-600'
    case 'noise':
      return 'bg-cyan-600'
    case 'self':
      return 'bg-pink-600'
    default:
      return 'bg-gray-600'
  }
}

// 根據主題類型獲取邊框配色
const getThemeBorderClass = (themeType) => {
  switch (themeType) {
    case 'mythos':
      return 'border-purple-400'
    case 'noise':
      return 'border-cyan-400'
    case 'self':
      return 'border-pink-400'
    default:
      return 'border-gray-400'
  }
}

// 根據主題類型獲取懸停配色
const getThemeHoverClass = (themeType) => {
  switch (themeType) {
    case 'mythos':
      return 'hover:border-purple-300'
    case 'noise':
      return 'hover:border-cyan-300'
    case 'self':
      return 'hover:border-pink-300'
    default:
      return 'hover:border-gray-300'
  }
}

const getCardAbilities = (card) => {
  // 從 abilities 陣列中取得有內容的能力標籤
  if (card.abilities && Array.isArray(card.abilities)) {
    return card.abilities
      .filter(ability => ability && ability.text && ability.text.trim())
      .map(ability => ability.text.trim())
  }
  // 備用：檢查是否有 abilityTags 欄位
  if (card.abilityTags && Array.isArray(card.abilityTags)) {
    return card.abilityTags.filter(tag => tag && tag.trim())
  }
  return []
}

const getCardWeaknesses = (card) => {
  // 從 weaknesses 陣列中取得有內容的弱點標籤
  if (card.weaknesses && Array.isArray(card.weaknesses)) {
    return card.weaknesses
      .filter(weakness => weakness && weakness.text && weakness.text.trim())
      .map(weakness => weakness.text.trim())
  }
  // 備用：檢查是否有 weaknessTags 欄位
  if (card.weaknessTags && Array.isArray(card.weaknessTags)) {
    return card.weaknessTags
      .filter(tag => tag && (typeof tag === 'string' ? tag.trim() : tag.text && tag.text.trim()))
      .map(tag => typeof tag === 'string' ? tag.trim() : tag.text.trim())
  }
  return []
}

// 方法
function selectThemeCard(cardIndex) {
  console.log('選擇主題卡進行改進:', cardIndex, props.themeCards[cardIndex])
  emit('selectCard', cardIndex)
}

function cancelLevelUpGame() {
  emit('cancel')
}

function finishLevelUpGame() {
  emit('finish', completedImprovements.value)
}

// 添加改進記錄（由父組件調用）
function addCompletedImprovement(improvement) {
  const improvementRecord = {
    ...improvement,
    timestamp: new Date().toLocaleString()
  }
  completedImprovements.value.push(improvementRecord)
  console.log('新增改進記錄:', improvementRecord)
  console.log('目前完成改進數量:', completedImprovements.value.length)
}

// 重置模態框
function resetModal() {
  completedImprovements.value = []
}

// 監聽 show 變化
watch(() => props.show, (newValue) => {
  console.log('LevelUpGameModal show 變化:', newValue)
  if (!newValue) {
    // 當模態框關閉時不立即重置，保持改進記錄
  } else {
    console.log('LevelUpGameModal 開啟，主題卡數量:', props.themeCards.length)
  }
})

// 暴露方法給父組件
defineExpose({
  addCompletedImprovement,
  resetModal
})
</script>
