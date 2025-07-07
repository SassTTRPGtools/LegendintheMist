<template>
  <div class="bg-gray-900 rounded-lg shadow-xl border border-gray-700 flex flex-col h-full max-h-full relative overflow-hidden">
    <div v-if="selectedChallenge" class="h-full flex flex-col min-h-0">
      <!-- Level Badge -->
      <div class="absolute top-0 left-0 z-20">
        <div :class="[
          'px-4 py-2 rounded-br-lg text-xs font-bold uppercase tracking-wide',
          getDifficultyColor(selectedChallenge.difficulty || selectedChallenge.tier)
        ]">
          Level {{ selectedChallenge.difficulty || selectedChallenge.tier }}
        </div>
      </div>
      
      <!-- Content -->
      <div class="flex-1 min-h-0 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <div class="h-full overflow-y-auto p-6 pt-12 custom-scrollbar" style="scrollbar-gutter: stable;">
          
          <!-- Title -->
          <div class="mb-4">
            <h1 class="text-2xl font-bold text-white leading-tight mb-1">{{ selectedChallenge.name }}</h1>
            <p class="text-gray-400 text-sm">{{ selectedChallenge.name_cn || selectedChallenge.name_en || '' }}</p>
            <div v-if="selectedChallenge.type" class="mt-1">
              <span class="inline-block bg-blue-800/80 text-blue-100 px-2 py-1 rounded text-xs font-medium">
                {{ getTypeLabel(selectedChallenge.type) }}
              </span>
            </div>
          </div>

          <!-- Description -->
          <div v-if="selectedChallenge.description" class="mb-4">
            <p class="text-gray-300 text-sm leading-relaxed">{{ selectedChallenge.description }}</p>
          </div>

          <!-- Tags and Limits -->
          <div class="flex flex-wrap gap-2 mb-4">
            <!-- Tags -->
            <template v-if="selectedChallenge.tags && selectedChallenge.tags.length > 0">
              <span 
                v-for="(tag, index) in selectedChallenge.tags" 
                :key="'tag-' + index"
                class="inline-block bg-emerald-800/80 text-emerald-100 px-2 py-1 rounded text-xs font-medium"
              >
                {{ tag }}
              </span>
            </template>
            <!-- Limits -->
            <template v-if="selectedChallenge.limits && Object.keys(selectedChallenge.limits).length > 0">
              <span 
                v-for="(value, key) in selectedChallenge.limits" 
                :key="'limit-' + key"
                class="inline-block bg-red-800/80 text-red-100 px-2 py-1 rounded text-xs font-medium"
              >
                {{ key }}: {{ value }}
              </span>
            </template>
          </div>

          <!-- Special Abilities -->
          <div v-if="selectedChallenge.specials && selectedChallenge.specials.length > 0" class="mb-4">
            <h4 class="text-purple-300 font-bold text-xs mb-2 uppercase tracking-wider border-b border-purple-500/30 pb-1">特殊能力</h4>
            <div class="space-y-2">
              <div 
                v-for="(special, index) in selectedChallenge.specials" 
                :key="index"
                class="bg-purple-900/20 border border-purple-500/30 rounded p-2"
              >
                <div v-if="getSpecialTitle(special) && getSpecialDescription(special)" class="text-gray-300 text-xs leading-relaxed">
                  <span class="text-purple-200 font-medium">{{ getSpecialTitle(special) }}:</span>
                  <span class="ml-1 whitespace-pre-line">{{ getSpecialDescription(special) }}</span>
                </div>
                <div v-else class="text-gray-300 text-xs leading-relaxed whitespace-pre-line">
                  {{ special }}
                </div>
              </div>
            </div>
          </div>

          <!-- Threats and Consequences / Consequences -->
          <div v-if="(selectedChallenge.threatsAndConsequences && selectedChallenge.threatsAndConsequences.length > 0) || (selectedChallenge.consequences && selectedChallenge.consequences.length > 0)" class="mb-6">
            <h4 class="text-orange-300 font-bold text-xs mb-2 uppercase tracking-wider border-b border-orange-500/30 pb-1">
              {{ selectedChallenge.threatsAndConsequences ? '威脅 & 後果' : '後果' }}
            </h4>
            <div class="space-y-3">
              <!-- Metro format: threatsAndConsequences -->
              <div 
                v-if="selectedChallenge.threatsAndConsequences"
                v-for="(threat, index) in selectedChallenge.threatsAndConsequences" 
                :key="'threat-' + index"
                class="bg-orange-900/20 border border-orange-500/30 rounded p-2"
              >
                <h5 class="text-orange-200 font-semibold text-xs mb-2">{{ threat.category }}</h5>
                <ul class="space-y-2">
                  <li 
                    v-for="(consequence, cIndex) in threat.consequences" 
                    :key="cIndex"
                    class="text-gray-300 text-xs leading-relaxed flex items-start"
                  >
                    <span class="text-orange-400 mr-2 flex-shrink-0 text-xs mt-0.5">•</span>
                    <span class="whitespace-pre-line">{{ consequence }}</span>
                  </li>
                </ul>
              </div>
              
              <!-- Powersets format: consequences -->
              <div v-if="selectedChallenge.consequences" class="space-y-2">
                <div 
                  v-for="(consequence, index) in selectedChallenge.consequences" 
                  :key="'consequence-' + index"
                  class="bg-orange-900/20 border border-orange-500/30 rounded p-2"
                >
                  <div class="text-gray-300 text-xs leading-relaxed flex items-start">
                    <span class="text-orange-400 mr-2 flex-shrink-0 text-xs mt-0.5">•</span>
                    <span class="whitespace-pre-line">{{ consequence }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div class="text-center">
        <Icon name="lucide:mouse-pointer-click" class="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-400 mb-2">選擇一個挑戰</h3>
        <p class="text-gray-500 text-sm">點擊左邊列表中的挑戰來查看詳細資訊</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  selectedChallenge: {
    type: Object,
    default: null
  }
})

// Methods
function getDifficultyColor(difficulty) {
  const level = parseInt(difficulty)
  if (level <= 2) return 'bg-green-600 text-green-100'
  if (level <= 4) return 'bg-yellow-600 text-yellow-100'  
  if (level <= 6) return 'bg-orange-600 text-orange-100'
  if (level <= 8) return 'bg-red-600 text-red-100'
  return 'bg-purple-600 text-purple-100'
}

function getTypeLabel(type) {
  const typeLabels = {
    'MYTHOS': '神話',
    'SELF': '自我',
    'NOISE': '雜訊',
    'ENVIRONMENT': '環境',
    'NPC': 'NPC',
    'ORGANIZATION': '組織'
  }
  return typeLabels[type] || type
}

function getSpecialTitle(special) {
  if (typeof special === 'string') {
    // 尋找冒號分隔符
    const colonIndex = special.indexOf(':')
    if (colonIndex > 0 && colonIndex < 50) { // 確保標題不會太長
      const title = special.substring(0, colonIndex).trim()
      // 檢查是否是合理的標題（不包含太多文字）
      if (title.length <= 30 && !title.includes('。') && !title.includes('，')) {
        return title
      }
    }
    
    // 尋找句號分隔符（適用於某些格式）
    const dotIndex = special.indexOf('。')
    if (dotIndex > 0 && dotIndex < 30) {
      const title = special.substring(0, dotIndex).trim()
      if (title.length <= 20) {
        return title
      }
    }
    
    // 如果沒有找到合適的標題，返回空字符串
    return ''
  }
  return ''
}

function getSpecialDescription(special) {
  if (typeof special === 'string') {
    // 尋找冒號分隔符
    const colonIndex = special.indexOf(':')
    if (colonIndex > 0 && colonIndex < 50) {
      const title = special.substring(0, colonIndex).trim()
      // 檢查是否是合理的標題
      if (title.length <= 30 && !title.includes('。') && !title.includes('，')) {
        return special.substring(colonIndex + 1).trim()
      }
    }
    
    // 尋找句號分隔符
    const dotIndex = special.indexOf('。')
    if (dotIndex > 0 && dotIndex < 30) {
      const title = special.substring(0, dotIndex).trim()
      if (title.length <= 20) {
        return special.substring(dotIndex + 1).trim()
      }
    }
    
    // 如果沒有找到分隔符，返回空字符串（讓整個文本顯示在主要區域）
    return ''
  }
  return ''
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #06b6d4 #374151;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #06b6d4;
  border-radius: 4px;
  transition: background 0.2s;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #0891b2;
}
</style>
