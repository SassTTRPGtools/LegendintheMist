<template>
  <div class="grid md:grid-cols-2 gap-6">
    <!-- 能力標籤 -->
    <div>
      <h4 class="text-cyan-200 font-semibold mb-3 flex items-center">
        <Icon name="lucide:zap" class="w-4 h-4 mr-2" />
        能力標籤
      </h4>
      <div class="space-y-2">
        <span 
          v-for="(tag, index) in characterData.ability_tags" 
          :key="index"
          class="inline-block bg-green-900/30 text-green-200 px-3 py-1 rounded-full text-sm border border-green-500/30 mr-2 mb-2">
          {{ tag }}
        </span>
      </div>
    </div>
    
    <!-- 弱點標籤 -->
    <div>
      <h4 class="text-red-200 font-semibold mb-3 flex items-center">
        <Icon name="lucide:alert-triangle" class="w-4 h-4 mr-2" />
        弱點標籤
      </h4>
      <div class="space-y-2">
        <span 
          v-for="(tag, index) in characterData.weakness_tags" 
          :key="index"
          class="inline-block bg-red-900/30 text-red-200 px-3 py-1 rounded-full text-sm border border-red-500/30 mr-2 mb-2">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  characterData: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* 標籤樣式 */
</style>
