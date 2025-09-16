import type { Meta, StoryObj } from '@storybook/react';
import { Input, Textarea, InputGroup, FloatingLabel } from './Input';
import { Button } from '../Button/Button';
import './Input.css';
import '../Button/Button.css';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
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
      <Input size="xs" placeholder="Extra Small" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
      <Input size="xl" placeholder="Extra Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input variant="default" placeholder="Default variant" />
      <Input variant="outline" placeholder="Outline variant" />
      <Input variant="solid" placeholder="Solid variant" />
    </div>
  ),
};

export const GlassIntensities: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input glass="light" placeholder="Light glass" />
      <Input glass="medium" placeholder="Medium glass" />
      <Input glass="heavy" placeholder="Heavy glass" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input
        placeholder="Search..."
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
      />
      <Input
        placeholder="Email address"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        }
      />
      <Input
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

export const WithButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input
        placeholder="Enter email"
        button={<Button size="sm">Subscribe</Button>}
      />
      <Input
        placeholder="Search products"
        button={
          <Button size="sm" variant="outline">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Button>
        }
      />
    </div>
  ),
};

export const TextareaStory: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Textarea placeholder="Enter your message..." />
      <Textarea size="lg" placeholder="Large textarea" />
    </div>
  ),
};

export const InputGroups: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <InputGroup label="Username" help="Choose a unique username">
        <Input placeholder="Enter username" />
      </InputGroup>
      
      <InputGroup label="Email" error="Please enter a valid email address">
        <Input type="email" placeholder="Enter email" error />
      </InputGroup>
      
      <InputGroup label="Password" required>
        <Input type="password" placeholder="Enter password" />
      </InputGroup>
    </div>
  ),
};

export const FloatingLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <FloatingLabel label="Email Address">
        <Input type="email" placeholder=" " />
      </FloatingLabel>
      
      <FloatingLabel label="Full Name" required>
        <Input placeholder=" " />
      </FloatingLabel>
      
      <FloatingLabel label="Message" help="Tell us about your project">
        <Textarea placeholder=" " />
      </FloatingLabel>
    </div>
  ),
};

export const LiquidEffect: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input liquid placeholder="Liquid glass input" />
      <Textarea liquid placeholder="Liquid glass textarea" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input placeholder="Normal state" />
      <Input placeholder="Disabled state" disabled />
      <Input placeholder="Error state" error />
      <Input placeholder="Focused state" autoFocus />
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
          <FloatingLabel label="First Name" required>
            <Input placeholder=" " />
          </FloatingLabel>
          <FloatingLabel label="Last Name" required>
            <Input placeholder=" " />
          </FloatingLabel>
        </div>
        
        <FloatingLabel label="Email Address" required>
          <Input type="email" placeholder=" " />
        </FloatingLabel>
        
        <FloatingLabel label="Company">
          <Input placeholder=" " />
        </FloatingLabel>
        
        <FloatingLabel label="Message" required>
          <Textarea placeholder=" " rows={4} />
        </FloatingLabel>
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">Cancel</Button>
        <Button variant="primary" className="flex-1">Send Message</Button>
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
            <Input glass="light" placeholder="Light glass input" />
            <Input glass="medium" placeholder="Medium glass input" />
            <Input glass="heavy" placeholder="Heavy glass input" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">液態流動效果</h3>
          <div className="space-y-4 w-80">
            <Input liquid placeholder="Liquid glass input" />
            <Textarea liquid placeholder="Liquid glass textarea" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">不同變體效果</h3>
          <div className="space-y-4 w-80">
            <Input variant="default" placeholder="Default variant" />
            <Input variant="outline" placeholder="Outline variant" />
            <Input variant="solid" placeholder="Solid variant" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">帶圖標的輸入框</h3>
          <div className="space-y-4 w-80">
            <Input
              placeholder="Search..."
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
            <Input
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
