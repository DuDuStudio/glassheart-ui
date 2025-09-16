import type { Meta, StoryObj } from '@storybook/react';
import { GlassInput, GlassTextarea, GlassInputGroup, GlassFloatingLabel } from './GlassInput';
import { GlassButton } from '../GlassButton/GlassButton';
import './GlassInput.css';
import '../GlassButton/GlassButton.css';

const meta: Meta<typeof GlassInput> = {
  title: 'Components/GlassInput',
  component: GlassInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'solid'],
    },
    glass: {
      control: { type: 'select' },
      options: ['light', 'medium', 'heavy'],
    },
    liquid: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <GlassInput size="xs" placeholder="Extra Small" />
      <GlassInput size="sm" placeholder="Small" />
      <GlassInput size="md" placeholder="Medium" />
      <GlassInput size="lg" placeholder="Large" />
      <GlassInput size="xl" placeholder="Extra Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <GlassInput variant="default" placeholder="Default variant" />
      <GlassInput variant="outline" placeholder="Outline variant" />
      <GlassInput variant="solid" placeholder="Solid variant" />
    </div>
  ),
};

export const GlassIntensities: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <GlassInput glass="light" placeholder="Light glass" />
      <GlassInput glass="medium" placeholder="Medium glass" />
      <GlassInput glass="heavy" placeholder="Heavy glass" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <GlassInput
        placeholder="Search..."
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
      />
      <GlassInput
        placeholder="Email address"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        }
      />
      <GlassInput
        placeholder="Password"
        type="password"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        }
        iconPosition="right"
      />
    </div>
  ),
};

export const WithGlassButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <GlassInput
        placeholder="Enter email"
        button={<GlassButton size="sm">Subscribe</GlassButton>}
      />
      <GlassInput
        placeholder="Search products"
        button={
          <GlassButton size="sm" variant="outline">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </GlassButton>
        }
      />
    </div>
  ),
};

export const TextareaStory: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <GlassTextarea placeholder="Enter your message..." />
      <GlassTextarea size="lg" placeholder="Large textarea" />
    </div>
  ),
};

export const InputGroups: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <GlassInputGroup label="Username" help="Choose a unique username">
        <GlassInput placeholder="Enter username" />
      </GlassInputGroup>
      
      <GlassInputGroup label="Email" error="Please enter a valid email address">
        <GlassInput type="email" placeholder="Enter email" error />
      </GlassInputGroup>
      
      <GlassInputGroup label="Password" required>
        <GlassInput type="password" placeholder="Enter password" />
      </GlassInputGroup>
    </div>
  ),
};

export const FloatingLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <GlassFloatingLabel label="Email Address" htmlFor="email">
        <GlassInput type="email" placeholder=" " />
      </GlassFloatingLabel>
      
      <GlassFloatingLabel label="Full Name" htmlFor="fullname">
        <GlassInput placeholder=" " />
      </GlassFloatingLabel>
      
      <GlassFloatingLabel label="Message" htmlFor="message">
        <GlassTextarea placeholder=" " />
      </GlassFloatingLabel>
    </div>
  ),
};

export const LiquidEffect: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <GlassInput liquid placeholder="Liquid glass input" />
      <GlassTextarea liquid placeholder="Liquid glass textarea" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <GlassInput placeholder="Normal state" />
      <GlassInput placeholder="Disabled state" disabled />
      <GlassInput placeholder="Error state" error />
      <GlassInput placeholder="Focused state" autoFocus />
    </div>
  ),
};

export const ComplexForm: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Contact Form</h2>
        <p className="text-sm text-white/80">Fill out the form below to get in touch</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <GlassFloatingLabel label="First Name" htmlFor="firstname">
            <GlassInput placeholder=" " />
          </GlassFloatingLabel>
          <GlassFloatingLabel label="Last Name" htmlFor="lastname">
            <GlassInput placeholder=" " />
          </GlassFloatingLabel>
        </div>
        
        <GlassFloatingLabel label="Email Address" htmlFor="email">
          <GlassInput type="email" placeholder=" " />
        </GlassFloatingLabel>
        
        <GlassFloatingLabel label="Company" htmlFor="company">
          <GlassInput placeholder=" " />
        </GlassFloatingLabel>
        
        <GlassFloatingLabel label="Message" htmlFor="message">
          <GlassTextarea placeholder=" " rows={4} />
        </GlassFloatingLabel>
      </div>
      
      <div className="flex gap-3">
        <GlassButton variant="outline" className="flex-1">Cancel</GlassButton>
        <GlassButton variant="primary" className="flex-1">Send Message</GlassButton>
      </div>
    </div>
  ),
};

export const GlassEffectShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Input Glass Effects</h2>
        <p className="text-white/80 text-lg">不同玻璃強度的輸入框效果展示</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">玻璃強度對比</h3>
          <div className="space-y-4 w-80">
            <GlassInput glass="light" placeholder="Light glass input" />
            <GlassInput glass="medium" placeholder="Medium glass input" />
            <GlassInput glass="heavy" placeholder="Heavy glass input" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">液態流動效果</h3>
          <div className="space-y-4 w-80">
            <GlassInput liquid placeholder="Liquid glass input" />
            <GlassTextarea liquid placeholder="Liquid glass textarea" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">不同變體效果</h3>
          <div className="space-y-4 w-80">
            <GlassInput variant="default" placeholder="Default variant" />
            <GlassInput variant="outline" placeholder="Outline variant" />
            <GlassInput variant="solid" placeholder="Solid variant" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">帶圖標的輸入框</h3>
          <div className="space-y-4 w-80">
            <GlassInput
              placeholder="Search..."
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
            <GlassInput
              placeholder="Email address"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  ),
};
