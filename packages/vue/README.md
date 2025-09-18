# glassheart-ui-vue

Vue 版本的 GlassHeartUI 元件庫，提供美觀的玻璃擬態設計組件。

## 📋 目錄

- [安裝](#安裝)
- [快速開始](#快速開始)
- [組件文檔](#組件文檔)
  - [GlassTypography](#glasstypography)
  - [GlassButton](#glassbutton)
  - [GlassCard](#glasscard)
  - [GlassInput](#glassinput)
- [向後兼容性](#向後兼容性)
- [授權](#授權)

## 安裝

```bash
npm install glassheart-ui-vue
```

## 快速開始

### 基本使用

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

### CDN 使用

```html
<script src="https://unpkg.com/glassheart-ui-vue@1.1.2/dist/index.js"></script>
<script>
  const { GlassCard, GlassButton, GlassInput } = window.GlassHeartUIVue;
</script>
```

## 組件文檔

### GlassTypography
使用 Canvas 渲染的毛玻璃文字效果組件。

#### 基本用法
```vue
<template>
  <GlassTypography
    variant="h1"
    size="2xl"
    weight="bold"
    glass="medium"
    glow
    gradient
  >
    Hello GlassHeartUI
  </GlassTypography>
</template>

<script setup>
import { GlassTypography } from 'glassheart-ui-vue';
</script>
```

#### 屬性
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

### GlassButton

按鈕組件，支援多種變體和尺寸。

#### Props

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | 按鈕變體 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 按鈕尺寸 |
| `glass` | `'light' \| 'medium' \| 'heavy'` | `'medium'` | 玻璃效果強度 |
| `liquid` | `boolean` | `false` | 是否啟用液體流動效果 |
| `loading` | `boolean` | `false` | 是否顯示載入狀態 |
| `disabled` | `boolean` | `false` | 是否禁用按鈕 |
| `className` | `string` | `''` | 自定義 CSS 類名 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `click` | `MouseEvent` | 點擊事件 |
| `focus` | `FocusEvent` | 獲得焦點事件 |
| `blur` | `FocusEvent` | 失去焦點事件 |
| `mouseenter` | `MouseEvent` | 滑鼠進入事件 |
| `mouseleave` | `MouseEvent` | 滑鼠離開事件 |

#### 使用範例

```vue
<template>
  <div class="button-examples">
    <!-- 基本按鈕 -->
    <GlassButton>Default Button</GlassButton>
    
    <!-- 主要按鈕 -->
    <GlassButton variant="primary" size="lg">
      Primary Button
    </GlassButton>
    
    <!-- 液體效果按鈕 -->
    <GlassButton variant="accent" liquid>
      Liquid Button
    </GlassButton>
    
    <!-- 載入狀態按鈕 -->
    <GlassButton variant="primary" loading>
      Loading...
    </GlassButton>
    
    <!-- 不同玻璃效果 -->
    <GlassButton glass="light">Light Glass</GlassButton>
    <GlassButton glass="medium">Medium Glass</GlassButton>
    <GlassButton glass="heavy">Heavy Glass</GlassButton>
  </div>
</template>
```

### GlassCard

卡片組件，支援多種變體和交互效果。

#### Props

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 卡片尺寸 |
| `variant` | `'default' \| 'outline' \| 'solid'` | `'default'` | 卡片變體 |
| `glass` | `'light' \| 'medium' \| 'heavy'` | `'medium'` | 玻璃效果強度 |
| `liquid` | `boolean` | `false` | 是否啟用液體流動效果 |
| `interactive` | `boolean` | `false` | 是否啟用交互效果 |
| `loading` | `boolean` | `false` | 是否顯示載入狀態 |
| `className` | `string` | `''` | 自定義 CSS 類名 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `click` | `MouseEvent` | 點擊事件 |
| `mouseenter` | `MouseEvent` | 滑鼠進入事件 |
| `mouseleave` | `MouseEvent` | 滑鼠離開事件 |

#### 使用範例

```vue
<template>
  <div class="card-examples">
    <!-- 基本卡片 -->
    <GlassCard>
      <h3>Basic Card</h3>
      <p>This is a basic glass card.</p>
    </GlassCard>
    
    <!-- 交互式卡片 -->
    <GlassCard interactive @click="handleCardClick">
      <h3>Interactive Card</h3>
      <p>Click me!</p>
    </GlassCard>
    
    <!-- 液體效果卡片 -->
    <GlassCard liquid glass="heavy">
      <h3>Liquid Card</h3>
      <p>This card has liquid flow effects.</p>
    </GlassCard>
    
    <!-- 不同尺寸 -->
    <GlassCard size="sm">Small Card</GlassCard>
    <GlassCard size="lg">Large Card</GlassCard>
  </div>
</template>
```

### GlassInput

輸入框組件，支援多種變體和狀態。

#### Props

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `modelValue` | `string \| number` | `''` | 輸入值（v-model） |
| `type` | `string` | `'text'` | 輸入類型 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 輸入框尺寸 |
| `variant` | `'default' \| 'outline' \| 'solid'` | `'default'` | 輸入框變體 |
| `glass` | `'light' \| 'medium' \| 'heavy'` | `'medium'` | 玻璃效果強度 |
| `liquid` | `boolean` | `false` | 是否啟用液體流動效果 |
| `error` | `boolean` | `false` | 是否顯示錯誤狀態 |
| `disabled` | `boolean` | `false` | 是否禁用輸入框 |
| `placeholder` | `string` | `''` | 佔位符文字 |
| `label` | `string` | `''` | 標籤文字 |
| `help` | `string` | `''` | 幫助文字 |
| `icon` | `string \| object` | `null` | 圖標 |
| `iconPosition` | `'left' \| 'right'` | `'left'` | 圖標位置 |
| `button` | `string \| object` | `null` | 按鈕 |
| `className` | `string` | `''` | 自定義 CSS 類名 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `update:modelValue` | `string` | 值更新事件（v-model） |
| `change` | `string` | 值變更事件 |
| `focus` | `FocusEvent` | 獲得焦點事件 |
| `blur` | `FocusEvent` | 失去焦點事件 |

#### 使用範例

```vue
<template>
  <div class="input-examples">
    <!-- 基本輸入框 -->
    <GlassInput 
      v-model="inputValue" 
      placeholder="Enter your name" 
    />
    
    <!-- 帶標籤的輸入框 -->
    <GlassInput 
      v-model="email" 
      type="email"
      label="Email Address"
      placeholder="Enter your email"
    />
    
    <!-- 錯誤狀態輸入框 -->
    <GlassInput 
      v-model="password" 
      type="password"
      label="Password"
      :error="true"
      help="Password must be at least 8 characters"
    />
    
    <!-- 液體效果輸入框 -->
    <GlassInput 
      v-model="search" 
      placeholder="Search..."
      liquid
      glass="heavy"
    />
    
    <!-- 不同尺寸 -->
    <GlassInput size="sm" placeholder="Small input" />
    <GlassInput size="lg" placeholder="Large input" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');
const email = ref('');
const password = ref('');
const search = ref('');
</script>
```

## 向後兼容性

為了向後兼容，舊的組件名稱仍然可用：

```vue
<script setup>
import { Card, Button, Input } from 'glassheart-ui-vue';
// 等同於
import { GlassCard, GlassButton, GlassInput } from 'glassheart-ui-vue';
</script>
```

## 授權

MIT License