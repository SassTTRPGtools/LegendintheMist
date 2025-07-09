<template>
  <div 
    v-if="backgroundQuestions && backgroundQuestions.length > 0"
    class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
  >
    <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
      <h3 class="font-semibold text-cyan-100 flex items-center">
        <Icon name="lucide:help-circle" class="w-5 h-5 mr-2 text-cyan-400" />
        背景問題
      </h3>
    </div>
    <div class="p-4 space-y-3">
      <div 
        v-for="(question, index) in backgroundQuestions" 
        :key="index" 
        class="p-3 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-400"
      >
        <p class="text-cyan-100">{{ question }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  backgroundQuestions: {
    type: Array,
    default: () => []
  }
})
</script>
