<template>
  <div 
    v-if="sampleCharacters.length > 0" 
    class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
  >
    <div class="bg-gray-800/90 px-4 py-3 border-b border-cyan-500/30">
      <h3 class="font-semibold text-cyan-100 flex items-center">
        <Icon name="lucide:users" class="w-5 h-5 mr-2 text-amber-400" />
        範例角色
      </h3>
    </div>
    <div class="p-4 space-y-4">            
      <div 
        v-for="character in sampleCharacters" 
        :key="character.name" 
        class="p-4 bg-amber-900/20 rounded-lg border border-amber-500/30"
      >
        <div class="mb-3">
          <h4 class="font-bold text-amber-100 mb-1">{{ character.name }}</h4>
        </div>              
        <div class="grid grid-cols-1 gap-3">
          <!-- 能力標籤 -->
          <div>
            <p class="text-xs font-medium text-green-400 mb-2">能力標籤</p>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="ability in character.ability_tags" 
                :key="ability" 
                class="px-2 py-1 bg-green-900/40 text-green-300 text-xs rounded-full border border-green-500/30"
              >
                {{ ability }}
              </span>
            </div>
          </div>
          
          <!-- 弱點標籤 -->
          <div>
            <p class="text-xs font-medium text-red-400 mb-2">弱點標籤</p>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="weakness in character.weakness_tags" 
                :key="weakness" 
                class="px-2 py-1 bg-red-900/40 text-red-300 text-xs rounded-full border border-red-500/30"
              >
                {{ weakness }}
              </span>
            </div>
          </div>
          
          <!-- 癢處 (科技心魔) -->
          <div v-if="character.itch" class="mb-3">
            <p class="text-xs font-medium text-cyan-400 mb-2 flex items-center">
              <Icon name="lucide:zap" class="w-3 h-3 mr-1" />
              癢處
              <span class="ml-2 text-xs bg-cyan-500/20 px-2 py-1 rounded-full text-cyan-300">科技心魔</span>
            </p>
            <div class="p-3 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-400">
              <p class="text-sm text-cyan-200 italic mb-2">
                "{{ character.itch }}"
              </p>
              <p class="text-xs text-cyan-300/70">
                這是角色對科技的內在驅動力與偏執，長期壓抑將遠離科技。
              </p>
            </div>
          </div>
          
          <!-- Identity/Primary Goal (身份信念) -->
          <div v-if="character.identity_concept || character.primary_goal" class="mb-3">
            <p class="text-xs font-medium text-blue-400 mb-2">
              身份
              <span class="ml-2 text-xs bg-blue-500/20 px-2 py-1 rounded-full text-blue-300">自我信念</span>
            </p>
            <p class="text-sm text-blue-200 italic mb-2">
              "{{ character.identity_concept || character.primary_goal }}"
            </p>
            <p class="text-xs text-blue-200/70">
              這是角色深信不疑的信念，長期違背將喪失自我。
            </p>
          </div>

          <!-- Ritual (儀式誡律) -->
          <div v-if="character.ritual_concept" class="mb-3">
            <p class="text-xs font-medium text-indigo-400 mb-2">
              儀式
              <span class="ml-2 text-xs bg-indigo-500/20 px-2 py-1 rounded-full text-indigo-300">祕源誡律</span>
            </p>
            <p class="text-sm text-indigo-200 italic mb-2">
              "{{ character.ritual_concept }}"
            </p>
            <p class="text-xs text-indigo-200/70">
              這是必須遵守的要求，否則將與神話漸行漸遠。
            </p>                  
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
