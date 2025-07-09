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
    <CharacterReferenceMain 
      :system-data="systemData"
      :is-loading="isLoading"
      @load-sample-characters="loadSampleCharacters"
      ref="characterReferenceMain"
    />
  </div>
</template>

<script setup>
// 導入組件
import CharacterReferenceMain from '~/components/CharacterReference/CharacterReferenceMain.vue'

// 響應式數據
const isLoading = ref(false)
const characterReferenceMain = ref(null)

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

// 動態獲取基礎路徑
const getBasePath = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/LegendintheMist'
  }
  return ''
}

// 載入 JSON 資料的方法
const loadJsonData = async (filename) => {
  try {
    const basePath = getBasePath()
    const filePath = `${basePath}/MO/${filename}`
    console.log(`正在載入: ${filePath}`)
    
    const response = await $fetch(filePath)
    
    console.log(`成功載入 ${filename}:`, response)
    return response
  } catch (error) {
    console.error(`載入 ${filename} 失敗:`, error)
    throw new Error(`無法載入 ${filename}: ${error.message}`)
  }
}

// 載入範例角色
const loadSampleCharacters = async ({ system, theme }) => {
  if (!system || !theme) {
    return
  }
  
  try {
    // 根據系統和主題構建檔案路徑
    const systemFolder = `${system}-themes`
    
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
    
    const themeFile = themeToFileMap[theme]
    
    if (!themeFile) {
      console.warn(`未找到主題 ${theme} 對應的範例檔案`)
      return
    }
    
    const filePath = `sample_characters/${systemFolder}/${themeFile}`
    
    const basePath = getBasePath()
    const fullPath = `${basePath}/MO/${filePath}`
    console.log(`嘗試載入範例角色: ${fullPath}`)
    
    const sampleData = await $fetch(fullPath)
    
    console.log('載入的原始資料:', sampleData)
    
    // 處理不同的檔案格式
    let characters = []
    
    if (sampleData && sampleData.sample_characters) {
      characters = sampleData.sample_characters
    } else if (Array.isArray(sampleData)) {
      characters = sampleData
    } else {
      console.warn('未識別的檔案格式:', sampleData)
      characters = []
    }
    
    // 通過 ref 將資料傳遞給子組件
    if (characterReferenceMain.value) {
      characterReferenceMain.value.setSampleCharacters(characters)
    }
    
    console.log('成功載入範例角色:', characters)
    
  } catch (error) {
    console.error('載入範例角色失敗:', error)
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
    
  } catch (error) {
    console.error('載入主要系統資料失敗:', error)
    alert('無法載入主題資料，請檢查網路連線或重新整理頁面')
  } finally {
    isLoading.value = false
  }
})
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
