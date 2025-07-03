<template>
  <div class="min-h-screen bg-gray-900 relative overflow-hidden">
    <!-- 賽博龐克網格背景 -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px); background-size: 20px 20px;"></div>
    </div>
    
    <!-- Header -->
    <div class="bg-black/80 backdrop-blur-sm shadow-xl border-b border-cyan-500/30 relative z-10">
      <div class="px-4 py-6">
        <div class="flex items-center justify-between">
          <NuxtLink to="/MO" class="text-cyan-400 hover:text-cyan-300 transition-colors">
            <Icon name="lucide:arrow-left" class="w-6 h-6" />
          </NuxtLink>
          <h1 class="text-xl font-bold text-cyan-100 flex items-center">
            <Icon name="lucide:database" class="w-5 h-5 mr-2 text-cyan-400" />
            行動資料庫
          </h1>
          <div class="w-6"></div> <!-- Spacer -->
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 py-6 max-w-6xl mx-auto relative z-10">
      <!-- Hero Section -->
      <div class="text-center mb-8">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          <span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            {{ uiLabels?.ui?.heroTitle || '都市異景行動資料庫' }}
          </span>
        </h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          {{ uiLabels?.ui?.heroSubtitle || '探索各種行動類別的詳細資訊，從戰鬥技巧到社交互動' }}
        </p>
      </div>

      <!-- Category Selector -->
      <div class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 p-6 mb-8">
        <label class="block text-sm font-medium text-cyan-300 mb-3 flex items-center">
          <Icon name="lucide:filter" class="w-4 h-4 mr-2" />
          {{ uiLabels?.ui?.categorySelector?.label || '選擇行動類別' }}
        </label>
        <select 
          v-model="selectedCategory" 
          @change="loadCategoryData"
          class="w-full p-3 border border-cyan-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-gray-800/80 text-cyan-100 transition-all"
        >
          <option value="">{{ uiLabels?.ui?.categorySelector?.placeholder || '請選擇行動類別' }}</option>
          <option v-for="category in actionCategories" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
        
        <!-- File Selector (shown when category is selected) -->
        <div v-if="selectedCategory && availableFiles.length > 0" class="mt-4">
          <label class="block text-sm font-medium text-cyan-300 mb-3 flex items-center">
            <Icon name="lucide:file-text" class="w-4 h-4 mr-2" />
            {{ uiLabels?.ui?.fileSelector?.label || '選擇具體行動檔案' }}
          </label>
          <select 
            v-model="selectedFile" 
            @change="loadActionData"
            class="w-full p-3 border border-cyan-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-gray-800/80 text-cyan-100 transition-all"
          >
            <option value="">{{ uiLabels?.ui?.fileSelector?.placeholder || '請選擇行動檔案' }}</option>
            <option v-for="file in availableFiles" :key="file.value" :value="file.value">
              {{ file.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Global Search and Filter Controls -->
      <div class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 p-6 mb-8">
        <div class="grid md:grid-cols-2 gap-4">
          <!-- Search Input -->
          <div>
            <label class="block text-sm font-medium text-cyan-300 mb-3 flex items-center">
              <Icon name="lucide:search" class="w-4 h-4 mr-2" />
              {{ uiLabels?.ui?.globalSearch?.label || '搜尋行動 (全資料庫)' }}
            </label>
            <input 
              v-model="globalSearchQuery"
              type="text"
              :placeholder="uiLabels?.ui?.globalSearch?.placeholder || '輸入行動名稱或描述關鍵字...'"
              class="w-full p-3 border border-cyan-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-gray-800/80 text-cyan-100 placeholder-gray-400 transition-all"
            />
          </div>
          
          <!-- Action Type Filter -->
          <div>
            <label class="block text-sm font-medium text-cyan-300 mb-3 flex items-center">
              <Icon name="lucide:tag" class="w-4 h-4 mr-2" />
              {{ uiLabels?.ui?.actionTypeFilter?.label || '過濾行動類型' }}
            </label>
            <select 
              v-model="globalActionTypeFilter"
              class="w-full p-3 border border-cyan-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-gray-800/80 text-cyan-100 transition-all"
            >
              <option value="">{{ uiLabels?.ui?.actionTypeFilter?.placeholder || '所有類型' }}</option>
              <option v-for="actionType in availableActionTypes" :key="actionType.value" :value="actionType.value">
                {{ actionType.label }}
              </option>
            </select>
          </div>
        </div>
        
        <!-- Search Results Count -->
        <div v-if="globalSearchQuery || globalActionTypeFilter" class="mt-4 text-sm text-gray-400 text-right">
          {{ uiLabels?.ui?.resultsCount?.replace('{count}', globalFilteredActions.length) || `找到 ${globalFilteredActions.length} 個行動` }}
          <button 
            @click="globalSearchQuery = ''; globalActionTypeFilter = ''"
            class="ml-2 text-cyan-400 hover:text-cyan-300 underline"
          >
            {{ uiLabels?.ui?.clearFilters || '清除過濾條件' }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>

      <!-- Actions Content -->
      <div v-if="displayActions && displayActions.length > 0" class="space-y-6">
        <div 
          v-for="(action, index) in displayActions" 
          :key="index"
          :id="`action-${index}`"
          class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden"
        >
          <!-- Action Header -->
          <div class="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-6">
            <div class="flex justify-between items-start">
              <h3 class="text-2xl font-bold text-white flex items-center">
                <Icon name="lucide:zap" class="w-6 h-6 mr-2" />
                {{ getActionChineseName(action.name) }}
                <span v-if="action.name !== getActionChineseName(action.name)" class="text-lg text-white/70 font-normal ml-3">
                  ({{ action.name }})
                </span>
              </h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="type in action.type" 
                  :key="type"
                  :class="`bg-${getActionTypeInfo(type).color}-500/30 text-white px-3 py-1 rounded-full text-xs font-bold uppercase border border-${getActionTypeInfo(type).color}-400/50 cursor-help hover:bg-${getActionTypeInfo(type).color}-500/50 transition-colors`"
                  @mouseenter="showActionTypeTooltip($event, type)"
                  @mouseleave="hideTooltip()"
                >
                  {{ getActionTypeInfo(type).name }}
                </span>
              </div>
            </div>
          </div>

          <div class="p-6 space-y-6">
            <!-- Description -->
            <div class="bg-gray-800/40 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-cyan-100 mb-3 flex items-center">
                <Icon name="lucide:info" class="w-5 h-5 mr-2 text-cyan-400" />
                {{ uiLabels?.sections?.description || '描述' }}
              </h4>
              <div class="text-gray-300 leading-relaxed whitespace-pre-line">
                <template v-for="(segment, segmentIndex) in formatDescription(action.description)" :key="segmentIndex">
                  <br v-if="segment.isNewLine" />
                  <span 
                    v-else-if="segment.isReference"
                    class="text-cyan-400 underline cursor-help border-b border-cyan-400/50 hover:border-cyan-400 transition-colors" 
                    @mouseenter="showTooltip($event, segment.tooltip.title, segment.tooltip.content)"
                    @mouseleave="hideTooltip()"
                  >{{ segment.text }}</span>
                  <span v-else-if="segment.text">{{ segment.text }}</span>
                </template>
              </div>
            </div>

            <!-- Examples -->
            <div v-if="action.examples && action.examples.length > 0" class="bg-gray-800/40 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-green-100 mb-3 flex items-center">
                <Icon name="lucide:lightbulb" class="w-5 h-5 mr-2 text-green-400" />
                {{ uiLabels?.sections?.examples || '範例' }}
              </h4>
              <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                <div 
                  v-for="example in action.examples" 
                  :key="example"
                  class="bg-green-900/20 text-green-100 px-3 py-2 rounded border-l-2 border-green-400 text-sm whitespace-pre-line"
                >
                  <template v-for="(segment, segmentIndex) in formatDescription(example)" :key="segmentIndex">
                    <br v-if="segment.isNewLine" />
                    <span 
                      v-else-if="segment.isReference"
                      class="text-cyan-300 underline cursor-help border-b border-cyan-300/50 hover:border-cyan-300 transition-colors" 
                      @mouseenter="showTooltip($event, segment.tooltip.title, segment.tooltip.content)"
                      @mouseleave="hideTooltip()"
                    >{{ segment.text }}</span>
                    <span v-else-if="segment.text">{{ segment.text }}</span>
                  </template>
                </div>
              </div>
            </div>

            <!-- Power Tags -->
            <div v-if="action.powerTags && action.powerTags.length > 0" class="bg-gray-800/40 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-blue-100 mb-3 flex items-center">
                <Icon name="lucide:trending-up" class="w-5 h-5 mr-2 text-blue-400" />
                {{ uiLabels?.sections?.powerTags || '優勢標籤' }}
              </h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in action.powerTags" 
                  :key="tag"
                  class="bg-blue-900/30 text-blue-100 px-3 py-1 rounded border border-blue-500/30 text-sm hover:bg-blue-800/40 transition-colors cursor-default"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Weakness Tags -->
            <div v-if="action.weaknessTags && action.weaknessTags.length > 0" class="bg-gray-800/40 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-red-100 mb-3 flex items-center">
                <Icon name="lucide:trending-down" class="w-5 h-5 mr-2 text-red-400" />
                {{ uiLabels?.sections?.weaknessTags || '弱點標籤' }}
              </h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in action.weaknessTags" 
                  :key="tag"
                  class="bg-red-900/30 text-red-100 px-3 py-1 rounded border border-red-500/30 text-sm hover:bg-red-800/40 transition-colors cursor-default"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Success Outcomes -->
            <div v-if="action.success && Object.keys(action.success).length > 0" class="bg-gray-800/40 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-emerald-100 mb-3 flex items-center">
                <Icon name="lucide:check-circle" class="w-5 h-5 mr-2 text-emerald-400" />
                {{ uiLabels?.sections?.successOutcomes || '成功結果/效果' }}
              </h4>
              <div class="space-y-2">
                <!-- 額外壯舉用標籤風格 -->
                <template v-for="(result, key) in action.success" :key="key">
                  <div v-if="isExtraFeat(key)" class="flex flex-wrap gap-2">
                    <div class="w-full mb-2">
                      <span 
                        class="font-medium text-purple-200 text-sm uppercase cursor-help hover:text-purple-100 transition-colors"
                        @mouseenter="showSuccessResultTooltip($event, key)"
                        @mouseleave="hideTooltip()"
                      >
                        {{ getSuccessResultChineseName(key) }}
                      </span>
                    </div>
                    <div 
                      v-for="feat in (Array.isArray(result) ? result : [result])" 
                      :key="feat"
                      class="bg-purple-900/30 text-purple-100 px-3 py-1 rounded border border-purple-500/30 text-sm hover:bg-purple-800/40 transition-colors cursor-default whitespace-pre-line"
                    >
                      <template v-for="(segment, segmentIndex) in formatDescription(feat)" :key="segmentIndex">
                        <br v-if="segment.isNewLine" />
                        <span 
                          v-else-if="segment.isReference"
                          class="text-cyan-300 underline cursor-help border-b border-cyan-300/50 hover:border-cyan-300 transition-colors" 
                          @mouseenter="showTooltip($event, segment.tooltip.title, segment.tooltip.content)"
                          @mouseleave="hideTooltip()"
                        >{{ segment.text }}</span>
                        <span v-else-if="segment.text">{{ segment.text }}</span>
                      </template>
                    </div>
                  </div>
                  <!-- 一般成功結果用卡片風格 -->
                  <div v-else class="bg-emerald-900/20 rounded p-3 border-l-2 border-emerald-400">
                    <div 
                      class="font-medium text-emerald-200 text-sm uppercase mb-1 cursor-help hover:text-emerald-100 transition-colors"
                      @mouseenter="showSuccessResultTooltip($event, key)"
                      @mouseleave="hideTooltip()"
                    >
                      {{ getSuccessResultChineseName(key) }}
                    </div>
                    <div class="text-gray-300 text-sm whitespace-pre-line">
                      <template v-for="(segment, segmentIndex) in formatDescription(result)" :key="segmentIndex">
                        <br v-if="segment.isNewLine" />
                        <span 
                          v-else-if="segment.isReference"
                          class="text-cyan-400 underline cursor-help border-b border-cyan-400/50 hover:border-cyan-400 transition-colors" 
                          @mouseenter="showTooltip($event, segment.tooltip.title, segment.tooltip.content)"
                          @mouseleave="hideTooltip()"
                        >{{ segment.text }}</span>
                        <span v-else-if="segment.text">{{ segment.text }}</span>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- Consequences -->
            <div v-if="action.consequences && action.consequences.length > 0" class="bg-gray-800/40 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-orange-100 mb-3 flex items-center">
                <Icon name="lucide:alert-triangle" class="w-5 h-5 mr-2 text-orange-400" />
                {{ uiLabels?.sections?.consequences || '後果' }}
              </h4>
              <div class="space-y-2">
                <div 
                  v-for="consequence in action.consequences" 
                  :key="consequence"
                  class="bg-orange-900/20 text-orange-100 px-3 py-2 rounded border-l-2 border-orange-400 text-sm whitespace-pre-line"
                >
                  <template v-for="(segment, segmentIndex) in formatDescription(consequence)" :key="segmentIndex">
                    <br v-if="segment.isNewLine" />
                    <span 
                      v-else-if="segment.isReference"
                      class="text-cyan-300 underline cursor-help border-b border-cyan-300/50 hover:border-cyan-300 transition-colors" 
                      @mouseenter="showTooltip($event, segment.tooltip.title, segment.tooltip.content)"
                      @mouseleave="hideTooltip()"
                    >{{ segment.text }}</span>
                    <span v-else-if="segment.text">{{ segment.text }}</span>
                  </template>
                </div>
              </div>
            </div>

            <!-- Source -->
            <div v-if="action.source" class="text-center pt-4 border-t border-gray-700">
              <span class="text-gray-400 text-sm">
                {{ uiLabels?.sections?.source || '來源' }}：{{ action.source }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- No Data State -->
      <div v-else-if="!loading" class="text-center py-12">
        <div class="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Icon name="lucide:database" class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-300 mb-2">
          {{ allActionsData.length === 0 ? (uiLabels?.states?.noData || '正在載入行動資料...') : (uiLabels?.states?.noResults || '沒有符合條件的行動') }}
        </h3>
        <p class="text-gray-500">
          {{ allActionsData.length === 0 ? (uiLabels?.states?.noDataHint || '請稍候，系統正在載入所有行動資料') : (uiLabels?.states?.noResultsHint || '請調整搜尋條件或過濾設定') }}
        </p>
      </div>
    </div>

    <!-- Tooltip for cross-references -->
    <div 
      v-if="tooltip.show" 
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      class="fixed z-50 bg-black/90 backdrop-blur-sm border border-cyan-500/50 rounded-lg p-4 max-w-sm shadow-2xl pointer-events-none"
    >
      <h5 class="font-semibold text-cyan-100 mb-2">{{ tooltip.title }}</h5>
      <p class="text-gray-300 text-sm whitespace-pre-line">{{ tooltip.content }}</p>
    </div>

    <!-- Floating Bookmark Navigation -->
    <div 
      v-if="displayActions && displayActions.length > 0"
      class="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300"
      :class="{ 'translate-x-0': showBookmarks, '-translate-x-full': !showBookmarks }"
    >
      <!-- Toggle Button -->
      <button 
        @click="showBookmarks = !showBookmarks"
        class="absolute -right-10 top-0 bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-r-lg shadow-lg transition-all duration-300 z-50"
        :class="{ 'bg-cyan-500': showBookmarks }"
      >
        <Icon :name="showBookmarks ? 'lucide:chevron-left' : 'lucide:bookmark'" class="w-4 h-4" />
      </button>

      <!-- Bookmark Panel -->
      <div class="bg-black/90 backdrop-blur-sm border border-cyan-500/50 rounded-lg shadow-2xl max-w-xs max-h-96 overflow-hidden">
        <!-- Header -->
        <div class="p-3 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-600/20 to-blue-600/20">
          <h4 class="text-sm font-semibold text-cyan-100 flex items-center">
            <Icon name="lucide:bookmark" class="w-4 h-4 mr-2" />
            {{ uiLabels?.ui?.bookmark?.title || '行動書籤' }} ({{ displayActions.length }})
          </h4>
        </div>

        <!-- Bookmark List -->
        <div class="overflow-y-auto max-h-80 custom-scrollbar">
          <div 
            v-for="(action, index) in displayActions" 
            :key="index"
            @click="scrollToAction(index)"
            class="p-3 border-b border-gray-700/50 hover:bg-cyan-900/20 cursor-pointer transition-all duration-200 group"
          >
            <div class="flex items-start space-x-2">
              <!-- Action Index -->
              <span class="flex-shrink-0 w-6 h-6 bg-cyan-600/30 text-cyan-200 rounded-full text-xs flex items-center justify-center font-bold">
                {{ index + 1 }}
              </span>

              <!-- Action Info -->
              <div class="flex-1 min-w-0">
                <h5 class="text-sm font-medium text-white truncate group-hover:text-cyan-200 transition-colors">
                  {{ getActionChineseName(action.name) }}
                </h5>
                <p class="text-xs text-gray-400 truncate mt-1">
                  {{ action.name !== getActionChineseName(action.name) ? action.name : '' }}
                </p>
                
                <!-- Action Types -->
                <div class="flex flex-wrap gap-1 mt-2">
                  <span 
                    v-for="type in action.type?.slice(0, 2)" 
                    :key="type"
                    class="bg-slate-700/60 text-cyan-200 px-1.5 py-0.5 rounded text-xs font-medium border border-slate-600/80"
                  >
                    {{ getActionTypeInfo(type).name }}
                  </span>
                  <span 
                    v-if="action.type && action.type.length > 2"
                    class="bg-slate-700/60 text-gray-200 px-1.5 py-0.5 rounded text-xs border border-slate-600/80"
                  >
                    +{{ action.type.length - 2 }}
                  </span>
                </div>

                <!-- Category Info for Global Search -->
                <div v-if="action._categoryLabel" class="mt-1">
                  <span class="text-xs text-cyan-400/70">
                    {{ action._categoryLabel.split(' - ')[1] || action._categoryLabel }}
                  </span>
                </div>
              </div>

              <!-- Scroll Indicator -->
              <Icon name="lucide:arrow-right" class="w-3 h-3 text-gray-500 group-hover:text-cyan-400 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button 
      v-if="displayActions && displayActions.length > 0"
      @click="scrollToTop"
      class="fixed left-4 bottom-4 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 hover:scale-110"
      :title="uiLabels?.ui?.bookmark?.backToTop || '回到頂部'"
    >
      <Icon name="lucide:arrow-up" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'

// 設定頁面標題
const uiLabels = ref(null)
const actionCategories = ref([])
const categoryFiles = ref({})
const successResultMapping = ref({})
const crossReferencePatterns = ref([])

const selectedCategory = ref('')
const selectedFile = ref('')
const actionData = ref([])
const allActionsData = ref([])
const actionMapping = ref(null)
const loading = ref(false)
const searchQuery = ref('')
const selectedActionType = ref('')
const globalSearchQuery = ref('')
const globalActionTypeFilter = ref('')
const showBookmarks = ref(false)
const tooltip = ref({
  show: false,
  x: 0,
  y: 0,
  title: '',
  content: ''
})

// 動態設定頁面標題
watchEffect(() => {
  if (uiLabels.value?.ui?.pageTitle) {
    useHead({
      title: uiLabels.value.ui.pageTitle
    })
  }
})

const availableFiles = computed(() => {
  return categoryFiles.value[selectedCategory.value] || []
})

const loadCategoryData = async () => {
  selectedFile.value = ''
  actionData.value = []
  
  if (!selectedCategory.value) return

  // 如果該類別沒有子檔案，嘗試載入類別下的所有檔案
  if (availableFiles.value.length === 0) {
    try {
      // 這裡可以實作掃描目錄的邏輯
      console.log(`Loading category ${selectedCategory.value}`)
    } catch (error) {
      console.error('Error loading category:', error)
    }
  }
}

// 載入配置檔案
const loadConfigs = async () => {
  try {
    const isDev = process.dev || window.location.hostname === 'localhost'
    const baseURL = isDev ? '' : '/LegendintheMist'
    
    // 並行載入所有配置檔案
    const [
      uiResponse,
      categoriesResponse, 
      successResponse,
      crossRefResponse
    ] = await Promise.all([
      fetch(`${baseURL}/MO/config/ui-labels.json`),
      fetch(`${baseURL}/MO/config/action-categories.json`),
      fetch(`${baseURL}/MO/config/success-results.json`),
      fetch(`${baseURL}/MO/config/cross-references.json`)
    ])
    
    if (uiResponse.ok) {
      uiLabels.value = await uiResponse.json()
    }
    
    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json()
      actionCategories.value = categoriesData.categories
      categoryFiles.value = categoriesData.categoryFiles
    }
    
    if (successResponse.ok) {
      const successData = await successResponse.json()
      successResultMapping.value = successData.successResultMapping
    }
    
    if (crossRefResponse.ok) {
      const crossRefData = await crossRefResponse.json()
      crossReferencePatterns.value = crossRefData.crossReferencePatterns
    }
    
    console.log('All configs loaded successfully')
  } catch (error) {
    console.error('Error loading configs:', error)
    // 提供備用預設值
    actionCategories.value = [
      { value: 'COMBAT', label: 'COMBAT - 戰鬥' }
    ]
    categoryFiles.value = {}
    successResultMapping.value = {}
    crossReferencePatterns.value = []
  }
}

// 載入映射表
const loadActionMapping = async () => {
  try {
    const isDev = process.dev || window.location.hostname === 'localhost'
    let filePath
    
    if (isDev) {
      filePath = `/MO/actiondb/action-mapping.json`
    } else {
      const baseURL = '/LegendintheMist'
      filePath = `${baseURL}/MO/actiondb/action-mapping.json`
    }
    
    const response = await fetch(filePath)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    actionMapping.value = data
    console.log('Loaded action mapping:', data)
  } catch (error) {
    console.error('Error loading action mapping:', error)
  }
}

// 載入行動資料
const loadActionData = async () => {
  if (!selectedCategory.value || !selectedFile.value) return
  
  loading.value = true
  try {
    const isDev = process.dev || window.location.hostname === 'localhost'
    let filePath
    
    if (isDev) {
      filePath = `/MO/actiondb/${selectedCategory.value}/${selectedFile.value}.json`
    } else {
      const baseURL = '/LegendintheMist'
      filePath = `${baseURL}/MO/actiondb/${selectedCategory.value}/${selectedFile.value}.json`
    }
    
    console.log('Loading action data from:', filePath)
    
    const response = await fetch(filePath)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, path: ${filePath}`)
    }
    const data = await response.json()
    actionData.value = data
    
    console.log('Loaded action data:', data)
  } catch (error) {
    console.error('Error loading action data:', error)
    actionData.value = []
  } finally {
    loading.value = false
  }
}

// 載入所有行動資料
const loadAllActions = async () => {
  loading.value = true
  allActionsData.value = []
  
  try {
    const isDev = process.dev || window.location.hostname === 'localhost'
    const baseURL = isDev ? '' : '/LegendintheMist'
    
    // 載入所有類別和檔案的資料
    for (const category of actionCategories.value) {
      const categoryKey = category.value
      const files = categoryFiles.value[categoryKey] || []
      
      for (const file of files) {
        try {
          const filePath = `${baseURL}/MO/actiondb/${categoryKey}/${file.value}.json`
          console.log('Loading:', filePath)
          
          const response = await fetch(filePath)
          if (response.ok) {
            const data = await response.json()
            // 為每個行動添加類別和檔案資訊
            const actionsWithMeta = data.map(action => ({
              ...action,
              _category: categoryKey,
              _file: file.value,
              _categoryLabel: category.label,
              _fileLabel: file.label
            }))
            allActionsData.value.push(...actionsWithMeta)
          }
        } catch (error) {
          console.warn(`Failed to load ${categoryKey}/${file.value}:`, error)
        }
      }
    }
    
    console.log(`Loaded ${allActionsData.value.length} actions from all categories`)
  } catch (error) {
    console.error('Error loading all actions:', error)
  } finally {
    loading.value = false
  }
}

// 搜尋和過濾功能
const filteredActions = computed(() => {
  if (!actionData.value.length) return []
  
  let filtered = actionData.value
  
  // 文字搜尋
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(action => {
      const chineseName = getActionChineseName(action.name)
      return action.name?.toLowerCase().includes(query) ||
             chineseName?.toLowerCase().includes(query) ||
             action.description?.toLowerCase().includes(query) ||
             action.examples?.some(example => example.toLowerCase().includes(query))
    })
  }
  
  // 行動類型過濾
  if (selectedActionType.value) {
    filtered = filtered.filter(action => 
      action.type?.some(type => type.toLowerCase() === selectedActionType.value.toLowerCase())
    )
  }
  
  return filtered
})

// 全域搜尋和過濾功能
const globalFilteredActions = computed(() => {
  if (!allActionsData.value.length) return []
  
  let filtered = allActionsData.value
  
  // 文字搜尋
  if (globalSearchQuery.value.trim()) {
    const query = globalSearchQuery.value.toLowerCase()
    filtered = filtered.filter(action => {
      const chineseName = getActionChineseName(action.name)
      return action.name?.toLowerCase().includes(query) ||
             chineseName?.toLowerCase().includes(query) ||
             action.description?.toLowerCase().includes(query) ||
             action.examples?.some(example => example.toLowerCase().includes(query))
    })
  }
  
  // 行動類型過濾
  if (globalActionTypeFilter.value) {
    filtered = filtered.filter(action => 
      action.type?.some(type => type.toLowerCase() === globalActionTypeFilter.value.toLowerCase())
    )
  }
  
  return filtered
})

// 決定要顯示的行動資料
const displayActions = computed(() => {
  // 如果有全域搜尋或過濾條件，優先顯示全域結果
  if (globalSearchQuery.value.trim() || globalActionTypeFilter.value) {
    return globalFilteredActions.value
  }
  // 否則顯示當前選中檔案的結果
  return filteredActions.value
})

// 取得所有可用的行動類型
const availableActionTypes = computed(() => {
  if (!actionMapping.value?.actionTypes) return []
  
  return Object.entries(actionMapping.value.actionTypes).map(([key, value]) => ({
    value: key,
    label: `${value.name}`,
    color: value.color,
    description: value.description
  }))
})

// 取得行動的中文名稱
const getActionChineseName = (actionName) => {
  if (!actionMapping.value?.actions) return actionName
  
  const mappedAction = actionMapping.value.actions.find(action => action.name === actionName)
  return mappedAction?.chinese_name || actionName
}

// 取得行動類型的詳細資訊
const getActionTypeInfo = (type) => {
  if (!actionMapping.value?.actionTypes) return { name: type, color: 'gray' }
  
  // 首先嘗試直接匹配
  let typeInfo = actionMapping.value.actionTypes[type.toLowerCase()]
  
  // 如果沒找到，嘗試特殊映射
  if (!typeInfo) {
    const lowerType = type.toLowerCase()
    // 處理額外壯舉的映射
    if (lowerType.includes('extra') || lowerType.includes('feat')) {
      typeInfo = actionMapping.value.actionTypes['extra feat']
    }
    // 可以在這裡添加其他特殊映射
  }
  
  return typeInfo || { name: type, color: 'gray' }
}

// 取得成功結果的中文名稱
const getSuccessResultChineseName = (key) => {
  return successResultMapping.value[key] || key
}

// 判斷是否為額外壯舉相關的鍵值
const isExtraFeat = (key) => {
  const extraFeatKeywords = ['extraFeats', 'extra', 'feat', 'bonus', 'additional']
  const lowerKey = key.toLowerCase()
  return extraFeatKeywords.some(keyword => lowerKey.includes(keyword))
}

const formatDescription = (description) => {
  // 安全檢查：確保輸入是字串
  if (!description || typeof description !== 'string') {
    return [{ text: description || '', isReference: false }]
  }
  
  // 使用配置檔案中的交叉引用關鍵字並返回包含片段的陣列
  if (!crossReferencePatterns.value.length) {
    // 處理換行符號，將文字按行分割
    const lines = description.split(/\r?\n/)
    return lines.map((line, index) => ({
      text: line,
      isReference: false,
      isNewLine: index > 0
    }))
  }
  
  let segments = [{ text: description, isReference: false }]
  
  crossReferencePatterns.value.forEach(({ pattern, flags, tooltip: tooltipData }) => {
    const newSegments = []
    const regex = new RegExp(pattern, flags)
    
    segments.forEach(segment => {
      if (segment.isReference) {
        newSegments.push(segment)
        return
      }
      
      const matches = [...segment.text.matchAll(regex)]
      if (matches.length === 0) {
        newSegments.push(segment)
        return
      }
      
      let lastIndex = 0
      matches.forEach(match => {
        // 添加匹配前的文字
        if (match.index > lastIndex) {
          newSegments.push({
            text: segment.text.slice(lastIndex, match.index),
            isReference: false
          })
        }
        
        // 添加匹配的文字作為交叉引用
        newSegments.push({
          text: match[0],
          isReference: true,
          tooltip: tooltipData
        })
        
        lastIndex = match.index + match[0].length
      })
      
      // 添加剩餘的文字
      if (lastIndex < segment.text.length) {
        newSegments.push({
          text: segment.text.slice(lastIndex),
          isReference: false
        })
      }
    })
    
    segments = newSegments
  })
  
  // 處理所有片段中的換行符號
  const finalSegments = []
  segments.forEach(segment => {
    const lines = segment.text.split(/\r?\n/)
    lines.forEach((line, index) => {
      if (index > 0) {
        // 添加換行標記
        finalSegments.push({
          text: '',
          isReference: false,
          isNewLine: true
        })
      }
      if (line || index === 0) {
        finalSegments.push({
          text: line,
          isReference: segment.isReference,
          tooltip: segment.tooltip
        })
      }
    })
  })
  
  return finalSegments
}

// 懸浮提示功能
const showTooltip = (event, title, content) => {
  const rect = event.target.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  // 從配置檔案取得提示框設定，如果沒有則使用預設值
  const tooltipConfig = uiLabels.value?.tooltip || {}
  const maxWidth = tooltipConfig.maxWidth || 320
  const offsetX = tooltipConfig.offsetX || 10
  const offsetY = tooltipConfig.offsetY || 10
  const safeMargin = tooltipConfig.safeMargin || 10
  
  // 計算提示框位置，避免超出視窗
  let x = rect.right + offsetX
  let y = rect.top + offsetY
  
  // 如果右側空間不足，顯示在左側
  if (x + maxWidth > viewportWidth) {
    x = rect.left - maxWidth - offsetX
  }
  
  // 如果下方空間不足，向上調整
  if (y + 120 > viewportHeight) {
    y = Math.max(safeMargin, viewportHeight - 130)
  }
  
  tooltip.value = {
    show: true,
    x: Math.max(safeMargin, x),
    y: Math.max(safeMargin, y),
    title,
    content
  }
}

const hideTooltip = () => {
  tooltip.value.show = false
}

// 顯示成功結果的懸浮提示
const showSuccessResultTooltip = (event, key) => {
  // 根據 key 查找對應的行動類型描述
  const lowerKey = key.toLowerCase()
  let actionTypeKey = lowerKey
  
  // 移除常見後綴以找到基礎行動類型
  const suffixes = ['effect', 'suspend', 'quick']
  for (const suffix of suffixes) {
    if (actionTypeKey.endsWith(suffix)) {
      actionTypeKey = actionTypeKey.replace(suffix, '').trim()
      break
    }
  }
  
  // 處理特殊情況
  if (actionTypeKey === 'setback' || actionTypeKey === 'set back') {
    actionTypeKey = 'set back'
  } else if (actionTypeKey.includes('extra') || actionTypeKey.includes('feat')) {
    // 處理額外壯舉的映射
    actionTypeKey = 'extra feat'
  }
  
  const actionTypeInfo = actionMapping.value?.actionTypes?.[actionTypeKey]
  const title = getSuccessResultChineseName(key)
  const content = actionTypeInfo?.description || '詳細說明請參考行動類型說明'
  
  showTooltip(event, title, content)
}

// 顯示行動類型的懸浮提示
const showActionTypeTooltip = (event, type) => {
  const actionTypeInfo = getActionTypeInfo(type)
  const title = actionTypeInfo.name
  const content = actionTypeInfo.description || '此行動類型暫無詳細說明'
  
  showTooltip(event, title, content)
}

// 書籤導航功能
const scrollToAction = (index) => {
  const element = document.getElementById(`action-${index}`)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    })
    // 可選：自動隱藏書籤面板（在小螢幕上）
    if (window.innerWidth < 768) {
      showBookmarks.value = false
    }
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  // 自動隱藏書籤面板
  if (window.innerWidth < 768) {
    showBookmarks.value = false
  }
}

// 頁面載入時執行
onMounted(async () => {
  await loadConfigs()
  await loadActionMapping()
  // 自動載入所有行動資料
  await loadAllActions()
})
</script>

<style scoped>
/* 自定義滾動條樣式 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.3);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(6, 182, 212, 0.5);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(6, 182, 212, 0.7);
}

/* Firefox 滾動條樣式 */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(6, 182, 212, 0.5) rgba(15, 23, 42, 0.3);
}
</style>
