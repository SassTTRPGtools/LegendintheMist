<template>
  <div 
    v-if="selectedSystem && availableThemes.length > 0" 
    class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 p-6 h-fit"
  >
    <label class="block text-base font-medium text-cyan-300 mb-4 flex items-center">
      <Icon name="lucide:microchip" class="w-5 h-5 mr-2" />
      選擇類型 ({{ availableThemes.length }} 個可用)
    </label>
    <select 
      :value="selectedTheme" 
      @change="handleThemeChange"
      class="w-full p-4 border border-cyan-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-gray-800/80 text-cyan-100 text-base"
    >
      <option value="">請選擇類型</option>
      <option v-for="theme in availableThemes" :key="theme.key" :value="theme.key">
        {{ theme.theme }} - {{ theme.title }}
      </option>
    </select>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  selectedSystem: {
    type: String,
    required: true
  },
  selectedTheme: {
    type: String,
    default: ''
  },
  availableThemes: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['update:selectedTheme', 'theme-change'])

// Methods
const handleThemeChange = (event) => {
  const value = event.target.value
  emit('update:selectedTheme', value)
  emit('theme-change')
}
</script>
