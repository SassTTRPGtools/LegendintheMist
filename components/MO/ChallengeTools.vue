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
          
          <!-- Powerset List -->
          <div v-if="!selectedPowerset" class="space-y-2">
            <div class="max-h-96 overflow-y-auto space-y-1">
              <div v-for="powerset in powersets" :key="powerset.name" 
                   @click="selectPowerset(powerset)"
                   class="bg-gray-700/30 rounded p-2 border border-gray-600 hover:border-purple-400 cursor-pointer transition-all text-xs">
                <div class="flex justify-between items-center">
                  <div class="flex-1 min-w-0">
                    <span class="text-white font-medium block truncate">{{ powerset.name_cn }}</span>
                    <span class="text-gray-400 text-xs">{{ powerset.name }}</span>
                  </div>
                  <div class="flex items-center gap-1 ml-2">
                    <span v-if="powerset.type" :class="['inline-block px-1 py-0.5 rounded text-xs', getTypeStyle(powerset.type)]">
                      {{ getTypeLabel(powerset.type) }}
                    </span>
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
          </div>

          <!-- Selected Powerset Detail Card -->
          <div v-else class="space-y-3">
            
            <!-- Back Button -->
            <button 
              @click="selectedPowerset = null"
              class="flex items-center text-purple-300 hover:text-purple-100 text-xs transition-colors"
            >
              <Icon name="lucide:arrow-left" class="w-3 h-3 mr-1" />
              返回列表
            </button>

            <!-- Compact Info Card -->
            <div class="bg-gradient-to-br from-gray-700/80 to-gray-800/80 rounded-lg border border-purple-500/20 overflow-hidden">
              
              <!-- Card Header -->
              <div class="p-3 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border-b border-purple-500/30">
                <div class="flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-bold text-white truncate">{{ selectedPowerset.name_cn }}</h3>
                    <p class="text-purple-200 text-xs truncate">{{ selectedPowerset.name }}</p>
                    <div class="flex items-center gap-1 mt-1">
                      <span v-if="selectedPowerset.type" :class="getTypeStyle(selectedPowerset.type)" 
                            class="px-2 py-0.5 rounded-full text-xs font-medium">
                        {{ getTypeLabel(selectedPowerset.type) }}
                      </span>
                      <span :class="getTierStyle(selectedPowerset.tier || selectedPowerset.difficulty)"
                            class="px-2 py-0.5 rounded-full text-xs font-bold">
                        T{{ selectedPowerset.tier || selectedPowerset.difficulty }}
                      </span>
                    </div>
                  </div>
                  <Icon name="lucide:sparkles" class="w-5 h-5 text-yellow-400 flex-shrink-0" />
                </div>
              </div>

              <!-- Card Body -->
              <div class="p-3 space-y-3">
                
                <!-- Description -->
                <div v-if="selectedPowerset.description" class="text-xs text-gray-300 leading-relaxed bg-gray-700/30 rounded p-2">
                  {{ selectedPowerset.description }}
                </div>
                
                <!-- Thresholds (Limits) -->
                <div v-if="selectedPowerset.limits && Object.keys(selectedPowerset.limits).length > 0" class="space-y-2">
                  <h4 class="text-red-300 font-semibold text-xs flex items-center">
                    <Icon name="lucide:alert-triangle" class="w-3 h-3 mr-1" />
                    閾值
                  </h4>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="(value, key) in selectedPowerset.limits" :key="key" 
                          class="inline-flex items-center px-2 py-1 bg-red-900/30 border border-red-500/30 rounded text-red-200 text-xs font-medium">
                      {{ key }}: {{ value }}
                    </span>
                  </div>
                </div>

                <!-- Special Abilities -->
                <div v-if="selectedPowerset.specials && selectedPowerset.specials.length > 0" class="space-y-2">
                  <h4 class="text-yellow-300 font-semibold text-xs flex items-center">
                    <Icon name="lucide:sparkles" class="w-3 h-3 mr-1" />
                    特殊能力
                  </h4>
                  <div class="space-y-1">
                    <div v-for="(special, index) in selectedPowerset.specials" :key="index" 
                         class="bg-yellow-900/20 border border-yellow-500/30 rounded p-2">
                      <div class="text-gray-300 text-xs leading-relaxed">{{ special.substring(0, 120) }}{{ special.length > 120 ? '...' : '' }}</div>
                    </div>
                  </div>
                </div>

                <!-- Consequences -->
                <div v-if="selectedPowerset.consequences && selectedPowerset.consequences.length > 0" class="space-y-2">
                  <h4 class="text-orange-300 font-semibold text-xs flex items-center">
                    <Icon name="lucide:target" class="w-3 h-3 mr-1" />
                    後果行動
                  </h4>
                  <div class="space-y-1">
                    <div v-for="(consequence, index) in selectedPowerset.consequences" :key="index" 
                         class="bg-orange-900/20 border border-orange-500/30 rounded p-2">
                      <div class="text-gray-300 text-xs leading-relaxed whitespace-pre-line">{{ consequence }}</div>
                    </div>
                  </div>
                </div>

                <!-- Tags -->
                <div v-if="selectedPowerset.tags && selectedPowerset.tags.length > 0" class="space-y-2">
                  <h4 class="text-emerald-300 font-semibold text-xs flex items-center">
                    <Icon name="lucide:tags" class="w-3 h-3 mr-1" />
                    標籤
                  </h4>
                  <div class="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                    <span v-for="(tag, index) in selectedPowerset.tags" :key="index" 
                          class="inline-flex items-center px-2 py-1 bg-emerald-900/30 border border-emerald-500/30 rounded text-emerald-200 text-xs font-medium">
                      {{ tag }}
                    </span>
                  </div>
                </div>

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
const selectedPowerset = ref(null)
const isLoading = ref(true)
const loadError = ref(null)

// 方法
async function loadPowersets() {
  try {
    isLoading.value = true
    loadError.value = null
    
    const data = await $fetch('/MO/powersets/powersets.json')
    powersets.value = Array.isArray(data) ? data : []
    
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
    'NOISE': '喧囂',
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
