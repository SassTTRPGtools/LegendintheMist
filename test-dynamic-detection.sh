#!/bin/bash

echo "=== Testing Dynamic File Detection Logic ==="

cd "$(dirname "$0")"

# Build the project
echo "Building project..."
npm run build

# Check if build succeeded
if [ ! -d ".nuxt/dist/client" ]; then
    echo "✗ Build failed - .nuxt/dist/client missing!"
    exit 1
fi

echo "=== SOURCE FILES BEFORE COPY ==="
echo "Source CSS files:"
find .nuxt/dist/client -name "*.css" -type f

echo "Source JS files (top 5):"
find .nuxt/dist/client -name "*.js" -type f | head -5

# Clean and create output directory
rm -rf .output/public
mkdir -p .output/public

# Copy files
echo "Copying client files..."
cp -r .nuxt/dist/client/* .output/public/

echo "=== COPIED FILES VERIFICATION ==="
echo "Destination CSS files:"
find .output/public -name "*.css" -type f

echo "Destination JS files (top 5):"
find .output/public -name "*.js" -type f | head -5

# Find actual CSS and JS files dynamically
echo "=== FINDING MAIN ASSETS ==="
ENTRY_CSS=$(find .output/public/_nuxt -name "entry.*.css" | head -1)
MAIN_JS=$(find .output/public/_nuxt -name "*.js" -exec ls -la {} \; | sort -k5 -nr | head -1 | awk '{print $9}')

if [ -z "$ENTRY_CSS" ]; then
    echo "✗ No entry CSS file found! Looking for alternatives..."
    # Try to find any main CSS file
    ENTRY_CSS=$(find .output/public/_nuxt -name "*.css" -exec ls -la {} \; | sort -k5 -nr | head -1 | awk '{print $9}')
fi

if [ -z "$MAIN_JS" ]; then
    echo "✗ No main JS file found!"
    exit 1
fi

if [ -n "$ENTRY_CSS" ] && [ -f "$ENTRY_CSS" ]; then
    CSS_NAME=$(basename "$ENTRY_CSS")
    CSS_SIZE=$(wc -c < "$ENTRY_CSS")
    echo "✓ Found CSS file: $CSS_NAME ($CSS_SIZE bytes)"
else
    echo "✗ No valid CSS file found!"
    exit 1
fi

if [ -n "$MAIN_JS" ] && [ -f "$MAIN_JS" ]; then
    JS_NAME=$(basename "$MAIN_JS")
    JS_SIZE=$(wc -c < "$MAIN_JS")
    echo "✓ Found JS file: $JS_NAME ($JS_SIZE bytes)"
else
    echo "✗ No valid JS file found!"
    exit 1
fi

echo "Creating index.html with dynamic asset names..."
cat > .output/public/index.html << EOF
<!DOCTYPE html>
<html>
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

echo "Generated index.html:"
cat .output/public/index.html

echo "=== FINAL VERIFICATION ==="
CSS_COUNT=$(find .output/public/_nuxt -name "*.css" | wc -l)
JS_COUNT=$(find .output/public/_nuxt -name "*.js" | wc -l)

echo "Found $CSS_COUNT CSS files and $JS_COUNT JS files"

if [ $CSS_COUNT -eq 0 ]; then
    echo "✗ No CSS files found!"
    exit 1
fi

if [ $JS_COUNT -eq 0 ]; then
    echo "✗ No JS files found!"
    exit 1
fi

echo "✓ All tests passed! Dynamic file detection working correctly."
