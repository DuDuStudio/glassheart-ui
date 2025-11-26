import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { GlassButton, GlassButtonGroup } from './GlassButton';
import './GlassButton.css';

const meta: Meta<typeof GlassButton> = {
  title: 'Components/GlassButton',
  component: GlassButton,
  parameters: {
    layout: 'centered',
    interactions: {
      enable: true,
      include: ['click', 'change', 'focus', 'blur', 'mouseenter', 'mouseleave'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'accent', 'destructive', 'outline', 'ghost', 'link'],
    },
    shape: {
      control: { type: 'select' },
      options: ['default', 'circle', 'pill'],
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
    liquidGlassOptions: {
      control: { type: 'object' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onClick: {
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    onClick: action('clicked'),
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
      <GlassButton liquidGlass>Liquid Glass Button</GlassButton>
      <GlassButton variant="primary" liquidGlass>Primary Liquid Glass</GlassButton>
      <GlassButton variant="accent" liquidGlass>Accent Liquid Glass</GlassButton>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Shape</h3>
        <div className="flex gap-4 flex-wrap">
          <GlassButton variant="primary">Default</GlassButton>
          <GlassButton variant="secondary">Default</GlassButton>
          <GlassButton variant="accent">Default</GlassButton>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Circle Shape (Icon/Image)</h3>
        <div className="flex gap-4 flex-wrap items-center">
          <GlassButton variant="primary" shape="circle" size="sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </GlassButton>
          <GlassButton variant="secondary" shape="circle" size="md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </GlassButton>
          <GlassButton variant="accent" shape="circle" size="lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </GlassButton>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Pill Shape (Icon/Text/Image)</h3>
        <div className="flex gap-4 flex-wrap">
          <GlassButton variant="primary" shape="pill">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Item
          </GlassButton>
          <GlassButton variant="secondary" shape="pill">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Profile
          </GlassButton>
          <GlassButton variant="accent" shape="pill">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Like
          </GlassButton>
        </div>
      </div>
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

export const WithInteractions: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Interactive Buttons</h3>
      <div className="flex gap-4 flex-wrap">
        <GlassButton 
          variant="primary" 
          liquidGlass 
          onClick={action('primary-clicked')}
        >
          Click Me
        </GlassButton>
        <GlassButton 
          variant="secondary" 
          liquidGlass 
          onClick={action('secondary-clicked')}
        >
          Also Clickable
        </GlassButton>
        <GlassButton 
          variant="accent" 
          liquidGlass 
          onClick={action('accent-clicked')}
        >
          Interactive
        </GlassButton>
      </div>
    </div>
  ),
};

export const InteractionsDemo: Story = {
  parameters: {
    interactions: {
      enable: true,
    },
  },
  render: () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Interactions Demo</h3>
      <div className="flex gap-4 flex-wrap">
        <GlassButton 
          variant="primary" 
          liquidGlass 
          onClick={action('primary-interaction')}
        >
          Primary Interaction
        </GlassButton>
        <GlassButton 
          variant="secondary" 
          liquidGlass 
          onClick={action('secondary-interaction')}
        >
          Secondary Interaction
        </GlassButton>
        <GlassButton 
          variant="accent" 
          liquidGlass 
          onClick={action('accent-interaction')}
        >
          Accent Interaction
        </GlassButton>
      </div>
      <p className="text-white/80 text-sm">
        Click the buttons above to see interactions in the Actions panel.
      </p>
    </div>
  ),
};

export const InteractionsTest: Story = {
  parameters: {
    interactions: {
      enable: true,
      include: ['click', 'change', 'focus', 'blur', 'mouseenter', 'mouseleave'],
    },
  },
  render: () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Interactions Test</h3>
      <div className="flex gap-4 flex-wrap">
        <GlassButton 
          variant="primary" 
          liquidGlass 
          onClick={action('primary-interaction')}
        >
          Primary Interaction
        </GlassButton>
        <GlassButton 
          variant="secondary" 
          liquidGlass 
          onClick={action('secondary-interaction')}
        >
          Secondary Interaction
        </GlassButton>
        <GlassButton 
          variant="accent" 
          liquidGlass 
          onClick={action('accent-interaction')}
        >
          Accent Interaction
        </GlassButton>
      </div>
      <p className="text-white/80 text-sm">
        Click the buttons above to see interactions in the Interactions panel.
      </p>
    </div>
  ),
};