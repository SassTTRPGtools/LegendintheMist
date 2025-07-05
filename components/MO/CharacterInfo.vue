<template>
  <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-purple-500/30">
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
        <label class="block text-sm font-medium text-gray-300 mb-2">演化軌跡</label>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 定義接口
interface Character {
  name: string
  background: string
  evolutionTrack: boolean[]
}

interface Props {
  character: Character
}

const props = withDefaults(defineProps<Props>(), {
  character: () => ({
    name: '',
    background: '',
    evolutionTrack: Array(5).fill(false)
  })
})

// 定義事件
const emit = defineEmits<{
  'toggle-evolution-step': [index: number]
}>()

// 計算屬性
const evolutionProgress = computed(() => {
  if (!props.character?.evolutionTrack) return 0
  return props.character.evolutionTrack.filter(Boolean).length
})
</script>
