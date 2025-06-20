#!/bin/bash

echo "=== Testing Simplified Nuxt 3 GitHub Pages Deployment ==="

cd "$(dirname "$0")"

# 清理並建構
echo "Cleaning and building..."
rm -rf .output .nuxt
NODE_ENV=production npm run build

if [ ! -d ".nuxt/dist/client" ]; then
    echo "❌ Build failed - no client files generated"
    exit 1
fi

# 設置輸出目錄
echo "Setting up output directory..."
mkdir -p .output/public
cp -r .nuxt/dist/client/* .output/public/
cp public/favicon.ico .output/public/

# 檢查生成的檔案
echo "Generated files:"
find .output/public/_nuxt -name "*.css" -o -name "*.js" | head -10

# 找到實際的檔案
CSS_FILE=$(find .output/public/_nuxt -name "*.css" -exec ls -la {} \; | sort -k5 -nr | head -1 | awk '{print $9}')
JS_FILE=$(find .output/public/_nuxt -name "*.js" -exec ls -la {} \; | sort -k5 -nr | head -1 | awk '{print $9}')

if [ -n "$CSS_FILE" ] && [ -n "$JS_FILE" ]; then
    CSS_NAME=$(basename "$CSS_FILE")
    JS_NAME=$(basename "$JS_FILE")
    
    echo "Main files: CSS=$CSS_NAME, JS=$JS_NAME"
    
    # 創建簡潔的 index.html
    cat > .output/public/index.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Legend in the Mist</title>
    <link rel="icon" type="image/x-icon" href="/LegendintheMist/favicon.ico">
    <link rel="stylesheet" href="/LegendintheMist/_nuxt/$CSS_NAME">
</head>
<body>
    <div id="__nuxt"></div>
    <script type="module" src="/LegendintheMist/_nuxt/$JS_NAME"></script>
</body>
</html>
EOF

    echo "✅ index.html created successfully"
    echo "Content preview:"
    head -10 .output/public/index.html
    
    # 驗證檔案
    echo "File verification:"
    echo "- index.html: $(test -f .output/public/index.html && echo '✓' || echo '✗')"
    echo "- CSS file: $(test -f ".output/public/_nuxt/$CSS_NAME" && echo "✓ ($CSS_NAME)" || echo '✗')"
    echo "- JS file: $(test -f ".output/public/_nuxt/$JS_NAME" && echo "✓ ($JS_NAME)" || echo '✗')"
    echo "- favicon: $(test -f .output/public/favicon.ico && echo '✓' || echo '✗')"
    
    echo "✅ Simplified deployment test completed successfully!"
else
    echo "❌ Could not find main CSS or JS files"
    exit 1
fi
