<template>
  <div 
    v-if="selectedTheme" 
    class="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 p-4 mb-6"
  >
    <h3 class="font-semibold text-cyan-100 mb-3 flex items-center">
      <Icon name="lucide:info" class="w-5 h-5 mr-2 text-cyan-400" />
      主題核心
    </h3>
    <div class="space-y-3 text-sm">
      <!-- 身份信念 - 適用於自我主題 -->
      <div 
        v-if="selectedSystem === 'self' || (selectedThemeData && (selectedThemeData.identity_concept || selectedThemeData.primary_goal))" 
        class="flex items-start space-x-3"
      >
        <Icon name="lucide:user-check" class="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
        <div>
          <span class="font-medium text-blue-400">身份</span>
          <span class="ml-2 text-xs bg-blue-500/20 px-2 py-1 rounded-full text-blue-300">自我信念</span>
          <p class="text-gray-300 mt-1">定義角色核心價值觀與行為準則的信念句，違背將導致角色身份動搖。</p>
        </div>
      </div>
      
      <!-- 儀式誡律 - 適用於神話主題 -->
      <div 
        v-if="selectedSystem === 'mythos' || (selectedThemeData && selectedThemeData.ritual_concept)" 
        class="flex items-start space-x-3"
      >
        <Icon name="lucide:calendar-check" class="w-4 h-4 mt-0.5 text-indigo-400 flex-shrink-0" />
        <div>
          <span class="font-medium text-indigo-400">儀式</span>
          <span class="ml-2 text-xs bg-indigo-500/20 px-2 py-1 rounded-full text-indigo-300">祕源誡律</span>
          <p class="text-gray-300 mt-1">維持力量或能力所必須執行的行動、習慣或條件，忽視將失去相關能力。</p>
        </div>
      </div>
      
      <!-- 科技心魔 - 適用於喧囂主題 -->
      <div 
        v-if="selectedSystem === 'noise' || (selectedThemeData && selectedThemeData.itch_concept)" 
        class="flex items-start space-x-3"
      >
        <Icon name="lucide:zap" class="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
        <div>
          <span class="font-medium text-cyan-400">癢處</span>
          <span class="ml-2 text-xs bg-cyan-500/20 px-2 py-1 rounded-full text-cyan-300">科技心魔</span>
          <p class="text-gray-300 mt-1">只有透過特定科技或行為才能滿足的強烈慾望，是推動角色不斷使用相關能力的內在驅動力。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  selectedSystem: {
    type: String,
    required: true
  },
  selectedTheme: {
    type: String,
    required: true
  },
  selectedThemeData: {
    type: Object,
    default: null
  }
})
</script>
