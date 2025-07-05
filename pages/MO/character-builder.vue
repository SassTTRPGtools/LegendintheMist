<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
    <!-- 側邊「如何遊玩」書籤 -->
    <div 
      :class="[
        'fixed top-1/2 right-0 transform -translate-y-1/2 z-50 transition-all duration-300 ease-in-out',
        showHowToPlay ? 'translate-x-0' : 'translate-x-80'
      ]"
    >
      <!-- 書籤標籤 -->
      <button 
        @click="showHowToPlay = !showHowToPlay"
        :class="[
          'absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full',
          'bg-purple-600 hover:bg-purple-700 text-white px-2 py-6 rounded-l-lg',
          'writing-mode-vertical text-sm font-bold tracking-wider shadow-lg',
          'transition-colors duration-200'
        ]"
        style="writing-mode: vertical-rl; text-orientation: mixed;"
      >
        如何遊玩
      </button>
      
      <!-- 內容面板 -->
      <div class="bg-slate-800/95 backdrop-blur-sm border-l border-purple-500/30 w-80 h-screen overflow-y-auto shadow-2xl">
        <div class="p-4">
          <!-- 標題區 -->
          <div class="flex items-center justify-between mb-4 border-b border-purple-500/30 pb-3">
            <h3 class="text-lg font-bold text-purple-300">遊戲規則</h3>
            <button 
              @click="showHowToPlay = false"
              class="text-gray-400 hover:text-white p-1 rounded"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- 規則內容 -->
          <div class="space-y-4">
            <!-- 建立行動 -->
            <div class="bg-slate-700/30 rounded-lg p-3">
              <h4 class="font-bold text-green-400 text-sm mb-2 flex items-center">
                <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                建立行動
              </h4>
              <div class="text-xs text-gray-300 space-y-2">
                <p>MC描述場景，宣佈<span class="text-red-400 font-semibold">威脅</span></p>
                <p>描述你的行動，MC決定是否需要<span class="text-purple-400 font-semibold">擲骰</span></p>
                
                <div class="bg-slate-800/50 rounded p-2 mt-2">
                  <p class="text-purple-300 font-semibold text-xs mb-1">快速行動</p>
                  <div class="space-y-1 text-xs">
                    <div class="flex justify-between">
                      <span class="text-green-300">正面標籤</span>
                      <span class="text-green-200">+1 力度</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-red-300">負面標籤</span>
                      <span class="text-red-200">-1 力度</span>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-1 text-xs mt-2">
                  <div class="bg-red-900/30 p-1 rounded text-center">
                    <span class="text-red-300 font-bold">≤6 失誤</span>
                  </div>
                  <div class="bg-yellow-900/30 p-1 rounded text-center">
                    <span class="text-yellow-300 font-bold">7-9 混合</span>
                  </div>
                  <div class="bg-green-900/30 p-1 rounded text-center">
                    <span class="text-green-300 font-bold">≥10 成功</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 追蹤行動 -->
            <div class="bg-slate-700/30 rounded-lg p-3">
              <h4 class="font-bold text-amber-400 text-sm mb-2 flex items-center">
                <div class="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                追蹤行動
              </h4>
              <div class="text-xs text-gray-300 space-y-2">
                <p>成功時，花費力度於效果：</p>
                <div class="grid grid-cols-1 gap-1">
                  <div class="bg-blue-900/30 p-1 rounded">
                    <span class="text-blue-300">狀態 ±1層</span>
                    <span class="text-gray-400 float-right">1力度</span>
                  </div>
                  <div class="bg-purple-900/30 p-1 rounded">
                    <span class="text-purple-300">標籤 ±1個</span>
                    <span class="text-gray-400 float-right">2力度</span>
                  </div>
                  <div class="bg-green-900/30 p-1 rounded">
                    <span class="text-green-300">發現細節</span>
                    <span class="text-gray-400 float-right">1力度</span>
                  </div>
                  <div class="bg-orange-900/30 p-1 rounded">
                    <span class="text-orange-300">額外專長</span>
                    <span class="text-gray-400 float-right">1力度</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 緩解與後果 -->
            <div class="bg-slate-700/30 rounded-lg p-3">
              <h4 class="font-bold text-red-400 text-sm mb-2 flex items-center">
                <div class="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                緩解與後果
              </h4>
              <div class="text-xs text-gray-300 space-y-2">
                <p><span class="text-amber-400 font-semibold">緩解：</span>反應來減少效果</p>
                <div class="grid grid-cols-1 gap-1">
                  <div class="bg-red-900/30 p-1 rounded text-center">
                    <span class="text-red-300">≤6 全部效果</span>
                  </div>
                  <div class="bg-yellow-900/30 p-1 rounded text-center">
                    <span class="text-yellow-300">7-9 花費力度減少</span>
                  </div>
                  <div class="bg-green-900/30 p-1 rounded text-center">
                    <span class="text-green-300">≥10 +1力度</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 改進 -->
            <div class="bg-slate-700/30 rounded-lg p-3">
              <h4 class="font-bold text-purple-400 text-sm mb-2 flex items-center">
                <div class="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                改進
              </h4>
              <div class="text-xs text-gray-300 space-y-2">
                <p>弱點被調用時標記改進</p>
                <p>三格改進後選擇：</p>
                <div class="flex items-center space-x-2 text-xs">
                  <div class="bg-green-600 w-3 h-3 rounded flex items-center justify-center">
                    <span class="text-white text-xs">✓</span>
                  </div>
                  <span class="text-green-300">新能力標籤</span>
                </div>
                <div class="flex items-center space-x-2 text-xs">
                  <div class="bg-amber-600 w-3 h-3 rounded flex items-center justify-center">
                    <span class="text-white text-xs">⚡</span>
                  </div>
                  <span class="text-amber-300">主題專長</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要容器 -->
    <div class="container mx-auto px-4 py-8">
      <!-- 頂部區域 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- 左上角：六角雷達圖 -->
        <CharacterTypeChart :theme-cards="character.themeCards" />

        <!-- 右上角：角色基本資訊 -->
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
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">演化軌跡</label>
              <div class="flex space-x-2">
                <div 
                  v-for="(step, index) in character.evolutionTrack" 
                  :key="index"
                  @click="toggleEvolutionStep(index)"
                  :class="[
                    'w-6 h-6 border-2 rounded flex items-center justify-center text-xs font-bold cursor-pointer transition-colors hover:border-purple-300',
                    step ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-700 border-slate-600 text-gray-400 hover:bg-slate-600'
                  ]"
                >
                  {{ step ? '●' : '○' }}
                </div>
              </div>
              <div class="text-xs text-gray-400 mt-1">
                演化進度：{{ character.evolutionTrack.filter(Boolean).length }}/5
              </div>
            </div>
          </div>
        </div>

        <!-- 第三欄：裝備卡 -->
        <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-purple-500/30">
          <h3 class="text-xl font-bold text-purple-300 mb-4">裝備卡</h3>
          <div class="space-y-4">
            <!-- 裝備名稱 -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">裝備名稱</label>
              <input 
                v-model="character.equipment.name" 
                type="text" 
                class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="輸入裝備名稱"
              />
            </div>

            <!-- 改進與力度 -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2 text-green-400">改進</label>
                <div class="flex space-x-1">
                  <div 
                    v-for="(improvement, impIndex) in character.equipment.improvements" 
                    :key="impIndex"
                    class="flex items-center"
                  >
                    <input 
                      v-model="improvement.checked"
                      @change="onEquipmentImprovementChange(impIndex)"
                      type="checkbox"
                      class="w-4 h-4 text-green-600 bg-slate-600 border-slate-500 rounded focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2 text-blue-400">力度記錄</label>
                <div class="flex items-center space-x-2">
                  <span class="text-blue-300 text-sm">當前力度：</span>
                  <input 
                    v-model.number="character.equipment.power"
                    type="number"
                    min="1"
                    max="10"
                    class="w-16 px-2 py-1 bg-blue-900/30 border border-blue-500/50 rounded text-blue-200 font-bold text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div class="text-xs text-gray-400 mt-1">
                  可手動調整力度數值（1-10）
                </div>
              </div>
            </div>

            <!-- 能力標籤 -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">能力標籤</label>
              <div class="space-y-2">
                <div 
                  v-for="(ability, abilityIndex) in character.equipment.abilities" 
                  :key="abilityIndex"
                  class="flex items-center space-x-1 p-2 bg-slate-700/30 rounded"
                >
                  <input 
                    v-model="ability.text"
                    type="text" 
                    :placeholder="`裝備能力 ${abilityIndex + 1}`"
                    class="flex-1 px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:ring-1 focus:ring-purple-500"
                  />
                  <div class="flex items-center space-x-1">
                    <input 
                      v-model="ability.isBurned"
                      type="checkbox"
                      class="w-3 h-3 text-red-600 bg-slate-600 border-slate-500 rounded focus:ring-red-500"
                    />
                    <label class="text-xs text-red-400">燒</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- 弱點標籤 -->
            <div>
              <label class="block text-sm font-medium mb-2 text-red-400">弱點標籤</label>
              <div class="space-y-2">
                <div 
                  v-for="(weakness, weaknessIndex) in character.equipment.weaknesses" 
                  :key="weaknessIndex"
                  class="bg-red-900/20 border border-red-500/30 rounded p-2"
                >
                  <input 
                    v-model="weakness.text"
                    type="text" 
                    :placeholder="`裝備弱點 ${weaknessIndex + 1}`"
                    class="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded-md text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <!-- 裝備專長 -->
            <div>
              <label class="block text-sm font-medium mb-2 text-amber-400">裝備專長</label>
              <div class="space-y-2">
                <div 
                  v-for="(specialty, index) in character.equipment.specialties" 
                  :key="index"
                  class="bg-amber-900/20 border border-amber-500/30 rounded p-2"
                >
                  <div class="flex items-center justify-between mb-1">
                    <select 
                      v-model="specialty.type"
                      class="text-xs bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white"
                    >
                      <option value="">選擇專長類型</option>
                      <option value="deepCustomization">{{ EQUIPMENT_SPECIALTIES.deepCustomization.name }}</option>
                      <option value="fullEquipment">{{ EQUIPMENT_SPECIALTIES.fullEquipment.name }}</option>
                      <option value="extraCopy">{{ EQUIPMENT_SPECIALTIES.extraCopy.name }}</option>
                      <option value="externalCall">{{ EQUIPMENT_SPECIALTIES.externalCall.name }}</option>
                      <option value="reuse">{{ EQUIPMENT_SPECIALTIES.reuse.name }}</option>
                      <option value="replacementPolicy">{{ EQUIPMENT_SPECIALTIES.replacementPolicy.name }}</option>
                      <option value="sharedWealth">{{ EQUIPMENT_SPECIALTIES.sharedWealth.name }}</option>
                      <option value="synergisticRevenue">{{ EQUIPMENT_SPECIALTIES.synergisticRevenue.name }}</option>
                    </select>
                    <button 
                      @click="removeEquipmentSpecialty(index)"
                      class="text-red-400 hover:text-red-300 text-xs"
                    >
                      移除
                    </button>
                  </div>
                  <div v-if="specialty.type" class="text-xs text-amber-200">
                    {{ getEquipmentSpecialtyDescription(specialty.type) }}
                  </div>
                </div>
                <button 
                  @click="addEquipmentSpecialty"
                  class="w-full px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm transition-colors"
                >
                  新增裝備專長
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 四個主題卡區塊 - 4x1 排列 -->
      <div class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-2 gap-6">
        <div 
          v-for="(card, index) in character.themeCards" 
          :key="index"
          :class="[
            'backdrop-blur rounded-lg p-4 border-2 transition-all duration-300',
            getThemeColorClasses(card.selectedThemeType)
          ]"
        >
          <!-- 主題卡標題與控制 -->
          <div class="flex flex-col space-y-3 mb-4">
            <h3 class="text-lg font-bold text-center">{{ card.title || `標題 ${index + 1}` }}</h3>
            <div class="space-y-2">
              <div>
                <label class="block text-xs font-medium mb-1">主題類型：</label>
                <select 
                  v-model="card.selectedThemeType"
                  @change="onThemeTypeChange(index)"
                  class="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-xs focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">請選擇主題類型</option>
                  <option value="mythos">神話</option>
                  <option value="noise">喧囂</option>
                  <option value="self">自我</option>
                </select>
              </div>
              <div v-if="card.selectedThemeType">
                <label class="block text-xs font-medium mb-1">主題：</label>
                <select 
                  v-model="card.selectedTheme"
                  @change="onThemeChange(index)"
                  class="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-xs focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">請選擇主題</option>
                  <option 
                    v-for="(theme, themeKey) in getAvailableThemes(card.selectedThemeType)" 
                    :key="themeKey"
                    :value="themeKey"
                  >
                    {{ theme.theme }}
                  </option>
                </select>
              </div>
            </div>
            <button 
              @click="toggleEdit(index)"
              :class="[
                'w-full px-3 py-2 rounded-lg font-medium transition-colors text-sm',
                card.isEditing 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              ]"
            >
              {{ card.isEditing ? '儲存' : '編輯' }}
            </button>
          </div>

          <!-- 主題卡內容 -->
          <div v-if="card.selectedTheme" class="space-y-4">
            <!-- 改進與衰變勾選框 -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium mb-2 text-green-400">改進</label>
                <div class="flex space-x-1">
                  <div 
                    v-for="(improvement, impIndex) in card.improvements" 
                    :key="impIndex"
                    class="flex items-center"
                  >
                    <input 
                      v-model="improvement.checked"
                      @change="onImprovementChange(index, impIndex)"
                      type="checkbox"
                      class="w-3 h-3 text-green-600 bg-slate-600 border-slate-500 rounded focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-xs font-medium mb-2 text-red-400">衰變</label>
                <div class="flex space-x-1">
                  <div 
                    v-for="(decay, decayIndex) in card.decays" 
                    :key="decayIndex"
                    class="flex items-center"
                  >
                    <input 
                      v-model="decay.checked"
                      @change="onDecayChange(index, decayIndex)"
                      type="checkbox"
                      class="w-3 h-3 text-red-600 bg-slate-600 border-slate-500 rounded focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- 大標題 -->
            <div>
              <label class="block text-xs font-medium mb-1">主題標題</label>
              <input 
                v-if="card.isEditing"
                v-model="card.title"
                type="text" 
                placeholder="輸入主題標題"
                class="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded-md text-white text-xs focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div v-else class="text-sm font-semibold break-words">
                {{ card.title || '未設定標題' }}
              </div>
            </div>

            <!-- 7個能力標籤 -->
            <div>
              <label class="block text-xs font-medium mb-2">能力標籤</label>
              <div class="space-y-2">
                <div 
                  v-for="(ability, abilityIndex) in card.abilities" 
                  :key="abilityIndex"
                  class="flex items-center space-x-1 p-1 bg-slate-700/30 rounded text-xs"
                >
                  <input 
                    v-if="card.isEditing"
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
                    <input 
                      v-model="ability.isBurned"
                      type="checkbox"
                      class="w-3 h-3 text-red-600 bg-slate-600 border-slate-500 rounded focus:ring-red-500"
                    />
                    <label class="ml-1 text-xs text-red-400">燒</label>
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
                  v-for="(weakness, weaknessIndex) in card.weaknesses" 
                  :key="weaknessIndex"
                  class="flex items-center space-x-2"
                >
                  <div class="flex-1">
                    <input 
                      v-if="card.isEditing"
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
              <label class="block text-xs font-medium mb-2 text-amber-400">主題專長</label>
              <div v-if="card.selectedSpecialty" class="text-xs p-2 bg-amber-900/20 border border-amber-500/30 rounded">
                {{ getSpecialtyDescription(card.selectedSpecialty) }}
              </div>
              <div v-else-if="hasAvailableSpecialties(index)" class="text-xs text-gray-400 italic">
                尚未選擇主題專長（改進時可選擇）
              </div>
              <div v-else class="text-xs text-gray-500 italic">
                此主題暫無可用專長
              </div>
            </div>

            <!-- 動機區塊 -->
            <div>
              <label class="block text-xs font-medium mb-2">動機</label>
              <div class="space-y-2">
                <!-- 自我主題：身份 -->
                <div v-if="card.selectedThemeType === 'self'">
                  <label class="block text-xs text-gray-400 mb-1">身份</label>
                  <input 
                    v-if="card.isEditing"
                    v-model="card.motivation.identity"
                    type="text" 
                    placeholder="角色身份"
                    class="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded-md text-white text-xs focus:ring-2 focus:ring-purple-500"
                  />
                  <div v-else class="text-xs p-1 bg-slate-700/30 rounded break-words">
                    {{ card.motivation.identity || '未設定身份' }}
                  </div>
                </div>
                
                <!-- 喧囂主題：癢處 -->
                <div v-if="card.selectedThemeType === 'noise'">
                  <label class="block text-xs text-gray-400 mb-1">癢處</label>
                  <input 
                    v-if="card.isEditing"
                    v-model="card.motivation.itch"
                    type="text" 
                    placeholder="角色癢處"
                    class="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded-md text-white text-xs focus:ring-2 focus:ring-purple-500"
                  />
                  <div v-else class="text-xs p-1 bg-slate-700/30 rounded break-words">
                    {{ card.motivation.itch || '未設定癢處' }}
                  </div>
                </div>
                
                <!-- 神話主題：儀式 -->
                <div v-if="card.selectedThemeType === 'mythos'">
                  <label class="block text-xs text-gray-400 mb-1">儀式</label>
                  <input 
                    v-if="card.isEditing"
                    v-model="card.motivation.ritual"
                    type="text" 
                    placeholder="維持儀式"
                    class="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded-md text-white text-xs focus:ring-2 focus:ring-purple-500"
                  />
                  <div v-else class="text-xs p-1 bg-slate-700/30 rounded break-words">
                    {{ card.motivation.ritual || '未設定儀式' }}
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
      </div>

      <!-- 改進彈窗 -->
      <div 
        v-if="showImprovementModal" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closeImprovementModal"
      >
        <div class="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-purple-500/30">
          <h3 class="text-xl font-bold text-purple-300 mb-4">主題改進選項</h3>
          <p class="text-sm text-gray-300 mb-4">
            改進已填滿！請選擇一個改進選項，完成後會清空改進勾選框並填滿一格演化軌跡。
          </p>
          
          <div class="space-y-4">
            <!-- 新增能力標籤 -->
            <div class="space-y-2">
              <label class="flex items-center space-x-2">
                <input 
                  v-model="improvementModal.selectedOption" 
                  type="radio" 
                  value="newAbility"
                  class="text-purple-600"
                />
                <span class="text-sm text-white">創建一個新的能力標籤</span>
              </label>
              <input 
                v-if="improvementModal.selectedOption === 'newAbility'"
                v-model="improvementModal.newAbilityText"
                type="text" 
                placeholder="輸入新能力標籤"
                class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <!-- 修改弱點標籤 -->
            <div class="space-y-2">
              <label class="flex items-center space-x-2">
                <input 
                  v-model="improvementModal.selectedOption" 
                  type="radio" 
                  value="modifyWeakness"
                  class="text-purple-600"
                />
                <span class="text-sm text-white">新增、重寫或移除一個弱點標籤</span>
              </label>
              <div v-if="improvementModal.selectedOption === 'modifyWeakness'" class="space-y-3">
                <!-- 弱點選擇 -->
                <div>
                  <label class="block text-xs font-medium text-gray-300 mb-2">選擇要修改的弱點標籤：</label>
                  <div class="space-y-2">
                    <div 
                      v-for="(weakness, weaknessIndex) in getTargetCardWeaknesses()" 
                      :key="weaknessIndex"
                      class="flex items-center space-x-2"
                    >
                      <input 
                        v-model="improvementModal.selectedWeaknessIndex" 
                        :value="weaknessIndex"
                        type="radio" 
                        :id="`weakness-${weaknessIndex}`"
                        class="text-purple-600"
                      />
                      <label 
                        :for="`weakness-${weaknessIndex}`" 
                        class="flex-1 text-xs p-2 bg-slate-700/50 rounded border cursor-pointer hover:bg-slate-600/50"
                      >
                        <span class="font-medium text-red-300">弱點 {{ weaknessIndex + 1 }}：</span>
                        <span class="text-gray-300">{{ weakness.text || '（空白）' }}</span>
                        <span v-if="weaknessIndex === 0" class="text-xs text-amber-400 ml-2">（不可移除）</span>
                      </label>
                    </div>
                    <!-- 新增選項 -->
                    <div class="flex items-center space-x-2">
                      <input 
                        v-model="improvementModal.selectedWeaknessIndex" 
                        value="add"
                        type="radio" 
                        id="weakness-add"
                        class="text-purple-600"
                      />
                      <label 
                        for="weakness-add" 
                        class="flex-1 text-xs p-2 bg-green-900/20 border border-green-500/30 rounded cursor-pointer hover:bg-green-800/30"
                      >
                        <span class="font-medium text-green-300">新增新的弱點標籤</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <!-- 弱點內容輸入 -->
                <div v-if="improvementModal.selectedWeaknessIndex !== null">
                  <label class="block text-xs font-medium text-gray-300 mb-1">
                    {{ getWeaknessActionLabel() }}
                  </label>
                  <input 
                    v-model="improvementModal.weaknessText"
                    type="text" 
                    :placeholder="getWeaknessPlaceholder()"
                    class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:ring-2 focus:ring-purple-500"
                  />
                  <div v-if="canRemoveWeakness()" class="text-xs text-gray-400 mt-1">
                    提示：留空即可移除此弱點標籤
                  </div>
                </div>
              </div>
            </div>

            <!-- 選擇主題專長 -->
            <div v-if="hasAvailableSpecialties(improvementModal.cardIndex)" class="space-y-2">
              <label class="flex items-center space-x-2">
                <input 
                  v-model="improvementModal.selectedOption" 
                  type="radio" 
                  value="specialty"
                  class="text-purple-600"
                />
                <span class="text-sm text-white">選擇主題專長</span>
              </label>
              <select 
                v-if="improvementModal.selectedOption === 'specialty'"
                v-model="improvementModal.selectedSpecialty"
                class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:ring-2 focus:ring-purple-500"
              >
                <option value="">請選擇專長</option>
                <option 
                  v-for="(specialty, key) in getAvailableSpecialties(improvementModal.cardIndex)" 
                  :key="key"
                  :value="key"
                >
                  {{ specialty.name }}
                </option>
              </select>
            </div>
            <div v-else class="text-xs text-gray-500 italic p-2 bg-slate-700/30 rounded">
              此主題暫無可用專長
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button 
              @click="closeImprovementModal"
              class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              取消
            </button>
            <button 
              @click="confirmImprovement"
              :disabled="!isImprovementValid"
              :class="[
                'px-4 py-2 rounded-lg transition-colors',
                isImprovementValid 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-slate-600 text-gray-400 cursor-not-allowed'
              ]"
            >
              確定
            </button>
          </div>
        </div>
      </div>

      <!-- 裝備改進彈窗 -->
      <div 
        v-if="showEquipmentModal" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closeEquipmentModal"
      >
        <div class="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-purple-500/30">
          <h3 class="text-xl font-bold text-amber-300 mb-4">裝備改進選項</h3>
          <p class="text-sm text-gray-300 mb-4">
            裝備改進已填滿！請選擇一個改進選項。
          </p>
          
          <div class="space-y-4">
            <!-- 永久 +1 力度 -->
            <div class="space-y-2">
              <label class="flex items-center space-x-2">
                <input 
                  v-model="equipmentModal.selectedOption" 
                  type="radio" 
                  value="powerIncrease"
                  class="text-amber-600"
                />
                <span class="text-sm text-white">獲得永久 +1 力度</span>
              </label>
              <div v-if="equipmentModal.selectedOption === 'powerIncrease'" class="text-xs text-gray-400 ml-6">
                當前力度：{{ character.equipment.power }} → {{ character.equipment.power + 1 }}
              </div>
            </div>

            <!-- 新增裝備專長 -->
            <div class="space-y-2">
              <label class="flex items-center space-x-2">
                <input 
                  v-model="equipmentModal.selectedOption" 
                  type="radio" 
                  value="newSpecialty"
                  class="text-amber-600"
                />
                <span class="text-sm text-white">選擇一個新的裝備主題專長</span>
              </label>
              <select 
                v-if="equipmentModal.selectedOption === 'newSpecialty'"
                v-model="equipmentModal.selectedSpecialty"
                class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:ring-2 focus:ring-amber-500"
              >
                <option value="">請選擇專長</option>
                <option value="deepCustomization">{{ EQUIPMENT_SPECIALTIES.deepCustomization.name }}</option>
                <option value="fullEquipment">{{ EQUIPMENT_SPECIALTIES.fullEquipment.name }}</option>
                <option value="extraCopy">{{ EQUIPMENT_SPECIALTIES.extraCopy.name }}</option>
                <option value="externalCall">{{ EQUIPMENT_SPECIALTIES.externalCall.name }}</option>
                <option value="reuse">{{ EQUIPMENT_SPECIALTIES.reuse.name }}</option>
                <option value="replacementPolicy">{{ EQUIPMENT_SPECIALTIES.replacementPolicy.name }}</option>
                <option value="sharedWealth">{{ EQUIPMENT_SPECIALTIES.sharedWealth.name }}</option>
                <option value="synergisticRevenue">{{ EQUIPMENT_SPECIALTIES.synergisticRevenue.name }}</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button 
              @click="closeEquipmentModal"
              class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              取消
            </button>
            <button 
              @click="confirmEquipmentImprovement"
              :disabled="!isEquipmentImprovementValid"
              :class="[
                'px-4 py-2 rounded-lg transition-colors',
                isEquipmentImprovementValid 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                  : 'bg-slate-600 text-gray-400 cursor-not-allowed'
              ]"
            >
              確定
            </button>
          </div>
        </div>
      </div>

      <!-- 衰變彈窗 -->
      <div 
        v-if="showDecayModal" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closeDecayModal"
      >
        <div class="bg-slate-800 rounded-lg p-6 max-w-lg w-full mx-4 border border-red-500/30">
          <h3 class="text-xl font-bold text-red-300 mb-4">主題失去</h3>
          <div class="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-4">
            <p class="text-sm text-red-200 mb-3 font-semibold">
              你已失去主題，請進行以下紀錄：
            </p>
            
            <div class="space-y-2 text-sm text-gray-300">
              <div class="flex justify-between items-center">
                <span>• 失去主題：</span>
                <span class="text-red-300 font-medium">{{ decayModal.lostTheme }}</span>
              </div>
              
              <div v-if="decayModal.lostAbilities.length > 0">
                <div class="flex justify-between items-center">
                  <span>• 失去前三個能力標籤：</span>
                  <span class="text-amber-300">{{ decayModal.lostAbilities.length }} 個</span>
                </div>
                <div class="ml-4 text-xs text-gray-400">
                  <div v-for="(ability, index) in decayModal.lostAbilities" :key="index">
                    {{ index + 1 }}. {{ ability || '（空白）' }}
                  </div>
                </div>
              </div>
              
              <div v-if="decayModal.lostWeaknesses.length > 0">
                <div class="flex justify-between items-center">
                  <span>• 失去額外弱點標籤：</span>
                  <span class="text-amber-300">{{ decayModal.lostWeaknesses.length }} 個</span>
                </div>
                <div class="ml-4 text-xs text-gray-400">
                  <div v-for="(weakness, index) in decayModal.lostWeaknesses" :key="index">
                    {{ index + 2 }}. {{ weakness || '（空白）' }}
                  </div>
                </div>
              </div>
              
              <div v-if="decayModal.lostSpecialty">
                <div class="flex justify-between items-center">
                  <span>• 失去主題專長：</span>
                  <span class="text-amber-300">1 個</span>
                </div>
                <div class="ml-4 text-xs text-gray-400">
                  {{ decayModal.lostSpecialty }}
                </div>
              </div>
              
              <div class="border-t border-red-500/30 pt-2 mt-3">
                <div class="flex justify-between items-center font-semibold">
                  <span class="text-purple-300">總演化點數：</span>
                  <span class="text-purple-200">{{ decayModal.evolutionPoints }} 點</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button 
              @click="closeDecayModal"
              class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              取消
            </button>
            <button 
              @click="confirmDecay"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              確認失去主題
            </button>
          </div>
        </div>
      </div>

      <!-- 演化時刻彈窗 -->
      <div 
        v-if="showEvolutionModal" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closeEvolutionModal"
      >
        <div class="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 border border-purple-500/30 max-h-[90vh] overflow-y-auto">
          <h3 class="text-xl font-bold text-purple-300 mb-4">演化時刻</h3>
          <p class="text-sm text-gray-300 mb-4">
            演化軌跡已填滿！請選擇你的演化時刻升級。完成後會清空演化軌跡。
          </p>
          
          <!-- 演化時刻選擇提示 -->
          <div class="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <div class="text-sm text-blue-200">
              <strong>演化時刻說明：</strong>
              <ul class="mt-2 space-y-1 text-xs">
                <li>• 你可以選擇多個演化時刻升級</li>
                <li>• 「退役」和「總重組」是終極選項，會結束或完全改變當前角色</li>
                <li>• 「獲得老將專長」可以多次選擇</li>
                <li>• 建議為重要的演化時刻填寫描述以記錄角色轉變</li>
              </ul>
            </div>
          </div>
          
          <div class="space-y-6">
            <!-- 演化時刻選項 -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-3">選擇演化時刻（可選擇多個）：</label>
              <div class="space-y-3">
                <div 
                  v-for="(moment, key) in evolutionMoments" 
                  :key="key"
                  class="border border-slate-600 rounded-lg p-4 hover:border-purple-500/50 transition-colors relative group"
                >
                  <label class="flex items-start space-x-3 cursor-pointer">
                    <input 
                      v-model="evolutionModal.selectedMoments" 
                      type="checkbox" 
                      :value="key"
                      class="mt-1 text-purple-600"
                    />
                    <div class="flex-1">
                      <div class="font-medium text-white">{{ moment.name }}</div>
                      <div class="text-sm text-gray-400 mt-1">{{ moment.description }}</div>
                    </div>
                    
                    <!-- 懸浮說明圖示 -->
                    <div class="text-gray-400 hover:text-purple-300 ml-2 relative">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                      </svg>
                      
                      <!-- 懸浮說明視窗 -->
                      <div class="absolute right-0 top-8 w-80 bg-slate-900 border border-purple-500/30 rounded-lg p-3 text-sm text-gray-200 shadow-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div class="font-semibold text-purple-300 mb-2">{{ moment.name }}</div>
                        <div class="text-xs leading-relaxed">{{ moment.description }}</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <!-- 老將專長選擇（當選擇了對應的演化時刻時顯示） -->
            <div v-if="evolutionModal.selectedMoments.includes('veteranSpecialty')">
              <label class="block text-sm font-medium text-gray-300 mb-3">選擇老將專長：</label>
              <div class="relative">
                <select 
                  v-model="evolutionModal.selectedVeteranSpecialty"
                  class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">-- 請選擇老將專長 --</option>
                  <option 
                    v-for="(specialty, key) in veteranSpecialties" 
                    :key="key" 
                    :value="key"
                  >
                    {{ specialty.name }}
                  </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              <!-- 老將專長說明 -->
              <div 
                v-if="evolutionModal.selectedVeteranSpecialty && veteranSpecialties[evolutionModal.selectedVeteranSpecialty]"
                class="mt-2 p-3 bg-slate-700 rounded-md border border-slate-600"
              >
                <div class="text-sm text-gray-300">
                  <strong class="text-purple-300">{{ veteranSpecialties[evolutionModal.selectedVeteranSpecialty].name }}：</strong>
                  {{ veteranSpecialties[evolutionModal.selectedVeteranSpecialty].description }}
                </div>
              </div>
            </div>

            <!-- 自訂演化描述 -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">演化描述（選填）：</label>
              
              <!-- 提示訊息 -->
              <div 
                v-if="needsEvolutionDescription"
                class="mb-2 p-2 bg-amber-900/20 border border-amber-500/30 rounded text-xs text-amber-200"
              >
                <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                建議為你選擇的演化時刻填寫詳細描述，這將有助於記錄角色的重要轉變。
              </div>
              
              <textarea 
                v-model="evolutionModal.customDescription"
                class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent h-20 resize-none text-sm"
                placeholder="描述角色在此次演化時刻的變化..."
              />
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button 
              @click="closeEvolutionModal"
              class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-md transition-colors"
            >
              取消
            </button>
            <button 
              @click="confirmEvolution"
              :disabled="!isEvolutionValid"
              :class="[
                'px-4 py-2 rounded-md transition-colors',
                isEvolutionValid 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-slate-600 text-gray-400 cursor-not-allowed'
              ]"
            >
              確認演化
            </button>
          </div>
        </div>
      </div>

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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CharacterTypeChart from '~/components/MO/CharacterTypeChart.vue'

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
    description: '當你獲得超過限制的狀態（通常為tier-6）時，可於下一幕初移除一次。第二次則於下一次休息時移除，第三次於任務結束時移除。移除後也會消除該特技。'
  },
  customizableGear: {
    name: '可自訂裝備',
    description: '每場戲可燃燒一個裝備標籤並回復另一個。'
  },
  experiencedEfficiency: {
    name: '經驗效率',
    description: '每場戲一次，在休息時選擇力量加成時，你可以獲得5點力度而非3點。'
  },
  godSlayer: {
    name: '屠神者',
    description: '在一次互動（戰鬥、社交、魔法等）中，可忽略最多3級的難度，由主持人（MC）決定是否適用此特技。'
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
    description: '你和主持人將共同創建一個新的精髓類型，來契合你的角色、故事和他們的新身份，並賦予其專屬的精髓專長。這個新精髓類型將成為你的系列劇的一部分，其他滿足條件的玩家也能選擇此精髓類型。',
    effect: (character, modal) => {
      console.log('創建新的精髓類型', modal.customDescription)
    }
  },
  secondGeneralTag: {
    name: '創建另一個廣義能力標籤',
    description: '每個角色通常只能擁有一個廣義能力標籤，但藉由這次演化，你可以創建第二個廣義能力標籤。為你的一個主題創建新的廣義能力標籤。若將來失去該主題，可以回答替代主題書中與廣義能力標籤相關的問題。角色不應擁有超過兩個廣義能力標籤。',
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
    description: '你的角色已走到盡頭，是時候說再見了。你可以選擇退役條件，可能英勇犧牲、帶著最後的勝利笑聲離去，或死於無謂而浪費的死亡。或許他們逃往荒野過孤獨生活，或加入隱秘的嬉皮派系，再也不被發現。也許組建家庭，過著富裕的信仰生活，複製自己進入網路空間，或升華為噬源者。',
    effect: (character, modal) => {
      console.log('角色退役', modal.customDescription)
    }
  },
  breakCosmology: {
    name: '破壞宇宙論（敘事發展）',
    description: '你做出一項發現，改變世界，或以重新定義系列的方式轉變。或許你發現異星生命或科技，或在你的系列中，它們成為第一個人類混血體。或許你發現世界是模擬，神話是叛變程式在試圖喚醒人類的網路夢境。或許你的自由鬥士派系對抗企業，帶來首次巨型城市的企業級勝利，連帶所有責任與複雜局面。與主持人討論你想要的改變，並協作將其融入你的系列。',
    effect: (character, modal) => {
      console.log('破壞宇宙論', modal.customDescription)
    }
  },
  totalReconstruction: {
    name: '總重組（尊重）',
    description: '你的角色不再是過去的自己，完全轉變為新存在。這並非部分更替，而是所有主題同時被替換，任何結果都有可能。或許他們死於戰鬥，身體被增強部件取代，意識上傳至網路空間。或許他們被選為鳳凰化身，在火焰中重生，重新建立完整人格、身體與數據紀錄，展開新生活，沒有人知道。當你重塑角色時，創建四個新主題，就像創造新角色一樣。此外，根據舊角色架構，新角色將獲得：每個主題前三個能力標籤免費改進一次、每個主題第一個弱點標籤免費改進一次、每個主題一個免費的專屬特技、舊角色所有演化點、舊角色所有演化時刻。每個演化升級可依改進規則應用於新角色的主題。演化時刻可重新分配至新主題。',
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
  selectedSpecialty: ''
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

// 初始化角色資料
const character = ref({
  name: '',
  background: '',
  evolutionTrack: [false, false, false, false, false], // 五個演化軌跡格子
  evolutionHistory: [], // 演化歷史記錄
  equipment: createEmptyEquipment(),
  themeCards: Array(4).fill().map(() => createEmptyThemeCard())
})

// 載入主題資料
onMounted(async () => {
  try {
    const [mythosRes, noiseRes, selfRes] = await Promise.all([
      fetch('/MO/mythos-themes.json'),
      fetch('/MO/noise-themes.json'),
      fetch('/MO/self-themes.json')
    ])
    
    mythosThemes.value = (await mythosRes.json()).themes
    noiseThemes.value = (await noiseRes.json()).themes
    selfThemes.value = (await selfRes.json()).themes
  } catch (error) {
    console.error('載入主題資料失敗:', error)
  }
})

// 計算屬性
const isCharacterComplete = computed(() => {
  return character.value.name && 
         character.value.themeCards.every(card => 
           card.selectedThemeType && card.selectedTheme
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

// 方法
function getThemeColorClasses(themeType) {
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

function getAvailableThemes(themeType) {
  switch (themeType) {
    case 'mythos':
      return mythosThemes.value
    case 'noise':
      return noiseThemes.value
    case 'self':
      return selfThemes.value
    default:
      return {}
  }
}

function getThemeData(themeType, themeKey) {
  const themes = getAvailableThemes(themeType)
  return themes[themeKey] || null
}

function onThemeTypeChange(cardIndex) {
  const card = character.value.themeCards[cardIndex]
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
  const themeData = getThemeData(card.selectedThemeType, card.selectedTheme)
  
  if (themeData) {
    // 不自動填入標題，讓使用者自己設定
    // card.title = themeData.title || ''
    // 可以在這裡預填入一些能力標籤範例
  }
}

function toggleEdit(cardIndex) {
  const card = character.value.themeCards[cardIndex]
  if (card.isEditing) {
    // 儲存邏輯可以在這裡執行
    console.log(`儲存主題卡 ${cardIndex + 1}:`, card)
  }
  card.isEditing = !card.isEditing
}

// ====================
// 工具函數
// ====================
function createEmptyThemeCard() {
  return {
    selectedThemeType: '',
    selectedTheme: '',
    title: '',
    abilities: Array(7).fill().map(() => ({ text: '', isBurned: false })),
    weaknesses: Array(2).fill().map(() => ({ text: '' })),
    improvements: Array(3).fill().map(() => ({ checked: false })),
    decays: Array(3).fill().map(() => ({ checked: false })),
    selectedSpecialty: '',
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
    improvements: Array(3).fill().map(() => ({ checked: false })),
    power: 1,
    abilities: Array(5).fill().map(() => ({ text: '', isBurned: false })),
    weaknesses: Array(2).fill().map(() => ({ text: '' })),
    specialties: []
  }
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
    equipment: createEmptyEquipment(),
    themeCards: Array(4).fill().map(() => createEmptyThemeCard())
  }
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
  const allChecked = card.improvements.every(imp => imp.checked)
  
  if (allChecked) {
    // 開啟改進彈窗
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
    selectedSpecialty: ''
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
      // 設定主題專長
      card.selectedSpecialty = modal.selectedSpecialty
      break
  }
  
  // 清空改進勾選框
  card.improvements.forEach(imp => imp.checked = false)
  
  // 填滿一格演化軌跡
  const emptyTrackIndex = character.value.evolutionTrack.findIndex(track => !track)
  if (emptyTrackIndex !== -1) {
    character.value.evolutionTrack[emptyTrackIndex] = true
  }
  
  // 關閉彈窗
  showImprovementModal.value = false
}

// 檢查是否有可用的主題專長
function hasAvailableSpecialties(cardIndex) {
  const availableSpecialties = getAvailableSpecialties(cardIndex)
  return Object.keys(availableSpecialties).length > 0
}

// 獲取可用的主題專長
function getAvailableSpecialties(cardIndex) {
  const card = character.value.themeCards[cardIndex]
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
  
  // 將 theme_specials 陣列轉換為物件格式，供下拉選單使用
  const specialties = {}
  themeData.theme_specials.forEach((special, index) => {
    const key = `${themeKey}_special_${index}`
    specialties[key] = {
      name: special.name,
      description: special.description
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
    character.value.equipment.specialties.push({
      type: equipmentModal.value.selectedSpecialty,
      description: getEquipmentSpecialtyDescription(equipmentModal.value.selectedSpecialty)
    })
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
  
  // 重置主題卡
  character.value.themeCards[cardIndex] = createEmptyThemeCard()
  
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

function saveCharacter() {
  if (isCharacterComplete.value) {
    console.log('角色建立完成:', character.value)
    alert('角色建立完成！')
    // 可以導向到角色表頁面或其他頁面
    // await navigateTo('/MO/character-sheet')
  }
}
</script>

<style scoped>
/* 自定義樣式 */
.backdrop-blur {
  backdrop-filter: blur(10px);
}
</style>
