import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const dataPath = path.join(projectRoot, 'data');
const publicPath = path.join(projectRoot, 'public');

console.log('🔍 檢查 data 資料夾移除準備...\n');

// 檢查是否還有程式碼引用 data 路徑
async function checkForDataReferences() {
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);
  
  try {
    console.log('📋 搜尋可能的 data 路徑引用...');
    
    // 搜尋所有可能的 data 路徑引用
    const { stdout } = await execAsync('grep -r "/data/" pages/ --include="*.vue" --include="*.js" --include="*.ts" 2>/dev/null || true');
    
    if (stdout.trim()) {
      console.log('⚠️  發現以下檔案仍引用 /data/ 路徑：');
      console.log(stdout);
      return false;
    } else {
      console.log('✅ 沒有發現 /data/ 路徑引用');
      return true;
    }
  } catch (error) {
    console.log('❌ 搜尋過程出錯:', error.message);
    return false;
  }
}

// 比較 data 和 public 目錄內容
function compareDirectories(dir1, dir2, relativePath = '') {
  if (!fs.existsSync(dir1) || !fs.existsSync(dir2)) {
    return [];
  }
  
  const differences = [];
  const items1 = fs.readdirSync(dir1);
  const items2 = fs.readdirSync(dir2);
  
  // 檢查在 dir1 中但不在 dir2 中的項目
  for (const item of items1) {
    const fullPath = path.join(relativePath, item);
    
    if (!items2.includes(item)) {
      differences.push(`缺少: ${fullPath}`);
      continue;
    }
    
    const path1 = path.join(dir1, item);
    const path2 = path.join(dir2, item);
    const stat1 = fs.statSync(path1);
    const stat2 = fs.statSync(path2);
    
    if (stat1.isDirectory() && stat2.isDirectory()) {
      differences.push(...compareDirectories(path1, path2, fullPath));
    } else if (stat1.isFile() && stat2.isFile()) {
      // 比較檔案大小
      if (stat1.size !== stat2.size) {
        differences.push(`大小不同: ${fullPath} (${stat1.size} vs ${stat2.size})`);
      }
    }
  }
  
  return differences;
}

async function main() {
  // 1. 檢查程式碼引用
  const noReferences = await checkForDataReferences();
  
  if (!noReferences) {
    console.log('\n❌ 仍有程式碼引用 data 路徑，請先修正後再執行移除操作。');
    process.exit(1);
  }
  
  // 2. 比較 data/MO 和 public/MO
  console.log('\n📊 比較 data/MO 和 public/MO 目錄...');
  const moDataPath = path.join(dataPath, 'MO');
  const moPublicPath = path.join(publicPath, 'MO');
  
  if (fs.existsSync(moDataPath) && fs.existsSync(moPublicPath)) {
    const differences = compareDirectories(moDataPath, moPublicPath, 'MO');
    
    if (differences.length > 0) {
      console.log('⚠️  發現以下差異：');
      differences.forEach(diff => console.log(`  - ${diff}`));
      console.log('\n建議先同步這些差異再進行移除操作。');
    } else {
      console.log('✅ MO 目錄內容完全同步');
    }
  }
  
  // 3. 比較 data/LitM 和 public/LitM（如果存在）
  console.log('\n📊 檢查 LitM 目錄...');
  const litmDataPath = path.join(dataPath, 'LitM');
  const litmPublicPath = path.join(publicPath, 'LitM');
  
  if (fs.existsSync(litmDataPath)) {
    if (!fs.existsSync(litmPublicPath)) {
      console.log('⚠️  data/LitM 存在但 public/LitM 不存在');
      console.log('   需要先將 LitM 內容複製到 public 目錄');
    } else {
      const litmDifferences = compareDirectories(litmDataPath, litmPublicPath, 'LitM');
      if (litmDifferences.length > 0) {
        console.log('⚠️  LitM 目錄有差異：');
        litmDifferences.forEach(diff => console.log(`  - ${diff}`));
      } else {
        console.log('✅ LitM 目錄內容同步');
      }
    }
  }
  
  // 4. 列出 data 目錄內容
  console.log('\n📁 data 目錄當前內容：');
  if (fs.existsSync(dataPath)) {
    const items = fs.readdirSync(dataPath);
    items.forEach(item => {
      const itemPath = path.join(dataPath, item);
      const isDir = fs.statSync(itemPath).isDirectory();
      console.log(`  ${isDir ? '📁' : '📄'} ${item}`);
    });
  } else {
    console.log('  (目錄不存在)');
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📋 移除 data 資料夾檢查清單：');
  console.log('✅ 所有程式碼已更新為使用 public 路徑');
  console.log('✅ MO 資料已完全同步到 public/MO');
  
  if (fs.existsSync(litmDataPath)) {
    if (fs.existsSync(litmPublicPath)) {
      const litmDifferences = compareDirectories(litmDataPath, litmPublicPath, 'LitM');
      if (litmDifferences.length === 0) {
        console.log('✅ LitM 資料已完全同步到 public/LitM');
      } else {
        console.log('⚠️  LitM 資料需要處理');
      }
    } else {
      console.log('⚠️  LitM 資料需要處理');
    }
  } else {
    console.log('✅ 沒有 LitM 資料需要處理');
  }
  
  console.log('\n🎯 建議執行步驟：');
  console.log('1. 確認所有網頁功能正常運作');
  console.log('2. 備份 data 資料夾（以防萬一）');
  
  const allSynced = (!fs.existsSync(litmDataPath) || 
    (fs.existsSync(litmPublicPath) && compareDirectories(litmDataPath, litmPublicPath, 'LitM').length === 0));
  
  if (allSynced) {
    console.log('3. ✅ 所有資料已同步完成');
    console.log('4. 可以安全移除 data 資料夾');
  } else {
    console.log('3. 處理 LitM 資料（如果存在）');
    console.log('4. 刪除 data 資料夾');
  }
  
  if (fs.existsSync(litmDataPath) && !allSynced) {
    console.log('\n💡 處理 LitM 的建議指令：');
    console.log('   cp -r data/LitM public/');
    console.log('   # 然後更新 pages/LitM/ 中的檔案路徑');
  }
  
  console.log('\n🗑️  確認一切無誤後，可執行以下指令移除 data 資料夾：');
  console.log('   rm -rf data/');
}

main().catch(console.error);
