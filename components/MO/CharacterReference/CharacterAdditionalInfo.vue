<template>
  <div class="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
    <h4 class="text-blue-200 font-semibold mb-2 flex items-center">
      <Icon name="lucide:info" class="w-4 h-4 mr-2" />
      額外資訊
    </h4>
    <div class="space-y-2">
      <!-- 裝備 -->
      <div v-if="characterData.gear" class="text-blue-300 text-sm">
        <strong>裝備：</strong>
        <ul class="list-disc list-inside ml-4">
          <li v-for="(item, index) in characterData.gear" :key="index">{{ item }}</li>
        </ul>
      </div>
      
      <!-- 招式 -->
      <div v-if="characterData.moves" class="text-blue-300 text-sm">
        <strong>招式：</strong>
        <ul class="list-disc list-inside ml-4">
          <li v-for="(move, index) in characterData.moves" :key="index">{{ move }}</li>
        </ul>
      </div>
      
      <!-- 提升 -->
      <div v-if="characterData.improvements" class="text-blue-300 text-sm">
        <strong>提升：</strong>
        <ul class="list-disc list-inside ml-4">
          <li v-for="(improvement, index) in characterData.improvements" :key="index">{{ improvement }}</li>
        </ul>
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
/* 附加資訊樣式 */
</style>
