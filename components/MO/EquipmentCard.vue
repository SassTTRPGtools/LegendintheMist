<template>
  <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-purple-500/30">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-purple-300">裝備卡</h3>
      <button 
        @click="$emit('toggle-edit')"
        :class="[
          'px-4 py-1 rounded text-xs transition-colors min-w-[60px] flex items-center justify-center flex-shrink-0',
          equipment.isEditing 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        ]"
      >
        {{ equipment.isEditing ? '完成' : '編輯' }}
      </button>
    </div>
    
    <div class="space-y-4">
      <!-- 改進軌跡與力度 -->
      <div class="mb-4">
        <div class="flex justify-center space-x-6">
          <!-- 改進軌跡 -->
          <div class="flex flex-col items-center">
            <label class="block text-xs font-medium text-gray-300 mb-1">改進軌跡</label>
            <div class="flex space-x-1">
              <button
                v-for="(improvement, index) in equipment.improvements"
                :key="index"
                @click="toggleImprovement(index)"
                :class="[
                  'w-6 h-6 border border-gray-500 rounded flex items-center justify-center text-xs font-bold transition-colors',
                  improvement.checked 
                    ? 'bg-green-600 border-green-400 text-white' 
                    : 'bg-slate-700 border-slate-600 text-gray-400 hover:border-green-500'
                ]"
              >
                {{ improvement.checked ? '●' : '○' }}
              </button>
            </div>
          </div>

          <!-- 力度 -->
          <div class="flex flex-col items-center">
            <label class="block text-xs font-medium text-gray-300 mb-1">當前力度</label>
            <div class="flex items-center space-x-2">
              <input 
                v-model.number="equipment.power"
                type="number"
                min="1"
                max="10"
                class="w-12 h-6 px-1 bg-blue-900/30 border border-blue-500/50 rounded text-blue-200 font-bold text-center text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 能力標籤 -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">能力標籤</label>
        <div class="space-y-2">
          <div 
            v-for="(ability, abilityIndex) in equipment.abilities" 
            :key="abilityIndex"
            class="flex items-center space-x-2"
          >

            <input 
              v-if="equipment.isEditing"
              v-model="ability.text"
              type="text" 
              :placeholder="`裝備能力 ${abilityIndex + 1}`"
              class="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <span 
              v-else 
              :class="[
                'flex-1 px-2 py-1 text-sm rounded',
                ability.text.trim() 
                  ? 'text-white bg-slate-700/50' 
                  : 'text-gray-500 bg-slate-700/30 italic',
                ability.isBurned ? 'line-through opacity-50' : ''
              ]"
            >
              {{ ability.text.trim() || `裝備能力 ${abilityIndex + 1}` }}
            </span>
            
            <div class="flex items-center">
              <button
                @click="ability.isBurned = !ability.isBurned"
                :class="[
                  'w-6 h-6 rounded-full flex items-center justify-center transition-colors',
                  ability.isBurned 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg' 
                    : 'bg-slate-600 hover:bg-slate-700 text-gray-300'
                ]"
                :title="ability.isBurned ? '點擊恢復能力' : '點擊燒毀能力'"
              >
                <Icon 
                  v-if="ability.isBurned" 
                  name="lucide:flame" 
                  class="w-3 h-3 text-yellow-200" 
                />
                <Icon 
                  v-else 
                  name="lucide:circle" 
                  class="w-3 h-3 text-gray-400" 
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 弱點標籤 -->
      <div>
        <label class="block text-sm font-medium mb-2 text-red-400">弱點標籤</label>
        <div class="space-y-2">
          <div 
            v-for="(weakness, weaknessIndex) in equipment.weaknesses" 
            :key="weaknessIndex"
            class="flex items-center space-x-2"
          >

            <input 
              v-if="equipment.isEditing"
              v-model="weakness.text"
              type="text" 
              :placeholder="`裝備弱點 ${weaknessIndex + 1}`"
              class="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <span 
              v-else 
              :class="[
                'flex-1 px-2 py-1 text-sm rounded',
                weakness.text.trim() 
                  ? 'text-white bg-red-900/20 border border-red-500/30' 
                  : 'text-gray-500 bg-slate-700/30 italic border border-slate-600/50'
              ]"
            >
              {{ weakness.text.trim() || `裝備弱點 ${weaknessIndex + 1}` }}
            </span>
          </div>
        </div>
      </div>

      <!-- 裝備專長 -->
      <div>
        <div class="mb-3">
          <span class="text-sm font-medium text-amber-400">裝備專長</span>
          <span class="text-xs text-gray-400 ml-1">
            ({{ getValidEquipmentSpecialtiesCount() }})
          </span>
        </div>
        
        <div v-if="getValidEquipmentSpecialtiesCount() > 0" 
             class="mt-2 p-3 bg-amber-900/20 rounded-lg border border-amber-500/30">
          <div class="flex flex-wrap gap-2">
            <SpecialtyTooltip
              v-for="(specialty, index) in getValidEquipmentSpecialties()" 
              :key="index"
              :name="getEquipmentSpecialtyName(specialty)"
              :description="getEquipmentSpecialtyDescription(specialty)"
            >
              <span 
                class="inline-flex items-center px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs cursor-help border border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-400/50 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-200 relative overflow-hidden group"
              >
                <!-- 科技感背景效果 -->
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="relative z-10">{{ getEquipmentSpecialtyName(specialty) }}</div>
              </span>
            </SpecialtyTooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import SpecialtyTooltip from './SpecialtyTooltip.vue'

// 定義接口
interface Equipment {
  improvements: Array<{ checked: boolean }>
  power: number
  abilities: Array<{ text: string; isBurned: boolean }>
  weaknesses: Array<{ text: string }>
  specialties: Array<{ type: string; description?: string }>
  isEditing: boolean
}

interface EquipmentSpecialty {
  name: string
  description: string
}

interface Props {
  equipment: Equipment
  equipmentSpecialties: Record<string, EquipmentSpecialty>
}

const props = withDefaults(defineProps<Props>(), {
  equipment: () => ({
    improvements: Array(3).fill(null).map(() => ({ checked: false })),
    power: 1,
    abilities: Array(7).fill(null).map(() => ({ text: '', isBurned: false })),
    weaknesses: Array(2).fill(null).map(() => ({ text: '' })),
    specialties: [],
    isEditing: false
  }),
  equipmentSpecialties: () => ({
    deepCustomization: {
      name: '深度客製化',
      description: '選擇你裝備主題中的一件物品。每次休整時，你可新增一個代表該物品特定功能或附加效果的裝備標籤，此標籤可於特定條件或用途下使用。'
    },
    fullEquipment: {
      name: '全套設備',
      description: '選擇街頭目錄中的一個類別。你現在擁有該類別所有標籤，並能在裝備裝載時任意啟用。可多次選擇不同類別。'
    },
    extraCopy: {
      name: '額外複製',
      description: '每場遊戲一次，你可複製一個非唯一物品的裝備標籤，分別給隊友或盟友使用，自己仍保有該標籤。'
    },
    externalCall: {
      name: '外部呼叫',
      description: '每場戲一次，當你擲出同組裝備標籤中三個或以上的標籤，且擲出失敗（6-）時，可改為部分成功（7-9）或強烈成功（10+）。'
    },
    reuse: {
      name: '重複使用',
      description: '於裝載裝備開始與結束之間，你可重寫某個裝備標籤。此標籤將保留為新版。'
    },
    replacementPolicy: {
      name: '替換政策',
      description: '當你的裝備標籤被燒毀時，你可以立即創建一個新的裝備標籤來替代它。'
    },
    sharedWealth: {
      name: '共享財富',
      description: '你可以將你的裝備標籤借給其他玩家角色使用，他們在使用時視為擁有該標籤。'
    },
    synergisticRevenue: {
      name: '協同收益',
      description: '當你與其他角色共同使用裝備標籤時，雙方都獲得+1前進修正。'
    }
  })
})

// 定義事件
const emit = defineEmits<{
  'toggle-edit': []
  'improvement-change': [improvementIndex: number]
  'add-specialty': []
  'remove-specialty': [index: number]
}>()

// 獲取有效裝備專長數量
const getValidEquipmentSpecialtiesCount = () => {
  console.log('EquipmentCard: getValidEquipmentSpecialtiesCount called with equipment:', props.equipment)
  
  if (!props.equipment?.specialties) {
    console.log('EquipmentCard: equipment or specialties is null')
    return 0
  }
  
  const validSpecialties = props.equipment.specialties.filter(specialty => 
    specialty && specialty.type && specialty.type.trim()
  )
  
  console.log('EquipmentCard: specialties analysis:', {
    rawSpecialties: props.equipment.specialties,
    validSpecialties: validSpecialties,
    count: validSpecialties.length
  })
  
  return validSpecialties.length
}

// 獲取有效裝備專長列表
const getValidEquipmentSpecialties = () => {
  if (!props.equipment?.specialties) return []
  return props.equipment.specialties.filter(specialty => 
    specialty && specialty.type && specialty.type.trim()
  )
}

// 獲取裝備專長名稱
const getEquipmentSpecialtyName = (specialty: any) => {
  if (!specialty?.type) return '未知專長'
  const specialtyData = props.equipmentSpecialties[specialty.type]
  return specialtyData?.name || specialty.type || '未知專長'
}

// 獲取裝備專長描述
const getEquipmentSpecialtyDescription = (specialty: any) => {
  if (!specialty?.type) return '專長描述不存在'
  const specialtyData = props.equipmentSpecialties[specialty.type]
  return specialtyData?.description || specialty.description || '專長描述不存在'
}

// 方法
function onImprovementChange(improvementIndex: number) {
  emit('improvement-change', improvementIndex)
}

// 切換改進軌跡
function toggleImprovement(index: number) {
  props.equipment.improvements[index].checked = !props.equipment.improvements[index].checked
  
  // 檢查是否所有改進都被勾選
  const allChecked = props.equipment.improvements.every(imp => imp.checked)
  if (allChecked) {
    onImprovementChange(index)
  }
}

function removeSpecialty(index: number) {
  emit('remove-specialty', index)
}

function getSpecialtyDescription(type: string) {
  const specialty = props.equipmentSpecialties[type]
  return specialty ? specialty.description : ''
}

// 檢查專長是否已被其他項目選擇
function isSpecialtyAlreadySelected(specialtyType: string, currentIndex: number) {
  return props.equipment.specialties.some((specialty, index) => 
    specialty.type === specialtyType && index !== currentIndex
  )
}

// 組件掛載時的調試輸出
onMounted(() => {
  console.log('EquipmentCard mounted with props:', {
    equipment: props.equipment,
    specialties: props.equipment?.specialties,
    equipmentSpecialties: props.equipmentSpecialties
  })
})
</script>
