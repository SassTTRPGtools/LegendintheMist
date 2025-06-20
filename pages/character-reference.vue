<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 pb-8">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="px-4 py-6">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-gray-600 hover:text-gray-800 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </NuxtLink>
          <h1 class="text-xl font-bold text-gray-900">角色創建參考</h1>
          <div class="w-6"></div> <!-- Spacer -->
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 py-6 max-w-md mx-auto">
      <!-- Theme System Selector -->
      <div class="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-3">選擇主題</label>
        <select 
          v-model="selectedSystem" 
          @change="onSystemChange"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          <option value="">請選擇主題</option>
          <option value="origin">起源主題</option>
          <option value="adventure">冒險主題</option>
          <option value="greatness">偉業主題</option>
        </select>
      </div>

      <!-- Theme Type Selector -->
      <div v-if="selectedSystem && availableThemes.length > 0" class="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-3">選擇主題類型</label>
        <select 
          v-model="selectedTheme" 
          @change="onThemeChange"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          <option value="">請選擇主題類型</option>
          <option v-for="theme in availableThemes" :key="theme.key" :value="theme.key">
            {{ theme.theme }} - {{ theme.title }}
          </option>
        </select>
      </div>

      <!-- Theme Details -->
      <div v-if="selectedThemeData" class="space-y-6">
        <!-- Theme Overview -->
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <h2 class="text-xl font-bold text-white">{{ selectedThemeData.theme }}</h2>
            <p class="text-blue-100 text-sm mt-1">{{ selectedThemeData.title }}</p>
          </div>
          <div class="p-4">
            <p class="text-gray-700 leading-relaxed">{{ selectedThemeData.concept }}</p>
          </div>
        </div>

        <!-- Background Questions -->
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="bg-gray-50 px-4 py-3 border-b">
            <h3 class="font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              背景問題
            </h3>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="(question, index) in selectedThemeData.questions.background" :key="index" 
                 class="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p class="text-gray-800">{{ question }}</p>
            </div>
          </div>
        </div>

        <!-- Ability Tags -->
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="bg-gray-50 px-4 py-3 border-b">
            <h3 class="font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              能力標籤
            </h3>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="tag in selectedThemeData.questions.ability_tags" :key="tag.id" 
                 class="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full mr-3 mt-0.5 flex-shrink-0">
                  {{ tag.id }}
                </span>
                <p class="text-gray-800">{{ tag.question }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Weakness Tags -->
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="bg-gray-50 px-4 py-3 border-b">
            <h3 class="font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              弱點標籤
            </h3>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="tag in selectedThemeData.questions.weakness_tags" :key="tag.id" 
                 class="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full mr-3 mt-0.5 flex-shrink-0">
                  {{ tag.id }}
                </span>
                <p class="text-gray-800">{{ tag.question }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Mission Concepts -->
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="bg-gray-50 px-4 py-3 border-b">
            <h3 class="font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              使命構想
            </h3>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="(mission, index) in selectedThemeData.mission_concepts" :key="index" 
                 class="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <p class="text-gray-800">{{ mission }}</p>
            </div>
          </div>
        </div>

        <!-- Sample Characters/Heroes -->
        <div v-if="sampleCharacters.length > 0" class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="bg-gray-50 px-4 py-3 border-b">
            <h3 class="font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              範例角色
            </h3>
          </div>          
          <div class="p-4 space-y-4">            
            <div v-for="character in sampleCharacters" :key="character.name" 
                 class="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div class="mb-3">
                <h4 class="font-bold text-gray-900 mb-1">{{ character.name }}</h4>
              </div>            

              
              <div class="grid grid-cols-1 gap-3">
                <div>
                  <p class="text-xs font-medium text-green-600 mb-2">能力標籤</p>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="ability in (character.ability_tags || character.key_abilities)" :key="ability" 
                          class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {{ ability }}
                    </span>
                  </div>
                </div>
                <div>
                  <p class="text-xs font-medium text-red-600 mb-2">弱點標籤</p>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="weakness in (character.weakness_tags || character.key_weaknesses)" :key="weakness" 
                          class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      {{ weakness }}
                    </span>
                  </div>
                </div>

              <div class="mb-3">
                <p class="text-sm text-gray-800 italic">
                  "{{ character.origin_story || character.adventure_story || character.hero_story || character.primary_goal }}"
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>

      <!-- Empty State -->
      <div v-if="!selectedSystem" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">選擇主題系統</h3>
        <p class="text-gray-500">請先選擇一個主題系統來查看角色創建參考資料</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { 
  SystemData, 
  SystemType, 
  AvailableTheme, 
  SelectedThemeData, 
  SampleCharacter,
  OriginThemeData,
  AdventureThemeData,
  GreatnessThemeData
} from '~/types/theme-systems'

// 響應式數據
const selectedSystem = ref<SystemType | ''>('')
const selectedTheme = ref<string>('')
const selectedThemeData = ref<SelectedThemeData | null>(null)
const availableThemes = ref<AvailableTheme[]>([])
const sampleCharacters = ref<SampleCharacter[]>([])
const isLoading = ref<boolean>(false)

// 系統數據
const systemData = ref<SystemData>({
  origin: null,
  adventure: null,
  greatness: null
})

// 頁面標題
useHead({
  title: '角色創建參考 - Legend in the Mist'
})

// 載入所有系統數據
onMounted(async () => {
  try {
    isLoading.value = true
    
    // 並行載入三個 JSON 文件
    const [originData, adventureData, greatnessData] = await Promise.all([
      $fetch('/data/origin-themes.json'),
      $fetch('/data/adventure-themes.json'),
      $fetch('/data/greatness-themes.json')
    ])
    
    systemData.value = {
      origin: originData,
      adventure: adventureData,
      greatness: greatnessData
    }
  } catch (error) {
    console.error('Failed to load system data:', error)
  } finally {
    isLoading.value = false
  }
})

// 當系統選擇改變時
const onSystemChange = () => {
  selectedTheme.value = ''
  selectedThemeData.value = null
  sampleCharacters.value = []
  
  if (!selectedSystem.value || !systemData.value[selectedSystem.value]) {
    availableThemes.value = []
    return
  }
  
  const data = systemData.value[selectedSystem.value]
  let themes = []
  
  if (selectedSystem.value === 'origin') {
    themes = Object.entries(data.origins).map(([key, value]) => ({
      key,
      ...value
    }))
  } else if (selectedSystem.value === 'adventure') {
    themes = Object.entries(data.adventure_origins).map(([key, value]) => ({
      key,
      ...value
    }))
  } else if (selectedSystem.value === 'greatness') {
    themes = Object.entries(data.greatness_themes).map(([key, value]) => ({
      key,
      ...value
    }))
  }
  
  availableThemes.value = themes
}

// 當主題選擇改變時
const onThemeChange = () => {
  if (!selectedTheme.value || !systemData.value[selectedSystem.value]) {
    selectedThemeData.value = null
    sampleCharacters.value = []
    return
  }
  
  const data = systemData.value[selectedSystem.value]
  let themeData = null
  
  if (selectedSystem.value === 'origin') {
    themeData = data.origins[selectedTheme.value]
  } else if (selectedSystem.value === 'adventure') {
    themeData = data.adventure_origins[selectedTheme.value]
  } else if (selectedSystem.value === 'greatness') {
    themeData = data.greatness_themes[selectedTheme.value]
  }
  
  selectedThemeData.value = themeData
  
  // 載入範例角色
  loadSampleCharacters()
}

// 載入範例角色
const loadSampleCharacters = () => {
  if (!systemData.value[selectedSystem.value]) {
    sampleCharacters.value = []
    return
  }
  
  const data = systemData.value[selectedSystem.value]
  let samples = []
  
  if (selectedSystem.value === 'origin') {
    // Origin 主題：根據 type 欄位過濾（目前都是 circumstance）
    samples = data.examples?.sample_characters?.filter(char => 
      char.type === selectedTheme.value.toLowerCase()
    ) || []
  } else if (selectedSystem.value === 'adventure') {
    // Adventure 主題：根據 adventure_type 欄位過濾
    samples = data.examples?.sample_adventurers?.filter(char => 
      char.adventure_type === selectedTheme.value.toLowerCase()
    ) || []
  } else if (selectedSystem.value === 'greatness') {
    // Greatness 主題：根據 greatness_type 欄位過濾
    samples = data.examples?.sample_heroes?.filter(char => 
      char.greatness_type === selectedTheme.value.toLowerCase()
    ) || []
  }
  
  sampleCharacters.value = samples
}
</script>

<style scoped>
/* 自定義滾動條 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* 選擇框動畫 */
select {
  transition: all 0.2s ease-in-out;
}

select:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* 卡片懸停效果 */
.bg-white {
  transition: all 0.2s ease-in-out;
}

.bg-white:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
