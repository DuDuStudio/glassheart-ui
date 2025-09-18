# glassheart-ui-react

React 版本的 GlassHeartUI 元件庫。

## 安裝

```bash
npm install glassheart-ui-react
```

## 使用

### 基本使用

```jsx
import { GlassCard, GlassButton, GlassInput, GlassTypography } from 'glassheart-ui-react';

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

### CDN 使用

```html
<script src="https://unpkg.com/glassheart-ui-react@1.1.0/dist/index.js"></script>
<script>
  const { GlassCard, GlassButton, GlassInput } = window.GlassHeartUIReact;
</script>
```

## 元件

### GlassTypography
使用 Canvas 渲染的毛玻璃文字效果組件。

#### 基本用法
```jsx
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

### GlassCard 系列
- `GlassCard` - 主卡片元件
- `GlassCardHeader` - 卡片標題區
- `GlassCardTitle` - 卡片標題
- `GlassCardDescription` - 卡片描述
- `GlassCardContent` - 卡片內容
- `GlassCardFooter` - 卡片底部

### GlassButton 系列
- `GlassButton` - 按鈕元件
- `GlassButtonGroup` - 按鈕群組

### GlassInput 系列
- `GlassInput` - 輸入框
- `GlassTextarea` - 文字區域
- `GlassInputGroup` - 輸入框群組
- `GlassFloatingLabel` - 浮動標籤

## 向後兼容性

為了向後兼容，舊的組件名稱仍然可用：

```jsx
import { Card, Button, Input } from 'glassheart-ui-react';
// 等同於
import { GlassCard, GlassButton, GlassInput } from 'glassheart-ui-react';
```

## 授權

MIT License
