<template>
  <div class="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div>
        <span class="text-gray-400">名稱：</span>
        <span class="text-cyan-200">{{ characterData.name || '未提供' }}</span>
      </div>
      <div>
        <span class="text-gray-400">資源書：</span>
        <span class="text-cyan-200">{{ characterData.source || '未提供' }}</span>
      </div>                  
      <div>
        <span class="text-gray-400">主題風格：</span>
        <ThemeDisplayComponent 
          :theme-string="characterData.type" 
          :use-type-mapping="true"
          text-class="text-cyan-200" />
      </div>
      <div>
        <span class="text-gray-400">類型：</span>
        <ThemeDisplayComponent 
          :theme-string="characterData.type" 
          :use-chinese-name="true"
          text-class="text-cyan-200" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ThemeDisplayComponent from '../ThemeDisplayComponent.vue'

// Props
const props = defineProps({
  characterData: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* 基本資訊樣式 */
</style>
