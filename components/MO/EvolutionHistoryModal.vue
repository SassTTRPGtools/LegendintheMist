<template>
  <div 
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 border border-purple-500/30 max-h-[80vh] overflow-y-auto">
      <h3 class="text-xl font-bold text-purple-300 mb-4 flex items-center">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        演化歷史記錄
      </h3>
      
      <div v-if="evolutionHistory && evolutionHistory.length > 0" class="space-y-4">
        <div 
          v-for="(evolution, index) in evolutionHistory" 
          :key="index"
          class="bg-slate-700/50 rounded-lg p-4 border border-purple-500/20"
        >
          <!-- 演化記錄標題 -->
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <h4 class="text-lg font-medium text-purple-200 mb-1">
                演化 #{{ index + 1 }}
              </h4>
              <p class="text-xs text-gray-400">
                {{ formatDate(evolution.date) }}
              </p>
            </div>
            <button 
              @click="editEvolution(index)"
              class="text-purple-400 hover:text-purple-300 text-sm transition-colors"
            >
              編輯描述
            </button>
          </div>

          <!-- 演化時刻列表 -->
          <div class="mb-3">
            <h5 class="text-sm font-medium text-amber-300 mb-2">選擇的演化時刻：</h5>
            <div class="space-y-2">
              <div 
                v-for="moment in evolution.moments" 
                :key="moment.key"
                class="bg-amber-900/20 border border-amber-500/30 rounded p-2"
              >
                <div class="text-sm font-medium text-amber-200">{{ moment.name }}</div>
                <div class="text-xs text-amber-100 mt-1 opacity-80 whitespace-pre-line">{{ moment.description }}</div>
              </div>
            </div>
          </div>

          <!-- 老將專長 -->
          <div v-if="evolution.veteranSpecialty" class="mb-3">
            <h5 class="text-sm font-medium text-green-300 mb-2">獲得的老將專長：</h5>
            <div class="bg-green-900/20 border border-green-500/30 rounded p-2">
              <div class="text-sm font-medium text-green-200">{{ evolution.veteranSpecialty.name }}</div>
              <div class="text-xs text-green-100 mt-1 opacity-80">{{ evolution.veteranSpecialty.description }}</div>
            </div>
          </div>

          <!-- 自定義描述 -->
          <div>
            <h5 class="text-sm font-medium text-blue-300 mb-2">演化描述：</h5>
            <div v-if="editingIndex === index" class="space-y-2">
              <textarea 
                v-model="editingDescription"
                class="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows="3"
                placeholder="描述這次演化的詳細情況..."
              />
              <div class="flex space-x-2">
                <button 
                  @click="saveDescription(index)"
                  class="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition-colors"
                >
                  保存
                </button>
                <button 
                  @click="cancelEdit"
                  class="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded text-sm transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
            <div v-else class="bg-blue-900/20 border border-blue-500/30 rounded p-2">
              <div class="text-sm text-blue-100">
                {{ evolution.customDescription || '尚無詳細描述' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 無演化記錄時的提示 -->
      <div v-else class="text-center py-8">
        <svg class="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h4 class="text-lg font-medium text-gray-400 mb-2">尚無演化記錄</h4>
        <p class="text-gray-500">當演化軌跡填滿時，將會記錄演化選擇</p>
      </div>

      <!-- 關閉按鈕 -->
      <div class="flex justify-end mt-6">
        <button 
          @click="$emit('close')"
          class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
        >
          關閉
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定義接口
interface EvolutionMoment {
  key: string
  name: string
  description: string
}

interface VeteranSpecialty {
  key: string
  name: string
  description: string
}

interface EvolutionRecord {
  date: string
  moments: EvolutionMoment[]
  veteranSpecialty: VeteranSpecialty | null
  customDescription: string
}

interface Props {
  show: boolean
  evolutionHistory: EvolutionRecord[]
}

const props = defineProps<Props>()

// 定義事件
const emit = defineEmits<{
  close: []
  'update-description': [index: number, description: string]
}>()

// 響應式數據
const editingIndex = ref<number | null>(null)
const editingDescription = ref('')

// 方法
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

function editEvolution(index: number) {
  editingIndex.value = index
  editingDescription.value = props.evolutionHistory[index].customDescription || ''
}

function saveDescription(index: number) {
  emit('update-description', index, editingDescription.value)
  editingIndex.value = null
  editingDescription.value = ''
}

function cancelEdit() {
  editingIndex.value = null
  editingDescription.value = ''
}
</script>
