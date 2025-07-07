<template>
  <div v-if="isVisible" 
       @click="$emit('close')"
       class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
    
    <div @click.stop 
         class="bg-gray-800 rounded-xl shadow-2xl border border-cyan-500/30 max-w-4xl w-full max-h-[90vh] overflow-hidden relative z-[10001]">
      
      <!-- Header -->
      <div class="bg-gradient-to-r from-cyan-600 to-purple-600 p-6 flex justify-between items-center">
        <div>
          <h3 class="text-2xl font-bold text-white">{{ challenge?.name }}</h3>
          <p class="text-cyan-200 text-lg">{{ challenge?.name_en }}</p>
        </div>
        <div class="flex items-center space-x-4">
          <span class="inline-block bg-cyan-800 text-cyan-100 px-3 py-2 rounded-lg text-sm font-bold">
            等級 {{ challenge?.difficulty }}
          </span>
          <button @click="$emit('close')" 
                  class="text-white hover:text-gray-300 transition-colors">
            <Icon name="lucide:x" class="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <!-- Content -->
      <div class="p-6 overflow-y-auto max-h-[70vh]">
        <div v-if="challenge" class="space-y-6">
          
          <!-- Description -->
          <div class="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <h4 class="text-cyan-200 font-semibold mb-3 flex items-center">
              <Icon name="lucide:file-text" class="w-4 h-4 mr-2" />
              挑戰描述
            </h4>
            <p class="text-gray-300 leading-relaxed">{{ challenge.description }}</p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            
            <!-- Limits -->
            <div v-if="challenge.limits && Object.keys(challenge.limits).length > 0">
              <h4 class="text-red-400 font-semibold mb-3 flex items-center">
                <Icon name="lucide:alert-triangle" class="w-4 h-4 mr-2" />
                限制
              </h4>
              <div class="space-y-2">
                <div 
                  v-for="(value, key) in challenge.limits" 
                  :key="key"
                  class="bg-red-900/20 border border-red-500/30 rounded-lg p-3"
                >
                  <div class="flex justify-between items-center">
                    <span class="text-red-200 font-medium">{{ key }}</span>
                    <span class="text-red-300 font-bold">{{ value }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div v-if="challenge.tags && challenge.tags.length > 0">
              <h4 class="text-green-400 font-semibold mb-3 flex items-center">
                <Icon name="lucide:tag" class="w-4 h-4 mr-2" />
                標籤
              </h4>
              <div class="space-y-2">
                <span 
                  v-for="(tag, index) in challenge.tags" 
                  :key="index"
                  class="inline-block bg-green-900/30 text-green-200 px-3 py-2 rounded-lg text-sm border border-green-500/30 mr-2 mb-2"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Specials -->
          <div v-if="challenge.specials && challenge.specials.length > 0" class="mt-6">
            <h4 class="text-purple-400 font-semibold mb-4 flex items-center">
              <Icon name="lucide:star" class="w-4 h-4 mr-2" />
              特殊能力
            </h4>
            <div class="space-y-3">
              <div 
                v-for="(special, index) in challenge.specials" 
                :key="index"
                class="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4"
              >
                <p class="text-purple-200 text-sm leading-relaxed whitespace-pre-line">{{ special }}</p>
              </div>
            </div>
          </div>

          <!-- Threats and Consequences -->
          <div v-if="challenge.threatsAndConsequences && challenge.threatsAndConsequences.length > 0" class="mt-6">
            <h4 class="text-yellow-400 font-semibold mb-4 flex items-center">
              <Icon name="lucide:zap" class="w-4 h-4 mr-2" />
              威脅與後果
            </h4>
            <div class="space-y-4">
              <div 
                v-for="(threat, index) in challenge.threatsAndConsequences" 
                :key="index"
                class="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4"
              >
                <h5 class="text-yellow-200 font-medium mb-3">{{ threat.category }}</h5>
                <ul class="space-y-2">
                  <li 
                    v-for="(consequence, cIndex) in threat.consequences" 
                    :key="cIndex"
                    class="text-yellow-100 text-sm flex items-start"
                  >
                    <Icon name="lucide:arrow-right" class="w-3 h-3 mr-2 mt-1 text-yellow-400 flex-shrink-0" />
                    <span class="whitespace-pre-line">{{ consequence }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Additional Actions -->
          <div class="mt-8 pt-6 border-t border-gray-600">
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-400">
                <span class="mr-4">威脅與後果: {{ challenge.threatsAndConsequences?.length || 0 }}</span>
                <span>特殊能力: {{ challenge.specials?.length || 0 }}</span>
              </div>
              <div class="flex space-x-3">
                <button 
                  @click="copyToClipboard"
                  class="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center"
                >
                  <Icon name="lucide:copy" class="w-4 h-4 mr-2" />
                  複製資料
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Loading or Error State -->
        <div v-else class="text-center py-8">
          <Icon name="lucide:search" class="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p class="text-gray-400">找不到挑戰資料</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  challenge: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

// 複製到剪貼簿
async function copyToClipboard() {
  if (!props.challenge) return

  const text = `【${props.challenge.name}】(${props.challenge.name_en})
等級: ${props.challenge.difficulty}

描述:
${props.challenge.description}

${props.challenge.limits ? `限制:
${Object.entries(props.challenge.limits).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

` : ''}${props.challenge.tags ? `標籤:
${props.challenge.tags.map(tag => `• ${tag}`).join('\n')}

` : ''}${props.challenge.specials ? `特殊能力:
${props.challenge.specials.map(special => `• ${special}`).join('\n')}

` : ''}${props.challenge.threatsAndConsequences ? `威脅與後果:
${props.challenge.threatsAndConsequences.map(threat => `【${threat.category}】
${threat.consequences.map(c => `  → ${c}`).join('\n')}`).join('\n\n')}` : ''}`

  try {
    await navigator.clipboard.writeText(text)
    // 可以加入通知系統顯示複製成功
    console.log('已複製到剪貼簿')
  } catch (error) {
    console.error('複製失敗:', error)
  }
}

// 監聽 ESC 鍵關閉模態框
onMounted(() => {
  const handleEscape = (event) => {
    if (event.key === 'Escape' && props.isVisible) {
      emit('close')
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
/* 自定義滾動條 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
