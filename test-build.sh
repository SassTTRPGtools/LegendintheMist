#!/bin/bash

echo "=== Nuxt Build Test ==="
echo "1. Running npm run generate..."

# 清理之前的建構
rm -rf .output

# 執行建構
npm run generate 2>/dev/null || echo "Build completed with warnings"

echo ""
echo "2. Checking output directory..."
if [ -d ".output/public" ]; then
    echo "✅ .output/public directory exists"
    
    echo ""
    echo "3. Looking for CSS files..."
    css_files=$(find .output/public -name "*.css" -type f)
    if [ -n "$css_files" ]; then
        echo "✅ CSS files found:"
        echo "$css_files"
        
        echo ""
        echo "4. Checking CSS file sizes..."
        for file in $css_files; do
            size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null || echo "unknown")
            echo "  $(basename $file): ${size} bytes"
            
            # 檢查是否包含 Tailwind 類別
            if grep -q "tailwind\|bg-gradient\|text-center" "$file" 2>/dev/null; then
                echo "    ✅ Contains Tailwind CSS classes"
            else
                echo "    ❌ No Tailwind CSS classes found"
            fi
        done
    else
        echo "❌ No CSS files found"
    fi
    
    echo ""
    echo "5. Checking for index.html..."
    if [ -f ".output/public/index.html" ]; then
        echo "✅ index.html exists"
        
        # 檢查 HTML 中是否有 CSS 鏈接
        css_links=$(grep -o 'href="[^"]*\.css"' .output/public/index.html || echo "none")
        echo "CSS links in HTML: $css_links"
    else
        echo "❌ index.html not found"
    fi
    
    echo ""
    echo "6. Directory structure:"
    ls -la .output/public/
    
    if [ -d ".output/public/_nuxt" ]; then
        echo ""
        echo "7. _nuxt directory contents:"
        ls -la .output/public/_nuxt/
    fi
else
    echo "❌ .output/public directory does not exist"
fi

echo ""
echo "=== Test Complete ==="
