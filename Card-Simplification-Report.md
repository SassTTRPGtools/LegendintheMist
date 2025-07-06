# 裝備卡與團隊主題卡簡化修改報告

## 概要
根據使用者需求，簡化了裝備卡和團隊主題卡的顯示，移除了不必要的命名部分。

## 修改內容

### 🛠️ 裝備卡 (EquipmentCard.vue)

#### 移除的內容
- **裝備名稱欄位**: 完全移除了裝備名稱的輸入框和顯示
- **相關程式碼**: 移除了整個裝備名稱區塊（約15行程式碼）

#### 保留的內容
- 改進軌跡與力度控制
- 能力標籤（7個）
- 弱點標籤（2個）
- 裝備專長顯示與懸浮提示
- 編輯模式切換

#### 資料結構更新
```typescript
// 移除前
interface Equipment {
  name: string          // ❌ 已移除
  improvements: Array<{ checked: boolean }>
  power: number
  abilities: Array<{ text: string; isBurned: boolean }>
  weaknesses: Array<{ text: string }>
  specialties: Array<{ type: string; description?: string }>
  isEditing: boolean
}

// 移除後
interface Equipment {
  improvements: Array<{ checked: boolean }>
  power: number
  abilities: Array<{ text: string; isBurned: boolean }>
  weaknesses: Array<{ text: string }>
  specialties: Array<{ type: string; description?: string }>
  isEditing: boolean
}
```

### 🎯 團隊主題卡 (TeamThemeCard.vue)

#### 標題更新
- **舊標題**: "團隊主題卡"
- **新標題**: "團隊主題"

#### 移除的內容
- **團隊主題標題欄位**: 移除了團隊主題標題的輸入框和顯示
- **相關程式碼**: 移除了整個團隊主題標題區塊（約15行程式碼）

#### 保留的內容
- 改進軌跡和衰變軌跡
- 能力標籤（7個）
- 弱點標籤（2個）
- 自定義專長的增刪改查功能
- 專長懸浮提示
- 編輯模式切換

#### 資料結構更新
```typescript
// 移除前
interface TeamThemeCard {
  title: string         // ❌ 已移除
  abilities: Array<{ text: string; isBurned: boolean }>
  weaknesses: Array<{ text: string }>
  customSpecialties: Array<{ name: string; description: string }>
  improvements: Array<{ checked: boolean }>
  decays: Array<{ checked: boolean }>
  isEditing: boolean
}

// 移除後
interface TeamThemeCard {
  abilities: Array<{ text: string; isBurned: boolean }>
  weaknesses: Array<{ text: string }>
  customSpecialties: Array<{ name: string; description: string }>
  improvements: Array<{ checked: boolean }>
  decays: Array<{ checked: boolean }>
  isEditing: boolean
}
```

### 🏗️ 角色建立器更新 (character-builder.vue)

#### 創建函數更新
```javascript
// createEmptyEquipment() - 移除 name 字段
function createEmptyEquipment() {
  return {
    // name: '',          // ❌ 已移除
    improvements: Array(3).fill(null).map(() => ({ checked: false })),
    power: 1,
    abilities: Array(7).fill(null).map(() => ({ text: '', isBurned: false })),
    weaknesses: Array(2).fill(null).map(() => ({ text: '' })),
    specialties: [],
    isEditing: false
  }
}

// createEmptyTeamThemeCard() - 移除 title 字段
function createEmptyTeamThemeCard() {
  return {
    // title: '',         // ❌ 已移除
    abilities: Array(7).fill(null).map(() => ({ text: '', isBurned: false })),
    weaknesses: Array(2).fill(null).map(() => ({ text: '' })),
    customSpecialties: [],
    improvements: Array(3).fill(null).map(() => ({ checked: false })),
    decays: Array(3).fill(null).map(() => ({ checked: false })),
    isEditing: false
  }
}
```

## 視覺效果

### 裝備卡簡化前後對比
```
簡化前:
┌─────────────────────────┐
│ 裝備卡            [編輯] │
├─────────────────────────┤
│ 📝 裝備名稱              │ ❌ 已移除
│ ⚙️ 改進軌跡 | 💪 力度    │ ✅ 保留
│ 🎯 能力標籤             │ ✅ 保留
│ ⚠️ 弱點標籤             │ ✅ 保留
│ ⭐ 裝備專長             │ ✅ 保留
└─────────────────────────┘

簡化後:
┌─────────────────────────┐
│ 裝備卡            [編輯] │
├─────────────────────────┤
│ ⚙️ 改進軌跡 | 💪 力度    │
│ 🎯 能力標籤             │
│ ⚠️ 弱點標籤             │
│ ⭐ 裝備專長             │
└─────────────────────────┘
```

### 團隊主題卡簡化前後對比
```
簡化前:
┌─────────────────────────┐
│ 團隊主題卡        [編輯] │ ❌ 舊標題
├─────────────────────────┤
│ 📝 團隊主題標題          │ ❌ 已移除
│ ⚙️ 改進軌跡 | 📉 衰變    │ ✅ 保留
│ 🎯 能力標籤             │ ✅ 保留
│ ⚠️ 弱點標籤             │ ✅ 保留
│ ⭐ 自定義專長           │ ✅ 保留
└─────────────────────────┘

簡化後:
┌─────────────────────────┐
│ 團隊主題          [編輯] │ ✅ 新標題
├─────────────────────────┤
│ ⚙️ 改進軌跡 | 📉 衰變    │
│ 🎯 能力標籤             │
│ ⚠️ 弱點標籤             │
│ ⭐ 自定義專長           │
└─────────────────────────┘
```

## 優勢

### 🎯 使用者體驗改善
1. **簡化介面**: 移除不必要的命名欄位，介面更加簡潔
2. **專注功能**: 使用者可以專注於核心的遊戲機制（能力、弱點、專長）
3. **減少認知負擔**: 不需要思考如何命名裝備或團隊主題

### 🧹 程式碼清理
1. **精簡結構**: 移除不必要的資料字段
2. **一致性**: 統一了卡片的設計邏輯
3. **維護性**: 減少了需要處理的資料欄位

### 🔄 向後兼容性
1. **LocalStorage**: 現有保存的資料會自動忽略已移除的字段
2. **匯入匯出**: 舊的匯出檔案仍可正常匯入（忽略多餘字段）
3. **漸進式更新**: 不會破壞現有的角色資料

## 技術細節

### 修改的檔案
1. `components/MO/EquipmentCard.vue`
   - 移除裝備名稱 UI 區塊
   - 更新 TypeScript 接口
   - 更新 props 預設值

2. `components/MO/TeamThemeCard.vue`
   - 更改標題文字
   - 移除團隊主題標題 UI 區塊
   - 更新 TypeScript 接口

3. `pages/MO/character-builder.vue`
   - 更新 `createEmptyEquipment()` 函數
   - 更新 `createEmptyTeamThemeCard()` 函數

### 驗證結果
- ✅ 所有檔案編譯無錯誤
- ✅ TypeScript 類型檢查通過
- ✅ 介面顯示正常
- ✅ 功能邏輯完整保留

## 未來維護

### 注意事項
1. 如果未來需要重新添加命名功能，需要：
   - 恢復對應的 UI 區塊
   - 更新 TypeScript 接口
   - 修改創建函數
   - 考慮向後兼容性

2. 資料遷移策略：
   - 現有資料中的 `name` 和 `title` 字段會被自動忽略
   - 不需要特別的遷移腳本
   - LocalStorage 中的舊資料仍可正常載入

### 測試建議
1. 測試現有角色資料的載入
2. 驗證裝備卡和團隊主題卡的編輯功能
3. 確認匯入匯出功能正常
4. 檢查專長懸浮提示是否正常運作

---

## 總結
成功簡化了裝備卡和團隊主題卡，移除了不必要的命名欄位，使介面更加簡潔直觀。所有核心功能（能力標籤、弱點標籤、專長系統）都完整保留，並且維持了向後兼容性。
