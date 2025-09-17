import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent, GlassCardFooter } from './GlassCard';
import { GlassButton } from '../GlassButton/GlassButton';
import './GlassCard.css';
import '../GlassButton/GlassButton.css';

const meta: Meta<typeof GlassCard> = {
  title: 'Components/GlassCard',
  component: GlassCard,
  parameters: {
    layout: 'centered',
    interactions: {
      enable: true,
      include: ['click', 'change', 'focus', 'blur', 'mouseenter', 'mouseleave'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'solid'],
    },
    glass: {
      control: { type: 'select' },
      options: ['light', 'medium', 'heavy'],
    },
    interactive: {
      control: { type: 'boolean' },
    },
    liquid: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    onClick: {
      action: 'clicked',
    },
    onMouseEnter: {
      action: 'mouse-enter',
    },
    onMouseLeave: {
      action: 'mouse-leave',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <GlassCardHeader>
          <GlassCardTitle>GlassCard Title</GlassCardTitle>
          <GlassCardDescription>GlassCard description goes here</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>This is the card content. It can contain any React elements.</p>
        </GlassCardContent>
        <GlassCardFooter>
          <GlassButton variant="primary" size="sm">Action</GlassButton>
        </GlassCardFooter>
      </>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <GlassCard size="sm">
        <GlassCardHeader>
          <GlassCardTitle>Small GlassCard</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Small card content</p>
        </GlassCardContent>
      </GlassCard>
      <GlassCard size="md">
        <GlassCardHeader>
          <GlassCardTitle>Medium GlassCard</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Medium card content</p>
        </GlassCardContent>
      </GlassCard>
      <GlassCard size="lg">
        <GlassCardHeader>
          <GlassCardTitle>Large GlassCard</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Large card content</p>
        </GlassCardContent>
      </GlassCard>
      <GlassCard size="xl">
        <GlassCardHeader>
          <GlassCardTitle>Extra Large GlassCard</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Extra large card content</p>
        </GlassCardContent>
      </GlassCard>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <GlassCard variant="default">
        <GlassCardHeader>
          <GlassCardTitle>Default GlassCard</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Default glass effect</p>
        </GlassCardContent>
      </GlassCard>
      <GlassCard variant="outline">
        <GlassCardHeader>
          <GlassCardTitle>Outline GlassCard</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Outline variant with border</p>
        </GlassCardContent>
      </GlassCard>
      <GlassCard variant="solid">
        <GlassCardHeader>
          <GlassCardTitle>Solid GlassCard</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Solid background variant</p>
        </GlassCardContent>
      </GlassCard>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    interactive: true,
    onClick: action('card-clicked'),
    onMouseEnter: action('card-mouse-enter'),
    onMouseLeave: action('card-mouse-leave'),
    children: (
      <>
        <GlassCardHeader>
          <GlassCardTitle>Interactive GlassCard</GlassCardTitle>
          <GlassCardDescription>Click me to see the interaction</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>This card has hover and click effects</p>
        </GlassCardContent>
      </>
    ),
  },
};

export const LiquidEffect: Story = {
  args: {
    liquid: true,
    children: (
      <>
        <GlassCardHeader>
          <GlassCardTitle>Liquid Glass GlassCard</GlassCardTitle>
          <GlassCardDescription>With flowing animation effect</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>This card has a liquid flow animation</p>
        </GlassCardContent>
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: (
      <>
        <GlassCardHeader>
          <GlassCardTitle>Loading GlassCard</GlassCardTitle>
          <GlassCardDescription>This card is in loading state</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Content will appear when loading is complete</p>
        </GlassCardContent>
      </>
    ),
  },
};

export const GlassIntensities: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <GlassCard glass="light" size="md">
        <GlassCardHeader>
          <GlassCardTitle>Light Glass</GlassCardTitle>
          <GlassCardDescription>Subtle transparency</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Light glass effect with minimal blur and transparency.</p>
        </GlassCardContent>
      </GlassCard>
      
      <GlassCard glass="medium" size="md">
        <GlassCardHeader>
          <GlassCardTitle>Medium Glass</GlassCardTitle>
          <GlassCardDescription>Balanced effect</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Medium glass effect with balanced blur and transparency.</p>
        </GlassCardContent>
      </GlassCard>
      
      <GlassCard glass="heavy" size="md">
        <GlassCardHeader>
          <GlassCardTitle>Heavy Glass</GlassCardTitle>
          <GlassCardDescription>Strong effect</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Heavy glass effect with strong blur and transparency.</p>
        </GlassCardContent>
      </GlassCard>
    </div>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GlassCard liquid interactive>
        <GlassCardHeader>
          <GlassCardTitle>Feature 1</GlassCardTitle>
          <GlassCardDescription>Amazing liquid glass effect</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>This card demonstrates the full liquid glass experience with interactive hover effects.</p>
        </GlassCardContent>
        <GlassCardFooter>
          <GlassButton variant="primary" size="sm">Learn More</GlassButton>
        </GlassCardFooter>
      </GlassCard>
      
      <GlassCard variant="outline" interactive>
        <GlassCardHeader>
          <GlassCardTitle>Feature 2</GlassCardTitle>
          <GlassCardDescription>Clean outline design</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Outline variant with subtle glass effects on hover.</p>
        </GlassCardContent>
        <GlassCardFooter>
          <GlassButton variant="secondary" size="sm">Get Started</GlassButton>
        </GlassCardFooter>
      </GlassCard>
      
      <GlassCard variant="solid" interactive>
        <GlassCardHeader>
          <GlassCardTitle>Feature 3</GlassCardTitle>
          <GlassCardDescription>Solid background style</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Solid variant with clean, modern appearance.</p>
        </GlassCardContent>
        <GlassCardFooter>
          <GlassButton variant="accent" size="sm">Explore</GlassButton>
        </GlassCardFooter>
      </GlassCard>
    </div>
  ),
};

export const GlassEffectShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Glass Effect Showcase</h2>
        <p className="text-white/80 text-lg">在不同背景下的玻璃效果展示</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">輕度玻璃效果</h3>
           <GlassCard glass="light" size="lg">
            <GlassCardHeader>
              <GlassCardTitle>Light Glass</GlassCardTitle>
              <GlassCardDescription>Subtle transparency and blur</GlassCardDescription>
            </GlassCardHeader>
            <GlassCardContent>
              <p>輕度玻璃效果適合需要保持內容清晰度的場景，透明度較低，模糊程度較輕。</p>
            </GlassCardContent>
          </GlassCard>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">中度玻璃效果</h3>
           <GlassCard glass="medium" size="lg">
            <GlassCardHeader>
              <GlassCardTitle>Medium Glass</GlassCardTitle>
              <GlassCardDescription>Balanced transparency and blur</GlassCardDescription>
            </GlassCardHeader>
            <GlassCardContent>
              <p>中度玻璃效果提供平衡的透明度和模糊效果，適合大多數使用場景。</p>
            </GlassCardContent>
          </GlassCard>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">重度玻璃效果</h3>
           <GlassCard glass="heavy" size="lg">
            <GlassCardHeader>
              <GlassCardTitle>Heavy Glass</GlassCardTitle>
              <GlassCardDescription>Strong transparency and blur</GlassCardDescription>
            </GlassCardHeader>
            <GlassCardContent>
              <p>重度玻璃效果提供高透明度和強模糊效果，創造強烈的視覺衝擊。</p>
            </GlassCardContent>
          </GlassCard>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">液態流動效果</h3>
          <GlassCard liquid size="lg">
            <GlassCardHeader>
              <GlassCardTitle>Liquid Flow</GlassCardTitle>
              <GlassCardDescription>Dynamic flowing animation</GlassCardDescription>
            </GlassCardHeader>
            <GlassCardContent>
              <p>液態流動效果添加了動態的流動動畫，讓玻璃效果更加生動有趣。</p>
            </GlassCardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  ),
};
