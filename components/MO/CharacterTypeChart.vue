<template>
  <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-purple-500/30">
    <h3 class="text-xl font-bold text-purple-300 mb-4">角色類型圖</h3>    
    <div class="aspect-square relative bg-slate-700/50 rounded-lg flex items-center justify-center">
      <!-- 主題組合圖片顯示 -->
      <div class="w-96 h-96 relative flex items-center justify-center">
        <!-- 有主題時顯示對應圖片 -->
        <img 
          v-if="getEssenceImagePath() && !imageError"
          :src="getEssenceImagePath()" 
          :alt="getEssenceImageAlt()"
          class="w-full h-full object-contain"
          @error="handleImageError"
        />
        <!-- 無主題或圖片載入失敗時顯示預設圖片 -->
        <img 
          v-else
          :src="`${getBasePath()}/ui_icon/essences/blank.svg`" 
          alt="未選擇主題"
          class="w-full h-full object-contain opacity-50"
        />
      </div>
    </div>
    <div class="mt-4 space-y-2">
      <div class="text-center mb-3">
        <span class="text-purple-300 font-semibold">角色類型</span>
      </div>
      
      <!-- 角色類型顯示卡片 -->
      <div class="bg-slate-700/50 rounded-lg p-4 mb-3">
        <div class="text-center mb-3">
          <div class="text-lg font-bold text-white mb-2">{{ getCharacterType() }}</div>
          <button
            v-if="getCharacterType() !== '未定義'"
            @click="showTypeModal = true"
            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors flex items-center space-x-2 mx-auto"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>查看說明</span>
          </button>
          <div v-else class="text-sm text-gray-400 italic">
            請選擇主題卡來確定角色類型
          </div>
        </div>
      </div>
      
      <!-- 角色類型說明模態框 -->
      <div 
        v-if="showTypeModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="showTypeModal = false"
      >
        <div class="bg-slate-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-purple-500/30">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-purple-300">{{ getCharacterType() }}</h3>
            <button 
              @click="showTypeModal = false"
              class="w-8 h-8 bg-slate-600 hover:bg-slate-700 text-white rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div class="text-left space-y-3">
            <div 
              v-for="(paragraph, index) in getFormattedCharacterSubtype()" 
              :key="index"
              :class="[
                'text-sm leading-relaxed',
                paragraph.isSubtitle ? 'text-purple-300 font-bold text-base mt-4 mb-2 border-b border-purple-500/30 pb-1' :
                paragraph.isSpecial ? 'text-amber-300 font-medium bg-amber-900/20 p-3 rounded border-l-4 border-amber-400' : 'text-gray-300'
              ]"
            >
              {{ paragraph.text }}
            </div>
          </div>
          
          <div class="flex justify-end mt-6">
            <button 
              @click="showTypeModal = false"
              class="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-2 text-xs">
        <div class="flex justify-between">
          <span class="text-purple-300">神話：</span>
          <span class="text-purple-200">{{ mythosCount > 0 ? '●'.repeat(mythosCount) + '○'.repeat(4-mythosCount) : '○○○○' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-cyan-300">喧囂：</span>
          <span class="text-cyan-200">{{ noiseCount > 0 ? '●'.repeat(noiseCount) + '○'.repeat(4-noiseCount) : '○○○○' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-pink-300">自我：</span>
          <span class="text-pink-200"> {{ selfCount > 0 ? '●'.repeat(selfCount) + '○'.repeat(4-selfCount) : '○○○○' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// 模態框狀態
const showTypeModal = ref(false)

// 圖片錯誤狀態
const imageError = ref(false)

// 獲取 Nuxt 配置
const { $config } = useNuxtApp()

// 動態獲取基礎路徑
const getBasePath = () => {
  // 在生產環境中使用配置的 baseURL，在開發環境中使用空字串
  if (process.env.NODE_ENV === 'production') {
    return '/LegendintheMist'
  }
  return ''
}

// 定義 Props
interface ThemeCard {
  selectedThemeType: string
  selectedTheme: string
  [key: string]: any
}

interface Props {
  themeCards: ThemeCard[]
}

const props = withDefaults(defineProps<Props>(), {
  themeCards: () => []
})

// ====================
// 角色類型常數定義
// ====================
const CHARACTER_TYPE_DESCRIPTIONS = {
  交會點: {
    description: '你已經觸及了這個時代能提供的完整體驗範圍。因此，你的適應速度比其他人快。',
    mechanics: '當你更換主題後，如果你仍處於交會點，那麼它會處於完整階段，而非初生階段。（完整階段：擁有3個能力與1個弱點標籤；初生階段，擁有1個能力與1個弱點標籤。）'
  },
  靈性主義者: {
    description: '你排斥科技，或至少不讓它侵擾你的靈魂，重視人類精神及其與神話之謎的聯繫。 ',
    mechanics: '每場戲一次，你可以動用此連結，在以自我主題為主導的行動中加入神話，或在以神話主題為主導的行動中加入自我。如果你正在進行神話或自我的擲骰，力度為 4。'
  },
  賽博格: {
    description: '你是人類與科技的結合體，無論是自願還是被迫。 你在物質世界中尋求自由，或為了完全控制它而努力，無論付出多少新奇且難以計算的「魔法」代價。 ',
    mechanics: '你能堅守自我或喧囂的主體，抵抗或擺脫非實體、無法量化的神話力量，例如詛咒、幻覺或心靈影響。每場戲一次，你可以使用自我或喧囂的力度，或一起使用（力度 4）來抵抗。'
  },
  超人類: {
    description: '你在追尋通過魔法和科技可能實現的極限，已放棄所有人性表徵——或者根本沒有過。 試驗傳說與網路的悖論結合，是你存在的終極表現。',
    mechanics: '每個場景一次，當你同時動用神話和科技標籤時（不論來源為何），你能夠把失敗（6以下）改為有代價的成功（7-9）。'
  },
  現實人類: {
    description: '在誘惑使人成長的世界裡，你選擇保持自我，避開華麗的謊言和過往的故事。 無論是倔強、缺乏遠見還是更深的原因，你就是你，並拒絕外力——無論是神話還是科技。',
    mechanics: '每當你採取直接維持或保護身份的行動時，你能選擇以自我主題的數量代替計算正面標籤的力度。'
  },
  '化身/傳導者': {
    description: '你選擇了與秘源合一的道路，但表現形式有所不同。',
    mechanics: '根據你與秘源的關係，你將成為「化身」或「傳導者」之一。',
    subtypes: {
      化身: {
        description: '你與自身秘源合而為一。現在成了神話本身，你是傳說在世的燈塔。',
        mechanics: '你停止所有儀式；改為決定一個「議程」，如果你忽視它（哪怕任何一次），將導致你立刻替換所有主題（你的新神話主題無法包含曾失去的秘源）。作為化身，你能立刻恢復燒掉的能力標籤。',
        condition: '同秘源'
      },
      傳導者: {
        description: '你不再是個人；你給自己成為秘源容器的使命——神聖且難以言說，內心和諧又充滿衝突。',
        mechanics: '你能夠更換神話主題。你本身的任何秘源，甚至鄰近的秘源，都可以成為你新神話的主題，並處於完整階段，而非初生階段。（完整階段：擁有3個能力與1個弱點標籤；初生階段，擁有1個能力與1個弱點標籤。）',
        condition: '不同秘源'
      }
    }
  },
  奇點: {
    description: '你是新生命，拋棄了人性與其喋喋不休的故事， 踏入純粹資訊真理的存在，超越了意義幻象。',
    mechanics: '心理效應與無形或無法測量的神話效應不會影響你。你能介接所有資訊的媒介，並且擲骰喧囂主題的數量作為力度來搜索和操控它。'
  },
  未定義: {
    description: '',
    mechanics: ''
  }
}

// ====================
// 計算屬性
// ====================
// 計算各主題類型的選擇數量
const mythosCount = computed(() => {
  return props.themeCards.filter(card => card && card.selectedThemeType === 'mythos').length
})

const noiseCount = computed(() => {
  return props.themeCards.filter(card => card && card.selectedThemeType === 'noise').length
})

const selfCount = computed(() => {
  return props.themeCards.filter(card => card && card.selectedThemeType === 'self').length
})

// 計算總主題數量
const getTotalThemes = () => {
  return props.themeCards.filter(card => card && card.selectedThemeType && card.selectedTheme).length
}

// 獲取角色類型
const getCharacterType = () => {
  const mythos = mythosCount.value
  const noise = noiseCount.value
  const self = selfCount.value
  
  if (mythos > 0 && noise > 0 && self > 0) return '交會點'
  if (mythos > 0 && self > 0 && noise === 0) return '靈性主義者'
  if (self > 0 && noise > 0 && mythos === 0) return '賽博格'
  if (mythos > 0 && noise > 0 && self === 0) return '超人類'
  if (self > 0 && mythos === 0 && noise === 0) return '現實人類'
  if (mythos > 0 && self === 0 && noise === 0) return '化身/傳導者'
  if (noise > 0 && mythos === 0 && self === 0) return '奇點'
  return '未定義'
}

// 獲取角色子類型說明
const getCharacterSubtype = () => {
  const type = getCharacterType()
  const typeInfo = CHARACTER_TYPE_DESCRIPTIONS[type]
  
  if (!typeInfo) return '請選擇主題卡'
  
  // 特殊處理化身/傳導者
  if (type === '化身/傳導者' && 'subtypes' in typeInfo && typeInfo.subtypes) {
    const avatar = typeInfo.subtypes.化身
    const conduit = typeInfo.subtypes.傳導者
    
    return `${typeInfo.description}\n\n【化身（${avatar.condition}）】\n${avatar.description}\n${avatar.mechanics}\n\n【傳導者（${conduit.condition}）】\n${conduit.description}\n${conduit.mechanics}`
  }
  
  return typeInfo.description + (typeInfo.mechanics ? '\n' + typeInfo.mechanics : '')
}

// 格式化角色子類型說明
const getFormattedCharacterSubtype = () => {
  const rawText = getCharacterSubtype()
  if (!rawText) return [{ text: '', isSpecial: false, isSubtitle: false }]
  
  const paragraphs = rawText.split('\n').filter(p => p.trim() !== '')
  
  return paragraphs.map((text) => {
    const isSpecial = text.includes('每場戲一次') || 
                     text.includes('每個場景一次') || 
                     text.includes('每當你') ||
                     text.includes('你停止所有儀式') ||
                     text.includes('你能夠更換神話主題') ||
                     text.includes('心理效應與無形') ||
                     text.includes('當你更換主題後') ||
                     text.includes('你能介接所有資訊') ||
                     text.includes('力度為 4')
    
    const isSubtitle = text.startsWith('【') && text.endsWith('】')
    
    return { 
      text: text.trim(), 
      isSpecial: isSpecial,
      isSubtitle: isSubtitle
    }
  })
}

// ====================
// 圖片處理方法
// ====================

// 根據主題組合獲取對應的圖片路徑
const getEssenceImagePath = () => {
  const mythos = mythosCount.value
  const noise = noiseCount.value
  const self = selfCount.value
  
  // 重置圖片錯誤狀態（當主題變更時）
  imageError.value = false
  
  // 如果沒有選擇任何主題，返回空字串
  if (mythos === 0 && noise === 0 && self === 0) {
    return ''
  }
  
  // 定義所有可用的圖片檔案組合
  const availableImages = [
    '1M3N.svg', '1S1M2N.svg', '1S2M1N.svg', '1S3M.svg', '1S3N.svg',
    '2M2N.svg', '2S1M1N.svg', '2S2M.svg', '2S2N.svg', '3M1N.svg',
    '3S1M.svg', '3S1N.svg', '4M.svg', '4N.svg', '4S.svg'
  ]
  
  // 構建理想的檔案名稱
  const parts = []
  if (self > 0) parts.push(`${self}S`)
  if (mythos > 0) parts.push(`${mythos}M`)
  if (noise > 0) parts.push(`${noise}N`)
  
  const idealFilename = parts.join('') + '.svg'
  
  // 檢查理想檔案是否存在
  if (availableImages.includes(idealFilename)) {
    const imagePath = `${getBasePath()}/ui_icon/essences/${idealFilename}`
    console.log('找到精確匹配的圖片:', imagePath)
    return imagePath
  }
  
  // 如果找不到精確匹配，嘗試找最接近的替代方案
  let fallbackFilename = ''
  
  // 優先順序：三種主題組合 > 兩種主題組合 > 單一主題
  
  // 三種主題都有的情況 - 尋找接近的組合
  if (mythos > 0 && noise > 0 && self > 0) {
    // 嘗試一些常見的三主題組合
    const threeThemeCombos = ['1S1M2N.svg', '1S2M1N.svg', '2S1M1N.svg']
    for (const combo of threeThemeCombos) {
      if (availableImages.includes(combo)) {
        fallbackFilename = combo
        break
      }
    }
  }
  
  // 兩種主題的情況
  if (!fallbackFilename) {
    if (mythos > 0 && noise > 0 && self === 0) {
      // 神話+喧囂組合
      const twoThemeCombos = ['2M2N.svg', '3M1N.svg', '1M3N.svg']
      for (const combo of twoThemeCombos) {
        if (availableImages.includes(combo)) {
          fallbackFilename = combo
          break
        }
      }
    } else if (self > 0 && mythos > 0 && noise === 0) {
      // 自我+神話組合
      const twoThemeCombos = ['2S2M.svg', '3S1M.svg', '1S3M.svg']
      for (const combo of twoThemeCombos) {
        if (availableImages.includes(combo)) {
          fallbackFilename = combo
          break
        }
      }
    } else if (self > 0 && noise > 0 && mythos === 0) {
      // 自我+喧囂組合
      const twoThemeCombos = ['2S2N.svg', '3S1N.svg', '1S3N.svg']
      for (const combo of twoThemeCombos) {
        if (availableImages.includes(combo)) {
          fallbackFilename = combo
          break
        }
      }
    }
  }
  
  // 單一主題的情況
  if (!fallbackFilename) {
    if (mythos > 0 && noise === 0 && self === 0) {
      fallbackFilename = '4M.svg'
    } else if (noise > 0 && mythos === 0 && self === 0) {
      fallbackFilename = '4N.svg'
    } else if (self > 0 && mythos === 0 && noise === 0) {
      fallbackFilename = '4S.svg'
    }
  }
  
  // 如果還是沒有找到，使用 blank.svg
  if (!fallbackFilename) {
    fallbackFilename = 'blank.svg'
  }
  
  const imagePath = `${getBasePath()}/ui_icon/essences/${fallbackFilename}`
  console.log('使用替代圖片:', imagePath, '原始嘗試:', idealFilename, '主題數量 - 神話:', mythos, '喧囂:', noise, '自我:', self)
  
  return imagePath
}

// 獲取圖片的 alt 文字
const getEssenceImageAlt = () => {
  const mythos = mythosCount.value
  const noise = noiseCount.value
  const self = selfCount.value
  
  if (mythos === 0 && noise === 0 && self === 0) {
    return '未選擇主題'
  }
  
  const parts = []
  if (self > 0) parts.push(`自我${self}`)
  if (mythos > 0) parts.push(`神話${mythos}`)
  if (noise > 0) parts.push(`喧囂${noise}`)
  
  return `主題組合: ${parts.join(', ')}`
}

// 處理圖片載入錯誤
const handleImageError = (event: Event) => {
  imageError.value = true
  const img = event.target as HTMLImageElement
  console.warn('精華圖片載入失敗:', img.src)
  console.log('主題數量 - 神話:', mythosCount.value, '喧囂:', noiseCount.value, '自我:', selfCount.value)
}
</script>
