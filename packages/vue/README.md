# @glassheart/ui-vue

Vue 版本的 GlassHeartUI 元件庫。

## 安裝

```bash
npm install @glassheart/ui-vue
```

## 使用

```vue
<template>
  <Card liquid interactive>
    <CardHeader>
      <CardTitle>Hello GlassHeartUI</CardTitle>
    </CardHeader>
    <CardContent>
      <Input placeholder="Enter your name" />
      <Button variant="primary" liquid>Submit</Button>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardHeader, CardTitle, CardContent, Input, Button } from '@glassheart/ui-vue';
</script>
```

## 元件

### Card
- `Card` - 主卡片元件
- `CardHeader` - 卡片標題區
- `CardTitle` - 卡片標題
- `CardDescription` - 卡片描述
- `CardContent` - 卡片內容
- `CardFooter` - 卡片底部

### Button
- `Button` - 按鈕元件
- `ButtonGroup` - 按鈕群組

### Input
- `Input` - 輸入框
- `Textarea` - 文字區域
- `InputGroup` - 輸入框群組
- `FloatingLabel` - 浮動標籤

## 授權

MIT License
