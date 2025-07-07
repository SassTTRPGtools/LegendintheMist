<template>
  <span :class="textClass">{{ displayText }}</span>
</template>

<script setup>
// 導入映射數據
import { 
  TypeToThemeMapping 
} from '~/assets/MO/character-type-mapping.js'

// Props
const props = defineProps({
  // 主題字串，例如 "Artifact" 或 "CUTTING EDGE"
  themeString: {
    type: String,
    default: ''
  },
  // 是否使用類型映射（顯示主題風格而非類型本身）
  useTypeMapping: {
    type: Boolean,
    default: false
  },
  // 文字樣式類別
  textClass: {
    type: String,
    default: 'text-gray-300'
  },
  // 回退文字
  fallback: {
    type: String,
    default: '未提供'
  }
})

// 計算顯示文字
const displayText = computed(() => {
  if (!props.themeString) {
    return props.fallback
  }
  
  if (props.useTypeMapping) {
    // 使用類型映射，顯示主題風格（神話/喧囂/自我）
    return TypeToThemeMapping[props.themeString] || props.themeString || props.fallback
  } else {
    // 直接顯示類型名稱（或主題中文名稱）
    return props.themeString || props.fallback
  }
})
</script>

<style scoped>
/* 主題顯示組件樣式 */
</style>
