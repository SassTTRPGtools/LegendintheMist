<template>
  <div class="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-2xl border border-purple-500/30 flex flex-col h-full max-h-full overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-3 rounded-t-xl flex-shrink-0 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-indigo-600/80 to-blue-600/80"></div>
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 20px 20px;"></div>
      <h2 class="text-base font-bold text-white flex items-center relative z-10">
        <Icon name="lucide:zap" class="w-4 h-4 mr-2 text-yellow-300" />
        異能組合庫
      </h2>
    </div>
    
    <!-- Content -->
    <div class="flex-1 min-h-0 overflow-hidden">
      <div class="h-full overflow-y-auto custom-scrollbar">
        
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-8 px-4">
          <div class="relative mb-3">
            <Icon name="lucide:loader-2" class="w-12 h-12 text-purple-400 mx-auto animate-spin" />
          </div>
          <p class="text-purple-300 text-xs">載入異能組合中...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="loadError" class="text-center py-8 px-4">
          <Icon name="lucide:alert-circle" class="w-12 h-12 text-red-400 mx-auto mb-2" />
          <p class="text-red-300 text-xs">載入失敗</p>
          <button @click="loadPowersets" class="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-xs">
            重新載入
          </button>
        </div>

        <!-- Main Content -->
        <div v-else class="p-3 space-y-3">
          
          <!-- Display Mode Selector -->
          <div class="space-y-2">
            <label class="text-purple-300 font-medium text-xs">顯示模式</label>
            <div class="relative">
              <select 
                v-model="displayMode"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-cyan-100 focus:border-cyan-400 focus:outline-none text-xs appearance-none cursor-pointer"
              >
                <option value="overview">整體概覽</option>
                <option value="cards">卡片瀏覽</option>
                <option value="list">列表檢視</option>
                <option value="stats">統計資訊</option>
              </select>
              <Icon name="lucide:chevron-down" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
            </div>
          </div>
          
          <!-- Main Content Display -->
          <div v-if="displayMode === 'overview'" class="space-y-3">
            
            <!-- Summary Stats -->
            <div v-if="powersetsStats" class="bg-gray-700/30 rounded-lg p-3 border border-purple-500/20">
              <h4 class="text-purple-300 font-semibold text-xs mb-2 flex items-center">
                <Icon name="lucide:bar-chart-3" class="w-3 h-3 mr-1" />
                資料概覽
              </h4>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="flex justify-between">
                  <span class="text-gray-400">總數：</span>
                  <span class="text-purple-300 font-medium">{{ powersetsStats.total }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">平均能力：</span>
                  <span class="text-purple-300 font-medium">{{ powersetsStats.avgSpecials }}</span>
                </div>
              </div>
            </div>

            <!-- Type Distribution -->
            <div v-if="powersetsStats" class="bg-gray-700/30 rounded-lg p-3 border border-purple-500/20">
              <h4 class="text-purple-300 font-semibold text-xs mb-2">類型分布</h4>
              <div class="space-y-1">
                <div v-for="(count, type) in powersetsStats.typeCount" :key="type" 
                     class="flex justify-between items-center text-xs">
                  <span class="text-gray-300">{{ getTypeLabel(type) }}</span>
                  <span class="text-purple-300 font-medium">{{ count }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Cards View -->
          <div v-else-if="displayMode === 'cards'" class="space-y-3">
            
            <!-- Pagination Controls -->
            <div class="flex justify-between items-center">
              <button 
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-2 py-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-50 rounded text-white text-xs"
              >
                <Icon name="lucide:chevron-left" class="w-3 h-3" />
              </button>
              <span class="text-gray-300 text-xs">{{ currentPage }} / {{ totalPages }}</span>
              <button 
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-2 py-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-50 rounded text-white text-xs"
              >
                <Icon name="lucide:chevron-right" class="w-3 h-3" />
              </button>
            </div>

            <!-- Powerset Cards -->
            <div class="space-y-2 max-h-96 overflow-y-auto">
              <div v-for="powerset in paginatedPowersets" :key="powerset.name" 
                   @click="selectPowerset(powerset)"
                   :class="[
                     'bg-gray-700/50 rounded-lg p-2 border cursor-pointer transition-all',
                     selectedPowerset?.name === powerset.name 
                       ? 'border-purple-500 bg-purple-900/20' 
                       : 'border-gray-600 hover:border-purple-400'
                   ]">
                <div class="flex justify-between items-start mb-1">
                  <h5 class="text-white font-medium text-xs">{{ powerset.name }}</h5>
                  <span :class="[
                    'px-1 py-0.5 rounded text-xs font-bold',
                    getTierStyle(powerset.tier || powerset.difficulty)
                  ]">
                    T{{ powerset.tier || powerset.difficulty }}
                  </span>
                </div>
                <p class="text-gray-400 text-xs">{{ powerset.name_cn }}</p>
                <div v-if="powerset.type" class="mt-1">
                  <span :class="['inline-block px-1 py-0.5 rounded text-xs', getTypeStyle(powerset.type)]">
                    {{ getTypeLabel(powerset.type) }}
                  </span>
                </div>
              </div>
            </div>

          </div>

          <!-- List View -->
          <div v-else-if="displayMode === 'list'" class="space-y-2">
            <div class="max-h-96 overflow-y-auto space-y-1">
              <div v-for="powerset in powersets" :key="powerset.name" 
                   @click="selectPowerset(powerset)"
                   :class="[
                     'bg-gray-700/30 rounded p-2 border cursor-pointer transition-all text-xs',
                     selectedPowerset?.name === powerset.name 
                       ? 'border-purple-500 bg-purple-900/20' 
                       : 'border-gray-600 hover:border-purple-400'
                   ]">
                <div class="flex justify-between items-center">
                  <span class="text-white font-medium">{{ powerset.name }}</span>
                  <span :class="[
                    'px-1 py-0.5 rounded text-xs font-bold',
                    getTierStyle(powerset.tier || powerset.difficulty)
                  ]">
                    {{ powerset.tier || powerset.difficulty }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats View -->
          <div v-else-if="displayMode === 'stats' && powersetsStats" class="space-y-3">
            
            <!-- General Stats -->
            <div class="bg-gray-700/30 rounded-lg p-3 border border-purple-500/20">
              <h4 class="text-purple-300 font-semibold text-xs mb-2">統計數據</h4>
              <div class="grid grid-cols-1 gap-2 text-xs">
                <div class="flex justify-between">
                  <span class="text-gray-400">總異能組合：</span>
                  <span class="text-purple-300 font-medium">{{ powersetsStats.total }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">總特殊能力：</span>
                  <span class="text-purple-300 font-medium">{{ powersetsStats.totalSpecials }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">總標籤數：</span>
                  <span class="text-purple-300 font-medium">{{ powersetsStats.totalTags }}</span>
                </div>
              </div>
            </div>

            <!-- Tier Distribution -->
            <div class="bg-gray-700/30 rounded-lg p-3 border border-purple-500/20">
              <h4 class="text-purple-300 font-semibold text-xs mb-2">等級分布</h4>
              <div class="space-y-1">
                <div v-for="(count, tier) in powersetsStats.tierCount" :key="tier" 
                     class="flex justify-between items-center text-xs">
                  <span class="text-gray-300">等級 {{ tier }}</span>
                  <span class="text-purple-300 font-medium">{{ count }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Selected Powerset Detail -->
          <div v-if="selectedPowerset" class="bg-gray-700/50 rounded-lg p-3 border border-purple-500/30 mt-3">
            <h4 class="text-purple-300 font-semibold text-xs mb-2 flex items-center">
              <Icon name="lucide:eye" class="w-3 h-3 mr-1" />
              當前選擇
            </h4>
            <div class="space-y-2">
              <div>
                <h5 class="text-white font-medium text-xs">{{ selectedPowerset.name }}</h5>
                <p class="text-gray-400 text-xs">{{ selectedPowerset.name_cn }}</p>
              </div>
              
              <div v-if="selectedPowerset.specials" class="text-xs">
                <span class="text-gray-400">特殊能力：</span>
                <span class="text-purple-300 font-medium">{{ selectedPowerset.specials.length }}</span>
              </div>
              
              <div v-if="selectedPowerset.tags" class="text-xs">
                <span class="text-gray-400">標籤數：</span>
                <span class="text-purple-300 font-medium">{{ selectedPowerset.tags.length }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 響應式數據
const powersets = ref([])
const displayMode = ref('overview')
const selectedPowerset = ref(null)
const isLoading = ref(true)
const loadError = ref(null)
const currentPage = ref(1)
const itemsPerPage = 6

// 計算屬性
const paginatedPowersets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return powersets.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(powersets.value.length / itemsPerPage)
)

const powersetsStats = computed(() => {
  if (!powersets.value.length) return null
  
  const typeCount = {}
  const tierCount = {}
  let totalSpecials = 0
  let totalTags = 0
  
  powersets.value.forEach(powerset => {
    // 計算類型分布
    if (powerset.type) {
      typeCount[powerset.type] = (typeCount[powerset.type] || 0) + 1
    }
    
    // 計算等級分布
    const tier = powerset.tier || powerset.difficulty || 1
    tierCount[tier] = (tierCount[tier] || 0) + 1
    
    // 計算特殊能力總數
    if (powerset.specials) {
      totalSpecials += powerset.specials.length
    }
    
    // 計算標籤總數
    if (powerset.tags) {
      totalTags += powerset.tags.length
    }
  })
  
  return {
    total: powersets.value.length,
    typeCount,
    tierCount,
    totalSpecials,
    totalTags,
    avgSpecials: (totalSpecials / powersets.value.length).toFixed(1),
    avgTags: (totalTags / powersets.value.length).toFixed(1)
  }
})

// 方法
async function loadPowersets() {
  try {
    isLoading.value = true
    loadError.value = null
    
    const data = await $fetch('/MO/powersets/powersets.json')
    powersets.value = Array.isArray(data) ? data : []
    
    // 如果有資料，預設選擇第一個
    if (powersets.value.length > 0) {
      selectedPowerset.value = powersets.value[0]
    }
  } catch (error) {
    console.error('載入異能組合失敗:', error)
    loadError.value = error.message
    powersets.value = []
  } finally {
    isLoading.value = false
  }
}

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

const selectPowerset = (powerset) => {
  selectedPowerset.value = powerset
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// 生命週期
onMounted(() => {
  loadPowersets()
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
