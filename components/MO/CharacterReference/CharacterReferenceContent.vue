<template>
  <div class="space-y-4">
    <!-- 角色基本資訊 -->
    <CharacterBasicInfo :character-data="characterData" />
    
    <!-- 能力與弱點標籤 -->
    <CharacterTags :character-data="characterData" />
    
    <!-- 角色動機與驅動力 -->
    <CharacterMotivation 
      v-if="hasMotivationData"
      :character-data="characterData" />
    
    <!-- 附加資訊 -->
    <CharacterAdditionalInfo 
      v-if="hasAdditionalInfo"
      :character-data="characterData" />
  </div>
</template>

<script setup>
import CharacterBasicInfo from './CharacterBasicInfo.vue'
import CharacterTags from './CharacterTags.vue'
import CharacterMotivation from './CharacterMotivation.vue'
import CharacterAdditionalInfo from './CharacterAdditionalInfo.vue'

// Props
const props = defineProps({
  characterData: {
    type: Object,
    required: true
  }
})

// 計算屬性：是否有動機資料
const hasMotivationData = computed(() => {
  return props.characterData.primary_goal || 
         props.characterData.itch || 
         props.characterData.ritual_concept
})

// 計算屬性：是否有附加資訊
const hasAdditionalInfo = computed(() => {
  return props.characterData.gear || 
         props.characterData.moves || 
         props.characterData.improvements
})
</script>

<style scoped>
/* 內容區域樣式 */
</style>
