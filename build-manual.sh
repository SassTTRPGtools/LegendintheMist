#!/bin/bash

# 手動建構腳本，解決 Windows 上的 Nitro 預渲染問題

echo "開始建構..."
npm run build

echo "創建輸出目錄..."
mkdir -p .output/public

echo "複製客戶端檔案..."
cp -r .nuxt/dist/client/* .output/public/

echo "複製 favicon..."
cp public/favicon.ico .output/public/

echo "取得動態檔案名稱..."
CSS_FILE=$(find .output/public/_nuxt -name "entry.*.css" | head -1 | xargs basename)
JS_FILE=$(find .output/public/_nuxt -name "*.js" | grep -v entry | head -1 | xargs basename)

echo "找到的檔案:"
echo "CSS: $CSS_FILE"
echo "JS: $JS_FILE"

echo "生成 index.html..."
cat > .output/public/index.html << EOF
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Legend in the Mist</title>
  <link rel="icon" type="image/x-icon" href="/LegendintheMist/favicon.ico">
  <link rel="stylesheet" href="/LegendintheMist/_nuxt/$CSS_FILE">
</head>
<body>
  <div id="__nuxt"></div>
  <script type="module" src="/LegendintheMist/_nuxt/$JS_FILE"></script>
</body>
</html>
EOF

echo "創建 .nojekyll..."
touch .output/public/.nojekyll

echo "建構完成！"
echo "檢查生成的檔案:"
ls -la .output/public/
echo ""
echo "檢查 CSS 檔案內容（前 50 行）:"
head -50 ".output/public/_nuxt/$CSS_FILE"
