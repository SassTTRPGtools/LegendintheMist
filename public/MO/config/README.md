# 都市異景行動資料庫 - 設定檔案說明

本專案已將所有設定值抽取為獨立的 JSON 檔案，以提高可維護性和配置彈性。

## 📁 設定檔案結構

```
public/MO/config/
├── action-categories.json      # 行動類別與檔案映射
├── success-results.json       # 成功結果中英文映射
├── cross-references.json      # 交叉引用關鍵字設定
└── ui-labels.json             # 使用者介面文字標籤
```

## ⚙️ 設定檔案說明

### 1. action-categories.json
管理行動類別和檔案結構：
- `categories`: 主要行動類別列表
- `categoryFiles`: 每個類別下的具體檔案

### 2. success-results.json  
定義成功結果的中英文對應：
- `successResultMapping`: 成功結果鍵值的中文名稱
- `extraFeatKeywords`: 額外壯舉關鍵字

### 3. cross-references.json
設定交叉引用懸浮提示：
- `crossReferencePatterns`: 關鍵字、正則表達式和說明文字

### 4. ui-labels.json
使用者介面文字設定：
- `ui`: 介面元素標籤和提示文字
- `sections`: 內容區塊標題
- `states`: 狀態提示訊息
- `tooltip`: 懸浮提示配置參數

## 🔧 修改設定

1. **新增行動類別**：編輯 `action-categories.json`
2. **修改介面文字**：編輯 `ui-labels.json`
3. **調整交叉引用**：編輯 `cross-references.json`
4. **更新成功結果映射**：編輯 `success-results.json`

## 🚀 載入機制

設定檔案在頁面初始化時自動載入：
```javascript
// 並行載入所有配置檔案
await loadConfigs()
```

如果配置檔案載入失敗，系統會使用內建的預設值確保正常運作。

## 💡 最佳實踐

1. **備份**：修改前先備份原始檔案
2. **測試**：修改後在開發環境測試
3. **格式**：確保 JSON 語法正確
4. **編碼**：使用 UTF-8 編碼以支援中文

## 🔍 故障排除

如果配置載入失敗：
1. 檢查 JSON 語法是否正確
2. 確認檔案路徑和權限
3. 查看瀏覽器控制台錯誤訊息
4. 系統會自動退回到預設設定
