# glassheart-ui-svelte

Svelte 版本的 GlassHeartUI 元件庫。

## 安裝

```bash
npm install glassheart-ui-svelte
```

## 使用

### 基本使用

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

### CDN 使用

```html
<script src="https://unpkg.com/glassheart-ui-svelte@1.1.0/dist/index.js"></script>
<script>
  const { GlassCard, GlassButton, GlassInput } = window.GlassHeartUISvelte;
</script>
```

## 元件

### GlassCard 系列
- `GlassCard` - 主卡片元件
- `GlassCardHeader` - 卡片標題區
- `GlassCardTitle` - 卡片標題
- `GlassCardDescription` - 卡片描述
- `GlassCardContent` - 卡片內容
- `GlassCardFooter` - 卡片底部

### GlassButton 系列
- `GlassButton` - 按鈕元件
- `ButtonGroup` - 按鈕群組

### GlassInput 系列
- `GlassInput` - 輸入框
- `Textarea` - 文字區域
- `InputGroup` - 輸入框群組
- `FloatingLabel` - 浮動標籤

## 向後兼容性

為了向後兼容，舊的組件名稱仍然可用：

```svelte
<script>
  import { Card, Button, Input } from 'glassheart-ui-svelte';
  // 等同於
  import { GlassCard, GlassButton, GlassInput } from 'glassheart-ui-svelte';
</script>
```

## 授權

MIT License
