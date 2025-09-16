# glassheart-ui

原生 JavaScript 版本的 GlassHeartUI 元件庫。

## 安裝

```bash
npm install glassheart-ui
```

## 使用

### ES 模組

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

const button = new GlassButton({
  variant: 'primary',
  size: 'md',
  liquid: true
});
```

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css">
<script src="https://unpkg.com/glassheart-ui@1.1.0/dist/index.js"></script>

<script>
  // 使用全域變數
  const { GlassCard, GlassButton, GlassInput, initTheme } = window.GlassHeartUI;
  
  initTheme();
</script>
```

## 元件類別

### GlassCard
- `GlassCard` - 卡片元件類別

### GlassButton
- `GlassButton` - 按鈕元件類別

### GlassInput
- `GlassInput` - 輸入框元件類別

## 向後兼容性

為了向後兼容，舊的組件名稱仍然可用：

```javascript
import { Card, Button, Input } from 'glassheart-ui';
// 等同於
import { GlassCard, GlassButton, GlassInput } from 'glassheart-ui';
```

## 工具函數

- `initTheme()` - 初始化主題系統
- `applyTheme(theme)` - 應用主題
- `toggleTheme()` - 切換主題
- `setGlassIntensity(intensity)` - 設定玻璃強度

## 授權

MIT License
