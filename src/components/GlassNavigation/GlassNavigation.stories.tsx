import type { Meta, StoryObj } from '@storybook/react';
import { 
  GlassNavigation, 
  GlassNavigationBrand, 
  GlassNavigationMenu, 
  GlassNavigationItem, 
  GlassNavigationToggle 
} from './GlassNavigation';

const meta: Meta<typeof GlassNavigation> = {
  title: 'Components/GlassNavigation',
  component: GlassNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '一個具有玻璃效果的導航組件，支持多種變體、位置和交互效果。',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'transparent', 'solid', 'floating'],
      description: '導航變體',
    },
    glass: {
      control: { type: 'select' },
      options: ['light', 'medium', 'heavy'],
      description: '玻璃效果強度',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: '導航位置',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '導航尺寸',
    },
    sticky: {
      control: { type: 'boolean' },
      description: '是否粘性定位',
    },
    fixed: {
      control: { type: 'boolean' },
      description: '是否固定定位',
    },
    animated: {
      control: { type: 'boolean' },
      description: '是否啟用動畫效果',
    },
    blur: {
      control: { type: 'boolean' },
      description: '是否啟用模糊效果',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: '陰影大小',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: '內邊距',
    },
    rounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: '圓角大小',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Navigation - Based on Figma Design
export const Default: Story = {
  args: {
    variant: 'default',
    glass: 'medium',
    position: 'top',
    size: 'md',
    sticky: true,
  },
  render: (args) => (
    <div style={{ height: '200vh', background: 'transparent' }}>
      <GlassNavigation {...args}>
        <GlassNavigationBrand href="#">
          Dudu
        </GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>
            Home
          </GlassNavigationItem>
          <GlassNavigationItem href="#">
            Works
          </GlassNavigationItem>
          <GlassNavigationItem href="#">
            Labs
          </GlassNavigationItem>
          <GlassNavigationItem href="#">
            Study
          </GlassNavigationItem>
          <GlassNavigationItem href="#">
            About
          </GlassNavigationItem>
        </GlassNavigationMenu>
        <GlassNavigationToggle isOpen={false} onClick={() => {}} />
      </GlassNavigation>
      <div style={{ padding: '2rem', color: '#333' }}>
        <h1>滾動頁面查看粘性導航效果</h1>
        <p>這是一個示例頁面，用於展示導航組件的粘性效果。</p>
      </div>
    </div>
  ),
};

// Different Variants - Based on Figma Design
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', background: 'transparent', minHeight: '100vh', padding: '2rem' }}>
      <GlassNavigation variant="default" glass="medium" position="top" size="md">
        <GlassNavigationBrand href="#">Dudu</GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>Home</GlassNavigationItem>
          <GlassNavigationItem href="#">Works</GlassNavigationItem>
          <GlassNavigationItem href="#">Labs</GlassNavigationItem>
        </GlassNavigationMenu>
      </GlassNavigation>
      
      <GlassNavigation variant="transparent" glass="light" position="top" size="md">
        <GlassNavigationBrand href="#">Transparent</GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>Home</GlassNavigationItem>
          <GlassNavigationItem href="#">Works</GlassNavigationItem>
          <GlassNavigationItem href="#">Labs</GlassNavigationItem>
        </GlassNavigationMenu>
      </GlassNavigation>
      
      <GlassNavigation variant="solid" glass="heavy" position="top" size="md">
        <GlassNavigationBrand href="#">Solid</GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>Home</GlassNavigationItem>
          <GlassNavigationItem href="#">Works</GlassNavigationItem>
          <GlassNavigationItem href="#">Labs</GlassNavigationItem>
        </GlassNavigationMenu>
      </GlassNavigation>
      
      <GlassNavigation variant="floating" glass="medium" position="top" size="md">
        <GlassNavigationBrand href="#">Floating</GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>Home</GlassNavigationItem>
          <GlassNavigationItem href="#">Works</GlassNavigationItem>
          <GlassNavigationItem href="#">Labs</GlassNavigationItem>
        </GlassNavigationMenu>
      </GlassNavigation>
    </div>
  ),
};

// Different Positions
export const Positions: Story = {
  render: () => (
    <div style={{ position: 'relative', height: '100vh', background: 'transparent' }}>
      <GlassNavigation position="top" glass="medium" size="md">
        <GlassNavigationBrand href="#">Top Navigation</GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>首頁</GlassNavigationItem>
          <GlassNavigationItem href="#">產品</GlassNavigationItem>
        </GlassNavigationMenu>
      </GlassNavigation>
      
      <GlassNavigation position="left" glass="medium" size="md" style={{ width: '200px' }}>
        <GlassNavigationBrand href="#">Left Navigation</GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>首頁</GlassNavigationItem>
          <GlassNavigationItem href="#">產品</GlassNavigationItem>
          <GlassNavigationItem href="#">服務</GlassNavigationItem>
        </GlassNavigationMenu>
      </GlassNavigation>
      
      <GlassNavigation position="right" glass="medium" size="md" style={{ width: '200px' }}>
        <GlassNavigationBrand href="#">Right Navigation</GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>首頁</GlassNavigationItem>
          <GlassNavigationItem href="#">產品</GlassNavigationItem>
          <GlassNavigationItem href="#">服務</GlassNavigationItem>
        </GlassNavigationMenu>
      </GlassNavigation>
      
      <GlassNavigation position="bottom" glass="medium" size="md">
        <GlassNavigationBrand href="#">Bottom Navigation</GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>首頁</GlassNavigationItem>
          <GlassNavigationItem href="#">產品</GlassNavigationItem>
        </GlassNavigationMenu>
      </GlassNavigation>
    </div>
  ),
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'transparent' }}>
      <GlassNavigation size="sm" glass="medium" position="top">
        <GlassNavigationBrand href="#">Small Navigation</GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>首頁</GlassNavigationItem>
          <GlassNavigationItem href="#">產品</GlassNavigationItem>
        </GlassNavigationMenu>
      </GlassNavigation>
      
      <GlassNavigation size="md" glass="medium" position="top">
        <GlassNavigationBrand href="#">Medium Navigation</GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>首頁</GlassNavigationItem>
          <GlassNavigationItem href="#">產品</GlassNavigationItem>
        </GlassNavigationMenu>
      </GlassNavigation>
      
      <GlassNavigation size="lg" glass="medium" position="top">
        <GlassNavigationBrand href="#">Large Navigation</GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>首頁</GlassNavigationItem>
          <GlassNavigationItem href="#">產品</GlassNavigationItem>
        </GlassNavigationMenu>
      </GlassNavigation>
    </div>
  ),
};

// With Icons and Badges
export const WithIconsAndBadges: Story = {
  args: {
    variant: 'default',
    glass: 'medium',
    position: 'top',
    size: 'md',
  },
  render: (args) => (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <GlassNavigation {...args}>
        <GlassNavigationBrand href="#">
          🎨 GlassHeartUI
        </GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active icon="🏠">
            首頁
          </GlassNavigationItem>
          <GlassNavigationItem href="#" icon="📦" badge="3">
            產品
          </GlassNavigationItem>
          <GlassNavigationItem href="#" icon="⚙️">
            服務
          </GlassNavigationItem>
          <GlassNavigationItem href="#" icon="📞" badge="NEW">
            聯絡我們
          </GlassNavigationItem>
        </GlassNavigationMenu>
        <GlassNavigationToggle isOpen={false} onClick={() => {}} />
      </GlassNavigation>
    </div>
  ),
};

// Liquid Flow Effect
export const LiquidFlow: Story = {
  args: {
    variant: 'default',
    glass: 'medium',
    position: 'top',
    size: 'md',
    liquidGlass: true,
  },
  render: (args) => (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <GlassNavigation {...args}>
        <GlassNavigationBrand href="#">
          Liquid Navigation
        </GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>首頁</GlassNavigationItem>
          <GlassNavigationItem href="#">產品</GlassNavigationItem>
          <GlassNavigationItem href="#">服務</GlassNavigationItem>
          <GlassNavigationItem href="#">關於我們</GlassNavigationItem>
        </GlassNavigationMenu>
      </GlassNavigation>
    </div>
  ),
};

// Animated Navigation
export const Animated: Story = {
  args: {
    variant: 'floating',
    glass: 'medium',
    position: 'top',
    size: 'md',
    animated: true,
  },
  render: (args) => (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <GlassNavigation {...args}>
        <GlassNavigationBrand href="#">
          Animated Navigation
        </GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>首頁</GlassNavigationItem>
          <GlassNavigationItem href="#">產品</GlassNavigationItem>
          <GlassNavigationItem href="#">服務</GlassNavigationItem>
        </GlassNavigationMenu>
      </GlassNavigation>
    </div>
  ),
};

// Mobile Navigation
export const MobileNavigation: Story = {
  args: {
    variant: 'default',
    glass: 'medium',
    position: 'top',
    size: 'md',
  },
  render: (args) => (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <GlassNavigation {...args}>
        <GlassNavigationBrand href="#">
          Mobile Nav
        </GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>首頁</GlassNavigationItem>
          <GlassNavigationItem href="#">產品</GlassNavigationItem>
          <GlassNavigationItem href="#">服務</GlassNavigationItem>
          <GlassNavigationItem href="#">關於我們</GlassNavigationItem>
          <GlassNavigationItem href="#">聯絡我們</GlassNavigationItem>
        </GlassNavigationMenu>
        <GlassNavigationToggle isOpen={false} onClick={() => {}} />
      </GlassNavigation>
      <div style={{ padding: '2rem', color: '#333' }}>
        <h1>移動端導航示例</h1>
        <p>在移動設備上查看漢堡菜單效果</p>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Complex Navigation
export const ComplexNavigation: Story = {
  args: {
    variant: 'default',
    glass: 'medium',
    position: 'top',
    size: 'lg',
    sticky: true,
    liquidGlass: true,
  },
  render: (args) => (
    <div style={{ background: 'transparent', minHeight: '200vh' }}>
      <GlassNavigation {...args}>
        <GlassNavigationBrand href="#">
          🚀 GlassHeartUI
        </GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active icon="🏠">
            首頁
          </GlassNavigationItem>
          <GlassNavigationItem href="#" icon="📦" badge="5">
            產品
          </GlassNavigationItem>
          <GlassNavigationItem href="#" icon="⚙️">
            服務
          </GlassNavigationItem>
          <GlassNavigationItem href="#" icon="📚">
            文檔
          </GlassNavigationItem>
          <GlassNavigationItem href="#" icon="💬">
            社群
          </GlassNavigationItem>
          <GlassNavigationItem href="#" icon="📞" badge="NEW">
            聯絡我們
          </GlassNavigationItem>
        </GlassNavigationMenu>
        <GlassNavigationToggle isOpen={false} onClick={() => {}} />
      </GlassNavigation>
      <div style={{ padding: '2rem', color: '#333' }}>
        <h1>複雜導航示例</h1>
        <p>這是一個包含多種功能的複雜導航示例，包括圖標、徽章、粘性效果等。</p>
        <div style={{ height: '100vh' }}></div>
        <h2>滾動查看粘性效果</h2>
        <p>導航欄會在滾動時保持可見，並顯示不同的樣式。</p>
      </div>
    </div>
  ),
};

// Figma Design Recreation
export const FigmaDesign: Story = {
  args: {
    variant: 'default',
    glass: 'medium',
    position: 'top',
    size: 'md',
  },
  render: (args) => (
    <div style={{ 
      background: 'transparent', 
      minHeight: '100vh',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem'
    }}>
      <GlassNavigation {...args}>
        <GlassNavigationBrand href="#">
          Dudu
        </GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>
            Home
          </GlassNavigationItem>
          <GlassNavigationItem href="#">
            Works
          </GlassNavigationItem>
          <GlassNavigationItem href="#">
            Labs
          </GlassNavigationItem>
          <GlassNavigationItem href="#">
            Study
          </GlassNavigationItem>
          <GlassNavigationItem href="#">
            About
          </GlassNavigationItem>
        </GlassNavigationMenu>
        <GlassNavigationToggle isOpen={false} onClick={() => {}} />
      </GlassNavigation>
      
      <div style={{ color: '#333', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 1rem 0', fontSize: '2rem' }}>Figma Design Recreation</h1>
        <p style={{ margin: '0', opacity: 0.8 }}>
          完全按照 Figma 設計重新製作的導航組件
        </p>
      </div>
    </div>
  ),
};

// Real Image Background
export const RealImageBackground: Story = {
  args: {
    variant: 'default',
    glass: 'medium',
    position: 'top',
    size: 'md',
    sticky: true,
  },
  render: (args) => (
    <div style={{ 
      background: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80") center/cover',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <GlassNavigation {...args}>
        <GlassNavigationBrand href="#">
          Dudu
        </GlassNavigationBrand>
        <GlassNavigationMenu>
          <GlassNavigationItem href="#" active>
            Home
          </GlassNavigationItem>
          <GlassNavigationItem href="#">
            Works
          </GlassNavigationItem>
          <GlassNavigationItem href="#">
            Labs
          </GlassNavigationItem>
          <GlassNavigationItem href="#">
            Study
          </GlassNavigationItem>
          <GlassNavigationItem href="#">
            About
          </GlassNavigationItem>
        </GlassNavigationMenu>
        <GlassNavigationToggle isOpen={false} onClick={() => {}} />
      </GlassNavigation>
      
      <div style={{ 
        padding: '4rem 2rem', 
        color: 'white', 
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ margin: '0 0 1rem 0', fontSize: '3rem', fontWeight: 'bold' }}>
          Glass Navigation on Real Image
        </h1>
        <p style={{ margin: '0', fontSize: '1.2rem', opacity: 0.9 }}>
          在真實圖片背景上展示玻璃導航效果
        </p>
      </div>
    </div>
  ),
};

// Dark Theme
export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: 'rgb(var(--gh-background))', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    variant: 'default',
    glass: 'medium',
    position: 'top',
    size: 'md',
  },
  render: (args) => (
    <GlassNavigation {...args}>
      <GlassNavigationBrand href="#">
        Dark Navigation
      </GlassNavigationBrand>
      <GlassNavigationMenu>
        <GlassNavigationItem href="#" active>首頁</GlassNavigationItem>
        <GlassNavigationItem href="#">產品</GlassNavigationItem>
        <GlassNavigationItem href="#">服務</GlassNavigationItem>
      </GlassNavigationMenu>
    </GlassNavigation>
  ),
};
