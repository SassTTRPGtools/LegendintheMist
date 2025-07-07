<template>
  <div class="min-h-screen bg-gray-900 pb-8 relative overflow-hidden">
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

    <!-- Main Content -->
    <div class="px-4 py-6 relative z-10 max-w-7xl mx-auto">
      <!-- Search and Filter Controls -->
      <div class="mb-6">
        <div class="bg-gray-800 rounded-xl shadow-lg border border-cyan-500/30 overflow-hidden">
          <div class="bg-gradient-to-r from-cyan-600 to-purple-600 p-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon name="lucide:search" class="w-5 h-5 mr-2" />
              搜尋與篩選
            </h2>
          </div>
          <div class="p-4 space-y-4">
            <!-- Search Bar -->
            <div class="relative">
              <Icon name="lucide:search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="搜尋挑戰名稱或描述..."
                class="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-cyan-100 placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            
            <!-- Filter Controls -->
            <div class="grid md:grid-cols-3 gap-4">
              <!-- Difficulty Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">難度等級</label>
                <select 
                  v-model="selectedDifficulty"
                  class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-cyan-100 focus:border-cyan-400 focus:outline-none"
                >
                  <option value="">全部難度</option>
                  <option value="1">等級 1</option>
                  <option value="2">等級 2</option>
                  <option value="3">等級 3</option>
                  <option value="4">等級 4</option>
                  <option value="5">等級 5</option>
                </select>
              </div>
              
              <!-- Sort Options -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">排序方式</label>
                <select 
                  v-model="sortBy"
                  class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-cyan-100 focus:border-cyan-400 focus:outline-none"
                >
                  <option value="name">名稱</option>
                  <option value="difficulty">難度</option>
                  <option value="name_en">英文名稱</option>
                </select>
              </div>
              
              <!-- Results Count -->
              <div class="flex items-end">
                <div class="text-sm text-gray-400">
                  顯示 {{ filteredChallenges.length }} / {{ challenges.length }} 個挑戰
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Challenge Grid -->
      <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div 
          v-for="(challenge, index) in paginatedChallenges" 
          :key="index"
          @click="selectChallenge(challenge)"
          class="bg-gray-800 rounded-xl shadow-lg border border-gray-600 hover:border-cyan-400 transition-all cursor-pointer overflow-hidden"
        >
          <!-- Challenge Header -->
          <div class="bg-gradient-to-r from-cyan-600 to-blue-600 p-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-bold text-white">{{ challenge.name }}</h3>
                <p class="text-cyan-200 text-sm">{{ challenge.name_en }}</p>
              </div>
              <div class="flex flex-col items-end">
                <span class="inline-block bg-cyan-800 text-cyan-100 px-2 py-1 rounded text-xs font-bold">
                  等級 {{ challenge.difficulty }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Challenge Content -->
          <div class="p-4">
            <!-- Description -->
            <p class="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
              {{ challenge.description }}
            </p>
            
            <!-- Limits -->
            <div v-if="challenge.limits && Object.keys(challenge.limits).length > 0" class="mb-4">
              <h4 class="text-red-400 font-semibold text-sm mb-2 flex items-center">
                <Icon name="lucide:alert-triangle" class="w-3 h-3 mr-1" />
                限制
              </h4>
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="(value, key) in challenge.limits" 
                  :key="key"
                  class="inline-block bg-red-900/30 text-red-200 px-2 py-1 rounded text-xs border border-red-500/30"
                >
                  {{ key }} {{ value }}
                </span>
              </div>
            </div>
            
            <!-- Tags -->
            <div v-if="challenge.tags && challenge.tags.length > 0" class="mb-4">
              <h4 class="text-green-400 font-semibold text-sm mb-2 flex items-center">
                <Icon name="lucide:tag" class="w-3 h-3 mr-1" />
                標籤
              </h4>
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="(tag, tagIndex) in challenge.tags.slice(0, 3)" 
                  :key="tagIndex"
                  class="inline-block bg-green-900/30 text-green-200 px-2 py-1 rounded text-xs border border-green-500/30"
                >
                  {{ tag }}
                </span>
                <span 
                  v-if="challenge.tags.length > 3"
                  class="inline-block bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                >
                  +{{ challenge.tags.length - 3 }}
                </span>
              </div>
            </div>
            
            <!-- Quick Info -->
            <div class="pt-2 border-t border-gray-700">
              <div class="flex justify-between items-center text-xs text-gray-400">
                <span>{{ challenge.threatsAndConsequences?.length || 0 }} 威脅與後果</span>
                <span>{{ challenge.specials?.length || 0 }} 特殊能力</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-8 flex justify-center">
        <div class="flex space-x-2">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            上一頁
          </button>
          
          <span class="px-3 py-2 bg-cyan-600 text-white rounded-lg">
            {{ currentPage }} / {{ totalPages }}
          </span>
          
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            下一頁
          </button>
        </div>
      </div>
    </div>

    <!-- Challenge Detail Modal -->
    <ChallengeDetailModal
      :is-visible="showDetailModal"
      :challenge="selectedChallengeData"
      @close="closeDetailModal" />
  </div>
</template>

<script setup>
// 頁面設定
definePageMeta({
  title: '挑戰資料庫 - 都市異景'
})

// 動態獲取基礎路徑
const getBasePath = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/LegendintheMist'
  }
  return ''
}

// 響應式數據
const challenges = ref([])
const searchQuery = ref('')
const selectedDifficulty = ref('')
const sortBy = ref('name')
const currentPage = ref(1)
const itemsPerPage = 12
const showDetailModal = ref(false)
const selectedChallengeData = ref(null)

// 計算屬性
const filteredChallenges = computed(() => {
  let filtered = challenges.value

  // 搜尋過濾
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(challenge => 
      challenge.name.toLowerCase().includes(query) ||
      challenge.name_en?.toLowerCase().includes(query) ||
      challenge.description?.toLowerCase().includes(query)
    )
  }

  // 難度過濾
  if (selectedDifficulty.value) {
    filtered = filtered.filter(challenge => 
      challenge.difficulty === parseInt(selectedDifficulty.value)
    )
  }

  // 排序
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'difficulty':
        return a.difficulty - b.difficulty
      case 'name_en':
        return (a.name_en || '').localeCompare(b.name_en || '')
      default:
        return a.name.localeCompare(b.name)
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

// 方法
async function loadChallenges() {
  try {
    const basePath = getBasePath()
    const data = await $fetch(`${basePath}/MO/challenges/metro.json`)
    challenges.value = data.challenges || []
    console.log('載入的挑戰數量:', challenges.value.length)
  } catch (error) {
    console.error('載入挑戰資料失敗:', error)
    challenges.value = []
  }
}

function selectChallenge(challenge) {
  selectedChallengeData.value = challenge
  showDetailModal.value = true
}

function closeDetailModal() {
  showDetailModal.value = false
  selectedChallengeData.value = null
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
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
