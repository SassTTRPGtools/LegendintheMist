<template>
  <div 
    v-if="weaknessTags && weaknessTags.length > 0"
    class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
  >
    <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
      <h3 class="font-semibold text-cyan-100 flex items-center">
        <Icon name="lucide:alert-triangle" class="w-5 h-5 mr-2 text-red-400" />
        弱點標籤
      </h3>
    </div>
    <div class="p-4 space-y-3">
      <div 
        v-for="tag in weaknessTags" 
        :key="tag.id" 
        class="p-3 bg-red-900/30 rounded-lg border-l-4 border-red-400"
      >              
        <div class="flex items-center">
          <span class="inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full mr-3 flex-shrink-0">
            {{ tag.id }}
          </span>
          <p class="text-red-100">{{ tag.question }}</p>
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
