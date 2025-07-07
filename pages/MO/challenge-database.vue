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
          <div class="text-center">
            <h1 class="text-xl font-bold text-cyan-100 flex items-center justify-center">
              <Icon name="lucide:database" class="w-5 h-5 mr-2 text-cyan-400" />
              挑戰資料庫
            </h1>
            <p class="text-cyan-300 text-xs mt-1">都市異景 • 能力套組</p>
          </div>
          <div class="w-6"></div> <!-- 保持佈局平衡 -->
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 py-6 relative z-10 max-w-full mx-auto">
      <div class="grid grid-cols-3 gap-4 h-[calc(100vh-140px)] relative">
        
        <!-- Left Panel - Challenge List Component -->
        <ChallengeList
          :challenges="challenges"
          :filteredChallenges="filteredChallenges"
          :paginatedChallenges="paginatedChallenges"
          v-model:searchQuery="searchQuery"
          v-model:selectedDifficulty="selectedDifficulty"
          v-model:sortBy="sortBy"
          v-model:currentPage="currentPage"
          :totalPages="totalPages"
          :selectedChallenge="selectedChallengeData"
          :isLoading="isLoading"
          :loadError="loadError"
          @selectChallenge="selectChallenge"
          @reload="loadChallenges"
        />

        <!-- Middle Panel - Challenge Detail Component -->
        <ChallengeDetail
          :selectedChallenge="selectedChallengeData"
        />

        <!-- Right Panel - Challenge Tools Component -->
        <ChallengeTools />

      </div>
    </div>
  </div>
</template>

<script setup>
// 手動導入組件
import ChallengeList from '~/components/MO/ChallengeList.vue'
import ChallengeDetail from '~/components/MO/ChallengeDetail.vue'
import ChallengeTools from '~/components/MO/ChallengeTools.vue'

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
const itemsPerPage = 10
const selectedChallengeData = ref(null)
const isLoading = ref(true)
const loadError = ref(null)

// 計算屬性
const filteredChallenges = computed(() => {
  if (isLoading.value || challenges.value.length === 0) return []
  
  let filtered = [...challenges.value]

  if (searchQuery.value?.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(challenge => 
      challenge.name?.toLowerCase().includes(query) ||
      challenge.name_en?.toLowerCase().includes(query)
    )
  }

  if (selectedDifficulty.value) {
    const difficulty = parseInt(selectedDifficulty.value)
    filtered = filtered.filter(challenge => 
      challenge.difficulty === difficulty || challenge.tier === difficulty
    )
  }

  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'difficulty':
        return (a.difficulty || a.tier || 0) - (b.difficulty || b.tier || 0)
      case 'name_en':
        return (a.name_en || '').localeCompare(b.name_en || '')
      case 'name_cn':
        return (a.name_cn || '').localeCompare(b.name_cn || '')
      case 'type':
        return (a.type || '').localeCompare(b.type || '')
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

// 方法
async function loadChallenges() {
  try {
    isLoading.value = true
    loadError.value = null
    const basePath = getBasePath()
    
    // 固定載入 metro.json (都市異景)
    const data = await $fetch(`${basePath}/MO/challenges/metro.json`)
    challenges.value = data.challenges || []
    
    // Reset selections when loading
    selectedChallengeData.value = null
    currentPage.value = 1
  } catch (error) {
    console.error('載入挑戰資料失敗:', error)
    loadError.value = error.message
    challenges.value = []
  } finally {
    isLoading.value = false
  }
}

function selectChallenge(challenge) {
  selectedChallengeData.value = challenge
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
  background-color: #06b6d4 !important;
  color: white !important;
}

/* 響應式調整 */
@media (max-width: 1280px) {
  .grid-cols-3 {
    grid-template-columns: 1fr 2fr 1fr;
  }
  
  .h-\[calc\(100vh-140px\)\] {
    height: calc(100vh - 160px);
  }
}

@media (max-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
  
  .col-span-1:nth-child(3) {
    grid-column: span 2;
  }
  
  .h-\[calc\(100vh-140px\)\] {
    height: calc(100vh - 180px);
  }
}

@media (max-width: 768px) {
  .grid-cols-3 {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .col-span-1 {
    grid-column: span 1;
  }
  
  .h-\[calc\(100vh-140px\)\] {
    height: calc(50vh);
  }
  
  .grid > div {
    min-height: 40vh;
    max-height: 60vh;
  }
}

@media (max-width: 480px) {
  .h-\[calc\(100vh-140px\)\] {
    height: calc(45vh);
  }
  
  .grid > div {
    min-height: 35vh;
    max-height: 50vh;
  }
}
</style>
