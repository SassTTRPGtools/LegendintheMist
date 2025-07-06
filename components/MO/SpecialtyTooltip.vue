<template>
  <div class="inline-block">
    <!-- 觸發元素插槽 -->
    <div 
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      class="inline-block"
    >
      <slot />
    </div>
    
    <!-- 全域懸浮提示框 -->
    <Teleport to="body">
      <div 
        v-if="tooltipData.visible"
        class="fixed opacity-0 transition-all duration-300 ease-out pointer-events-none z-[9999] animate-fade-in"
        :style="tooltipPosition"
        :class="{ 'opacity-100': tooltipData.visible }"
      >
        <div class="relative">
          <!-- 主要提示框 -->
          <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyan-400/60 rounded-lg shadow-2xl shadow-cyan-400/20 backdrop-blur-sm w-64 animate-glow">
            <!-- 頂部裝飾條與角落裝飾 -->
            <div class="relative">
              <div class="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-t-md"></div>
              <!-- 左上角科技感裝飾 -->
              <div class="absolute top-1 left-2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
              <!-- 右上角科技感裝飾 -->
              <div class="absolute top-1 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
            </div>
            
            <!-- 內容區域 -->
            <div class="p-3 space-y-2 relative">
              <!-- 背景網格效果 -->
              <div class="absolute inset-0 opacity-5" style="background-image: linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px); background-size: 8px 8px;"></div>
              
              <!-- 專長名稱 -->
              <div class="relative text-cyan-300 font-bold text-sm tracking-wide border-b border-cyan-400/30 pb-1 flex items-center">
                <div class="w-1 h-1 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                {{ tooltipData.name }}
                <div class="ml-auto w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-150"></div>
              </div>
              
              <!-- 專長描述 -->
              <div class="relative text-gray-200 text-xs leading-relaxed pl-3">
                <!-- 左側裝飾線 -->
                <div class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"></div>
                {{ tooltipData.description }}
              </div>
            </div>
            
            <!-- 底部發光效果與裝飾 -->
            <div class="relative">
              <div class="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
              <!-- 底部角落裝飾 -->
              <div class="absolute bottom-1 left-2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
              <div class="absolute bottom-1 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
          
          <!-- 外層發光效果 -->
          <div class="absolute inset-0 bg-cyan-400/10 rounded-lg blur-md -z-10 animate-pulse-slow"></div>
          
          <!-- 額外的光暈效果 -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent rounded-lg blur-lg -z-20"></div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'

interface Props {
  name: string
  description: string
}

const props = defineProps<Props>()

// 在開發環境下添加調試信息
onMounted(() => {
  // 使用更可靠的開發環境檢查
  const isDev = process.env.NODE_ENV === 'development' || import.meta.dev
  if (isDev) {
    console.log('SpecialtyTooltip mounted with props:', {
      name: props.name,
      description: props.description,
      nameLength: props.name?.length || 0,
      descriptionLength: props.description?.length || 0
    })
  }
})

// 懸浮提示相關狀態
const tooltipData = reactive({
  visible: false,
  name: '',
  description: '',
  x: 0,
  y: 0
})

const tooltipPosition = computed(() => ({
  left: `${tooltipData.x}px`,
  top: `${tooltipData.y}px`,
  transform: 'translate(-50%, -100%)'
}))

// 顯示懸浮提示
const showTooltip = (event: MouseEvent) => {
  // 強制顯示調試信息
  console.log('=== SpecialtyTooltip showTooltip 被觸發 ===')
  console.log('Props:', { name: props.name, description: props.description })
  console.log('Event:', event)
  
  // 確保 props 有值才顯示，但放寬條件
  if (!props.name?.trim() || !props.description?.trim()) {
    console.warn('SpecialtyTooltip: Missing or empty name/description', { 
      name: props.name, 
      description: props.description 
    })
    return
  }
  
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  const tooltipWidth = 256 // w-64
  const tooltipHeight = 120 // 估計高度
  const margin = 16
  
  let x = rect.left + rect.width / 2
  let y = rect.top - 16 // 在元素上方
  
  // 檢查右邊界
  if (x + tooltipWidth / 2 > window.innerWidth - margin) {
    x = window.innerWidth - tooltipWidth / 2 - margin
  }
  
  // 檢查左邊界
  if (x - tooltipWidth / 2 < margin) {
    x = tooltipWidth / 2 + margin
  }
  
  // 檢查上邊界，如果會超出則顯示在下方
  if (y - tooltipHeight < margin) {
    y = rect.bottom + 16
  }
  
  tooltipData.x = x
  tooltipData.y = y
  tooltipData.name = props.name
  tooltipData.description = props.description
  tooltipData.visible = true
  
  console.log('✅ SpecialtyTooltip 懸浮提示已設置:', {
    position: { x, y },
    data: { name: props.name, description: props.description },
    visible: tooltipData.visible
  })
}

// 隱藏懸浮提示
const hideTooltip = () => {
  console.log('=== SpecialtyTooltip hideTooltip 被觸發 ===')
  tooltipData.visible = false
  console.log('✅ SpecialtyTooltip 懸浮提示已隱藏')
}
</script>
