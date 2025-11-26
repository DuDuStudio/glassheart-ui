import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { GlassTypography } from './GlassTypography';
import './GlassTypography.css';

const meta: Meta<typeof GlassTypography> = {
  title: 'Components/GlassTypography',
  component: GlassTypography,
  parameters: {
    layout: 'centered',
    interactions: {
      enable: true,
      include: ['click', 'change', 'focus', 'blur', 'mouseenter', 'mouseleave'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
      description: '要顯示的文字內容',
    },
    variant: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
      description: '文字變體',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      description: '文字尺寸',
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: '字重',
    },
    glass: {
      control: { type: 'select' },
      options: ['light', 'medium', 'heavy'],
      description: '玻璃效果強度',
    },
    gradient: {
      control: { type: 'boolean' },
      description: '是否啟用漸變效果',
    },
    animated: {
      control: { type: 'boolean' },
      description: '是否啟用動畫效果',
    },
    glow: {
      control: { type: 'boolean' },
      description: '是否啟用發光效果',
    },
    glowColor: {
      control: { type: 'color' },
      description: '發光顏色',
    },
    glowIntensity: {
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
      description: '發光強度',
    },
    blur: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
      description: '模糊程度',
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: '透明度',
    },
    saturation: {
      control: { type: 'range', min: 0, max: 300, step: 10 },
      description: '飽和度',
    },
    brightness: {
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
      description: '亮度',
    },
    contrast: {
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
      description: '對比度',
    },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
      description: '文字對齊',
    },
    letterSpacing: {
      control: { type: 'range', min: -2, max: 10, step: 0.5 },
      description: '字母間距',
    },
    lineHeight: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: '行高',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hello GlassHeartUI',
    variant: 'h1',
    size: '2xl',
    weight: 'bold',
    glass: 'medium',
  },
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <GlassTypography variant="h1" size="4xl" weight="bold" glass="heavy" glow>
        Heading 1
      </GlassTypography>
      <GlassTypography variant="h2" size="3xl" weight="semibold" glass="medium" gradient>
        Heading 2
      </GlassTypography>
      <GlassTypography variant="h3" size="2xl" weight="medium" glass="light">
        Heading 3
      </GlassTypography>
      <GlassTypography variant="h4" size="xl" weight="medium" glass="medium">
        Heading 4
      </GlassTypography>
      <GlassTypography variant="h5" size="lg" weight="normal" glass="light">
        Heading 5
      </GlassTypography>
      <GlassTypography variant="h6" size="md" weight="normal" glass="light">
        Heading 6
      </GlassTypography>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <GlassTypography size="xs" glass="light">
        Extra Small Text
      </GlassTypography>
      <GlassTypography size="sm" glass="light">
        Small Text
      </GlassTypography>
      <GlassTypography size="md" glass="medium">
        Medium Text
      </GlassTypography>
      <GlassTypography size="lg" glass="medium">
        Large Text
      </GlassTypography>
      <GlassTypography size="xl" glass="heavy">
        Extra Large Text
      </GlassTypography>
      <GlassTypography size="2xl" glass="heavy" glow>
        2X Large Text
      </GlassTypography>
      <GlassTypography size="3xl" glass="heavy" glow gradient>
        3X Large Text
      </GlassTypography>
      <GlassTypography size="4xl" glass="heavy" glow gradient>
        4X Large Text
      </GlassTypography>
      <GlassTypography size="5xl" glass="heavy" glow gradient>
        5X Large Text
      </GlassTypography>
      <GlassTypography size="6xl" glass="heavy" glow gradient>
        6X Large Text
      </GlassTypography>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-4">
      <GlassTypography weight="light" glass="light">
        Light Weight Text
      </GlassTypography>
      <GlassTypography weight="normal" glass="light">
        Normal Weight Text
      </GlassTypography>
      <GlassTypography weight="medium" glass="medium">
        Medium Weight Text
      </GlassTypography>
      <GlassTypography weight="semibold" glass="medium">
        Semibold Weight Text
      </GlassTypography>
      <GlassTypography weight="bold" glass="heavy">
        Bold Weight Text
      </GlassTypography>
      <GlassTypography weight="extrabold" glass="heavy" glow>
        Extrabold Weight Text
      </GlassTypography>
      <GlassTypography weight="black" glass="heavy" glow gradient>
        Black Weight Text
      </GlassTypography>
    </div>
  ),
};

export const SpecialEffects: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white mb-2">Gradient Effect</h3>
        <GlassTypography gradient size="2xl" weight="bold">
          Gradient Glass Text
        </GlassTypography>
      </div>
      <div>
        <h3 className="text-white mb-2">Glow Effect</h3>
        <GlassTypography glow glowColor="#00ff88" size="2xl" weight="bold">
          Glowing Glass Text
        </GlassTypography>
      </div>
      <div>
        <h3 className="text-white mb-2">Liquid Flow</h3>
        <GlassTypography liquid size="2xl" weight="bold" glass="heavy">
          Liquid Flow Text
        </GlassTypography>
      </div>
      <div>
        <h3 className="text-white mb-2">Animated</h3>
        <GlassTypography animated size="2xl" weight="bold" glass="heavy">
          Animated Glass Text
        </GlassTypography>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white mb-2">Custom Letter Spacing</h3>
        <GlassTypography letterSpacing={2} size="xl" glass="medium">
          Wide Letter Spacing
        </GlassTypography>
      </div>
      <div>
        <h3 className="text-white mb-2">Custom Line Height</h3>
        <GlassTypography lineHeight={2} size="lg" glass="medium">
          This text has custom line height for better readability and spacing between lines.
        </GlassTypography>
      </div>
      <div>
        <h3 className="text-white mb-2">Center Aligned</h3>
        <GlassTypography textAlign="center" size="xl" glass="medium">
          Center Aligned Text
        </GlassTypography>
      </div>
      <div>
        <h3 className="text-white mb-2">Right Aligned</h3>
        <GlassTypography textAlign="right" size="xl" glass="medium">
          Right Aligned Text
        </GlassTypography>
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <GlassTypography
          variant="h1"
          size="4xl"
          weight="bold"
          glass="heavy"
          glow
          gradient
          liquid
          animated
          glowColor="#ff6b6b"
          glowIntensity={1.2}
        >
          Interactive Glass Typography
        </GlassTypography>
      </div>
      <div className="text-center">
        <GlassTypography
          variant="p"
          size="lg"
          glass="medium"
          textAlign="center"
          lineHeight={1.6}
        >
          This is a demonstration of the GlassTypography component with various effects.
          You can customize the appearance using the controls panel.
        </GlassTypography>
      </div>
    </div>
  ),
};

export const ResponsiveDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-center">
        <GlassTypography
          variant="h1"
          size="6xl"
          weight="bold"
          glass="heavy"
          glow
          gradient
          className="block md:hidden"
        >
          Mobile Title
        </GlassTypography>
        <GlassTypography
          variant="h1"
          size="4xl"
          weight="bold"
          glass="heavy"
          glow
          gradient
          className="hidden md:block lg:hidden"
        >
          Tablet Title
        </GlassTypography>
        <GlassTypography
          variant="h1"
          size="2xl"
          weight="bold"
          glass="heavy"
          glow
          gradient
          className="hidden lg:block"
        >
          Desktop Title
        </GlassTypography>
      </div>
    </div>
  ),
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h2 className="text-white mb-2">High Contrast Mode</h2>
        <GlassTypography
          size="lg"
          glass="heavy"
          contrast={1.5}
          brightness={1.3}
        >
          High contrast text for better accessibility
        </GlassTypography>
      </div>
      <div>
        <h2 className="text-white mb-2">Reduced Motion</h2>
        <GlassTypography
          size="lg"
          glass="medium"
          animated={false}
          liquid={false}
        >
          Text without animations for users who prefer reduced motion
        </GlassTypography>
      </div>
    </div>
  ),
};
