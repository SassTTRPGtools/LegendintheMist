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
      </div>    </div>
    
    <!-- Main Content -->
    <div class="px-4 py-6 max-w-md mx-auto">
      <!-- Theme System Selector -->
      <div class="bg-black/60 rounded-xl shadow-2xl border border-cyan-500/30 p-4 mb-6">
        <label class="block text-sm font-medium text-cyan-300 mb-3 flex items-center">
          <Icon name="lucide:circuit-board" class="w-4 h-4 mr-2" />
          選擇主題系統
        </label>
        <div class="relative">          <button 
            @click="showThemeDropdown = !showThemeDropdown"
            class="w-full p-3 border border-cyan-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-gray-800/80 text-left flex items-center justify-between text-cyan-100 hover:bg-gray-700/80 transition-all"
          >
            <span class="flex items-center">
              <Icon 
                v-if="selectedSystem === 'noise'" 
                name="lucide:zap" class="w-5 h-5 mr-2 text-cyan-400"
              />
              <Icon 
                v-if="selectedSystem === 'self'" 
                name="lucide:user" class="w-5 h-5 mr-2 text-purple-400"
              />
              <Icon 
                v-if="selectedSystem === 'mythos'" 
                name="lucide:eye" class="w-5 h-5 mr-2 text-orange-400"
              />
              {{ getSystemDisplayName(selectedSystem) || '請選擇主題系統' }}
            </span>
            <Icon name="lucide:chevron-down" class="w-4 h-4 text-cyan-400" />
          </button>
          
          <div 
            v-if="showThemeDropdown" 
            class="absolute z-10 w-full mt-1 bg-black/95 backdrop-blur-sm border border-cyan-500/50 rounded-lg shadow-2xl"
          >
            <button
              @click="selectSystem('')"
              class="w-full p-3 text-left hover:bg-gray-800/80 first:rounded-t-lg text-cyan-200"
            >
              請選擇主題系統
            </button>            
            
            <button
              v-if="systemData.self"
              @click="selectSystem('self')"
              class="w-full p-3 text-left hover:bg-gray-800/80 flex items-center text-cyan-200"
            >
              <Icon name="lucide:user" class="w-5 h-5 mr-2 text-purple-400" />
              自我主題（身份）
            </button>            

            <button
              @click="selectSystem('noise')"
              class="w-full p-3 text-left hover:bg-gray-800/80 flex items-center text-cyan-200"
            >
              <Icon name="lucide:zap" class="w-5 h-5 mr-2 text-cyan-400" />
              喧囂主題（科技）
            </button>

            <button
              v-if="systemData.mythos"
              @click="selectSystem('mythos')"
              class="w-full p-3 text-left hover:bg-gray-800/80 flex items-center last:rounded-b-lg text-cyan-200"
            >
              <Icon name="lucide:eye" class="w-5 h-5 mr-2 text-orange-400" />
              神話主題（超自然）
            </button>
          </div>
        </div>
      </div>      <!-- Theme Type Selector -->
      <div v-if="selectedSystem && availableThemes.length > 0" class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 p-4 mb-6">
        <label class="block text-sm font-medium text-cyan-300 mb-3 flex items-center">
          <Icon name="lucide:microchip" class="w-4 h-4 mr-2" />
          選擇主題類型 ({{ availableThemes.length }} 個可用)
        </label>        <select 
          v-model="selectedTheme" 
          @change="onThemeChange"
          class="w-full p-3 border border-cyan-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-gray-800/80 text-cyan-100"
        >
          <option value="">請選擇主題類型</option>
          <option v-for="theme in availableThemes" :key="theme.key" :value="theme.key">
            {{ theme.theme }} - {{ theme.title }}
          </option>
        </select>
      </div>      <!-- Debug Info -->
      <div v-if="selectedSystem && availableThemes.length === 0" class="bg-yellow-900/20 rounded-xl border border-yellow-500/30 p-4 mb-6">
        <p class="text-yellow-300 text-sm">
          調試資訊：已選擇系統 "{{ selectedSystem }}"，但沒有找到可用的主題。
        </p>
        <p class="text-yellow-400 text-xs mt-2">
          系統資料: {{ systemData[selectedSystem] ? '已載入' : '未載入' }}
        </p>
      </div>      <!-- Concept Explanation -->
      <div v-if="selectedTheme" class="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 p-4 mb-6">
        <h3 class="font-semibold text-cyan-100 mb-3 flex items-center">
          <Icon name="lucide:info" class="w-5 h-5 mr-2 text-cyan-400" />
          主題核心
        </h3>
        <div class="space-y-3 text-sm">
          <!-- 身份信念 - 適用於自我主題 -->
          <div v-if="selectedSystem === 'self' || (selectedThemeData && (selectedThemeData.identity_concept || selectedThemeData.primary_goal))" class="flex items-start space-x-3">
            <Icon name="lucide:user-check" class="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
            <div>
              <span class="font-medium text-blue-400">身份</span>
              <span class="ml-2 text-xs bg-blue-500/20 px-2 py-1 rounded-full text-blue-300">自我信念</span>
              <p class="text-gray-300 mt-1">定義角色核心價值觀與行為準則的信念句，違背將導致角色身份動搖。</p>
            </div>
          </div>
          
          <!-- 儀式誡律 - 適用於神話主題 -->
          <div v-if="selectedSystem === 'mythos' || (selectedThemeData && selectedThemeData.ritual_concept)" class="flex items-start space-x-3">
            <Icon name="lucide:calendar-check" class="w-4 h-4 mt-0.5 text-indigo-400 flex-shrink-0" />
            <div>
              <span class="font-medium text-indigo-400">儀式</span>
              <span class="ml-2 text-xs bg-indigo-500/20 px-2 py-1 rounded-full text-indigo-300">祕源誡律</span>
              <p class="text-gray-300 mt-1">維持力量或能力所必須執行的行動、習慣或條件，忽視將失去相關能力。</p>
            </div>
          </div>
          
          <!-- 科技心魔 - 適用於喧囂主題 -->
          <div v-if="selectedSystem === 'noise' || (selectedThemeData && selectedThemeData.itch_concept)" class="flex items-start space-x-3">
            <Icon name="lucide:zap" class="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
            <div>
              <span class="font-medium text-cyan-400">癢處</span>
              <span class="ml-2 text-xs bg-cyan-500/20 px-2 py-1 rounded-full text-cyan-300">科技心魔</span>
              <p class="text-gray-300 mt-1">只有透過特定科技或行為才能滿足的強烈慾望，是推動角色不斷使用相關能力的內在驅動力。</p>
            </div>
          </div>
        </div>
        
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
        </div>        
        
        <!-- Concept Options -->
        <div v-if="selectedThemeData.questions.concept_options" class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
            <h3 class="font-semibold text-cyan-100 flex items-center">
              <Icon name="lucide:lightbulb" class="w-5 h-5 mr-2 text-yellow-400" />
              概念問題
            </h3>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="(option, index) in selectedThemeData.questions.concept_options" :key="index" 
                 class="p-3 bg-yellow-900/30 rounded-lg border-l-4 border-yellow-400">
              <p class="text-yellow-100">{{ option }}</p>
            </div>
          </div>
        </div>        

        <!-- Background Questions -->
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
        </div>

        <!-- Crew Relationships -->
        <div v-if="selectedThemeData.crew_relationships" class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
            <h3 class="font-semibold text-cyan-100 flex items-center">
              <Icon name="lucide:users-2" class="w-5 h-5 mr-2 text-pink-400" />
              小隊關係建議
            </h3>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="(relationship, index) in selectedThemeData.crew_relationships" :key="index" 
                 class="p-3 bg-pink-900/30 rounded-lg border-l-4 border-pink-400">
              <p class="text-pink-100">{{ relationship }}</p>
            </div>
          </div>
        </div>        
        <!-- Identity Concept (自我信念 = 身份) -->
        <div v-if="selectedThemeData.identity_concept || selectedThemeData.primary_goal" class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
            <h3 class="font-semibold text-cyan-100 flex items-center">
              <Icon name="lucide:user-check" class="w-5 h-5 mr-2 text-blue-400" />
              身份
              <span class="ml-2 text-xs bg-blue-500/20 px-2 py-1 rounded-full text-blue-300">自我信念</span>
            </h3>
          </div>
          <div class="p-4">
            <div class="p-4 bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
              <p class="text-blue-100 leading-relaxed">{{ selectedThemeData.identity_concept || selectedThemeData.primary_goal }}</p>
            </div>
          </div>
        </div>        <!-- Itch Concept (科技心魔 = 癢處) -->
        <div v-if="selectedThemeData.itch_concept" class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
            <h3 class="font-semibold text-cyan-100 flex items-center">
              <Icon name="lucide:zap" class="w-5 h-5 mr-2 text-cyan-400" />
              癢處
              <span class="ml-2 text-xs bg-cyan-500/20 px-2 py-1 rounded-full text-cyan-300">科技心魔</span>
            </h3>
          </div>
          <div class="p-4">
            <div class="p-4 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 rounded-lg border-l-4 border-cyan-400 relative overflow-hidden">
              <!-- 背景效果 -->
              <div class="relative z-10">
                <p class="text-cyan-100 leading-relaxed font-medium">{{ selectedThemeData.itch_concept }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Ritual Concept (祕源誡律 = 儀式) -->
        <div v-if="selectedThemeData.ritual_concept" class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
            <h3 class="font-semibold text-cyan-100 flex items-center">
              <Icon name="lucide:calendar-check" class="w-5 h-5 mr-2 text-indigo-400" />
              儀式
              <span class="ml-2 text-xs bg-indigo-500/20 px-2 py-1 rounded-full text-indigo-300">祕源誡律</span>
            </h3>
          </div>
          <div class="p-4">
            <div class="p-4 bg-indigo-900/30 rounded-lg border-l-4 border-indigo-400">
              <p class="text-indigo-100 leading-relaxed">{{ selectedThemeData.ritual_concept }}</p>
            </div>
          </div>
        </div>

        <!-- Theme Specials -->
        <div v-if="selectedThemeData.theme_specials" class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
            <h3 class="font-semibold text-cyan-100 flex items-center">
              <Icon name="lucide:star" class="w-5 h-5 mr-2 text-yellow-400" />
              主題專長
            </h3>
          </div>
          <div class="p-4 space-y-4">
            <div v-for="(special, index) in selectedThemeData.theme_specials" :key="index" 
                 class="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
              <div class="mb-2">
                <h4 class="font-bold text-yellow-200 flex items-center">
                  <Icon name="lucide:sparkles" class="w-4 h-4 mr-2 text-yellow-400" />
                  {{ special.name }}
                </h4>
              </div>
              <p class="text-yellow-100 leading-relaxed">{{ special.description }}</p>
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
              </div>              <div class="grid grid-cols-1 gap-3">
                <div>
                  <p class="text-xs font-medium text-green-400 mb-2">能力標籤</p>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="ability in character.ability_tags" :key="ability" 
                          class="px-2 py-1 bg-green-900/40 text-green-300 text-xs rounded-full border border-green-500/30">
                      {{ ability }}
                    </span>
                  </div>
                </div>
                <div>
                  <p class="text-xs font-medium text-red-400 mb-2">弱點標籤</p>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="weakness in character.weakness_tags" :key="weakness" 
                          class="px-2 py-1 bg-red-900/40 text-red-300 text-xs rounded-full border border-red-500/30">
                      {{ weakness }}
                    </span>
                  </div>
                </div>                <div v-if="character.itch" class="mb-3">
                  <p class="text-xs font-medium text-cyan-400 mb-2 flex items-center">
                    <Icon name="lucide:zap" class="w-3 h-3 mr-1" />
                    癢處
                    <span class="ml-2 text-xs bg-cyan-500/20 px-2 py-1 rounded-full text-cyan-300">科技心魔</span>
                  </p>
                  <div class="p-3 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-400">
                    <p class="text-sm text-cyan-200 italic mb-2">
                      "{{ character.itch }}"
                    </p>
                    <p class="text-xs text-cyan-300/70">
                      這是角色對科技的內在驅動力與偏執，長期壓抑將遠離科技。
                    </p>
                  </div>
                </div><!-- Identity/Primary Goal (身份信念) -->
                <div v-if="character.identity_concept || character.primary_goal" class="mb-3">
                  <p class="text-xs font-medium text-blue-400 mb-2">
                    身份
                    <span class="ml-2 text-xs bg-blue-500/20 px-2 py-1 rounded-full text-blue-300">自我信念</span>
                  </p>
                  <p class="text-sm text-blue-200 italic mb-2">
                    "{{ character.identity_concept || character.primary_goal }}"
                  </p>
                    <p class="text-xs text-blue-200/70">
                      這是角色深信不疑的信念，長期違背將喪失自我。
                    </p>
                </div>

                <!-- Ritual (儀式誡律) -->
                <div v-if="character.ritual_concept" class="mb-3">
                  <p class="text-xs font-medium text-indigo-400 mb-2">
                    儀式
                    <span class="ml-2 text-xs bg-indigo-500/20 px-2 py-1 rounded-full text-indigo-300">祕源誡律</span>
                  </p>
                  <p class="text-sm text-indigo-200 italic mb-2">
                    "{{ character.ritual_concept }}"
                  </p>
                  <p class="text-xs text-indigo-200/70">
                    這是必須遵守的要求，否則將與神話漸行漸遠。
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
  noise: null,
  self: null,
  mythos: null
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
    const response = await $fetch(`/data/MO/${filename}`)
    
    console.log(`成功載入 ${filename}:`, response)
    return response
  } catch (error) {
    console.error(`載入 ${filename} 失敗:`, error)
    throw new Error(`無法載入 ${filename}: ${error.message}`)
  }
}

// 載入所有系統數據
onMounted(async () => {
  try {
    isLoading.value = true
    console.log('開始載入所有系統資料...')
    
    // 先載入 noise-themes.json（確保至少這個能正常工作）
    const noiseData = await loadJsonData('noise-themes.json')
    
    // 嘗試載入其他檔案，但如果失敗不影響主要功能
    let selfData = null
    let mythosData = null
    
    try {
      selfData = await loadJsonData('self-themes.json')
    } catch (error) {
      console.warn('self-themes.json 載入失敗:', error)
    }
    
    try {
      mythosData = await loadJsonData('mythos-themes.json')
    } catch (error) {
      console.warn('mythos-themes.json 載入失敗:', error)
    }
    
    systemData.value = {
      noise: noiseData,
      self: selfData,
      mythos: mythosData
    }
    
    console.log('系統資料載入完成:', systemData.value)
    
    // 如果已經有選擇的系統，重新觸發系統變更
    if (selectedSystem.value) {
      onSystemChange()
    }
  } catch (error) {
    console.error('載入主要系統資料失敗:', error)
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

// 點擊外部關閉下拉選單
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.relative')
  if (!dropdown) {
    showThemeDropdown.value = false
  }
}

// 監聽點擊事件
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 獲取系統顯示名稱
const getSystemDisplayName = (system) => {
  switch (system) {
    case 'noise': return '喧囂主題（科技）'
    case 'self': return '自我主題（身份）'
    case 'mythos': return '神話主題（超自然）'
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
  
  console.log('檢查系統資料:', data)
  
  // 所有系統都使用 themes 屬性
  if (data && data.themes) {
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
const onThemeChange = async () => {
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
  await loadSampleCharacters()
}

// 載入範例角色
const loadSampleCharacters = async () => {
  if (!selectedSystem.value || !selectedTheme.value) {
    sampleCharacters.value = []
    return
  }
  
  try {
    // 根據系統和主題構建檔案路徑
    const systemFolder = `${selectedSystem.value}-themes`
    
    // 建立主題名稱到檔案名稱的對應
    const themeToFileMap = {
      // Mythos themes
      'Artifact': 'artifact-examples.json',
      'Companion': 'companion-examples.json',
      'Esoterica': 'esoterica-examples.json',
      'Exposure': 'exposure-examples.json',
      // Self themes  
      'Affiliation': 'affiliation-examples.json',
      'Assets': 'assets-examples.json',
      'Expertise': 'expertises-examples.json',
      'Horizon': 'horizon-examples.json',
      'Personality': 'personality-examples.json',
      'TroubledPast': 'troubledpast-examples.json',
      // Noise themes
      'Augmentation': 'augmentation-examples.json',
      'CuttingEdge': 'cuttingedge-examples.json',
      'Cyberspace': 'cyberspace-examples.json',
      'Drones': 'drones-examples.json'
    }
    
    const themeFile = themeToFileMap[selectedTheme.value]
    
    if (!themeFile) {
      console.warn(`未找到主題 ${selectedTheme.value} 對應的範例檔案`)
      sampleCharacters.value = []
      return
    }
    
    const filePath = `sample_characters/${systemFolder}/${themeFile}`
    
    console.log(`嘗試載入範例角色: /data/MO/${filePath}`)
    
    // 載入對應的範例檔案
    const sampleData = await $fetch(`/data/MO/${filePath}`)
    
    console.log('載入的原始資料:', sampleData)
    
    // 處理不同的檔案格式
    let characters = []
    
    if (sampleData && sampleData.sample_characters) {
      // 標準格式：有 sample_characters 屬性
      characters = sampleData.sample_characters
    } else if (Array.isArray(sampleData)) {
      // 陣列格式：直接是角色陣列
      characters = sampleData
    } else {
      console.warn('未識別的檔案格式:', sampleData)
      characters = []
    }
    
    sampleCharacters.value = characters
    console.log('成功載入範例角色:', characters)
    
  } catch (error) {
    console.error('載入範例角色失敗:', error)
    sampleCharacters.value = []
  }
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
.bg-black {
  transition: all 0.2s ease-in-out;
}

.bg-black:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
