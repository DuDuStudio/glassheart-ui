import type { Meta, StoryObj } from '@storybook/react';
import { GlassContainer } from './GlassContainer';

const meta: Meta<typeof GlassContainer> = {
  title: 'Components/GlassContainer',
  component: GlassContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '一個具有玻璃效果的容器組件，支持多種尺寸、變體和特效。',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: '容器尺寸',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'solid', 'transparent'],
      description: '容器變體',
    },
    glass: {
      control: { type: 'select' },
      options: ['light', 'medium', 'heavy'],
      description: '玻璃效果強度',
    },
    interactive: {
      control: { type: 'boolean' },
      description: '是否可交互',
    },
    liquid: {
      control: { type: 'boolean' },
      description: '是否啟用液體流動效果',
    },
    animated: {
      control: { type: 'boolean' },
      description: '是否啟用動畫效果',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: '內邊距',
    },
    margin: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: '外邊距',
    },
    rounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: '圓角大小',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: '陰影大小',
    },
    overflow: {
      control: { type: 'select' },
      options: ['visible', 'hidden', 'scroll', 'auto'],
      description: '溢出處理',
    },
    position: {
      control: { type: 'select' },
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      description: '定位方式',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Container
export const Default: Story = {
  args: {
    children: '這是一個默認的玻璃容器',
    size: 'md',
    variant: 'default',
    glass: 'medium',
    padding: 'md',
  },
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <GlassContainer size="xs" padding="sm">
        超小容器 (xs)
      </GlassContainer>
      <GlassContainer size="sm" padding="sm">
        小容器 (sm)
      </GlassContainer>
      <GlassContainer size="md" padding="md">
        中等容器 (md)
      </GlassContainer>
      <GlassContainer size="lg" padding="md">
        大容器 (lg)
      </GlassContainer>
      <GlassContainer size="xl" padding="lg">
        超大容器 (xl)
      </GlassContainer>
      <GlassContainer size="2xl" padding="lg">
        特大容器 (2xl)
      </GlassContainer>
      <GlassContainer size="3xl" padding="xl">
        巨大容器 (3xl)
      </GlassContainer>
      <GlassContainer size="full" padding="lg">
        全寬容器 (full)
      </GlassContainer>
    </div>
  ),
};

// Different Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <GlassContainer variant="default" padding="md">
        默認變體 - 具有玻璃效果
      </GlassContainer>
      <GlassContainer variant="outline" padding="md">
        輪廓變體 - 僅有邊框
      </GlassContainer>
      <GlassContainer variant="solid" padding="md">
        實心變體 - 純色背景
      </GlassContainer>
      <GlassContainer variant="transparent" padding="md">
        透明變體 - 完全透明
      </GlassContainer>
    </div>
  ),
};

// Glass Intensities
export const GlassIntensities: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <GlassContainer glass="light" padding="md">
        輕度玻璃效果
      </GlassContainer>
      <GlassContainer glass="medium" padding="md">
        中度玻璃效果
      </GlassContainer>
      <GlassContainer glass="heavy" padding="md">
        重度玻璃效果
      </GlassContainer>
    </div>
  ),
};

// Interactive Container
export const Interactive: Story = {
  args: {
    children: '點擊我！這是一個可交互的容器',
    size: 'md',
    variant: 'default',
    glass: 'medium',
    interactive: true,
    padding: 'md',
  },
};

// Liquid Flow Effect
export const LiquidFlow: Story = {
  args: {
    children: '具有液體流動效果的容器',
    size: 'md',
    variant: 'default',
    glass: 'medium',
    liquid: true,
    padding: 'md',
  },
};

// Animated Container
export const Animated: Story = {
  args: {
    children: '具有浮動動畫的容器',
    size: 'md',
    variant: 'default',
    glass: 'medium',
    animated: true,
    padding: 'md',
  },
};

// Combined Effects
export const CombinedEffects: Story = {
  args: {
    children: '液體流動 + 動畫 + 交互效果',
    size: 'lg',
    variant: 'default',
    glass: 'heavy',
    interactive: true,
    liquid: true,
    animated: true,
    padding: 'lg',
  },
};

// Different Padding and Margin
export const Spacing: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <GlassContainer padding="xs" margin="sm">
        小內邊距 + 小外邊距
      </GlassContainer>
      <GlassContainer padding="sm" margin="md">
        小內邊距 + 中外邊距
      </GlassContainer>
      <GlassContainer padding="md" margin="lg">
        中內邊距 + 大外邊距
      </GlassContainer>
      <GlassContainer padding="lg" margin="xl">
        大內邊距 + 超大外邊距
      </GlassContainer>
    </div>
  ),
};

// Different Rounded Corners
export const RoundedCorners: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <GlassContainer rounded="none" padding="md">
        無圓角
      </GlassContainer>
      <GlassContainer rounded="sm" padding="md">
        小圓角
      </GlassContainer>
      <GlassContainer rounded="md" padding="md">
        中圓角
      </GlassContainer>
      <GlassContainer rounded="lg" padding="md">
        大圓角
      </GlassContainer>
      <GlassContainer rounded="xl" padding="md">
        超大圓角
      </GlassContainer>
      <GlassContainer rounded="full" padding="md">
        完全圓角
      </GlassContainer>
    </div>
  ),
};

// Different Shadows
export const Shadows: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <GlassContainer shadow="none" padding="md">
        無陰影
      </GlassContainer>
      <GlassContainer shadow="sm" padding="md">
        小陰影
      </GlassContainer>
      <GlassContainer shadow="md" padding="md">
        中陰影
      </GlassContainer>
      <GlassContainer shadow="lg" padding="md">
        大陰影
      </GlassContainer>
      <GlassContainer shadow="xl" padding="md">
        超大陰影
      </GlassContainer>
    </div>
  ),
};

// Overflow Examples
export const Overflow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <GlassContainer overflow="visible" padding="md" size="sm">
        可見溢出 - 內容會超出容器邊界
      </GlassContainer>
      <GlassContainer overflow="hidden" padding="md" size="sm">
        隱藏溢出 - 超出部分會被隱藏
      </GlassContainer>
      <GlassContainer overflow="scroll" padding="md" size="sm" style={{ height: '100px' }}>
        滾動溢出 - 超出部分可以滾動查看
        <br />
        這是一段很長的文字，用來測試滾動效果。
        <br />
        當內容超出容器高度時，會出現滾動條。
        <br />
        用戶可以通過滾動來查看所有內容。
        <br />
        這是一個很好的用戶體驗設計。
      </GlassContainer>
    </div>
  ),
};

// Position Examples
export const Position: Story = {
  render: () => (
    <div style={{ position: 'relative', height: '300px', border: '1px dashed #ccc' }}>
      <GlassContainer position="static" padding="md" size="sm" style={{ margin: '10px' }}>
        靜態定位
      </GlassContainer>
      <GlassContainer position="relative" padding="md" size="sm" style={{ top: '20px', left: '20px' }}>
        相對定位
      </GlassContainer>
      <GlassContainer position="absolute" padding="md" size="sm" style={{ top: '60px', right: '20px' }}>
        絕對定位
      </GlassContainer>
      <GlassContainer position="sticky" padding="md" size="sm" style={{ top: '10px', margin: '10px' }}>
        粘性定位
      </GlassContainer>
    </div>
  ),
};

// Complex Content Example
export const ComplexContent: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: 'rgb(var(--gh-foreground))' }}>
          複雜內容示例
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: 'rgb(var(--gh-muted-foreground))' }}>
          這是一個包含多種元素的玻璃容器示例。
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button style={{ 
            padding: '0.5rem 1rem', 
            border: '1px solid rgb(var(--gh-border))', 
            borderRadius: 'var(--gh-radius-sm)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'rgb(var(--gh-foreground))',
            cursor: 'pointer'
          }}>
            按鈕 1
          </button>
          <button style={{ 
            padding: '0.5rem 1rem', 
            border: '1px solid rgb(var(--gh-border))', 
            borderRadius: 'var(--gh-radius-sm)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'rgb(var(--gh-foreground))',
            cursor: 'pointer'
          }}>
            按鈕 2
          </button>
        </div>
      </div>
    ),
    size: 'lg',
    variant: 'default',
    glass: 'medium',
    interactive: true,
    padding: 'lg',
  },
};

// Dark Theme Example
export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ padding: '2rem', background: 'rgb(var(--gh-background))' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: '深色主題下的玻璃容器',
    size: 'md',
    variant: 'default',
    glass: 'medium',
    padding: 'md',
  },
};
