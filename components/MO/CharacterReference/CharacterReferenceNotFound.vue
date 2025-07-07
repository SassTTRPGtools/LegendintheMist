<template>
  <div class="text-center py-8">
    <Icon name="lucide:search" class="w-12 h-12 text-gray-500 mx-auto mb-4" />
    <p class="text-gray-400">找不到對應的角色參考資料</p>
    <p class="text-gray-500 text-sm mt-2">搜尋的角色名稱：{{ characterName }}</p>
    <p class="text-gray-500 text-sm">主題風格：{{ characterType }}</p>
    
    <!-- 重試按鈕 -->
    <div class="mt-4">
      <button 
        @click="handleRetry"
        class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors">
        重新載入
      </button>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  characterName: {
    type: String,
    default: ''
  },
  characterType: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['retry'])

// 處理重試事件
function handleRetry() {
  emit('retry')
}
</script>

<style scoped>
/* 未找到資料樣式 */
</style>
