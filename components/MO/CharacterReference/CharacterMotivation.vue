<template>
  <div class="mt-6 space-y-4">
    <h4 class="text-purple-200 font-semibold mb-4 flex items-center">
      <Icon name="lucide:target" class="w-4 h-4 mr-2" />
      角色動機與驅動力
    </h4>
    
    <!-- 癢處 (科技心魔) -->
    <div v-if="characterData.itch" class="mb-4">
      <p class="text-xs font-medium text-cyan-400 mb-2 flex items-center">
        <Icon name="lucide:zap" class="w-3 h-3 mr-1" />
        癢處
        <span class="ml-2 text-xs bg-cyan-500/20 px-2 py-1 rounded-full text-cyan-300">科技心魔</span>
      </p>
      <div class="p-3 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-400">
        <p class="text-sm text-cyan-200 italic mb-2">
          "{{ characterData.itch }}"
        </p>
        <p class="text-xs text-cyan-300/70">
          這是角色對科技的內在驅動力與偏執，長期壓抑將遠離科技。
        </p>
      </div>
    </div>

    <!-- 身份信念 -->
    <div v-if="characterData.primary_goal" class="mb-4">
      <p class="text-xs font-medium text-blue-400 mb-2 flex items-center">
        <Icon name="lucide:user" class="w-3 h-3 mr-1" />
        身份
        <span class="ml-2 text-xs bg-blue-500/20 px-2 py-1 rounded-full text-blue-300">自我信念</span>
      </p>
      <div class="p-3 bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
        <p class="text-sm text-blue-200 italic mb-2">
          "{{ characterData.primary_goal }}"
        </p>
        <p class="text-xs text-blue-200/70">
          這是角色深信不疑的信念，長期違背將喪失自我。
        </p>
      </div>
    </div>

    <!-- 儀式誡律 -->
    <div v-if="characterData.ritual_concept" class="mb-4">
      <p class="text-xs font-medium text-indigo-400 mb-2 flex items-center">
        <Icon name="lucide:scroll" class="w-3 h-3 mr-1" />
        儀式
        <span class="ml-2 text-xs bg-indigo-500/20 px-2 py-1 rounded-full text-indigo-300">祕源誡律</span>
      </p>
      <div class="p-3 bg-indigo-900/30 rounded-lg border-l-4 border-indigo-400">
        <p class="text-sm text-indigo-200 italic mb-2">
          "{{ characterData.ritual_concept }}"
        </p>
        <p class="text-xs text-indigo-200/70">
          這是必須遵守的要求，否則將與神話漸行漸遠。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  characterData: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* 動機樣式 */
</style>
