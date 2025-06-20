#!/bin/bash

echo "=== Legend in the Mist - 本地部署測試 ==="

# 清理舊檔案
echo "1. 清理舊檔案..."
rm -rf .nuxt .output

# 建構專案
echo "2. 建構專案..."
npm run build || echo "Build failed but continuing..."

# 檢查客戶端檔案
echo "3. 檢查客戶端檔案..."
if [ -d ".nuxt/dist/client" ]; then
    echo "✓ 客戶端檔案已生成"
    ls -la .nuxt/dist/client/_nuxt/
else
    echo "✗ 客戶端檔案未生成"
    exit 1
fi

# 手動建立部署結構
echo "4. 建立部署結構..."
mkdir -p .output/public
cp -r .nuxt/dist/client/* .output/public/
cp public/favicon.ico .output/public/

# 檢查關鍵檔案
echo "5. 檢查關鍵檔案..."
CSS_EXISTS=false
JS_EXISTS=false

if [ -f ".output/public/_nuxt/entry.B1goDtUc.css" ]; then
    echo "✓ CSS 檔案存在 ($(wc -c < .output/public/_nuxt/entry.B1goDtUc.css) 位元組)"
    CSS_EXISTS=true
else
    echo "✗ CSS 檔案不存在"
fi

if [ -f ".output/public/_nuxt/C52IU5KB.js" ]; then
    echo "✓ JS 檔案存在 ($(wc -c < .output/public/_nuxt/C52IU5KB.js) 位元組)"
    JS_EXISTS=true
else
    echo "✗ JS 檔案不存在"
fi

# 生成 index.html
echo "6. 生成 index.html..."
cat > .output/public/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Legend in the Mist</title>
  <link rel="icon" type="image/x-icon" href="/LegendintheMist/favicon.ico">
  <link rel="stylesheet" href="/LegendintheMist/_nuxt/entry.B1goDtUc.css">
</head>
<body>
  <div id="__nuxt"></div>
  <script type="module" src="/LegendintheMist/_nuxt/C52IU5KB.js"></script>
</body>
</html>
EOF

# 添加 .nojekyll
touch .output/public/.nojekyll

# 最終檢查
echo "7. 最終檢查..."
echo "部署目錄結構："
ls -la .output/public/
echo ""
echo "_nuxt 目錄內容："
ls -la .output/public/_nuxt/
echo ""

if [ "$CSS_EXISTS" = true ] && [ "$JS_EXISTS" = true ]; then
    echo "🎉 所有檔案準備就緒！"
    echo ""
    echo "測試建議："
    echo "1. 在本地開啟 .output/public/index.html"
    echo "2. 確認 CSS 樣式正確載入"
    echo "3. 確認 JavaScript 功能正常"
    echo ""
    echo "檔案大小檢查："
    echo "CSS: $(wc -c < .output/public/_nuxt/entry.B1goDtUc.css) 位元組 (應該 > 20KB)"
    echo "JS:  $(wc -c < .output/public/_nuxt/C52IU5KB.js) 位元組 (應該 > 190KB)"
else
    echo "❌ 部分檔案缺失，請檢查建構過程"
    exit 1
fi
