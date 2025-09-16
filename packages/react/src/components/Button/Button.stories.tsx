import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonGroup } from './Button';
import './Button.css';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'accent', 'destructive', 'outline', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    glass: {
      control: { type: 'select' },
      options: ['light', 'medium', 'heavy'],
    },
    liquid: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const GlassIntensities: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button glass="light">Light Glass</Button>
      <Button glass="medium">Medium Glass</Button>
      <Button glass="heavy">Heavy Glass</Button>
    </div>
  ),
};

export const LiquidEffect: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button liquid>Liquid Button</Button>
      <Button variant="primary" liquid>Primary Liquid</Button>
      <Button variant="accent" liquid>Accent Liquid</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button>Normal</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

export const ButtonGroupStory: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ButtonGroup>
        <Button variant="outline">First</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Last</Button>
      </ButtonGroup>
      
      <ButtonGroup vertical>
        <Button variant="outline">Top</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Bottom</Button>
      </ButtonGroup>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Item
      </Button>
      <Button variant="primary">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Save Changes
      </Button>
      <Button variant="destructive">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </Button>
    </div>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex gap-4 flex-wrap">
        <Button variant="primary" liquid size="lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Get Started
        </Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Save Draft</Button>
        <Button variant="accent" size="sm">Publish</Button>
      </div>
      
      <ButtonGroup>
        <Button variant="outline" size="sm">Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </ButtonGroup>
    </div>
  ),
};

export const GlassEffectShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Button Glass Effects</h2>
        <p className="text-white/80 text-lg">不同玻璃強度的按鈕效果展示</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">玻璃強度對比</h3>
          <div className="flex gap-4 flex-wrap">
            <Button glass="light" size="lg">Light Glass</Button>
            <Button glass="medium" size="lg">Medium Glass</Button>
            <Button glass="heavy" size="lg">Heavy Glass</Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">液態流動效果</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" liquid size="lg">Primary Liquid</Button>
            <Button variant="accent" liquid size="lg">Accent Liquid</Button>
            <Button variant="secondary" liquid size="lg">Secondary Liquid</Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">不同變體效果</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="default" liquid>Default</Button>
            <Button variant="primary" liquid>Primary</Button>
            <Button variant="secondary" liquid>Secondary</Button>
            <Button variant="accent" liquid>Accent</Button>
            <Button variant="destructive" liquid>Destructive</Button>
            <Button variant="outline" liquid>Outline</Button>
            <Button variant="ghost" liquid>Ghost</Button>
            <Button variant="link" liquid>Link</Button>
          </div>
        </div>
      </div>
    </div>
  ),
};
