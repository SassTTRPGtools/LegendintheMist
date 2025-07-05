<template>
  <div 
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-slate-800 rounded-lg p-6 max-w-lg w-full mx-4 border border-red-500/30">
      <h3 class="text-xl font-bold text-red-300 mb-4">主題失去</h3>
      <div class="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-4">
        <p class="text-sm text-red-200 mb-3 font-semibold">
          你已失去主題，請進行以下紀錄：
        </p>
        
        <div class="space-y-2 text-sm text-gray-300">
          <div class="flex justify-between items-center">
            <span>• 失去主題：</span>
            <span class="text-red-300 font-medium">{{ decayData.lostTheme }}</span>
          </div>
          
          <div v-if="decayData.lostAbilities.length > 0">
            <div class="flex justify-between items-center">
              <span>• 失去前三個能力標籤：</span>
              <span class="text-amber-300">{{ decayData.lostAbilities.length }} 個</span>
            </div>
            <div class="ml-4 text-xs text-gray-400">
              <div v-for="(ability, index) in decayData.lostAbilities" :key="index">
                {{ index + 1 }}. {{ ability || '（空白）' }}
              </div>
            </div>
          </div>
          
          <div v-if="decayData.lostWeaknesses.length > 0">
            <div class="flex justify-between items-center">
              <span>• 失去額外弱點標籤：</span>
              <span class="text-amber-300">{{ decayData.lostWeaknesses.length }} 個</span>
            </div>
            <div class="ml-4 text-xs text-gray-400">
              <div v-for="(weakness, index) in decayData.lostWeaknesses" :key="index">
                {{ index + 2 }}. {{ weakness || '（空白）' }}
              </div>
            </div>
          </div>
          
          <div v-if="decayData.lostSpecialty">
            <div class="flex justify-between items-center">
              <span>• 失去主題專長：</span>
              <span class="text-amber-300">1 個</span>
            </div>
            <div class="ml-4 text-xs text-gray-400">
              {{ decayData.lostSpecialty }}
            </div>
          </div>
          
          <div class="border-t border-red-500/30 pt-2 mt-3">
            <div class="flex justify-between items-center font-semibold">
              <span class="text-purple-300">總演化點數：</span>
              <span class="text-purple-200">{{ decayData.evolutionPoints }} 點</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-3">
        <button 
          @click="$emit('close')"
          class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
        >
          取消
        </button>
        <button 
          @click="$emit('confirm')"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          確認失去主題
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 定義接口
interface DecayData {
  lostTheme: string
  lostAbilities: string[]
  lostWeaknesses: string[]
  lostSpecialty: string
  evolutionPoints: number
}

interface Props {
  show: boolean
  decayData: DecayData
}

const props = defineProps<Props>()

// 定義事件
const emit = defineEmits<{
  close: []
  confirm: []
}>()
</script>
