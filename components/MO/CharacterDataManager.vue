<template>
  <div class="fixed bottom-4 left-4 z-40">
    <!-- 浮動按鈕 -->
    <div class="flex flex-col space-y-2">
      <!-- 導出按鈕 -->
      <button
        @click="exportCharacter"
        class="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-colors"
        title="導出角色數據"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </button>
      
      <!-- 導入按鈕 -->
      <button
        @click="triggerFileInput"
        class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
        title="導入角色數據"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      </button>
      
      <!-- 隱藏的文件輸入 -->
      <input
        ref="fileInput"
        type="file"
        accept=".json"
        @change="importCharacter"
        class="hidden"
      />
    </div>

    <!-- 導出/導入提示彈窗 -->
    <div
      v-if="showNotification"
      :class="[
        'fixed bottom-20 left-4 p-4 rounded-lg shadow-lg transition-all duration-300',
        notificationType === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
      ]"
    >
      <div class="flex items-center space-x-2">
        <svg v-if="notificationType === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>{{ notificationMessage }}</span>
      </div>
    </div>

    <!-- 導入確認彈窗 -->
    <div
      v-if="showImportConfirm"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-purple-500/30">
        <h3 class="text-lg font-bold text-purple-300 mb-4">確認導入角色</h3>
        
        <div v-if="importPreview" class="mb-4 space-y-2">
          <p class="text-sm text-gray-300">即將導入的角色：</p>
          <div class="bg-slate-700/50 rounded p-3 text-sm">
            <p><span class="text-purple-300">角色名稱：</span>{{ importPreview.name || '未命名' }}</p>
            <p><span class="text-purple-300">背景：</span>{{ importPreview.background || '無' }}</p>
            <p><span class="text-purple-300">主題卡：</span>{{ getThemeCardCount(importPreview.themeCards) }}/4</p>
            <p><span class="text-purple-300">演化進度：</span>{{ getEvolutionProgress(importPreview.evolutionTrack) }}/5</p>
          </div>
        </div>
        
        <div class="bg-yellow-900/30 border border-yellow-500/50 rounded p-3 mb-4">
          <p class="text-yellow-300 text-sm">
            <strong>警告：</strong>導入將會覆蓋當前的角色數據，此操作無法撤銷。
          </p>
        </div>
        
        <div class="flex space-x-3">
          <button
            @click="confirmImport"
            class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            確認導入
          </button>
          <button
            @click="cancelImport"
            class="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定義 Props
interface Character {
  name: string
  background: string
  evolutionTrack: boolean[]
  evolutionHistory: any[]
  equipment: any
  themeCards: any[]
}

interface Props {
  character: Character
}

const props = defineProps<Props>()

// 定義 Emits
const emit = defineEmits<{
  'import-character': [character: Character]
}>()

// 響應式數據
const fileInput = ref<HTMLInputElement>()
const showNotification = ref(false)
const notificationType = ref<'success' | 'error'>('success')
const notificationMessage = ref('')

const showImportConfirm = ref(false)
const importPreview = ref<Character | null>(null)
const pendingImportData = ref<string>('')

// 顯示通知
const showNotificationMessage = (type: 'success' | 'error', message: string) => {
  notificationType.value = type
  notificationMessage.value = message
  showNotification.value = true
  
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

// 導出角色數據
const exportCharacter = () => {
  try {
    // 創建導出數據
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      character: props.character
    }
    
    // 轉換為 JSON
    const jsonString = JSON.stringify(exportData, null, 2)
    
    // 創建下載鏈接
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    // 生成文件名
    const characterName = props.character.name || '未命名角色'
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `${characterName}_${timestamp}.json`
    
    // 觸發下載
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // 清理
    URL.revokeObjectURL(url)
    
    showNotificationMessage('success', '角色數據已導出完成')
  } catch (error) {
    console.error('導出失敗:', error)
    showNotificationMessage('error', '導出失敗，請稍後再試')
  }
}

// 觸發文件選擇
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 導入角色數據
const importCharacter = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const jsonData = e.target?.result as string
      const importData = JSON.parse(jsonData)
      
      // 驗證數據結構
      if (!validateImportData(importData)) {
        showNotificationMessage('error', '無效的角色數據格式')
        return
      }
      
      // 提取角色數據
      const characterData = importData.character || importData
      
      // 顯示預覽和確認對話框
      importPreview.value = characterData
      pendingImportData.value = jsonData
      showImportConfirm.value = true
      
    } catch (error) {
      console.error('導入失敗:', error)
      showNotificationMessage('error', '文件解析失敗，請檢查文件格式')
    }
  }
  
  reader.readAsText(file)
  
  // 清空 input
  if (target) {
    target.value = ''
  }
}

// 驗證導入數據
const validateImportData = (data: any): boolean => {
  // 檢查基本結構
  const characterData = data.character || data
  
  if (!characterData || typeof characterData !== 'object') return false
  
  // 檢查必要欄位
  const requiredFields = ['name', 'background', 'evolutionTrack', 'equipment', 'themeCards']
  for (const field of requiredFields) {
    if (!(field in characterData)) return false
  }
  
  // 檢查陣列結構
  if (!Array.isArray(characterData.evolutionTrack) || characterData.evolutionTrack.length !== 5) return false
  if (!Array.isArray(characterData.themeCards) || characterData.themeCards.length !== 4) return false
  
  return true
}

// 確認導入
const confirmImport = () => {
  try {
    const importData = JSON.parse(pendingImportData.value)
    const characterData = importData.character || importData
    
    // 發送導入事件給父組件
    emit('import-character', characterData)
    
    showImportConfirm.value = false
    showNotificationMessage('success', '角色數據導入成功')
  } catch (error) {
    console.error('導入確認失敗:', error)
    showNotificationMessage('error', '導入失敗，請稍後再試')
  }
}

// 取消導入
const cancelImport = () => {
  showImportConfirm.value = false
  importPreview.value = null
  pendingImportData.value = ''
}

// 輔助函數：計算主題卡數量
const getThemeCardCount = (themeCards: any[]): number => {
  if (!Array.isArray(themeCards)) return 0
  return themeCards.filter(card => card && card.selectedThemeType && card.selectedTheme).length
}

// 輔助函數：計算演化進度
const getEvolutionProgress = (evolutionTrack: boolean[]): number => {
  if (!Array.isArray(evolutionTrack)) return 0
  return evolutionTrack.filter(step => step).length
}
</script>

<style scoped>
/* 浮動按鈕動畫 */
button {
  transform: translateY(0);
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

button:active {
  transform: translateY(0);
}
</style>
