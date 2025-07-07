<template>
  <div class="min-h-screen bg-gray-900 pb-8 relative">
    <!-- 賽博龐克網格背景 -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px); background-size: 20px 20px;"></div>
    </div>
    
    <!-- Header -->
    <div class="bg-gray-800 shadow-lg border-b border-cyan-500/30 relative z-10">
      <div class="px-4 py-6">
        <div class="flex items-center justify-between">
          <NuxtLink to="/MO" class="text-cyan-300 hover:text-cyan-100 transition-colors">
            <Icon name="lucide:arrow-left" class="w-6 h-6" />
          </NuxtLink>
          <h1 class="text-xl font-bold text-cyan-100 flex items-center">
            <Icon name="lucide:database" class="w-5 h-5 mr-2 text-cyan-400" />
            挑戰資料庫 - 都市異景
          </h1>
          <div class="w-6"></div> <!-- Spacer -->
        </div>
      </div>
    </div>

    <!-- Main Content - 三分區 -->
    <div class="px-4 py-6 relative z-10 max-w-7xl mx-auto">
      <div class="grid grid-cols-12 gap-4 h-[calc(100vh-120px)] relative">
        
        <!-- Left Panel - 挑戰列表 -->
        <div class="col-span-3 bg-gray-800 rounded-xl shadow-lg border border-cyan-500/30 flex flex-col h-full">
          <!-- Search and Filter Controls -->
          <div class="border-b border-gray-600 relative z-20 flex-shrink-0">
            <div class="bg-gradient-to-r from-cyan-600 to-purple-600 p-4 rounded-t-xl">
              <h2 class="text-lg font-bold text-white flex items-center">
                <Icon name="lucide:list" class="w-5 h-5 mr-2" />
                挑戰列表
              </h2>
            </div>
            <div class="p-4 space-y-3">
              <!-- Search Bar -->
              <div class="relative">
                <Icon name="lucide:search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="搜尋挑戰名稱..."
                  class="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-cyan-100 placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm"
                />
              </div>
              
              <!-- Filter Controls -->
              <div class="grid grid-cols-2 gap-2 relative">
                <!-- Difficulty Filter -->
                <div class="relative">
                  <select 
                    v-model="selectedDifficulty"
                    class="w-full bg-gray-700 border border-gray-600 rounded-lg px-2 py-2 text-cyan-100 focus:border-cyan-400 focus:outline-none text-sm appearance-none cursor-pointer relative z-30"
                  >
                    <option value="">全部難度</option>
                    <option value="1">等級 1</option>
                    <option value="2">等級 2</option>
                    <option value="3">等級 3</option>
                    <option value="4">等級 4</option>
                    <option value="5">等級 5</option>
                  </select>
                  <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
                
                <!-- Sort Options -->
                <div class="relative">
                  <select 
                    v-model="sortBy"
                    class="w-full bg-gray-700 border border-gray-600 rounded-lg px-2 py-2 text-cyan-100 focus:border-cyan-400 focus:outline-none text-sm appearance-none cursor-pointer relative z-30"
                  >
                    <option value="name">名稱</option>
                    <option value="difficulty">難度</option>
                    <option value="name_en">英文名稱</option>
                  </select>
                  <Icon name="lucide:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
              
              <!-- Results Count -->
              <div class="text-center">
                <div class="text-xs text-gray-400">
                  顯示 {{ filteredChallenges.length }} / {{ challenges.length }} 個挑戰
                </div>
              </div>
            </div>
          </div>

          <!-- Challenge List -->
          <div class="flex-1 min-h-0 relative z-10">
            <div class="h-full overflow-y-auto p-4">
              <!-- Loading State -->
              <div v-if="isLoading" class="text-center py-8">
                <Icon name="lucide:loader-2" class="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-spin" />
                <p class="text-gray-400 text-sm">載入挑戰資料中...</p>
              </div>
              
              <!-- Error State -->
              <div v-else-if="loadError" class="text-center py-8">
                <Icon name="lucide:alert-circle" class="w-8 h-8 text-red-400 mx-auto mb-2" />
                <p class="text-red-400 text-sm">載入失敗</p>
                <p class="text-gray-500 text-xs mt-1">{{ loadError }}</p>
                <button 
                  @click="loadChallenges"
                  class="mt-3 px-3 py-1 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-700 transition-colors"
                >
                  重新載入
                </button>
              </div>
              
              <!-- Challenge List -->
              <div v-else-if="paginatedChallenges.length > 0" class="space-y-2">
              <div 
                v-for="(challenge, index) in paginatedChallenges" 
                :key="index"
                @click="selectChallenge(challenge)"
                :class="[
                  'p-3 rounded-lg border cursor-pointer transition-all hover:scale-105',
                  selectedChallengeData?.name === challenge.name 
                    ? 'bg-cyan-600 border-cyan-400 text-white' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-cyan-500'
                ]"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <h3 class="font-semibold text-sm">{{ challenge.name }}</h3>
                    <p class="text-xs opacity-75">{{ challenge.name_en }}</p>
                  </div>
                  <div class="flex flex-col items-end">
                    <span :class="[
                      'px-2 py-1 rounded text-xs font-bold',
                      selectedChallengeData?.name === challenge.name 
                        ? 'bg-cyan-800 text-cyan-100' 
                        : 'bg-cyan-900/50 text-cyan-200'
                    ]">
                      等級 {{ challenge.difficulty }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
              <!-- No Data State -->
              <div v-else class="text-center py-8">
                <Icon name="lucide:search-x" class="w-12 h-12 text-gray-500 mx-auto mb-2" />
                <p class="text-gray-400 text-sm">找不到符合條件的挑戰</p>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="border-t border-gray-600 p-4 flex-shrink-0">
            <div class="flex justify-center space-x-2">
              <button 
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-1 bg-gray-700 text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors text-sm"
              >
                上一頁
              </button>
              
              <span class="px-3 py-1 bg-cyan-600 text-white rounded text-sm">
                {{ currentPage }} / {{ totalPages }}
              </span>
              
              <button 
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 bg-gray-700 text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors text-sm"
              >
                下一頁
              </button>
            </div>
          </div>
        </div>

        <!-- Middle Panel - 挑戰詳細資料 -->
        <div class="col-span-6 bg-gray-900 rounded-lg shadow-xl border border-gray-700 flex flex-col h-full relative overflow-hidden">
          <div v-if="selectedChallengeData" class="h-full flex flex-col">
            <!-- 頂部等級標籤 -->
            <div class="absolute top-0 left-0 z-10">
              <div :class="[
                'px-4 py-2 rounded-br-lg text-xs font-bold uppercase tracking-wide',
                getDifficultyColor(selectedChallengeData.difficulty)
              ]">
                Level {{ selectedChallengeData.difficulty }}
              </div>
            </div>
            
            <!-- Content - 緊湊卡片風格 -->
            <div class="flex-1 min-h-0 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              <div class="h-full overflow-y-auto p-6 pt-12 custom-scrollbar">
                
                <!-- 主標題 -->
                <div class="mb-6">
                  <h1 class="text-2xl font-bold text-white leading-tight mb-1">{{ selectedChallengeData.name }}</h1>
                  <p class="text-gray-400 text-sm">{{ selectedChallengeData.name_en }}</p>
                </div>

                <!-- 描述 -->
                <div class="mb-4">
                  <p class="text-gray-300 text-sm leading-relaxed">{{ selectedChallengeData.description }}</p>
                </div>

                <!-- 標籤和限制 - 水平排列 -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <!-- Tags -->
                  <template v-if="selectedChallengeData.tags && selectedChallengeData.tags.length > 0">
                    <span 
                      v-for="(tag, index) in selectedChallengeData.tags" 
                      :key="'tag-' + index"
                      class="inline-block bg-emerald-800/80 text-emerald-100 px-2 py-1 rounded text-xs font-medium"
                    >
                      {{ tag }}
                    </span>
                  </template>
                  <!-- Limits -->
                  <template v-if="selectedChallengeData.limits && Object.keys(selectedChallengeData.limits).length > 0">
                    <span 
                      v-for="(value, key) in selectedChallengeData.limits" 
                      :key="'limit-' + key"
                      class="inline-block bg-red-800/80 text-red-100 px-2 py-1 rounded text-xs font-medium"
                    >
                      {{ key }}: {{ value }}
                    </span>
                  </template>
                </div>

                <!-- 特殊能力 -->
                <div v-if="selectedChallengeData.specials && selectedChallengeData.specials.length > 0" class="mb-4">
                  <h4 class="text-purple-300 font-bold text-xs mb-2 uppercase tracking-wider border-b border-purple-500/30 pb-1">Special Abilities</h4>
                  <div class="space-y-2">
                    <div 
                      v-for="(special, index) in selectedChallengeData.specials" 
                      :key="index"
                      class="text-gray-300 text-xs leading-tight"
                    >
                      <span class="text-purple-200 font-medium">{{ getSpecialTitle(special) }}:</span>
                      <span class="ml-1">{{ getSpecialDescription(special) }}</span>
                    </div>
                  </div>
                </div>

                <!-- 威脅與後果 -->
                <div v-if="selectedChallengeData.threatsAndConsequences && selectedChallengeData.threatsAndConsequences.length > 0">
                  <h4 class="text-orange-300 font-bold text-xs mb-2 uppercase tracking-wider border-b border-orange-500/30 pb-1">Threats & Consequences</h4>
                  <div class="space-y-3">
                    <div 
                      v-for="(threat, index) in selectedChallengeData.threatsAndConsequences" 
                      :key="index"
                    >
                      <h5 class="text-orange-200 font-semibold text-xs mb-1">{{ threat.category }}</h5>
                      <ul class="space-y-1 ml-2">
                        <li 
                          v-for="(consequence, cIndex) in threat.consequences" 
                          :key="cIndex"
                          class="text-gray-300 text-xs leading-tight flex items-start"
                        >
                          <span class="text-orange-400 mr-1 flex-shrink-0 text-xs">•</span>
                          <span>{{ consequence }}</span>
                        </li>
                      </ul>
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

        <!-- Right Panel - 預留區域 -->
        <div class="col-span-3 bg-gray-800 rounded-xl shadow-lg border border-cyan-500/30 flex flex-col h-full">
          <div class="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-xl flex-shrink-0">
            <h2 class="text-lg font-bold text-white flex items-center">
              <Icon name="lucide:bookmark" class="w-5 h-5 mr-2" />
              快速工具
            </h2>
          </div>
          
          <div class="flex-1 p-4 overflow-y-auto">
            <div class="space-y-4">
              <!-- 複製功能 -->
              <div v-if="selectedChallengeData" class="space-y-2">
                <h4 class="text-purple-300 font-medium text-sm">複製資料</h4>
                <button 
                  @click="copyToClipboard('name')"
                  class="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors border border-gray-600 hover:border-purple-400"
                >
                  <Icon name="lucide:copy" class="w-4 h-4 inline mr-2" />
                  複製名稱
                </button>
                <button 
                  @click="copyToClipboard('description')"
                  class="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors border border-gray-600 hover:border-purple-400"
                >
                  <Icon name="lucide:copy" class="w-4 h-4 inline mr-2" />
                  複製描述
                </button>
                <button 
                  @click="copyToClipboard('all')"
                  class="w-full text-left px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm text-white transition-colors"
                >
                  <Icon name="lucide:copy" class="w-4 h-4 inline mr-2" />
                  複製完整資料
                </button>
              </div>
              
              <!-- 統計信息 -->
              <div class="space-y-2">
                <h4 class="text-purple-300 font-medium text-sm">資料統計</h4>
                <div class="bg-gray-700/50 rounded-lg p-3 space-y-2">
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-400">總挑戰數</span>
                    <span class="text-purple-300 font-medium">{{ challenges.length }}</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-400">篩選結果</span>
                    <span class="text-purple-300 font-medium">{{ filteredChallenges.length }}</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-400">當前頁數</span>
                    <span class="text-purple-300 font-medium">{{ currentPage }} / {{ totalPages }}</span>
                  </div>
                </div>
              </div>
              
              <!-- 功能說明 -->
              <div v-if="!selectedChallengeData" class="text-center py-8">
                <Icon name="lucide:info" class="w-12 h-12 text-gray-500 mx-auto mb-2" />
                <p class="text-gray-400 text-sm">選擇挑戰後將顯示快速操作工具</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 頁面設定
definePageMeta({
  title: '挑戰資料庫 - 都市異景'
})

// 動態獲取基礎路徑
const getBasePath = () => {
  return ''
}

// 響應式數據
const challenges = ref([])
const searchQuery = ref('')
const selectedDifficulty = ref('')
const sortBy = ref('name')
const currentPage = ref(1)
const itemsPerPage = 10  // 減少每頁顯示數量以提升性能
const selectedChallengeData = ref(null)
const isLoading = ref(true)
const loadError = ref(null)

// 計算屬性 - 優化性能
const filteredChallenges = computed(() => {
  if (isLoading.value || challenges.value.length === 0) return []
  
  let filtered = [...challenges.value]

  // 搜尋過濾
  if (searchQuery.value?.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(challenge => 
      challenge.name?.toLowerCase().includes(query) ||
      challenge.name_en?.toLowerCase().includes(query)
    )
  }

  // 難度過濾
  if (selectedDifficulty.value) {
    const difficulty = parseInt(selectedDifficulty.value)
    filtered = filtered.filter(challenge => challenge.difficulty === difficulty)
  }

  // 排序
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'difficulty':
        return (a.difficulty || 0) - (b.difficulty || 0)
      case 'name_en':
        return (a.name_en || '').localeCompare(b.name_en || '')
      default:
        return (a.name || '').localeCompare(b.name || '')
    }
  })

  return filtered
})

const totalPages = computed(() => 
  Math.ceil(filteredChallenges.value.length / itemsPerPage)
)

const paginatedChallenges = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredChallenges.value.slice(start, end)
})

// 複製功能
const copyToClipboard = async (type) => {
  if (!selectedChallengeData.value) return
  
  let textToCopy = ''
  
  switch (type) {
    case 'name':
      textToCopy = `${selectedChallengeData.value.name} (${selectedChallengeData.value.name_en})`
      break
    case 'description':
      textToCopy = selectedChallengeData.value.description
      break
    case 'all':
      textToCopy = formatChallengeData(selectedChallengeData.value)
      break
  }
  
  try {
    await navigator.clipboard.writeText(textToCopy)
    // 可以在這裡加入通知功能
  } catch (err) {
    console.error('複製失敗:', err)
  }
}

// 格式化挑戰資料為文字
const formatChallengeData = (challenge) => {
  let text = `【${challenge.name}】\n`
  text += `英文名稱: ${challenge.name_en}\n`
  text += `難度等級: ${challenge.difficulty}\n\n`
  text += `描述:\n${challenge.description}\n\n`
  
  if (challenge.limits && Object.keys(challenge.limits).length > 0) {
    text += `限制:\n`
    Object.entries(challenge.limits).forEach(([key, value]) => {
      text += `• ${key}: ${value}\n`
    })
    text += '\n'
  }
  
  if (challenge.tags && challenge.tags.length > 0) {
    text += `標籤: ${challenge.tags.join(', ')}\n\n`
  }
  
  if (challenge.specials && challenge.specials.length > 0) {
    text += `特殊能力:\n`
    challenge.specials.forEach((special, index) => {
      text += `${index + 1}. ${special}\n`
    })
    text += '\n'
  }
  
  if (challenge.threatsAndConsequences && challenge.threatsAndConsequences.length > 0) {
    text += `威脅與後果:\n`
    challenge.threatsAndConsequences.forEach((threat) => {
      text += `【${threat.category}】\n`
      threat.consequences.forEach((consequence) => {
        text += `• ${consequence}\n`
      })
      text += '\n'
    })
  }
  
  return text
}

// 方法
async function loadChallenges() {
  try {
    isLoading.value = true
    loadError.value = null
    const basePath = getBasePath()
    const data = await $fetch(`${basePath}/MO/challenges/metro.json`)
    challenges.value = data.challenges || []
    console.log('載入的挑戰數量:', challenges.value.length)
  } catch (error) {
    console.error('載入挑戰資料失敗:', error)
    loadError.value = error.message
    challenges.value = []
  } finally {
    isLoading.value = false
  }
}

function selectChallenge(challenge) {
  console.log('選擇挑戰:', challenge.name)
  selectedChallengeData.value = challenge
}

// 取得難度顏色樣式
function getDifficultyColor(difficulty) {
  const level = parseInt(difficulty)
  if (level <= 2) return 'bg-green-600 text-green-100'
  if (level <= 4) return 'bg-yellow-600 text-yellow-100'  
  if (level <= 6) return 'bg-orange-600 text-orange-100'
  if (level <= 8) return 'bg-red-600 text-red-100'
  return 'bg-purple-600 text-purple-100'
}

// 解析特殊能力標題
function getSpecialTitle(special) {
  if (typeof special === 'string') {
    const colonIndex = special.indexOf(':')
    if (colonIndex > 0) {
      return special.substring(0, colonIndex).trim()
    }
    return special.split('.')[0].trim()
  }
  return '特殊能力'
}

// 解析特殊能力描述
function getSpecialDescription(special) {
  if (typeof special === 'string') {
    const colonIndex = special.indexOf(':')
    if (colonIndex > 0) {
      return special.substring(colonIndex + 1).trim()
    }
    const dotIndex = special.indexOf('.')
    if (dotIndex > 0) {
      return special.substring(dotIndex + 1).trim()
    }
    return special
  }
  return ''
}

// 監聽篩選變化重置頁碼
watch([searchQuery, selectedDifficulty], () => {
  currentPage.value = 1
})

// 頁面載入時載入資料
onMounted(() => {
  loadChallenges()
})
</script>

<style scoped>
/* 確保頁面滾動正常 */
html, body {
  overflow-x: hidden;
  overflow-y: auto;
}

/* 自定義滾動條樣式 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #06b6d4;
  border-radius: 3px;
  transition: background 0.2s;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #0891b2;
}

/* 通用滾動條 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #06b6d4;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #0891b2;
}

/* 確保佈局不會超出容器 */
.max-h-full {
  max-height: 100%;
}

.min-h-0 {
  min-height: 0;
}

/* 修正下拉選單樣式 */
select {
  /* 移除預設的下拉箭頭 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
}

/* 針對不同瀏覽器的下拉選單樣式修正 */
select::-ms-expand {
  display: none; /* IE/Edge */
}

/* 下拉選單的選項樣式 */
select option {
  background-color: #374151 !important;
  color: #e5e7eb !important;
  padding: 8px 12px;
  border: none;
}

select option:hover,
select option:focus,
select option:checked {
  background-color: #06b6d4 !important;
  color: white !important;
}

/* Firefox 特殊處理 */
@-moz-document url-prefix() {
  select option {
    background-color: #374151;
    color: #e5e7eb;
  }
  
  select option:checked {
    background-color: #06b6d4;
    color: white;
  }
}

/* 確保下拉選單有正確的層級和定位 */
.relative.z-30 {
  position: relative;
  z-index: 30;
}

.relative.z-20 {
  position: relative;
  z-index: 20;
  overflow: visible;
}

.relative.z-10 {
  position: relative;
  z-index: 10;
}

/* 響應式調整 */
@media (max-width: 1280px) {
  .grid-cols-12 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .col-span-3 {
    grid-column: span 1;
  }
  
  .col-span-6 {
    grid-column: span 1;
  }
  
  .col-span-3:last-child {
    grid-column: span 2;
  }
  
  .h-\[calc\(100vh-120px\)\] {
    height: calc(100vh - 140px);
  }
}

@media (max-width: 768px) {
  .grid-cols-12 {
    grid-template-columns: 1fr;
    height: auto !important;
  }
  
  .col-span-3, .col-span-6 {
    grid-column: span 1;
    height: auto !important;
  }
  
  .grid > div {
    min-height: 400px;
    height: auto !important;
  }
  
  .h-\[calc\(100vh-120px\)\] {
    height: auto !important;
  }
}
</style>
