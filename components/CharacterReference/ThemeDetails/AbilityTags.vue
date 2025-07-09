<template>
  <div 
    v-if="abilityTags && abilityTags.length > 0"
    class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
  >
    <div class="bg-gray-800/90 px-6 py-4 border-b border-cyan-500/30">
      <h3 class="font-semibold text-cyan-100 flex items-center text-lg">
        <Icon name="lucide:zap" class="w-6 h-6 mr-3 text-green-400" />
        能力標籤 ({{ abilityTags.length }} 個)
      </h3>
    </div>
    <div class="p-6 space-y-4">            
      <div 
        v-for="tag in abilityTags" 
        :key="tag.id" 
        class="p-4 bg-green-900/30 rounded-lg border border-green-500/30 hover:bg-green-900/40 transition-colors"
      >              
        <div class="flex items-start">
          <span class="inline-flex items-center justify-center w-8 h-8 bg-green-500 text-white text-sm font-bold rounded-full mr-4 flex-shrink-0 mt-1">
            {{ tag.id }}
          </span>
          <div class="flex-1">
            <p class="text-green-100 leading-relaxed">
              <span v-if="tag.id === 'A'" class="font-bold text-base">{{ tag.question }}</span>
              <span v-else class="text-base">{{ tag.question }}</span>
              <span v-if="tag.id === 'A'" class="block text-red-400 text-sm mt-1">（必答）</span>
            </p>
          </div>
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
