<template>
  <div class="px-6 py-8 max-w-7xl mx-auto">
    <!-- 控制面板區域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- System Selector -->
      <SystemSelector
        :selected-system="selectedSystem"
        :system-data="systemData"
        @update:selected-system="selectedSystem = $event"
        @system-change="onSystemChange" />

      <!-- Theme Type Selector -->
      <ThemeTypeSelector
        :selected-system="selectedSystem"
        :selected-theme="selectedTheme"
        :available-themes="availableThemes"
        @update:selected-theme="selectedTheme = $event"
        @theme-change="onThemeChange" />
    </div>

    <!-- Debug Info -->
    <div 
      v-if="selectedSystem && availableThemes.length === 0" 
      class="bg-yellow-900/20 rounded-xl border border-yellow-500/30 p-4 mb-8"
    >
      <p class="text-yellow-300 text-sm">
        調試資訊：已選擇主題風格 "{{ selectedSystem }}"，但沒有找到可用的主題。
      </p>
      <p class="text-yellow-400 text-xs mt-2">
        系統資料: {{ systemData[selectedSystem] ? '已載入' : '未載入' }}
      </p>
    </div>

    <!-- Theme Details -->
    <div v-if="selectedThemeData" class="space-y-10 mt-10">
      <!-- 三欄式內容區域 - 平均分配 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 左側欄：主題核心、主題內容、概念問題、背景問題 (1/3) -->
        <div class="space-y-8">
          <!-- ✨ 主題核心 -->
          <ConceptExplanation
            :selected-system="selectedSystem"
            :selected-theme="selectedTheme"
            :selected-theme-data="selectedThemeData" />

          <!-- 📋 主題內容 -->
          <ThemeOverview :theme-data="selectedThemeData" />
          
          <!-- 💡 概念問題 -->
          <ConceptOptions 
            :concept-options="selectedThemeData.questions?.concept_options" />

          <!-- ❓ 背景問題 -->
          <BackgroundQuestions 
            :background-questions="selectedThemeData.questions?.background" />
        </div>

        <!-- 中間欄：能力標籤與弱點標籤 (1/3) -->
        <div class="space-y-8">
          <!-- Ability Tags -->
          <AbilityTags 
            :ability-tags="selectedThemeData.questions?.ability_tags" />
          
          <!-- Weakness Tags -->
          <WeaknessTags 
            :weakness-tags="selectedThemeData.questions?.weakness_tags" />
        </div>

        <!-- 右側欄：其他詳細資訊 (1/3) -->
        <div class="space-y-8">
          <!-- Additional Details -->
          <AdditionalDetails :theme-data="selectedThemeData" />
        </div>
      </div>

      <!-- 範例角色 - 佔據全寬 -->
      <div class="w-full mt-12">
        <SampleCharacters :sample-characters="sampleCharacters" />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>

    <!-- Empty State -->
    <div v-if="!selectedSystem" class="text-center py-12">
      <Icon name="lucide:cpu" class="w-16 h-16 text-cyan-500/50 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-cyan-100 mb-2">選擇主題風格</h3>
      <p class="text-cyan-300/70">請先選擇一個主題風格來查看角色創建參考資料</p>
    </div>
  </div>
</template>

<script setup>
// 導入組件
import SystemSelector from './ThemeSelector/SystemSelector.vue'
import ThemeTypeSelector from './ThemeSelector/ThemeTypeSelector.vue'
import ConceptExplanation from './ThemeDetails/ConceptExplanation.vue'
import ThemeOverview from './ThemeDetails/ThemeOverview.vue'
import ConceptOptions from './ThemeDetails/ConceptOptions.vue'
import BackgroundQuestions from './ThemeDetails/BackgroundQuestions.vue'
import AbilityTags from './ThemeDetails/AbilityTags.vue'
import WeaknessTags from './ThemeDetails/WeaknessTags.vue'
import AdditionalDetails from './ThemeDetails/AdditionalDetails.vue'
import SampleCharacters from './ThemeDetails/SampleCharacters.vue'

// Props
const props = defineProps({
  systemData: {
    type: Object,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['load-sample-characters'])

// 響應式數據
const selectedSystem = ref('')
const selectedTheme = ref('')
const selectedThemeData = ref(null)
const availableThemes = ref([])
const sampleCharacters = ref([])

// 當系統選擇改變時
const onSystemChange = () => {
  selectedTheme.value = ''
  selectedThemeData.value = null
  sampleCharacters.value = []
  
  if (!selectedSystem.value || !props.systemData[selectedSystem.value]) {
    availableThemes.value = []
    return
  }
  
  const data = props.systemData[selectedSystem.value]
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
  if (!selectedTheme.value || !props.systemData[selectedSystem.value]) {
    selectedThemeData.value = null
    sampleCharacters.value = []
    return
  }
  
  const data = props.systemData[selectedSystem.value]
  let themeData = null
  
  // 所有系統都使用 themes 屬性
  if (data.themes && data.themes[selectedTheme.value]) {
    themeData = data.themes[selectedTheme.value]
  }
  
  console.log('選擇的主題資料:', themeData)
  selectedThemeData.value = themeData
  
  // 觸發載入範例角色
  emit('load-sample-characters', {
    system: selectedSystem.value,
    theme: selectedTheme.value
  })
}

// 接收從父組件傳來的範例角色資料
const setSampleCharacters = (characters) => {
  sampleCharacters.value = characters
}

// 暴露方法給父組件
defineExpose({
  setSampleCharacters
})
</script>
