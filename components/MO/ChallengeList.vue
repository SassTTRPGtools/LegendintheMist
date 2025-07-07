<template>
  <div class="bg-gray-800 rounded-xl shadow-lg border border-cyan-500/30 flex flex-col h-full max-h-full overflow-hidden">
    <!-- Header and Controls -->
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
            :value="searchQuery"
            @input="$emit('update:searchQuery', $event.target.value)"
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
              :value="selectedDifficulty"
              @change="$emit('update:selectedDifficulty', $event.target.value)"
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
              :value="sortBy"
              @change="$emit('update:sortBy', $event.target.value)"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-2 py-2 text-cyan-100 focus:border-cyan-400 focus:outline-none text-sm appearance-none cursor-pointer relative z-30"
            >
              <option value="name">名稱</option>
              <option value="difficulty">難度</option>
              <option value="name_en">英文名稱</option>
              <option value="name_cn">中文名稱</option>
              <option value="type">類型</option>
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
    <div class="flex-1 min-h-0 overflow-hidden">
      <div class="h-full overflow-y-auto p-4 custom-scrollbar">
        <div v-if="isLoading" class="text-center py-8">
          <Icon name="lucide:loader-2" class="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-spin" />
          <p class="text-gray-400 text-sm">載入挑戰資料中...</p>
        </div>
        
        <div v-else-if="loadError" class="text-center py-8">
          <Icon name="lucide:alert-circle" class="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p class="text-red-400 text-sm">載入失敗</p>
          <p class="text-gray-500 text-xs mt-1">{{ loadError }}</p>
          <button 
            @click="$emit('reload')"
            class="mt-3 px-3 py-1 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-700 transition-colors"
          >
            重新載入
          </button>
        </div>
        
        <div v-else-if="paginatedChallenges.length > 0" class="space-y-2">
          <div 
            v-for="(challenge, index) in paginatedChallenges" 
            :key="index"
            @click="$emit('selectChallenge', challenge)"
            :class="[
              'p-3 rounded-lg border cursor-pointer transition-all hover:scale-105',
              selectedChallenge?.name === challenge.name 
                ? 'bg-cyan-600 border-cyan-400 text-white' 
                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-cyan-500'
            ]"
          >
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-semibold text-sm">{{ challenge.name }}</h3>
                <p class="text-xs opacity-75">{{ challenge.name_cn || challenge.name_en || challenge.name }}</p>
              </div>
              <div class="flex flex-col items-end">
                <span :class="[
                  'px-2 py-1 rounded text-xs font-bold',
                  selectedChallenge?.name === challenge.name 
                    ? 'bg-cyan-800 text-cyan-100' 
                    : 'bg-cyan-900/50 text-cyan-200'
                ]">
                  等級 {{ challenge.difficulty || challenge.tier }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
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
          @click="$emit('update:currentPage', Math.max(1, currentPage - 1))"
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-gray-700 text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors text-sm"
        >
          上一頁
        </button>
        <span class="px-3 py-1 bg-cyan-600 text-white rounded text-sm">
          {{ currentPage }} / {{ totalPages }}
        </span>
        <button 
          @click="$emit('update:currentPage', Math.min(totalPages, currentPage + 1))"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-gray-700 text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors text-sm"
        >
          下一頁
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  challenges: {
    type: Array,
    default: () => []
  },
  filteredChallenges: {
    type: Array,
    default: () => []
  },
  paginatedChallenges: {
    type: Array,
    default: () => []
  },
  searchQuery: {
    type: String,
    default: ''
  },
  selectedDifficulty: {
    type: String,
    default: ''
  },
  sortBy: {
    type: String,
    default: 'name'
  },
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 1
  },
  selectedChallenge: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  loadError: {
    type: String,
    default: null
  }
})

// Emits
defineEmits([
  'update:searchQuery',
  'update:selectedDifficulty',
  'update:sortBy',
  'update:currentPage',
  'selectChallenge',
  'reload'
])
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
</style>
