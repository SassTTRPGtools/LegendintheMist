<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
    <!-- 側邊「如何遊玩」書籤 -->
    <HowToPlayPanel 
      :show="showHowToPlay" 
      @toggle="showHowToPlay = !showHowToPlay"
      @close="showHowToPlay = false"
    />

    <!-- 主要容器 -->
    <div class="container mx-auto px-4 py-8">
      <!-- 頂部區域 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- 左上角：六角雷達圖 -->
        <CharacterTypeChart :theme-cards="character.themeCards" />

        <!-- 右上角：角色基本資訊 -->
        <CharacterInfo
          :character="character"
          @toggle-evolution-step="toggleEvolutionStep"
          @show-evolution-history="openEvolutionHistoryModal"
        />

        <!-- 第三欄：裝備卡 -->
        <EquipmentCard
          :equipment="character.equipment"
          :equipment-specialties="EQUIPMENT_SPECIALTIES"
          @improvement-change="onEquipmentImprovementChange"
          @add-specialty="addEquipmentSpecialty"
          @remove-specialty="removeEquipmentSpecialty"
        />
      </div>

      <!-- 四個主題卡區塊 - 4x1 排列 -->
      <div class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-2 gap-6">
        <ThemeCard
          v-for="(card, index) in character.themeCards"
          :key="index"
          :theme-card="card"
          :card-index="index"
          :mythos-themes="mythosThemes"
          :noise-themes="noiseThemes"
          :self-themes="selfThemes"
          @theme-type-change="onThemeTypeChange"
          @theme-change="onThemeChange"
          @improvement-change="onImprovementChange"
          @decay-change="onDecayChange"
          @toggle-edit="toggleEdit"
        />
      </div>

      <!-- 改進彈窗 -->
      <ImprovementModal
        :show="showImprovementModal"
        :modal-data="improvementModal"
        :target-card-weaknesses="getTargetCardWeaknesses()"
        :available-specialties="getAvailableSpecialties(improvementModal.cardIndex)"
        :has-available-specialties="hasAvailableSpecialties(improvementModal.cardIndex)"
        @close="closeImprovementModal"
        @confirm="confirmImprovement"
      />

      <!-- 裝備改進彈窗 -->
      <EquipmentModal
        :show="showEquipmentModal"
        :modal-data="equipmentModal"
        :current-power="character.equipment.power"
        :equipment-specialties="EQUIPMENT_SPECIALTIES"
        :current-equipment-specialties="character.equipment.specialties"
        @close="closeEquipmentModal"
        @confirm="confirmEquipmentImprovement"
      />

      <!-- 衰變彈窗 -->
      <DecayModal
        :show="showDecayModal"
        :decay-data="decayModal"
        @close="closeDecayModal"
        @confirm="confirmDecay"
      />

      <!-- 演化時刻彈窗 -->
      <EvolutionModal
        :show="showEvolutionModal"
        :modal-data="evolutionModal"
        :evolution-moments="evolutionMoments"
        :veteran-specialties="veteranSpecialties"
        @close="closeEvolutionModal"
        @confirm="confirmEvolution"
      />

      <!-- 演化歷史模態框 -->
      <EvolutionHistoryModal
        :show="showEvolutionHistoryModal"
        :evolution-history="character.evolutionHistory || []"
        @close="closeEvolutionHistoryModal"
        @update-description="updateEvolutionDescription"
      />

      <!-- 改進你的遊戲模態框 -->
      <LevelUpGameModal
        :show="showLevelUpGameModal"
        :theme-cards="character.themeCards"
        :mythos-themes="mythosThemes"
        :noise-themes="noiseThemes"
        :self-themes="selfThemes"
        @close="closeLevelUpGameModal"
        @selectCard="handleLevelUpGameCardSelection"
        @finish="handleLevelUpGameFinish"
        @cancel="handleLevelUpGameCancel"
        ref="levelUpGameModalRef"
      />

      <!-- 底部操作按鈕 -->
      <div class="mt-8 flex justify-center space-x-4">
        <NuxtLink 
          to="/MO"
          class="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
        >
          返回首頁
        </NuxtLink>
        <button 
          @click="resetCharacter"
          class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          重新開始
        </button>
        <button 
          @click="saveCharacter"
          :disabled="!isCharacterComplete"
          :class="[
            'px-6 py-3 rounded-lg transition-colors',
            isCharacterComplete 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-slate-600 text-gray-400 cursor-not-allowed'
          ]"
        >
          完成角色建立
        </button>
        <!-- 測試按鈕 -->
        <button 
          @click="testLevelUpGame"
          class="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
        >
          測試改進你的遊戲
        </button>
        <!-- 簡單測試按鈕 -->
        <button 
          @click="showLevelUpGameModal = true"
          class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          直接開啟模態框
        </button>
      </div>
    </div>

    <!-- 角色資料管理器 -->
    <CharacterDataManager
      :character="character"
      @import-character="handleImportCharacter"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CharacterTypeChart from '~/components/MO/CharacterTypeChart.vue'
import ThemeCard from '~/components/MO/ThemeCard.vue'
import EquipmentCard from '~/components/MO/EquipmentCard.vue'
import CharacterInfo from '~/components/MO/CharacterInfo.vue'
import ImprovementModal from '~/components/MO/ImprovementModal.vue'
import EquipmentModal from '~/components/MO/EquipmentModal.vue'
import DecayModal from '~/components/MO/DecayModal.vue'
import EvolutionModal from '~/components/MO/EvolutionModal.vue'
import HowToPlayPanel from '~/components/MO/HowToPlayPanel.vue'
import CharacterDataManager from '~/components/MO/CharacterDataManager.vue'
import EvolutionHistoryModal from '~/components/MO/EvolutionHistoryModal.vue'
import LevelUpGameModal from '~/components/MO/LevelUpGameModal.vue'

// ====================
// 頁面配置
// ====================
useHead({
  title: '都市異景 - 角色建立器',
  meta: [
    { name: 'description', content: '建立你的都市異景角色' }
  ]
})

// ====================
// 常量定義
// ====================

const EQUIPMENT_SPECIALTIES = {
  deepCustomization: {
    name: '深度客製化',
    description: '選擇你裝備主題中的一件物品。每次休整時，你可新增一個代表該物品特定功能或附加效果的裝備標籤，此標籤可於特定條件或用途下使用。'
  },
  fullEquipment: {
    name: '完整配備',
    description: '選擇街頭目錄中的一個類別。你現在擁有該類別所有標籤，並能在裝備裝載時任意啟用。可多次選擇不同類別。'
  },
  extraCopy: {
    name: '多帶一份',
    description: '每場遊戲一次，你可複製一個非唯一物品的裝備標籤，分別給隊友或盟友使用，自己仍保有該標籤。'
  },
  externalCall: {
    name: '外調',
    description: '每場戲一次，當你擲出同組裝備標籤中三個或以上的標籤，且擲出失敗（6-）時，可改為部分成功（7-9）或強烈成功（10+）。'
  },
  reuse: {
    name: '重用',
    description: '於裝載裝備開始與結束之間，你可重寫某個裝備標籤。此標籤將保留為新版。'
  },
  replacementPolicy: {
    name: '更換政策',
    description: '每次休整時，你可將裝備裝載中的一個標籤替換為其他標籤。'
  },
  sharedWealth: {
    name: '共享財富',
    description: '隊伍成員能使用你的裝備標籤進行採購行動時（只要標籤相關），但如果其他人也有此標籤，則不會堆疊效果。'
  },
  synergisticRevenue: {
    name: '協同收益',
    description: '每場遊戲一次，當你堆疊三個更多代表不同物品的裝備標籤時，可將成功度提升一級。失敗（6-），改為部分（7-9）或部分改為強烈成功（10+）。'
  }
}

const veteranSpecialties = {
  backpackBeast: {
    name: '背包野獸',
    description: '啟動通用裝備槽只需花費1點力度，而非2點（你能在任務期間任意填入裝備標籤，而非只在「裝載啟動」時使用）。'
  },
  backupClones: {
    name: '備份複製品',
    description: '當你獲得超過限制的狀態（通常為6級）時，可於下一幕初移除一次。第二次則於下一次休息時移除，第三次於任務結束時移除。第三次後就會移除此專長。'
  },
  customizableGear: {
    name: '可自訂裝備',
    description: '每場戲可燒掉一個特定裝備標籤並恢復另一個。'
  },
  experiencedEfficiency: {
    name: '經驗效率',
    description: '每場戲一次，在休息時選擇力量加成時，你可以獲得5點力度而非3點。'
  },
  godSlayer: {
    name: '屠神者',
    description: '在一次互動（戰鬥、社交、魔法等）中，可忽略最多3級的難度，由主持人決定是否適用此專長。'
  },
  interfacer: {
    name: '介面師',
    description: '初次遇到科技時，立即學到一個有用的細節；當日後再次遇到相關科技，會立即辨認出來。'
  },
  largerThanLife: {
    name: '長壽',
    description: '在所有行動中，可忽略1級難度。'
  },
  levelUpGame: {
    name: '改進你的遊戲',
    description: '從所有主題中選擇7個改進。'
  },
  notFirstRodeo: {
    name: '不是我的第一場牛仔競技秀',
    description: '每場戲一次，當擲骰結果為失敗（6以下）時，可以改成混合成功（7-9），前提是沒有擲出對子。'
  },
  sawThatComing: {
    name: '即將來臨',
    description: '每場戲一次，當主持人宣布後果或啟動挑戰特技時，可以將其視為威脅，取得聚光燈，並多執行一個行動（可解除該威脅）。'
  },
  slowSteady: {
    name: '穩扎穩打',
    description: '今後，所有主題卡的改進軌從3格變為5格。每標記第5格時，獲得兩個改進並重設軌跡。'
  },
  sourceSensitive: {
    name: '祕源敏感',
    description: '首次遇到某個祕源時，立即獲得一個關於其神話的有用細節。日後再次遇到相關神話時，會立即辨認。'
  },
  harderFall: {
    name: '當你失敗時',
    description: '當你的弱點標籤被啟動時（不論誰啟動），可以選擇失去2點力度，並在改進軌上標記2格。'
  },
  willpowerOverChance: {
    name: '意志超越機會',
    description: '擲出對子時不再自動失敗。'
  }
}

const evolutionMoments = {
  newEssenceType: {
    name: '創建一個新的精髓類型',
    description: `你和主持人將共同創建一個新的精髓類型，來契合你的角色、故事和他們的新身份，並賦予其專屬的精髓專長。

這個新精髓類型將成為你的系列劇的一部分，其他滿足條件的玩家也能選擇此精髓類型。`,
    effect: (character, modal) => {
      console.log('創建新的精髓類型', modal.customDescription)
    }
  },
  secondGeneralTag: {
    name: '創建另一個廣義能力標籤',
    description: `每個角色通常只能擁有一個廣義能力標籤，但藉由這次演化，你可以創建第二個廣義能力標籤。

為你的一個主題創建新的廣義能力標籤。若將來失去該主題，可以回答替代主題書中與廣義能力標籤相關的問題。

角色不應擁有超過兩個廣義能力標籤。`,
    effect: (character, modal) => {
      console.log('創建第二個廣義能力標籤', modal.customDescription)
    }
  },
  veteranSpecialty: {
    name: '獲得一個老將專長',
    description: '從下列老將專長中選擇一個。',
    effect: (character, modal) => {
      console.log('獲得老將專長:', modal.selectedVeteranSpecialty)
    }
  },
  retire: {
    name: '退役',
    description: `你的角色已走到盡頭，是時候說再見了。

你可以選擇退役條件：
• 英勇犧牲、帶著最後的勝利笑聲離去
• 死於無謂而浪費的死亡
• 逃往荒野過孤獨生活
• 加入隱秘的嬉皮派系，再也不被發現
• 組建家庭，過著富裕的信仰生活
• 複製自己進入網路空間
• 升華為噬源者`,
    effect: (character, modal) => {
      console.log('角色退役', modal.customDescription)
    }
  },
  breakCosmology: {
    name: '破壞宇宙論（敘事發展）',
    description: `你做出一項發現，改變世界，或以重新定義系列的方式轉變。

可能的改變：
• 發現異星生命或科技，成為第一個人類混血體
• 發現世界是模擬，神話是叛變程式在試圖喚醒人類的網路夢境
• 自由鬥士派系對抗企業，帶來首次巨型城市的企業級勝利，連帶所有責任與複雜局面

與主持人討論你想要的改變，並協作將其融入你的系列。`,
    effect: (character, modal) => {
      console.log('破壞宇宙論', modal.customDescription)
    }
  },
  totalReconstruction: {
    name: '總重組（尊重）',
    description: `你的角色不再是過去的自己，完全轉變為新存在。這並非部分更替，而是所有主題同時被替換，任何結果都有可能。

可能的重組情況：
• 死於戰鬥，身體被增強部件取代，意識上傳至網路空間
• 被選為鳳凰化身，在火焰中重生，重新建立完整人格、身體與數據紀錄，展開新生活，沒有人知道

重塑規則：
當你重塑角色時，創建四個新主題，就像創造新角色一樣。

新角色將獲得：
• 每個主題前三個能力標籤免費改進一次
• 每個主題第一個弱點標籤免費改進一次
• 每個主題一個免費的專屬特技
• 舊角色所有演化點
• 舊角色所有演化時刻

每個演化升級可依改進規則應用於新角色的主題。演化時刻可重新分配至新主題。`,
    effect: (character, modal) => {
      console.log('總重組', modal.customDescription)
    }
  }
}

// ====================
// 響應式數據
// ====================
const showHowToPlay = ref(false)
const mythosThemes = ref({})
const noiseThemes = ref({})
const selfThemes = ref({})

// 改進彈窗相關
const showImprovementModal = ref(false)
const improvementModal = ref({
  cardIndex: -1,
  selectedOption: '',
  newAbilityText: '',
  weaknessText: '',
  selectedWeaknessIndex: null,
  selectedSpecialty: '',
  isSlowSteadyImprovement: false,
  improvementNumber: 0
})

// 穩扎穩打專長進度追蹤
const slowSteadyProgress = ref({
  cardIndex: -1,
  completedImprovements: 0,
  totalImprovements: 0
})

// 裝備改進彈窗相關
const showEquipmentModal = ref(false)
const equipmentModal = ref({
  selectedOption: '',
  selectedSpecialty: ''
})

// 衰變彈窗相關
const showDecayModal = ref(false)
const decayModal = ref({
  cardIndex: -1,
  evolutionPoints: 0,
  lostTheme: '',
  lostAbilities: [],
  lostWeaknesses: [],
  lostSpecialty: ''
})

// 演化時刻彈窗相關
const showEvolutionModal = ref(false)
const evolutionModal = ref({
  selectedMoments: [],
  selectedVeteranSpecialty: '',
  customDescription: ''
})

// 演化歷史模態框相關
const showEvolutionHistoryModal = ref(false)

// 改進你的遊戲模態框相關
const showLevelUpGameModal = ref(false)
const levelUpGameModalRef = ref(null)
const levelUpGameCurrentCardIndex = ref(-1)
const levelUpGameImprovementCount = ref(0)

// ====================
// 工具函數
// ====================
function createEmptyThemeCard(hasSlowSteady = false) {
  // 接受參數來決定改進格數量，避免在初始化時訪問 character
  const improvementCount = hasSlowSteady ? 5 : 3
  
  return {
    selectedThemeType: '',
    selectedTheme: '',
    title: '',
    abilities: Array(7).fill(null).map(() => ({ text: '', isBurned: false })),
    weaknesses: Array(2).fill(null).map(() => ({ text: '' })),
    improvements: Array(improvementCount).fill(null).map(() => ({ checked: false })),
    decays: Array(3).fill(null).map(() => ({ checked: false })),
    selectedSpecialty: '',
    selectedSpecialties: [],
    motivation: {
      identity: '',
      ritual: '',
      itch: ''
    },
    isEditing: false
  }
}

function createEmptyEquipment() {
  return {
    name: '',
    improvements: Array(3).fill(null).map(() => ({ checked: false })),
    power: 1,
    abilities: Array(5).fill(null).map(() => ({ text: '', isBurned: false })),
    weaknesses: Array(2).fill(null).map(() => ({ text: '' })),
    specialties: []
  }
}

// 初始化角色資料
const character = ref({
  name: '',
  background: '',
  evolutionTrack: [false, false, false, false, false], // 五個演化軌跡格子
  evolutionHistory: [], // 演化歷史記錄
  veteranSpecialties: [], // 已獲得的老將專長
  levelUpGameImprovements: [], // 改進你的遊戲專長選擇的改進
  equipment: createEmptyEquipment(),
  themeCards: Array(4).fill().map(() => createEmptyThemeCard())
})

// 載入主題資料
onMounted(async () => {
  try {
    console.log('開始載入主題資料...')
    const [mythosRes, noiseRes, selfRes] = await Promise.all([
      fetch('/MO/mythos-themes.json'),
      fetch('/MO/noise-themes.json'),
      fetch('/MO/self-themes.json')
    ])
    
    mythosThemes.value = (await mythosRes.json()).themes
    noiseThemes.value = (await noiseRes.json()).themes
    selfThemes.value = (await selfRes.json()).themes
    
    console.log('主題資料載入完成:', {
      mythos: Object.keys(mythosThemes.value).length,
      noise: Object.keys(noiseThemes.value).length,
      self: Object.keys(selfThemes.value).length
    })
  } catch (error) {
    console.error('載入主題資料失敗:', error)
  }
})

// 計算屬性
const isCharacterComplete = computed(() => {
  return character.value.name && 
         character.value.themeCards.every(card => 
           card && card.selectedThemeType && card.selectedTheme
         )
})

// 演化時刻有效性檢查
const isEvolutionValid = computed(() => {
  // 至少要選擇一個演化時刻
  if (evolutionModal.value.selectedMoments.length === 0) return false
  
  // 如果選擇了老將專長，必須選擇具體的專長
  if (evolutionModal.value.selectedMoments.includes('veteranSpecialty')) {
    if (evolutionModal.value.selectedVeteranSpecialty === '') return false
  }
  
  // 如果選擇了退役或總重組，建議填寫演化描述
  const needsDescription = ['retire', 'totalReconstruction', 'newEssenceType', 'breakCosmology']
  const hasDescriptionRequiredMoments = evolutionModal.value.selectedMoments.some(moment => 
    needsDescription.includes(moment)
  )
  
  if (hasDescriptionRequiredMoments && !evolutionModal.value.customDescription.trim()) {
    // 不強制要求，但建議填寫
    console.log('建議為此演化時刻填寫描述')
  }
  
  return true
})

// 檢查是否需要演化描述
const needsEvolutionDescription = computed(() => {
  const needsDescription = ['retire', 'totalReconstruction', 'newEssenceType', 'breakCosmology']
  return evolutionModal.value.selectedMoments.some(moment => 
    needsDescription.includes(moment)
  )
})

// ====================
// 主要功能函數（僅保留主文件需要的）
// ====================

function onThemeTypeChange(cardIndex) {
  const card = character.value.themeCards[cardIndex]
  if (!card) return
  
  card.selectedTheme = ''
  card.title = ''
  // 重置能力和弱點
  card.abilities.forEach(ability => {
    ability.text = ''
    ability.isBurned = false
  })
  card.weaknesses.forEach(weakness => {
    weakness.text = ''
  })
}

function onThemeChange(cardIndex) {
  const card = character.value.themeCards[cardIndex]
  if (!card) return
  
  const themeData = getThemeData(card.selectedThemeType, card.selectedTheme)
  
  if (themeData) {
    // 不自動填入標題，讓使用者自己設定
    // card.title = themeData.title || ''
    // 可以在這裡預填入一些能力標籤範例
  }
}

function getThemeData(themeType, themeKey) {
  const themes = getAvailableThemes(themeType)
  return themes[themeKey] || null
}

function getAvailableThemes(themeType) {
  switch (themeType) {
    case 'mythos':
      return mythosThemes.value || {}
    case 'noise':
      return noiseThemes.value || {}
    case 'self':
      return selfThemes.value || {}
    default:
      return {}
  }
}

function toggleEdit(cardIndex) {
  const card = character.value.themeCards[cardIndex]
  if (!card) return
  
  if (card.isEditing) {
    // 儲存邏輯可以在這裡執行
    console.log(`儲存主題卡 ${cardIndex + 1}:`, card)
  }
  card.isEditing = !card.isEditing
}

// ====================
// 主要功能
// ====================
function toggleEvolutionStep(index) {
  character.value.evolutionTrack[index] = !character.value.evolutionTrack[index]
  
  // 檢查是否所有演化格都被勾選
  if (character.value.evolutionTrack.every(step => step)) {
    showEvolutionModal.value = true
  }
}

function resetCharacter() {
  character.value = {
    name: '',
    background: '',
    evolutionTrack: [false, false, false, false, false],
    veteranSpecialties: [],
    evolutionHistory: [],
    levelUpGameImprovements: [],
    equipment: createEmptyEquipment(),
    themeCards: Array(4).fill().map(() => createEmptyThemeCard(false))
  }
}

// 處理角色資料導入
function handleImportCharacter(importedCharacter) {
  try {
    // 確保導入的資料結構完整
    const normalizedCharacter = {
      name: importedCharacter.name || '',
      background: importedCharacter.background || '',
      evolutionTrack: Array.isArray(importedCharacter.evolutionTrack) 
        ? importedCharacter.evolutionTrack.slice(0, 5).concat(Array(5).fill(false)).slice(0, 5)
        : [false, false, false, false, false],
      evolutionHistory: Array.isArray(importedCharacter.evolutionHistory)
        ? importedCharacter.evolutionHistory
        : [],
      veteranSpecialties: Array.isArray(importedCharacter.veteranSpecialties)
        ? importedCharacter.veteranSpecialties
        : [],
      levelUpGameImprovements: Array.isArray(importedCharacter.levelUpGameImprovements)
        ? importedCharacter.levelUpGameImprovements
        : [],
      equipment: normalizeEquipment(importedCharacter.equipment),
      themeCards: normalizeThemeCards(importedCharacter.themeCards)
    }
    
    // 覆蓋當前角色資料
    character.value = normalizedCharacter
    
    // 如果導入的角色有穩扎穩打專長，更新主題卡改進格
    if (normalizedCharacter.veteranSpecialties?.includes('slowSteady')) {
      updateThemeCardImprovements()
    }
    
    console.log('角色資料導入成功:', normalizedCharacter)
  } catch (error) {
    console.error('處理導入資料時發生錯誤:', error)
  }
}

// 標準化裝備資料
function normalizeEquipment(equipment) {
  if (!equipment || typeof equipment !== 'object') {
    return createEmptyEquipment()
  }
  
  const normalized = createEmptyEquipment()
  
  // 複製有效的裝備資料
  if (typeof equipment.name === 'string') normalized.name = equipment.name
  if (typeof equipment.description === 'string') normalized.description = equipment.description
  if (typeof equipment.power === 'number') normalized.power = Math.max(0, Math.min(3, equipment.power))
  if (Array.isArray(equipment.specialties)) normalized.specialties = [...equipment.specialties]
  if (Array.isArray(equipment.tags)) normalized.tags = [...equipment.tags]
  if (Array.isArray(equipment.improvements)) normalized.improvements = [...equipment.improvements]
  
  return normalized
}

// 標準化主題卡資料
function normalizeThemeCards(themeCards) {
  if (!Array.isArray(themeCards)) {
    return Array(4).fill().map(() => createEmptyThemeCard(false))
  }
  
  const normalized = []
  
  for (let i = 0; i < 4; i++) {
    const card = themeCards[i]
    if (card && typeof card === 'object') {
      const normalizedCard = createEmptyThemeCard(false)
      
      // 複製有效的主題卡資料
      if (typeof card.selectedThemeType === 'string') {
        normalizedCard.selectedThemeType = card.selectedThemeType
      }
      if (typeof card.selectedTheme === 'string') {
        normalizedCard.selectedTheme = card.selectedTheme
      }
      if (typeof card.title === 'string') {
        normalizedCard.title = card.title
      }
      if (Array.isArray(card.abilities)) {
        normalizedCard.abilities = [...card.abilities]
      }
      if (Array.isArray(card.weaknesses)) {
        normalizedCard.weaknesses = [...card.weaknesses]
      }
      if (Array.isArray(card.improvements)) {
        normalizedCard.improvements = [...card.improvements]
      }
      if (Array.isArray(card.decays)) {
        normalizedCard.decays = [...card.decays]
      }
      if (typeof card.selectedSpecialty === 'string') {
        normalizedCard.selectedSpecialty = card.selectedSpecialty
      }
      if (Array.isArray(card.selectedSpecialties)) {
        normalizedCard.selectedSpecialties = [...card.selectedSpecialties]
      }
      if (card.motivation && typeof card.motivation === 'object') {
        normalizedCard.motivation = { ...card.motivation }
      }
      if (typeof card.isEditing === 'boolean') {
        normalizedCard.isEditing = card.isEditing
      }
      
      normalized.push(normalizedCard)
    } else {
      normalized.push(createEmptyThemeCard(false))
    }
  }
  
  return normalized
}

// 改進彈窗相關計算屬性
const isImprovementValid = computed(() => {
  const modal = improvementModal.value
  switch (modal.selectedOption) {
    case 'newAbility':
      return modal.newAbilityText.trim() !== ''
    case 'modifyWeakness':
      // 需要選擇弱點索引
      if (modal.selectedWeaknessIndex === null) return false
      
      // 如果是新增弱點，必須輸入內容
      if (modal.selectedWeaknessIndex === 'add') {
        return modal.weaknessText.trim() !== ''
      }
      
      // 如果是修改現有弱點
      if (modal.selectedWeaknessIndex === 0) {
        // 第一個弱點必須有內容（不能移除）
        return modal.weaknessText.trim() !== ''
      }
      
      // 其他弱點可以留空（表示移除）
      return true
    case 'specialty':
      return modal.selectedSpecialty !== ''
    default:
      return false
  }
})

// 改進相關處理函數
function onImprovementChange(cardIndex, improvementIndex) {
  const card = character.value.themeCards[cardIndex]
  if (!card || !card.improvements) return
  
  const hasSlowSteady = character.value.veteranSpecialties.includes('slowSteady')
  const allChecked = card.improvements.every(imp => imp.checked)
  
  if (allChecked) {
    if (hasSlowSteady && card.improvements.length === 5) {
      // 穩扎穩打專長：第5格時獲得兩個改進並重設軌跡
      showSlowSteadyModal(cardIndex)
    } else {
      // 一般改進：開啟改進彈窗
      improvementModal.value = {
        cardIndex: cardIndex,
        selectedOption: '',
        newAbilityText: '',
        weaknessText: '',
        selectedWeaknessIndex: null,
        selectedSpecialty: ''
      }
      showImprovementModal.value = true
    }
  }
}

// 穩扎穩打專長的特殊改進處理
function showSlowSteadyModal(cardIndex) {
  // 自動觸發兩次改進彈窗
  slowSteadyProgress.value = {
    cardIndex: cardIndex,
    completedImprovements: 0,
    totalImprovements: 2
  }
  
  // 開啟第一次改進
  improvementModal.value = {
    cardIndex: cardIndex,
    selectedOption: '',
    newAbilityText: '',
    weaknessText: '',
    selectedWeaknessIndex: null,
    selectedSpecialty: '',
    isSlowSteadyImprovement: true,
    improvementNumber: 1
  }
  showImprovementModal.value = true
}

// 取得目標主題卡的弱點標籤
function getTargetCardWeaknesses() {
  if (improvementModal.value.cardIndex === -1) return []
  return character.value.themeCards[improvementModal.value.cardIndex].weaknesses
}

// 取得弱點操作說明文字
function getWeaknessActionLabel() {
  const index = improvementModal.value.selectedWeaknessIndex
  if (index === 'add') {
    return '輸入新的弱點標籤：'
  } else if (index !== null) {
    const weakness = getTargetCardWeaknesses()[index]
    return weakness.text ? '重寫弱點標籤：' : '設定弱點標籤：'
  }
  return ''
}

// 取得弱點輸入框的提示文字
function getWeaknessPlaceholder() {
  const index = improvementModal.value.selectedWeaknessIndex
  if (index === 'add') {
    return '輸入新弱點標籤'
  } else if (index !== null) {
    const weakness = getTargetCardWeaknesses()[index]
    if (weakness.text) {
      return `當前：${weakness.text}`
    } else {
      return '輸入弱點標籤'
    }
  }
  return ''
}

// 檢查是否可以移除弱點（第一個弱點不可移除）
function canRemoveWeakness() {
  const index = improvementModal.value.selectedWeaknessIndex
  return index !== null && index !== 'add' && index !== 0
}

function closeImprovementModal() {
  showImprovementModal.value = false
  // 重置彈窗資料
  improvementModal.value = {
    cardIndex: -1,
    selectedOption: '',
    newAbilityText: '',
    weaknessText: '',
    selectedWeaknessIndex: null,
    selectedSpecialty: '',
    isSlowSteadyImprovement: false,
    improvementNumber: 0
  }
}

function confirmImprovement() {
  const modal = improvementModal.value
  const card = character.value.themeCards[modal.cardIndex]
  
  // 根據選擇執行對應操作
  switch (modal.selectedOption) {
    case 'newAbility':
      // 新增能力標籤到第一個空的位置
      const emptyAbilityIndex = card.abilities.findIndex(ability => !ability.text.trim())
      if (emptyAbilityIndex !== -1) {
        card.abilities[emptyAbilityIndex].text = modal.newAbilityText.trim()
      } else {
        // 如果沒有空位，添加到末尾
        card.abilities.push({ text: modal.newAbilityText.trim(), isBurned: false })
      }
      break
      
    case 'modifyWeakness':
      const weaknessIndex = modal.selectedWeaknessIndex
      const weaknessText = modal.weaknessText.trim()
      
      if (weaknessIndex === 'add') {
        // 新增弱點標籤
        if (weaknessText) {
          card.weaknesses.push({ text: weaknessText })
        }
      } else if (weaknessIndex !== null) {
        // 修改現有弱點標籤
        if (weaknessIndex === 0 && !weaknessText) {
          // 第一個弱點不能移除，只能重寫
          alert('第一個弱點標籤不能移除，只能重寫內容！')
          return
        } else if (weaknessIndex > 0 && !weaknessText) {
          // 移除弱點標籤（第二個以後才能移除）
          card.weaknesses.splice(weaknessIndex, 1)
        } else {
          // 重寫弱點標籤
          card.weaknesses[weaknessIndex].text = weaknessText
        }
      }
      break
      
    case 'specialty':
      // 設定主題專長 - 支援多專長選擇
      if (!card.selectedSpecialties) {
        card.selectedSpecialties = []
      }
      
      // 確保不會重複添加同一專長
      if (!card.selectedSpecialties.includes(modal.selectedSpecialty)) {
        card.selectedSpecialties.push(modal.selectedSpecialty)
        
        // 向後相容性：如果是第一個專長，也設定到舊的欄位
        if (card.selectedSpecialties.length === 1) {
          card.selectedSpecialty = modal.selectedSpecialty
        }
      }
      break
  }
  
  // 處理穩扎穩打專長的連續改進
  if (modal.isSlowSteadyImprovement) {
    slowSteadyProgress.value.completedImprovements++
    
    if (slowSteadyProgress.value.completedImprovements < slowSteadyProgress.value.totalImprovements) {
      // 還有改進需要完成，開啟下一次改進彈窗
      improvementModal.value = {
        cardIndex: modal.cardIndex,
        selectedOption: '',
        newAbilityText: '',
        weaknessText: '',
        selectedWeaknessIndex: null,
        selectedSpecialty: '',
        isSlowSteadyImprovement: true,
        improvementNumber: slowSteadyProgress.value.completedImprovements + 1
      }
      // 保持彈窗開啟
      return
    } else {
      // 所有改進完成，重設軌跡
      card.improvements.forEach(imp => imp.checked = false)
      
      // 重置穩扎穩打進度
      slowSteadyProgress.value = {
        cardIndex: -1,
        completedImprovements: 0,
        totalImprovements: 0
      }
    }
  } 
  // 處理「改進你的遊戲」專長的連續改進
  else if (modal.isLevelUpGameImprovement) {
    // 記錄這次改進的詳細資料
    const improvementDescription = getImprovementDescription(modal, card)
    
    // 增加改進計數
    levelUpGameImprovementCount.value++
    
    // 將改進記錄新增到 LevelUpGameModal
    if (levelUpGameModalRef.value) {
      levelUpGameModalRef.value.addCompletedImprovement({
        cardIndex: modal.cardIndex,
        themeName: card.title || card.selectedTheme,
        improvementDescription: improvementDescription,
        improvementNumber: levelUpGameImprovementCount.value
      })
    }
    
    console.log(`改進你的遊戲：完成第 ${levelUpGameImprovementCount.value} 次改進`)
    
    // 關閉改進模態框
    showImprovementModal.value = false
    
    // 如果還沒完成7次改進，重新開啟主題卡選擇
    if (levelUpGameImprovementCount.value < 7) {
      setTimeout(() => {
        showLevelUpGameModal.value = true
      }, 300)
    } else {
      // 已完成7次改進，顯示完成畫面
      setTimeout(() => {
        showLevelUpGameModal.value = true
      }, 300)
    }
    
    return // 提早返回，不執行一般改進的後續處理
  } 
  else {
    // 一般改進：清空改進勾選框並填滿演化軌跡
    card.improvements.forEach(imp => imp.checked = false)
    
    // 填滿一格演化軌跡
    const emptyTrackIndex = character.value.evolutionTrack.findIndex(track => !track)
    if (emptyTrackIndex !== -1) {
      character.value.evolutionTrack[emptyTrackIndex] = true
    }
  }
  
  // 關閉彈窗
  showImprovementModal.value = false
}

// 更新所有主題卡的改進格數量（當獲得穩扎穩打專長時）
function updateThemeCardImprovements() {
  const hasSlowSteady = character.value.veteranSpecialties.includes('slowSteady')
  const targetCount = hasSlowSteady ? 5 : 3
  
  character.value.themeCards.forEach(card => {
    if (card.improvements.length !== targetCount) {
      const currentChecked = card.improvements.map(imp => imp.checked)
      
      // 重建改進陣列
      card.improvements = Array(targetCount).fill(null).map((_, index) => ({
        checked: currentChecked[index] || false
      }))
    }
  })
}

// 獲取可用的主題專長
function getAvailableSpecialties(cardIndex) {
  const card = character.value.themeCards[cardIndex]
  if (!card) return {}
  
  const themeType = card.selectedThemeType
  const themeKey = card.selectedTheme
  
  if (!themeType || !themeKey) return {}
  
  let themeData = null
  
  // 根據主題類型獲取對應的主題資料
  switch (themeType) {
    case 'mythos':
      themeData = mythosThemes.value[themeKey]
      break
    case 'noise':
      themeData = noiseThemes.value[themeKey]
      break
    case 'self':
      themeData = selfThemes.value[themeKey]
      break
    default:
      return {}
  }
  
  if (!themeData || !themeData.theme_specials) {
    return {}
  }
  
  // 取得已選擇的專長列表
  const selectedSpecialties = card.selectedSpecialties || []
  
  // 將 theme_specials 陣列轉換為物件格式，排除已選擇的專長
  const specialties = {}
  themeData.theme_specials.forEach((special, index) => {
    const key = `${themeKey}_special_${index}`
    
    // 如果專長未被選擇且總數未超過5個，則加入可選列表
    if (!selectedSpecialties.includes(key) && selectedSpecialties.length < 5) {
      specialties[key] = {
        name: special.name,
        description: special.description,
        isSelected: false
      }
    } else if (selectedSpecialties.includes(key)) {
      // 已選擇的專長標記為禁用
      specialties[key] = {
        name: special.name,
        description: special.description,
        isSelected: true
      }
    }
  })
  
  return specialties
}

// 獲取專長描述
function getSpecialtyDescription(specialtyKey) {
  if (!specialtyKey) return '未選擇專長'
  
  // 解析專長鍵值，取得主題類型和主題鍵值
  const parts = specialtyKey.split('_special_')
  if (parts.length !== 2) return '未知專長'
  
  const themeKey = parts[0]
  const specialIndex = parseInt(parts[1])
  
  // 搜尋對應的主題資料
  let themeData = null
  
  // 檢查神話主題
  if (mythosThemes.value[themeKey]) {
    themeData = mythosThemes.value[themeKey]
  }
  // 檢查喧囂主題
  else if (noiseThemes.value[themeKey]) {
    themeData = noiseThemes.value[themeKey]
  }
  // 檢查自我主題
  else if (selfThemes.value[themeKey]) {
    themeData = selfThemes.value[themeKey]
  }
  
  if (!themeData || !themeData.theme_specials || !themeData.theme_specials[specialIndex]) {
    return '專長資料不存在'
  }
  
  const specialty = themeData.theme_specials[specialIndex]
  return `${specialty.name}：${specialty.description}`
}

// ====================
// 裝備功能
// ====================
function onEquipmentImprovementChange(improvementIndex) {
  const improvements = character.value.equipment.improvements
  
  // 檢查是否所有改進格都被勾選
  if (improvements.every(imp => imp.checked)) {
    showEquipmentModal.value = true
  }
}

function addEquipmentSpecialty() {
  character.value.equipment.specialties.push({
    type: '',
    description: ''
  })
}

function removeEquipmentSpecialty(index) {
  character.value.equipment.specialties.splice(index, 1)
}

function getEquipmentSpecialtyDescription(type) {
  const specialty = EQUIPMENT_SPECIALTIES[type]
  return specialty ? specialty.description : ''
}

function closeEquipmentModal() {
  showEquipmentModal.value = false
  equipmentModal.value.selectedOption = ''
  equipmentModal.value.selectedSpecialty = ''
}

const isEquipmentImprovementValid = computed(() => {
  return equipmentModal.value.selectedOption !== '' && 
         (equipmentModal.value.selectedOption !== 'newSpecialty' || equipmentModal.value.selectedSpecialty !== '')
})

function confirmEquipmentImprovement() {
  if (!isEquipmentImprovementValid.value) return
  
  if (equipmentModal.value.selectedOption === 'powerIncrease') {
    character.value.equipment.power += 1
  } else if (equipmentModal.value.selectedOption === 'newSpecialty') {
    // 檢查是否已存在相同專長，避免重複添加
    const selectedSpecialtyKey = equipmentModal.value.selectedSpecialty
    const existingSpecialty = character.value.equipment.specialties.find(
      specialty => specialty.type === selectedSpecialtyKey
    )
    
    if (!existingSpecialty) {
      character.value.equipment.specialties.push({
        type: selectedSpecialtyKey,
        description: getEquipmentSpecialtyDescription(selectedSpecialtyKey)
      })
    }
  }
  
  // 清空改進勾選框
  character.value.equipment.improvements.forEach(imp => {
    imp.checked = false
  })
  
  closeEquipmentModal()
}

// ====================
// 衰變功能
// ====================
function onDecayChange(cardIndex, decayIndex) {
  const card = character.value.themeCards[cardIndex]
  if (!card || !card.decays) return
  
  // 檢查是否所有衰變格都被勾選
  if (card.decays.every(decay => decay.checked)) {
    calculateDecayEvolution(cardIndex)
    showDecayModal.value = true
  }
}

function calculateDecayEvolution(cardIndex) {
  const card = character.value.themeCards[cardIndex]
  let evolutionPoints = 0
  
  // 失去主題 +1 點
  evolutionPoints += 1
  
  // 記錄失去的內容
  decayModal.value.cardIndex = cardIndex
  decayModal.value.lostTheme = card.title || getThemeTitle(card.selectedTheme)
  
  // 前三個能力標籤，每個 +1 點
  const lostAbilities = card.abilities.slice(0, 3)
    .filter(ability => ability.text.trim() !== '')
  decayModal.value.lostAbilities = lostAbilities.map(a => a.text)
  evolutionPoints += lostAbilities.length
  
  // 第一個弱點標籤以外的每個弱點標籤 +1 點
  const extraWeaknesses = card.weaknesses.slice(1)
    .filter(weakness => weakness.text.trim() !== '')
  decayModal.value.lostWeaknesses = extraWeaknesses.map(w => w.text)
  evolutionPoints += extraWeaknesses.length
  
  // 主題專長 +1 點
  if (card.selectedSpecialty) {
    const specialty = getSpecialtyDescription(card.selectedSpecialty)
    decayModal.value.lostSpecialty = specialty.split('：')[0] || card.selectedSpecialty
    evolutionPoints += 1
  } else {
    decayModal.value.lostSpecialty = ''
  }
  
  decayModal.value.evolutionPoints = evolutionPoints
}

function getThemeTitle(themeKey) {
  // 從主題數據中獲取主題標題
  const allThemes = { ...mythosThemes.value, ...noiseThemes.value, ...selfThemes.value }
  const theme = allThemes[themeKey]
  return theme ? theme.theme : '未知主題'
}

function closeDecayModal() {
  showDecayModal.value = false
  decayModal.value = {
    cardIndex: -1,
    evolutionPoints: 0,
    lostTheme: '',
    lostAbilities: [],
    lostWeaknesses: [],
    lostSpecialty: ''
  }
}

function confirmDecay() {
  const cardIndex = decayModal.value.cardIndex
  const evolutionPoints = decayModal.value.evolutionPoints
  
  // 重置主題卡，檢查是否有穩扎穩打專長
  const hasSlowSteady = character.value.veteranSpecialties?.includes('slowSteady') || false
  character.value.themeCards[cardIndex] = createEmptyThemeCard(hasSlowSteady)
  
  // 自動添加演化點（從前往後填滿）
  let pointsToAdd = evolutionPoints
  for (let i = 0; i < character.value.evolutionTrack.length && pointsToAdd > 0; i++) {
    if (!character.value.evolutionTrack[i]) {
      character.value.evolutionTrack[i] = true
      pointsToAdd--
    }
  }
  
  closeDecayModal()
}

// ====================
// 演化時刻功能
// ====================
function closeEvolutionModal() {
  showEvolutionModal.value = false
  evolutionModal.value = {
    selectedMoments: [],
    selectedVeteranSpecialty: '',
    customDescription: ''
  }
}

// ====================
// 演化歷史功能
// ====================
function openEvolutionHistoryModal() {
  showEvolutionHistoryModal.value = true
}

function closeEvolutionHistoryModal() {
  showEvolutionHistoryModal.value = false
}

function updateEvolutionDescription(index, description) {
  if (character.value.evolutionHistory && character.value.evolutionHistory[index]) {
    character.value.evolutionHistory[index].customDescription = description
  }
}

function confirmEvolution() {
  if (!isEvolutionValid.value) return
  
  // 處理選擇的演化時刻
  const selectedMoments = evolutionModal.value.selectedMoments
  const description = evolutionModal.value.customDescription.trim()
  
  console.log('演化時刻選擇:', {
    moments: selectedMoments.map(key => evolutionMoments[key].name),
    veteranSpecialty: evolutionModal.value.selectedVeteranSpecialty 
      ? veteranSpecialties[evolutionModal.value.selectedVeteranSpecialty].name 
      : '',
    description: description
  })
  
  // 檢查衝突的演化時刻
  const hasRetire = selectedMoments.includes('retire')
  const hasReconstruction = selectedMoments.includes('totalReconstruction')
  
  if (hasRetire && hasReconstruction) {
    alert('「退役」和「總重組」不能同時選擇，請選擇其中一個。')
    return
  }
  
  // 處理老將專長選擇
  if (evolutionModal.value.selectedVeteranSpecialty) {
    if (!character.value.veteranSpecialties) {
      character.value.veteranSpecialties = []
    }
    
    // 添加選擇的老將專長
    if (!character.value.veteranSpecialties.includes(evolutionModal.value.selectedVeteranSpecialty)) {
      character.value.veteranSpecialties.push(evolutionModal.value.selectedVeteranSpecialty)
      
      // 如果選擇了穩扎穩打，更新所有主題卡的改進格
      if (evolutionModal.value.selectedVeteranSpecialty === 'slowSteady') {
        updateThemeCardImprovements()
      }
    }
  }
  
  // 記錄演化歷史（可以後續用於角色記錄）
  if (!character.value.evolutionHistory) {
    character.value.evolutionHistory = []
  }
  
  character.value.evolutionHistory.push({
    date: new Date().toISOString(),
    moments: selectedMoments.map(key => ({
      key: key,
      name: evolutionMoments[key].name,
      description: evolutionMoments[key].description
    })),
    veteranSpecialty: evolutionModal.value.selectedVeteranSpecialty 
      ? {
          key: evolutionModal.value.selectedVeteranSpecialty,
          name: veteranSpecialties[evolutionModal.value.selectedVeteranSpecialty].name,
          description: veteranSpecialties[evolutionModal.value.selectedVeteranSpecialty].description
        } 
      : null,
    customDescription: description
  })
  
  // 根據選擇的演化時刻執行相應的邏輯
  selectedMoments.forEach(momentKey => {
    const moment = evolutionMoments[momentKey]
    if (moment && moment.effect) {
      moment.effect(character.value, evolutionModal.value)
    }
  })
  
  // 如果選擇了「改進你的遊戲」，開啟選擇模態框
  if (evolutionModal.value.selectedVeteranSpecialty === 'levelUpGame') {
    console.log('觸發改進你的遊戲專長，準備開啟模態框')
    console.log('主題卡數量:', character.value.themeCards.length)
    
    // 重置改進相關變數
    levelUpGameImprovementCount.value = 0
    levelUpGameCurrentCardIndex.value = -1
    
    // 重置 LevelUpGameModal
    if (levelUpGameModalRef.value) {
      levelUpGameModalRef.value.resetModal()
    }
    
    // 先關閉演化模態框
    showEvolutionModal.value = false
    
    // 再開啟改進選擇模態框
    setTimeout(() => {
      console.log('開啟 LevelUpGameModal')
      showLevelUpGameModal.value = true
    }, 100)
    return // 不要繼續後續的處理，等待用戶完成改進選擇
  }
  
  // 特殊處理：如果選擇了退役或總重組，顯示特殊提示
  if (hasRetire || hasReconstruction) {
    const message = hasRetire 
      ? '角色已退役。感謝這段冒險旅程！' 
      : '角色已進行總重組。請建立新的主題卡來代表重生後的角色。'
    alert(message)
  }
  
  // 清空演化軌跡
  character.value.evolutionTrack = [false, false, false, false, false]
  
  closeEvolutionModal()
}

// ====================
// 改進你的遊戲相關功能
// ====================
function closeLevelUpGameModal() {
  showLevelUpGameModal.value = false
  levelUpGameCurrentCardIndex.value = -1
}

// 處理玩家選擇要改進的主題卡
function handleLevelUpGameCardSelection(cardIndex) {
  console.log('玩家選擇改進主題卡:', cardIndex, character.value.themeCards[cardIndex])
  
  // 記錄當前選擇的卡片索引
  levelUpGameCurrentCardIndex.value = cardIndex
  
  // 暫時關閉 LevelUpGameModal
  showLevelUpGameModal.value = false
  
  // 準備改進模態框資料
  improvementModal.value = {
    selectedOption: '',
    cardIndex: cardIndex,
    newAbilityText: '',
    selectedWeaknessIndex: null,
    weaknessText: '',
    selectedSpecialty: '',
    isLevelUpGameImprovement: true, // 標記這是改進你的遊戲的改進
    levelUpGameNumber: levelUpGameImprovementCount.value + 1
  }
  
  // 開啟改進模態框
  setTimeout(() => {
    showImprovementModal.value = true
  }, 100)
}

// 處理改進你的遊戲完成
function handleLevelUpGameFinish(completedImprovements) {
  console.log('改進你的遊戲完成，所有改進:', completedImprovements)
  
  // 儲存改進記錄到角色資料
  if (!character.value.levelUpGameImprovements) {
    character.value.levelUpGameImprovements = []
  }
  character.value.levelUpGameImprovements = completedImprovements
  
  // 更新最後一個演化記錄
  if (character.value.evolutionHistory && character.value.evolutionHistory.length > 0) {
    const lastEvolution = character.value.evolutionHistory[character.value.evolutionHistory.length - 1]
    
    if (lastEvolution.veteranSpecialty && lastEvolution.veteranSpecialty.key === 'levelUpGame') {
      lastEvolution.levelUpGameImprovements = completedImprovements
      lastEvolution.customDescription = lastEvolution.customDescription || 
        `完成了7次主題改進：${completedImprovements.map(imp => imp.improvementDescription).join('；')}`
    }
  }
  
  // 重置相關變數
  levelUpGameImprovementCount.value = 0
  levelUpGameCurrentCardIndex.value = -1
  
  // 重置模態框
  if (levelUpGameModalRef.value) {
    levelUpGameModalRef.value.resetModal()
  }
  
  closeLevelUpGameModal()
  
  // 清空演化軌跡
  character.value.evolutionTrack = [false, false, false, false, false]
  
  // 顯示完成提示
  alert(`改進你的遊戲完成！已完成${completedImprovements.length}次主題改進。`)
}

// 處理改進你的遊戲取消
function handleLevelUpGameCancel() {
  console.log('取消改進你的遊戲')
  
  // 重置相關變數
  levelUpGameImprovementCount.value = 0
  levelUpGameCurrentCardIndex.value = -1
  
  // 重置模態框
  if (levelUpGameModalRef.value) {
    levelUpGameModalRef.value.resetModal()
  }
  
  closeLevelUpGameModal()
  
  // 清空演化軌跡
  character.value.evolutionTrack = [false, false, false, false, false]
}

// 獲取改進描述的輔助函數
function getImprovementDescription(modal, card) {
  switch (modal.selectedOption) {
    case 'newAbility':
      return `新增能力標籤："${modal.newAbilityText}"`
    case 'modifyWeakness':
      const weaknessIndex = modal.selectedWeaknessIndex
      const weaknessText = modal.weaknessText.trim()
      
      if (weaknessIndex === 'add') {
        return `新增弱點標籤："${weaknessText}"`
      } else if (weaknessIndex === 0) {
        return `重寫第一個弱點標籤："${weaknessText}"`
      } else if (typeof weaknessIndex === 'number' && weaknessIndex > 0) {
        if (!weaknessText) {
          return `移除弱點標籤`
        } else {
          return `修改弱點標籤："${weaknessText}"`
        }
      }
      return '修改弱點標籤'
    case 'specialty':
      const specialtyData = getAvailableSpecialties(modal.cardIndex)[modal.selectedSpecialty]
      const specialtyName = specialtyData ? specialtyData.name : modal.selectedSpecialty
      return `獲得主題專長："${specialtyName}"`
    default:
      return '未知改進類型'
  }
}

// 獲取改進類型名稱的輔助函數
function getImprovementTypeName(type) {
  const typeNames = {
    addAbility: '新增能力標籤',
    modifyWeakness: '修改弱點標籤',
    specialty: '獲得主題專長'
  }
  return typeNames[type] || type
}

function saveCharacter() {
  if (isCharacterComplete.value) {
    console.log('角色建立完成:', character.value)
    alert('角色建立完成！')
    // 可以導向到角色表頁面或其他頁面
    // await navigateTo('/MO/character-sheet')
  }
}

// 檢查是否有可用的主題專長
function hasAvailableSpecialties(cardIndex) {
  const availableSpecialties = getAvailableSpecialties(cardIndex)
  // 檢查是否有未被選擇的專長
  return Object.values(availableSpecialties).some(specialty => !specialty.isSelected)
}

// 測試改進你的遊戲功能
function testLevelUpGame() {
  alert('測試按鈕被點擊了！')
  console.log('開始測試改進你的遊戲功能')
  
  // 直接添加專長並觸發模態框
  if (!character.value.veteranSpecialties) {
    character.value.veteranSpecialties = []
  }
  
  if (!character.value.veteranSpecialties.includes('levelUpGame')) {
    character.value.veteranSpecialties.push('levelUpGame')
  }
  
  // 創建演化歷史記錄
  if (!character.value.evolutionHistory) {
    character.value.evolutionHistory = []
  }
  
  character.value.evolutionHistory.push({
    date: new Date().toISOString(),
    moments: [{
      key: 'veteranSpecialty',
      name: '獲得一個老將專長',
      description: '從下列老將專長中選擇一個。'
    }],
    veteranSpecialty: {
      key: 'levelUpGame',
      name: '改進你的遊戲',
      description: '從你的主題卡中選擇並進行7次改進。'
    },
    customDescription: ''
  })
  
  // 重置改進相關變數
  levelUpGameImprovementCount.value = 0
  levelUpGameCurrentCardIndex.value = -1
  
  // 重置 LevelUpGameModal
  if (levelUpGameModalRef.value) {
    levelUpGameModalRef.value.resetModal()
  }
  
  // 直接開啟模態框
  console.log('直接開啟 LevelUpGameModal，當前狀態:', showLevelUpGameModal.value)
  console.log('主題卡數量:', character.value.themeCards.length)
  showLevelUpGameModal.value = true
  console.log('設定後狀態:', showLevelUpGameModal.value)
}
</script>

<style scoped>
/* 自定義樣式 */
.backdrop-blur {
  backdrop-filter: blur(10px);
}
</style>
