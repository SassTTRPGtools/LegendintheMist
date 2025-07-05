<template>
  <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border boconst props = withDefaults(defineProps<Props>(), {
  character: () => ({
    name: '',
    background: '',
    evolutionTrack: Array(5).fill(false),
    evolutionHistory: []
  })
})

// 定義事件
const emit = defineEmits<{
  'toggle-evolution-step': [index: number]
  'show-evolution-history': []
}>()

// 方法
function showEvolutionHistory() {
  emit('show-evolution-history')
}500/30">
    <h3 class="text-xl font-bold text-purple-300 mb-4">角色資訊</h3>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">角色名稱</label>
        <input 
          v-model="character.name" 
          type="text" 
          class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="輸入角色名稱"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">背景描述</label>
        <textarea 
          v-model="character.background" 
          class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent h-20 resize-none"
          placeholder="角色的背景故事..."
        />
      </div>
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="block text-sm font-medium text-gray-300">演化軌跡</label>
          <button 
            @click="emit('show-evolution-history')"
            class="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>查看演化歷史</span>
          </button>
        </div>
        <div class="flex space-x-2">
          <div 
            v-for="(step, index) in character.evolutionTrack" 
            :key="index"
            @click="$emit('toggle-evolution-step', index)"
            :class="[
              'w-6 h-6 border-2 rounded flex items-center justify-center text-xs font-bold cursor-pointer transition-colors hover:border-purple-300',
              step ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-700 border-slate-600 text-gray-400 hover:bg-slate-600'
            ]"
          >
            {{ step ? '●' : '○' }}
          </div>
        </div>
        <div class="text-xs text-gray-400 mt-1">
          演化進度：{{ evolutionProgress }}/5
          <span v-if="character.evolutionHistory && character.evolutionHistory.length > 0" class="ml-2">
            • 已完成演化：{{ character.evolutionHistory.length }} 次
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 定義接口
interface EvolutionRecord {
  date: string
  moments: any[]
  veteranSpecialty: any | null
  customDescription: string
}

interface Character {
  name: string
  background: string
  evolutionTrack: boolean[]
  evolutionHistory?: EvolutionRecord[]
}

interface Props {
  character: Character
}

const props = withDefaults(defineProps<Props>(), {
  character: () => ({
    name: '',
    background: '',
    evolutionTrack: Array(5).fill(false),
    evolutionHistory: []
  })
})

// 定義事件
const emit = defineEmits<{
  'toggle-evolution-step': [index: number]
  'show-evolution-history': []
}>()

// 計算屬性
const evolutionProgress = computed(() => {
  if (!props.character?.evolutionTrack) return 0
  return props.character.evolutionTrack.filter(Boolean).length
})
</script>
