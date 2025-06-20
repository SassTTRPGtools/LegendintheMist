// composables/useGreatnessThemes.ts
import type { GreatnessThemeData, GreatnessProfile, SampleHero } from '~/types/greatness-themes'

export const useGreatnessThemes = () => {
  const greatnessData = ref<GreatnessThemeData | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 載入偉業主題資料
  const loadGreatnessData = async () => {
    try {
      isLoading.value = true
      error.value = null
      const data = await $fetch<GreatnessThemeData>('/data/greatness-themes.json')
      greatnessData.value = data || null
      
      if (!greatnessData.value) {
        throw new Error('無法載入偉業主題資料')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '載入偉業主題資料時發生錯誤'
      console.error('載入偉業主題資料失敗:', err)
    } finally {
      isLoading.value = false
    }
  }

  // 取得特定偉業主題類型
  const getGreatnessThemeByType = (type: string) => {
    if (!greatnessData.value) return null
    return greatnessData.value.greatness_themes[type] || null
  }

  // 取得所有偉業主題類型
  const getAllGreatnessThemes = () => {
    if (!greatnessData.value) return []
    return Object.entries(greatnessData.value.greatness_themes).map(([key, value]) => ({
      key,
      ...value
    }))
  }

  // 建立新的偉業檔案
  const createGreatnessProfile = (greatnessType: string): GreatnessProfile => {
    return {
      basic_info: {
        name: '',
        greatness_type: greatnessType,
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

  // 新增支持者
  const addSupporter = (profile: GreatnessProfile, supporter: string) => {
    if (!profile.supporters.includes(supporter)) {
      profile.supporters.push(supporter)
    }
  }

  // 移除支持者
  const removeSupporter = (profile: GreatnessProfile, supporter: string) => {
    const index = profile.supporters.indexOf(supporter)
    if (index > -1) {
      profile.supporters.splice(index, 1)
    }
  }

  // 新增障礙
  const addObstacle = (profile: GreatnessProfile, obstacle: string) => {
    if (!profile.obstacles.includes(obstacle)) {
      profile.obstacles.push(obstacle)
    }
  }

  // 移除障礙
  const removeObstacle = (profile: GreatnessProfile, obstacle: string) => {
    const index = profile.obstacles.indexOf(obstacle)
    if (index > -1) {
      profile.obstacles.splice(index, 1)
    }
  }

  // 取得範例英雄
  const getSampleHeroes = (): SampleHero[] => {
    return greatnessData.value?.examples.sample_heroes || []
  }

  // 匯出為 JSON
  const exportToJSON = (profile: GreatnessProfile): string => {
    return JSON.stringify(profile, null, 2)
  }

  return {
    // 狀態
    greatnessData: readonly(greatnessData),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // 方法
    loadGreatnessData,
    getGreatnessThemeByType,
    getAllGreatnessThemes,
    createGreatnessProfile,
    addSupporter,
    removeSupporter,
    addObstacle,
    removeObstacle,
    getSampleHeroes,
    exportToJSON
  }
}
