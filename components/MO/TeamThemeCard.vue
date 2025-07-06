<template>
  <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-purple-500/30">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-purple-300">團隊主題</h3>
      <button 
        @click="$emit('toggle-edit')"
        :class="[
          'px-4 py-1 rounded text-xs transition-colors min-w-[60px] flex items-center justify-center flex-shrink-0',
          teamThemeCard.isEditing 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        ]"
      >
        {{ teamThemeCard.isEditing ? '完成' : '編輯' }}
      </button>
    </div>
    
    <div class="space-y-4">
      <!-- 改進軌跡和衰變軌跡 -->
      <div class="mb-4">
        <div class="flex justify-center space-x-6">
          <!-- 改進軌跡 -->
          <div class="flex flex-col items-center">
            <label class="block text-xs font-medium text-gray-300 mb-1">改進軌跡</label>
            <div class="flex space-x-1">
              <button
                v-for="(improvement, index) in teamThemeCard.improvements"
                :key="index"
                @click="toggleImprovement(index)"
                :class="[
                  'w-6 h-6 border border-gray-500 rounded flex items-center justify-center text-xs font-bold transition-colors',
                  improvement.checked 
                  ? 'bg-purple-600 border-purple-400 text-white' 
                  : 'bg-slate-700 border-slate-600 text-gray-400 hover:border-purple-500'
              ]"
            >
              {{ improvement.checked ? '●' : '○' }}
            </button>
          </div>
        </div>

        <!-- 衰變軌跡 -->
        <div class="flex flex-col items-center">
          <label class="block text-xs font-medium text-gray-300 mb-1">衰變軌跡</label>
          <div class="flex space-x-1">
            <button
              v-for="(decay, index) in teamThemeCard.decays"
              :key="index"
              @click="toggleDecay(index)"
              :class="[
                'w-6 h-6 border border-gray-500 rounded flex items-center justify-center text-xs font-bold transition-colors',
                decay.checked 
                  ? 'bg-red-600 border-red-400 text-white' 
                  : 'bg-slate-700 border-slate-600 text-gray-400 hover:border-red-500'
              ]"
            >
              {{ decay.checked ? '●' : '○' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 能力標籤區域 -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-300 mb-2">能力標籤</label>
      <div class="grid grid-cols-1 gap-2">
        <div 
          v-for="(ability, index) in teamThemeCard.abilities" 
          :key="index"
          class="flex items-center space-x-2"
        >

          
          <input 
            v-if="teamThemeCard.isEditing"
            v-model="ability.text"
            type="text" 
            :placeholder="`能力標籤 ${index + 1}`"
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
            {{ ability.text.trim() || `能力標籤 ${index + 1}` }}
          </span>
          
          <!-- 燒毀狀態切換 -->
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

    <!-- 弱點標籤區域 -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-300 mb-2">弱點標籤</label>
      <div class="grid grid-cols-1 gap-2">
        <div 
          v-for="(weakness, index) in teamThemeCard.weaknesses" 
          :key="index"
          class="flex items-center space-x-2"
        >

          
          <input 
            v-if="teamThemeCard.isEditing"
            v-model="weakness.text"
            type="text" 
            :placeholder="`弱點標籤 ${index + 1}`"
            class="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <span 
            v-else 
            :class="[
              'flex-1 px-2 py-1 text-sm rounded',
              weakness.text.trim() 
                ? 'text-white bg-slate-700/50' 
                : 'text-gray-500 bg-slate-700/30 italic'
            ]"
          >
            {{ weakness.text.trim() || `弱點標籤 ${index + 1}` }}
          </span>
        </div>
      </div>
    </div>

    <!-- 主題專長區域 -->
    <div class="mb-6">
      <div class="mb-3 flex items-center justify-between">
        <div>
          <span class="text-sm font-medium text-gray-300">主題專長</span>
          <span class="text-xs text-gray-400 ml-1">
            ({{ getValidSpecialtiesCount() }}/5)
          </span>
        </div>
        <button
          v-if="teamThemeCard.isEditing && getValidSpecialtiesCount() < 5"
          @click="addSpecialty"
          class="px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs border border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-400/50 transition-all duration-200"
        >
          + 新增專長
        </button>
      </div>
      
      <!-- 編輯模式：專長編輯列表 -->
      <div v-if="teamThemeCard.isEditing" class="space-y-3">
        <div 
          v-for="(specialty, index) in teamThemeCard.customSpecialties" 
          :key="index"
          class="p-3 bg-slate-700/20 rounded-lg border border-slate-600/30"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex-1 space-y-2">
              <input
                v-model="specialty.name"
                type="text"
                placeholder="專長名稱"
                class="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <textarea
                v-model="specialty.description"
                placeholder="專長描述"
                rows="2"
                class="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              ></textarea>
            </div>
            <button
              @click="removeSpecialty(index)"
              class="ml-2 w-6 h-6 bg-red-600/20 text-red-300 rounded border border-red-500/30 hover:bg-red-500/30 hover:border-red-400/50 transition-all duration-200 flex items-center justify-center text-xs"
              title="刪除專長"
            >
              ×
            </button>
          </div>
          
          <!-- 編輯模式下的預覽 -->
          <div v-if="specialty.name?.trim() && specialty.description?.trim()" class="mt-2">
            <SpecialtyTooltip
              :name="specialty.name"
              :description="specialty.description"
            >
              <span class="inline-flex items-center px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs cursor-help border border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-400/50 hover:text-amber-200 transition-all duration-200">
                {{ specialty.name }} (預覽)
              </span>
            </SpecialtyTooltip>
          </div>
        </div>
        
        <!-- 編輯模式提示 -->
        <div v-if="teamThemeCard.customSpecialties.length === 0" class="text-center py-4 text-gray-400 bg-slate-700/10 rounded-lg border border-slate-600/20">
          <p class="text-sm">點擊「新增專長」來添加團隊專長</p>
          <p class="text-xs mt-1">團隊最多可擁有 5 個自定義專長</p>
        </div>
      </div>
      
      <!-- 顯示模式：專長標籤 -->
      <div v-else>
        <div v-if="getValidSpecialtiesCount() > 0" 
             class="mt-2 p-3 bg-slate-700/20 rounded-lg border border-slate-600/30">
          <div class="flex flex-wrap gap-2">
            <SpecialtyTooltip
              v-for="(specialty, index) in getValidSpecialties()" 
              :key="index"
              :name="specialty.name"
              :description="specialty.description"
            >
              <span 
                class="inline-flex items-center px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs cursor-help border border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-400/50 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-200 relative overflow-hidden group"
              >
                <!-- 科技感背景效果 -->
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="relative z-10">{{ specialty.name }}</div>
              </span>
            </SpecialtyTooltip>
          </div>
        </div>
        
        <div v-else class="mt-2 text-sm text-gray-400 italic p-3 bg-slate-700/10 rounded-lg border border-slate-600/20 text-center">
          尚未設定團隊專長
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import SpecialtyTooltip from './SpecialtyTooltip.vue'

// 定義介面
interface TeamThemeCard {
  abilities: Array<{ text: string; isBurned: boolean }>
  weaknesses: Array<{ text: string }>
  customSpecialties: Array<{ name: string; description: string }>
  improvements: Array<{ checked: boolean }>
  decays: Array<{ checked: boolean }>
  isEditing: boolean
}

interface Props {
  teamThemeCard: TeamThemeCard
}

const props = defineProps<Props>()

// 定義事件
const emit = defineEmits<{
  'toggle-edit': []
  'improvement-change': [index: number]
  'decay-change': [index: number]
}>()

// 組件掛載時的調試輸出
onMounted(() => {
  console.log('=== TeamThemeCard 組件已掛載 ===')
  console.log('TeamThemeCard props:', {
    teamThemeCard: props.teamThemeCard,
    customSpecialties: props.teamThemeCard?.customSpecialties,
    specialtiesCount: props.teamThemeCard?.customSpecialties?.length || 0
  })
  
  // 確保 customSpecialties 陣列存在
  if (!props.teamThemeCard.customSpecialties) {
    console.log('初始化 customSpecialties 陣列')
    props.teamThemeCard.customSpecialties = []
  }
  
  console.log('TeamThemeCard 當前專長:', getValidSpecialties())
})

// 獲取有效專長數量
const getValidSpecialtiesCount = () => {
  console.log('=== TeamThemeCard getValidSpecialtiesCount 被調用 ===')
  if (!props.teamThemeCard?.customSpecialties) {
    console.log('❌ customSpecialties 不存在')
    return 0
  }
  
  const validCount = props.teamThemeCard.customSpecialties.filter(specialty => 
    specialty && (specialty.name?.trim() || specialty.description?.trim())
  ).length
  
  console.log('✅ 有效專長數量:', validCount)
  return validCount
}

// 獲取有效專長列表
const getValidSpecialties = () => {
  console.log('=== TeamThemeCard getValidSpecialties 被調用 ===')
  if (!props.teamThemeCard?.customSpecialties) {
    console.log('❌ customSpecialties 不存在')
    return []
  }
  
  const validSpecialties = props.teamThemeCard.customSpecialties.filter(specialty => 
    specialty && specialty.name?.trim() && specialty.description?.trim()
  )
  
  console.log('✅ 有效專長列表:', validSpecialties)
  return validSpecialties
}

// 新增專長
function addSpecialty() {
  console.log('=== 新增專長 ===')
  if (!props.teamThemeCard.customSpecialties) {
    props.teamThemeCard.customSpecialties = []
  }
  
  if (props.teamThemeCard.customSpecialties.length < 5) {
    const newSpecialty = {
      name: '',
      description: ''
    }
    props.teamThemeCard.customSpecialties.push(newSpecialty)
    console.log('✅ 專長已新增:', newSpecialty)
    console.log('當前專長列表:', props.teamThemeCard.customSpecialties)
  } else {
    console.log('❌ 已達到專長數量上限 (5)')
  }
}

// 移除專長
function removeSpecialty(index: number) {
  console.log('=== 移除專長 ===', { index })
  if (props.teamThemeCard.customSpecialties && index >= 0 && index < props.teamThemeCard.customSpecialties.length) {
    const removedSpecialty = props.teamThemeCard.customSpecialties[index]
    props.teamThemeCard.customSpecialties.splice(index, 1)
    console.log('✅ 專長已移除:', removedSpecialty)
    console.log('當前專長列表:', props.teamThemeCard.customSpecialties)
  } else {
    console.log('❌ 無效的專長索引:', index)
  }
}

// 切換改進軌跡
function toggleImprovement(index: number) {
  props.teamThemeCard.improvements[index].checked = !props.teamThemeCard.improvements[index].checked
  
  // 檢查是否所有改進都被勾選
  const allChecked = props.teamThemeCard.improvements.every(imp => imp.checked)
  if (allChecked) {
    emit('improvement-change', index)
  }
}

// 切換衰變軌跡
function toggleDecay(index: number) {
  props.teamThemeCard.decays[index].checked = !props.teamThemeCard.decays[index].checked
  
  // 檢查是否所有衰變都被勾選
  const allChecked = props.teamThemeCard.decays.every(decay => decay.checked)
  if (allChecked) {
    emit('decay-change', index)
  }
}
</script>
