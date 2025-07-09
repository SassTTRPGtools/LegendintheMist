<template>
  <div class="space-y-6">
    <!-- Crew Relationships -->
    <div 
      v-if="themeData.crew_relationships" 
      class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
    >
      <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
        <h3 class="font-semibold text-cyan-100 flex items-center">
          <Icon name="lucide:users-2" class="w-5 h-5 mr-2 text-pink-400" />
          小隊關係建議
        </h3>
      </div>
      <div class="p-4 space-y-3">
        <div 
          v-for="(relationship, index) in themeData.crew_relationships" 
          :key="index" 
          class="p-3 bg-pink-900/30 rounded-lg border-l-4 border-pink-400"
        >
          <p class="text-pink-100">{{ relationship }}</p>
        </div>
      </div>
    </div>        
    
    <!-- Identity Concept (自我信念 = 身份) -->
    <div 
      v-if="themeData.identity_concept || themeData.primary_goal" 
      class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
    >
      <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
        <h3 class="font-semibold text-cyan-100 flex items-center">
          <Icon name="lucide:user-check" class="w-5 h-5 mr-2 text-blue-400" />
          身份
          <span class="ml-2 text-xs bg-blue-500/20 px-2 py-1 rounded-full text-blue-300">自我信念</span>
        </h3>
      </div>
      <div class="p-4">
        <div class="p-4 bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
          <p class="text-blue-100 leading-relaxed">{{ themeData.identity_concept || themeData.primary_goal }}</p>
        </div>
      </div>
    </div>        
    
    <!-- Itch Concept (科技心魔 = 癢處) -->
    <div 
      v-if="themeData.itch_concept" 
      class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
    >
      <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
        <h3 class="font-semibold text-cyan-100 flex items-center">
          <Icon name="lucide:zap" class="w-5 h-5 mr-2 text-cyan-400" />
          癢處
          <span class="ml-2 text-xs bg-cyan-500/20 px-2 py-1 rounded-full text-cyan-300">科技心魔</span>
        </h3>
      </div>
      <div class="p-4">
        <div class="p-4 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 rounded-lg border-l-4 border-cyan-400 relative overflow-hidden">
          <!-- 背景效果 -->
          <div class="relative z-10">
            <p class="text-cyan-100 leading-relaxed font-medium">{{ themeData.itch_concept }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Ritual Concept (祕源誡律 = 儀式) -->
    <div 
      v-if="themeData.ritual_concept" 
      class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
    >
      <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
        <h3 class="font-semibold text-cyan-100 flex items-center">
          <Icon name="lucide:calendar-check" class="w-5 h-5 mr-2 text-indigo-400" />
          儀式
          <span class="ml-2 text-xs bg-indigo-500/20 px-2 py-1 rounded-full text-indigo-300">祕源誡律</span>
        </h3>
      </div>
      <div class="p-4">
        <div class="p-4 bg-indigo-900/30 rounded-lg border-l-4 border-indigo-400">
          <p class="text-indigo-100 leading-relaxed">{{ themeData.ritual_concept }}</p>
        </div>
      </div>
    </div>

    <!-- Theme Specials -->
    <div 
      v-if="themeData.theme_specials" 
      class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
    >
      <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
        <h3 class="font-semibold text-cyan-100 flex items-center">
          <Icon name="lucide:star" class="w-5 h-5 mr-2 text-yellow-400" />
          主題專長
        </h3>
      </div>
      <div class="p-4 space-y-4">
        <div 
          v-for="(special, index) in themeData.theme_specials" 
          :key="index" 
          class="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30"
        >
          <div class="mb-2">
            <h4 class="font-bold text-yellow-200 flex items-center">
              <Icon name="lucide:sparkles" class="w-4 h-4 mr-2 text-yellow-400" />
              {{ special.name }}
            </h4>
          </div>
          <p class="text-yellow-100 leading-relaxed">{{ special.description }}</p>
        </div>
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
