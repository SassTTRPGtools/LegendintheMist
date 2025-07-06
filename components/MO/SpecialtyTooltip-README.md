# SpecialtyTooltip 組件使用說明

`SpecialtyTooltip` 是一個可重用的懸浮提示組件，專門用於顯示專長資訊，具有都市異景風格的視覺效果。

## 🎯 特色功能

- **都市異景風格**：青色發光邊框、科技感網格背景、多層次光暈效果
- **智能定位**：自動檢測視窗邊界，確保提示框完全顯示
- **高性能**：使用 Teleport 和固定定位，不受父容器限制
- **可重用**：支援插槽模式，可以包裝任何觸發元素

## 📝 基本用法

```vue
<SpecialtyTooltip
  :name="專長名稱"
  :description="專長描述"
>
  <template #trigger="{ showTooltip, hideTooltip }">
    <span 
      class="cursor-help text-amber-300"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
    >
      專長標籤
    </span>
  </template>
</SpecialtyTooltip>
```

## 🔧 Props

| 屬性 | 類型 | 必需 | 描述 |
|------|------|------|------|
| `name` | `string` | ✓ | 專長名稱 |
| `description` | `string` | ✓ | 專長描述 |

## 🎨 插槽

### trigger

觸發器插槽，用於包裝觸發懸浮提示的元素。

**插槽 Props:**
- `showTooltip: (event: MouseEvent) => void` - 顯示提示函數
- `hideTooltip: () => void` - 隱藏提示函數

## 📚 實際應用範例

### 1. 主題專長（ThemeCard.vue）

```vue
<SpecialtyTooltip
  v-for="(specialty, index) in themeCard.selectedSpecialties" 
  :key="index"
  :name="getSpecialtyName(specialty)"
  :description="getSpecialtyFullDescription(specialty)"
>
  <template #trigger="{ showTooltip, hideTooltip }">
    <span 
      class="inline-flex items-center px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs cursor-help border border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-400/50 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-200 relative overflow-hidden group-hover:animate-pulse"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
    >
      <!-- 科技感背景效果 -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div class="relative z-10">{{ getSpecialtyName(specialty) }}</div>
    </span>
  </template>
</SpecialtyTooltip>
```

### 2. 團隊主題專長（TeamThemeCard.vue）

```vue
<SpecialtyTooltip
  v-for="(specialty, index) in teamThemeCard.customSpecialties" 
  :key="index"
  :name="specialty.name.trim() || `專長 ${index + 1}`"
  :description="specialty.description || `專長描述 ${index + 1}`"
>
  <template #trigger="{ showTooltip, hideTooltip }">
    <span 
      class="inline-flex items-center px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs cursor-help border border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-400/50 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-200 relative overflow-hidden"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
    >
      {{ specialty.name.trim() || `專長 ${index + 1}` }}
    </span>
  </template>
</SpecialtyTooltip>
```

### 3. 裝備專長（EquipmentCard.vue）

```vue
<SpecialtyTooltip
  v-for="(specialty, index) in equipment.specialties" 
  :key="index"
  :name="specialty.type ? equipmentSpecialties[specialty.type]?.name : `專長 ${index + 1}`"
  :description="specialty.type ? getSpecialtyDescription(specialty.type) : `專長描述 ${index + 1}`"
>
  <template #trigger="{ showTooltip, hideTooltip }">
    <span 
      class="inline-flex items-center px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs cursor-help border border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-400/50 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-200 relative overflow-hidden"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
    >
      {{ specialty.type ? equipmentSpecialties[specialty.type]?.name : `專長 ${index + 1}` }}
    </span>
  </template>
</SpecialtyTooltip>
```

## 🎨 視覺效果特色

- **發光邊框**：青色邊框配合 `animate-glow` 動畫
- **科技裝飾**：四個角落的脈衝圓點
- **網格背景**：細微的網格圖案增添科技感
- **多層光暈**：三層不同模糊度的光暈效果
- **淡入動畫**：`animate-fade-in` 讓出現更自然

## 🔧 技術實現

- **Teleport**：使用 Vue 3 的 Teleport 渲染到 body
- **固定定位**：使用 `position: fixed` 避免被父容器裁切
- **智能定位**：動態檢測視窗邊界並調整位置
- **高 z-index**：使用 `z-[9999]` 確保顯示在最上層

## 📋 依賴

需要在 `tailwind.config.js` 中配置自定義動畫：

```javascript
theme: {
  extend: {
    animation: {
      'glow': 'glow 2s ease-in-out infinite alternate',
      'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'fade-in': 'fadeIn 0.3s ease-out forwards',
    },
    keyframes: {
      glow: {
        '0%': { 
          boxShadow: '0 0 5px rgba(34, 211, 238, 0.3), 0 0 10px rgba(34, 211, 238, 0.2), 0 0 15px rgba(34, 211, 238, 0.1)',
        },
        '100%': { 
          boxShadow: '0 0 10px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.3), 0 0 30px rgba(34, 211, 238, 0.2)',
        },
      },
      fadeIn: {
        '0%': { 
          opacity: '0',
          transform: 'translate(-50%, -100%) scale(0.9)',
        },
        '100%': { 
          opacity: '1',
          transform: 'translate(-50%, -100%) scale(1)',
        },
      },
    },
  },
}
```
