<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pb-12">
    <div class="max-w-4xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-cyan-200 mb-8 flex items-center">
        <Icon name="lucide:sparkles" class="w-8 h-8 mr-3 text-cyan-400" />
        效果一覽
      </h1>
      <div v-if="isLoading" class="text-cyan-300 text-center py-10 text-lg">載入中...</div>
      <div v-else>
        <div v-for="(effect, idx) in effects" :key="idx" class="mb-8">
          <div class="bg-gray-800 rounded-xl shadow-lg border border-cyan-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-cyan-600 to-purple-600 p-4 flex items-center">
              <Icon name="lucide:zap" class="w-5 h-5 mr-2 text-cyan-300" />
              <span class="text-xl font-bold text-white">{{ effect.category }}</span>
            </div>
            <div class="p-4 space-y-4">
              <div v-if="effect.actions && effect.actions.length > 0">
                <div v-for="(action, aidx) in effect.actions" :key="aidx" class="bg-gray-900/70 rounded-lg px-4 py-3 border border-cyan-500/10 flex items-center">
                  <Icon name="lucide:chevron-right" class="w-4 h-4 text-cyan-400 mr-2" />
                  <span class="text-cyan-100 text-base">{{ action.cost }}</span>
                </div>
              </div>
              <div v-else class="text-gray-400 italic">（此分類暫無細項說明）</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const effects = ref<any[]>([])
const isLoading = ref(true)

function getBasePath() {
  if (process.env.NODE_ENV === 'production') {
    return '/LegendintheMist'
  }
  return ''
}

onMounted(async () => {
  try {
    const basePath = getBasePath()
    const data = await $fetch(`${basePath}/MO/config/effect.json`) as any
    effects.value = data.effects || []
  } catch (e) {
    effects.value = []
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #6d28d9 100%);
}
</style>
