<template>
  <div 
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-purple-500/30">
      <h3 class="text-xl font-bold text-purple-300 mb-4">
        <span v-if="modalData.isSlowSteadyImprovement">
          穩扎穩打改進 {{ modalData.improvementNumber }}/2
        </span>
        <span v-else-if="modalData.isLevelUpGameImprovement">
          改進你的遊戲 {{ modalData.levelUpGameNumber }}/7
        </span>
        <span v-else>
          主題改進選項
        </span>
      </h3>
      <p class="text-sm text-gray-300 mb-4">
        <span v-if="modalData.isSlowSteadyImprovement">
          穩扎穩打專長：你可以獲得兩個改進，完成後改進軌跡將重設。
          {{ modalData.improvementNumber === 1 ? '請選擇第一個改進：' : '請選擇第二個改進：' }}
        </span>
        <span v-else-if="modalData.isLevelUpGameImprovement">
          改進你的遊戲專長：為選擇的主題卡進行改進。完成7次改進後，改進軌跡將重設。
          請選擇這次的改進選項：
        </span>
        <span v-else>
          改進已填滿！請選擇一個改進選項，完成後會清空改進勾選框並填滿一格演化軌跡。
        </span>
      </p>
      
      <div class="space-y-4">
        <!-- 新增能力標籤 -->
        <div class="space-y-2">
          <label class="flex items-center space-x-2">
            <input 
              v-model="modalData.selectedOption" 
              type="radio" 
              value="newAbility"
              class="text-purple-600"
            />
            <span class="text-sm text-white">創建一個新的能力標籤</span>
          </label>
          <input 
            v-if="modalData.selectedOption === 'newAbility'"
            v-model="modalData.newAbilityText"
            type="text" 
            placeholder="輸入新能力標籤"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <!-- 修改弱點標籤 -->
        <div class="space-y-2">
          <label class="flex items-center space-x-2">
            <input 
              v-model="modalData.selectedOption" 
              type="radio" 
              value="modifyWeakness"
              class="text-purple-600"
            />
            <span class="text-sm text-white">新增、重寫或移除一個弱點標籤</span>
          </label>
          <div v-if="modalData.selectedOption === 'modifyWeakness'" class="space-y-3">
            <!-- 弱點選擇 -->
            <div>
              <label class="block text-xs font-medium text-gray-300 mb-2">選擇要修改的弱點標籤：</label>
              <div class="space-y-2">
                <div 
                  v-for="(weakness, weaknessIndex) in targetCardWeaknesses" 
                  :key="weaknessIndex"
                  class="flex items-center space-x-2"
                >
                  <input 
                    v-model="modalData.selectedWeaknessIndex" 
                    :value="weaknessIndex"
                    type="radio" 
                    :id="`weakness-${weaknessIndex}`"
                    class="text-purple-600"
                  />
                  <label 
                    :for="`weakness-${weaknessIndex}`" 
                    class="flex-1 text-xs p-2 bg-slate-700/50 rounded border cursor-pointer hover:bg-slate-600/50"
                  >
                    <span class="font-medium text-red-300">弱點 {{ weaknessIndex + 1 }}：</span>
                    <span class="text-gray-300">{{ weakness.text || '（空白）' }}</span>
                    <span v-if="weaknessIndex === 0" class="text-xs text-amber-400 ml-2">（不可移除）</span>
                  </label>
                </div>
                <!-- 新增選項 -->
                <div class="flex items-center space-x-2">
                  <input 
                    v-model="modalData.selectedWeaknessIndex" 
                    value="add"
                    type="radio" 
                    id="weakness-add"
                    class="text-purple-600"
                  />
                  <label 
                    for="weakness-add" 
                    class="flex-1 text-xs p-2 bg-green-900/20 border border-green-500/30 rounded cursor-pointer hover:bg-green-800/30"
                  >
                    <span class="font-medium text-green-300">新增新的弱點標籤</span>
                  </label>
                </div>
              </div>
            </div>
            
            <!-- 弱點內容輸入 -->
            <div v-if="modalData.selectedWeaknessIndex !== null">
              <label class="block text-xs font-medium text-gray-300 mb-1">
                {{ weaknessActionLabel }}
              </label>
              <input 
                v-model="modalData.weaknessText"
                type="text" 
                :placeholder="weaknessPlaceholder"
                class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:ring-2 focus:ring-purple-500"
              />
              <div v-if="canRemoveWeakness" class="text-xs text-gray-400 mt-1">
                提示：留空即可移除此弱點標籤
              </div>
            </div>
          </div>
        </div>

        <!-- 選擇主題專長 -->
        <div v-if="hasAvailableSpecialties" class="space-y-2">
          <label class="flex items-center space-x-2">
            <input 
              v-model="modalData.selectedOption" 
              type="radio" 
              value="specialty"
              class="text-purple-600"
            />
            <span class="text-sm text-white">選擇主題專長</span>
          </label>
          <div v-if="modalData.selectedOption === 'specialty'" class="space-y-3">
            <select 
              v-model="modalData.selectedSpecialty"
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="">請選擇專長</option>
              <option 
                v-for="(specialty, key) in availableSpecialties" 
                :key="key"
                :value="key"
                :disabled="specialty.isSelected"
                :class="specialty.isSelected ? 'text-gray-500' : ''"
              >
                {{ specialty.name }}{{ specialty.isSelected ? ' (已選擇)' : '' }}
              </option>
            </select>
            
            <!-- 顯示選中專長的描述 -->
            <div v-if="modalData.selectedSpecialty && availableSpecialties[modalData.selectedSpecialty]" 
                 class="p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
              <div class="text-sm font-medium text-amber-300 mb-2">
                {{ availableSpecialties[modalData.selectedSpecialty].name }}
              </div>
              <div class="text-xs text-amber-200 leading-relaxed">
                {{ availableSpecialties[modalData.selectedSpecialty].description }}
              </div>
            </div>
            
            <!-- 專長選擇進度 -->
            <div class="text-xs text-gray-400">
              已選擇專長：{{ getSelectedSpecialtyCount() }}/5
            </div>
          </div>
        </div>
        <div v-else class="text-xs text-gray-500 italic p-2 bg-slate-700/30 rounded">
          此主題暫無可用專長或已達專長上限 (5/5)
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
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
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
interface Weakness {
  text: string
}

interface Specialty {
  name: string
  description?: string
  isSelected?: boolean
}

interface ModalData {
  selectedOption: string
  cardIndex: number
  newAbilityText: string
  selectedWeaknessIndex: number | string | null
  weaknessText: string
  selectedSpecialty: string
  isSlowSteadyImprovement?: boolean
  improvementNumber?: number
  isLevelUpGameImprovement?: boolean
  levelUpGameNumber?: number
}

interface Props {
  show: boolean
  modalData: ModalData
  targetCardWeaknesses: Weakness[]
  availableSpecialties: Record<string, Specialty>
  hasAvailableSpecialties: boolean
}

const props = defineProps<Props>()

// 定義事件
const emit = defineEmits<{
  close: []
  confirm: []
}>()

// 計算屬性
const weaknessActionLabel = computed(() => {
  if (props.modalData.selectedWeaknessIndex === 'add') {
    return '新增弱點標籤：'
  } else if (props.modalData.selectedWeaknessIndex === 0) {
    return '重寫弱點標籤：'
  } else if (typeof props.modalData.selectedWeaknessIndex === 'number' && props.modalData.selectedWeaknessIndex > 0) {
    return '修改弱點標籤：'
  }
  return '弱點標籤：'
})

const weaknessPlaceholder = computed(() => {
  if (props.modalData.selectedWeaknessIndex === 'add') {
    return '輸入新的弱點標籤'
  } else if (props.modalData.selectedWeaknessIndex === 0) {
    return '重寫第一個弱點標籤'
  } else if (typeof props.modalData.selectedWeaknessIndex === 'number' && props.modalData.selectedWeaknessIndex > 0) {
    return '修改弱點標籤（留空移除）'
  }
  return '輸入弱點標籤'
})

const canRemoveWeakness = computed(() => {
  return typeof props.modalData.selectedWeaknessIndex === 'number' && props.modalData.selectedWeaknessIndex > 0
})

const isValid = computed(() => {
  if (props.modalData.selectedOption === 'newAbility') {
    return props.modalData.newAbilityText.trim() !== ''
  } else if (props.modalData.selectedOption === 'modifyWeakness') {
    return props.modalData.selectedWeaknessIndex !== null
  } else if (props.modalData.selectedOption === 'specialty') {
    return props.modalData.selectedSpecialty !== '' && 
           props.availableSpecialties[props.modalData.selectedSpecialty] &&
           !props.availableSpecialties[props.modalData.selectedSpecialty].isSelected
  }
  return false
})

// 計算已選擇的專長數量
const getSelectedSpecialtyCount = () => {
  return Object.values(props.availableSpecialties).filter(specialty => specialty.isSelected).length
}
</script>
