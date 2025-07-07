<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden border border-purple-500/30">
      <!-- 標題列 -->
      <div class="bg-gradient-to-r from-yellow-600 to-orange-600 p-4 flex justify-between items-center">
        <h3 class="text-lg font-bold text-white flex items-center">
          <Icon name="lucide:file-text" class="w-5 h-5 mr-2" />
          GM快速查閱 - {{ characterData.name || '未命名角色' }}
        </h3>
        <button 
          @click="$emit('close')"
          class="text-white hover:text-gray-300 transition-colors p-1 rounded-md hover:bg-white/10"
        >
          <Icon name="lucide:x" class="w-6 h-6" />
        </button>
      </div>

      <!-- 內容區域 -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <div class="space-y-6">
          <!-- 角色基本資訊 -->
          <div class="bg-slate-700/50 rounded-lg p-4">
            <h4 class="text-yellow-300 font-semibold mb-3 flex items-center">
              <Icon name="lucide:user" class="w-4 h-4 mr-2" />
              角色基本資訊
            </h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-400">角色名稱：</span>
                <span class="text-white">{{ characterData.name || '未命名角色' }}</span>
              </div>
              <div>
                <span class="text-gray-400">背景：</span>
                <span class="text-white">{{ characterData.background || '無' }}</span>
              </div>
            </div>
          </div>

          <!-- 主題卡資訊 -->
          <div class="space-y-4">
            <h4 class="text-yellow-300 font-semibold flex items-center">
              <Icon name="lucide:layers" class="w-4 h-4 mr-2" />
              主題卡詳細資訊
            </h4>
            
            <div 
              v-for="(card, index) in characterData.themeCards" 
              :key="index"
              class="bg-slate-700/50 rounded-lg p-4"
            >
              <h5 class="text-purple-300 font-medium mb-3">
                主題卡 {{ index + 1 }}：{{ getThemeDisplayName(card) }}
              </h5>
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <span class="text-gray-400">能力：</span>
                  <span class="text-green-300">{{ getThemeAbilities(card) }}</span>
                </div>
                <div>
                  <span class="text-gray-400">弱點：</span>
                  <span class="text-red-300">{{ getThemeWeaknesses(card) }}</span>
                </div>
                <div>
                  <span class="text-gray-400">動機：</span>
                  <span class="text-blue-300">{{ getThemeMotivationsDisplay(card) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 文字版本 -->
          <div class="bg-slate-700/50 rounded-lg p-4">
            <h4 class="text-yellow-300 font-semibold mb-3 flex items-center">
              <Icon name="lucide:clipboard" class="w-4 h-4 mr-2" />
              文字版本（可複製）
            </h4>
            <textarea 
              v-model="referenceText"
              readonly
              class="w-full h-32 bg-slate-800 text-gray-300 p-3 rounded border border-gray-600 resize-none focus:outline-none focus:border-yellow-500 text-sm font-mono"
              placeholder="角色資訊將顯示在這裡..."
            ></textarea>
            <div class="mt-3 flex gap-2">
              <button 
                @click="copyToClipboard"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors flex items-center space-x-2"
              >
                <Icon name="lucide:copy" class="w-4 h-4" />
                <span>複製文字</span>
              </button>
              <button 
                @click="regenerateText"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex items-center space-x-2"
              >
                <Icon name="lucide:refresh-cw" class="w-4 h-4" />
                <span>重新生成</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 導入類型映射
import { TypeChineseNameMapping, TypeToThemeMapping } from '~/assets/MO/character-type-mapping.js'

// Props
const props = defineProps({
  // 控制模態框顯示/隱藏
  isVisible: {
    type: Boolean,
    default: false
  },
  // 角色資料
  characterData: {
    type: Object,
    required: true
  },
  // 主題系統資料
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
const emit = defineEmits(['close', 'copy-success', 'copy-error'])

// 響應式資料
const referenceText = ref('')

// 獲取主題顯示名稱
function getThemeDisplayName(card) {
  if (!card || !card.selectedTheme) {
    return '未選擇主題'
  }
  
  // 獲取主題類型的中文名稱
  const themeType = card.selectedThemeType || ''
  let themeName = card.selectedTheme
  
  // 嘗試從主題系統中獲取完整的主題資訊
  const allThemes = { ...props.mythosThemes, ...props.noiseThemes, ...props.selfThemes }
  if (allThemes[themeName]) {
    themeName = allThemes[themeName].theme || themeName
  }
  
  // 獲取主題風格分類
  const themeCategory = TypeToThemeMapping[card.selectedTheme] || ''
  
  return `${themeName}${themeCategory ? ` (${themeCategory})` : ''}`
}

// 獲取主題能力 - 緊湊格式
function getThemeAbilities(card) {
  if (!card || !card.abilities) {
    return '無'
  }
  
  const abilities = card.abilities
    .filter(ability => ability && ability.text && ability.text.trim())
    .map(ability => ability.text.trim())
  
  return abilities.length > 0 ? abilities.join('、') : '無'
}

// 獲取主題弱點 - 緊湊格式
function getThemeWeaknesses(card) {
  if (!card || !card.weaknesses) {
    return '無'
  }
  
  const weaknesses = card.weaknesses
    .filter(weakness => weakness && weakness.text && weakness.text.trim())
    .map(weakness => weakness.text.trim())
  
  return weaknesses.length > 0 ? weaknesses.join('、') : '無'
}

// 獲取主題動機 - 緊湊格式（用於文字輸出）
function getThemeMotivations(card) {
  if (!card || !card.motivation) {
    return ''
  }
  
  // 只返回第一個有內容的動機類型
  if (card.motivation.identity && card.motivation.identity.trim()) {
    return `身份：${card.motivation.identity.trim()}`
  }
  if (card.motivation.ritual && card.motivation.ritual.trim()) {
    return `儀式：${card.motivation.ritual.trim()}`
  }
  if (card.motivation.itch && card.motivation.itch.trim()) {
    return `癢處：${card.motivation.itch.trim()}`
  }
  
  return ''
}

// 獲取主題動機 - 視覺化顯示格式
function getThemeMotivationsDisplay(card) {
  if (!card || !card.motivation) {
    return '無'
  }
  
  const motivations = []
  if (card.motivation.identity && card.motivation.identity.trim()) {
    motivations.push(`身份：${card.motivation.identity.trim()}`)
  }
  if (card.motivation.ritual && card.motivation.ritual.trim()) {
    motivations.push(`儀式：${card.motivation.ritual.trim()}`)
  }
  if (card.motivation.itch && card.motivation.itch.trim()) {
    motivations.push(`癢處：${card.motivation.itch.trim()}`)
  }
  
  return motivations.length > 0 ? motivations.join('；') : '無'
}

// 獲取緊湊格式的主題名稱
function getCompactThemeDisplayName(card) {
  if (!card || !card.selectedTheme) {
    return '未設定'
  }
  
  // 獲取主題中文名稱
  let themeName = card.selectedTheme
  const allThemes = { ...props.mythosThemes, ...props.noiseThemes, ...props.selfThemes }
  if (allThemes[themeName]) {
    themeName = allThemes[themeName].theme || themeName
  }
  
  // 獲取主題風格分類
  const themeCategory = TypeToThemeMapping[card.selectedTheme] || ''
  
  return `${themeName} (${themeCategory})`
}

// 生成GM查閱文字 - 緊湊格式
function generateReferenceText() {
  const playerName = props.characterData.name || '未命名角色'
  const background = props.characterData.background || ''
  
  // 緊湊格式：角色名稱（玩家名稱）
  let text = `${playerName}${background ? `（${background}）` : ''}\n`
  
  // 處理每個主題卡
  props.characterData.themeCards.forEach((card) => {
    if (card && card.selectedTheme) {
      const themeName = getCompactThemeDisplayName(card)
      const abilities = getThemeAbilities(card)
      const weaknesses = getThemeWeaknesses(card)
      const motivation = getThemeMotivations(card)
      
      text += `${themeName}`
      text += `能力：${abilities}；`
      text += `弱點：${weaknesses}`
      
      if (motivation) {
        text += `；${motivation}`
      }
      
      text += '\n'
    }
  })
  
  referenceText.value = text
}

// 重新生成文字
function regenerateText() {
  generateReferenceText()
}

// 複製到剪貼簿
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(referenceText.value)
    emit('copy-success', '已複製到剪貼簿')
  } catch (error) {
    console.error('複製失敗:', error)
    // 備用方案：選取文字
    const textArea = document.querySelector('textarea')
    if (textArea) {
      textArea.select()
      textArea.setSelectionRange(0, 99999)
      try {
        document.execCommand('copy')
        emit('copy-success', '已複製到剪貼簿')
      } catch (fallbackError) {
        emit('copy-error', '複製失敗，請手動選取文字')
      }
    } else {
      emit('copy-error', '複製失敗，請手動選取文字')
    }
  }
}

// 鍵盤事件處理
function handleKeydown(event) {
  if (event.key === 'Escape' && props.isVisible) {
    emit('close')
  }
}

// 生命週期
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  generateReferenceText()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// 監聽可見性變化，重新生成文字
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    generateReferenceText()
  }
})

// 監聽角色資料變化，重新生成文字
watch(() => props.characterData, () => {
  if (props.isVisible) {
    generateReferenceText()
  }
}, { deep: true })
</script>

<style scoped>
/* GM快速查閱組件樣式 */
</style>
