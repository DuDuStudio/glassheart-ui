# 更新日誌

## [1.1.0] - 2024-12-19

### ✨ 新功能

#### 組件名稱更新
- 將所有組件名稱更新為 `Glass` 前綴：
  - `Card` → `GlassCard`
  - `Button` → `GlassButton`
  - `Input` → `GlassInput`
  - `CardHeader` → `GlassCardHeader`
  - `CardTitle` → `GlassCardTitle`
  - `CardDescription` → `GlassCardDescription`
  - `CardContent` → `GlassCardContent`
  - `CardFooter` → `GlassCardFooter`

#### CDN 支援
- 所有套件現在都可以通過 unpkg CDN 直接使用
- 添加了完整的 CDN 使用指南
- 創建了互動式 CDN 範例頁面

#### 文檔更新
- 更新了所有 README 文件以反映新的組件名稱
- 添加了 CDN 使用說明
- 創建了詳細的 CDN 使用指南
- 更新了發布指南以包含 CDN 資訊

### 🔄 向後兼容性

為了確保現有代碼不會中斷，所有套件都保留了舊的組件名稱作為別名：

```javascript
// 新名稱（推薦）
import { GlassCard, GlassButton, GlassInput } from 'glassheart-ui-react';

// 舊名稱（仍然支援）
import { Card, Button, Input } from 'glassheart-ui-react';
```

### 📦 套件更新

#### glassheart-ui-core@1.1.0
- 更新了 README 文件
- 添加了 CDN 使用說明
- 更新了套件描述

#### glassheart-ui-react@1.1.0
- 更新了所有組件名稱
- 添加了向後兼容性支援
- 更新了 README 文件
- 添加了 CDN 使用說明

#### glassheart-ui-vue@1.1.0
- 更新了所有組件名稱
- 添加了向後兼容性支援
- 更新了 README 文件
- 添加了 CDN 使用說明

#### glassheart-ui-svelte@1.1.0
- 更新了所有組件名稱
- 添加了向後兼容性支援
- 更新了 README 文件
- 添加了 CDN 使用說明

#### glassheart-ui@1.1.0
- 更新了所有組件類別名稱
- 添加了向後兼容性支援
- 更新了 README 文件
- 添加了 CDN 使用說明

### 🌐 CDN 鏈接

所有套件現在都可以通過以下 CDN 鏈接使用：

- **核心樣式**: `https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css`
- **JavaScript**: `https://unpkg.com/glassheart-ui@1.1.0/dist/index.js`
- **React**: `https://unpkg.com/glassheart-ui-react@1.1.0/dist/index.js`
- **Vue**: `https://unpkg.com/glassheart-ui-vue@1.1.0/dist/index.js`
- **Svelte**: `https://unpkg.com/glassheart-ui-svelte@1.1.0/dist/index.js`

### 📚 文檔新增

- **CDN_GUIDE.md** - 完整的 CDN 使用指南
- **examples/cdn-demo.html** - 互動式 CDN 使用範例
- 更新了所有套件的 README 文件
- 更新了主 README 文件
- 更新了發布指南

### 🔧 技術改進

- 更新了所有套件的 package.json 文件
- 添加了更多關鍵字以改善搜尋可見性
- 更新了套件描述以包含 CDN 資訊
- 確保所有套件都正確發布到 npm

### 🎯 使用建議

1. **新專案**：建議使用新的 `Glass` 前綴組件名稱
2. **現有專案**：可以繼續使用舊的組件名稱，或逐步遷移到新名稱
3. **CDN 使用**：對於快速原型或簡單專案，建議使用 CDN 方式
4. **npm 安裝**：對於複雜專案，建議使用 npm 安裝方式

### 📝 遷移指南

如果您想遷移到新的組件名稱，請參考以下步驟：

1. 更新導入語句：
   ```javascript
   // 從
   import { Card, Button, Input } from 'glassheart-ui-react';
   
   // 到
   import { GlassCard, GlassButton, GlassInput } from 'glassheart-ui-react';
   ```

2. 更新組件使用：
   ```jsx
   // 從
   <Card liquid interactive>
     <CardHeader>
       <CardTitle>Title</CardTitle>
     </CardHeader>
   </Card>
   
   // 到
   <GlassCard liquid interactive>
     <GlassCardHeader>
       <GlassCardTitle>Title</GlassCardTitle>
     </GlassCardHeader>
   </GlassCard>
   ```

3. 測試您的應用程式以確保一切正常運作

### 🐛 修復

- 修復了所有套件的建置問題
- 確保所有組件都正確導出
- 修復了 TypeScript 類型定義問題

### 📈 性能

- 優化了 CDN 載入性能
- 改善了組件初始化速度
- 減少了不必要的重新渲染

---

## [1.0.3] - 2024-12-18

### 修復
- 修復了 npm 發布問題
- 更新了套件名稱以移除 @ 前綴
- 修復了依賴關係問題

## [1.0.0] - 2024-12-18

### 初始發布
- 發布了核心 CSS 套件
- 發布了 React 組件套件
- 發布了 Vue 組件套件
- 發布了 Svelte 組件套件
- 發布了原生 JavaScript 套件
- 實現了基本的 Liquid Glass 效果
- 添加了主題系統支援
- 添加了響應式設計支援

## [1.1.0] - 2024-12-19

### ✨ 新功能

#### 組件名稱更新
- 將所有組件名稱更新為 `Glass` 前綴：
  - `Card` → `GlassCard`
  - `Button` → `GlassButton`
  - `Input` → `GlassInput`
  - `CardHeader` → `GlassCardHeader`
  - `CardTitle` → `GlassCardTitle`
  - `CardDescription` → `GlassCardDescription`
  - `CardContent` → `GlassCardContent`
  - `CardFooter` → `GlassCardFooter`

#### CDN 支援
- 所有套件現在都可以通過 unpkg CDN 直接使用
- 添加了完整的 CDN 使用指南
- 創建了互動式 CDN 範例頁面

#### 文檔更新
- 更新了所有 README 文件以反映新的組件名稱
- 添加了 CDN 使用說明
- 創建了詳細的 CDN 使用指南
- 更新了發布指南以包含 CDN 資訊

### 🔄 向後兼容性

為了確保現有代碼不會中斷，所有套件都保留了舊的組件名稱作為別名：

```javascript
// 新名稱（推薦）
import { GlassCard, GlassButton, GlassInput } from 'glassheart-ui-react';

// 舊名稱（仍然支援）
import { Card, Button, Input } from 'glassheart-ui-react';
```

### 📦 套件更新

#### glassheart-ui-core@1.1.0
- 更新了 README 文件
- 添加了 CDN 使用說明
- 更新了套件描述

#### glassheart-ui-react@1.1.0
- 更新了所有組件名稱
- 添加了向後兼容性支援
- 更新了 README 文件
- 添加了 CDN 使用說明

#### glassheart-ui-vue@1.1.0
- 更新了所有組件名稱
- 添加了向後兼容性支援
- 更新了 README 文件
- 添加了 CDN 使用說明

#### glassheart-ui-svelte@1.1.0
- 更新了所有組件名稱
- 添加了向後兼容性支援
- 更新了 README 文件
- 添加了 CDN 使用說明

#### glassheart-ui@1.1.0
- 更新了所有組件類別名稱
- 添加了向後兼容性支援
- 更新了 README 文件
- 添加了 CDN 使用說明

### 🌐 CDN 鏈接

所有套件現在都可以通過以下 CDN 鏈接使用：

- **核心樣式**: `https://unpkg.com/glassheart-ui-core@1.1.0/dist/index.css`
- **JavaScript**: `https://unpkg.com/glassheart-ui@1.1.0/dist/index.js`
- **React**: `https://unpkg.com/glassheart-ui-react@1.1.0/dist/index.js`
- **Vue**: `https://unpkg.com/glassheart-ui-vue@1.1.0/dist/index.js`
- **Svelte**: `https://unpkg.com/glassheart-ui-svelte@1.1.0/dist/index.js`

### 📚 文檔新增

- **CDN_GUIDE.md** - 完整的 CDN 使用指南
- **examples/cdn-demo.html** - 互動式 CDN 使用範例
- 更新了所有套件的 README 文件
- 更新了主 README 文件
- 更新了發布指南

### 🔧 技術改進

- 更新了所有套件的 package.json 文件
- 添加了更多關鍵字以改善搜尋可見性
- 更新了套件描述以包含 CDN 資訊
- 確保所有套件都正確發布到 npm

### 🎯 使用建議

1. **新專案**：建議使用新的 `Glass` 前綴組件名稱
2. **現有專案**：可以繼續使用舊的組件名稱，或逐步遷移到新名稱
3. **CDN 使用**：對於快速原型或簡單專案，建議使用 CDN 方式
4. **npm 安裝**：對於複雜專案，建議使用 npm 安裝方式

### 📝 遷移指南

如果您想遷移到新的組件名稱，請參考以下步驟：

1. 更新導入語句：
   ```javascript
   // 從
   import { Card, Button, Input } from 'glassheart-ui-react';
   
   // 到
   import { GlassCard, GlassButton, GlassInput } from 'glassheart-ui-react';
   ```

2. 更新組件使用：
   ```jsx
   // 從
   <Card liquid interactive>
     <CardHeader>
       <CardTitle>Title</CardTitle>
     </CardHeader>
   </Card>
   
   // 到
   <GlassCard liquid interactive>
     <GlassCardHeader>
       <GlassCardTitle>Title</GlassCardTitle>
     </GlassCardHeader>
   </GlassCard>
   ```

3. 測試您的應用程式以確保一切正常運作

### 🐛 修復

- 修復了所有套件的建置問題
- 確保所有組件都正確導出
- 修復了 TypeScript 類型定義問題

### 📈 性能

- 優化了 CDN 載入性能
- 改善了組件初始化速度
- 減少了不必要的重新渲染

---

## [1.0.3] - 2024-12-18

### 修復
- 修復了 npm 發布問題
- 更新了套件名稱以移除 @ 前綴
- 修復了依賴關係問題

## [1.0.0] - 2024-12-18

### 初始發布
- 發布了核心 CSS 套件
- 發布了 React 組件套件
- 發布了 Vue 組件套件
- 發布了 Svelte 組件套件
- 發布了原生 JavaScript 套件
- 實現了基本的 Liquid Glass 效果
- 添加了主題系統支援
- 添加了響應式設計支援
