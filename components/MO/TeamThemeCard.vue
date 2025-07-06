<template>
  <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-purple-500/30">
    <h3 class="text-xl font-bold text-purple-300 mb-4">團隊主題卡</h3>
    
    <!-- 編輯/檢視模式切換 -->
    <div class="flex justify-between items-center mb-4">
      <input 
        v-if="teamThemeCard.isEditing" 
        v-model="teamThemeCard.title"
        type="text" 
        placeholder="輸入團隊主題標題"
        class="text-lg font-bold bg-transparent text-white border-b border-purple-400 focus:outline-none focus:border-purple-300 flex-1 mr-2"
      />
      <h4 v-else class="text-lg font-bold text-white">
        {{ teamThemeCard.title || '未命名團隊主題' }}
      </h4>
      
      <button 
        @click="$emit('toggle-edit')"
        :class="[
          'px-3 py-1 rounded text-xs transition-colors',
          teamThemeCard.isEditing 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        ]"
      >
        {{ teamThemeCard.isEditing ? '完成' : '編輯' }}
      </button>
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
          <span class="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
            {{ index + 1 }}
          </span>
          
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
                : 'text-gray-500 bg-slate-700/30 italic'
            ]"
          >
            {{ ability.text.trim() || `能力標籤 ${index + 1}` }}
          </span>
          
          <!-- 燒毀狀態切換 -->
          <button
            @click="ability.isBurned = !ability.isBurned"
            :class="[
              'w-8 h-8 rounded-full text-xs font-bold transition-colors',
              ability.isBurned 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-slate-600 hover:bg-slate-700 text-gray-300'
            ]"
            :title="ability.isBurned ? '點擊恢復' : '點擊燒毀'"
          >
            {{ ability.isBurned ? '✕' : '○' }}
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
          <span class="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
            {{ index + 1 }}
          </span>
          
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
      <label class="block text-sm font-medium text-gray-300 mb-2">主題專長</label>
      <div class="space-y-2">
        <div 
          v-for="(specialty, index) in teamThemeCard.customSpecialties" 
          :key="index"
          class="flex items-start space-x-2"
        >
          <span class="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">
            {{ index + 1 }}
          </span>
          
          <div class="flex-1 space-y-1">
            <input 
              v-if="teamThemeCard.isEditing"
              v-model="specialty.name"
              type="text" 
              :placeholder="`專長名稱 ${index + 1}`"
              class="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <div 
              v-else 
              :class="[
                'px-2 py-1 text-sm rounded font-medium',
                specialty.name.trim() 
                  ? 'text-amber-300 bg-slate-700/50' 
                  : 'text-gray-500 bg-slate-700/30 italic'
              ]"
            >
              {{ specialty.name.trim() || `專長名稱 ${index + 1}` }}
            </div>
            
            <textarea
              v-if="teamThemeCard.isEditing"
              v-model="specialty.description"
              :placeholder="`專長描述 ${index + 1}`"
              rows="2"
              class="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-xs focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            />
            <div 
              v-else 
              :class="[
                'px-2 py-1 text-xs rounded',
                specialty.description.trim() 
                  ? 'text-gray-300 bg-slate-700/50' 
                  : 'text-gray-500 bg-slate-700/30 italic'
              ]"
            >
              {{ specialty.description.trim() || `專長描述 ${index + 1}` }}
            </div>
          </div>
          
          <button
            v-if="teamThemeCard.isEditing && index > 0"
            @click="removeSpecialty(index)"
            class="w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold mt-1"
            title="移除專長"
          >
            ✕
          </button>
        </div>
        
        <button
          v-if="teamThemeCard.isEditing && teamThemeCard.customSpecialties.length < 5"
          @click="addSpecialty"
          class="w-full px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs transition-colors"
        >
          新增專長
        </button>
      </div>
    </div>

    <!-- 改進軌跡 -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-300 mb-2">改進軌跡</label>
      <div class="flex space-x-2">
        <button
          v-for="(improvement, index) in teamThemeCard.improvements"
          :key="index"
          @click="$emit('improvement-change', index)"
          :class="[
            'w-8 h-8 border-2 rounded flex items-center justify-center text-sm font-bold transition-colors',
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
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-300 mb-2">衰變軌跡</label>
      <div class="flex space-x-2">
        <button
          v-for="(decay, index) in teamThemeCard.decays"
          :key="index"
          @click="$emit('decay-change', index)"
          :class="[
            'w-8 h-8 border-2 rounded flex items-center justify-center text-sm font-bold transition-colors',
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
</template>

<script setup lang="ts">
import { computed } from 'vue'

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
  if (index > 0) { // 保留第一個專長
    props.teamThemeCard.customSpecialties.splice(index, 1)
  }
}
</script>
