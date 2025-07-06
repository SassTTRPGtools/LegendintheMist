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
      <div class="flex items-center justify-between mb-3">
        <button
          @click="toggleSpecialtyExpanded"
          class="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          <span>主題專長</span>
          <span class="text-xs text-gray-400 ml-1">
            ({{ teamThemeCard.customSpecialties.length }}/5)
          </span>
          <svg 
            :class="[
              'w-4 h-4 transition-transform duration-200',
              isSpecialtyExpanded ? 'rotate-90' : 'rotate-0'
            ]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      
      <!-- 折疊時的簡要預覽 -->
      <div v-if="!isSpecialtyExpanded && teamThemeCard.customSpecialties.length > 0" 
           class="mt-2 p-3 bg-slate-700/20 rounded-lg border border-slate-600/30">
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(specialty, index) in teamThemeCard.customSpecialties" 
            :key="index"
            class="inline-flex items-center px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs"
          >
            <span class="w-4 h-4 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-1">
              {{ index + 1 }}
            </span>
            {{ specialty.name.trim() || `專長 ${index + 1}` }}
          </span>
        </div>
      </div>
      
      <div v-if="isSpecialtyExpanded" class="space-y-3">
        <div 
          v-for="(specialty, index) in teamThemeCard.customSpecialties" 
          :key="index"
          :class="[
            'flex items-start space-x-2 p-3 rounded-lg border transition-colors',
            teamThemeCard.isEditing 
              ? 'bg-slate-700/30 border-slate-600/50 hover:border-amber-500/30' 
              : 'bg-slate-700/20 border-slate-600/30'
          ]"
        >
          <span class="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1 flex-shrink-0">
            {{ index + 1 }}
          </span>
          
          <div class="flex-1 space-y-2 min-w-0">
            <input 
              v-if="teamThemeCard.isEditing"
              v-model="specialty.name"
              type="text" 
              :placeholder="`專長名稱 ${index + 1}`"
              class="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400"
            />
            <div 
              v-else 
              :class="[
                'px-3 py-2 text-sm rounded font-medium min-h-[2rem] flex items-center',
                specialty.name.trim() 
                  ? 'text-amber-300 bg-slate-800/50' 
                  : 'text-gray-500 bg-slate-800/30 italic'
              ]"
            >
              {{ specialty.name.trim() || `專長名稱 ${index + 1}` }}
            </div>
            
            <textarea
              v-if="teamThemeCard.isEditing"
              v-model="specialty.description"
              :placeholder="`專長描述 ${index + 1}`"
              rows="2"
              class="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-xs focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none placeholder-gray-400"
            />
            <div 
              v-else 
              :class="[
                'px-3 py-2 text-xs rounded min-h-[3rem] flex items-start',
                specialty.description.trim() 
                  ? 'text-gray-300 bg-slate-800/50' 
                  : 'text-gray-500 bg-slate-800/30 italic'
              ]"
            >
              {{ specialty.description.trim() || `專長描述 ${index + 1}` }}
            </div>
          </div>
          
          <button
            v-if="teamThemeCard.isEditing"
            @click="removeSpecialty(index)"
            class="w-7 h-7 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold mt-1 flex-shrink-0 transition-colors"
            title="移除專長"
          >
            ✕
          </button>
        </div>
        
        <!-- 新增專長按鈕 -->
        <button
          v-if="teamThemeCard.isEditing && teamThemeCard.customSpecialties.length < 5"
          @click="addSpecialty"
          class="w-full px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <span>新增專長 ({{ teamThemeCard.customSpecialties.length }}/5)</span>
        </button>
        
        <!-- 專長已滿提示 -->
        <div v-else-if="teamThemeCard.isEditing && teamThemeCard.customSpecialties.length >= 5" 
             class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 text-gray-400 rounded-lg text-sm text-center">
          專長已達上限 (5/5)
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

// 折疊狀態管理
const isSpecialtyExpanded = ref(false)

// 切換專長展開狀態
function toggleSpecialtyExpanded() {
  isSpecialtyExpanded.value = !isSpecialtyExpanded.value
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
