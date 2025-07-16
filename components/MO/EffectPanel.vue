<template>
  <transition name="slide-fade">
    <div v-if="show" class="fixed top-0 left-0 h-full w-[420px] max-w-full z-40 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 shadow-2xl border-r border-cyan-500/30 flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-black/60 backdrop-blur sticky top-0 z-10">
        <h2 class="text-xl font-bold text-cyan-100 flex items-center">
          <Icon name="lucide:sparkles" class="w-6 h-6 mr-2 text-cyan-400" />
          效果一覽
        </h2>
        <button @click="$emit('close')" class="text-cyan-300 hover:text-cyan-100 transition-colors">
          <Icon name="lucide:x" class="w-6 h-6" />
        </button>
      </div>
      <!-- Content -->
      <div class="flex-1 overflow-y-auto px-6 py-4 space-y-8 custom-scrollbar">
      <div v-if="loading" class="text-cyan-200 text-center py-8">載入中...</div>
      <div v-else>
        <div v-for="(category, idx) in effects" :key="idx" class="mb-8">
            <h3 class="text-lg font-bold text-purple-200 mb-3 flex items-center">
              <Icon name="lucide:bookmark" class="w-5 h-5 mr-2 text-purple-400" />
              {{ category.category }}
            </h3>
            <div class="space-y-4">
              <div v-for="(action, aidx) in category.actions" :key="aidx" class="bg-gray-800/80 rounded-xl border border-cyan-500/10 p-4 shadow">
                <div class="flex items-center mb-2">
                  <span class="text-cyan-300 font-bold text-base mr-2">{{ action.name_cn }}</span>
                  <span class="text-xs text-gray-400 bg-cyan-900/40 px-2 py-1 rounded ml-2">{{ action.name }}</span>
                </div>
                <div class="text-sm text-cyan-100 mb-1"><span class="font-semibold">範例：</span>{{ action.examples }}</div>
                <div class="text-sm text-cyan-100 mb-1"><span class="font-semibold">說明：</span>{{ action.description }}</div>
                <div class="text-xs text-cyan-400 mt-1"><span class="font-semibold">力度消耗：</span>{{ action.cost }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
 </template>

<script setup>
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['close'])
const effects = ref([])
const loading = ref(true)

function getBasePath() {
  if (process.env.NODE_ENV === 'production') {
    return '/LegendintheMist'
  }
  return ''
}

onMounted(async () => {
  try {
    const basePath = getBasePath()
    const data = await $fetch(`${basePath}/MO/config/effect.json`)
    effects.value = data.effects
  } catch (e) {
    effects.value = []
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(.4,2,.6,1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}

/* 科技感自訂卷軸 */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #38bdf8 #18181b;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
  background: #18181b;
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%);
  border-radius: 8px;
  box-shadow: 0 0 6px #38bdf8cc;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #06b6d4 0%, #a21caf 100%);
}
</style>
