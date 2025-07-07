# Character Reference Modal 組件

## 概述
Character Reference Modal 是一個用於顯示角色參考資料的模態框組件集合。此組件集合採用模組化設計，每個部分都可以獨立維護和測試。

## 組件結構

### 主要組件
- `CharacterReferenceModal.vue`: 主要模態框容器
- `CharacterReferenceHeader.vue`: 模態框標題欄
- `CharacterReferenceContent.vue`: 主要內容區域

### 子組件
- `CharacterBasicInfo.vue`: 角色基本資訊
- `CharacterTags.vue`: 能力與弱點標籤
- `CharacterMotivation.vue`: 角色動機與驅動力
- `CharacterAdditionalInfo.vue`: 附加資訊（裝備、招式、提升）
- `CharacterReferenceNotFound.vue`: 未找到資料時的顯示

## 使用方式

### 基本使用
```vue
<template>
  <CharacterReferenceModal
    :is-visible="showModal"
    :character-name="selectedCharacterName"
    :character-type="selectedCharacterType"
    :character-data="characterReference"
    @close="closeModal" />
</template>

<script setup>
import { CharacterReferenceModal } from '~/components/MO/CharacterReference'

const showModal = ref(false)
const selectedCharacterName = ref('')
const selectedCharacterType = ref('')
const characterReference = ref(null)

function closeModal() {
  showModal.value = false
}
</script>
```

### Props 說明

#### CharacterReferenceModal
- `isVisible` (Boolean): 控制模態框顯示/隱藏
- `characterName` (String): 角色名稱
- `characterType` (String): 角色類型
- `characterData` (Object): 角色資料物件

#### 角色資料格式
```javascript
{
  name: '角色中文名稱',
  ori_name: '角色英文名稱',
  source: '資源書名稱',
  type: '主題類型',
  ability_tags: ['能力標籤1', '能力標籤2'],
  weakness_tags: ['弱點標籤1', '弱點標籤2'],
  primary_goal: '身份信念',
  itch: '癢處（科技心魔）',
  ritual_concept: '儀式誡律',
  gear: ['裝備1', '裝備2'],
  moves: ['招式1', '招式2'],
  improvements: ['提升1', '提升2']
}
```

### 事件說明

#### CharacterReferenceModal
- `@close`: 關閉模態框時觸發
- `@backdrop-click`: 點擊背景時觸發

#### CharacterReferenceNotFound
- `@retry`: 點擊重新載入時觸發

## 功能特色

### 1. 模組化設計
每個組件都有獨立的職責，易於維護和測試。

### 2. 響應式設計
支援不同螢幕尺寸，在行動裝置上有良好的顯示效果。

### 3. 無障礙支援
- 支援 ESC 鍵關閉
- 適當的 ARIA 標籤
- 鍵盤導航支援

### 4. 動畫效果
平滑的進入/離開動畫，提升使用者體驗。

### 5. 自動滾動鎖定
模態框開啟時自動鎖定 body 滾動，關閉時恢復。

## 樣式系統

### 主題色彩
- 主色調：青色 (cyan)
- 副色調：紫色 (purple)
- 功能色彩：
  - 能力標籤：綠色
  - 弱點標籤：紅色
  - 動機區塊：藍色/靛青/青色

### 響應式斷點
- `md:` 768px 以上
- 自動適應不同螢幕尺寸

## 依賴組件
- `ThemeDisplayComponent`: 用於顯示主題中文名稱
- `Icon`: Nuxt Icon 組件

## 維護指南

### 添加新的資料欄位
1. 在對應的子組件中添加新欄位
2. 更新 Props 說明文件
3. 確保資料格式一致性

### 修改樣式
1. 在對應組件的 `<style scoped>` 區塊中修改
2. 保持與整體設計系統的一致性
3. 測試響應式效果

### 添加新功能
1. 評估是否需要新的子組件
2. 確保事件傳遞正確
3. 更新使用說明

## 測試建議
1. 測試不同資料格式的顯示效果
2. 測試響應式佈局
3. 測試鍵盤操作
4. 測試動畫效果
5. 測試無障礙功能
