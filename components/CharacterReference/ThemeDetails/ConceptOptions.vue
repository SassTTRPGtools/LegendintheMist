<template>
  <div 
    v-if="conceptOptions && conceptOptions.length > 0" 
    class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
  >
    <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
      <h3 class="font-semibold text-cyan-100 flex items-center">
        <Icon name="lucide:lightbulb" class="w-5 h-5 mr-2 text-yellow-400" />
        概念問題
      </h3>
    </div>
    <div class="p-4 space-y-3">
      <div 
        v-for="(option, index) in conceptOptions" 
        :key="index" 
        class="p-3 bg-yellow-900/30 rounded-lg border-l-4 border-yellow-400"
      >
        <p class="text-yellow-100">{{ option }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  conceptOptions: {
    type: Array,
    default: () => []
  }
})
</script>
