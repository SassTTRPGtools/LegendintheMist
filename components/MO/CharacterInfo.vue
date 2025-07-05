<template>
  <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-purple-500/30">
    <h3 class="text-xl font-bold text-purple-300 mb-4">角色資訊</h3>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">角色名稱</label>
        <input 
          v-model="character.name" 
          type="text" 
          class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="輸入角色名稱"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">背景描述</label>
        <textarea 
          v-model="character.background" 
          class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent h-20 resize-none"
          placeholder="角色的背景故事..."
        />
      </div>

      <!-- 老將專長顯示 -->
      <div v-if="character.veteranSpecialties && character.veteranSpecialties.length > 0">
        <label class="block text-sm font-medium text-gray-300 mb-2">老將專長</label>
        <div class="space-y-2">
          <div 
            v-for="specialty in character.veteranSpecialties" 
            :key="specialty"
            class="bg-slate-700 p-3 rounded-lg border border-purple-500/30"
          >
            <div class="font-medium text-purple-300">{{ getVeteranSpecialtyName(specialty) }}</div>
            <div class="text-sm text-gray-400 mt-1">{{ getVeteranSpecialtyDescription(specialty) }}</div>
            
            <!-- 改進你的遊戲專長的特殊顯示 -->
            <div v-if="specialty === 'levelUpGame' && character.levelUpGameImprovements && character.levelUpGameImprovements.length > 0" class="mt-2">
              <div class="text-xs text-purple-400 mb-1">已選擇的改進：</div>
              <div class="grid grid-cols-1 gap-1">
                <div 
                  v-for="(improvement, index) in character.levelUpGameImprovements" 
                  :key="index"
                  class="text-xs bg-slate-600 p-2 rounded"
                >
                  <span class="text-purple-300">{{ improvement.themeName }}</span>
                  <span class="text-gray-400 mx-1">-</span>
                  <span class="text-white">{{ improvement.improvementDescription }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="block text-sm font-medium text-gray-300">演化軌跡</label>
          <button 
            @click="emit('show-evolution-history')"
            class="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>查看演化歷史</span>
          </button>
        </div>
        <div class="flex space-x-2">
          <div 
            v-for="(step, index) in character.evolutionTrack" 
            :key="index"
            @click="$emit('toggle-evolution-step', index)"
            :class="[
              'w-6 h-6 border-2 rounded flex items-center justify-center text-xs font-bold cursor-pointer transition-colors hover:border-purple-300',
              step ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-700 border-slate-600 text-gray-400 hover:bg-slate-600'
            ]"
          >
            {{ step ? '●' : '○' }}
          </div>
        </div>
        <div class="text-xs text-gray-400 mt-1">
          演化進度：{{ evolutionProgress }}/5
          <span v-if="character.evolutionHistory && character.evolutionHistory.length > 0" class="ml-2">
            • 已完成演化：{{ character.evolutionHistory.length }} 次
          </span>
        </div>
      </div>

      <!-- 改進你的遊戲提醒 -->
      <div v-if="hasIncompleteLevelUpGame" class="mt-4 p-3 bg-yellow-900/50 border border-yellow-500/50 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-yellow-300">未完成的改進流程</div>
            <div class="text-xs text-yellow-200 mt-1">
              你有「改進你的遊戲」專長尚未完成全部 7 次改進
              <span v-if="character.levelUpGameImprovements">
                （已完成 {{ character.levelUpGameImprovements.length }}/7）
              </span>
            </div>
          </div>
          <button 
            @click="emit('resume-level-up-game')"
            class="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs rounded transition-colors"
          >
            繼續改進
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 定義接口
interface EvolutionRecord {
  date: string
  moments: any[]
  veteranSpecialty: any | null
  customDescription: string
}

interface LevelUpGameImprovement {
  cardIndex: number
  themeName: string
  improvementDescription: string
  improvementNumber: number
}

interface Character {
  name: string
  background: string
  evolutionTrack: boolean[]
  evolutionHistory?: EvolutionRecord[]
  veteranSpecialties?: string[]
  levelUpGameImprovements?: LevelUpGameImprovement[]
}

interface Props {
  character: Character
  hasIncompleteLevelUpGame?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  character: () => ({
    name: '',
    background: '',
    evolutionTrack: Array(5).fill(false),
    evolutionHistory: [],
    veteranSpecialties: [],
    levelUpGameImprovements: []
  }),
  hasIncompleteLevelUpGame: false
})

// 定義事件
const emit = defineEmits<{
  'toggle-evolution-step': [index: number]
  'show-evolution-history': []
  'resume-level-up-game': []
}>()

// 老將專長資料
const veteranSpecialties = {
  backpackBeast: { name: '背包野獸', description: '啟動通用裝備槽只需花費1點力度，而非2點。' },
  backupClones: { name: '備份複製品', description: '當你獲得超過限制的狀態時，可於下一幕初移除一次。' },
  customizableGear: { name: '可自訂裝備', description: '每場戲可燒掉一個特定裝備標籤並恢復另一個。' },
  experiencedEfficiency: { name: '經驗效率', description: '每場戲一次，在休息時選擇力量加成時，你可以獲得5點力度而非3點。' },
  godSlayer: { name: '屠神者', description: '在一次互動中，可忽略最多3級的難度。' },
  interfacer: { name: '介面師', description: '初次遇到科技時，立即學到一個有用的細節。' },
  largerThanLife: { name: '長壽', description: '在所有行動中，可忽略1級難度。' },
  levelUpGame: { name: '改進你的遊戲', description: '從所有主題中選擇7個改進。' },
  notFirstRodeo: { name: '不是我的第一場牛仔競技秀', description: '每場戲一次，當擲骰結果為失敗時，可以改成混合成功。' },
  sawThatComing: { name: '即將來臨', description: '每場戲一次，當主持人宣布後果或啟動挑戰特技時，可以將其視為威脅。' },
  slowSteady: { name: '穩扎穩打', description: '今後，所有主題卡的改進軌從3格變為5格。' },
  sourceSensitive: { name: '祕源敏感', description: '首次遇到某個祕源時，立即獲得一個關於其神話的有用細節。' },
  harderFall: { name: '當你失敗時', description: '當你的弱點標籤被啟動時，可以選擇失去2點力度，並在改進軌上標記2格。' },
  willpowerOverChance: { name: '意志超越機會', description: '擲出對子時不再自動失敗。' }
}

// 計算屬性
const evolutionProgress = computed(() => {
  if (!props.character?.evolutionTrack) return 0
  return props.character.evolutionTrack.filter(Boolean).length
})

// 方法
function getVeteranSpecialtyName(specialtyKey: string): string {
  return veteranSpecialties[specialtyKey as keyof typeof veteranSpecialties]?.name || specialtyKey
}

function getVeteranSpecialtyDescription(specialtyKey: string): string {
  return veteranSpecialties[specialtyKey as keyof typeof veteranSpecialties]?.description || '暫無描述'
}
</script>
