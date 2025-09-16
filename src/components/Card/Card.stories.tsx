import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../Button/Button';
import './Card.css';
import '../Button/Button.css';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
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
    interactive: {
      control: { type: 'boolean' },
    },
    liquid: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content. It can contain any React elements.</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm">Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Card size="sm">
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Small card content</p>
        </CardContent>
      </Card>
      <Card size="md">
        <CardHeader>
          <CardTitle>Medium Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Medium card content</p>
        </CardContent>
      </Card>
      <Card size="lg">
        <CardHeader>
          <CardTitle>Large Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Large card content</p>
        </CardContent>
      </Card>
      <Card size="xl">
        <CardHeader>
          <CardTitle>Extra Large Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Extra large card content</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Default glass effect</p>
        </CardContent>
      </Card>
      <Card variant="outline">
        <CardHeader>
          <CardTitle>Outline Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Outline variant with border</p>
        </CardContent>
      </Card>
      <Card variant="solid">
        <CardHeader>
          <CardTitle>Solid Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Solid background variant</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    interactive: true,
    children: (
      <>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Click me to see the interaction</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has hover and click effects</p>
        </CardContent>
      </>
    ),
  },
};

export const LiquidEffect: Story = {
  args: {
    liquid: true,
    children: (
      <>
        <CardHeader>
          <CardTitle>Liquid Glass Card</CardTitle>
          <CardDescription>With flowing animation effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a liquid flow animation</p>
        </CardContent>
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: (
      <>
        <CardHeader>
          <CardTitle>Loading Card</CardTitle>
          <CardDescription>This card is in loading state</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content will appear when loading is complete</p>
        </CardContent>
      </>
    ),
  },
};

export const ComplexExample: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card liquid interactive>
        <CardHeader>
          <CardTitle>Feature 1</CardTitle>
          <CardDescription>Amazing liquid glass effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates the full liquid glass experience with interactive hover effects.</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm">Learn More</Button>
        </CardFooter>
      </Card>
      
      <Card variant="outline" interactive>
        <CardHeader>
          <CardTitle>Feature 2</CardTitle>
          <CardDescription>Clean outline design</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Outline variant with subtle glass effects on hover.</p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">Get Started</Button>
        </CardFooter>
      </Card>
      
      <Card variant="solid" interactive>
        <CardHeader>
          <CardTitle>Feature 3</CardTitle>
          <CardDescription>Solid background style</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Solid variant with clean, modern appearance.</p>
        </CardContent>
        <CardFooter>
          <Button variant="accent" size="sm">Explore</Button>
        </CardFooter>
      </Card>
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
          <Card glass="light" size="lg">
            <CardHeader>
              <CardTitle>Light Glass</CardTitle>
              <CardDescription>Subtle transparency and blur</CardDescription>
            </CardHeader>
            <CardContent>
              <p>輕度玻璃效果適合需要保持內容清晰度的場景，透明度較低，模糊程度較輕。</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">中度玻璃效果</h3>
          <Card glass="medium" size="lg">
            <CardHeader>
              <CardTitle>Medium Glass</CardTitle>
              <CardDescription>Balanced transparency and blur</CardDescription>
            </CardHeader>
            <CardContent>
              <p>中度玻璃效果提供平衡的透明度和模糊效果，適合大多數使用場景。</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">重度玻璃效果</h3>
          <Card glass="heavy" size="lg">
            <CardHeader>
              <CardTitle>Heavy Glass</CardTitle>
              <CardDescription>Strong transparency and blur</CardDescription>
            </CardHeader>
            <CardContent>
              <p>重度玻璃效果提供高透明度和強模糊效果，創造強烈的視覺衝擊。</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">液態流動效果</h3>
          <Card liquid size="lg">
            <CardHeader>
              <CardTitle>Liquid Flow</CardTitle>
              <CardDescription>Dynamic flowing animation</CardDescription>
            </CardHeader>
            <CardContent>
              <p>液態流動效果添加了動態的流動動畫，讓玻璃效果更加生動有趣。</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
};
