import type { Meta, StoryObj } from '@storybook/react';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent, GlassCardFooter } from './GlassCard';
import { GlassButton } from '../GlassButton/GlassButton';
import './GlassCard.css';
import '../GlassButton/GlassButton.css';

const meta: Meta<typeof GlassCard> = {
  title: 'Components/GlassCard',
  component: GlassCard,
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
    liquidGlass: {
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
        <GlassCardHeader>
          <GlassCardTitle>Card Title</GlassCardTitle>
          <GlassCardDescription>Card description goes here</GlassCardDescription>
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
          <GlassCardTitle>Small Card</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Small card content</p>
        </GlassCardContent>
      </GlassCard>
      <GlassCard size="md">
        <GlassCardHeader>
          <GlassCardTitle>Medium Card</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Medium card content</p>
        </GlassCardContent>
      </GlassCard>
      <GlassCard size="lg">
        <GlassCardHeader>
          <GlassCardTitle>Large Card</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Large card content</p>
        </GlassCardContent>
      </GlassCard>
      <GlassCard size="xl">
        <GlassCardHeader>
          <GlassCardTitle>Extra Large Card</GlassCardTitle>
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
          <GlassCardTitle>Default Card</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Default glass effect</p>
        </GlassCardContent>
      </GlassCard>
      <GlassCard variant="outline">
        <GlassCardHeader>
          <GlassCardTitle>Outline Card</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Outline variant with border</p>
        </GlassCardContent>
      </GlassCard>
      <GlassCard variant="solid">
        <GlassCardHeader>
          <GlassCardTitle>Solid Card</GlassCardTitle>
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
    children: (
      <>
        <GlassCardHeader>
          <GlassCardTitle>Interactive Card</GlassCardTitle>
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
    liquidGlass: true,
    children: (
      <>
        <GlassCardHeader>
          <GlassCardTitle>Liquid Glass Card</GlassCardTitle>
          <GlassCardDescription>With flowing animation effect</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>This card has a liquidGlass flow animation</p>
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
          <GlassCardTitle>Loading Card</GlassCardTitle>
          <GlassCardDescription>This card is in loading state</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Content will appear when loading is complete</p>
        </GlassCardContent>
      </>
    ),
  },
};

export const ComplexExample: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GlassCard liquidGlass interactive>
        <GlassCardHeader>
          <GlassCardTitle>Feature 1</GlassCardTitle>
          <GlassCardDescription>Amazing liquidGlass glass effect</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>This card demonstrates the full liquidGlass glass experience with interactive hover effects.</p>
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
