<template>
  <div 
    v-if="abilityTags && abilityTags.length > 0"
    class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
  >
    <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
      <h3 class="font-semibold text-cyan-100 flex items-center">
        <Icon name="lucide:zap" class="w-5 h-5 mr-2 text-green-400" />
        能力標籤
      </h3>
    </div>
    <div class="p-4 space-y-3">            
      <div 
        v-for="tag in abilityTags" 
        :key="tag.id" 
        class="p-3 bg-green-900/30 rounded-lg border-l-4 border-green-400"
      >              
        <div class="flex items-center">
          <span class="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full mr-3 flex-shrink-0">
            {{ tag.id }}
          </span>
          <p class="text-green-100">
            <span v-if="tag.id === 'A'" class="font-bold">{{ tag.question }}</span>
            <span v-else>{{ tag.question }}</span>
            <span v-if="tag.id === 'A'" class="text-red-400 text-sm ml-2">（必答）</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  abilityTags: {
    type: Array,
    default: () => []
  }
})
</script>
