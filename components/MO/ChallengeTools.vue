<template>
  <div class="bg-gray-800 rounded-xl shadow-lg border border-cyan-500/30 flex flex-col h-full max-h-full overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-xl flex-shrink-0">
      <h2 class="text-lg font-bold text-white flex items-center">
        <Icon name="lucide:bookmark" class="w-5 h-5 mr-2" />
        快速工具
      </h2>
    </div>
    
    <!-- Content -->
    <div class="flex-1 min-h-0 overflow-hidden">
      <div class="h-full overflow-y-auto p-4 custom-scrollbar">
        <div class="space-y-4">
          <!-- Copy Functions -->
          <div v-if="selectedChallenge" class="space-y-2">
            <h4 class="text-purple-300 font-medium text-sm">複製資料</h4>
            <button 
              @click="copyToClipboard('name')"
              class="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors border border-gray-600 hover:border-purple-400"
            >
              <Icon name="lucide:copy" class="w-4 h-4 inline mr-2" />
              複製名稱
            </button>
            <button 
              @click="copyToClipboard('description')"
              class="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors border border-gray-600 hover:border-purple-400"
            >
              <Icon name="lucide:copy" class="w-4 h-4 inline mr-2" />
              複製描述
            </button>
            <button 
              @click="copyToClipboard('all')"
              class="w-full text-left px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm text-white transition-colors"
            >
              <Icon name="lucide:copy" class="w-4 h-4 inline mr-2" />
              複製完整資料
            </button>
          </div>
          
          <!-- Statistics -->
          <div class="space-y-2">
            <h4 class="text-purple-300 font-medium text-sm">資料統計</h4>
            <div class="bg-gray-700/50 rounded-lg p-3 space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-400">總挑戰數</span>
                <span class="text-purple-300 font-medium">{{ totalChallenges }}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-gray-400">篩選結果</span>
                <span class="text-purple-300 font-medium">{{ filteredCount }}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-gray-400">當前頁數</span>
                <span class="text-purple-300 font-medium">{{ currentPage }} / {{ totalPages }}</span>
              </div>
            </div>
          </div>
          
          <!-- Helper Info -->
          <div v-if="!selectedChallenge" class="text-center py-8">
            <Icon name="lucide:info" class="w-12 h-12 text-gray-500 mx-auto mb-2" />
            <p class="text-gray-400 text-sm">選擇挑戰後將顯示快速操作工具</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  selectedChallenge: {
    type: Object,
    default: null
  },
  totalChallenges: {
    type: Number,
    default: 0
  },
  filteredCount: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 1
  }
})

// Methods
const copyToClipboard = async (type) => {
  if (!props.selectedChallenge) return
  
  let textToCopy = ''
  
  switch (type) {
    case 'name':
      textToCopy = `${props.selectedChallenge.name} (${props.selectedChallenge.name_en})`
      break
    case 'description':
      textToCopy = props.selectedChallenge.description
      break
    case 'all':
      textToCopy = formatChallengeData(props.selectedChallenge)
      break
  }
  
  try {
    await navigator.clipboard.writeText(textToCopy)
    // 可以在這裡發送成功通知
  } catch (err) {
    console.error('複製失敗:', err)
  }
}

const formatChallengeData = (challenge) => {
  let text = `【${challenge.name}】\n`
  text += `英文名稱: ${challenge.name_en}\n`
  text += `難度等級: ${challenge.difficulty}\n\n`
  text += `描述:\n${challenge.description}\n\n`
  
  if (challenge.limits && Object.keys(challenge.limits).length > 0) {
    text += `限制:\n`
    Object.entries(challenge.limits).forEach(([key, value]) => {
      text += `• ${key}: ${value}\n`
    })
    text += '\n'
  }
  
  if (challenge.tags && challenge.tags.length > 0) {
    text += `標籤: ${challenge.tags.join(', ')}\n\n`
  }
  
  if (challenge.specials && challenge.specials.length > 0) {
    text += `特殊能力:\n`
    challenge.specials.forEach((special, index) => {
      text += `${index + 1}. ${special}\n`
    })
    text += '\n'
  }
  
  if (challenge.threatsAndConsequences && challenge.threatsAndConsequences.length > 0) {
    text += `威脅與後果:\n`
    challenge.threatsAndConsequences.forEach((threat) => {
      text += `【${threat.category}】\n`
      threat.consequences.forEach((consequence) => {
        text += `• ${consequence}\n`
      })
      text += '\n'
    })
  }
  
  return text
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #06b6d4 #374151;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #06b6d4;
  border-radius: 4px;
  transition: background 0.2s;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #0891b2;
}
</style>
