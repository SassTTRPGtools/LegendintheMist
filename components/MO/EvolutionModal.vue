<template>
  <div 
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 border border-purple-500/30 max-h-[90vh] overflow-y-auto">
      <h3 class="text-xl font-bold text-purple-300 mb-4">演化時刻</h3>
      <p class="text-sm text-gray-300 mb-4">
        演化軌跡已填滿！請選擇你的演化時刻升級。完成後會清空演化軌跡。
      </p>
      
      <!-- 演化時刻選擇提示 -->
      <div class="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <div class="text-sm text-blue-200">
          <strong>演化時刻說明：</strong>
          <ul class="mt-2 space-y-1 text-xs">
            <li>• 你可以選擇多個演化時刻升級</li>
            <li>• 「退役」和「總重組」是終極選項，會結束或完全改變當前角色</li>
            <li>• 「獲得老將專長」可以多次選擇</li>
            <li>• 建議為重要的演化時刻填寫描述以記錄角色轉變</li>
          </ul>
        </div>
      </div>
      
      <div class="space-y-6">
        <!-- 演化時刻選項 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-3">選擇演化時刻（可選擇多個）：</label>
          <div class="space-y-3">
            <div 
              v-for="(moment, key) in evolutionMoments" 
              :key="key"
              class="border border-slate-600 rounded-lg p-4 hover:border-purple-500/50 transition-colors relative group"
            >
              <label class="flex items-start space-x-3 cursor-pointer">
                <input 
                  v-model="modalData.selectedMoments" 
                  type="checkbox" 
                  :value="key"
                  class="mt-1 text-purple-600"
                />
                <div class="flex-1">
                  <div class="font-medium text-white">{{ moment.name }}</div>
                  <div class="text-sm text-gray-400 mt-1">{{ moment.description }}</div>
                </div>
                
                <!-- 懸浮說明圖示 -->
                <div class="text-gray-400 hover:text-purple-300 ml-2 relative">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                  </svg>
                  
                  <!-- 懸浮說明視窗 -->
                  <div class="absolute right-0 top-8 w-80 bg-slate-900 border border-purple-500/30 rounded-lg p-3 text-sm text-gray-200 shadow-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div class="font-semibold text-purple-300 mb-2">{{ moment.name }}</div>
                    <div class="text-xs leading-relaxed">{{ moment.description }}</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- 老將專長選擇（當選擇了對應的演化時刻時顯示） -->
        <div v-if="modalData.selectedMoments.includes('veteranSpecialty')">
          <label class="block text-sm font-medium text-gray-300 mb-3">選擇老將專長：</label>
          <div class="relative">
            <select 
              v-model="modalData.selectedVeteranSpecialty"
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">-- 請選擇老將專長 --</option>
              <option 
                v-for="(specialty, key) in veteranSpecialties" 
                :key="key" 
                :value="key"
              >
                {{ specialty.name }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          <!-- 老將專長說明 -->
          <div 
            v-if="modalData.selectedVeteranSpecialty && veteranSpecialties[modalData.selectedVeteranSpecialty]"
            class="mt-2 p-3 bg-slate-700 rounded-md border border-slate-600"
          >
            <div class="text-sm text-gray-300">
              <strong class="text-purple-300">{{ veteranSpecialties[modalData.selectedVeteranSpecialty].name }}：</strong>
              {{ veteranSpecialties[modalData.selectedVeteranSpecialty].description }}
            </div>
          </div>
        </div>

        <!-- 自訂演化描述 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">演化描述（選填）：</label>
          
          <!-- 提示訊息 -->
          <div 
            v-if="needsEvolutionDescription"
            class="mb-2 p-2 bg-amber-900/20 border border-amber-500/30 rounded text-xs text-amber-200"
          >
            <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            建議為你選擇的演化時刻填寫詳細描述，這將有助於記錄角色的重要轉變。
          </div>
          
          <textarea 
            v-model="modalData.customDescription"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent h-20 resize-none text-sm"
            placeholder="描述角色在此次演化時刻的變化..."
          />
        </div>
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <button 
          @click="$emit('close')"
          class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-md transition-colors"
        >
          取消
        </button>
        <button 
          @click="$emit('confirm')"
          :disabled="!isValid"
          :class="[
            'px-4 py-2 rounded-md transition-colors',
            isValid 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-slate-600 text-gray-400 cursor-not-allowed'
          ]"
        >
          確認演化
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 定義接口
interface EvolutionMoment {
  name: string
  description: string
}

interface VeteranSpecialty {
  name: string
  description: string
}

interface ModalData {
  selectedMoments: string[]
  selectedVeteranSpecialty: string
  customDescription: string
}

interface Props {
  show: boolean
  modalData: ModalData
  evolutionMoments: Record<string, EvolutionMoment>
  veteranSpecialties: Record<string, VeteranSpecialty>
}

const props = defineProps<Props>()

// 定義事件
const emit = defineEmits<{
  close: []
  confirm: []
}>()

// 計算屬性
const needsEvolutionDescription = computed(() => {
  return props.modalData.selectedMoments.length > 0
})

const isValid = computed(() => {
  if (props.modalData.selectedMoments.length === 0) {
    return false
  }
  
  // 如果選擇了老將專長，必須選擇具體的專長
  if (props.modalData.selectedMoments.includes('veteranSpecialty') && 
      !props.modalData.selectedVeteranSpecialty) {
    return false
  }
  
  return true
})
</script>
