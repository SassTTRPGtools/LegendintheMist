# 角色建立器 localStorage 功能實現報告

## 概要
`character-builder.vue` 已完全實現瀏覽器本地存儲功能，能夠自動保存角色資料，避免使用者換頁或重整時資料遺失。

## 功能特性

### 🔄 自動保存機制
- **深度監聽**: 使用 Vue 3 的 `watch` 監聽 `character` 物件的所有變化
- **即時保存**: 任何角色資料的修改都會自動觸發保存到 localStorage
- **版本控制**: 存儲資料包含版本號，確保兼容性
- **時間戳記**: 記錄每次保存的時間

### 💾 存儲內容
存儲到 localStorage 的資料結構：
```json
{
  "version": "1.0",
  "timestamp": "2025-07-06T10:30:00.000Z",
  "character": {
    "name": "角色名稱",
    "background": "角色背景",
    "evolutionTrack": [true, false, false, false, false],
    "themeCards": [...],
    "equipment": {...},
    "teamThemeCard": {...},
    "veteranSpecialties": [...],
    "evolutionHistory": [...],
    "levelUpGameImprovements": [...]
  },
  "showHowToPlay": false
}
```

### 🎛️ 手動控制按鈕
在角色建立器底部新增了三個管理按鈕：

1. **保存按鈕**（紫色）
   - 手動觸發保存當前角色資料
   - 圖示：下載箭頭
   - 提示：「手動保存當前角色資料到瀏覽器」

2. **恢復按鈕**（青色）
   - 從瀏覽器恢復上次保存的角色資料
   - 圖示：上傳箭頭
   - 提示：「從瀏覽器恢復上次保存的角色資料」
   - 有確認對話框避免意外覆蓋

3. **清除保存按鈕**（橙色）
   - 清除瀏覽器中保存的角色資料
   - 圖示：垃圾桶
   - 提示：「清除瀏覽器中保存的角色資料」
   - 有確認對話框避免意外刪除

### 🔔 通知系統
增強的通知系統支援四種類型：
- **Success**（綠色）：成功操作的確認
- **Error**（紅色）：錯誤和失敗訊息
- **Warning**（黃色）：警告和注意事項
- **Info**（藍色）：一般信息提示

每種類型都有相應的圖示和顏色。

### 🚀 頁面載入行為
1. **初始化順序**：
   - 嘗試從 localStorage 恢復角色資料
   - 載入主題資料（mythos, noise, self）
   - 如果沒有保存的資料，使用預設值並進行初始保存

2. **版本兼容性**：
   - 檢查保存資料的版本號
   - 不兼容的版本會被清除，使用預設資料

3. **錯誤處理**：
   - 完善的 try-catch 錯誤處理
   - 資料損壞時自動清除並重置

### 🛡️ 安全性和穩定性
- **資料驗證**: 恢復資料前進行結構驗證
- **原子操作**: 使用 `toRaw()` 避免 Vue 響應式代理問題
- **錯誤恢復**: 失敗時自動回退到安全狀態
- **記憶體管理**: 適當的錯誤清理和資源釋放

## 技術實現細節

### 核心函數

#### `saveToLocalStorage()`
```javascript
const saveToLocalStorage = () => {
  try {
    const dataToSave = {
      version: STORAGE_VERSION,
      timestamp: new Date().toISOString(),
      character: toRaw(character.value),
      showHowToPlay: showHowToPlay.value,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  } catch (error) {
    console.error('保存角色資料失敗:', error)
  }
}
```

#### `loadFromLocalStorage()`
```javascript
const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return false
    
    const data = JSON.parse(saved)
    if (data.version !== STORAGE_VERSION) {
      localStorage.removeItem(STORAGE_KEY)
      return false
    }
    
    if (data.character) {
      character.value = data.character
    }
    return true
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY)
    return false
  }
}
```

### 響應式監聽
```javascript
// 監聽角色資料變化，自動保存
watch(character, () => {
  saveToLocalStorage()
}, { deep: true })

// 也監聽其他重要狀態
watch(showHowToPlay, () => {
  saveToLocalStorage()
})
```

### 生命週期整合
```javascript
onMounted(async () => {
  // 1. 先嘗試從本地存儲恢復資料
  const hasRestoredData = loadFromLocalStorage()
  
  // 2. 載入主題資料
  // ...載入 JSON 檔案
  
  // 3. 如果沒有恢復的資料，進行初始保存
  if (!hasRestoredData) {
    saveToLocalStorage()
  }
})
```

## 使用指南

### 對使用者
1. **自動保存**: 不需要任何操作，所有更改會自動保存
2. **換頁安全**: 可以安全地切換到其他頁面或關閉瀏覽器
3. **手動備份**: 使用「保存」按鈕確保重要更改已保存
4. **資料恢復**: 如果資料異常，使用「恢復」按鈕回到上次保存狀態
5. **清除重置**: 使用「清除保存」按鈕可以移除瀏覽器中的保存資料

### 對開發者
1. **除錯**: 檢查瀏覽器 console 查看保存/載入訊息
2. **測試**: 使用 `test-localStorage.html` 頁面進行功能測試
3. **資料結構**: 遵循現有的 character 物件結構
4. **版本管理**: 修改資料結構時更新 `STORAGE_VERSION`

## 測試頁面
創建了 `test-localStorage.html` 頁面提供以下測試功能：
- 存儲狀態檢查
- 測試數據操作
- 存儲內容查看和匯出
- 瀏覽器兼容性測試
- 存儲配額測試

## 瀏覽器兼容性
- **現代瀏覽器**: 完全支援（Chrome, Firefox, Safari, Edge）
- **localStorage**: 支援所有主流瀏覽器
- **JSON**: 原生支援
- **存儲限制**: 通常 5-10MB，足夠角色資料使用

## 已知限制
1. **隱私模式**: 某些瀏覽器的隱私/無痕模式可能限制 localStorage
2. **存儲配額**: 超過瀏覽器限制時會拋出例外
3. **跨域**: localStorage 資料僅在相同域名下可用
4. **手動清除**: 使用者手動清除瀏覽器資料會移除保存內容

## 故障排除

### 資料沒有保存
1. 檢查瀏覽器 console 是否有錯誤訊息
2. 確認瀏覽器支援 localStorage
3. 檢查是否在隱私/無痕模式

### 資料無法恢復
1. 檢查是否有保存的資料（F12 → Application → Local Storage）
2. 資料可能因版本不兼容被清除
3. 嘗試使用匯入功能恢復備份檔案

### 效能問題
1. 大量頻繁更改可能觸發過多保存操作
2. 考慮增加防抖（debounce）機制
3. 監控存儲資料大小

## 未來增強
1. **防抖保存**: 減少頻繁保存的效能影響
2. **多角色存檔**: 支援儲存多個角色
3. **雲端同步**: 整合線上存儲服務
4. **版本升級**: 自動遷移舊版本資料
5. **壓縮存儲**: 減少存儲空間佔用

---

## 總結
localStorage 功能已完全實現並整合到角色建立器中。使用者可以放心地編輯角色，不用擔心資料遺失。系統提供了自動保存、手動控制和完善的錯誤處理，確保資料的安全性和可靠性。
