# GlassHeartUI

一個現代化的 UI 元件庫，專注於實現 Apple Liquid Glass 效果。

## ✨ 特色

- **🌊 Liquid Glass 效果** - 包含流動動畫的複雜玻璃效果
- **🎨 高度可自定義** - 支援透明度、模糊程度、動畫速度、顏色調整
- **⚡ 性能優化** - 針對現代瀏覽器優化，支援 GPU 加速
- **🌙 主題系統** - 完整的淺色/深色主題支援
- **📱 響應式設計** - 適配各種螢幕尺寸
- **♿ 無障礙支援** - 支援 reduced-motion 和鍵盤導航
- **🔧 多框架支援** - 原生 JS、React、Vue、Svelte、Angular
- **📝 毛玻璃文字** - 使用 Canvas 渲染的高級文字效果

## 🆕 最新更新 (v1.1.4)

- ✨ **新增 GlassTypography 組件** - 使用 HTML5 Canvas 渲染的高級毛玻璃文字效果
- 🎨 **增強毛玻璃效果** - 多層渲染、複雜漸變、高級圖像處理
- 🎬 **動畫效果** - 液體流動、發光脈衝等動畫效果
- 📱 **響應式設計** - 自動適配各種螢幕尺寸
- 🔧 **多框架支援** - 所有框架都包含完整的 GlassTypography 組件
- 📦 **npm 發布** - 所有包已發布到 npm，版本 v1.1.4

## 📦 套件

GlassHeartUI 提供多個框架的獨立套件：

| 套件 | 描述 | 安裝 | CDN |
|------|------|------|------|
| `glassheart-ui-core` | 核心 CSS 樣式 | `npm install glassheart-ui-core` | `https://unpkg.com/glassheart-ui-core@1.1.4/dist/index.css` |
| `glassheart-ui-react` | React 元件 | `npm install glassheart-ui-react` | `https://unpkg.com/glassheart-ui-react@1.1.4/dist/index.js` |
| `glassheart-ui-vue` | Vue 元件 | `npm install glassheart-ui-vue` | `https://unpkg.com/glassheart-ui-vue@1.1.4/dist/index.js` |
| `glassheart-ui-svelte` | Svelte 元件 | `npm install glassheart-ui-svelte` | `https://unpkg.com/glassheart-ui-svelte@1.1.4/dist/index.js` |
| `glassheart-ui-angular` | Angular 元件 | `npm install glassheart-ui-angular` | - |
| `glassheart-ui` | 原生 JavaScript | `npm install glassheart-ui` | `https://unpkg.com/glassheart-ui@1.1.3/dist/index.js` |

## 🚀 快速開始

### CDN 使用（推薦）

最簡單的方式是通過 CDN 直接引入：

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 引入核心樣式 -->
  <link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@1.1.4/dist/index.css">
  <!-- 引入 JavaScript 組件 -->
  <script src="https://unpkg.com/glassheart-ui@1.1.3/dist/index.js"></script>
</head>
<body>
  <div id="app"></div>
  <script>
    const { GlassCard, GlassButton, GlassInput, GlassTypography } = window.GlassHeartUI;
    
    // 創建組件
    const card = new GlassCard({
      size: 'lg',
      liquid: true,
      interactive: true,
      content: '<h3>Hello GlassHeartUI!</h3><p>Beautiful glass effects</p>'
    });
    
    // 渲染到頁面
    card.render('#app');
  </script>
</body>
</html>
```

> 📖 **詳細 CDN 使用指南**：查看 [CDN_GUIDE.md](./CDN_GUIDE.md) 獲取完整的 CDN 使用說明和範例。
> 
> 🎮 **範例**：查看 [examples/cdn-demo.html](./examples/cdn-demo.html) 體驗完整的 CDN 使用範例。

### React 使用

```jsx
import { GlassCard, GlassButton, GlassInput, GlassTypography } from 'glassheart-ui-react';

function App() {
  return (
    <div>
      <GlassTypography 
        variant="h1" 
        size="3xl" 
        weight="bold" 
        glass="heavy" 
        glow 
        gradient
      >
        Welcome to GlassHeartUI
      </GlassTypography>
      
      <GlassCard liquid interactive>
        <GlassCardHeader>
          <GlassCardTitle>Hello GlassHeartUI</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <GlassInput placeholder="Enter your name" />
          <GlassButton variant="primary" liquid>Submit</GlassButton>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
```

### Vue 使用

```vue
<template>
  <div>
    <GlassTypography 
      variant="h1" 
      size="3xl" 
      weight="bold" 
      glass="heavy" 
      glow 
      gradient
    >
      Welcome to GlassHeartUI
    </GlassTypography>
    
    <GlassCard liquid interactive>
      <GlassCardHeader>
        <GlassCardTitle>Hello GlassHeartUI</GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        <GlassInput placeholder="Enter your name" />
        <GlassButton variant="primary" liquid>Submit</GlassButton>
      </GlassCardContent>
    </GlassCard>
  </div>
</template>

<script setup>
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent, GlassInput, GlassButton, GlassTypography } from 'glassheart-ui-vue';
</script>
```

### Svelte 使用

```svelte
<script>
  import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent, GlassInput, GlassButton, GlassTypography } from 'glassheart-ui-svelte';
</script>

<div>
  <GlassTypography 
    variant="h1" 
    size="3xl" 
    weight="bold" 
    glass="heavy" 
    glow 
    gradient
  >
    Welcome to GlassHeartUI
  </GlassTypography>
  
  <GlassCard liquid interactive>
    <GlassCardHeader>
      <GlassCardTitle>Hello GlassHeartUI</GlassCardTitle>
    </GlassCardHeader>
    <GlassCardContent>
      <GlassInput placeholder="Enter your name" />
      <GlassButton variant="primary" liquid>Submit</GlassButton>
    </GlassCardContent>
  </GlassCard>
</div>
```

### 原生 JavaScript 使用

```javascript
import { GlassCard, GlassButton, GlassInput, GlassTypography, initTheme } from 'glassheart-ui';

// 初始化主題
initTheme();

// 創建毛玻璃文字
const typography = new GlassTypography({
  children: 'Welcome to GlassHeartUI',
  variant: 'h1',
  size: '3xl',
  weight: 'bold',
  glass: 'heavy',
  glow: true,
  gradient: true
});

// 創建元件
const card = new GlassCard({
  size: 'lg',
  variant: 'default',
  liquid: true,
  interactive: true
});
```

### CDN 使用

```html
<link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@1.1.4/dist/index.css">
<script src="https://unpkg.com/glassheart-ui@1.1.3/dist/index.js"></script>

<script>
  const { GlassCard, GlassButton, GlassInput, GlassTypography, initTheme } = window.GlassHeartUI;
  initTheme();
  
  // 創建毛玻璃文字
  const typography = new GlassTypography({
    children: 'Welcome to GlassHeartUI',
    variant: 'h1',
    size: '3xl',
    weight: 'bold',
    glass: 'heavy',
    glow: true,
    gradient: true
  });
</script>
```

### 原生 HTML 使用

```html
<div class="gh-card gh-card-lg gh-glass-medium gh-liquid-flow">
  <div class="gh-card-header">
    <h3 class="gh-card-title">Liquid Glass Card</h3>
  </div>
  <div class="gh-card-content">
    <input class="gh-input gh-input-md gh-glass-medium" placeholder="Enter text...">
    <button class="gh-btn gh-btn-primary gh-btn-md gh-glass-medium">Click me</button>
  </div>
</div>
```

## 🎨 元件

> **💡 向後兼容性**：為了確保現有代碼不會中斷，所有套件都保留了舊的組件名稱作為別名。您可以使用 `Card` 或 `GlassCard`，兩者完全相同。

### GlassCard 卡片

```jsx
<GlassCard size="lg" variant="default" liquid interactive>
  <GlassCardHeader>
    <GlassCardTitle>Card Title</GlassCardTitle>
    <GlassCardDescription>Card description</GlassCardDescription>
  </GlassCardHeader>
  <GlassCardContent>
    <p>Card content goes here</p>
  </GlassCardContent>
  <GlassCardFooter>
    <GlassButton variant="primary">Action</GlassButton>
  </GlassCardFooter>
</GlassCard>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `variant`: 'default' | 'outline' | 'solid'
- `interactive`: boolean
- `liquid`: boolean
- `loading`: boolean

### GlassButton 按鈕

```jsx
<GlassButton 
  variant="primary" 
  size="md" 
  glass="medium" 
  liquid 
  loading={false}
>
  Click me
</GlassButton>
```

**Props:**
- `variant`: 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link'
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `glass`: 'light' | 'medium' | 'heavy'
- `liquid`: boolean
- `loading`: boolean

### GlassInput 輸入框

```jsx
<GlassInput 
  size="md" 
  variant="default" 
  glass="medium" 
  liquid 
  placeholder="Enter text..."
  icon={<SearchIcon />}
/>
```

**Props:**
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `variant`: 'default' | 'outline' | 'solid'
- `glass`: 'light' | 'medium' | 'heavy'
- `liquid`: boolean
- `icon`: ReactNode
- `iconPosition`: 'left' | 'right'

## 🎛️ 主題系統

### 切換主題

```javascript
import { applyTheme, toggleTheme, initTheme } from 'glassheart-ui';

// 初始化主題系統
initTheme({
  theme: 'light',
  glassIntensity: 'medium',
  animationSpeed: 'normal'
});

// 切換主題
toggleTheme();

// 手動設定主題
applyTheme('dark');
```

### CSS 變數自定義

```css
:root {
  --gh-primary: 59 130 246; /* 主色調 */
  --gh-glass-opacity: 0.1; /* 玻璃透明度 */
  --gh-glass-blur: 20px; /* 模糊程度 */
  --gh-animation-duration: 0.3s; /* 動畫速度 */
}
```

## 🎨 Class 使用方式

### 基礎類別

```html
<!-- 玻璃效果 -->
<div class="gh-glass gh-glass-light">Light glass</div>
<div class="gh-glass gh-glass-medium">Medium glass</div>
<div class="gh-glass gh-glass-heavy">Heavy glass</div>

<!-- 液態流動效果 -->
<div class="gh-liquid-flow">Liquid animation</div>

<!-- 動畫效果 -->
<div class="gh-animate-in">Fade in</div>
<div class="gh-animate-slide-up">Slide up</div>
<div class="gh-animate-scale">Scale animation</div>
```

### 元件類別

```html
<!-- 毛玻璃文字 -->
<div class="gh-typography gh-typography-h1 gh-typography-2xl gh-glass-medium gh-glow">
  Glass Typography
</div>

<!-- 毛玻璃文字 - 完整示例 -->
<div class="gh-typography gh-typography-h1 gh-typography-3xl gh-typography-bold gh-glass-heavy gh-glow gh-gradient">
  Welcome to GlassHeartUI
</div>

<!-- 卡片 -->
<div class="gh-card gh-card-lg gh-glass-medium gh-liquid-flow">
  <div class="gh-card-header">
    <h3 class="gh-card-title">Title</h3>
  </div>
  <div class="gh-card-content">Content</div>
</div>

<!-- 按鈕 -->
<button class="gh-btn gh-btn-primary gh-btn-md gh-glass-medium">
  Button
</button>

<!-- 輸入框 -->
<input class="gh-input gh-input-md gh-glass-medium" placeholder="Input">
```

## 🔧 自定義參數

### 透明度調整
```css
.gh-glass-custom {
  --gh-glass-opacity: 0.15;
}
```

### 模糊程度調整
```css
.gh-glass-custom {
  --gh-glass-blur: 25px;
}
```

### 動畫速度調整
```css
.gh-glass-custom {
  --gh-animation-duration: 0.5s;
}
```

### 顏色自定義
```css
.gh-glass-custom {
  --gh-primary: 139 92 246; /* 紫色 */
  --gh-accent: 236 72 153; /* 粉色 */
}
```

## 📱 響應式設計

```html
<div class="gh-card gh-card-sm md:gh-card-md lg:gh-card-lg">
  Responsive card
</div>
```

## ♿ 無障礙支援

- 支援 `prefers-reduced-motion` 媒體查詢
- 完整的鍵盤導航支援
- ARIA 屬性完整實作
- 高對比度模式支援

## 🌐 瀏覽器支援

- Chrome 88+
- Firefox 87+
- Safari 14+
- Edge 88+

**不支援 IE**

## 📚 文檔

完整的元件文檔和範例請查看 [Storybook](http://localhost:8080)

### 本地運行 Storybook

```bash
# 克隆項目
git clone https://github.com/your-username/glassheart-ui.git
cd glassheart-ui

# 安裝依賴
npm install

# 啟動 Storybook
npm run storybook
```

### 構建靜態 Storybook

```bash
# 構建靜態文件
npm run build-storybook

# 靜態文件將生成在 storybook-static/ 目錄
```

## 📝 GlassTypography 組件

GlassTypography 是我們最新的組件，使用 HTML5 Canvas 渲染高級毛玻璃文字效果。

### 特色功能

- **🎨 多層毛玻璃渲染** - 4 層渲染創造深度效果
- **🌈 複雜漸變效果** - 6 個漸變停止點模擬真實玻璃
- **✨ 多層陰影深度** - 創造立體感和浮起效果
- **🔧 高級圖像處理** - 亮度、對比度、飽和度調整
- **🎬 動畫支持** - 液體流動、發光脈衝效果
- **📱 響應式設計** - 自動適配各種螢幕尺寸

### 基本用法

```jsx
// React
<GlassTypography
  variant="h1"
  size="3xl"
  weight="bold"
  glass="heavy"
  glow
  gradient
  liquid
  animated
>
  Beautiful Glass Text
</GlassTypography>
```

```vue
<!-- Vue -->
<GlassTypography
  variant="h1"
  size="3xl"
  weight="bold"
  glass="heavy"
  glow
  gradient
>
  Beautiful Glass Text
</GlassTypography>
```

### 屬性說明

| 屬性 | 類型 | 預設值 | 描述 |
|------|------|--------|------|
| `children` | `string` | - | 要顯示的文字內容 |
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'p' \| 'span' \| 'div'` | `'p'` | 文字變體 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl' \| '6xl'` | `'md'` | 文字尺寸 |
| `weight` | `'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold' \| 'extrabold' \| 'black'` | `'normal'` | 字重 |
| `glass` | `'light' \| 'medium' \| 'heavy'` | `'medium'` | 玻璃效果強度 |
| `liquid` | `boolean` | `false` | 是否啟用液體流動效果 |
| `gradient` | `boolean` | `false` | 是否啟用漸變效果 |
| `animated` | `boolean` | `false` | 是否啟用動畫效果 |
| `glow` | `boolean` | `false` | 是否啟用發光效果 |
| `glowColor` | `string` | `'#ffffff'` | 發光顏色 |
| `glowIntensity` | `number` | `0.8` | 發光強度 (0-2) |

### 特效範例

```jsx
// 發光效果
<GlassTypography glow glowColor="#00ff88" glowIntensity={1.2}>
  Glowing Text
</GlassTypography>

// 液體流動效果
<GlassTypography liquid animated>
  Liquid Flow Text
</GlassTypography>

// 漸變效果
<GlassTypography gradient glass="heavy">
  Gradient Glass Text
</GlassTypography>

// 組合效果
<GlassTypography
  variant="h1"
  size="4xl"
  weight="bold"
  glass="heavy"
  glow
  gradient
  liquid
  animated
  glowColor="#ff6b6b"
  glowIntensity={1.5}
>
  Ultimate Glass Text
</GlassTypography>
```

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

