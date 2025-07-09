<template>
  <div 
    v-if="themeData" 
    class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
  >          
    <div class="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-4">
      <h2 class="text-xl font-bold text-white flex items-center">
        <Icon name="lucide:cpu" class="w-5 h-5 mr-2 text-white" />
        {{ themeData.theme }}
      </h2>
      <p class="text-cyan-100 text-sm mt-1">{{ themeData.title }}</p>
    </div>          
    <div class="p-4">
      <div class="text-cyan-100 leading-relaxed">
        <p>{{ themeData.concept }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  themeData: {
    type: Object,
    required: true
  }
})
</script>
