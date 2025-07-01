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
            <Icon name="lucide:package" class="w-5 h-5 mr-2 text-cyan-400" />
            裝備資料庫
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
            都市異景裝備
          </span>
        </h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          瀏覽各種裝備類別的詳細資訊，從基礎武器到高科技網路空間工具
        </p>
      </div>

      <!-- Category Selector -->
      <div class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 p-6 mb-8">
        <label class="block text-sm font-medium text-cyan-300 mb-3 flex items-center">
          <Icon name="lucide:filter" class="w-4 h-4 mr-2" />
          選擇裝備類別
        </label>
        <select 
          v-model="selectedCategory" 
          @change="loadEquipmentData"
          class="w-full p-3 border border-cyan-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-gray-800/80 text-cyan-100 transition-all"
        >
          <option value="">請選擇裝備類別</option>
          <option v-for="category in equipmentCategories" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>

      <!-- Equipment Content -->
      <div v-else-if="equipmentData" class="space-y-8">
        <!-- Metadata Section -->
        <div class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-6">
            <h3 class="text-2xl font-bold text-white flex items-center">
              <Icon name="lucide:info" class="w-6 h-6 mr-2" />
              {{ equipmentData.metadata.title }}
            </h3>
            <p class="text-cyan-100 mt-2">{{ equipmentData.metadata.description }}</p>
          </div>
        </div>

        <!-- General Items Section -->
        <div v-if="equipmentData.general_items" class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gray-800/90 px-6 py-4 border-b border-cyan-500/30">
            <h4 class="text-lg font-semibold text-cyan-100 flex items-center">
              <Icon name="lucide:list" class="w-5 h-5 mr-2 text-cyan-400" />
              通用物品
            </h4>
          </div>
          
          <div class="p-6 space-y-8">
            <!-- Regular Items Cards -->
            <div v-if="equipmentData.general_items.items" class="space-y-4">
              <h5 class="text-lg font-medium text-blue-200 border-b border-blue-500/30 pb-2">物品項目</h5>
              <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div 
                  v-for="item in equipmentData.general_items.items" 
                  :key="item.name"
                  class="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-lg p-4 hover:border-blue-400/60 hover:from-blue-800/40 hover:to-cyan-800/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div class="text-center">
                    <div class="w-10 h-10 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="lucide:box" class="w-5 h-5 text-blue-300" />
                    </div>
                    <h6 class="text-white font-medium text-sm leading-tight">{{ item.chinese_name }}</h6>
                  </div>
                </div>
              </div>
            </div>
            <!-- Common Features Cards -->
            <div v-if="equipmentData.general_items.common_features" class="space-y-4">
              <h5 class="text-lg font-medium text-green-200 border-b border-green-500/30 pb-2">通用特徵</h5>
              <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div 
                  v-for="feature in equipmentData.general_items.common_features" 
                  :key="feature.name"
                  class="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-4 hover:border-green-400/60 hover:from-green-800/40 hover:to-emerald-800/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
                >
                  <div class="text-center">
                    <div class="w-10 h-10 bg-green-600/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="lucide:check-circle" class="w-5 h-5 text-green-300" />
                    </div>
                    <h6 class="text-white font-medium text-sm leading-tight">{{ feature.chinese_name }}</h6>
                  </div>
                </div>
              </div>
            </div>

            <!-- Common Flaws Cards -->
            <div v-if="equipmentData.general_items.common_flaws" class="space-y-4">
              <h5 class="text-lg font-medium text-red-200 border-b border-red-500/30 pb-2">通用缺陷</h5>
              <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div 
                  v-for="flaw in equipmentData.general_items.common_flaws" 
                  :key="flaw.name"
                  class="bg-gradient-to-br from-red-900/30 to-rose-900/30 border border-red-500/30 rounded-lg p-4 hover:border-red-400/60 hover:from-red-800/40 hover:to-rose-800/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
                >
                  <div class="text-center">
                    <div class="w-10 h-10 bg-red-600/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="lucide:x-circle" class="w-5 h-5 text-red-300" />
                    </div>
                    <h6 class="text-white font-medium text-sm leading-tight">{{ flaw.chinese_name }}</h6>
                  </div>
                </div>
              </div>
            </div>

            <!-- Software Cards -->
            <div v-if="equipmentData.general_items.software" class="space-y-4">
              <h5 class="text-lg font-medium text-purple-200 border-b border-purple-500/30 pb-2">軟體</h5>
              <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div 
                  v-for="item in equipmentData.general_items.software" 
                  :key="item.name"
                  class="bg-gradient-to-br from-purple-900/30 to-violet-900/30 border border-purple-500/30 rounded-lg p-4 hover:border-purple-400/60 hover:from-purple-800/40 hover:to-violet-800/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div class="text-center">
                    <div class="w-10 h-10 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="lucide:code" class="w-5 h-5 text-purple-300" />
                    </div>
                    <h6 class="text-white font-medium text-sm leading-tight">{{ item.chinese_name }}</h6>
                  </div>
                </div>
              </div>
            </div>

            <!-- VR Models Cards -->
            <div v-if="equipmentData.general_items.vr_models" class="space-y-4">
              <h5 class="text-lg font-medium text-purple-200 border-b border-purple-500/30 pb-2">VR 模組</h5>
              <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div 
                  v-for="item in equipmentData.general_items.vr_models" 
                  :key="item.name"
                  class="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-4 hover:border-purple-400/60 hover:from-purple-800/40 hover:to-pink-800/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div class="text-center">
                    <div class="w-10 h-10 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="lucide:headphones" class="w-5 h-5 text-purple-300" />
                    </div>
                    <h6 class="text-white font-medium text-sm leading-tight">{{ item.chinese_name }}</h6>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hardware Cards -->
            <div v-if="equipmentData.general_items.hardware" class="space-y-4">
              <h5 class="text-lg font-medium text-purple-200 border-b border-purple-500/30 pb-2">硬體</h5>
              <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div 
                  v-for="item in equipmentData.general_items.hardware" 
                  :key="item.name"
                  class="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-lg p-4 hover:border-purple-400/60 hover:from-purple-800/40 hover:to-indigo-800/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div class="text-center">
                    <div class="w-10 h-10 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="lucide:cpu" class="w-5 h-5 text-purple-300" />
                    </div>
                    <h6 class="text-white font-medium text-sm leading-tight">{{ item.chinese_name }}</h6>
                  </div>
                </div>
              </div>
            </div>

            <!-- Weapons Categories with tabs -->
            <div v-if="selectedCategory === 'weapons' && hasWeaponCategories" class="space-y-6">
              <div class="flex justify-center space-x-1 bg-gray-800 p-1 rounded-lg">
                <button 
                  v-for="tab in weaponTabs" 
                  :key="tab.key"
                  @click="activeWeaponTab = tab.key"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-all',
                    activeWeaponTab === tab.key 
                      ? 'bg-cyan-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  ]"
                >
                  {{ tab.label }}
                </button>
              </div>
              
              <!-- Firearms Cards -->
              <div v-if="activeWeaponTab === 'firearms' && equipmentData.general_items.firearms" class="space-y-4">
                <h5 class="text-lg font-medium text-orange-200 border-b border-orange-500/30 pb-2">槍械</h5>
                <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div 
                    v-for="item in equipmentData.general_items.firearms" 
                    :key="item.name"
                    class="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-lg p-4 hover:border-orange-400/60 hover:from-orange-800/40 hover:to-red-800/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
                  >
                    <div class="text-center">
                      <div class="w-10 h-10 bg-orange-600/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="lucide:target" class="w-5 h-5 text-orange-300" />
                      </div>
                      <h6 class="text-white font-medium text-sm leading-tight">{{ item.chinese_name }}</h6>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Cold Weapons Cards -->
              <div v-if="activeWeaponTab === 'cold_weapons' && equipmentData.general_items.cold_weapons" class="space-y-4">
                <h5 class="text-lg font-medium text-blue-200 border-b border-blue-500/30 pb-2">冷兵器</h5>
                <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div 
                    v-for="item in equipmentData.general_items.cold_weapons" 
                    :key="item.name"
                    class="bg-gradient-to-br from-blue-900/30 to-slate-900/30 border border-blue-500/30 rounded-lg p-4 hover:border-blue-400/60 hover:from-blue-800/40 hover:to-slate-800/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div class="text-center">
                      <div class="w-10 h-10 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="lucide:sword" class="w-5 h-5 text-blue-300" />
                      </div>
                      <h6 class="text-white font-medium text-sm leading-tight">{{ item.chinese_name }}</h6>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Explosives Cards -->
              <div v-if="activeWeaponTab === 'explosives' && equipmentData.general_items.explosives" class="space-y-4">
                <h5 class="text-lg font-medium text-red-200 border-b border-red-500/30 pb-2">爆裂物</h5>
                <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div 
                    v-for="item in equipmentData.general_items.explosives" 
                    :key="item.name"
                    class="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-lg p-4 hover:border-red-400/60 hover:from-red-800/40 hover:to-orange-800/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
                  >
                    <div class="text-center">
                      <div class="w-10 h-10 bg-red-600/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="lucide:bomb" class="w-5 h-5 text-red-300" />
                      </div>
                      <h6 class="text-white font-medium text-sm leading-tight">{{ item.chinese_name }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Equipment Section -->
        <div v-if="equipmentData.equipment" class="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gray-800/90 px-6 py-4 border-b border-cyan-500/30">
            <h4 class="text-lg font-semibold text-cyan-100 flex items-center">
              <Icon name="lucide:star" class="w-5 h-5 mr-2 text-cyan-400" />
              特殊裝備
            </h4>
          </div>
          
          <div class="p-6">
            <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div 
                v-for="(item, key) in equipmentData.equipment" 
                :key="key"
                class="bg-gray-800/60 rounded-lg border border-gray-700 p-6 hover:border-cyan-500/50 hover:bg-gray-800/80 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div class="flex justify-between items-start mb-4">
                  <h5 class="text-lg font-semibold text-white">{{ item.name }}</h5>
                </div>
                
                <p class="text-gray-300 mb-4 leading-relaxed">{{ item.description }}</p>
                
                <div class="mb-4">
                  <h6 class="text-cyan-300 font-medium mb-2 flex items-center">
                    <Icon name="lucide:check-circle" class="w-4 h-4 mr-1" />
                    特徵
                  </h6>
                  <ul class="space-y-1">
                    <li v-for="feature in item.features" :key="feature" class="text-sm text-gray-300 bg-cyan-900/20 px-3 py-1 rounded border-l-2 border-cyan-400">
                      {{ feature }}
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h6 class="text-red-300 font-medium mb-2 flex items-center">
                    <Icon name="lucide:x-circle" class="w-4 h-4 mr-1" />
                    弱點
                  </h6>
                  <p class="text-sm text-gray-300 bg-red-900/20 px-3 py-2 rounded border-l-2 border-red-400">
                    {{ item.weakness }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Data State -->
      <div v-else class="text-center py-12">
        <div class="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Icon name="lucide:package" class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-300 mb-2">尚未選擇裝備類別</h3>
        <p class="text-gray-500">請從上方下拉選單選擇一個裝備類別來查看詳細資訊</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// 設定頁面標題
useHead({
  title: '裝備資料庫 - 都市異景'
})

const selectedCategory = ref('')
const equipmentData = ref(null)
const loading = ref(false)
const activeWeaponTab = ref('firearms')

const equipmentCategories = ref([
  { value: 'access-perks', label: '通行與特權' },
  { value: 'ammo', label: '彈藥' },
  { value: 'apps-chips-databases', label: '應用程式、晶片與資料庫' },
  { value: 'armor', label: '護甲' },
  { value: 'body-attachments-cybernetics', label: '身體附件與生化改造' },
  { value: 'cyberspace', label: '網路空間' },
  { value: 'drones', label: '無人機' },
  { value: 'enhancers', label: '強化劑' },
  { value: 'garments-fashion', label: '服裝與時尚' },
  { value: 'merc-gear', label: '傭兵裝備' },
  { value: 'source-touched-items', label: '秘源侵染物' },
  { value: 'vehicles', label: '載具' },
  { value: 'weapons', label: '武器' }
])

const weaponTabs = ref([
  { key: 'firearms', label: '槍械' },
  { key: 'cold_weapons', label: '冷兵器' },
  { key: 'explosives', label: '爆裂物' }
])

const hasWeaponCategories = computed(() => {
  return equipmentData.value?.general_items?.firearms ||
         equipmentData.value?.general_items?.cold_weapons ||
         equipmentData.value?.general_items?.explosives
})

const loadEquipmentData = async () => {
  if (!selectedCategory.value) {
    equipmentData.value = null
    return
  }

  try {
    loading.value = true
    
    // 在開發模式使用相對路徑，在生產模式使用完整路徑
    const isDev = process.dev
    let filePath
    
    if (isDev) {
      // 開發模式：從 public 目錄讀取
      filePath = `/MO/equipment/${selectedCategory.value}.json`
    } else {
      // 生產模式：使用 baseURL
      const baseURL = '/LegendintheMist'
      filePath = `${baseURL}/MO/equipment/${selectedCategory.value}.json`
    }
    
    console.log('Loading equipment data from:', filePath)
    
    const response = await fetch(filePath)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, path: ${filePath}`)
    }
    const data = await response.json()
    equipmentData.value = data
    
    console.log('Loaded equipment data:', data)
    
    // Reset weapon tab to first available when switching categories
    if (selectedCategory.value === 'weapons') {
      activeWeaponTab.value = 'firearms'
    }
  } catch (error) {
    console.error('Error loading equipment data:', error)
    equipmentData.value = null
    
    // 開發者友善的錯誤訊息
    if (process.dev) {
      console.error('請確認 JSON 檔案是否存在於 public/MO/equipment/ 目錄中')
    }
  } finally {
    loading.value = false
  }
}
</script>

