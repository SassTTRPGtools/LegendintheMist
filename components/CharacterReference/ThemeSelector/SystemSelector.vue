<template>
  <div class="bg-black/60 rounded-xl shadow-2xl border border-cyan-500/30 p-4 mb-6">
    <label class="block text-sm font-medium text-cyan-300 mb-3 flex items-center">
      <Icon name="lucide:circuit-board" class="w-4 h-4 mr-2" />
      選擇主題風格
    </label>
    <div class="relative">
      <button 
        @click="toggleDropdown"
        class="w-full p-3 border border-cyan-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-gray-800/80 text-left flex items-center justify-between text-cyan-100 hover:bg-gray-700/80 transition-all"
      >
        <span class="flex items-center">
          <Icon 
            v-if="selectedSystem === 'noise'" 
            name="lucide:zap" class="w-5 h-5 mr-2 text-cyan-400"
          />
          <Icon 
            v-if="selectedSystem === 'self'" 
            name="lucide:user" class="w-5 h-5 mr-2 text-purple-400"
          />
          <Icon 
            v-if="selectedSystem === 'mythos'" 
            name="lucide:eye" class="w-5 h-5 mr-2 text-orange-400"
          />
          {{ getSystemDisplayName(selectedSystem) || '請選擇主題風格' }}
        </span>
        <Icon name="lucide:chevron-down" class="w-4 h-4 text-cyan-400" />
      </button>
      
      <div 
        v-if="showDropdown" 
        class="absolute z-10 w-full mt-1 bg-black/95 backdrop-blur-sm border border-cyan-500/50 rounded-lg shadow-2xl"
      >
        <button
          @click="selectSystem('')"
          class="w-full p-3 text-left hover:bg-gray-800/80 first:rounded-t-lg text-cyan-200"
        >
          請選擇類型
        </button>            
        
        <button
          v-if="systemData.self"
          @click="selectSystem('self')"
          class="w-full p-3 text-left hover:bg-gray-800/80 flex items-center text-cyan-200"
        >
          <Icon name="lucide:user" class="w-5 h-5 mr-2 text-purple-400" />
          自我（身份）
        </button>            

        <button
          @click="selectSystem('noise')"
          class="w-full p-3 text-left hover:bg-gray-800/80 flex items-center text-cyan-200"
        >
          <Icon name="lucide:zap" class="w-5 h-5 mr-2 text-cyan-400" />
          喧囂（科技）
        </button>

        <button
          v-if="systemData.mythos"
          @click="selectSystem('mythos')"
          class="w-full p-3 text-left hover:bg-gray-800/80 flex items-center last:rounded-b-lg text-cyan-200"
        >
          <Icon name="lucide:eye" class="w-5 h-5 mr-2 text-orange-400" />
          神話（超自然）
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  selectedSystem: {
    type: String,
    default: ''
  },
  systemData: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['update:selectedSystem', 'system-change'])

// Local state
const showDropdown = ref(false)

// Methods
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectSystem = (system) => {
  emit('update:selectedSystem', system)
  emit('system-change')
  showDropdown.value = false
}

const getSystemDisplayName = (system) => {
  switch (system) {
    case 'noise': return '喧囂主題（科技）'
    case 'self': return '自我主題（身份）'
    case 'mythos': return '神話主題（超自然）'
    default: return ''
  }
}

// 點擊外部關閉下拉選單
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.relative')
  if (!dropdown) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
