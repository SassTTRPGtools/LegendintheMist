import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 取得當前檔案目錄
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置檔案路徑
const configPath = path.join(__dirname, '..', 'public', 'MO', 'config');
const configFiles = [
  'action-categories.json',
  'success-results.json', 
  'cross-references.json',
  'ui-labels.json'
];

console.log('🔍 驗證設定檔案...\n');

let allValid = true;

configFiles.forEach(filename => {
  const filePath = path.join(configPath, filename);
  
  try {
    // 檢查檔案是否存在
    if (!fs.existsSync(filePath)) {
      console.log(`❌ ${filename}: 檔案不存在`);
      allValid = false;
      return;
    }
    
    // 讀取並解析 JSON
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // 基本驗證
    if (typeof data !== 'object' || data === null) {
      console.log(`❌ ${filename}: 無效的 JSON 結構`);
      allValid = false;
      return;
    }
    
    // 檔案特定驗證
    switch (filename) {
      case 'action-categories.json':
        if (!Array.isArray(data.categories) || !data.categoryFiles) {
          console.log(`❌ ${filename}: 缺少必要的 categories 或 categoryFiles 欄位`);
          allValid = false;
        } else {
          console.log(`✅ ${filename}: 包含 ${data.categories.length} 個類別`);
        }
        break;
        
      case 'success-results.json':
        if (!data.successResultMapping) {
          console.log(`❌ ${filename}: 缺少 successResultMapping 欄位`);
          allValid = false;
        } else {
          const count = Object.keys(data.successResultMapping).length;
          console.log(`✅ ${filename}: 包含 ${count} 個成功結果映射`);
        }
        break;
        
      case 'cross-references.json':
        if (!Array.isArray(data.crossReferencePatterns)) {
          console.log(`❌ ${filename}: crossReferencePatterns 必須是陣列`);
          allValid = false;
        } else {
          console.log(`✅ ${filename}: 包含 ${data.crossReferencePatterns.length} 個交叉引用模式`);
        }
        break;
        
      case 'ui-labels.json':
        if (!data.ui || !data.sections || !data.states) {
          console.log(`❌ ${filename}: 缺少必要的 ui、sections 或 states 欄位`);
          allValid = false;
        } else {
          console.log(`✅ ${filename}: UI 標籤配置完整`);
        }
        break;
    }
    
  } catch (error) {
    console.log(`❌ ${filename}: JSON 語法錯誤 - ${error.message}`);
    allValid = false;
  }
});

console.log('\n' + '='.repeat(50));
if (allValid) {
  console.log('🎉 所有設定檔案驗證通過！');
  process.exit(0);
} else {
  console.log('⚠️  發現設定檔案問題，請檢查上述錯誤。');
  process.exit(1);
}
