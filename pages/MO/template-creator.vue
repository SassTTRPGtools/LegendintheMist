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
      <div v-if="selectedTemplate && templates.length > 0" class="grid lg:grid-cols-2 gap-6">
        <!-- Left Column: Template List -->
        <div class="space-y-4">
          <div class="bg-gray-800 rounded-xl shadow-lg border border-purple-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
              <h3 class="text-lg font-bold text-white flex items-center">
                <Icon name="lucide:list" class="w-5 h-5 mr-2" />
                {{ selectedTemplate.displayName }} 模板列表
              </h3>
            </div>
            <div class="p-4 space-y-3 max-h-96 overflow-y-auto">
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
        <div v-if="currentTemplate" class="space-y-4">
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
                   @click="showCharacterReference(tool.name, tool.type)"
                   class="p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-green-400 hover:bg-gray-700/70 cursor-pointer transition-all">
                <div class="flex justify-between items-start">
                  <div>
                    <h5 class="font-semibold text-green-200">{{ tool.name }}</h5>
                    <span class="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded mt-1 inline-block">
                      {{ tool.type }}
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
                   @click="showCharacterReference(choice.name, choice.type)"
                   class="p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-yellow-400 hover:bg-gray-700/70 cursor-pointer transition-all">
                <div class="flex justify-between items-start">
                  <div>
                    <h5 class="font-semibold text-yellow-200">{{ choice.name }}</h5>
                    <span class="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded mt-1 inline-block">
                      {{ choice.type }}
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
            <h3 class="text-lg font-bold text-white">{{ selectedCharacterName }} - 角色參考</h3>
            <button @click="closeReferenceModal" 
                    class="text-white hover:text-gray-300 transition-colors">
              <Icon name="lucide:x" class="w-6 h-6" />
            </button>
          </div>
          <div class="p-6 overflow-y-auto max-h-[60vh]">
            <div v-if="characterReference" class="space-y-4">
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
              <div v-if="characterReference.primary_goal || characterReference.itch || characterReference.ritual_concept" 
                   class="mt-6 p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <h4 class="text-purple-200 font-semibold mb-2 flex items-center">
                  <Icon name="lucide:target" class="w-4 h-4 mr-2" />
                  動機與目標
                </h4>
                <p v-if="characterReference.primary_goal" class="text-purple-300 text-sm mb-2">
                  <strong>主要目標：</strong>{{ characterReference.primary_goal }}
                </p>
                <p v-if="characterReference.itch" class="text-purple-300 text-sm mb-2">
                  <strong>癢處：</strong>{{ characterReference.itch }}
                </p>
                <p v-if="characterReference.ritual_concept" class="text-purple-300 text-sm">
                  <strong>儀式概念：</strong>{{ characterReference.ritual_concept }}
                </p>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <Icon name="lucide:search" class="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p class="text-gray-400">找不到對應的角色參考資料</p>
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
  { file: 'assassin-spy', displayName: '刺客與間諜' },
  { file: 'cyber-enhancer', displayName: '賽博強化狂' },
  { file: 'tech-geek', displayName: '尖端技術宅' },
  { file: 'survivor', displayName: '平民倖存者' },
  { file: 'mercenary', displayName: '受僱武裝' },
  { file: 'occultist', displayName: '神祕學者與靈媒' },
  { file: 'power-player', displayName: '權力玩家' },
  { file: 'scavenger', displayName: '拾荒者與邊緣人' },
  { file: 'subculture', displayName: '次文化代表' },
  { file: 'super-enhancer', displayName: '超人強化者' },
  { file: 'noir-hero', displayName: '黑色英雄' }
]

// 主題 JSON 資料
const themeData = ref({
  noise: null,
  mythos: null,
  self: null
})

// 載入主題資料
onMounted(async () => {
  try {
    const [noiseResponse, mythosResponse, selfResponse] = await Promise.all([
      $fetch('/data/MO/noise-themes.json'),
      $fetch('/data/MO/mythos-themes.json'),
      $fetch('/data/MO/self-themes.json')
    ])
    
    themeData.value.noise = noiseResponse
    themeData.value.mythos = mythosResponse
    themeData.value.self = selfResponse
  } catch (error) {
    console.error('載入主題資料失敗:', error)
  }
})

// 載入選定的模板
async function loadSelectedTemplate() {
  if (!selectedTemplateType.value) return
  
  try {
    const templateData = await $fetch(`/data/MO/templates/${selectedTemplateType.value}.json`)
    templates.value = templateData
    
    // 找到對應的顯示名稱
    const templateInfo = templateFiles.find(t => t.file === selectedTemplateType.value)
    selectedTemplate.value = templateInfo
    
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
function showCharacterReference(characterName, characterType) {
  selectedCharacterName.value = characterName
  selectedCharacterType.value = characterType
  
  // 在所有主題資料中搜尋角色
  let foundCharacter = null
  
  Object.values(themeData.value).forEach(themeFile => {
    if (themeFile && themeFile.examples && themeFile.examples.sample_characters) {
      const character = themeFile.examples.sample_characters.find(char => char.name === characterName)
      if (character) {
        foundCharacter = character
      }
    }
  })
  
  characterReference.value = foundCharacter
  showReferenceModal.value = true
}

// 關閉參考模態框
function closeReferenceModal() {
  showReferenceModal.value = false
  selectedCharacterName.value = ''
  selectedCharacterType.value = ''
  characterReference.value = null
}
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
