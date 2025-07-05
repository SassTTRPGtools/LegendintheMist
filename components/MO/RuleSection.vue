<template>
  <div class="bg-slate-700/30 rounded-lg p-3">
    <h4 :class="[
      'font-bold text-sm mb-2 flex items-center',
      getColorClasses(color).text
    ]">
      <div :class="[
        'w-2 h-2 rounded-full mr-2',
        getColorClasses(color).bg
      ]"></div>
      {{ title }}
    </h4>
    <div class="text-xs text-gray-300 space-y-2">
      <!-- 渲染不同類型的規則內容 -->
      <template v-for="(rule, index) in rules" :key="index">
        <!-- 純文字內容 -->
        <p v-if="rule.type === 'text'" v-html="formatText(rule.content || '')"></p>
        
        <!-- 快速行動區塊 -->
        <div v-else-if="rule.type === 'quickAction'" class="bg-slate-800/50 rounded p-2 mt-2">
          <p class="text-purple-300 font-semibold text-xs mb-1">{{ rule.title }}</p>
          <div class="space-y-1 text-xs">
            <div v-for="item in rule.items" :key="item.label" class="flex justify-between">
              <span :class="getQuickActionColor(item.color)">{{ item.label }}</span>
              <span :class="getQuickActionEffectColor(item.color)">{{ item.effect }}</span>
            </div>
          </div>
        </div>
        
        <!-- 結果區塊 -->
        <div v-else-if="rule.type === 'results'" class="grid grid-cols-1 gap-1 text-xs mt-2">
          <div 
            v-for="item in rule.items" 
            :key="item.range"
            :class="[
              'p-1 rounded text-center',
              getResultBgColor(item.color)
            ]"
          >
            <span :class="[
              'font-bold',
              getResultTextColor(item.color)
            ]">{{ item.range }}</span>
          </div>
        </div>
        
        <!-- 效果區塊 -->
        <div v-else-if="rule.type === 'effects'" class="grid grid-cols-1 gap-1">
          <div 
            v-for="item in rule.items" 
            :key="item.name"
            :class="[
              'p-1 rounded',
              getEffectBgColor(item.color)
            ]"
          >
            <span :class="getEffectTextColor(item.color)">{{ item.name }}</span>
            <span class="text-gray-400 float-right">{{ item.cost }}</span>
          </div>
        </div>
        
        <!-- 選擇區塊 -->
        <div v-else-if="rule.type === 'choices'" class="space-y-1">
          <div 
            v-for="item in rule.items" 
            :key="item.label"
            class="flex items-center space-x-2 text-xs"
          >
            <div :class="[
              'w-3 h-3 rounded flex items-center justify-center',
              getChoiceBgColor(item.color)
            ]">
              <span class="text-white text-xs">{{ item.icon }}</span>
            </div>
            <span :class="getChoiceTextColor(item.color)">{{ item.label }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// 定義 Props
interface RuleItem {
  type: string
  content?: string
  title?: string
  items?: any[]
  [key: string]: any
}

interface Props {
  title: string
  color: string
  rules: RuleItem[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  color: 'gray',
  rules: () => []
})

// 顏色映射函數
const getColorClasses = (color: string) => {
  const colorMap: Record<string, { text: string; bg: string }> = {
    green: { text: 'text-green-400', bg: 'bg-green-400' },
    amber: { text: 'text-amber-400', bg: 'bg-amber-400' },
    red: { text: 'text-red-400', bg: 'bg-red-400' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-400' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-400' }
  }
  return colorMap[color] || { text: 'text-gray-400', bg: 'bg-gray-400' }
}

const getQuickActionColor = (color: string) => {
  const colorMap: Record<string, string> = {
    green: 'text-green-300',
    red: 'text-red-300'
  }
  return colorMap[color] || 'text-gray-300'
}

const getQuickActionEffectColor = (color: string) => {
  const colorMap: Record<string, string> = {
    green: 'text-green-200',
    red: 'text-red-200'
  }
  return colorMap[color] || 'text-gray-200'
}

const getResultBgColor = (color: string) => {
  const colorMap: Record<string, string> = {
    red: 'bg-red-900/30',
    yellow: 'bg-yellow-900/30',
    green: 'bg-green-900/30'
  }
  return colorMap[color] || 'bg-gray-900/30'
}

const getResultTextColor = (color: string) => {
  const colorMap: Record<string, string> = {
    red: 'text-red-300',
    yellow: 'text-yellow-300',
    green: 'text-green-300'
  }
  return colorMap[color] || 'text-gray-300'
}

const getEffectBgColor = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-900/30',
    purple: 'bg-purple-900/30',
    green: 'bg-green-900/30',
    orange: 'bg-orange-900/30'
  }
  return colorMap[color] || 'bg-gray-900/30'
}

const getEffectTextColor = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-300',
    purple: 'text-purple-300',
    green: 'text-green-300',
    orange: 'text-orange-300'
  }
  return colorMap[color] || 'text-gray-300'
}

const getChoiceBgColor = (color: string) => {
  const colorMap: Record<string, string> = {
    green: 'bg-green-600',
    amber: 'bg-amber-600'
  }
  return colorMap[color] || 'bg-gray-600'
}

const getChoiceTextColor = (color: string) => {
  const colorMap: Record<string, string> = {
    green: 'text-green-300',
    amber: 'text-amber-300'
  }
  return colorMap[color] || 'text-gray-300'
}

// 格式化文字，處理特殊標記
const formatText = (text: string) => {
  return text
    .replace(/威脅/g, '<span class="text-red-400 font-semibold">威脅</span>')
    .replace(/擲骰/g, '<span class="text-purple-400 font-semibold">擲骰</span>')
    .replace(/緩解：/g, '<span class="text-amber-400 font-semibold">緩解：</span>')
}
</script>
