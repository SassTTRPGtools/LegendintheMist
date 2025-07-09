<template>
  <div 
    v-if="weaknessTags && weaknessTags.length > 0"
    class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
  >
    <div class="bg-gray-800/90 px-6 py-4 border-b border-cyan-500/30">
      <h3 class="font-semibold text-cyan-100 flex items-center text-lg">
        <Icon name="lucide:alert-triangle" class="w-6 h-6 mr-3 text-red-400" />
        弱點標籤 ({{ weaknessTags.length }} 個)
      </h3>
    </div>
    <div class="p-6 space-y-4">
      <div 
        v-for="tag in weaknessTags" 
        :key="tag.id" 
        class="p-4 bg-red-900/30 rounded-lg border border-red-500/30 hover:bg-red-900/40 transition-colors"
      >              
        <div class="flex items-start">
          <span class="inline-flex items-center justify-center w-8 h-8 bg-red-500 text-white text-sm font-bold rounded-full mr-4 flex-shrink-0 mt-1">
            {{ tag.id }}
          </span>
          <div class="flex-1">
            <p class="text-red-100 text-base leading-relaxed">{{ tag.question }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  weaknessTags: {
    type: Array,
    default: () => []
  }
})
</script>
