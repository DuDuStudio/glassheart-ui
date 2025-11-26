import type { Meta, StoryObj } from '@storybook/react';
import { GlassButton, GlassButtonGroup } from './GlassButton';
import './GlassButton.css';

const meta: Meta<typeof GlassButton> = {
  title: 'Components/GlassButton',
  component: GlassButton,
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
    liquidGlass: {
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
      <GlassButton variant="default">Default</GlassButton>
      <GlassButton variant="primary">Primary</GlassButton>
      <GlassButton variant="secondary">Secondary</GlassButton>
      <GlassButton variant="accent">Accent</GlassButton>
      <GlassButton variant="destructive">Destructive</GlassButton>
      <GlassButton variant="outline">Outline</GlassButton>
      <GlassButton variant="ghost">Ghost</GlassButton>
      <GlassButton variant="link">Link</GlassButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <GlassButton size="xs">Extra Small</GlassButton>
      <GlassButton size="sm">Small</GlassButton>
      <GlassButton size="md">Medium</GlassButton>
      <GlassButton size="lg">Large</GlassButton>
      <GlassButton size="xl">Extra Large</GlassButton>
    </div>
  ),
};

export const GlassIntensities: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <GlassButton glass="light">Light Glass</GlassButton>
      <GlassButton glass="medium">Medium Glass</GlassButton>
      <GlassButton glass="heavy">Heavy Glass</GlassButton>
    </div>
  ),
};

export const LiquidEffect: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <GlassButton liquidGlass>Liquid Button</GlassButton>
      <GlassButton variant="primary" liquidGlass>Primary Liquid</GlassButton>
      <GlassButton variant="accent" liquidGlass>Accent Liquid</GlassButton>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <GlassButton>Normal</GlassButton>
      <GlassButton loading>Loading</GlassButton>
      <GlassButton disabled>Disabled</GlassButton>
    </div>
  ),
};

export const ButtonGroupStory: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <GlassButtonGroup>
        <GlassButton variant="outline">First</GlassButton>
        <GlassButton variant="outline">Middle</GlassButton>
        <GlassButton variant="outline">Last</GlassButton>
      </GlassButtonGroup>
      
      <GlassButtonGroup vertical>
        <GlassButton variant="outline">Top</GlassButton>
        <GlassButton variant="outline">Middle</GlassButton>
        <GlassButton variant="outline">Bottom</GlassButton>
      </GlassButtonGroup>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <GlassButton>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Item
      </GlassButton>
      <GlassButton variant="primary">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Save Changes
      </GlassButton>
      <GlassButton variant="destructive">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </GlassButton>
    </div>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex gap-4 flex-wrap">
        <GlassButton variant="primary" liquidGlass size="lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Get Started
        </GlassButton>
        <GlassButton variant="outline" size="lg">
          Learn More
        </GlassButton>
      </div>
      
      <div className="flex gap-2">
        <GlassButton variant="outline" size="sm">Cancel</GlassButton>
        <GlassButton variant="primary" size="sm">Save Draft</GlassButton>
        <GlassButton variant="accent" size="sm">Publish</GlassButton>
      </div>
      
      <GlassButtonGroup>
        <GlassButton variant="outline" size="sm">Previous</GlassButton>
        <GlassButton variant="outline" size="sm">Next</GlassButton>
      </GlassButtonGroup>
    </div>
  ),
};
