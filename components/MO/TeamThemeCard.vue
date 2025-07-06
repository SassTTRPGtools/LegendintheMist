<template>
  <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-purple-500/30">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-purple-300">團隊主題卡</h3>
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
      <!-- 團隊主題標題 -->
      <div class="flex justify-between items-center mb-4 gap-3">
        <div class="flex-1 min-w-0">
          <input 
            v-if="teamThemeCard.isEditing" 
            v-model="teamThemeCard.title"
            type="text" 
            placeholder="輸入團隊主題標題"
            class="w-full text-lg font-bold bg-transparent text-white border-b border-purple-400 focus:outline-none focus:border-purple-300"
          />
          <h4 v-else class="text-lg font-bold text-white truncate">
            {{ teamThemeCard.title || '未命名團隊主題' }}
          </h4>
        </div>
      </div>

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
      <div class="mb-3">
        <span class="text-sm font-medium text-gray-300">主題專長</span>
        <span class="text-xs text-gray-400 ml-1">
          ({{ getValidSpecialtiesCount() }}/5)
        </span>
      </div>
      
      <div v-if="getValidSpecialtiesCount() > 0" 
           class="mt-2 p-3 bg-slate-700/20 rounded-lg border border-slate-600/30">
        <div class="flex flex-wrap gap-2">
          <SpecialtyTooltip
            v-for="(specialty, index) in getValidSpecialties()" 
            :key="index"
            :name="specialty.name || `專長 ${index + 1}`"
            :description="specialty.description || `專長描述 ${index + 1}`"
          >
            <span 
              class="inline-flex items-center px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs cursor-help border border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-400/50 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-200 relative overflow-hidden group"
            >
              <!-- 科技感背景效果 -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative z-10">{{ specialty.name || `專長 ${index + 1}` }}</div>
            </span>
          </SpecialtyTooltip>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SpecialtyTooltip from './SpecialtyTooltip.vue'

// 定義介面
interface TeamThemeCard {
  title: string
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

// 獲取有效專長數量
const getValidSpecialtiesCount = () => {
  if (!props.teamThemeCard?.customSpecialties) return 0
  return props.teamThemeCard.customSpecialties.filter(specialty => 
    specialty && (specialty.name?.trim() || specialty.description?.trim())
  ).length
}

// 獲取有效專長列表
const getValidSpecialties = () => {
  if (!props.teamThemeCard?.customSpecialties) return []
  return props.teamThemeCard.customSpecialties.filter(specialty => 
    specialty && (specialty.name?.trim() || specialty.description?.trim())
  )
}

// 新增專長
function addSpecialty() {
  if (props.teamThemeCard.customSpecialties.length < 5) {
    props.teamThemeCard.customSpecialties.push({
      name: '',
      description: ''
    })
  }
}

// 移除專長
function removeSpecialty(index: number) {
  props.teamThemeCard.customSpecialties.splice(index, 1)
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
