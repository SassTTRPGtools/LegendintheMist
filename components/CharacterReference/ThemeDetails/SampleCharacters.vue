<template>
  <div 
    v-if="sampleCharacters.length > 0" 
    class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
  >
    <div class="bg-gray-800/90 px-6 py-4 border-b border-cyan-500/30">
      <h3 class="font-semibold text-cyan-100 flex items-center text-lg">
        <Icon name="lucide:users" class="w-6 h-6 mr-3 text-amber-400" />
        範例角色 ({{ sampleCharacters.length }} 個)
      </h3>
    </div>
    <div class="p-6">
      <!-- 使用響應式 grid 佈局來顯示多個角色，適應全寬顯示 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">            
        <div 
          v-for="character in sampleCharacters" 
          :key="character.name" 
          class="p-4 bg-amber-900/20 rounded-lg border border-amber-500/30 hover:bg-amber-900/30 transition-colors"
        >
          <div class="mb-3">
            <h4 class="font-bold text-amber-100 text-lg mb-1">{{ character.name }}</h4>
          </div>              
          <div class="space-y-3">
            <!-- 能力標籤 -->
            <div>
              <p class="text-sm font-medium text-green-400 mb-3">能力標籤</p>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="ability in character.ability_tags" 
                  :key="ability" 
                  class="px-3 py-1 bg-green-900/40 text-green-300 text-sm rounded-full border border-green-500/30"
                >
                  {{ ability }}
                </span>
              </div>
            </div>
            
            <!-- 弱點標籤 -->
            <div>
              <p class="text-sm font-medium text-red-400 mb-3">弱點標籤</p>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="weakness in character.weakness_tags" 
                  :key="weakness" 
                  class="px-3 py-1 bg-red-900/40 text-red-300 text-sm rounded-full border border-red-500/30"
                >
                  {{ weakness }}
                </span>
              </div>
            </div>
            
            <!-- 癢處 (科技心魔) -->
            <div v-if="character.itch" class="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30">
              <p class="text-sm font-medium text-cyan-400 mb-2 flex items-center">
                <Icon name="lucide:zap" class="w-4 h-4 mr-2" />
                癢處
                <span class="ml-2 text-xs bg-cyan-500/20 px-2 py-1 rounded-full text-cyan-300">科技心魔</span>
              </p>
              <p class="text-sm text-cyan-200 italic leading-relaxed">
                "{{ character.itch }}"
              </p>
            </div>
          
            <!-- Identity/Primary Goal (身份信念) -->
            <div v-if="character.identity_concept || character.primary_goal" class="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <p class="text-sm font-medium text-blue-400 mb-2">
                身份
                <span class="ml-2 text-xs bg-blue-500/20 px-2 py-1 rounded-full text-blue-300">自我信念</span>
              </p>
              <p class="text-sm text-blue-200 italic leading-relaxed">
                "{{ character.identity_concept || character.primary_goal }}"
              </p>
            </div>

            <!-- Ritual (儀式誡律) -->
            <div v-if="character.ritual_concept" class="bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/30">
              <p class="text-sm font-medium text-indigo-400 mb-2">
                儀式
                <span class="ml-2 text-xs bg-indigo-500/20 px-2 py-1 rounded-full text-indigo-300">祕源誡律</span>
              </p>
              <p class="text-sm text-indigo-200 italic leading-relaxed">
                "{{ character.ritual_concept }}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  sampleCharacters: {
    type: Array,
    default: () => []
  }
})
</script>
