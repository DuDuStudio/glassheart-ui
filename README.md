# GlassHeartUI

一個現代化的 UI 元件庫，專注於實現 Apple Liquid Glass 效果。

## ✨ 特色

- **🌊 Liquid Glass 效果** - 包含流動動畫的複雜玻璃效果
- **🎨 高度可自定義** - 支援透明度、模糊程度、動畫速度、顏色調整
- **⚡ 性能優化** - 針對現代瀏覽器優化，支援 GPU 加速
- **🌙 主題系統** - 完整的淺色/深色主題支援
- **📱 響應式設計** - 適配各種螢幕尺寸
- **♿ 無障礙支援** - 支援 reduced-motion 和鍵盤導航
- **🔧 多框架支援** - 原生 JS、React、Vue、Svelte

## 📦 套件

GlassHeartUI 提供多個框架的獨立套件：

| 套件 | 描述 | 安裝 |
|------|------|------|
| `glassheart-ui-core` | 核心 CSS 樣式 | `npm install glassheart-ui-core` |
| `glassheart-ui-react` | React 元件 | `npm install glassheart-ui-react` |
| `glassheart-ui-vue` | Vue 元件 | `npm install glassheart-ui-vue` |
| `glassheart-ui-svelte` | Svelte 元件 | `npm install glassheart-ui-svelte` |
| `glassheart-ui` | 原生 JavaScript | `npm install glassheart-ui` |

## 🚀 快速開始

### React 使用

```jsx
import { GlassCard, GlassButton, GlassInput } from 'glassheart-ui-react';

function App() {
  return (
    <GlassCard liquid interactive>
      <GlassCardHeader>
        <GlassCardTitle>Hello GlassHeartUI</GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        <GlassInput placeholder="Enter your name" />
        <GlassButton variant="primary" liquid>Submit</GlassButton>
      </GlassCardContent>
    </GlassCard>
  );
}
```

### Vue 使用

```vue
<template>
  <GlassCard liquid interactive>
    <GlassCardHeader>
      <GlassCardTitle>Hello GlassHeartUI</GlassCardTitle>
    </GlassCardHeader>
    <GlassCardContent>
      <GlassInput placeholder="Enter your name" />
      <GlassButton variant="primary" liquid>Submit</GlassButton>
    </GlassCardContent>
  </GlassCard>
</template>

<script setup>
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent, GlassInput, GlassButton } from 'glassheart-ui-vue';
</script>
```

### Svelte 使用

```svelte
<script>
  import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent, GlassInput, GlassButton } from 'glassheart-ui-svelte';
</script>

<GlassCard liquid interactive>
  <GlassCardHeader>
    <GlassCardTitle>Hello GlassHeartUI</GlassCardTitle>
  </GlassCardHeader>
  <GlassCardContent>
    <GlassInput placeholder="Enter your name" />
    <GlassButton variant="primary" liquid>Submit</GlassButton>
  </GlassCardContent>
</GlassCard>
```

### 原生 JavaScript 使用

```javascript
import { GlassCard, GlassButton, GlassInput, initTheme } from 'glassheart-ui';

// 初始化主題
initTheme();

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
<link rel="stylesheet" href="https://unpkg.com/glassheart-ui/dist/index.css">
<script src="https://unpkg.com/glassheart-ui/dist/index.js"></script>

<script>
  const { GlassCard, GlassButton, GlassInput, initTheme } = window.GlassHeartUI;
  initTheme();
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

### Card 卡片

```jsx
<Card size="lg" variant="default" liquid interactive>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `variant`: 'default' | 'outline' | 'solid'
- `interactive`: boolean
- `liquid`: boolean
- `loading`: boolean

### Button 按鈕

```jsx
<Button 
  variant="primary" 
  size="md" 
  glass="medium" 
  liquid 
  loading={false}
>
  Click me
</Button>
```

**Props:**
- `variant`: 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link'
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `glass`: 'light' | 'medium' | 'heavy'
- `liquid`: boolean
- `loading`: boolean

### Input 輸入框

```jsx
<Input 
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
import { applyTheme, toggleTheme, initTheme } from '@glassheart/ui';

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

完整的元件文檔和範例請查看 [Storybook](https://glassheart-ui.storybook.app)

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

