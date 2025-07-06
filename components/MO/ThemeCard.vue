<template>
  <div 
    v-if="themeCard"
    :class="[
      'backdrop-blur rounded-lg p-4 border-2 transition-all duration-300',
      getThemeColorClasses(themeCard?.selectedThemeType || '')
    ]"
  >
    <!-- 主題區塊 - 顯示主題類型背景圖與圖示 -->
    <!-- 主題區塊 -->
    <div 
      v-if="themeCard.selectedThemeType"
      class="relative rounded-lg overflow-hidden flex items-center justify-between px-4"
      :style="{ 
        backgroundImage: `url(${getThemeHeaderImage()})`,
        backgroundRepeat: 'no-repeat'
      }"
    >
      <!-- 主題類型名稱 -->
      <div class="relative z-10 text-white font-bold drop-shadow-lg">
        {{ getThemeTypeName() }}
      </div>
      
      <!-- 右側圖示 -->
      <div class="relative z-10 flex items-center justify-end ml-auto">
        <img 
          :src="getThemeIcon()" 
          :alt="getThemeTypeName()"
          class="w-8 h-8 drop-shadow-lg filter brightness-110 object-contain"
        />
      </div>
    </div>

    <!-- 主題卡標題與控制 -->
    <div class="flex flex-col space-y-3 mb-4">
      <!-- 主題標題 - 編輯時可直接修改 -->
      <div class="text-center">
        <input 
          v-if="themeCard.isEditing"
          v-model="themeCard.title"
          type="text" 
          placeholder="輸入主題標題"
          class="w-full text-lg font-bold text-center bg-transparent text-white border-b border-purple-400 focus:outline-none focus:border-purple-300"
        />
        <h3 v-else class="text-lg font-bold text-center">
          {{ themeCard.title || `標題 ${cardIndex + 1}` }}
        </h3>
      </div>

      <!-- 編輯時才顯示主題類型與主題選擇 -->
      <div v-if="themeCard.isEditing" class="space-y-2">
        <div>
          <label class="block text-xs font-medium mb-1">主題類型：</label>
          <select 
            v-model="themeCard.selectedThemeType"
            @change="onThemeTypeChange"
            class="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-xs focus:ring-2 focus:ring-purple-500"
          >
            <option value="">請選擇主題類型</option>
            <option value="mythos">神話</option>
            <option value="noise">喧囂</option>
            <option value="self">自我</option>
          </select>
        </div>
        <div v-if="themeCard.selectedThemeType">
          <label class="block text-xs font-medium mb-1">主題：</label>
          <select 
            v-model="themeCard.selectedTheme"
            @change="onThemeChange"
            class="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-xs focus:ring-2 focus:ring-purple-500"
          >
            <option value="">請選擇主題</option>
            <option 
              v-for="(theme, themeKey) in availableThemes" 
              :key="themeKey"
              :value="themeKey"
            >
              {{ theme.theme }}
            </option>
          </select>
        </div>
      </div>

      <button 
        @click="toggleEdit"
        :class="[
          'w-full px-3 py-2 rounded-lg font-medium transition-colors text-sm',
          themeCard.isEditing 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        ]"
      >
        {{ themeCard.isEditing ? '儲存' : '編輯' }}
      </button>
    </div>

    <!-- 主題卡內容 -->
    <div v-if="themeCard.selectedTheme" class="space-y-4">
      <!-- 改進與衰變軌跡 -->
      <div class="mb-4">
        <div class="flex justify-center space-x-6">
          <!-- 改進軌跡 -->
          <div class="flex flex-col items-center">
            <label class="block text-xs font-medium text-gray-300 mb-1">改進軌跡</label>
            <div class="flex space-x-1">
              <button
                v-for="(improvement, index) in themeCard.improvements"
                :key="index"
                @click="toggleImprovement(index)"
                :class="[
                  'w-6 h-6 border border-gray-500 rounded flex items-center justify-center text-xs font-bold transition-colors',
                  improvement.checked 
                    ? 'bg-green-600 border-green-400 text-white' 
                    : 'bg-slate-700 border-slate-600 text-gray-400 hover:border-green-500'
                ]"
              >
                {{ improvement.checked ? '●' : '○' }}
              </button>
            </div>
            <!-- 穩扎穩打專長提示 -->
            <div v-if="themeCard.improvements.length === 5" class="mt-1 text-xs text-yellow-400 text-center">
              穩扎穩打：第5格時獲得兩個改進
            </div>
          </div>

          <!-- 衰變軌跡 -->
          <div class="flex flex-col items-center">
            <label class="block text-xs font-medium text-gray-300 mb-1">衰變軌跡</label>
            <div class="flex space-x-1">
              <button
                v-for="(decay, index) in themeCard.decays.slice(0, 3)"
                :key="index"
                @click="toggleDecay(index)"
                :class="[
                  'w-6 h-6 border border-gray-500 rounded flex items-center justify-center text-xs font-bold transition-colors',
                  decay.checked 
                    ? 'bg-red-600 border-red-400 text-white' 
                    : 'bg-slate-700 border-slate-600 text-gray-400 hover:border-red-500'
                ]"
              >
                {{ decay.checked ? '●' : '○' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 7個能力標籤 -->
      <div>
        <label class="block text-xs font-medium mb-2">能力標籤</label>
        <div class="space-y-2">
          <div 
            v-for="(ability, abilityIndex) in themeCard.abilities" 
            :key="abilityIndex"
            class="flex items-center space-x-1 p-1 bg-slate-700/30 rounded text-xs"
          >
            <input 
              v-if="themeCard.isEditing"
              v-model="ability.text"
              type="text" 
              :placeholder="`能力 ${abilityIndex + 1}`"
              class="flex-1 px-1 py-1 bg-slate-600 border border-slate-500 rounded text-white text-xs focus:ring-1 focus:ring-purple-500"
            />
            <span 
              v-else 
              :class="[
                'flex-1 text-xs break-words',
                ability.isBurned ? 'line-through opacity-50' : ''
              ]"
            >
              {{ ability.text || `能力標籤 ${abilityIndex + 1}` }}
            </span>
            <div class="flex items-center shrink-0">
              <button
                @click="ability.isBurned = !ability.isBurned"
                :class="[
                  'w-6 h-6 rounded-full flex items-center justify-center transition-colors',
                  ability.isBurned 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg' 
                    : 'bg-slate-600 hover:bg-slate-700 text-gray-300'
                ]"
                :title="ability.isBurned ? '點擊恢復能力' : '點擊燒毀能力'"
              >
                <Icon 
                  v-if="ability.isBurned" 
                  name="lucide:flame" 
                  class="w-3 h-3 text-yellow-200" 
                />
                <Icon 
                  v-else 
                  name="lucide:circle" 
                  class="w-3 h-3 text-gray-400" 
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 2個弱點標籤 -->
      <div>
        <label class="block text-xs font-medium mb-2 text-red-400 flex items-center justify-between">
          <span>弱點標籤</span>
        </label>
        <div class="space-y-2">
          <div 
            v-for="(weakness, weaknessIndex) in themeCard.weaknesses" 
            :key="weaknessIndex"
            class="flex items-center space-x-2"
          >
            <div class="flex-1">
              <input 
                v-if="themeCard.isEditing"
                v-model="weakness.text"
                type="text" 
                :placeholder="`弱點 ${weaknessIndex + 1}`"
                class="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded-md text-white text-xs focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <div v-else class="text-xs p-2 bg-red-900/20 border border-red-500/30 rounded break-words min-h-8 flex items-center">
                {{ weakness.text || `弱點標籤 ${weaknessIndex + 1}` }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 主題專長 -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <button
            @click="toggleSpecialtyExpanded"
            class="flex items-center space-x-2 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>主題專長</span>
            <span class="text-xs text-gray-400 ml-1">
              ({{ (themeCard.selectedSpecialties && themeCard.selectedSpecialties.length) || 0 }})
            </span>
            <svg 
              :class="[
                'w-3 h-3 transition-transform duration-200',
                isSpecialtyExpanded ? 'rotate-90' : 'rotate-0'
              ]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        
        <!-- 折疊時的簡要預覽 -->
        <div v-if="!isSpecialtyExpanded && themeCard.selectedSpecialties && themeCard.selectedSpecialties.length > 0" 
             class="mt-2 p-2 bg-amber-900/20 rounded-lg border border-amber-500/30">
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="(specialty, index) in themeCard.selectedSpecialties" 
              :key="index"
              class="inline-flex items-center px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs"
            >
              <span class="w-3 h-3 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-1">
                {{ index + 1 }}
              </span>
              {{ getSpecialtyName(specialty) }}
            </span>
          </div>
        </div>
        
        <div v-if="isSpecialtyExpanded">
          <div v-if="themeCard.selectedSpecialties && themeCard.selectedSpecialties.length > 0" class="space-y-2">
            <div 
              v-for="(specialty, index) in themeCard.selectedSpecialties" 
              :key="index"
              class="text-xs p-2 bg-amber-900/20 border border-amber-500/30 rounded"
            >
              <div class="font-medium text-amber-300 mb-1">{{ getSpecialtyName(specialty) }}</div>
              <div class="text-amber-200">{{ getSpecialtyFullDescription(specialty) }}</div>
            </div>
          </div>
          <div v-else-if="hasAvailableSpecialties" class="text-xs text-gray-400 italic">
            尚未選擇主題專長（改進時可選擇）
          </div>
          <div v-else class="text-xs text-gray-500 italic">
            此主題暫無可用專長
          </div>
        </div>
      </div>

      <!-- 動機區塊 -->
      <div>
        <label class="block text-xs font-medium mb-2">動機</label>
        <div class="space-y-2">
          <!-- 自我主題：身份 -->
          <div v-if="themeCard.selectedThemeType === 'self'">
            <label class="block text-xs text-gray-400 mb-1">身份</label>
            <input 
              v-if="themeCard.isEditing"
              v-model="themeCard.motivation.identity"
              type="text" 
              placeholder="角色身份"
              class="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded-md text-white text-xs focus:ring-2 focus:ring-purple-500"
            />
            <div v-else class="text-xs p-1 bg-slate-700/30 rounded break-words">
              {{ themeCard.motivation.identity || '未設定身份' }}
            </div>
          </div>
          
          <!-- 喧囂主題：癢處 -->
          <div v-if="themeCard.selectedThemeType === 'noise'">
            <label class="block text-xs text-gray-400 mb-1">癢處</label>
            <input 
              v-if="themeCard.isEditing"
              v-model="themeCard.motivation.itch"
              type="text" 
              placeholder="角色癢處"
              class="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded-md text-white text-xs focus:ring-2 focus:ring-purple-500"
            />
            <div v-else class="text-xs p-1 bg-slate-700/30 rounded break-words">
              {{ themeCard.motivation.itch || '未設定癢處' }}
            </div>
          </div>
          
          <!-- 神話主題：儀式 -->
          <div v-if="themeCard.selectedThemeType === 'mythos'">
            <label class="block text-xs text-gray-400 mb-1">儀式</label>
            <input 
              v-if="themeCard.isEditing"
              v-model="themeCard.motivation.ritual"
              type="text" 
              placeholder="維持儀式"
              class="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded-md text-white text-xs focus:ring-2 focus:ring-purple-500"
            />
            <div v-else class="text-xs p-1 bg-slate-700/30 rounded break-words">
              {{ themeCard.motivation.ritual || '未設定儀式' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 未選擇主題時的提示 -->
    <div v-else class="text-center py-4 text-gray-400">
      <p class="text-sm">請先選擇主題類型和主題</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// 折疊狀態管理
const isSpecialtyExpanded = ref(false)

// 定義接口
interface ThemeCard {
  selectedThemeType: string
  selectedTheme: string
  title: string
  abilities: Array<{ text: string; isBurned: boolean }>
  weaknesses: Array<{ text: string }>
  improvements: Array<{ checked: boolean }>
  decays: Array<{ checked: boolean }>
  selectedSpecialty: string // 保留向後相容性
  selectedSpecialties: string[] // 新的多專長陣列
  motivation: {
    identity: string
    ritual: string
    itch: string
  }
  isEditing: boolean
}

interface Theme {
  theme: string
  [key: string]: any
}

interface Props {
  themeCard: ThemeCard
  cardIndex: number
  mythosThemes: Record<string, Theme>
  noiseThemes: Record<string, Theme>
  selfThemes: Record<string, Theme>
}

const props = withDefaults(defineProps<Props>(), {
  themeCard: () => ({
    selectedThemeType: '',
    selectedTheme: '',
    title: '',
    abilities: Array(7).fill(null).map(() => ({ text: '', isBurned: false })),
    weaknesses: Array(2).fill(null).map(() => ({ text: '' })),
    improvements: Array(3).fill(null).map(() => ({ checked: false })),
    decays: Array(3).fill(null).map(() => ({ checked: false })),
    selectedSpecialty: '',
    selectedSpecialties: [],
    motivation: {
      identity: '',
      ritual: '',
      itch: ''
    },
    isEditing: false
  }),
  cardIndex: 0,
  mythosThemes: () => ({}),
  noiseThemes: () => ({}),
  selfThemes: () => ({})
})

// 定義事件
const emit = defineEmits<{
  'update:themeCard': [themeCard: ThemeCard]
  'theme-type-change': [cardIndex: number]
  'theme-change': [cardIndex: number]
  'improvement-change': [cardIndex: number, improvementIndex: number]
  'decay-change': [cardIndex: number, decayIndex: number]
  'toggle-edit': [cardIndex: number]
}>()

// 計算屬性
const availableThemes = computed(() => {
  if (!props.themeCard || !props.themeCard.selectedThemeType) return {}
  
  switch (props.themeCard.selectedThemeType) {
    case 'mythos':
      return props.mythosThemes || {}
    case 'noise':
      return props.noiseThemes || {}
    case 'self':
      return props.selfThemes || {}
    default:
      return {}
  }
})

const specialtyDescription = computed(() => {
  if (!props.themeCard) return ''
  // 保留向後相容性
  return props.themeCard.selectedSpecialty || ''
})

const hasAvailableSpecialties = computed(() => {
  if (!props.themeCard || !props.themeCard.selectedThemeType || !props.themeCard.selectedTheme) return false
  
  const availableSpecialties = getAvailableSpecialtiesForTheme()
  return Object.keys(availableSpecialties).length > 0
})

// 獲取主題的可用專長
const getAvailableSpecialtiesForTheme = () => {
  if (!props.themeCard || !props.themeCard.selectedThemeType || !props.themeCard.selectedTheme) return {}
  
  let themeData = null
  
  switch (props.themeCard.selectedThemeType) {
    case 'mythos':
      themeData = props.mythosThemes[props.themeCard.selectedTheme]
      break
    case 'noise':
      themeData = props.noiseThemes[props.themeCard.selectedTheme]
      break
    case 'self':
      themeData = props.selfThemes[props.themeCard.selectedTheme]
      break
    default:
      return {}
  }
  
  if (!themeData || !themeData.theme_specials) return {}
  
  const specialties: Record<string, any> = {}
  themeData.theme_specials.forEach((special: any, index: number) => {
    const key = `${props.themeCard.selectedTheme}_special_${index}`
    specialties[key] = {
      name: special.name,
      description: special.description
    }
  })
  
  return specialties
}

// 獲取專長名稱
const getSpecialtyName = (specialtyKey: string) => {
  const allSpecialties = getAvailableSpecialtiesForTheme()
  const specialty = allSpecialties[specialtyKey]
  return specialty ? specialty.name : '未知專長'
}

// 獲取專長完整描述
const getSpecialtyFullDescription = (specialtyKey: string) => {
  const allSpecialties = getAvailableSpecialtiesForTheme()
  const specialty = allSpecialties[specialtyKey]
  return specialty ? specialty.description : '專長描述不存在'
}

// 方法
function getThemeColorClasses(themeType: string) {
  switch (themeType) {
    case 'mythos':
      return 'bg-gradient-to-br from-purple-800/80 to-purple-900/80 border-purple-400/50'
    case 'noise':
      return 'bg-gradient-to-br from-cyan-800/80 to-cyan-900/80 border-cyan-400/50'
    case 'self':
      return 'bg-gradient-to-br from-pink-800/80 to-pink-900/80 border-pink-400/50'
    default:
      return 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-400/50'
  }
}

function onThemeTypeChange() {
  emit('theme-type-change', props.cardIndex)
}

function onThemeChange() {
  emit('theme-change', props.cardIndex)
}

function onImprovementChange(improvementIndex: number) {
  emit('improvement-change', props.cardIndex, improvementIndex)
}

function onDecayChange(decayIndex: number) {
  emit('decay-change', props.cardIndex, decayIndex)
}

// 切換改進軌跡
function toggleImprovement(index: number) {
  if (props.themeCard) {
    props.themeCard.improvements[index].checked = !props.themeCard.improvements[index].checked
    
    // 檢查是否所有改進都被勾選
    const allChecked = props.themeCard.improvements.every(imp => imp.checked)
    if (allChecked) {
      onImprovementChange(index)
    }
  }
}

// 切換衰變軌跡
function toggleDecay(index: number) {
  if (props.themeCard) {
    props.themeCard.decays[index].checked = !props.themeCard.decays[index].checked
    
    // 檢查是否所有衰變都被勾選
    const allChecked = props.themeCard.decays.slice(0, 3).every(decay => decay.checked)
    if (allChecked) {
      onDecayChange(index)
    }
  }
}

// 切換專長展開狀態
function toggleSpecialtyExpanded() {
  isSpecialtyExpanded.value = !isSpecialtyExpanded.value
}

function toggleEdit() {
  emit('toggle-edit', props.cardIndex)
}

// 獲取主題背景圖片
function getThemeHeaderImage() {
  const imageMap = {
    'mythos': '/ui_icon/header/header-mythos.webp',
    'noise': '/ui_icon/header/header-noise.webp',
    'self': '/ui_icon/header/header-self.webp'
  } as const
  return imageMap[props.themeCard?.selectedThemeType as keyof typeof imageMap] || '/ui_icon/header/header-mythos.webp'
}

// 獲取主題圖示
function getThemeIcon() {
  const iconMap = {
    'mythos': '/ui_icon/dice_otherscape-mythos_color.png',
    'noise': '/ui_icon/dice_otherscape-noise_color.png',
    'self': '/ui_icon/dice_otherscape-self_color.png'
  } as const
  return iconMap[props.themeCard?.selectedThemeType as keyof typeof iconMap] || '/ui_icon/dice_otherscape-mythos_color.png'
}

// 獲取主題類型名稱
function getThemeTypeName() {
  if (!props.themeCard?.selectedTheme || !props.themeCard?.selectedThemeType) {
    return '主題'
  }
  
  const selectedTheme = availableThemes.value[props.themeCard.selectedTheme]
  return selectedTheme?.theme || '主題'
}
</script>
