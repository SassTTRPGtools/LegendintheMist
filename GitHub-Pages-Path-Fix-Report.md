# GitHub Pages 路徑修正報告

## 修正日期
2025年7月6日

## 問題描述
在 GitHub Pages 部署時，所有靜態資源（圖片、JSON 文件）的路徑缺少專案基礎路徑 `/LegendintheMist/`。

## 根本原因
- 本地開發：資源路徑為 `/ui_icon/...` 或 `/MO/...`
- GitHub Pages：需要 `/LegendintheMist/ui_icon/...` 或 `/LegendintheMist/MO/...`

## 解決方案
在每個組件中添加動態基礎路徑函數：

```javascript
const getBasePath = () => {
  // 在生產環境中使用配置的 baseURL，在開發環境中使用空字串
  if (process.env.NODE_ENV === 'production') {
    return '/LegendintheMist'
  }
  return ''
}
```

## 修正的文件

### 1. components/MO/CharacterTypeChart.vue ✅
**修正內容**：
- 添加 `getBasePath()` 函數
- 修正 `getEssenceImagePath()` 中的圖片路徑
- 修正模板中的 `blank.svg` 路徑

**修正前**：
```javascript
const imagePath = `/ui_icon/essences/${idealFilename}`
```

**修正後**：
```javascript
const imagePath = `${getBasePath()}/ui_icon/essences/${idealFilename}`
```

### 2. components/MO/ThemeCard.vue ✅
**修正內容**：
- 添加 `getBasePath()` 函數
- 修正 `getThemeHeaderImage()` 函數中的背景圖片路徑
- 修正 `getThemeIcon()` 函數中的圖示路徑

**修正前**：
```javascript
'mythos': '/ui_icon/header/header-mythos.webp'
```

**修正後**：
```javascript
'mythos': `${basePath}/ui_icon/header/header-mythos.webp`
```

### 3. pages/MO/character-builder.vue ✅
**修正內容**：
- 添加 `getBasePath()` 函數
- 修正主題 JSON 檔案載入路徑

**修正前**：
```javascript
fetch('/MO/mythos-themes.json')
```

**修正後**：
```javascript
fetch(`${basePath}/MO/mythos-themes.json`)
```

### 4. pages/MO/template-creator.vue ✅
**修正內容**：
- 添加 `getBasePath()` 函數
- 修正三個 JSON 載入位置：
  - 角色範例載入
  - 主題中文名稱載入
  - 模板載入

**修正前**：
```javascript
await $fetch(`/MO/sample_characters/${themeSystem}/${fileName}.json`)
```

**修正後**：
```javascript
await $fetch(`${basePath}/MO/sample_characters/${themeSystem}/${fileName}.json`)
```

### 5. pages/MO/character-reference.vue ✅
**修正內容**：
- 添加 `getBasePath()` 函數
- 修正 `loadJsonData()` 函數
- 修正範例角色載入路徑

**修正前**：
```javascript
await $fetch(`/MO/${filename}`)
```

**修正後**：
```javascript
await $fetch(`${basePath}/MO/${filename}`)
```

### 6. pages/MO/equipment-viewer.vue ✅
**狀態**：已正確處理基礎路徑問題，無需修正

## 測試結果

### 本地開發環境
- ✅ 所有資源正常載入
- ✅ 圖片顯示正常
- ✅ JSON 資料載入成功

### GitHub Pages 生產環境
- ✅ 基礎路徑自動添加 `/LegendintheMist/`
- ✅ 圖片路徑正確：`/LegendintheMist/ui_icon/essences/4M.svg`
- ✅ JSON 路徑正確：`/LegendintheMist/MO/mythos-themes.json`

## 修正效果

### 修正前（錯誤路徑）
```
https://sassttrpgtools.github.io/ui_icon/essences/4M.svg (404)
https://sassttrpgtools.github.io/MO/mythos-themes.json (404)
```

### 修正後（正確路徑）
```
https://sassttrpgtools.github.io/LegendintheMist/ui_icon/essences/4M.svg (200)
https://sassttrpgtools.github.io/LegendintheMist/MO/mythos-themes.json (200)
```

## 相關配置

### nuxt.config.ts
```typescript
app: {
  baseURL: "/LegendintheMist/",
  buildAssetsDir: '/_nuxt/',
}
```

此配置確保：
- 靜態資源使用正確的基礎路徑
- 動態資源（_nuxt）使用正確的路徑
- GitHub Pages 部署正常運作

## 注意事項

1. **環境判斷**：使用 `process.env.NODE_ENV === 'production'` 來區分開發和生產環境
2. **一致性**：所有靜態資源載入都必須使用 `getBasePath()` 函數
3. **測試**：任何新增的靜態資源載入都需要考慮基礎路徑問題

## 受影響的功能

### 已修正 ✅
- 角色類型圖片顯示
- 主題卡背景圖片
- 主題卡圖示
- 所有 JSON 資料載入
- 角色範例載入
- 裝備資料載入

### 無需修正
- CSS 檔案（由 Nuxt 自動處理）
- JavaScript 檔案（由 Nuxt 自動處理）
- 字體檔案（如果有，由 Nuxt 自動處理）

## 驗證清單

- [x] 本地開發環境測試
- [x] 確認所有圖片載入正常
- [x] 確認所有 JSON 載入正常
- [x] 確認 GitHub Pages 路徑正確
- [x] 確認角色建立器功能正常
- [x] 確認專長懸浮提示功能正常

---

**結論**：所有 GitHub Pages 路徑問題已完全修正，本地開發和生產部署均正常運作。
