# glassheart-ui-angular

Angular 版本的 GlassHeartUI 元件庫，提供美觀的玻璃擬態設計組件。

## 📋 目錄

- [安裝](#安裝)
- [快速開始](#快速開始)
- [組件文檔](#組件文檔)
  - [GlassButtonComponent](#glassbuttoncomponent)
  - [GlassCardComponent](#glasscardcomponent)
  - [GlassInputComponent](#glassinputcomponent)
- [模組配置](#模組配置)
- [授權](#授權)

## 安裝

```bash
npm install glassheart-ui-angular
```

## 快速開始

### 1. 導入模組

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GlassHeartUIModule } from 'glassheart-ui-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GlassHeartUIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2. 使用組件

```html
<!-- app.component.html -->
<gh-glass-card liquid interactive>
  <h3>Hello GlassHeartUI</h3>
  <p>This is a beautiful glass card!</p>
  <gh-glass-input 
    placeholder="Enter your name" 
    [(ngModel)]="name">
  </gh-glass-input>
  <gh-glass-button 
    variant="primary" 
    liquid
    (click)="onSubmit()">
    Submit
  </gh-glass-button>
</gh-glass-card>
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = '';

  onSubmit() {
    console.log('Form submitted with name:', this.name);
  }
}
```

## 組件文檔

### GlassButtonComponent

按鈕組件，支援多種變體和尺寸。

#### 選擇器

```html
<gh-glass-button></gh-glass-button>
```

#### Inputs

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | 按鈕變體 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 按鈕尺寸 |
| `glass` | `'light' \| 'medium' \| 'heavy'` | `'medium'` | 玻璃效果強度 |
| `liquid` | `boolean` | `false` | 是否啟用液體流動效果 |
| `loading` | `boolean` | `false` | 是否顯示載入狀態 |
| `disabled` | `boolean` | `false` | 是否禁用按鈕 |
| `className` | `string` | `''` | 自定義 CSS 類名 |

#### Outputs

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `onClick` | `MouseEvent` | 點擊事件 |
| `onFocus` | `FocusEvent` | 獲得焦點事件 |
| `onBlur` | `FocusEvent` | 失去焦點事件 |
| `onMouseEnter` | `MouseEvent` | 滑鼠進入事件 |
| `onMouseLeave` | `MouseEvent` | 滑鼠離開事件 |

#### 使用範例

```html
<div class="button-examples">
  <!-- 基本按鈕 -->
  <gh-glass-button>Default Button</gh-glass-button>
  
  <!-- 主要按鈕 -->
  <gh-glass-button variant="primary" size="lg">
    Primary Button
  </gh-glass-button>
  
  <!-- 液體效果按鈕 -->
  <gh-glass-button variant="accent" liquid>
    Liquid Button
  </gh-glass-button>
  
  <!-- 載入狀態按鈕 -->
  <gh-glass-button variant="primary" loading>
    Loading...
  </gh-glass-button>
  
  <!-- 不同玻璃效果 -->
  <gh-glass-button glass="light">Light Glass</gh-glass-button>
  <gh-glass-button glass="medium">Medium Glass</gh-glass-button>
  <gh-glass-button glass="heavy">Heavy Glass</gh-glass-button>
  
  <!-- 事件處理 -->
  <gh-glass-button (onClick)="handleClick($event)">
    Click Me
  </gh-glass-button>
</div>
```

### GlassCardComponent

卡片組件，支援多種變體和交互效果。

#### 選擇器

```html
<gh-glass-card></gh-glass-card>
```

#### Inputs

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 卡片尺寸 |
| `variant` | `'default' \| 'outline' \| 'solid'` | `'default'` | 卡片變體 |
| `glass` | `'light' \| 'medium' \| 'heavy'` | `'medium'` | 玻璃效果強度 |
| `liquid` | `boolean` | `false` | 是否啟用液體流動效果 |
| `interactive` | `boolean` | `false` | 是否啟用交互效果 |
| `loading` | `boolean` | `false` | 是否顯示載入狀態 |
| `className` | `string` | `''` | 自定義 CSS 類名 |

#### Outputs

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `onClick` | `MouseEvent` | 點擊事件 |
| `onMouseEnter` | `MouseEvent` | 滑鼠進入事件 |
| `onMouseLeave` | `MouseEvent` | 滑鼠離開事件 |

#### 使用範例

```html
<div class="card-examples">
  <!-- 基本卡片 -->
  <gh-glass-card>
    <h3>Basic Card</h3>
    <p>This is a basic glass card.</p>
  </gh-glass-card>
  
  <!-- 交互式卡片 -->
  <gh-glass-card interactive (onClick)="handleCardClick($event)">
    <h3>Interactive Card</h3>
    <p>Click me!</p>
  </gh-glass-card>
  
  <!-- 液體效果卡片 -->
  <gh-glass-card liquid glass="heavy">
    <h3>Liquid Card</h3>
    <p>This card has liquid flow effects.</p>
  </gh-glass-card>
  
  <!-- 不同尺寸 -->
  <gh-glass-card size="sm">Small Card</gh-glass-card>
  <gh-glass-card size="lg">Large Card</gh-glass-card>
</div>
```

### GlassInputComponent

輸入框組件，支援多種變體和狀態，實現 ControlValueAccessor 接口。

#### 選擇器

```html
<gh-glass-input></gh-glass-input>
```

#### Inputs

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `value` | `string` | `''` | 輸入值 |
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
| `icon` | `string` | `''` | 圖標 |
| `iconPosition` | `'left' \| 'right'` | `'left'` | 圖標位置 |
| `button` | `string` | `''` | 按鈕 |
| `className` | `string` | `''` | 自定義 CSS 類名 |

#### Outputs

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `onChange` | `string` | 值變更事件 |
| `onFocus` | `FocusEvent` | 獲得焦點事件 |
| `onBlur` | `FocusEvent` | 失去焦點事件 |

#### 使用範例

```html
<div class="input-examples">
  <!-- 基本輸入框 -->
  <gh-glass-input 
    [(ngModel)]="inputValue"
    placeholder="Enter your name">
  </gh-glass-input>
  
  <!-- 帶標籤的輸入框 -->
  <gh-glass-input 
    [(ngModel)]="email"
    type="email"
    label="Email Address"
    placeholder="Enter your email">
  </gh-glass-input>
  
  <!-- 錯誤狀態輸入框 -->
  <gh-glass-input 
    [(ngModel)]="password"
    type="password"
    label="Password"
    [error]="true"
    help="Password must be at least 8 characters">
  </gh-glass-input>
  
  <!-- 液體效果輸入框 -->
  <gh-glass-input 
    [(ngModel)]="search"
    placeholder="Search..."
    liquid
    glass="heavy">
  </gh-glass-input>
  
  <!-- 不同尺寸 -->
  <gh-glass-input size="sm" placeholder="Small input"></gh-glass-input>
  <gh-glass-input size="lg" placeholder="Large input"></gh-glass-input>
  
  <!-- 事件處理 -->
  <gh-glass-input 
    [(ngModel)]="inputValue"
    (onChange)="handleInputChange($event)"
    placeholder="Type something...">
  </gh-glass-input>
</div>
```

## 模組配置

### GlassHeartUIModule

主要的 Angular 模組，包含所有組件。

```typescript
import { GlassHeartUIModule } from 'glassheart-ui-angular';

@NgModule({
  imports: [
    GlassHeartUIModule
  ]
})
export class YourModule { }
```

### 依賴模組

GlassHeartUIModule 依賴以下 Angular 模組：
- `CommonModule` - 基本 Angular 功能
- `FormsModule` - 模板驅動表單
- `ReactiveFormsModule` - 響應式表單

### 樣式導入

確保在您的 `angular.json` 中導入核心樣式：

```json
{
  "styles": [
    "node_modules/glassheart-ui-core/dist/index.css",
    "src/styles.css"
  ]
}
```

或在您的 `styles.css` 中：

```css
@import 'glassheart-ui-core/dist/index.css';
```

## 授權

MIT License
