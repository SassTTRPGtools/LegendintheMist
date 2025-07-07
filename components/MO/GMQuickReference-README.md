# GMQuickReference 組件

## 概述
GMQuickReference 是一個專為主持人（GM）設計的快速查閱組件，用於在遊戲過程中快速獲取玩家角色的重要資訊。

## 功能特色

### 🎯 核心功能
- **角色基本資訊顯示**：角色名稱、背景
- **主題卡詳細資訊**：四個主題卡的完整資料
- **雙重展示模式**：視覺化卡片 + 純文字版本
- **一鍵複製功能**：快速複製到剪貼簿
- **即時資料同步**：自動反映角色資料變化

### 📊 顯示內容
每個主題卡包含：
- **主題名稱**：顯示中文名稱和分類（神話/喧囂/自我）
- **能力標籤**：所有已填寫的能力
- **弱點標籤**：所有已填寫的弱點
- **動機系統**：身份、儀式、癢處

## 使用方式

### 基本使用
```vue
<template>
  <GMQuickReference
    :is-visible="showGMModal"
    :character-data="character"
    :mythos-themes="mythosThemes"
    :noise-themes="noiseThemes"
    :self-themes="selfThemes"
    @close="closeModal"
    @copy-success="handleCopySuccess"
    @copy-error="handleCopyError"
  />
</template>

<script setup>
import GMQuickReference from '~/components/MO/GMQuickReference.vue'

const showGMModal = ref(false)
const character = ref({...})
// 其他主題系統資料...

function closeModal() {
  showGMModal.value = false
}

function handleCopySuccess(message) {
  // 處理複製成功
}

function handleCopyError(message) {
  // 處理複製失敗
}
</script>
```

## Props 說明

| 屬性名 | 類型 | 必需 | 預設值 | 說明 |
|--------|------|------|--------|------|
| `isVisible` | Boolean | 否 | `false` | 控制模態框顯示/隱藏 |
| `characterData` | Object | 是 | - | 角色完整資料物件 |
| `mythosThemes` | Object | 否 | `{}` | 神話主題系統資料 |
| `noiseThemes` | Object | 否 | `{}` | 喧囂主題系統資料 |
| `selfThemes` | Object | 否 | `{}` | 自我主題系統資料 |

### characterData 結構
```javascript
{
  name: String,           // 角色名稱
  background: String,     // 角色背景
  themeCards: [           // 四個主題卡陣列
    {
      selectedTheme: String,      // 選擇的主題
      selectedThemeType: String,  // 主題類型
      abilities: [                // 能力陣列
        { text: String, isBurned: Boolean }
      ],
      weaknesses: [              // 弱點陣列
        { text: String }
      ],
      motivation: {              // 動機物件
        identity: String,        // 身份
        ritual: String,          // 儀式
        itch: String            // 癢處
      }
    }
  ]
}
```

## Events 說明

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `close` | 無 | 關閉模態框時觸發 |
| `copy-success` | `message: String` | 複製成功時觸發 |
| `copy-error` | `message: String` | 複製失敗時觸發 |

## 輸出格式

### 文字版本範例
```
=== 都市異景角色資訊 ===

角色名稱：網路空間駭客
背景：前企業工程師

=== 主題卡資訊 ===

【主題卡 1】網路空間 (喧囂)
能力：數位操控、駭客技能、網路連線
弱點：現實感知不足
動機：身份：我是數位世界的自由戰士；癢處：必須揭露企業的數位暴行

【主題卡 2】困頓過往 (自我)
能力：街頭智慧、生存本能
弱點：信任問題、創傷反應
動機：身份：我不會再被背叛；儀式：每天檢查三次逃生路線

...

=== 快速參考 ===
生成時間：2025/7/7 下午2:30:15
此資訊由都市異景角色建構器自動生成，供主持人快速查閱使用。
```

## 樣式設計

### 主題色彩
- **標題欄**：黃色到橙色漸層
- **角色資訊**：黃色強調
- **能力**：綠色文字
- **弱點**：紅色文字
- **動機**：藍色文字

### 響應式設計
- 支援桌面端和行動裝置
- 最大寬度 4xl，高度限制 90vh
- 內容區域可滾動

## 技術特色

### 🔄 資料同步
- 使用 `watch` 監聽角色資料變化
- 自動重新生成文字內容
- 深度監聽確保完整更新

### 📋 剪貼簿支援
- 現代瀏覽器 Clipboard API
- 備用方案：document.execCommand
- 錯誤處理和用戶回饋

### ⌨️ 鍵盤操作
- ESC 鍵關閉模態框
- 良好的無障礙支援

### 🎨 視覺效果
- Tailwind CSS 設計系統
- 一致的色彩主題
- 優雅的動畫過渡

## 維護注意事項

1. **資料結構相依性**：組件依賴特定的角色資料結構，修改角色資料結構時需同步更新
2. **主題系統整合**：需要正確傳入三個主題系統的資料以獲得完整的主題名稱
3. **類型映射**：依賴 `character-type-mapping.js` 進行類型中文化
4. **事件處理**：確保父組件正確處理所有發出的事件

## 相關檔案
- `~/assets/MO/character-type-mapping.js` - 類型映射定義
- `~/pages/MO/character-builder.vue` - 主要使用頁面
- Icon 組件 - UI 圖示支援

## 版本歷史
- v1.0.0 - 初始版本，基本GM查閱功能
- v1.1.0 - 組件化重構，修正資料引用
