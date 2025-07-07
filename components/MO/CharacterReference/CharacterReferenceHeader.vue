<template>
  <div class="bg-gradient-to-r from-cyan-600 to-purple-600 p-4 flex justify-between items-center">
    <h3 class="text-lg font-bold text-white">{{ characterName || '角色參考資料' }}</h3>
    <button 
      @click="handleClose" 
      class="text-white hover:text-gray-300 transition-colors p-1 rounded-md hover:bg-white/10"
      aria-label="關閉模態框">
      <Icon name="lucide:x" class="w-6 h-6" />
    </button>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  characterName: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['close'])

// 處理關閉事件
function handleClose() {
  emit('close')
}
</script>

<style scoped>
/* Header 樣式 */
</style>
