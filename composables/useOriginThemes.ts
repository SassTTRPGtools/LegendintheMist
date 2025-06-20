import type { OriginThemeData, OriginProfile } from '~/types/origin-themes'

export const useOriginThemes = () => {
  const originData = ref<OriginThemeData | null>(null)
  const currentOrigin = ref<OriginProfile | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 載入起源資料
  const loadOriginData = async (): Promise<void> => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await $fetch<OriginThemeData>('/data/origin-themes.json')
      originData.value = response
    } catch (err) {
      error.value = '無法載入起源主題資料'
      console.error('Error loading origin data:', err)
    } finally {
      isLoading.value = false
    }
  }

  // 建立新起源
  const createOrigin = (partial: Partial<OriginProfile> = {}): OriginProfile => {
    const template = originData.value?.templates.origin_profile
    if (!template) {
      throw new Error('起源資料尚未載入')
    }

    const origin: OriginProfile = {
      basic_info: {
        name: '',
        origin_type: 'circumstance',
        social_status: '',
        current_situation: '',
        ...partial.basic_info
      },
      answers: {
        background_questions: {},
        ability_tags: {},
        weakness_tags: {},
        ...partial.answers
      },
      selected_mission: partial.selected_mission || '',
      custom_mission: partial.custom_mission || '',
      notes: partial.notes || ''
    }

    currentOrigin.value = origin
    return origin
  }

  // 更新起源
  const updateOrigin = (updates: Partial<OriginProfile>): void => {
    if (!currentOrigin.value) {
      throw new Error('沒有當前起源可以更新')
    }

    currentOrigin.value = {
      ...currentOrigin.value,
      basic_info: {
        ...currentOrigin.value.basic_info,
        ...updates.basic_info
      },
      answers: {
        ...currentOrigin.value.answers,
        ...updates.answers
      },
      selected_mission: updates.selected_mission ?? currentOrigin.value.selected_mission,
      custom_mission: updates.custom_mission ?? currentOrigin.value.custom_mission,
      notes: updates.notes ?? currentOrigin.value.notes
    }
  }

  // 取得起源類型
  const getOriginTypes = () => {
    if (!originData.value) return []
    return Object.keys(originData.value.origins)
  }

  // 取得特定起源類型
  const getOriginType = (type: string) => {
    if (!originData.value) return null
    return originData.value.origins[type] || null
  }

  // 匯出為 JSON
  const exportToJSON = (): string => {
    if (!currentOrigin.value) {
      throw new Error('沒有起源資料可以匯出')
    }
    return JSON.stringify(currentOrigin.value, null, 2)
  }

  // 從 JSON 匯入
  const importFromJSON = (jsonString: string): void => {
    try {
      const origin = JSON.parse(jsonString) as OriginProfile
      currentOrigin.value = origin
    } catch (err) {
      throw new Error('JSON 格式無效')
    }
  }

  return {
    // 狀態
    originData: readonly(originData),
    currentOrigin: readonly(currentOrigin),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // 方法
    loadOriginData,
    createOrigin,
    updateOrigin,
    getOriginTypes,
    getOriginType,
    exportToJSON,
    importFromJSON
  }
}
