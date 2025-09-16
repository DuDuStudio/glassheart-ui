# 發布指南

本指南說明如何發布 GlassHeartUI 的各個套件到 npm。

## 📦 套件結構

```
packages/
├── core/          # glassheart-ui-core - 核心 CSS
├── react/         # glassheart-ui-react - React 元件
├── vue/           # glassheart-ui-vue - Vue 元件
├── svelte/        # glassheart-ui-svelte - Svelte 元件
└── js/            # glassheart-ui - 原生 JavaScript
```

## 🌐 CDN 發布

所有套件發布到 npm 後，會自動在 unpkg CDN 上可用：

- **核心樣式**: `https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css`
- **JavaScript**: `https://unpkg.com/glassheart-ui@1.1.0/dist/index.js`
- **React**: `https://unpkg.com/glassheart-ui-react@1.1.0/dist/index.js`
- **Vue**: `https://unpkg.com/glassheart-ui-vue@1.1.0/dist/index.js`
- **Svelte**: `https://unpkg.com/glassheart-ui-svelte@1.1.0/dist/index.js`

## 🚀 發布流程

### 1. 準備工作

確保所有套件都已正確配置：

```bash
# 安裝所有依賴
npm install

# 建置所有套件
npm run build

# 檢查類型
npm run type-check
```

### 2. 發布單一套件

```bash
# 發布核心 CSS 包
npm run publish:core

# 發布 React 包
npm run publish:react

# 發布 Vue 包
npm run publish:vue

# 發布 Svelte 包
npm run publish:svelte

# 發布原生 JS 包
npm run publish:js
```

### 3. 發布所有套件

```bash
# 按順序發布所有套件（核心包優先）
npm run publish:all
```

### 4. 使用發布腳本

```bash
# 發布特定套件
node scripts/publish.js core

# 發布所有套件
node scripts/publish.js
```

## 📋 發布檢查清單

### 發布前檢查

- [ ] 所有套件都已建置成功
- [ ] 版本號已更新
- [ ] CHANGELOG 已更新
- [ ] README 文檔已更新
- [ ] 所有測試通過
- [ ] 類型檢查通過

### 發布順序

1. **@glassheart/ui-core** - 核心 CSS 包（其他包的依賴）
2. **@glassheart/ui-react** - React 包
3. **@glassheart/ui-vue** - Vue 包
4. **@glassheart/ui-svelte** - Svelte 包
5. **@glassheart/ui** - 原生 JavaScript 包

## 🔧 版本管理

### 更新版本

```bash
# 更新特定套件版本
cd packages/core
npm version patch  # 或 minor, major

# 更新所有套件版本
npm version patch --workspaces
```

### 發布標籤

```bash
# 創建發布標籤
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## 🐛 故障排除

### 常見問題

1. **版本衝突**
   - 確保核心包版本與其他包一致
   - 檢查 peerDependencies 配置

2. **建置失敗**
   - 檢查 TypeScript 配置
   - 確保所有依賴已安裝

3. **發布失敗**
   - 檢查 npm 登入狀態
   - 確認套件名稱可用性

### 回滾發布

```bash
# 取消發布（24小時內）
npm unpublish @glassheart/ui-core@1.0.0

# 發布修復版本
npm version patch
npm publish
```

## 📚 相關文檔

- [npm 發布指南](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [語義化版本](https://semver.org/)
- [Lerna 文檔](https://lerna.js.org/)
