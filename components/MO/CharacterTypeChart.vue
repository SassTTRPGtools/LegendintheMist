<template>
  <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-purple-500/30">
    <h3 class="text-xl font-bold text-purple-300 mb-4">角色類型圖</h3>    
    <div class="aspect-square relative bg-slate-700/50 rounded-lg flex items-center justify-center">
      <!-- 六角雷達圖 -->
      <div class="w-96 h-96 relative">
        <svg viewBox="0 0 380 380" class="w-full h-full">
          <!-- 定義漸層 -->
          <defs>
            <!-- 神話漸層 -->
            <radialGradient id="mythosGradient" cx="0.5" cy="0.5" r="0.8">
              <stop offset="0%" stop-color="rgba(168, 85, 247, 0.8)" stop-opacity="1"/>
              <stop offset="100%" stop-color="rgba(168, 85, 247, 0.3)" stop-opacity="0.6"/>
            </radialGradient>
            
            <!-- 喧囂漸層 -->
            <radialGradient id="noiseGradient" cx="0.5" cy="0.5" r="0.8">
              <stop offset="0%" stop-color="rgba(6, 182, 212, 0.8)" stop-opacity="1"/>
              <stop offset="100%" stop-color="rgba(6, 182, 212, 0.3)" stop-opacity="0.6"/>
            </radialGradient>
            
            <!-- 自我漸層 -->
            <radialGradient id="selfGradient" cx="0.5" cy="0.5" r="0.8">
              <stop offset="0%" stop-color="rgba(236, 72, 153, 0.8)" stop-opacity="1"/>
              <stop offset="100%" stop-color="rgba(236, 72, 153, 0.3)" stop-opacity="0.6"/>
            </radialGradient>
          </defs>

          <!-- 六角形背景框架 -->
          <g opacity="0.2" stroke="rgba(139, 92, 246, 0.5)" stroke-width="1" fill="none">
            <!-- 第4層六角形 (最外層) - 半徑110 -->
            <polygon points="190,80 285,135 285,245 190,300 95,245 95,135" />
            <!-- 第3層六角形 - 半徑82.5 -->
            <polygon points="190,107.5 261.4,148.25 261.4,231.75 190,272.5 118.6,231.75 118.6,148.25" />
            <!-- 第2層六角形 - 半徑55 -->
            <polygon points="190,135 237.6,167.5 237.6,212.5 190,245 142.4,212.5 142.4,167.5" />
            <!-- 第1層六角形 (最內層) - 半徑27.5 -->
            <polygon points="190,162.5 213.8,176.25 213.8,203.75 190,217.5 166.2,203.75 166.2,176.25" />
            
            <!-- 從中心到各頂點的線 -->
            <line x1="190" y1="190" x2="190" y2="80" />   <!-- 到上方 -->
            <line x1="190" y1="190" x2="285" y2="135" />  <!-- 到右上 -->
            <line x1="190" y1="190" x2="285" y2="245" />  <!-- 到右下 -->
            <line x1="190" y1="190" x2="190" y2="300" />  <!-- 到下方 -->
            <line x1="190" y1="190" x2="95" y2="245" />   <!-- 到左下 -->
            <line x1="190" y1="190" x2="95" y2="135" />   <!-- 到左上 -->
          </g>

          <!-- 神話區域填滿 (左側兩個區塊：靈性主義者 + 化身/傳導者) -->
          <g v-if="mythosCount > 0">
            <!-- 神話單獨區域 -->
            <path 
              v-if="mythosCount > 0 && noiseCount === 0 && selfCount === 0"
              :d="getMythosOnlyPath()" 
              fill="url(#mythosGradient)" 
              stroke="#a855f7" 
              stroke-width="2"
              opacity="0.8"
            />
            <!-- 神話+喧囂混合區域 -->
            <path 
              v-else-if="mythosCount > 0 && noiseCount > 0 && selfCount === 0"
              :d="getMythosNoiseHalfPath()" 
              fill="url(#mythosGradient)" 
              stroke="#a855f7" 
              stroke-width="2"
              opacity="0.6"
            />
            <!-- 神話+自我混合區域 -->
            <path 
              v-else-if="mythosCount > 0 && selfCount > 0 && noiseCount === 0"
              :d="getMythosSelfHalfPath()" 
              fill="url(#mythosGradient)" 
              stroke="#a855f7" 
              stroke-width="2"
              opacity="0.6"
            />
            <!-- 三種主題混合：神話區域 -->
            <path 
              v-if="mythosCount > 0 && noiseCount > 0 && selfCount > 0"
              :d="getAllThemesMythosPath()" 
              fill="url(#mythosGradient)" 
              stroke="#a855f7" 
              stroke-width="1"
              opacity="0.7"
            />
          </g>

          <!-- 喧囂區域填滿 (右上兩個區塊：超人類 + 奇點) -->
          <g v-if="noiseCount > 0">
            <!-- 喧囂單獨區域 -->
            <path 
              v-if="noiseCount > 0 && mythosCount === 0 && selfCount === 0"
              :d="getNoiseOnlyPath()" 
              fill="url(#noiseGradient)" 
              stroke="#06b6d4" 
              stroke-width="2"
              opacity="0.8"
            />
            <!-- 喧囂+神話混合區域 -->
            <path 
              v-else-if="noiseCount > 0 && mythosCount > 0 && selfCount === 0"
              :d="getNoiseHalfPath()" 
              fill="url(#noiseGradient)" 
              stroke="#06b6d4" 
              stroke-width="2"
              opacity="0.6"
            />
            <!-- 喧囂+自我混合區域 -->
            <path 
              v-else-if="noiseCount > 0 && selfCount > 0 && mythosCount === 0"
              :d="getNoiseSelfHalfPath()" 
              fill="url(#noiseGradient)" 
              stroke="#06b6d4" 
              stroke-width="2"
              opacity="0.6"
            />
            <!-- 三種主題混合：喧囂區域 -->
            <path 
              v-if="mythosCount > 0 && noiseCount > 0 && selfCount > 0"
              :d="getAllThemesNoisePath()" 
              fill="url(#noiseGradient)" 
              stroke="#06b6d4" 
              stroke-width="1"
              opacity="0.7"
            />
          </g>

          <!-- 自我區域填滿 (右下兩個區塊：賽博格 + 現實人類 + 靈性主義者) -->
          <g v-if="selfCount > 0">
            <!-- 自我單獨區域 -->
            <path 
              v-if="selfCount > 0 && mythosCount === 0 && noiseCount === 0"
              :d="getSelfOnlyPath()" 
              fill="url(#selfGradient)" 
              stroke="#ec4899" 
              stroke-width="2"
              opacity="0.8"
            />
            <!-- 自我+神話混合區域 -->
            <path 
              v-else-if="selfCount > 0 && mythosCount > 0 && noiseCount === 0"
              :d="getSelfHalfPath()" 
              fill="url(#selfGradient)" 
              stroke="#ec4899" 
              stroke-width="2"
              opacity="0.6"
            />
            <!-- 自我+喧囂混合區域 -->
            <path 
              v-else-if="selfCount > 0 && noiseCount > 0 && mythosCount === 0"
              :d="getSelfNoiseHalfPath()" 
              fill="url(#selfGradient)" 
              stroke="#ec4899" 
              stroke-width="2"
              opacity="0.6"
            />
            <!-- 三種主題混合：自我區域 -->
            <path 
              v-if="mythosCount > 0 && noiseCount > 0 && selfCount > 0"
              :d="getAllThemesSelfPath()" 
              fill="url(#selfGradient)" 
              stroke="#ec4899" 
              stroke-width="1"
              opacity="0.7"
            />
          </g>

          <!-- 六個頂點標籤 -->
          <text x="190" y="65" text-anchor="middle" fill="#67e8f9" font-size="12" font-weight="bold">超人類</text>
          <text x="300" y="140" text-anchor="start" fill="#06b6d4" font-size="12" font-weight="bold">奇點</text>
          <text x="300" y="250" text-anchor="start" fill="#22d3ee" font-size="12" font-weight="bold">賽博格</text>
          <text x="190" y="320" text-anchor="middle" fill="#f472b6" font-size="12" font-weight="bold">現實人類</text>
          <text x="80" y="250" text-anchor="end" fill="#c084fc" font-size="12" font-weight="bold">靈性主義者</text>
          <text x="80" y="140" text-anchor="end" fill="#a855f7" font-size="12" font-weight="bold">化身/傳導者</text>

          <!-- 角色類型說明點 -->
          <!-- 交會點：三種主題皆有 - 正中央 -->
          <circle v-if="mythosCount > 0 && noiseCount > 0 && selfCount > 0" 
            cx="190" cy="190" r="3" fill="#ffffff" opacity="0.9"/>
          <text v-if="mythosCount > 0 && noiseCount > 0 && selfCount > 0" 
            x="190" y="175" text-anchor="middle" fill="white" font-size="8">交會點</text>                
        </svg>
      </div>
    </div>
    <div class="mt-4 space-y-2">
      <div class="text-center mb-3">
        <span class="text-purple-300 font-semibold">角色類型</span>
      </div>
      <div class="bg-slate-700/50 rounded-lg p-4 mb-3">
        <div class="text-center mb-3">
          <div class="text-lg font-bold text-white mb-2">{{ getCharacterType() }}</div>
        </div>
        <div class="text-left space-y-3">
          <div 
            v-for="(paragraph, index) in getFormattedCharacterSubtype()" 
            :key="index"
            :class="[
              'text-sm leading-relaxed',
              paragraph.isSubtitle ? 'text-purple-300 font-bold text-base mt-4 mb-2 border-b border-purple-500/30 pb-1' :
              paragraph.isSpecial ? 'text-amber-300 font-medium bg-amber-900/20 p-2 rounded border-l-2 border-amber-400' : 'text-gray-300'
            ]"
          >
            {{ paragraph.text }}
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-2 text-xs">
        <div class="flex justify-between">
          <span class="text-purple-300">神話主題：</span>
          <span class="text-purple-200">{{ mythosCount }}/4 {{ mythosCount > 0 ? '●'.repeat(mythosCount) + '○'.repeat(4-mythosCount) : '○○○○' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-cyan-300">喧囂主題：</span>
          <span class="text-cyan-200">{{ noiseCount }}/4 {{ noiseCount > 0 ? '●'.repeat(noiseCount) + '○'.repeat(4-noiseCount) : '○○○○' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-pink-300">自我主題：</span>
          <span class="text-pink-200">{{ selfCount }}/4 {{ selfCount > 0 ? '●'.repeat(selfCount) + '○'.repeat(4-selfCount) : '○○○○' }}</span>
        </div>
      </div>
      <div class="border-t border-purple-500/30 pt-2 mt-2">
        <div class="text-center text-xs text-gray-400">
          <div>總計：{{ getTotalThemes() }}/4 張主題卡</div>
          <div v-if="getTotalThemes() === 4" class="text-green-400 font-semibold mt-1">
            ✓ 角色建立完成
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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
// 六角雷達圖計算函數
// ====================
const center = { x: 190, y: 190 }

// 六角形的6個頂點座標 - 四層平均分佈
const getHexVertices = (layer = 4) => {
  const layerRadii = [0, 27.5, 55, 82.5, 110]
  const radius = layerRadii[layer] || 110
  
  return [
    { x: center.x, y: center.y - radius }, // 0: 正上方 (超人類)
    { x: center.x + radius * Math.cos(Math.PI / 6), y: center.y - radius * Math.sin(Math.PI / 6) }, // 1: 右上 (奇點)
    { x: center.x + radius * Math.cos(Math.PI / 6), y: center.y + radius * Math.sin(Math.PI / 6) }, // 2: 右下 (賽博格)
    { x: center.x, y: center.y + radius }, // 3: 正下方 (現實人類)
    { x: center.x - radius * Math.cos(Math.PI / 6), y: center.y + radius * Math.sin(Math.PI / 6) }, // 4: 左下 (靈性主義者)
    { x: center.x - radius * Math.cos(Math.PI / 6), y: center.y - radius * Math.sin(Math.PI / 6) }  // 5: 左上 (化身/傳導者)
  ]
}

// 神話區域路徑
const getMythosOnlyPath = () => {
  const layer = Math.min(4, mythosCount.value)
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[4].x} ${vertices[4].y} L ${vertices[5].x} ${vertices[5].y} L ${vertices[0].x} ${vertices[0].y} Z`
}

// 喧囂區域路徑
const getNoiseOnlyPath = () => {
  const layer = Math.min(4, noiseCount.value)
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[0].x} ${vertices[0].y} L ${vertices[1].x} ${vertices[1].y} L ${vertices[2].x} ${vertices[2].y} Z`
}

// 自我區域路徑
const getSelfOnlyPath = () => {
  const layer = Math.min(4, selfCount.value)
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[2].x} ${vertices[2].y} L ${vertices[3].x} ${vertices[3].y} L ${vertices[4].x} ${vertices[4].y} Z`
}

// 神話+喧囂混合區域
const getMythosNoiseHalfPath = () => {
  const mythosCards = mythosCount.value
  const noiseCards = noiseCount.value
  
  let layer
  if ((mythosCards === 1 && noiseCards === 3) || (mythosCards === 3 && noiseCards === 1)) {
    layer = 3
  } else if (mythosCards === 2 && noiseCards === 2) {
    layer = 4
  } else {
    layer = Math.min(4, Math.max(mythosCards, noiseCards))
  }
  
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[5].x} ${vertices[5].y} L ${vertices[0].x} ${vertices[0].y} Z`
}

const getNoiseHalfPath = () => {
  const mythosCards = mythosCount.value
  const noiseCards = noiseCount.value
  
  let layer
  if ((mythosCards === 1 && noiseCards === 3) || (mythosCards === 3 && noiseCards === 1)) {
    layer = 3
  } else if (mythosCards === 2 && noiseCards === 2) {
    layer = 4
  } else {
    layer = Math.min(4, Math.max(mythosCards, noiseCards))
  }
  
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[0].x} ${vertices[0].y} L ${vertices[1].x} ${vertices[1].y} Z`
}

// 神話+自我混合區域
const getMythosSelfHalfPath = () => {
  const mythosCards = mythosCount.value
  const selfCards = selfCount.value
  
  let layer
  if ((mythosCards === 1 && selfCards === 3) || (mythosCards === 3 && selfCards === 1)) {
    layer = 3
  } else if (mythosCards === 2 && selfCards === 2) {
    layer = 4
  } else {
    layer = Math.min(4, Math.max(mythosCards, selfCards))
  }
  
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[4].x} ${vertices[4].y} L ${vertices[5].x} ${vertices[5].y} Z`
}

const getSelfHalfPath = () => {
  const mythosCards = mythosCount.value
  const selfCards = selfCount.value
  
  let layer
  if ((mythosCards === 1 && selfCards === 3) || (mythosCards === 3 && selfCards === 1)) {
    layer = 3
  } else if (mythosCards === 2 && selfCards === 2) {
    layer = 4
  } else {
    layer = Math.min(4, Math.max(mythosCards, selfCards))
  }
  
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[3].x} ${vertices[3].y} L ${vertices[4].x} ${vertices[4].y} Z`
}

// 自我+喧囂混合區域
const getSelfNoiseHalfPath = () => {
  const selfCards = selfCount.value
  const noiseCards = noiseCount.value
  
  let layer
  if ((selfCards === 1 && noiseCards === 3) || (selfCards === 3 && noiseCards === 1)) {
    layer = 3
  } else if (selfCards === 2 && noiseCards === 2) {
    layer = 4
  } else {
    layer = Math.min(4, Math.max(selfCards, noiseCards))
  }
  
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[2].x} ${vertices[2].y} L ${vertices[3].x} ${vertices[3].y} Z`
}

const getNoiseSelfHalfPath = () => {
  const selfCards = selfCount.value
  const noiseCards = noiseCount.value
  
  let layer
  if ((selfCards === 1 && noiseCards === 3) || (selfCards === 3 && noiseCards === 1)) {
    layer = 3
  } else if (selfCards === 2 && noiseCards === 2) {
    layer = 4
  } else {
    layer = Math.min(4, Math.max(selfCards, noiseCards))
  }
  
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[1].x} ${vertices[1].y} L ${vertices[2].x} ${vertices[2].y} Z`
}

// 三種主題混合區域
const getAllThemesMythosPath = () => {
  const vertices = getHexVertices(2) // 填滿到第二層
  return `M ${center.x} ${center.y} L ${vertices[4].x} ${vertices[4].y} L ${vertices[5].x} ${vertices[5].y} L ${vertices[0].x} ${vertices[0].y} Z`
}

const getAllThemesNoisePath = () => {
  const vertices = getHexVertices(2) // 填滿到第二層
  return `M ${center.x} ${center.y} L ${vertices[0].x} ${vertices[0].y} L ${vertices[1].x} ${vertices[1].y} L ${vertices[2].x} ${vertices[2].y} Z`
}

const getAllThemesSelfPath = () => {
  const vertices = getHexVertices(2) // 填滿到第二層
  return `M ${center.x} ${center.y} L ${vertices[2].x} ${vertices[2].y} L ${vertices[3].x} ${vertices[3].y} L ${vertices[4].x} ${vertices[4].y} Z`
}
</script>
