#!/bin/bash

echo "=== Testing App Manifest Fix ==="

cd "$(dirname "$0")"

# 確保有最新的建構檔案
npm run build

# 複製檔案
rm -rf .output/public
mkdir -p .output/public
cp -r .nuxt/dist/client/* .output/public/

# 複製 favicon
cp public/favicon.ico .output/public/

# 動態檢測檔案
ENTRY_CSS=$(find .output/public/_nuxt -name "entry.*.css" | head -1)
MAIN_JS=$(find .output/public/_nuxt -name "*.js" -exec ls -la {} \; | sort -k5 -nr | head -1 | awk '{print $9}')

CSS_NAME=$(basename "$ENTRY_CSS")
JS_NAME=$(basename "$MAIN_JS")

echo "Detected files: CSS=$CSS_NAME, JS=$JS_NAME"

# 生成帶 app manifest 修正的 index.html
cat > .output/public/index.html << EOF
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Legend in the Mist</title>
    <link rel="icon" type="image/x-icon" href="/LegendintheMist/favicon.ico">
    <link rel="stylesheet" href="/LegendintheMist/_nuxt/$CSS_NAME">
    <script>
        // 注入完整的 Nuxt runtime config
        window.__NUXT__ = {
            config: {
                app: {
                    baseURL: '/LegendintheMist/',
                    buildAssetsDir: '/_nuxt/',
                    cdnURL: null
                },
                public: {
                    baseURL: '/LegendintheMist/'
                }
            },
            data: {},
            state: {},
            // 禁用 app manifest
            \$config: {
                app: {
                    baseURL: '/LegendintheMist/',
                    buildAssetsDir: '/_nuxt/'
                }
            },
            // 防止載入 manifest
            ssrContext: null,
            payload: {
                serverRendered: false,
                config: {
                    app: {
                        baseURL: '/LegendintheMist/'
                    }
                }
            }
        };
        
        // 防止 Nuxt 嘗試載入 app manifest
        if (window.nuxtAppManifest) {
            window.nuxtAppManifest = null;
        }
        
        console.log('Runtime config with manifest fix injected:', window.__NUXT__);
    </script>
</head>
<body>
    <div id="__nuxt"></div>
    <script type="module" src="/LegendintheMist/_nuxt/$JS_NAME"></script>
</body>
</html>
EOF

echo "Generated index.html with app manifest fix:"
echo "=================="
head -n 15 .output/public/index.html
echo "... (truncated)"
echo "=================="

echo "✓ App manifest fix test files generated successfully"
echo "Main JS file: $JS_NAME"
echo "This should prevent the 'undefined.json' manifest error"
