<template>
  <div 
    v-if="selectedTheme" 
    class="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 p-6 mb-8"
  >
    <h3 class="font-semibold text-cyan-100 mb-4 flex items-center text-lg">
      <Icon name="lucide:info" class="w-6 h-6 mr-3 text-cyan-400" />
      主題核心
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- 身份信念 - 適用於自我主題 -->
      <div 
        v-if="selectedSystem === 'self' || (selectedThemeData && (selectedThemeData.identity_concept || selectedThemeData.primary_goal))" 
        class="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30"
      >
        <div class="flex items-center mb-3">
          <Icon name="lucide:user-check" class="w-6 h-6 mr-3 text-blue-400 flex-shrink-0" />
          <div>
            <span class="font-medium text-blue-400 text-base">身份</span>
            <span class="ml-2 text-xs bg-blue-500/20 px-2 py-1 rounded-full text-blue-300">自我信念</span>
          </div>
        </div>
        <p class="text-gray-300 text-sm leading-relaxed">定義角色核心價值觀與行為準則的信念句，違背將導致角色身份動搖。</p>
      </div>
      
      <!-- 儀式誡律 - 適用於神話主題 -->
      <div 
        v-if="selectedSystem === 'mythos' || (selectedThemeData && selectedThemeData.ritual_concept)" 
        class="bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/30"
      >
        <div class="flex items-center mb-3">
          <Icon name="lucide:calendar-check" class="w-6 h-6 mr-3 text-indigo-400 flex-shrink-0" />
          <div>
            <span class="font-medium text-indigo-400 text-base">儀式</span>
            <span class="ml-2 text-xs bg-indigo-500/20 px-2 py-1 rounded-full text-indigo-300">祕源誡律</span>
          </div>
        </div>
        <p class="text-gray-300 text-sm leading-relaxed">維持力量或能力所必須執行的行動、習慣或條件，忽視將失去相關能力。</p>
      </div>
      
      <!-- 科技心魔 - 適用於喧囂主題 -->
      <div 
        v-if="selectedSystem === 'noise' || (selectedThemeData && selectedThemeData.itch_concept)" 
        class="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30"
      >
        <div class="flex items-center mb-3">
          <Icon name="lucide:zap" class="w-6 h-6 mr-3 text-cyan-400 flex-shrink-0" />
          <div>
            <span class="font-medium text-cyan-400 text-base">癢處</span>
            <span class="ml-2 text-xs bg-cyan-500/20 px-2 py-1 rounded-full text-cyan-300">科技心魔</span>
          </div>
        </div>
        <p class="text-gray-300 text-sm leading-relaxed">只有透過特定科技或行為才能滿足的強烈慾望，是推動角色不斷使用相關能力的內在驅動力。</p>
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
