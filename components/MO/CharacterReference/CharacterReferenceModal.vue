<template>
  <Teleport to="body">
    <div v-if="isVisible" 
         @click="handleBackdropClick"
         class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div @click.stop 
           class="bg-gray-800 rounded-xl shadow-2xl border border-cyan-500/30 max-w-4xl w-full max-h-[80vh] overflow-hidden">
        
        <!-- Modal Header -->
        <CharacterReferenceHeader 
          :character-name="characterName"
          @close="handleClose" />
        
        <!-- Modal Content -->
        <div class="p-6 overflow-y-auto max-h-[60vh]">
          <CharacterReferenceContent 
            v-if="characterData"
            :character-data="characterData" />
          
          <CharacterReferenceNotFound 
            v-else
            :character-name="characterName"
            :character-type="characterType" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import CharacterReferenceHeader from './CharacterReferenceHeader.vue'
import CharacterReferenceContent from './CharacterReferenceContent.vue'
import CharacterReferenceNotFound from './CharacterReferenceNotFound.vue'

// Props
const props = defineProps({
  // 控制模態框顯示/隱藏
  isVisible: {
    type: Boolean,
    default: false
  },
  // 角色名稱
  characterName: {
    type: String,
    default: ''
  },
  // 角色類型
  characterType: {
    type: String,
    default: ''
  },
  // 角色資料
  characterData: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['close', 'backdrop-click'])

// 處理關閉事件
function handleClose() {
  emit('close')
}

// 處理背景點擊事件
function handleBackdropClick() {
  emit('backdrop-click')
  emit('close')
}

// 鍵盤事件處理
function handleKeydown(event) {
  if (event.key === 'Escape' && props.isVisible) {
    handleClose()
  }
}

// 生命週期
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// 監聽 isVisible 變化，處理 body 滾動
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* 動畫效果 */
.v-enter-active, .v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}
</style>
