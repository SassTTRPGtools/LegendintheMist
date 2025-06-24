<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pb-8">
    <!-- Header -->
    <div class="bg-black/80 backdrop-blur-sm shadow-xl border-b border-cyan-500/30">
      <div class="px-4 py-6">
        <div class="flex items-center justify-between">
          <NuxtLink to="/MO" class="text-cyan-400 hover:text-cyan-300 transition-colors">
            <Icon name="lucide:arrow-left" class="w-6 h-6" />
          </NuxtLink>
          <h1 class="text-xl font-bold text-cyan-100 flex items-center">
            <Icon name="lucide:cpu" class="w-5 h-5 mr-2 text-cyan-400" />
            角色創建參考
          </h1>
          <div class="w-6"></div> <!-- Spacer -->
        </div>
      </div>
    </div>    <!-- Main Content -->
    <div class="px-4 py-6 max-w-md mx-auto">
      <!-- Theme System Selector -->
      <div class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 p-4 mb-6">
        <label class="block text-sm font-medium text-cyan-300 mb-3 flex items-center">
          <Icon name="lucide:circuit-board" class="w-4 h-4 mr-2" />
          選擇主題系統
        </label>
        <div class="relative">
          <button 
            @click="showThemeDropdown = !showThemeDropdown"
            class="w-full p-3 border border-cyan-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-gray-800/80 text-left flex items-center justify-between text-cyan-100 hover:bg-gray-700/80 transition-all"
          >            
            <span class="flex items-center">
              <Icon 
                v-if="selectedSystem === 'noise'" 
                name="lucide:zap" class="w-5 h-5 mr-2 text-cyan-400"
              />
              {{ getSystemDisplayName(selectedSystem) || '請選擇主題系統' }}
            </span>
            <Icon name="lucide:chevron-down" class="w-4 h-4 text-cyan-400" />
          </button>
          <div 
            v-if="showThemeDropdown" 
            class="absolute z-10 w-full mt-1 bg-black/90 backdrop-blur-sm border border-cyan-500/50 rounded-lg shadow-2xl"
          >
            <button
              @click="selectSystem('')"
              class="w-full p-3 text-left hover:bg-gray-800/80 first:rounded-t-lg text-cyan-200"
            >
              請選擇主題系統
            </button>            
            <button
              @click="selectSystem('noise')"
              class="w-full p-3 text-left hover:bg-gray-800/80 flex items-center last:rounded-b-lg text-cyan-200"
            >
              <Icon name="lucide:zap" class="w-5 h-5 mr-2 text-cyan-400" />
              賽博龐克主題
            </button>
          </div>
        </div>
      </div>      <!-- Theme Type Selector -->
      <div v-if="selectedSystem && availableThemes.length > 0" class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 p-4 mb-6">
        <label class="block text-sm font-medium text-cyan-300 mb-3 flex items-center">
          <Icon name="lucide:microchip" class="w-4 h-4 mr-2" />
          選擇主題類型
        </label>
        <select 
          v-model="selectedTheme" 
          @change="onThemeChange"
          class="w-full p-3 border border-cyan-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-gray-800/80 text-cyan-100"
        >
          <option value="">請選擇主題類型</option>
          <option v-for="theme in availableThemes" :key="theme.key" :value="theme.key">
            {{ theme.theme }} - {{ theme.title }}
          </option>
        </select>
      </div>

      <!-- Theme Details -->
      <div v-if="selectedThemeData" class="space-y-6">        <!-- Theme Overview -->
        <div class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">          
          <div class="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon name="lucide:cpu" class="w-5 h-5 mr-2 text-white" />
              {{ selectedThemeData.theme }}
            </h2>
            <p class="text-cyan-100 text-sm mt-1">{{ selectedThemeData.title }}</p>
          </div>          
          <div class="p-4">
            <div class="text-cyan-100 leading-relaxed">
              <p>{{ selectedThemeData.concept }}</p>
            </div>
          </div>
        </div>        <!-- Background Questions -->
        <div class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
            <h3 class="font-semibold text-cyan-100 flex items-center">
              <Icon name="lucide:help-circle" class="w-5 h-5 mr-2 text-cyan-400" />
              背景問題
            </h3>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="(question, index) in selectedThemeData.questions.background" :key="index" 
                 class="p-3 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-400">
              <p class="text-cyan-100">{{ question }}</p>
            </div>
          </div>
        </div>        

        <!-- Ability Tags -->
        <div class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
            <h3 class="font-semibold text-cyan-100 flex items-center">
              <Icon name="lucide:zap" class="w-5 h-5 mr-2 text-green-400" />
              能力標籤
            </h3>
          </div>
          <div class="p-4 space-y-3">            
            <div v-for="tag in selectedThemeData.questions.ability_tags" :key="tag.id" 
                 class="p-3 bg-green-900/30 rounded-lg border-l-4 border-green-400">              
                 <div class="flex items-center">
                <span class="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full mr-3 flex-shrink-0">
                  {{ tag.id }}
                </span>
                <p class="text-green-100">
                  <span v-if="tag.id === 'A'" class="font-bold">{{ tag.question }}</span>
                  <span v-else>{{ tag.question }}</span>
                  <span v-if="tag.id === 'A'" class="text-red-400 text-sm ml-2">（必答）</span>
                </p>
              </div>
            </div>
          </div>
        </div>        

        <!-- Weakness Tags -->
        <div class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
            <h3 class="font-semibold text-cyan-100 flex items-center">
              <Icon name="lucide:alert-triangle" class="w-5 h-5 mr-2 text-red-400" />
              弱點標籤
            </h3>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="tag in selectedThemeData.questions.weakness_tags" :key="tag.id" 
                 class="p-3 bg-red-900/30 rounded-lg border-l-4 border-red-400">              
              <div class="flex items-center">
                <span class="inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full mr-3 flex-shrink-0">
                  {{ tag.id }}
                </span>
                <p class="text-red-100">{{ tag.question }}</p>
              </div>
            </div>
          </div>
        </div>        <!-- Mission Concepts -->
        <div class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
            <h3 class="font-semibold text-cyan-100 flex items-center">
              <Icon name="lucide:target" class="w-5 h-5 mr-2 text-purple-400" />
              使命構想
            </h3>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="(mission, index) in selectedThemeData.mission_concepts" :key="index" 
                 class="p-3 bg-purple-900/30 rounded-lg border-l-4 border-purple-400">
              <p class="text-purple-100">{{ mission }}</p>
            </div>
          </div>
        </div>        

        <!-- Sample Characters/Heroes -->
        <div v-if="sampleCharacters.length > 0" class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
            <h3 class="font-semibold text-cyan-100 flex items-center">
              <Icon name="lucide:users" class="w-5 h-5 mr-2 text-amber-400" />
              範例角色
            </h3>
          </div>
          <div class="p-4 space-y-4">            
            <div v-for="character in sampleCharacters" :key="character.name" 
                 class="p-4 bg-amber-900/20 rounded-lg border border-amber-500/30">
              <div class="mb-3">
                <h4 class="font-bold text-amber-100 mb-1">{{ character.name }}</h4>
              </div>            

              
              <div class="grid grid-cols-1 gap-3">
                <div>
                  <p class="text-xs font-medium text-green-400 mb-2">能力標籤</p>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="ability in (character.ability_tags || character.key_abilities)" :key="ability" 
                          class="px-2 py-1 bg-green-900/40 text-green-300 text-xs rounded-full border border-green-500/30">
                      {{ ability }}
                    </span>
                  </div>
                </div>
                <div>
                  <p class="text-xs font-medium text-red-400 mb-2">弱點標籤</p>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="weakness in (character.weakness_tags || character.key_weaknesses)" :key="weakness" 
                          class="px-2 py-1 bg-red-900/40 text-red-300 text-xs rounded-full border border-red-500/30">
                      {{ weakness }}
                    </span>
                  </div>
                </div>

                <div v-if="character.itch" class="mb-3">
                  <p class="text-xs font-medium text-cyan-400 mb-2">癢處</p>
                  <p class="text-sm text-cyan-200 italic">
                    "{{ character.itch }}"
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
      </div>      <!-- Empty State -->
      <div v-if="!selectedSystem" class="text-center py-12">
        <Icon name="lucide:cpu" class="w-16 h-16 text-cyan-500/50 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-cyan-100 mb-2">選擇主題系統</h3>
        <p class="text-cyan-300/70">請先選擇一個主題系統來查看角色創建參考資料</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 響應式數據
const selectedSystem = ref('')
const selectedTheme = ref('')
const selectedThemeData = ref(null)
const availableThemes = ref([])
const sampleCharacters = ref([])
const isLoading = ref(false)
const showThemeDropdown = ref(false)

// 系統數據
const systemData = ref({
  noise: null
})

// 頁面標題
useHead({
  title: '角色創建參考 - 都市異景'
})

// 載入 JSON 資料的方法
const loadJsonData = async (filename) => {
  try {
    console.log(`正在載入: /data/MO/${filename}`)
    
    // 使用 $fetch 從 public 目錄載入 JSON
    const response = await $fetch(`/data/MO/${filename}`, {
      parseResponse: JSON.parse
    })
    
    console.log(`成功載入 ${filename}:`, response)
    return response
  } catch (error) {
    console.error(`載入 ${filename} 失敗:`, error)
    
    // 嘗試備用路徑
    try {
      console.log(`嘗試備用路徑: /LegendintheMist/data/MO/${filename}`)
      const backupResponse = await $fetch(`/LegendintheMist/data/MO/${filename}`, {
        parseResponse: JSON.parse
      })
      console.log(`備用路徑成功載入 ${filename}:`, backupResponse)
      return backupResponse
    } catch (backupError) {
      console.error(`備用路徑也載入失敗:`, backupError)
      throw new Error(`無法載入 ${filename}: ${error.message}`)
    }
  }
}

// 載入所有系統數據
onMounted(async () => {
  try {
    isLoading.value = true
    console.log('開始載入所有系統資料...')
    
    // 只載入 noise-themes.json
    const noiseData = await loadJsonData('noise-themes.json')
    
    systemData.value = {
      noise: noiseData
    }
    
    console.log('所有系統資料載入完成:', systemData.value)
  } catch (error) {
    console.error('載入系統資料失敗:', error)
    // 顯示更友善的錯誤訊息
    alert('無法載入主題資料，請檢查網路連線或重新整理頁面')
  } finally {
    isLoading.value = false
  }
})

// 選擇系統的方法
const selectSystem = (system) => {
  selectedSystem.value = system
  showThemeDropdown.value = false
  onSystemChange()
}

// 獲取系統顯示名稱
const getSystemDisplayName = (system) => {
  switch (system) {
    case 'noise': return '賽博龐克主題'
    default: return ''
  }
}

// 點擊外部關閉下拉選單
const closeDropdown = (event) => {
  const target = event.target
  if (!target.closest('.relative')) {
    showThemeDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
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
  
  // 所有系統都使用 themes 屬性
  if (data.themes) {
    themes = Object.entries(data.themes).map(([key, value]) => ({
      key,
      theme: value.theme || key,
      title: value.title || '',
      ...value
    }))
  }
  
  console.log(`載入 ${selectedSystem.value} 主題:`, themes)
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
  
  // 所有系統都使用 themes 屬性
  if (data.themes && data.themes[selectedTheme.value]) {
    themeData = data.themes[selectedTheme.value]
  }
  
  console.log('選擇的主題資料:', themeData)
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
  
  // 從 examples.sample_characters 中尋找對應的角色
  if (data.examples && data.examples.sample_characters) {
    samples = data.examples.sample_characters.filter(char => {
      // 檢查角色的 type 是否符合選擇的主題
      return char.type === selectedTheme.value || 
             char.type === selectedTheme.value.toLowerCase() ||
             char.theme === selectedTheme.value ||
             char.theme === selectedTheme.value.toLowerCase()
    })
  }
  
  console.log('找到範例角色:', samples)
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
