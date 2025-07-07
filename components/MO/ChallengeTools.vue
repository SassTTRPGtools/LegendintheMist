<template>
  <div class="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-2xl border border-purple-500/30 flex flex-col h-full max-h-full overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-3 rounded-t-xl flex-shrink-0 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-indigo-600/80 to-blue-600/80"></div>
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 20px 20px;"></div>
      <h2 class="text-base font-bold text-white flex items-center relative z-10">
        <Icon name="lucide:zap" class="w-4 h-4 mr-2 text-yellow-300" />
        異能組合卡
      </h2>
    </div>
    
    <!-- Content -->
    <div class="flex-1 min-h-0 overflow-hidden">
      <div class="h-full overflow-y-auto custom-scrollbar">
        
        <!-- No Selection State -->
        <div v-if="!selectedChallenge" class="text-center py-8 px-4">
          <div class="relative mb-3">
            <Icon name="lucide:layers-3" class="w-12 h-12 text-purple-400/50 mx-auto" />
            <div class="absolute inset-0 w-12 h-12 mx-auto bg-purple-500/20 rounded-full animate-pulse"></div>
          </div>
          <h3 class="text-purple-300 font-semibold text-sm mb-1">選擇異能組合</h3>
          <p class="text-gray-400 text-xs">選擇左側列表中的異能組合</p>
        </div>

        <!-- Selected Challenge State -->
        <div v-else class="p-3 space-y-3">
          
          <!-- View Mode Selector -->
          <div class="space-y-2">
            <label class="text-purple-300 font-medium text-xs">顯示模式</label>
            <div class="relative">
              <select 
                v-model="viewMode"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-cyan-100 focus:border-cyan-400 focus:outline-none text-xs appearance-none cursor-pointer"
              >
                <option value="compact">緊湊概覽</option>
                <option value="limits">限制條件</option>
                <option value="specials">特殊能力</option>
                <option value="consequences">後果行動</option>
                <option value="tags">標籤列表</option>
              </select>
              <Icon name="lucide:chevron-down" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
            </div>
          </div>
          
          <!-- Main Card Display -->
          <div class="bg-gradient-to-br from-gray-700/80 to-gray-800/80 rounded-lg border border-purple-500/20 overflow-hidden">
            
            <!-- Card Header -->
            <div class="p-3 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border-b border-purple-500/30">
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-bold text-white truncate">{{ selectedChallenge.name }}</h3>
                  <p class="text-purple-200 text-xs truncate">{{ selectedChallenge.name_cn || selectedChallenge.name }}</p>
                  <div class="flex items-center gap-1 mt-1">
                    <span v-if="selectedChallenge.type" :class="getTypeStyle(selectedChallenge.type)" 
                          class="px-2 py-0.5 rounded-full text-xs font-medium">
                      {{ getTypeLabel(selectedChallenge.type) }}
                    </span>
                    <span :class="getTierStyle(selectedChallenge.tier || selectedChallenge.difficulty)"
                          class="px-2 py-0.5 rounded-full text-xs font-bold">
                      T{{ selectedChallenge.tier || selectedChallenge.difficulty }}
                    </span>
                  </div>
                </div>
                <Icon name="lucide:sparkles" class="w-5 h-5 text-yellow-400 flex-shrink-0" />
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-3">
              
              <!-- Compact Overview -->
              <div v-if="viewMode === 'compact'" class="space-y-2">
                <div v-if="selectedChallenge.description" class="text-xs text-gray-300 leading-relaxed bg-gray-700/30 rounded p-2">
                  {{ selectedChallenge.description }}
                </div>
                
                <!-- Quick Stats Grid -->
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div class="bg-yellow-900/20 border border-yellow-500/30 rounded p-2 text-center">
                    <div class="text-yellow-400 font-medium">特殊能力</div>
                    <div class="text-white font-bold">{{ selectedChallenge.specials?.length || 0 }}</div>
                  </div>
                  <div class="bg-orange-900/20 border border-orange-500/30 rounded p-2 text-center">
                    <div class="text-orange-400 font-medium">後果行動</div>
                    <div class="text-white font-bold">{{ getConsequences.length }}</div>
                  </div>
                  <div class="bg-emerald-900/20 border border-emerald-500/30 rounded p-2 text-center">
                    <div class="text-emerald-400 font-medium">標籤</div>
                    <div class="text-white font-bold">{{ selectedChallenge.tags?.length || 0 }}</div>
                  </div>
                  <div class="bg-red-900/20 border border-red-500/30 rounded p-2 text-center">
                    <div class="text-red-400 font-medium">限制</div>
                    <div class="text-white font-bold">{{ Object.keys(selectedChallenge.limits || {}).length }}</div>
                  </div>
                </div>
              </div>

              <!-- Limits View -->
              <div v-else-if="viewMode === 'limits' && hasLimits" class="space-y-2">
                <h4 class="text-red-300 font-semibold text-xs flex items-center">
                  <Icon name="lucide:alert-triangle" class="w-3 h-3 mr-1" />
                  限制條件
                </h4>
                <div class="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  <div v-for="(value, key) in selectedChallenge.limits" :key="key" 
                       class="bg-red-900/20 border border-red-500/30 rounded p-2 text-center">
                    <div class="text-red-400 text-xs font-medium truncate">{{ key }}</div>
                    <div class="text-red-100 text-sm font-bold">{{ value }}</div>
                  </div>
                </div>
              </div>

              <!-- Specials View -->
              <div v-else-if="viewMode === 'specials' && hasSpecials" class="space-y-2">
                <h4 class="text-yellow-300 font-semibold text-xs flex items-center">
                  <Icon name="lucide:sparkles" class="w-3 h-3 mr-1" />
                  特殊能力
                </h4>
                <div class="space-y-2 max-h-64 overflow-y-auto">
                  <div v-for="(special, index) in selectedChallenge.specials" :key="index" 
                       class="bg-yellow-900/20 border border-yellow-500/30 rounded p-2">
                    <div class="flex items-start">
                      <div class="w-4 h-4 bg-yellow-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <span class="text-white text-xs font-bold">{{ index + 1 }}</span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="text-yellow-200 text-xs font-medium mb-1">{{ getSpecialTitle(special) }}</div>
                        <div class="text-gray-300 text-xs leading-relaxed whitespace-pre-line">{{ getSpecialDescription(special) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Consequences View -->
              <div v-else-if="viewMode === 'consequences' && hasConsequences" class="space-y-2">
                <h4 class="text-orange-300 font-semibold text-xs flex items-center">
                  <Icon name="lucide:target" class="w-3 h-3 mr-1" />
                  後果行動
                </h4>
                <div class="space-y-2 max-h-64 overflow-y-auto">
                  <div v-for="(consequence, index) in getConsequences" :key="index" 
                       class="bg-orange-900/20 border border-orange-500/30 rounded p-2">
                    <div class="flex items-start">
                      <div class="w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <Icon name="lucide:arrow-right" class="w-2 h-2 text-white" />
                      </div>
                      <div class="text-gray-300 text-xs leading-relaxed whitespace-pre-line">{{ consequence }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tags View -->
              <div v-else-if="viewMode === 'tags' && hasTags" class="space-y-2">
                <h4 class="text-emerald-300 font-semibold text-xs flex items-center">
                  <Icon name="lucide:tags" class="w-3 h-3 mr-1" />
                  標籤列表
                </h4>
                <div class="flex flex-wrap gap-1 max-h-48 overflow-y-auto">
                  <span v-for="(tag, index) in selectedChallenge.tags" :key="index" 
                        class="inline-flex items-center px-2 py-1 bg-emerald-900/30 border border-emerald-500/30 rounded-full text-emerald-200 text-xs font-medium">
                    <Icon name="lucide:tag" class="w-2 h-2 mr-1" />
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="text-center py-6">
                <Icon name="lucide:file-x" class="w-6 h-6 text-gray-500 mx-auto mb-1" />
                <p class="text-gray-400 text-xs">此異能組合沒有{{ getCurrentViewLabel() }}</p>
              </div>

            </div>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-2">
            <button 
              @click="copyPowersetCard()"
              class="flex items-center justify-center px-2 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-xs font-medium transition-colors"
            >
              <Icon name="lucide:copy" class="w-3 h-3 mr-1" />
              複製卡片
            </button>
            <button 
              @click="copyAllData()"
              class="flex items-center justify-center px-2 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-xs font-medium transition-colors"
            >
              <Icon name="lucide:download" class="w-3 h-3 mr-1" />
              匯出資料
            </button>
          </div>

          <!-- Quick Stats Footer -->
          <div class="bg-gray-800/50 rounded-lg p-2 border border-gray-700">
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="flex justify-between">
                <span class="text-gray-400">總數：</span>
                <span class="text-purple-300 font-medium">{{ totalChallenges }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">頁數：</span>
                <span class="text-purple-300 font-medium">{{ currentPage }}/{{ totalPages }}</span>
              </div>
            </div>
          </div>

        </div>
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
  },
  totalChallenges: {
    type: Number,
    default: 0
  },
  filteredCount: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 1
  }
})

// Reactive data
const viewMode = ref('compact')

// Computed properties
const hasLimits = computed(() => {
  return props.selectedChallenge?.limits && Object.keys(props.selectedChallenge.limits).length > 0
})

const hasSpecials = computed(() => {
  return props.selectedChallenge?.specials && props.selectedChallenge.specials.length > 0
})

const hasConsequences = computed(() => {
  const challenge = props.selectedChallenge
  return (challenge?.consequences && challenge.consequences.length > 0) ||
         (challenge?.threatsAndConsequences && challenge.threatsAndConsequences.length > 0)
})

const hasTags = computed(() => {
  return props.selectedChallenge?.tags && props.selectedChallenge.tags.length > 0
})

const getConsequences = computed(() => {
  const challenge = props.selectedChallenge
  if (!challenge) return []
  
  // Handle different consequence formats
  if (challenge.consequences) {
    return challenge.consequences
  } else if (challenge.threatsAndConsequences) {
    const consequences = []
    challenge.threatsAndConsequences.forEach(threat => {
      consequences.push(`【${threat.category}】`)
      threat.consequences.forEach(consequence => {
        consequences.push(`• ${consequence}`)
      })
    })
    return consequences
  }
  return []
})

// Methods
const getTypeLabel = (type) => {
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

const getTypeStyle = (type) => {
  const typeStyles = {
    'MYTHOS': 'bg-purple-600/30 text-purple-200 border border-purple-500/50',
    'SELF': 'bg-blue-600/30 text-blue-200 border border-blue-500/50',
    'NOISE': 'bg-red-600/30 text-red-200 border border-red-500/50',
    'ENVIRONMENT': 'bg-green-600/30 text-green-200 border border-green-500/50',
    'NPC': 'bg-yellow-600/30 text-yellow-200 border border-yellow-500/50',
    'ORGANIZATION': 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50'
  }
  return typeStyles[type] || 'bg-gray-600/30 text-gray-200 border border-gray-500/50'
}

const getTierStyle = (tier) => {
  const level = parseInt(tier) || 1
  if (level <= 1) return 'bg-green-600 text-green-100'
  if (level <= 2) return 'bg-blue-600 text-blue-100'
  if (level <= 3) return 'bg-yellow-600 text-yellow-100'
  if (level <= 4) return 'bg-orange-600 text-orange-100'
  return 'bg-red-600 text-red-100'
}

const getSpecialTitle = (special) => {
  if (typeof special === 'string') {
    const colonIndex = special.indexOf('：')
    if (colonIndex > 0) {
      return special.substring(0, colonIndex).trim()
    }
    const colonIndex2 = special.indexOf(':')
    if (colonIndex2 > 0) {
      return special.substring(0, colonIndex2).trim()
    }
    const lines = special.split('\n')
    if (lines.length > 1 && lines[0].length < 50) {
      return lines[0].trim()
    }
    // 如果沒有明確標題，取前30個字符
    return special.length > 30 ? special.substring(0, 30) + '...' : special
  }
  return '特殊能力'
}

const getSpecialDescription = (special) => {
  if (typeof special === 'string') {
    const colonIndex = special.indexOf('：')
    if (colonIndex > 0) {
      return special.substring(colonIndex + 1).trim()
    }
    const colonIndex2 = special.indexOf(':')
    if (colonIndex2 > 0) {
      return special.substring(colonIndex2 + 1).trim()
    }
    return special
  }
  return special
}

const getCurrentViewLabel = () => {
  const viewLabels = {
    'compact': '概覽資料',
    'limits': '限制條件',
    'specials': '特殊能力',
    'consequences': '後果行動',
    'tags': '標籤'
  }
  return viewLabels[viewMode.value] || '內容'
}

const copyPowersetCard = async () => {
  if (!props.selectedChallenge) return
  
  const challenge = props.selectedChallenge
  let cardText = `🎯 ${challenge.name}\n`
  cardText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
  cardText += `📝 ${challenge.name_cn || challenge.name}\n`
  
  if (challenge.type) {
    cardText += `🏷️ 類型：${getTypeLabel(challenge.type)}\n`
  }
  
  cardText += `⭐ 等級：${challenge.tier || challenge.difficulty}\n\n`
  
  if (hasLimits.value) {
    cardText += `🚫 限制條件：\n`
    Object.entries(challenge.limits).forEach(([key, value]) => {
      cardText += `   • ${key}: ${value}\n`
    })
    cardText += `\n`
  }
  
  if (hasSpecials.value) {
    cardText += `✨ 特殊能力：\n`
    challenge.specials.forEach((special, index) => {
      const title = getSpecialTitle(special)
      const desc = getSpecialDescription(special)
      cardText += `   ${index + 1}. ${title}\n`
      if (desc && desc !== title) {
        cardText += `      ${desc.substring(0, 100)}${desc.length > 100 ? '...' : ''}\n`
      }
      cardText += `\n`
    })
  }
  
  if (hasTags.value) {
    cardText += `🏷️ 標籤：${challenge.tags.join('、')}\n\n`
  }
  
  cardText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
  
  try {
    await navigator.clipboard.writeText(cardText)
  } catch (err) {
    console.error('複製失敗:', err)
  }
}

const copyAllData = async () => {
  if (!props.selectedChallenge) return
  
  const challenge = props.selectedChallenge
  let allData = `# ${challenge.name}\n\n`
  
  allData += `**基本資訊**\n`
  allData += `- 英文名：${challenge.name}\n`
  allData += `- 中文名：${challenge.name_cn || challenge.name}\n`
  if (challenge.name_en) allData += `- 英文別名：${challenge.name_en}\n`
  if (challenge.type) allData += `- 類型：${getTypeLabel(challenge.type)}\n`
  allData += `- 等級：${challenge.tier || challenge.difficulty}\n\n`
  
  if (challenge.description) {
    allData += `**描述**\n${challenge.description}\n\n`
  }
  
  if (hasLimits.value) {
    allData += `**限制條件**\n`
    Object.entries(challenge.limits).forEach(([key, value]) => {
      allData += `- ${key}: ${value}\n`
    })
    allData += `\n`
  }
  
  if (hasSpecials.value) {
    allData += `**特殊能力**\n`
    challenge.specials.forEach((special, index) => {
      allData += `${index + 1}. ${special}\n\n`
    })
  }
  
  if (hasConsequences.value) {
    allData += `**後果行動**\n`
    getConsequences.value.forEach((consequence, index) => {
      allData += `${index + 1}. ${consequence}\n\n`
    })
  }
  
  if (hasTags.value) {
    allData += `**標籤**\n${challenge.tags.join('、')}\n\n`
  }
  
  try {
    await navigator.clipboard.writeText(allData)
  } catch (err) {
    console.error('複製失敗:', err)
  }
}

// Watch for challenge changes to reset view mode
watch(() => props.selectedChallenge, () => {
  viewMode.value = 'compact'
})
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #7c3aed #374151;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #7c3aed, #3b82f6);
  border-radius: 3px;
  transition: background 0.2s;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #6d28d9, #2563eb);
}

/* Select dropdown styling */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
}

select::-ms-expand {
  display: none;
}

select option {
  background-color: #374151 !important;
  color: #e5e7eb !important;
  padding: 8px 12px;
  border: none;
}

select option:hover,
select option:focus,
select option:checked {
  background-color: #7c3aed !important;
  color: white !important;
}

/* Animation for the powerset card */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-gradient-to-br {
  animation: fadeInUp 0.2s ease-out;
}

/* Compact hover effects for buttons */
button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2);
  transition: all 0.15s ease;
}

/* Compact grid animations */
.grid > div {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.grid > div:hover {
  transform: scale(1.01);
}

/* Tag hover effects - more subtle for compact design */
.inline-flex.items-center:hover {
  transform: scale(1.02);
  box-shadow: 0 1px 4px rgba(16, 185, 129, 0.2);
}

/* Special ability cards compact styling */
.bg-yellow-900\/20:hover {
  background-color: rgba(234, 179, 8, 0.15);
}

.bg-orange-900\/20:hover {
  background-color: rgba(251, 146, 60, 0.15);
}

.bg-emerald-900\/30:hover {
  background-color: rgba(16, 185, 129, 0.2);
}

/* Compact scrollbar for content areas */
.max-h-48::-webkit-scrollbar,
.max-h-64::-webkit-scrollbar {
  width: 4px;
}

.max-h-48::-webkit-scrollbar-thumb,
.max-h-64::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.6);
  border-radius: 2px;
}
</style>
