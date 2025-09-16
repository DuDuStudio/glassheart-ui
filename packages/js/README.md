# glassheart/ui

原生 JavaScript 版本的 GlassHeartUI 元件庫。

## 安裝

```bash
npm install glassheart/ui
```

## 使用

### ES 模組

```javascript
import { Card, Button, Input, initTheme } from 'glassheart/ui';

// 初始化主題
initTheme();

// 創建元件
const card = new Card({
  size: 'lg',
  variant: 'default',
  liquid: true,
  interactive: true
});

const button = new Button({
  variant: 'primary',
  size: 'md',
  liquid: true
});
```

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/glassheart/ui/dist/index.css">
<script src="https://unpkg.com/glassheart/ui/dist/index.js"></script>

<script>
  // 使用全域變數
  const { Card, Button, Input, initTheme } = window.GlassHeartUI;
  
  initTheme();
</script>
```

## 元件類別

### Card
- `Card` - 卡片元件類別

### Button
- `Button` - 按鈕元件類別

### Input
- `Input` - 輸入框元件類別

## 工具函數

- `initTheme()` - 初始化主題系統
- `applyTheme(theme)` - 應用主題
- `toggleTheme()` - 切換主題
- `setGlassIntensity(intensity)` - 設定玻璃強度

## 授權

MIT License
