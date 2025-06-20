// composables/useAdventureThemes.ts
import type { AdventureThemeData, AdventureProfile, SampleAdventurer } from '~/types/adventure-themes'

export const useAdventureThemes = () => {
  const adventureData = ref<AdventureThemeData | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 載入冒險起源資料
  const loadAdventureData = async () => {
    try {
      isLoading.value = true
      error.value = null
        const data = await $fetch<AdventureThemeData>('/data/adventure-themes.json')
      adventureData.value = data || null
      
      if (!adventureData.value) {
        throw new Error('無法載入冒險起源資料')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '載入冒險起源資料時發生錯誤'
      console.error('載入冒險起源資料失敗:', err)
    } finally {
      isLoading.value = false
    }
  }
  // 取得特定冒險主題類型
  const getAdventureThemeByType = (type: string) => {
    if (!adventureData.value) return null
    return adventureData.value.adventure_themes[type] || null
  }

  // 取得所有冒險主題類型
  const getAllAdventureThemes = () => {
    if (!adventureData.value) return []
    return Object.entries(adventureData.value.adventure_themes).map(([key, value]) => ({
      key,
      ...value
    }))
  }

  // 建立新的冒險檔案
  const createAdventureProfile = (adventureType: string): AdventureProfile => {
    return {
      basic_info: {
        name: '',
        adventure_type: adventureType,
        primary_goal: '',
        current_status: ''
      },
      answers: {
        background_questions: {},
        ability_tags: {},
        weakness_tags: {}
      },
      selected_mission: '',
      custom_mission: '',
      supporters: [],
      obstacles: [],
      notes: ''
    }
  }

  // 匯出冒險檔案為 JSON
  const exportAdventureProfile = (profile: AdventureProfile) => {
    return JSON.stringify(profile, null, 2)
  }

  // 取得範例冒險者
  const getSampleAdventurers = () => {
    if (!adventureData.value) return []
    return adventureData.value.examples.sample_adventurers
  }

  // 取得特定類型的範例冒險者
  const getSampleAdventurersByType = (type: string) => {
    if (!adventureData.value) return []
    return adventureData.value.examples.sample_adventurers.filter(
      adventurer => adventurer.adventure_type === type
    )
  }

  // 驗證冒險檔案完整性
  const validateAdventureProfile = (profile: AdventureProfile) => {
    const errors: string[] = []
    
    if (!profile.basic_info.name.trim()) {
      errors.push('請輸入冒險者姓名')
    }
    
    if (!profile.basic_info.primary_goal.trim()) {
      errors.push('請輸入主要目標')
    }

    if (!profile.selected_mission && !profile.custom_mission.trim()) {
      errors.push('請選擇或自訂使命')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  return {
    // 狀態
    adventureData: readonly(adventureData),
    isLoading: readonly(isLoading),
    error: readonly(error),
      // 方法
    loadAdventureData,
    getAdventureThemeByType,
    getAllAdventureThemes,
    createAdventureProfile,
    exportAdventureProfile,
    getSampleAdventurers,
    getSampleAdventurersByType,
    validateAdventureProfile
  }
}
