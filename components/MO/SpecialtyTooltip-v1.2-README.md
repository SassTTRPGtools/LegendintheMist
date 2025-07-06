# SpecialtyTooltip 組件使用說明 (v1.2)

## 概述
SpecialtyTooltip 是一個專為角色建立器卡片設計的專長懸浮提示組件，提供統一的視覺風格和交互體驗。

## 重要更新 (v1.2)
- ✅ **簡化使用方式**：移除複雜的具名插槽，改為自動觸發
- ✅ **更好的數據處理**：內建數據驗證和錯誤處理
- ✅ **一致性改進**：所有卡片組件使用統一的專長顯示邏輯
- ✅ **修復顯示問題**：解決專長區塊顯示為空的問題

## 特點
- 🎨 都市異景風格視覺設計（青色發光、網格背景、動畫效果）
- 🎯 智能邊界檢測，確保提示框不會超出視窗
- 📱 響應式設計，適配不同螢幕尺寸
- 🔧 簡潔的 API，易於集成
- ⚡ 自動懸浮提示觸發（mouseenter/mouseleave）

## 基本用法

### 最簡單的用法 (推薦)
```vue
<SpecialtyTooltip
  name="專長名稱"
  description="專長描述"
>
  <span class="cursor-help">懸停我</span>
</SpecialtyTooltip>
```

### 在主題卡中的用法
```vue
<SpecialtyTooltip
  v-for="(specialty, index) in selectedSpecialties" 
  :key="index"
  :name="getSpecialtyName(specialty)"
  :description="getSpecialtyFullDescription(specialty)"
>
  <span class="specialty-tag">
    {{ getSpecialtyName(specialty) }}
  </span>
</SpecialtyTooltip>
```

### 在團隊主題卡中的用法
```vue
<SpecialtyTooltip
  v-for="(specialty, index) in customSpecialties" 
  :key="index"
  :name="specialty.name || `專長 ${index + 1}`"
  :description="specialty.description || `專長描述 ${index + 1}`"
>
  <span class="specialty-tag">
    {{ specialty.name || `專長 ${index + 1}` }}
  </span>
</SpecialtyTooltip>
```

### 在裝備卡中的用法
```vue
<SpecialtyTooltip
  v-for="(specialty, index) in equipmentSpecialties" 
  :key="index"
  :name="getEquipmentSpecialtyName(specialty)"
  :description="getEquipmentSpecialtyDescription(specialty)"
>
  <span class="specialty-tag">
    {{ getEquipmentSpecialtyName(specialty) }}
  </span>
</SpecialtyTooltip>
```

## Props

| 屬性 | 類型 | 必需 | 說明 |
|------|------|------|------|
| `name` | `string` | ✅ | 專長名稱，顯示在提示框標題 |
| `description` | `string` | ✅ | 專長描述，顯示在提示框內容 |

## 插槽

| 插槽名 | 說明 | 作用域插槽參數 |
|--------|------|----------------|
| `default` | 觸發懸浮提示的元素 | 無 |

## 視覺設計

### 樣式特點
- **邊框**：青色發光邊框 (`border-cyan-400/60`)
- **背景**：深色漸變背景 (`from-slate-900 via-slate-800 to-slate-900`)
- **網格效果**：科技感背景網格
- **動畫**：淡入動畫 (`animate-fade-in`) 和發光動畫 (`animate-glow`)
- **裝飾元素**：角落發光點、漸變裝飾條

### 定位邏輯
- 預設顯示在觸發元素上方
- 自動檢測邊界，必要時調整位置
- 支援水平居中對齊
- 使用 `fixed` 定位和 `Teleport` 到 body

## 數據處理改進

### 強健的數據驗證
組件現在包含更好的數據驗證機制：

```typescript
// 顯示懸浮提示前檢查數據有效性
const showTooltip = (event: MouseEvent) => {
  if (!props.name || !props.description) {
    if (process.dev) {
      console.warn('SpecialtyTooltip: Missing name or description')
    }
    return
  }
  // ... 顯示邏輯
}
```

### 向後兼容性支持
ThemeCard 組件新增支援舊版數據格式：

```typescript
// 獲取已選擇專長列表（使用向後兼容的方式）
const getSelectedSpecialtiesList = () => {
  if (!props.themeCard) return []
  
  // 優先使用新的 selectedSpecialties 陣列
  if (props.themeCard.selectedSpecialties && Array.isArray(props.themeCard.selectedSpecialties)) {
    return props.themeCard.selectedSpecialties.filter(specialty => specialty && specialty.trim())
  }
  
  // 向後兼容：如果有舊的 selectedSpecialty
  if (props.themeCard.selectedSpecialty && props.themeCard.selectedSpecialty.trim()) {
    return [props.themeCard.selectedSpecialty]
  }
  
  return []
}
```

## 使用建議

### 1. 數據驗證
組件會自動檢查 props 是否有效，建議在使用前確保數據完整：
```vue
<!-- 好的做法 -->
<SpecialtyTooltip
  v-if="specialty.name && specialty.description"
  :name="specialty.name"
  :description="specialty.description"
>
  <!-- 內容 -->
</SpecialtyTooltip>
```

### 2. 樣式整合
建議使用統一的觸發元素樣式：
```vue
<span class="inline-flex items-center px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs cursor-help border border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-400/50 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-200 relative overflow-hidden group">
  <!-- 內容 -->
</span>
```

### 3. 效能考量
- 組件使用 `Teleport` 避免 z-index 問題
- 懸浮提示只在需要時才渲染
- 支援大量專長項目而不影響效能

## 故障排除

### 提示框不顯示
1. 檢查 `name` 和 `description` props 是否有值
2. 確認觸發元素有正確的 hover 事件
3. 檢查是否有 CSS 衝突
4. 查看控制台是否有警告訊息

### 專長區塊顯示為空
這個問題在 v1.2 中已修復，主要原因：
1. **數據結構問題**：`selectedSpecialties` 陣列可能未正確初始化
2. **函數邏輯問題**：專長獲取函數沒有處理邊界情況
3. **向後兼容性**：舊版數據格式支援不完整

解決方案：
- 使用新的 `getSelectedSpecialtiesList()` 函數
- 改進數據驗證邏輯
- 添加向後兼容性支援

### 位置不正確
1. 確認父容器沒有 `overflow: hidden`
2. 檢查視窗大小和邊界檢測邏輯
3. 驗證 `Teleport` 是否正常工作

### 樣式問題
1. 確認 Tailwind CSS 配置包含必要的動畫
2. 檢查 `tailwind.config.js` 中的自定義動畫定義
3. 驗證 CSS 載入順序

## 調試功能

### 開發環境調試
組件在開發環境下會輸出調試信息：

```javascript
// 在瀏覽器控制台查看
// SpecialtyTooltip mounted with props: { name: "專長名稱", description: "專長描述", ... }
// SpecialtyTooltip: Missing name or description { name: "", description: "" }
```

## 相關文件
- `ThemeCard.vue` - 主題卡組件
- `TeamThemeCard.vue` - 團隊主題卡組件  
- `EquipmentCard.vue` - 裝備卡組件
- `tailwind.config.js` - Tailwind 配置（包含自定義動畫）

## 版本歷史
- **v1.0** - 初始版本，支援基本懸浮提示功能
- **v1.1** - 優化數據驗證和錯誤處理  
- **v1.2** - 重大改進：簡化插槽結構，修復顯示問題，改進數據處理，添加向後兼容性

## 遷移指南

### 從 v1.1 升級到 v1.2

**舊用法 (v1.1):**
```vue
<SpecialtyTooltip :name="name" :description="description">
  <template #trigger="{ showTooltip, hideTooltip }">
    <span @mouseenter="showTooltip" @mouseleave="hideTooltip">
      內容
    </span>
  </template>
</SpecialtyTooltip>
```

**新用法 (v1.2):**
```vue
<SpecialtyTooltip :name="name" :description="description">
  <span>內容</span>
</SpecialtyTooltip>
```

事件處理現在是自動的，不需要手動綁定 `mouseenter` 和 `mouseleave` 事件。
