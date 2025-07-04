<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
    <!-- 主要容器 -->
    <div class="container mx-auto px-4 py-8">
      <!-- 頂部區域 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- 左上角：六角雷達圖 -->
        <div class="bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-purple-500/30">
          <h3 class="text-xl font-bold text-purple-300 mb-4">角色類型圖</h3>
          <div class="aspect-square relative bg-slate-700/50 rounded-lg flex items-center justify-center">
            <!-- 六角雷達圖 -->
            <div class="w-96 h-96 relative">
              <svg viewBox="0 0 380 380" class="w-full h-full">
                <!-- 定義漸層 -->
                <defs>
                  <!-- 神話漸層 -->
                  <radialGradient id="mythosGradient" cx="0.5" cy="0.5" r="0.8">
                    <stop offset="0%" stop-color="rgba(168, 85, 247, 0.8)" stop-opacity="1"/>
                    <stop offset="100%" stop-color="rgba(168, 85, 247, 0.3)" stop-opacity="0.6"/>
                  </radialGradient>
                  
                  <!-- 喧囂漸層 -->
                  <radialGradient id="noiseGradient" cx="0.5" cy="0.5" r="0.8">
                    <stop offset="0%" stop-color="rgba(6, 182, 212, 0.8)" stop-opacity="1"/>
                    <stop offset="100%" stop-color="rgba(6, 182, 212, 0.3)" stop-opacity="0.6"/>
                  </radialGradient>
                  
                  <!-- 自我漸層 -->
                  <radialGradient id="selfGradient" cx="0.5" cy="0.5" r="0.8">
                    <stop offset="0%" stop-color="rgba(236, 72, 153, 0.8)" stop-opacity="1"/>
                    <stop offset="100%" stop-color="rgba(236, 72, 153, 0.3)" stop-opacity="0.6"/>
                  </radialGradient>
                </defs>

                <!-- 六角形背景框架 -->
                <g opacity="0.2" stroke="rgba(139, 92, 246, 0.5)" stroke-width="1" fill="none">
                  <!-- 第4層六角形 (最外層) - 半徑110 -->
                  <polygon points="190,80 285,135 285,245 190,300 95,245 95,135" />
                  <!-- 第3層六角形 - 半徑82.5 -->
                  <polygon points="190,107.5 261.4,148.25 261.4,231.75 190,272.5 118.6,231.75 118.6,148.25" />
                  <!-- 第2層六角形 - 半徑55 -->
                  <polygon points="190,135 237.6,167.5 237.6,212.5 190,245 142.4,212.5 142.4,167.5" />
                  <!-- 第1層六角形 (最內層) - 半徑27.5 -->
                  <polygon points="190,162.5 213.8,176.25 213.8,203.75 190,217.5 166.2,203.75 166.2,176.25" />
                  
                  <!-- 從中心到各頂點的線 -->
                  <line x1="190" y1="190" x2="190" y2="80" />   <!-- 到上方 -->
                  <line x1="190" y1="190" x2="285" y2="135" />  <!-- 到右上 -->
                  <line x1="190" y1="190" x2="285" y2="245" />  <!-- 到右下 -->
                  <line x1="190" y1="190" x2="190" y2="300" />  <!-- 到下方 -->
                  <line x1="190" y1="190" x2="95" y2="245" />   <!-- 到左下 -->
                  <line x1="190" y1="190" x2="95" y2="135" />   <!-- 到左上 -->
                </g>

                <!-- 神話區域填滿 (左側兩個區塊：靈性主義者 + 化身/傳導者) -->
                <g v-if="mythosCount > 0">
                  <!-- 神話單獨區域 -->
                  <path 
                    v-if="mythosCount > 0 && noiseCount === 0 && selfCount === 0"
                    :d="getMythosOnlyPath()" 
                    fill="url(#mythosGradient)" 
                    stroke="#a855f7" 
                    stroke-width="2"
                    opacity="0.8"
                  />
                  <!-- 神話+喧囂混合區域 -->
                  <path 
                    v-else-if="mythosCount > 0 && noiseCount > 0 && selfCount === 0"
                    :d="getMythosNoiseHalfPath()" 
                    fill="url(#mythosGradient)" 
                    stroke="#a855f7" 
                    stroke-width="2"
                    opacity="0.6"
                  />
                  <!-- 神話+自我混合區域 -->
                  <path 
                    v-else-if="mythosCount > 0 && selfCount > 0 && noiseCount === 0"
                    :d="getMythosSelfHalfPath()" 
                    fill="url(#mythosGradient)" 
                    stroke="#a855f7" 
                    stroke-width="2"
                    opacity="0.6"
                  />
                  <!-- 三種主題混合：神話區域 -->
                  <path 
                    v-if="mythosCount > 0 && noiseCount > 0 && selfCount > 0"
                    :d="getAllThemesMythosPath()" 
                    fill="url(#mythosGradient)" 
                    stroke="#a855f7" 
                    stroke-width="1"
                    opacity="0.7"
                  />
                    opacity="0.6"
                  />
                </g>

                <!-- 喧囂區域填滿 (右上兩個區塊：超人類 + 奇點) -->
                <g v-if="noiseCount > 0">
                  <!-- 喧囂單獨區域 -->
                  <path 
                    v-if="noiseCount > 0 && mythosCount === 0 && selfCount === 0"
                    :d="getNoiseOnlyPath()" 
                    fill="url(#noiseGradient)" 
                    stroke="#06b6d4" 
                    stroke-width="2"
                    opacity="0.8"
                  />
                  <!-- 喧囂+神話混合區域 -->
                  <path 
                    v-else-if="noiseCount > 0 && mythosCount > 0 && selfCount === 0"
                    :d="getNoiseHalfPath()" 
                    fill="url(#noiseGradient)" 
                    stroke="#06b6d4" 
                    stroke-width="2"
                    opacity="0.6"
                  />
                  <!-- 喧囂+自我混合區域 -->
                  <path 
                    v-else-if="noiseCount > 0 && selfCount > 0 && mythosCount === 0"
                    :d="getNoiseSelfHalfPath()" 
                    fill="url(#noiseGradient)" 
                    stroke="#06b6d4" 
                    stroke-width="2"
                    opacity="0.6"
                  />
                  <!-- 三種主題混合：喧囂區域 -->
                  <path 
                    v-if="mythosCount > 0 && noiseCount > 0 && selfCount > 0"
                    :d="getAllThemesNoisePath()" 
                    fill="url(#noiseGradient)" 
                    stroke="#06b6d4" 
                    stroke-width="1"
                    opacity="0.7"
                  />
                </g>

                <!-- 自我區域填滿 (右下兩個區塊：賽博格 + 現實人類 + 靈性主義者) -->
                <g v-if="selfCount > 0">
                  <!-- 自我單獨區域 -->
                  <path 
                    v-if="selfCount > 0 && mythosCount === 0 && noiseCount === 0"
                    :d="getSelfOnlyPath()" 
                    fill="url(#selfGradient)" 
                    stroke="#ec4899" 
                    stroke-width="2"
                    opacity="0.8"
                  />
                  <!-- 自我+神話混合區域 -->
                  <path 
                    v-else-if="selfCount > 0 && mythosCount > 0 && noiseCount === 0"
                    :d="getSelfHalfPath()" 
                    fill="url(#selfGradient)" 
                    stroke="#ec4899" 
                    stroke-width="2"
                    opacity="0.6"
                  />
                  <!-- 自我+喧囂混合區域 -->
                  <path 
                    v-else-if="selfCount > 0 && noiseCount > 0 && mythosCount === 0"
                    :d="getSelfNoiseHalfPath()" 
                    fill="url(#selfGradient)" 
                    stroke="#ec4899" 
                    stroke-width="2"
                    opacity="0.6"
                  />
                  <!-- 三種主題混合：自我區域 -->
                  <path 
                    v-if="mythosCount > 0 && noiseCount > 0 && selfCount > 0"
                    :d="getAllThemesSelfPath()" 
                    fill="url(#selfGradient)" 
                    stroke="#ec4899" 
                    stroke-width="1"
                    opacity="0.7"
                  />
                </g>

                <!-- 六個頂點標籤 -->
                <text x="190" y="65" text-anchor="middle" fill="#67e8f9" font-size="12" font-weight="bold">超人類</text>
                <text x="300" y="140" text-anchor="start" fill="#06b6d4" font-size="12" font-weight="bold">奇點</text>
                <text x="300" y="250" text-anchor="start" fill="#22d3ee" font-size="12" font-weight="bold">賽博格</text>
                <text x="190" y="320" text-anchor="middle" fill="#f472b6" font-size="12" font-weight="bold">現實人類</text>
                <text x="80" y="250" text-anchor="end" fill="#c084fc" font-size="12" font-weight="bold">靈性主義者</text>
                <text x="80" y="140" text-anchor="end" fill="#a855f7" font-size="12" font-weight="bold">化身/傳導者</text>

                <!-- 角色類型說明點 -->
                <!-- 交會點：三種主題皆有 - 正中央 -->
                <circle v-if="mythosCount > 0 && noiseCount > 0 && selfCount > 0" 
                  cx="190" cy="190" r="3" fill="#ffffff" opacity="0.9"/>
                <text v-if="mythosCount > 0 && noiseCount > 0 && selfCount > 0" 
                  x="190" y="175" text-anchor="middle" fill="white" font-size="8">交會點</text>
                
                <!-- 靈性主義者：自我與神話 - 左下角 -->
                <circle v-if="mythosCount > 0 && selfCount > 0 && noiseCount === 0" 
                  cx="95" cy="245" r="3" fill="#c084fc" opacity="0.9"/>
                <text v-if="mythosCount > 0 && selfCount > 0 && noiseCount === 0" 
                  x="80" y="260" text-anchor="end" fill="#c084fc" font-size="8">靈性主義者</text>
                
                <!-- 賽博格：自我與喧囂 - 右下角 -->
                <circle v-if="selfCount > 0 && noiseCount > 0 && mythosCount === 0" 
                  cx="285" cy="245" r="3" fill="#22d3ee" opacity="0.9"/>
                <text v-if="selfCount > 0 && noiseCount > 0 && mythosCount === 0" 
                  x="300" y="260" text-anchor="start" fill="#22d3ee" font-size="8">賽博格</text>
                
                <!-- 超人類：神話與喧囂 - 最上方 -->
                <circle v-if="mythosCount > 0 && noiseCount > 0 && selfCount === 0" 
                  cx="190" cy="80" r="3" fill="#67e8f9" opacity="0.9"/>
                <text v-if="mythosCount > 0 && noiseCount > 0 && selfCount === 0" 
                  x="190" y="70" text-anchor="middle" fill="#67e8f9" font-size="8">超人類</text>
                
                <!-- 現實人類：只有自我 - 正下方 -->
                <circle v-if="selfCount > 0 && mythosCount === 0 && noiseCount === 0" 
                  cx="190" cy="300" r="3" fill="#f472b6" opacity="0.9"/>
                <text v-if="selfCount > 0 && mythosCount === 0 && noiseCount === 0" 
                  x="190" y="315" text-anchor="middle" fill="#f472b6" font-size="8">現實人類</text>
                
                <!-- 化身/傳導者：僅神話 - 左上角 -->
                <circle v-if="mythosCount > 0 && selfCount === 0 && noiseCount === 0" 
                  cx="95" cy="135" r="3" fill="#a855f7" opacity="0.9"/>
                <text v-if="mythosCount > 0 && selfCount === 0 && noiseCount === 0" 
                  x="80" y="125" text-anchor="end" fill="#a855f7" font-size="8">{{ mythosCount === 4 ? '化身' : '傳導者' }}</text>
                
                <!-- 奇點：僅喧囂 - 右上角 -->
                <circle v-if="noiseCount > 0 && mythosCount === 0 && selfCount === 0" 
                  cx="285" cy="135" r="3" fill="#06b6d4" opacity="0.9"/>
                <text v-if="noiseCount > 0 && mythosCount === 0 && selfCount === 0" 
                  x="300" y="125" text-anchor="start" fill="#06b6d4" font-size="8">奇點</text>
              </svg>
            </div>
          </div>
          <div class="mt-4 space-y-2">
            <div class="text-center mb-3">
              <span class="text-purple-300 font-semibold">角色類型</span>
            </div>
            <div class="bg-slate-700/50 rounded-lg p-3 mb-3">
              <div class="text-center">
                <div class="text-lg font-bold text-white mb-1">{{ getCharacterType() }}</div>
                <div class="text-sm text-gray-300">{{ getCharacterSubtype() }}</div>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-2 text-xs">
              <div class="flex justify-between">
                <span class="text-purple-300">神話主題：</span>
                <span class="text-purple-200">{{ mythosCount }}/4 {{ mythosCount > 0 ? '●'.repeat(mythosCount) + '○'.repeat(4-mythosCount) : '○○○○' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-cyan-300">喧囂主題：</span>
                <span class="text-cyan-200">{{ noiseCount }}/4 {{ noiseCount > 0 ? '●'.repeat(noiseCount) + '○'.repeat(4-noiseCount) : '○○○○' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-pink-300">自我主題：</span>
                <span class="text-pink-200">{{ selfCount }}/4 {{ selfCount > 0 ? '●'.repeat(selfCount) + '○'.repeat(4-selfCount) : '○○○○' }}</span>
              </div>
            </div>
            <div class="border-t border-purple-500/30 pt-2 mt-2">
              <div class="text-center text-xs text-gray-400">
                <div>總計：{{ getTotalThemes() }}/4 張主題卡</div>
                <div v-if="getTotalThemes() === 4" class="text-green-400 font-semibold mt-1">
                  ✓ 角色建立完成
                </div>
              </div>
            </div>
          </div>
        </div>

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
          </div>
        </div>

        <!-- HOW TO PLAY 區塊 -->
        <div class="bg-slate-800/80 backdrop-blur rounded-lg border border-purple-500/30 overflow-hidden">
          <button 
            @click="showHowToPlay = !showHowToPlay"
            class="w-full px-6 py-4 text-left bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            <h3 class="text-xl font-bold text-white flex items-center justify-between">
              如何遊玩
              <svg 
                :class="['w-5 h-5 transition-transform', showHowToPlay ? 'rotate-180' : '']"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </h3>
          </button>
          <div v-show="showHowToPlay" class="p-6">
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 class="font-semibold text-purple-300">建立角色</h4>
                  <p class="text-sm text-gray-400">選擇四張主題卡來定義你的角色</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 class="font-semibold text-purple-300">進行行動</h4>
                  <p class="text-sm text-gray-400">根據情況選擇合適的行動方式</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 class="font-semibold text-purple-300">解決結果</h4>
                  <p class="text-sm text-gray-400">使用主題卡的能力來面對挑戰</p>
                </div>
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
              <label class="block text-xs font-medium mb-2">弱點標籤</label>
              <div class="space-y-2">
                <div v-for="(weakness, weaknessIndex) in card.weaknesses" :key="weaknessIndex">
                  <input 
                    v-if="card.isEditing"
                    v-model="weakness.text"
                    type="text" 
                    :placeholder="`弱點 ${weaknessIndex + 1}`"
                    class="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded-md text-white text-xs focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <div v-else class="text-xs p-1 bg-red-900/20 border border-red-500/30 rounded break-words">
                    {{ weakness.text || `弱點標籤 ${weaknessIndex + 1}` }}
                  </div>
                </div>
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

// 頁面標題
useHead({
  title: '都市異景 - 角色建立器',
  meta: [
    { name: 'description', content: '建立你的都市異景角色' }
  ]
})

// 響應式數據
const showHowToPlay = ref(false)
const mythosThemes = ref({})
const noiseThemes = ref({})
const selfThemes = ref({})

// 初始化角色資料
const character = ref({
  name: '',
  background: '',
  themeCards: [
    {
      selectedThemeType: '',
      selectedTheme: '',
      title: '',
      abilities: Array(7).fill().map(() => ({ text: '', isBurned: false })),
      weaknesses: Array(2).fill().map(() => ({ text: '' })),
      motivation: {
        identity: '',
        ritual: '',
        itch: ''
      },
      isEditing: false
    },
    {
      selectedThemeType: '',
      selectedTheme: '',
      title: '',
      abilities: Array(7).fill().map(() => ({ text: '', isBurned: false })),
      weaknesses: Array(2).fill().map(() => ({ text: '' })),
      motivation: {
        identity: '',
        ritual: '',
        itch: ''
      },
      isEditing: false
    },
    {
      selectedThemeType: '',
      selectedTheme: '',
      title: '',
      abilities: Array(7).fill().map(() => ({ text: '', isBurned: false })),
      weaknesses: Array(2).fill().map(() => ({ text: '' })),
      motivation: {
        identity: '',
        ritual: '',
        itch: ''
      },
      isEditing: false
    },
    {
      selectedThemeType: '',
      selectedTheme: '',
      title: '',
      abilities: Array(7).fill().map(() => ({ text: '', isBurned: false })),
      weaknesses: Array(2).fill().map(() => ({ text: '' })),
      motivation: {
        identity: '',
        ritual: '',
        itch: ''
      },
      isEditing: false
    }
  ]
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

// 計算各主題類型的選擇數量
const mythosCount = computed(() => {
  return character.value.themeCards.filter(card => card.selectedThemeType === 'mythos').length
})

const noiseCount = computed(() => {
  return character.value.themeCards.filter(card => card.selectedThemeType === 'noise').length
})

const selfCount = computed(() => {
  return character.value.themeCards.filter(card => card.selectedThemeType === 'self').length
})

// 角色類型雷達圖計算
const getTotalThemes = () => {
  return mythosCount.value + noiseCount.value + selfCount.value
}

// 獲取角色類型
const getCharacterType = () => {
  if (mythosCount.value > 0 && noiseCount.value > 0 && selfCount.value > 0) {
    return '交會點'
  } else if (mythosCount.value > 0 && selfCount.value > 0 && noiseCount.value === 0) {
    return '靈性主義者'
  } else if (selfCount.value > 0 && noiseCount.value > 0 && mythosCount.value === 0) {
    return '賽博格'
  } else if (mythosCount.value > 0 && noiseCount.value > 0 && selfCount.value === 0) {
    return '超人類'
  } else if (selfCount.value > 0 && mythosCount.value === 0 && noiseCount.value === 0) {
    return '現實人類'
  } else if (mythosCount.value > 0 && selfCount.value === 0 && noiseCount.value === 0) {
    return mythosCount.value === 4 ? '化身' : '傳導者'
  } else if (noiseCount.value > 0 && mythosCount.value === 0 && selfCount.value === 0) {
    return '奇點'
  } else {
    return '未定義'
  }
}

// 獲取角色子類型說明
const getCharacterSubtype = () => {
  const type = getCharacterType()
  switch (type) {
    case '交會點':
      return '三種主題皆有'
    case '靈性主義者':
      return '自我與神話'
    case '賽博格':
      return '自我與喧囂'
    case '超人類':
      return '神話與喧囂'
    case '現實人類':
      return '只有自我'
    case '化身':
      return '僅神話，全合一'
    case '傳導者':
      return '僅神話，各自偕同'
    case '奇點':
      return '僅喧囂'
    default:
      return '請選擇主題卡'
  }
}

// 六角雷達圖計算 - 重新設計為6個區塊，每個主題佔2個區塊
const center = { x: 190, y: 190 }

// 六角形的6個頂點座標 - 重新設計四層平均分佈
const getHexVertices = (layer = 4) => {
  const baseRadius = 110 // 最外層半徑
  // 四層分別對應：27.5, 55, 82.5, 110 的半徑
  const layerRadii = [0, 27.5, 55, 82.5, 110]
  const radius = layerRadii[layer] || baseRadius
  
  return [
    { x: center.x, y: center.y - radius }, // 0: 正上方 (超人類)
    { x: center.x + radius * Math.cos(Math.PI / 6), y: center.y - radius * Math.sin(Math.PI / 6) }, // 1: 右上 (奇點)
    { x: center.x + radius * Math.cos(Math.PI / 6), y: center.y + radius * Math.sin(Math.PI / 6) }, // 2: 右下 (賽博格)
    { x: center.x, y: center.y + radius }, // 3: 正下方 (現實人類)
    { x: center.x - radius * Math.cos(Math.PI / 6), y: center.y + radius * Math.sin(Math.PI / 6) }, // 4: 左下 (靈性主義者)
    { x: center.x - radius * Math.cos(Math.PI / 6), y: center.y - radius * Math.sin(Math.PI / 6) }  // 5: 左上 (化身/傳導者)
  ]
}

// 神話區域路徑 (左側兩個區塊：靈性主義者 + 化身/傳導者)
const getMythosOnlyPath = () => {
  const layer = Math.min(4, mythosCount.value)
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[4].x} ${vertices[4].y} L ${vertices[5].x} ${vertices[5].y} L ${vertices[0].x} ${vertices[0].y} Z`
}

// 喧囂區域路徑 (右上兩個區塊：超人類 + 奇點 + 賽博格)
const getNoiseOnlyPath = () => {
  const layer = Math.min(4, noiseCount.value)
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[0].x} ${vertices[0].y} L ${vertices[1].x} ${vertices[1].y} L ${vertices[2].x} ${vertices[2].y} Z`
}

// 自我區域路徑 (右下兩個區塊：賽博格 + 現實人類 + 靈性主義者)
const getSelfOnlyPath = () => {
  const layer = Math.min(4, selfCount.value)
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[2].x} ${vertices[2].y} L ${vertices[3].x} ${vertices[3].y} L ${vertices[4].x} ${vertices[4].y} Z`
}

// 神話+喧囂混合區域 (共享超人類頂點)
const getMythosNoiseHalfPath = () => {
  const mythosCards = mythosCount.value
  const noiseCards = noiseCount.value
  
  // 根據卡片分配決定層級
  let layer
  if ((mythosCards === 1 && noiseCards === 3) || (mythosCards === 3 && noiseCards === 1)) {
    layer = 3 // 1/4 + 3/4 情況：第三層
  } else if (mythosCards === 2 && noiseCards === 2) {
    layer = 4 // 2/4 + 2/4 情況：第四層（最外層）
  } else {
    layer = Math.min(4, Math.max(mythosCards, noiseCards)) // 其他情況維持原邏輯
  }
  
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[5].x} ${vertices[5].y} L ${vertices[0].x} ${vertices[0].y} Z`
}

const getNoiseHalfPath = () => {
  const mythosCards = mythosCount.value
  const noiseCards = noiseCount.value
  
  // 根據卡片分配決定層級
  let layer
  if ((mythosCards === 1 && noiseCards === 3) || (mythosCards === 3 && noiseCards === 1)) {
    layer = 3 // 1/4 + 3/4 情況：第三層
  } else if (mythosCards === 2 && noiseCards === 2) {
    layer = 4 // 2/4 + 2/4 情況：第四層（最外層）
  } else {
    layer = Math.min(4, Math.max(mythosCards, noiseCards)) // 其他情況維持原邏輯
  }
  
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[0].x} ${vertices[0].y} L ${vertices[1].x} ${vertices[1].y} Z`
}

// 神話+自我混合區域 (共享靈性主義者頂點)
const getMythosSelfHalfPath = () => {
  const mythosCards = mythosCount.value
  const selfCards = selfCount.value
  
  // 根據卡片分配決定層級
  let layer
  if ((mythosCards === 1 && selfCards === 3) || (mythosCards === 3 && selfCards === 1)) {
    layer = 3 // 1/4 + 3/4 情況：第三層
  } else if (mythosCards === 2 && selfCards === 2) {
    layer = 4 // 2/4 + 2/4 情況：第四層（最外層）
  } else {
    layer = Math.min(4, Math.max(mythosCards, selfCards)) // 其他情況維持原邏輯
  }
  
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[4].x} ${vertices[4].y} L ${vertices[5].x} ${vertices[5].y} Z`
}

const getSelfHalfPath = () => {
  const mythosCards = mythosCount.value
  const selfCards = selfCount.value
  
  // 根據卡片分配決定層級
  let layer
  if ((mythosCards === 1 && selfCards === 3) || (mythosCards === 3 && selfCards === 1)) {
    layer = 3 // 1/4 + 3/4 情況：第三層
  } else if (mythosCards === 2 && selfCards === 2) {
    layer = 4 // 2/4 + 2/4 情況：第四層（最外層）
  } else {
    layer = Math.min(4, Math.max(mythosCards, selfCards)) // 其他情況維持原邏輯
  }
  
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[3].x} ${vertices[3].y} L ${vertices[4].x} ${vertices[4].y} Z`
}

// 自我+喧囂混合區域 (共享賽博格頂點)
const getSelfNoiseHalfPath = () => {
  const selfCards = selfCount.value
  const noiseCards = noiseCount.value
  
  // 根據卡片分配決定層級
  let layer
  if ((selfCards === 1 && noiseCards === 3) || (selfCards === 3 && noiseCards === 1)) {
    layer = 3 // 1/4 + 3/4 情況：第三層
  } else if (selfCards === 2 && noiseCards === 2) {
    layer = 4 // 2/4 + 2/4 情況：第四層（最外層）
  } else {
    layer = Math.min(4, Math.max(selfCards, noiseCards)) // 其他情況維持原邏輯
  }
  
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[2].x} ${vertices[2].y} L ${vertices[3].x} ${vertices[3].y} Z`
}

const getNoiseSelfHalfPath = () => {
  const selfCards = selfCount.value
  const noiseCards = noiseCount.value
  
  // 根據卡片分配決定層級
  let layer
  if ((selfCards === 1 && noiseCards === 3) || (selfCards === 3 && noiseCards === 1)) {
    layer = 3 // 1/4 + 3/4 情況：第三層
  } else if (selfCards === 2 && noiseCards === 2) {
    layer = 4 // 2/4 + 2/4 情況：第四層（最外層）
  } else {
    layer = Math.min(4, Math.max(selfCards, noiseCards)) // 其他情況維持原邏輯
  }
  
  const vertices = getHexVertices(layer)
  return `M ${center.x} ${center.y} L ${vertices[1].x} ${vertices[1].y} L ${vertices[2].x} ${vertices[2].y} Z`
}

// 三種主題混合的第一層 (佔據所有區塊的第一層)
const getAllThemesFirstLayerPath = () => {
  const vertices = getHexVertices(1) // 第一層
  return `M ${center.x} ${center.y} L ${vertices[0].x} ${vertices[0].y} L ${vertices[1].x} ${vertices[1].y} L ${vertices[2].x} ${vertices[2].y} L ${vertices[3].x} ${vertices[3].y} L ${vertices[4].x} ${vertices[4].y} L ${vertices[5].x} ${vertices[5].y} Z`
}

// 三主題混合時，神話區域的扇形填滿（到第二層）
const getAllThemesMythosPath = () => {
  const vertices = getHexVertices(2) // 填滿到第二層
  // 神話佔據左側區塊：化身/傳導者(5) + 靈性主義者(4) 
  return `M ${center.x} ${center.y} L ${vertices[5].x} ${vertices[5].y} L ${vertices[4].x} ${vertices[4].y} Z`
}

// 三主題混合時，喧囂區域的扇形填滿（到第二層）
const getAllThemesNoisePath = () => {
  const vertices = getHexVertices(2) // 填滿到第二層
  // 喧囂佔據右上區塊：超人類(0) + 奇點(1)
  return `M ${center.x} ${center.y} L ${vertices[0].x} ${vertices[0].y} L ${vertices[1].x} ${vertices[1].y} Z`
}

// 三主題混合時，自我區域的扇形填滿（到第二層）
const getAllThemesSelfPath = () => {
  const vertices = getHexVertices(2) // 填滿到第二層
  // 自我佔據右下區塊：賽博格(2) + 現實人類(3)
  return `M ${center.x} ${center.y} L ${vertices[2].x} ${vertices[2].y} L ${vertices[3].x} ${vertices[3].y} Z`
}

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

function resetCharacter() {
  character.value = {
    name: '',
    background: '',
    themeCards: character.value.themeCards.map(() => ({
      selectedThemeType: '',
      selectedTheme: '',
      title: '',
      abilities: Array(7).fill().map(() => ({ text: '', isBurned: false })),
      weaknesses: Array(2).fill().map(() => ({ text: '' })),
      motivation: {
        identity: '',
        ritual: '',
        itch: ''
      },
      isEditing: false
    }))
  }
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
