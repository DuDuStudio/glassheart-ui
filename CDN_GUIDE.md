# GlassHeartUI CDN 使用指南

GlassHeartUI 已發布到 unpkg CDN，您可以直接通過 URL 引入使用，無需安裝。

## 🌐 CDN 鏈接

### 核心樣式
```html
<link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css">
```

### JavaScript 組件
```html
<script src="https://unpkg.com/glassheart-ui@1.1.0/dist/index.js"></script>
```

### React 組件
```html
<script src="https://unpkg.com/glassheart-ui-react@1.1.0/dist/index.js"></script>
```

### Vue 組件
```html
<script src="https://unpkg.com/glassheart-ui-vue@1.1.0/dist/index.js"></script>
```

### Svelte 組件
```html
<script src="https://unpkg.com/glassheart-ui-svelte@1.1.0/dist/index.js"></script>
```

## 🚀 快速開始

### 原生 JavaScript 使用

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GlassHeartUI Demo</title>
    <!-- 引入核心樣式 -->
    <link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css">
    <!-- 引入 JavaScript 組件 -->
    <script src="https://unpkg.com/glassheart-ui@1.1.0/dist/index.js"></script>
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
    </style>
</head>
<body>
    <div id="app"></div>

    <script>
        const { GlassCard, GlassButton, GlassInput, initTheme } = window.GlassHeartUI;
        
        // 初始化主題
        initTheme();
        
        // 創建卡片
        const card = new GlassCard({
            size: 'lg',
            liquid: true,
            interactive: true,
            content: `
                <div style="padding: 20px;">
                    <h2 style="margin: 0 0 16px 0; color: white;">Hello GlassHeartUI!</h2>
                    <p style="margin: 0 0 20px 0; color: rgba(255,255,255,0.8);">這是一個美麗的玻璃效果卡片</p>
                    <div style="display: flex; gap: 10px;">
                        <button class="gh-btn gh-btn-primary gh-liquid-flow" style="padding: 8px 16px; border: none; border-radius: 6px; background: rgba(255,255,255,0.2); color: white; cursor: pointer;">按鈕 1</button>
                        <button class="gh-btn gh-btn-secondary gh-liquid-flow" style="padding: 8px 16px; border: none; border-radius: 6px; background: rgba(255,255,255,0.1); color: white; cursor: pointer;">按鈕 2</button>
                    </div>
                </div>
            `
        });
        
        // 渲染到頁面
        card.render('#app');
    </script>
</body>
</html>
```

### React 使用

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GlassHeartUI React Demo</title>
    <link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css">
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/glassheart-ui-react@1.1.0/dist/index.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent, GlassButton, GlassInput } = window.GlassHeartUIReact;

        function App() {
            return React.createElement(GlassCard, { liquid: true, interactive: true, size: 'lg' },
                React.createElement(GlassCardHeader, null,
                    React.createElement(GlassCardTitle, null, "Hello GlassHeartUI!")
                ),
                React.createElement(GlassCardContent, null,
                    React.createElement(GlassInput, { placeholder: "輸入您的姓名" }),
                    React.createElement(GlassButton, { variant: "primary", liquid: true }, "提交")
                )
            );
        }

        ReactDOM.render(React.createElement(App), document.getElementById('root'));
    </script>
</body>
</html>
```

## 📦 版本管理

### 使用特定版本
```html
<!-- 使用特定版本 -->
<link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css">
<script src="https://unpkg.com/glassheart-ui@1.1.0/dist/index.js"></script>
```

### 使用最新版本
```html
<!-- 使用最新版本（不推薦生產環境） -->
<link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core/dist/index.css">
<script src="https://unpkg.com/glassheart-ui/dist/index.js"></script>
```

### 使用語義版本範圍
```html
<!-- 使用語義版本範圍 -->
<link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@^1.0.0/dist/index.css">
<script src="https://unpkg.com/glassheart-ui@^1.0.0/dist/index.js"></script>
```

## 🔧 自定義配置

### 自定義 CSS 變數
```html
<style>
    :root {
        --gh-glass-opacity: 0.3;
        --gh-glass-blur: 15px;
        --gh-animation-duration: 0.5s;
        --gh-primary: 59 130 246;
    }
</style>
```

### 主題切換
```javascript
// 切換到深色主題
document.documentElement.classList.add('dark');

// 切換到淺色主題
document.documentElement.classList.remove('dark');
```

## 🌍 國際化支援

所有 CDN 鏈接都支援全球 CDN 節點，確保快速載入：

- **unpkg.com** - 主要 CDN
- **cdn.jsdelivr.net** - 備用 CDN
- **unpkg.com** - 全球分發

## 📱 響應式設計

GlassHeartUI 的 CDN 版本完全支援響應式設計：

```css
/* 移動端優化 */
@media (max-width: 768px) {
    .gh-card {
        margin: 10px;
        border-radius: 12px;
    }
}
```

## ⚡ 性能優化

### 預載入
```html
<link rel="preload" href="https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css" as="style">
<link rel="preload" href="https://unpkg.com/glassheart-ui@1.1.0/dist/index.js" as="script">
```

### 異步載入
```html
<script>
    // 異步載入組件
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/glassheart-ui@1.1.0/dist/index.js';
    script.async = true;
    script.onload = function() {
        const { GlassCard } = window.GlassHeartUI;
        // 使用組件
    };
    document.head.appendChild(script);
</script>
```

## 🛠️ 開發工具

### 調試模式
```html
<script>
    // 啟用調試模式
    window.GlassHeartUIDebug = true;
</script>
```

### 版本檢查
```javascript
// 檢查載入的版本
console.log(window.GlassHeartUI.version);
```

## 📄 授權

GlassHeartUI 使用 MIT 授權，您可以自由使用於商業和個人專案中。

## 🤝 支援

如果您在使用 CDN 版本時遇到問題，請：

1. 檢查網路連接
2. 確認版本號正確
3. 查看瀏覽器控制台錯誤
4. 參考 [GitHub Issues](https://github.com/DuDuStudio/glassheart-ui/issues)

GlassHeartUI 已發布到 unpkg CDN，您可以直接通過 URL 引入使用，無需安裝。

## 🌐 CDN 鏈接

### 核心樣式
```html
<link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css">
```

### JavaScript 組件
```html
<script src="https://unpkg.com/glassheart-ui@1.1.0/dist/index.js"></script>
```

### React 組件
```html
<script src="https://unpkg.com/glassheart-ui-react@1.1.0/dist/index.js"></script>
```

### Vue 組件
```html
<script src="https://unpkg.com/glassheart-ui-vue@1.1.0/dist/index.js"></script>
```

### Svelte 組件
```html
<script src="https://unpkg.com/glassheart-ui-svelte@1.1.0/dist/index.js"></script>
```

## 🚀 快速開始

### 原生 JavaScript 使用

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GlassHeartUI Demo</title>
    <!-- 引入核心樣式 -->
    <link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css">
    <!-- 引入 JavaScript 組件 -->
    <script src="https://unpkg.com/glassheart-ui@1.1.0/dist/index.js"></script>
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
    </style>
</head>
<body>
    <div id="app"></div>

    <script>
        const { GlassCard, GlassButton, GlassInput, initTheme } = window.GlassHeartUI;
        
        // 初始化主題
        initTheme();
        
        // 創建卡片
        const card = new GlassCard({
            size: 'lg',
            liquid: true,
            interactive: true,
            content: `
                <div style="padding: 20px;">
                    <h2 style="margin: 0 0 16px 0; color: white;">Hello GlassHeartUI!</h2>
                    <p style="margin: 0 0 20px 0; color: rgba(255,255,255,0.8);">這是一個美麗的玻璃效果卡片</p>
                    <div style="display: flex; gap: 10px;">
                        <button class="gh-btn gh-btn-primary gh-liquid-flow" style="padding: 8px 16px; border: none; border-radius: 6px; background: rgba(255,255,255,0.2); color: white; cursor: pointer;">按鈕 1</button>
                        <button class="gh-btn gh-btn-secondary gh-liquid-flow" style="padding: 8px 16px; border: none; border-radius: 6px; background: rgba(255,255,255,0.1); color: white; cursor: pointer;">按鈕 2</button>
                    </div>
                </div>
            `
        });
        
        // 渲染到頁面
        card.render('#app');
    </script>
</body>
</html>
```

### React 使用

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GlassHeartUI React Demo</title>
    <link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css">
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/glassheart-ui-react@1.1.0/dist/index.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent, GlassButton, GlassInput } = window.GlassHeartUIReact;

        function App() {
            return React.createElement(GlassCard, { liquid: true, interactive: true, size: 'lg' },
                React.createElement(GlassCardHeader, null,
                    React.createElement(GlassCardTitle, null, "Hello GlassHeartUI!")
                ),
                React.createElement(GlassCardContent, null,
                    React.createElement(GlassInput, { placeholder: "輸入您的姓名" }),
                    React.createElement(GlassButton, { variant: "primary", liquid: true }, "提交")
                )
            );
        }

        ReactDOM.render(React.createElement(App), document.getElementById('root'));
    </script>
</body>
</html>
```

## 📦 版本管理

### 使用特定版本
```html
<!-- 使用特定版本 -->
<link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css">
<script src="https://unpkg.com/glassheart-ui@1.1.0/dist/index.js"></script>
```

### 使用最新版本
```html
<!-- 使用最新版本（不推薦生產環境） -->
<link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core/dist/index.css">
<script src="https://unpkg.com/glassheart-ui/dist/index.js"></script>
```

### 使用語義版本範圍
```html
<!-- 使用語義版本範圍 -->
<link rel="stylesheet" href="https://unpkg.com/glassheart-ui-core@^1.0.0/dist/index.css">
<script src="https://unpkg.com/glassheart-ui@^1.0.0/dist/index.js"></script>
```

## 🔧 自定義配置

### 自定義 CSS 變數
```html
<style>
    :root {
        --gh-glass-opacity: 0.3;
        --gh-glass-blur: 15px;
        --gh-animation-duration: 0.5s;
        --gh-primary: 59 130 246;
    }
</style>
```

### 主題切換
```javascript
// 切換到深色主題
document.documentElement.classList.add('dark');

// 切換到淺色主題
document.documentElement.classList.remove('dark');
```

## 🌍 國際化支援

所有 CDN 鏈接都支援全球 CDN 節點，確保快速載入：

- **unpkg.com** - 主要 CDN
- **cdn.jsdelivr.net** - 備用 CDN
- **unpkg.com** - 全球分發

## 📱 響應式設計

GlassHeartUI 的 CDN 版本完全支援響應式設計：

```css
/* 移動端優化 */
@media (max-width: 768px) {
    .gh-card {
        margin: 10px;
        border-radius: 12px;
    }
}
```

## ⚡ 性能優化

### 預載入
```html
<link rel="preload" href="https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css" as="style">
<link rel="preload" href="https://unpkg.com/glassheart-ui@1.1.0/dist/index.js" as="script">
```

### 異步載入
```html
<script>
    // 異步載入組件
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/glassheart-ui@1.1.0/dist/index.js';
    script.async = true;
    script.onload = function() {
        const { GlassCard } = window.GlassHeartUI;
        // 使用組件
    };
    document.head.appendChild(script);
</script>
```

## 🛠️ 開發工具

### 調試模式
```html
<script>
    // 啟用調試模式
    window.GlassHeartUIDebug = true;
</script>
```

### 版本檢查
```javascript
// 檢查載入的版本
console.log(window.GlassHeartUI.version);
```

## 📄 授權

GlassHeartUI 使用 MIT 授權，您可以自由使用於商業和個人專案中。

## 🤝 支援

如果您在使用 CDN 版本時遇到問題，請：

1. 檢查網路連接
2. 確認版本號正確
3. 查看瀏覽器控制台錯誤
4. 參考 [GitHub Issues](https://github.com/DuDuStudio/glassheart-ui/issues)
