<template>
  <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-purple-500/30">
    <h3 class="text-xl font-bold text-purple-300 mb-4">裝備卡</h3>
    <div class="space-y-4">
      <!-- 裝備名稱 -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">裝備名稱</label>
        <input 
          v-model="equipment.name" 
          type="text" 
          class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="輸入裝備名稱"
        />
      </div>

      <!-- 改進與力度 -->
      <div class="grid grid-cols-2 gap-6">
        <div class="text-center">
          <label class="block text-sm font-bold mb-3 text-green-400 tracking-wider">改進</label>
          <div class="flex justify-center space-x-3">
            <div 
              v-for="(improvement, impIndex) in equipment.improvements" 
              :key="impIndex"
              class="flex flex-col items-center space-y-1"
            >
              <div class="relative">
                <input 
                  v-model="improvement.checked"
                  @change="onImprovementChange(impIndex)"
                  type="checkbox"
                  class="w-5 h-5 text-green-600 bg-slate-700 border-2 border-green-500/50 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 hover:border-green-400"
                />
                <div v-if="improvement.checked" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg class="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <span class="text-xs text-green-300 font-medium">{{ impIndex + 1 }}</span>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2 text-blue-400">當前力度</label>
          <div class="flex items-center space-x-2">
            <input 
              v-model.number="equipment.power"
              type="number"
              min="1"
              max="10"
              class="w-16 px-2 py-1 bg-blue-900/30 border border-blue-500/50 rounded text-blue-200 font-bold text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div class="text-xs text-gray-400 mt-1">
            力度數值（1-10）
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
            class="flex items-center space-x-1 p-2 bg-slate-700/30 rounded"
          >
            <input 
              v-model="ability.text"
              type="text" 
              :placeholder="`裝備能力 ${abilityIndex + 1}`"
              class="flex-1 px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:ring-1 focus:ring-purple-500"
            />
            <div class="flex items-center space-x-1">
              <input 
                v-model="ability.isBurned"
                type="checkbox"
                class="w-3 h-3 text-red-600 bg-slate-600 border-slate-500 rounded focus:ring-red-500"
              />
              <label class="text-xs text-red-400">燒</label>
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
            class="bg-red-900/20 border border-red-500/30 rounded p-2"
          >
            <input 
              v-model="weakness.text"
              type="text" 
              :placeholder="`裝備弱點 ${weaknessIndex + 1}`"
              class="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded-md text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- 裝備專長 -->
      <div>
        <label class="block text-sm font-medium mb-2 text-amber-400">裝備專長</label>
        <div class="space-y-2">
          <div 
            v-for="(specialty, index) in equipment.specialties" 
            :key="index"
            class="bg-amber-900/20 border border-amber-500/30 rounded p-2"
          >
            <div class="flex items-center justify-between mb-1">
              <select 
                v-model="specialty.type"
                class="text-xs bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white"
              >
                <option value="">選擇專長類型</option>
                <option 
                  value="deepCustomization" 
                  :disabled="isSpecialtyAlreadySelected('deepCustomization', index)"
                  :class="isSpecialtyAlreadySelected('deepCustomization', index) ? 'text-gray-500' : ''"
                >
                  {{ equipmentSpecialties.deepCustomization.name }}{{ isSpecialtyAlreadySelected('deepCustomization', index) ? ' (已選擇)' : '' }}
                </option>
                <option 
                  value="fullEquipment" 
                  :disabled="isSpecialtyAlreadySelected('fullEquipment', index)"
                  :class="isSpecialtyAlreadySelected('fullEquipment', index) ? 'text-gray-500' : ''"
                >
                  {{ equipmentSpecialties.fullEquipment.name }}{{ isSpecialtyAlreadySelected('fullEquipment', index) ? ' (已選擇)' : '' }}
                </option>
                <option 
                  value="extraCopy" 
                  :disabled="isSpecialtyAlreadySelected('extraCopy', index)"
                  :class="isSpecialtyAlreadySelected('extraCopy', index) ? 'text-gray-500' : ''"
                >
                  {{ equipmentSpecialties.extraCopy.name }}{{ isSpecialtyAlreadySelected('extraCopy', index) ? ' (已選擇)' : '' }}
                </option>
                <option 
                  value="externalCall" 
                  :disabled="isSpecialtyAlreadySelected('externalCall', index)"
                  :class="isSpecialtyAlreadySelected('externalCall', index) ? 'text-gray-500' : ''"
                >
                  {{ equipmentSpecialties.externalCall.name }}{{ isSpecialtyAlreadySelected('externalCall', index) ? ' (已選擇)' : '' }}
                </option>
                <option 
                  value="reuse" 
                  :disabled="isSpecialtyAlreadySelected('reuse', index)"
                  :class="isSpecialtyAlreadySelected('reuse', index) ? 'text-gray-500' : ''"
                >
                  {{ equipmentSpecialties.reuse.name }}{{ isSpecialtyAlreadySelected('reuse', index) ? ' (已選擇)' : '' }}
                </option>
                <option 
                  value="replacementPolicy" 
                  :disabled="isSpecialtyAlreadySelected('replacementPolicy', index)"
                  :class="isSpecialtyAlreadySelected('replacementPolicy', index) ? 'text-gray-500' : ''"
                >
                  {{ equipmentSpecialties.replacementPolicy.name }}{{ isSpecialtyAlreadySelected('replacementPolicy', index) ? ' (已選擇)' : '' }}
                </option>
                <option 
                  value="sharedWealth" 
                  :disabled="isSpecialtyAlreadySelected('sharedWealth', index)"
                  :class="isSpecialtyAlreadySelected('sharedWealth', index) ? 'text-gray-500' : ''"
                >
                  {{ equipmentSpecialties.sharedWealth.name }}{{ isSpecialtyAlreadySelected('sharedWealth', index) ? ' (已選擇)' : '' }}
                </option>
                <option 
                  value="synergisticRevenue" 
                  :disabled="isSpecialtyAlreadySelected('synergisticRevenue', index)"
                  :class="isSpecialtyAlreadySelected('synergisticRevenue', index) ? 'text-gray-500' : ''"
                >
                  {{ equipmentSpecialties.synergisticRevenue.name }}{{ isSpecialtyAlreadySelected('synergisticRevenue', index) ? ' (已選擇)' : '' }}
                </option>
              </select>
              <button 
                @click="removeSpecialty(index)"
                class="text-red-400 hover:text-red-300 text-xs"
              >
                移除
              </button>
            </div>
            <div v-if="specialty.type" class="text-xs text-amber-200">
              {{ getSpecialtyDescription(specialty.type) }}
            </div>
          </div>
          <button 
            @click="addSpecialty"
            class="w-full px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm transition-colors"
          >
            新增裝備專長
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 定義接口
interface Equipment {
  name: string
  improvements: Array<{ checked: boolean }>
  power: number
  abilities: Array<{ text: string; isBurned: boolean }>
  weaknesses: Array<{ text: string }>
  specialties: Array<{ type: string; description?: string }>
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
    name: '',
    improvements: Array(3).fill(null).map(() => ({ checked: false })),
    power: 1,
    abilities: Array(5).fill(null).map(() => ({ text: '', isBurned: false })),
    weaknesses: Array(2).fill(null).map(() => ({ text: '' })),
    specialties: []
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
  'improvement-change': [improvementIndex: number]
  'add-specialty': []
  'remove-specialty': [index: number]
}>()

// 方法
function onImprovementChange(improvementIndex: number) {
  emit('improvement-change', improvementIndex)
}

function addSpecialty() {
  emit('add-specialty')
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
</script>
