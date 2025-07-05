<template>
  <div 
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-purple-500/30">
      <h3 class="text-xl font-bold text-amber-300 mb-4">裝備改進選項</h3>
      <p class="text-sm text-gray-300 mb-4">
        裝備改進已填滿！請選擇一個改進選項。
      </p>
      
      <div class="space-y-4">
        <!-- 永久 +1 力度 -->
        <div class="space-y-2">
          <label class="flex items-center space-x-2">
            <input 
              v-model="modalData.selectedOption" 
              type="radio" 
              value="powerIncrease"
              class="text-amber-600"
            />
            <span class="text-sm text-white">獲得永久 +1 力度</span>
          </label>
          <div v-if="modalData.selectedOption === 'powerIncrease'" class="text-xs text-gray-400 ml-6">
            當前力度：{{ currentPower }} → {{ currentPower + 1 }}
          </div>
        </div>

        <!-- 新增裝備專長 -->
        <div class="space-y-2">
          <label class="flex items-center space-x-2">
            <input 
              v-model="modalData.selectedOption" 
              type="radio" 
              value="newSpecialty"
              class="text-amber-600"
            />
            <span class="text-sm text-white">選擇一個新的裝備主題專長</span>
          </label>
          <div v-if="modalData.selectedOption === 'newSpecialty'" class="space-y-3">
            <select 
              v-model="modalData.selectedSpecialty"
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:ring-2 focus:ring-amber-500"
            >
              <option value="">請選擇專長</option>
              <option 
                v-for="(specialty, key) in equipmentSpecialties" 
                :key="key"
                :value="key"
                :disabled="isSpecialtySelected(key)"
                :class="isSpecialtySelected(key) ? 'text-gray-500' : ''"
              >
                {{ specialty.name }}{{ isSpecialtySelected(key) ? ' (已選擇)' : '' }}
              </option>
            </select>
            
            <!-- 顯示選中專長的描述 -->
            <div v-if="modalData.selectedSpecialty && equipmentSpecialties[modalData.selectedSpecialty]" 
                 class="p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
              <div class="text-sm font-medium text-amber-300 mb-2">
                {{ equipmentSpecialties[modalData.selectedSpecialty].name }}
              </div>
              <div class="text-xs text-amber-200 leading-relaxed">
                {{ equipmentSpecialties[modalData.selectedSpecialty].description }}
              </div>
            </div>
            
            <!-- 專長選擇進度 -->
            <div class="text-xs text-gray-400">
              已選擇專長：{{ getSelectedSpecialtyCount() }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <button 
          @click="$emit('close')"
          class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
        >
          取消
        </button>
        <button 
          @click="$emit('confirm')"
          :disabled="!isValid"
          :class="[
            'px-4 py-2 rounded-lg transition-colors',
            isValid 
              ? 'bg-amber-600 hover:bg-amber-700 text-white' 
              : 'bg-slate-600 text-gray-400 cursor-not-allowed'
          ]"
        >
          確定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 定義接口
interface EquipmentSpecialty {
  name: string
  description: string
}

interface ModalData {
  selectedOption: string
  selectedSpecialty: string
}

interface Props {
  show: boolean
  modalData: ModalData
  currentPower: number
  equipmentSpecialties: Record<string, EquipmentSpecialty>
  currentEquipmentSpecialties?: Array<{ type: string; description?: string }>
}

const props = defineProps<Props>()

// 定義事件
const emit = defineEmits<{
  close: []
  confirm: []
}>()

// 檢查專長是否已被選擇
const isSpecialtySelected = (specialtyKey: string) => {
  if (!props.currentEquipmentSpecialties) return false
  return props.currentEquipmentSpecialties.some(specialty => specialty.type === specialtyKey)
}

// 計算已選擇的專長數量
const getSelectedSpecialtyCount = () => {
  return props.currentEquipmentSpecialties ? props.currentEquipmentSpecialties.length : 0
}

// 計算屬性
const isValid = computed(() => {
  if (props.modalData.selectedOption === 'powerIncrease') {
    return true
  } else if (props.modalData.selectedOption === 'newSpecialty') {
    return props.modalData.selectedSpecialty !== '' && 
           !isSpecialtySelected(props.modalData.selectedSpecialty)
  }
  return false
})
</script>
