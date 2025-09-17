# glassheart-ui-vanilla

Vanilla JavaScript 版本的 GlassHeartUI 元件庫，提供美觀的玻璃擬態設計組件。

## 📋 目錄

- [安裝](#安裝)
- [快速開始](#快速開始)
- [組件文檔](#組件文檔)
  - [GlassButton](#glassbutton)
  - [GlassCard](#glasscard)
  - [GlassInput](#glassinput)
- [API 參考](#api-參考)
- [授權](#授權)

## 安裝

```bash
npm install glassheart-ui-vanilla
```

## 快速開始

### 基本使用

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/glassheart-ui-core/dist/index.css">
</head>
<body>
  <div id="app"></div>
  
  <script type="module">
    import { GlassCard, GlassButton, GlassInput } from 'glassheart-ui-vanilla';
    
    // 創建卡片
    const card = new GlassCard({
      size: 'lg',
      glass: 'medium',
      liquid: true,
      interactive: true,
      content: `
        <h3>Hello GlassHeartUI</h3>
        <p>This is a beautiful glass card!</p>
      `
    });
    
    // 創建輸入框
    const input = new GlassInput({
      placeholder: 'Enter your name',
      size: 'md',
      glass: 'medium'
    });
    
    // 創建按鈕
    const button = new GlassButton({
      text: 'Submit',
      variant: 'primary',
      size: 'md',
      liquid: true,
      onClick: (event) => {
        console.log('Button clicked!', input.getValue());
      }
    });
    
    // 渲染到頁面
    const app = document.getElementById('app');
    card.render(app);
    input.render(app);
    button.render(app);
  </script>
</body>
</html>
```

### CDN 使用

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@1.1.2/dist/index.css">
</head>
<body>
  <div id="app"></div>
  
  <script src="https://unpkg.com/glassheart-ui-vanilla@1.1.2/dist/index.js"></script>
  <script>
    const { GlassCard, GlassButton, GlassInput } = window.GlassHeartUIVanilla;
    
    // 使用組件...
  </script>
</body>
</html>
```

## 組件文檔

### GlassButton

按鈕組件，支援多種變體和尺寸。

#### 構造函數

```javascript
new GlassButton(options)
```

#### 選項 (options)

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | 按鈕變體 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 按鈕尺寸 |
| `glass` | `'light' \| 'medium' \| 'heavy'` | `'medium'` | 玻璃效果強度 |
| `liquid` | `boolean` | `false` | 是否啟用液體流動效果 |
| `loading` | `boolean` | `false` | 是否顯示載入狀態 |
| `disabled` | `boolean` | `false` | 是否禁用按鈕 |
| `text` | `string` | `'Button'` | 按鈕文字 |
| `onClick` | `function` | `undefined` | 點擊事件處理函數 |

#### 方法

| 方法名 | 參數 | 返回值 | 說明 |
|--------|------|--------|------|
| `render(container)` | `HTMLElement \| string` | `void` | 渲染按鈕到指定容器 |
| `destroy()` | - | `void` | 銷毀按鈕並從 DOM 中移除 |
| `getElement()` | - | `HTMLButtonElement` | 獲取按鈕 DOM 元素 |
| `setText(text)` | `string` | `void` | 設置按鈕文字 |
| `setDisabled(disabled)` | `boolean` | `void` | 設置按鈕禁用狀態 |

#### 使用範例

```javascript
import { GlassButton } from 'glassheart-ui-vanilla';

// 基本按鈕
const basicButton = new GlassButton({
  text: 'Click Me'
});

// 主要按鈕
const primaryButton = new GlassButton({
  variant: 'primary',
  size: 'lg',
  text: 'Primary Button'
});

// 液體效果按鈕
const liquidButton = new GlassButton({
  variant: 'accent',
  liquid: true,
  text: 'Liquid Button'
});

// 載入狀態按鈕
const loadingButton = new GlassButton({
  variant: 'primary',
  loading: true,
  text: 'Loading...'
});

// 事件處理
const interactiveButton = new GlassButton({
  text: 'Interactive Button',
  onClick: (event) => {
    console.log('Button clicked!', event);
  }
});

// 渲染到頁面
document.getElementById('app').appendChild(basicButton.getElement());
primaryButton.render('#app');
liquidButton.render('#app');
loadingButton.render('#app');
interactiveButton.render('#app');
```

### GlassCard

卡片組件，支援多種變體和交互效果。

#### 構造函數

```javascript
new GlassCard(options)
```

#### 選項 (options)

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 卡片尺寸 |
| `variant` | `'default' \| 'outline' \| 'solid'` | `'default'` | 卡片變體 |
| `glass` | `'light' \| 'medium' \| 'heavy'` | `'medium'` | 玻璃效果強度 |
| `liquid` | `boolean` | `false` | 是否啟用液體流動效果 |
| `interactive` | `boolean` | `false` | 是否啟用交互效果 |
| `loading` | `boolean` | `false` | 是否顯示載入狀態 |
| `content` | `string` | `''` | 卡片內容 HTML |

#### 方法

| 方法名 | 參數 | 返回值 | 說明 |
|--------|------|--------|------|
| `render(container)` | `HTMLElement \| string` | `void` | 渲染卡片到指定容器 |
| `destroy()` | - | `void` | 銷毀卡片並從 DOM 中移除 |
| `getElement()` | - | `HTMLElement` | 獲取卡片 DOM 元素 |

#### 使用範例

```javascript
import { GlassCard } from 'glassheart-ui-vanilla';

// 基本卡片
const basicCard = new GlassCard({
  content: '<h3>Basic Card</h3><p>This is a basic glass card.</p>'
});

// 交互式卡片
const interactiveCard = new GlassCard({
  interactive: true,
  content: '<h3>Interactive Card</h3><p>Click me!</p>'
});

// 液體效果卡片
const liquidCard = new GlassCard({
  liquid: true,
  glass: 'heavy',
  content: '<h3>Liquid Card</h3><p>This card has liquid flow effects.</p>'
});

// 不同尺寸
const smallCard = new GlassCard({
  size: 'sm',
  content: 'Small Card'
});

const largeCard = new GlassCard({
  size: 'lg',
  content: 'Large Card'
});

// 渲染到頁面
basicCard.render('#app');
interactiveCard.render('#app');
liquidCard.render('#app');
smallCard.render('#app');
largeCard.render('#app');
```

### GlassInput

輸入框組件，支援多種變體和狀態。

#### 構造函數

```javascript
new GlassInput(options)
```

#### 選項 (options)

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `type` | `'text' \| 'email' \| 'password' \| 'number'` | `'text'` | 輸入類型 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 輸入框尺寸 |
| `variant` | `'default' \| 'outline' \| 'solid'` | `'default'` | 輸入框變體 |
| `glass` | `'light' \| 'medium' \| 'heavy'` | `'medium'` | 玻璃效果強度 |
| `liquid` | `boolean` | `false` | 是否啟用液體流動效果 |
| `error` | `boolean` | `false` | 是否顯示錯誤狀態 |
| `disabled` | `boolean` | `false` | 是否禁用輸入框 |
| `placeholder` | `string` | `''` | 佔位符文字 |
| `value` | `string` | `''` | 輸入值 |
| `onChange` | `function` | `undefined` | 值變更事件處理函數 |
| `onFocus` | `function` | `undefined` | 獲得焦點事件處理函數 |
| `onBlur` | `function` | `undefined` | 失去焦點事件處理函數 |

#### 方法

| 方法名 | 參數 | 返回值 | 說明 |
|--------|------|--------|------|
| `render(container)` | `HTMLElement \| string` | `void` | 渲染輸入框到指定容器 |
| `destroy()` | - | `void` | 銷毀輸入框並從 DOM 中移除 |
| `getElement()` | - | `HTMLInputElement` | 獲取輸入框 DOM 元素 |
| `getValue()` | - | `string` | 獲取輸入值 |
| `setValue(value)` | `string` | `void` | 設置輸入值 |
| `setDisabled(disabled)` | `boolean` | `void` | 設置輸入框禁用狀態 |

#### 使用範例

```javascript
import { GlassInput } from 'glassheart-ui-vanilla';

// 基本輸入框
const basicInput = new GlassInput({
  placeholder: 'Enter your name'
});

// 帶標籤的輸入框
const emailInput = new GlassInput({
  type: 'email',
  placeholder: 'Enter your email',
  size: 'md'
});

// 錯誤狀態輸入框
const errorInput = new GlassInput({
  type: 'password',
  placeholder: 'Enter password',
  error: true
});

// 液體效果輸入框
const liquidInput = new GlassInput({
  placeholder: 'Search...',
  liquid: true,
  glass: 'heavy'
});

// 事件處理
const interactiveInput = new GlassInput({
  placeholder: 'Type something...',
  onChange: (event) => {
    console.log('Input changed:', event.target.value);
  },
  onFocus: (event) => {
    console.log('Input focused');
  },
  onBlur: (event) => {
    console.log('Input blurred');
  }
});

// 渲染到頁面
basicInput.render('#app');
emailInput.render('#app');
errorInput.render('#app');
liquidInput.render('#app');
interactiveInput.render('#app');

// 獲取和設置值
console.log('Current value:', interactiveInput.getValue());
interactiveInput.setValue('New value');
```

## API 參考

### 通用方法

所有組件都支援以下通用方法：

- `render(container)` - 渲染組件到指定容器
- `destroy()` - 銷毀組件並從 DOM 中移除
- `getElement()` - 獲取組件的 DOM 元素

### 事件處理

組件支援通過選項傳入事件處理函數：

```javascript
const button = new GlassButton({
  onClick: (event) => {
    console.log('Button clicked!', event);
  }
});

const input = new GlassInput({
  onChange: (event) => {
    console.log('Input changed:', event.target.value);
  }
});
```

### 樣式自定義

所有組件都使用 CSS 變量，您可以自定義樣式：

```css
:root {
  --gh-glass-opacity: 0.2;
  --gh-glass-blur: 20px;
  --gh-glass-saturate: 180%;
  --gh-glass-brightness: 1.2;
  --gh-glass-contrast: 1.1;
}
```

## 授權

MIT License
