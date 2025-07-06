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
            <Icon name="lucide:file-plus" class="w-5 h-5 mr-2 text-cyan-400" />
            模板創建工具 - 都市異景
          </h1>
          <div class="w-6"></div> <!-- Spacer -->
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 py-6 relative z-10 max-w-7xl mx-auto">
      <!-- Template Selector -->
      <div class="mb-6">
        <div class="bg-gray-800 rounded-xl shadow-lg border border-cyan-500/30 overflow-hidden">
          <div class="bg-gradient-to-r from-cyan-600 to-purple-600 p-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon name="lucide:layers" class="w-5 h-5 mr-2" />
              選擇角色模板類型
            </h2>
          </div>
          <div class="p-4">
            <select v-model="selectedTemplateType" @change="loadSelectedTemplate" 
                    class="w-full bg-gray-700 border border-cyan-500/30 rounded-lg px-4 py-3 text-cyan-100 focus:border-cyan-400 focus:outline-none">
              <option value="" disabled>請選擇模板類型...</option>
              <option v-for="(template, index) in templateFiles" :key="index" :value="template.file">
                {{ template.displayName }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Template Content -->
      <div v-if="selectedTemplate && templates.length > 0" class="grid lg:grid-cols-2 gap-6 min-h-[600px]">
        <!-- Left Column: Template List -->
        <div class="space-y-4 h-full">
          <div class="bg-gray-800 rounded-xl shadow-lg border border-purple-500/30 overflow-hidden h-full flex flex-col">
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
              <h3 class="text-lg font-bold text-white flex items-center">
                <Icon name="lucide:list" class="w-5 h-5 mr-2" />
                {{ selectedTemplate.displayName }}
              </h3>
            </div>
            <div class="p-4 space-y-3 flex-1 overflow-y-auto">
              <div v-for="(template, index) in templates" :key="index"
                   @click="selectTemplate(template)"
                   :class="[
                     'p-4 rounded-lg border cursor-pointer transition-all',
                     selectedTemplateIndex === index 
                       ? 'border-cyan-400 bg-cyan-900/30' 
                       : 'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700/70'
                   ]">
                <h4 class="font-semibold text-cyan-100 mb-2">{{ template.title }}</h4>
                <p class="text-gray-300 text-sm line-clamp-3">{{ template.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Template Details -->
        <div v-if="currentTemplate" class="space-y-4 h-full">
          <!-- Template Info -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-cyan-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-cyan-600 to-blue-600 p-4">
              <h3 class="text-lg font-bold text-white">{{ currentTemplate.title }}</h3>
              <span class="inline-block bg-cyan-800 text-cyan-100 px-2 py-1 rounded text-sm mt-2">
                {{ currentTemplate.type }}
              </span>
            </div>
            <div class="p-4">
              <p class="text-gray-300 text-sm leading-relaxed">{{ currentTemplate.description }}</p>
            </div>
          </div>

          <!-- Theme Tools -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-green-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
              <h4 class="text-lg font-bold text-white flex items-center">
                <Icon name="lucide:wrench" class="w-5 h-5 mr-2" />
                固定主題
              </h4>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="(tool, index) in currentTemplate.theme_tools" :key="index"
                   @click="showCharacterReference(tool, 'theme_tool')"
                   class="p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-green-400 hover:bg-gray-700/70 cursor-pointer transition-all">
                <div class="flex justify-between items-start">
                  <div>
                    <h5 class="font-semibold text-green-200">{{ getCharacterNameFromTheme(tool) }}</h5>
                    <span class="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded mt-1 inline-block">
                      {{ getThemeChineseNameFromStringSync(tool) }}
                    </span>
                  </div>
                  <Icon name="lucide:eye" class="w-4 h-4 text-gray-400 hover:text-green-400 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          <!-- Choose One -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-yellow-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-yellow-600 to-orange-600 p-4">
              <h4 class="text-lg font-bold text-white flex items-center">
                <Icon name="lucide:git-branch" class="w-5 h-5 mr-2" />
                自選一項
              </h4>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="(choice, index) in currentTemplate.choose_one" :key="index"
                   @click="showCharacterReference(choice, 'choose_one')"
                   class="p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-yellow-400 hover:bg-gray-700/70 cursor-pointer transition-all">
                <div class="flex justify-between items-start">
                  <div>
                    <h5 class="font-semibold text-yellow-200">{{ getCharacterNameFromTheme(choice) }}</h5>
                    <span class="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded mt-1 inline-block">
                      {{ getThemeChineseNameFromStringSync(choice) }}
                    </span>
                  </div>
                  <Icon name="lucide:eye" class="w-4 h-4 text-gray-400 hover:text-yellow-400 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          <!-- Starting Gear -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-blue-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
              <h4 class="text-lg font-bold text-white flex items-center">
                <Icon name="lucide:package" class="w-5 h-5 mr-2" />
                起始裝備
              </h4>
            </div>
            <div class="p-4">
              <ul class="space-y-2">
                <li v-for="(gear, index) in currentTemplate.starting_gear" :key="index"
                    class="text-blue-200 text-sm flex items-center">
                  <Icon name="lucide:dot" class="w-4 h-4 mr-2 text-blue-400" />
                  {{ gear }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Character Reference Modal -->
      <div v-if="showReferenceModal" 
           @click="closeReferenceModal"
           class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div @click.stop 
             class="bg-gray-800 rounded-xl shadow-2xl border border-cyan-500/30 max-w-4xl w-full max-h-[80vh] overflow-hidden">
          <div class="bg-gradient-to-r from-cyan-600 to-purple-600 p-4 flex justify-between items-center">
            <h3 class="text-lg font-bold text-white">{{ selectedCharacterName }}</h3>
            <button @click="closeReferenceModal" 
                    class="text-white hover:text-gray-300 transition-colors">
              <Icon name="lucide:x" class="w-6 h-6" />
            </button>
          </div>
          <div class="p-6 overflow-y-auto max-h-[60vh]">
            <div v-if="characterReference" class="space-y-4">
              <!-- 角色基本資訊 -->
              <div class="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-400">名稱：</span>
                    <span class="text-cyan-200">{{ characterReference.name || '未提供' }}</span>
                  </div>
                  <div>
                    <span class="text-gray-400">資源書：</span>
                    <span class="text-cyan-200">{{ characterReference.source || '未提供' }}</span>
                  </div>
                  <div>
                    <span class="text-gray-400">類型：</span>
                    <span class="text-cyan-200">{{ characterReference.themeChineseName || characterReference.type || '未提供' }}</span>
                  </div>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 class="text-cyan-200 font-semibold mb-3 flex items-center">
                    <Icon name="lucide:zap" class="w-4 h-4 mr-2" />
                    能力標籤
                  </h4>
                  <div class="space-y-2">
                    <span v-for="(tag, index) in characterReference.ability_tags" :key="index"
                          class="inline-block bg-green-900/30 text-green-200 px-3 py-1 rounded-full text-sm border border-green-500/30 mr-2 mb-2">
                      {{ tag }}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 class="text-red-200 font-semibold mb-3 flex items-center">
                    <Icon name="lucide:alert-triangle" class="w-4 h-4 mr-2" />
                    弱點標籤
                  </h4>
                  <div class="space-y-2">
                    <span v-for="(tag, index) in characterReference.weakness_tags" :key="index"
                          class="inline-block bg-red-900/30 text-red-200 px-3 py-1 rounded-full text-sm border border-red-500/30 mr-2 mb-2">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- 角色動機與目標 -->
              <div v-if="characterReference.primary_goal || characterReference.itch || characterReference.ritual_concept" 
                   class="mt-6 space-y-4">
                <h4 class="text-purple-200 font-semibold mb-4 flex items-center">
                  <Icon name="lucide:target" class="w-4 h-4 mr-2" />
                  角色動機與驅動力
                </h4>
                
                <!-- 癢處 (科技心魔) -->
                <div v-if="characterReference.itch" class="mb-4">
                  <p class="text-xs font-medium text-cyan-400 mb-2 flex items-center">
                    <Icon name="lucide:zap" class="w-3 h-3 mr-1" />
                    癢處
                    <span class="ml-2 text-xs bg-cyan-500/20 px-2 py-1 rounded-full text-cyan-300">科技心魔</span>
                  </p>
                  <div class="p-3 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-400">
                    <p class="text-sm text-cyan-200 italic mb-2">
                      "{{ characterReference.itch }}"
                    </p>
                    <p class="text-xs text-cyan-300/70">
                      這是角色對科技的內在驅動力與偏執，長期壓抑將遠離科技。
                    </p>
                  </div>
                </div>

                <!-- 身份信念 -->
                <div v-if="characterReference.primary_goal" class="mb-4">
                  <p class="text-xs font-medium text-blue-400 mb-2 flex items-center">
                    <Icon name="lucide:user" class="w-3 h-3 mr-1" />
                    身份
                    <span class="ml-2 text-xs bg-blue-500/20 px-2 py-1 rounded-full text-blue-300">自我信念</span>
                  </p>
                  <div class="p-3 bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                    <p class="text-sm text-blue-200 italic mb-2">
                      "{{ characterReference.primary_goal }}"
                    </p>
                    <p class="text-xs text-blue-200/70">
                      這是角色深信不疑的信念，長期違背將喪失自我。
                    </p>
                  </div>
                </div>

                <!-- 儀式誡律 -->
                <div v-if="characterReference.ritual_concept" class="mb-4">
                  <p class="text-xs font-medium text-indigo-400 mb-2 flex items-center">
                    <Icon name="lucide:scroll" class="w-3 h-3 mr-1" />
                    儀式
                    <span class="ml-2 text-xs bg-indigo-500/20 px-2 py-1 rounded-full text-indigo-300">祕源誡律</span>
                  </p>
                  <div class="p-3 bg-indigo-900/30 rounded-lg border-l-4 border-indigo-400">
                    <p class="text-sm text-indigo-200 italic mb-2">
                      "{{ characterReference.ritual_concept }}"
                    </p>
                    <p class="text-xs text-indigo-200/70">
                      這是必須遵守的要求，否則將與神話漸行漸遠。
                    </p>
                  </div>
                </div>
              </div>

              <!-- 附加資訊 -->
              <div v-if="characterReference.gear || characterReference.moves || characterReference.improvements" 
                   class="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <h4 class="text-blue-200 font-semibold mb-2 flex items-center">
                  <Icon name="lucide:info" class="w-4 h-4 mr-2" />
                  額外資訊
                </h4>
                <div class="space-y-2">
                  <div v-if="characterReference.gear" class="text-blue-300 text-sm">
                    <strong>裝備：</strong>
                    <ul class="list-disc list-inside ml-4">
                      <li v-for="(item, index) in characterReference.gear" :key="index">{{ item }}</li>
                    </ul>
                  </div>
                  <div v-if="characterReference.moves" class="text-blue-300 text-sm">
                    <strong>招式：</strong>
                    <ul class="list-disc list-inside ml-4">
                      <li v-for="(move, index) in characterReference.moves" :key="index">{{ move }}</li>
                    </ul>
                  </div>
                  <div v-if="characterReference.improvements" class="text-blue-300 text-sm">
                    <strong>提升：</strong>
                    <ul class="list-disc list-inside ml-4">
                      <li v-for="(improvement, index) in characterReference.improvements" :key="index">{{ improvement }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <Icon name="lucide:search" class="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p class="text-gray-400">找不到對應的角色參考資料</p>
              <p class="text-gray-500 text-sm mt-2">搜尋的角色名稱：{{ selectedCharacterName }}</p>
              <p class="text-gray-500 text-sm">主題風格：{{ selectedCharacterType }}</p>
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
  title: '模板創建工具 - 都市異景'
})

// 動態獲取基礎路徑
const getBasePath = () => {
  // 在生產環境中使用配置的 baseURL，在開發環境中使用空字串
  if (process.env.NODE_ENV === 'production') {
    return '/LegendintheMist'
  }
  return ''
}

// 響應式數據
const selectedTemplateType = ref('')
const selectedTemplate = ref(null)
const selectedTemplateIndex = ref(-1)
const templates = ref([])
const currentTemplate = ref(null)
const showReferenceModal = ref(false)
const selectedCharacterName = ref('')
const selectedCharacterType = ref('')
const characterReference = ref(null)

// 模板檔案列表
const templateFiles = [
  { file: 'ASSASSINS-SPIES', displayName: '刺客與間諜' },
  { file: 'CYBERNETICS-JUNKIES', displayName: '賽博強化狂' },
  { file: 'CUTTING-EDGE-TECHIES', displayName: '尖端技術宅' },
  { file: 'EVERYDAY-SURVIVORS', displayName: '平民倖存者' },
  { file: 'HIRED-GUNS', displayName: '受僱武裝' },
  { file: 'MYSTICS-OCCULTISTS', displayName: '神祕學者與靈媒' },
  { file: 'POWER-PLAYERS', displayName: '權力玩家' },
  { file: 'SCAVENGERS-OUTLANDERS', displayName: '拾荒者與邊緣人' },
  { file: 'SUBCULTURE-EXEMPLARS', displayName: '次文化代表' },
  { file: 'TRANSHUMANS', displayName: '超人強化者' },
  { file: 'NOIR-ANTIHEROES', displayName: '黑色反英雄' }
]

// 角色範例資料快取
const characterExamples = ref({})

// 主題中文名稱快取
const themeChineseNames = ref({})

// 主題名稱與檔案名稱的對應表
const themeFileMapping = {
  // Mythos themes
  'ARTIFACT': 'artifact-examples',
  'COMPANION': 'companion-examples', 
  'ESOTERICA': 'esoterica-examples',
  'EXPOSURE': 'exposure-examples',
  
  // Noise themes
  'AUGMENTATION': 'augmentation-examples',
  'CUTTING EDGE': 'cuttingedge-examples',
  'CYBERSPACE': 'cyberspace-examples',
  'DRONES': 'drones-examples',
  
  // Self themes  
  'AFFILIATION': 'affiliation-examples',
  'ASSETS': 'assets-examples',
  'EXPERTISE': 'expertises-examples',
  'HORIZON': 'horizon-examples',
  'PERSONALITY': 'personality-examples',
  'TROUBLED PAST': 'troubledpast-examples'
}

// 角色範例類型到主題檔案鍵的對應表
const characterTypeToThemeMapping = {
  // Mythos themes
  'Artifact': 'Artifact',
  'Companion': 'Companion', 
  'Esoterica': 'Esoterica',
  'Exposure': 'Exposure',
  
  // Noise themes
  'Augmentation': 'Augmentation',
  'CuttingEdge': 'CuttingEdge',
  'Cyberspace': 'Cyberspace',
  'Drones': 'Drones',
  
  // Self themes
  'Affiliation': 'Affiliation',
  'Assets': 'Assets',
  'Expertise': 'Expertise',
  'Horizon': 'Horizon',
  'Personality': 'Personality',
  'TroubledPast': 'TroubledPast'
}

// 主題系統對應表
const themeSystemMapping = {
  'ARTIFACT': 'mythos-themes',
  'COMPANION': 'mythos-themes',
  'ESOTERICA': 'mythos-themes', 
  'EXPOSURE': 'mythos-themes',
  'AUGMENTATION': 'noise-themes',
  'CUTTING EDGE': 'noise-themes',
  'CYBERSPACE': 'noise-themes',
  'DRONES': 'noise-themes',
  'AFFILIATION': 'self-themes',
  'ASSETS': 'self-themes',
  'EXPERTISE': 'self-themes',
  'HORIZON': 'self-themes',
  'PERSONALITY': 'self-themes',
  'TROUBLED PAST': 'self-themes'
}

// 載入角色範例資料
async function loadCharacterExamples(themeType) {
  console.log('載入角色範例 - 主題類型:', themeType)
  
  const themeKey = themeType.toUpperCase()
  const themeSystem = themeSystemMapping[themeKey]
  const fileName = themeFileMapping[themeKey]
  
  console.log('主題鍵值:', themeKey)
  console.log('主題系統:', themeSystem)
  console.log('檔案名稱:', fileName)
  
  if (!themeSystem || !fileName) {
    console.warn(`找不到主題類型 ${themeType} 的對應檔案`)
    return null
  }
  
  const cacheKey = `${themeSystem}-${fileName}`
  
  // 如果已經載入過，直接返回快取
  if (characterExamples.value[cacheKey]) {
    console.log('使用快取資料:', cacheKey)
    return characterExamples.value[cacheKey]
  }
  
  try {
    const basePath = getBasePath()
    const filePath = `${basePath}/MO/sample_characters/${themeSystem}/${fileName}.json`
    console.log('嘗試載入檔案:', filePath)
    
    const response = await $fetch(filePath)
    characterExamples.value[cacheKey] = response
    
    console.log('成功載入檔案:', response)
    return response
  } catch (error) {
    console.error(`載入角色範例失敗: ${themeSystem}/${fileName}.json`, error)
    return null
  }
}

// 載入主題中文名稱
async function loadThemeChineseName(themeType) {
  console.log('載入主題中文名稱，輸入類型:', themeType)
  
  // 先嘗試直接查找角色範例類型映射
  let themeKey = characterTypeToThemeMapping[themeType] || themeType
  console.log('角色類型映射後:', themeKey)
  
  // 如果還是沒找到，嘗試處理模板格式 (如 "CUTTING EDGE" -> "CuttingEdge")
  if (!characterTypeToThemeMapping[themeType]) {
    // 將大寫加空格格式轉換為駝峰格式
    themeKey = themeType.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
    console.log('模板格式轉換後:', themeKey)
  }
  
  // 找到對應的主題系統
  let themeSystem = null
  for (const [key, system] of Object.entries(themeSystemMapping)) {
    if (key.replace(/\s+/g, '').toLowerCase() === themeType.replace(/\s+/g, '').toLowerCase()) {
      themeSystem = system
      break
    }
  }
  
  console.log('找到的主題系統:', themeSystem)
  
  if (!themeSystem) {
    console.warn(`找不到主題類型 ${themeType} 的對應系統`)
    return themeType
  }
  
  // 如果已經載入過，直接返回快取
  if (themeChineseNames.value[themeSystem]) {
    const themeData = themeChineseNames.value[themeSystem]
    console.log('從快取查找主題:', themeKey, '可用主題:', Object.keys(themeData.themes))
    return themeData.themes[themeKey]?.theme || themeType
  }
  
  try {
    const basePath = getBasePath()
    const filePath = `${basePath}/MO/${themeSystem}.json`
    console.log('載入檔案:', filePath)
    const response = await $fetch(filePath)
    themeChineseNames.value[themeSystem] = response
    
    console.log('載入後查找主題:', themeKey, '可用主題:', Object.keys(response.themes))
    return response.themes[themeKey]?.theme || themeType
  } catch (error) {
    console.error(`載入主題中文名稱失敗: ${themeSystem}.json`, error)
    return themeType
  }
}

// 獲取主題的中文名稱
async function getThemeChineseName(themeType) {
  if (!themeType) return '未提供'
  
  const chineseName = await loadThemeChineseName(themeType)
  return chineseName || themeType
}

// 角色名稱中文映射快取
const characterNameCache = ref({})

// 從主題字串中提取角色名稱（異步版本，返回中文名稱）
async function getCharacterChineseNameFromTheme(themeString) {
  const englishName = themeString.replace(/\s*\([^)]+\)$/, '')
  const themeType = getThemeTypeFromString(themeString)
  
  // 檢查快取
  const cacheKey = `${englishName}-${themeType}`
  if (characterNameCache.value[cacheKey]) {
    return characterNameCache.value[cacheKey]
  }
  
  try {
    // 載入對應的角色範例資料
    const exampleData = await loadCharacterExamples(themeType)
    
    if (exampleData && exampleData.sample_characters) {
      // 尋找匹配的角色
      const foundCharacter = exampleData.sample_characters.find(char => 
        char.ori_name === englishName || char.name === englishName
      )
      
      if (foundCharacter && foundCharacter.name) {
        // 快取結果
        characterNameCache.value[cacheKey] = foundCharacter.name
        return foundCharacter.name
      }
    }
  } catch (error) {
    console.warn(`載入角色名稱失敗: ${englishName} (${themeType})`, error)
  }
  
  // 如果找不到對應的中文名稱，返回英文名稱
  return englishName
}

// 同步版本的角色名稱快取
const cachedCharacterNames = ref({})

// 預載入所有角色名稱的中文映射
async function preloadCharacterNames() {
  console.log('開始預載入角色名稱...')
  
  // 載入所有主題的角色範例
  const allThemeTypes = Object.keys(themeFileMapping)
  
  for (const themeType of allThemeTypes) {
    try {
      const exampleData = await loadCharacterExamples(themeType)
      
      if (exampleData && exampleData.sample_characters) {
        for (const character of exampleData.sample_characters) {
          if (character.ori_name && character.name) {
            const cacheKey = `${character.ori_name}-${themeType}`
            cachedCharacterNames.value[character.ori_name] = character.name
            console.log(`預載入角色名稱: ${character.ori_name} -> ${character.name}`)
          }
        }
      }
    } catch (error) {
      console.warn(`預載入主題 ${themeType} 的角色名稱失敗:`, error)
    }
  }
  
  console.log('角色名稱預載入完成，快取內容:', cachedCharacterNames.value)
}

// 從主題字串中提取角色名稱（同步版本，返回中文名稱）
function getCharacterNameFromTheme(themeString) {
  const englishName = themeString.replace(/\s*\([^)]+\)$/, '')
  
  // 首先嘗試從快取中獲取中文名稱
  const chineseName = cachedCharacterNames.value[englishName]
  if (chineseName) {
    return chineseName
  }
  
  // 如果快取中沒有，返回英文名稱
  return englishName
}

// 從主題字串中提取主題類型
function getThemeTypeFromString(themeString) {
  const match = themeString.match(/\(([^)]+)\)$/)
  return match ? match[1] : '未知類型'
}

// 獲取主題字串的中文名稱（異步版本）
async function getThemeChineseNameFromString(themeString) {
  const themeType = getThemeTypeFromString(themeString)
  if (!themeType || themeType === '未知類型') return themeType
  
  const chineseName = await getThemeChineseName(themeType)
  return chineseName
}

// 主題中文名稱快取，用於同步獲取
const cachedThemeChineseNames = ref({})

// 預載入主題中文名稱到快取
async function preloadThemeChineseNames() {
  console.log('開始預載入主題中文名稱...')
  
  // 預載入所有主題類型的中文名稱
  const allThemeTypes = [
    // Mythos themes (使用 JSON 檔案中的鍵)
    'Artifact', 'Companion', 'Esoterica', 'Exposure',
    // Noise themes
    'Augmentation', 'CuttingEdge', 'Cyberspace', 'Drones', 
    // Self themes
    'Affiliation', 'Assets', 'Expertise', 'Horizon', 'Personality', 'TroubledPast'
  ]
  
  for (const themeType of allThemeTypes) {
    try {
      const chineseName = await loadThemeChineseName(themeType)
      cachedThemeChineseNames.value[themeType] = chineseName
      console.log(`預載入主題 ${themeType} -> ${chineseName}`)
    } catch (error) {
      console.warn(`預載入主題 ${themeType} 的中文名稱失敗:`, error)
    }
  }
  
  // 同時快取模板中使用的格式 (大寫加空格)，直接載入對應的中文名稱
  const templateFormats = [
    'ARTIFACT', 'COMPANION', 'ESOTERICA', 'EXPOSURE',
    'AUGMENTATION', 'CUTTING EDGE', 'CYBERSPACE', 'DRONES',
    'AFFILIATION', 'ASSETS', 'EXPERTISE', 'HORIZON', 'PERSONALITY', 'TROUBLED PAST'
  ]
  
  for (const templateFormat of templateFormats) {
    try {
      const chineseName = await loadThemeChineseName(templateFormat)
      cachedThemeChineseNames.value[templateFormat] = chineseName
      console.log(`預載入模板格式 ${templateFormat} -> ${chineseName}`)
    } catch (error) {
      console.warn(`預載入模板格式 ${templateFormat} 失敗:`, error)
    }
  }
  
  console.log('預載入完成，快取內容:', cachedThemeChineseNames.value)
}

// 同步獲取主題中文名稱（從快取）
function getThemeChineseNameSync(themeType) {
  console.log('獲取主題中文名稱:', themeType, '快取內容:', cachedThemeChineseNames.value)
  
  // 直接查找
  if (cachedThemeChineseNames.value[themeType]) {
    return cachedThemeChineseNames.value[themeType]
  }
  
  // 嘗試不同的格式轉換
  const normalizedType = themeType.replace(/\s+/g, '') // 移除空格
  for (const [key, value] of Object.entries(cachedThemeChineseNames.value)) {
    if (key.replace(/\s+/g, '').toLowerCase() === normalizedType.toLowerCase()) {
      return value
    }
  }
  
  return themeType
}

// 從主題字串同步獲取中文名稱
function getThemeChineseNameFromStringSync(themeString) {
  const themeType = getThemeTypeFromString(themeString)
  if (!themeType || themeType === '未知類型') return themeType
  
  return getThemeChineseNameSync(themeType)
}

// 載入選定的模板
async function loadSelectedTemplate() {
  if (!selectedTemplateType.value) return
  
  try {
    const basePath = getBasePath()
    const templateData = await $fetch(`${basePath}/MO/templates/${selectedTemplateType.value}.json`)
    templates.value = templateData
    
    // 找到對應的顯示名稱
    const templateInfo = templateFiles.find(t => t.file === selectedTemplateType.value)
    selectedTemplate.value = templateInfo
    
    // 預載入主題中文名稱和角色中文名稱
    await preloadThemeChineseNames()
    await preloadCharacterNames()
    
    // 重置選擇
    selectedTemplateIndex.value = -1
    currentTemplate.value = null
    
  } catch (error) {
    console.error('載入模板失敗:', error)
    templates.value = []
    selectedTemplate.value = null
  }
}

// 選擇模板
function selectTemplate(template) {
  const index = templates.value.indexOf(template)
  selectedTemplateIndex.value = index
  currentTemplate.value = template
}

// 顯示角色參考
async function showCharacterReference(themeString, sourceType) {
  console.log('點擊的主題字串:', themeString)
  console.log('來源類型:', sourceType)
  
  selectedCharacterName.value = getCharacterNameFromTheme(themeString)
  selectedCharacterType.value = getThemeTypeFromString(themeString)
  
  console.log('提取的角色名稱:', selectedCharacterName.value)
  console.log('提取的主題類型:', selectedCharacterType.value)
  
  // 從括號中提取主題類型
  const themeTypeMatch = themeString.match(/\(([^)]+)\)$/)
  if (!themeTypeMatch) {
    console.error('無法從主題名稱中提取類型:', themeString)
    characterReference.value = null
    showReferenceModal.value = true
    return
  }
  
  const extractedType = themeTypeMatch[1]
  const characterName = themeString.replace(/\s*\([^)]+\)$/, '')
  
  console.log('主題類型:', extractedType)
  console.log('角色名稱:', characterName)
  
  // 載入對應的角色範例資料
  const exampleData = await loadCharacterExamples(extractedType)
  
  console.log('載入的範例資料:', exampleData)
  
  if (exampleData && exampleData.sample_characters) {
    console.log('可用的角色列表:', exampleData.sample_characters.map(char => ({ name: char.name, ori_name: char.ori_name })))
    
    // 尋找匹配的角色
    const foundCharacter = exampleData.sample_characters.find(char => 
      char.name === characterName || char.ori_name === characterName
    )
    
    console.log('找到的角色:', foundCharacter)
    
    if (foundCharacter) {
      // 載入主題中文名稱
      const chineseName = await getThemeChineseName(foundCharacter.type)
      foundCharacter.themeChineseName = chineseName
      
      characterReference.value = foundCharacter
    } else {
      console.warn(`找不到角色: ${characterName} 在 ${extractedType} 中`)
      characterReference.value = null
    }
  } else {
    console.error(`無法載入 ${extractedType} 的角色範例資料`)
    characterReference.value = null
  }
  
  showReferenceModal.value = true
}

// 關閉參考模態框
function closeReferenceModal() {
  showReferenceModal.value = false
  selectedCharacterName.value = ''
  selectedCharacterType.value = ''
  characterReference.value = null
}

// 頁面載入時預載入主題中文名稱和角色名稱
onMounted(async () => {
  await preloadThemeChineseNames()
  await preloadCharacterNames()
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
