<template>
  <div 
    :class="[
      'fixed top-1/2 right-0 transform -translate-y-1/2 z-50 transition-all duration-300 ease-in-out',
      show ? 'translate-x-0' : 'translate-x-80'
    ]"
  >
    <!-- 書籤標籤 -->
    <button 
      @click="$emit('toggle')"
      :class="[
        'absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full',
        'bg-purple-600 hover:bg-purple-700 text-white px-2 py-6 rounded-l-lg',
        'writing-mode-vertical text-sm font-bold tracking-wider shadow-lg',
        'transition-colors duration-200'
      ]"
      style="writing-mode: vertical-rl; text-orientation: mixed;"
    >
      如何遊玩
    </button>
    
    <!-- 內容面板 -->
    <div class="bg-slate-800/95 backdrop-blur-sm border-l border-purple-500/30 w-80 h-screen overflow-y-auto shadow-2xl">
      <div class="p-4">
        <!-- 標題區 -->
        <div class="flex items-center justify-between mb-4 border-b border-purple-500/30 pb-3">
          <h3 class="text-lg font-bold text-purple-300">遊戲規則</h3>
          <button 
            @click="$emit('close')"
            class="text-gray-400 hover:text-white p-1 rounded"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- 規則內容 -->
        <div class="space-y-4">
          <!-- 建立行動 -->
          <RuleSection
            title="建立行動"
            color="green"
            :rules="establishActionRules"
          />

          <!-- 追蹤行動 -->
          <RuleSection
            title="追蹤行動"
            color="amber"
            :rules="trackActionRules"
          />

          <!-- 緩解與後果 -->
          <RuleSection
            title="緩解與後果"
            color="red"
            :rules="mitigationRules"
          />

          <!-- 改進 -->
          <RuleSection
            title="改進"
            color="purple"
            :rules="improvementRules"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RuleSection from './RuleSection.vue'

// 定義 Props
interface Props {
  show: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: false
})

// 定義 Emits
defineEmits<{
  toggle: []
  close: []
}>()

// 規則數據
const establishActionRules = [
  {
    type: 'text',
    content: 'MC描述場景，宣佈威脅'
  },
  {
    type: 'text',
    content: '描述你的行動，MC決定是否需要擲骰'
  },
  {
    type: 'quickAction',
    title: '快速行動',
    items: [
      { label: '正面標籤', effect: '+1 力度', color: 'green' },
      { label: '負面標籤', effect: '-1 力度', color: 'red' }
    ]
  },
  {
    type: 'results',
    items: [
      { range: '≤6 失誤', color: 'red' },
      { range: '7-9 混合', color: 'yellow' },
      { range: '≥10 成功', color: 'green' }
    ]
  }
]

const trackActionRules = [
  {
    type: 'text',
    content: '成功時，花費力度於效果：'
  },
  {
    type: 'effects',
    items: [
      { name: '狀態 ±1層', cost: '1力度', color: 'blue' },
      { name: '標籤 ±1個', cost: '2力度', color: 'purple' },
      { name: '發現細節', cost: '1力度', color: 'green' },
      { name: '額外壯舉', cost: '1力度', color: 'orange' }
    ]
  }
]

const mitigationRules = [
  {
    type: 'text',
    content: '緩解：反應來減少效果'
  },
  {
    type: 'results',
    items: [
      { range: '≤6 全部效果', color: 'red' },
      { range: '7-9 花費力度減少', color: 'yellow' },
      { range: '≥10 +1力度', color: 'green' }
    ]
  }
]

const improvementRules = [
  {
    type: 'text',
    content: '弱點被調用時標記改進'
  },
  {
    type: 'text',
    content: '三格改進後選擇：'
  },
  {
    type: 'choices',
    items: [
      { icon: '✓', label: '新能力標籤', color: 'green' },
      { icon: '⚡', label: '主題專長', color: 'amber' }
    ]
  }
]
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(10px);
}
</style>
