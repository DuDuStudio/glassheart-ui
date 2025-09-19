import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
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
    liquid: {
      control: { type: 'boolean' },
      description: '是否啟用液體流動效果',
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
    width: {
      control: { type: 'select' },
      options: ['auto', 'full', 'fit-content'],
      description: '導航寬度',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: '導航對齊',
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
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
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
          <GlassNavigationToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </GlassNavigation>
        <div style={{ padding: '2rem', color: '#333' }}>
          <h1>滾動頁面查看粘性導航效果</h1>
          <p>這是一個示例頁面，用於展示導航組件的粘性效果。</p>
        </div>
      </div>
    );
  },
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
  render: () => {
    const [currentPosition, setCurrentPosition] = React.useState('top');
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <div style={{ 
        position: 'relative', 
        height: '100vh', 
        background: 'transparent',
        padding: currentPosition === 'left' ? '0 0 0 220px' : 
                 currentPosition === 'right' ? '0 220px 0 0' : 
                 currentPosition === 'bottom' ? '0 0 80px 0' : '0'
      }}>
        <GlassNavigation 
          position={currentPosition as any} 
          glass="medium" 
          size="md"
          style={currentPosition === 'left' || currentPosition === 'right' ? { width: '200px' } : {}}
        >
          <GlassNavigationBrand href="#">{currentPosition.charAt(0).toUpperCase() + currentPosition.slice(1)} Navigation</GlassNavigationBrand>
          <GlassNavigationMenu>
            <GlassNavigationItem href="#" active>首頁</GlassNavigationItem>
            <GlassNavigationItem href="#">產品</GlassNavigationItem>
            <GlassNavigationItem href="#">服務</GlassNavigationItem>
            <GlassNavigationItem href="#">關於我們</GlassNavigationItem>
          </GlassNavigationMenu>
          <GlassNavigationToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </GlassNavigation>
        
        <div style={{ 
          padding: '2rem', 
          color: '#333',
          textAlign: 'center'
        }}>
          <h1>Position 測試</h1>
          <p>當前位置: {currentPosition}</p>
          <div style={{ marginTop: '1rem' }}>
            <button 
              onClick={() => setCurrentPosition('top')}
              style={{ 
                margin: '0.5rem', 
                padding: '0.5rem 1rem', 
                background: currentPosition === 'top' ? '#007bff' : 'rgba(0,123,255,0.1)', 
                border: '1px solid #007bff', 
                borderRadius: '8px', 
                color: currentPosition === 'top' ? 'white' : '#007bff', 
                cursor: 'pointer' 
              }}
            >
              Top
            </button>
            <button 
              onClick={() => setCurrentPosition('bottom')}
              style={{ 
                margin: '0.5rem', 
                padding: '0.5rem 1rem', 
                background: currentPosition === 'bottom' ? '#007bff' : 'rgba(0,123,255,0.1)', 
                border: '1px solid #007bff', 
                borderRadius: '8px', 
                color: currentPosition === 'bottom' ? 'white' : '#007bff', 
                cursor: 'pointer' 
              }}
            >
              Bottom
            </button>
            <button 
              onClick={() => setCurrentPosition('left')}
              style={{ 
                margin: '0.5rem', 
                padding: '0.5rem 1rem', 
                background: currentPosition === 'left' ? '#007bff' : 'rgba(0,123,255,0.1)', 
                border: '1px solid #007bff', 
                borderRadius: '8px', 
                color: currentPosition === 'left' ? 'white' : '#007bff', 
                cursor: 'pointer' 
              }}
            >
              Left
            </button>
            <button 
              onClick={() => setCurrentPosition('right')}
              style={{ 
                margin: '0.5rem', 
                padding: '0.5rem 1rem', 
                background: currentPosition === 'right' ? '#007bff' : 'rgba(0,123,255,0.1)', 
                border: '1px solid #007bff', 
                borderRadius: '8px', 
                color: currentPosition === 'right' ? 'white' : '#007bff', 
                cursor: 'pointer' 
              }}
            >
              Right
            </button>
          </div>
        </div>
      </div>
    );
  },
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

// Width and Alignment Options
export const WidthAndAlignment: Story = {
  render: () => {
    const [currentWidth, setCurrentWidth] = React.useState('full');
    const [currentAlign, setCurrentAlign] = React.useState('center');
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <div style={{ 
        position: 'relative', 
        height: '100vh', 
        background: 'transparent',
        padding: '2rem'
      }}>
        <GlassNavigation 
          width={currentWidth as any}
          align={currentAlign as any}
          glass="medium" 
          position="top"
          size="md"
        >
          <GlassNavigationBrand href="#">{currentWidth} - {currentAlign}</GlassNavigationBrand>
          <GlassNavigationMenu>
            <GlassNavigationItem href="#" active>首頁</GlassNavigationItem>
            <GlassNavigationItem href="#">產品</GlassNavigationItem>
            <GlassNavigationItem href="#">服務</GlassNavigationItem>
          </GlassNavigationMenu>
          <GlassNavigationToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </GlassNavigation>
        
        <div style={{ 
          padding: '2rem', 
          color: '#333',
          textAlign: 'center'
        }}>
          <h1>Width & Alignment 測試</h1>
          <p>當前設置: width={currentWidth}, align={currentAlign}</p>
          
          <div style={{ marginTop: '2rem' }}>
            <h3>Width 選項</h3>
            <button 
              onClick={() => setCurrentWidth('full')}
              style={{ 
                margin: '0.5rem', 
                padding: '0.5rem 1rem', 
                background: currentWidth === 'full' ? '#007bff' : 'rgba(0,123,255,0.1)', 
                border: '1px solid #007bff', 
                borderRadius: '8px', 
                color: currentWidth === 'full' ? 'white' : '#007bff', 
                cursor: 'pointer' 
              }}
            >
              Full Width
            </button>
            <button 
              onClick={() => setCurrentWidth('auto')}
              style={{ 
                margin: '0.5rem', 
                padding: '0.5rem 1rem', 
                background: currentWidth === 'auto' ? '#007bff' : 'rgba(0,123,255,0.1)', 
                border: '1px solid #007bff', 
                borderRadius: '8px', 
                color: currentWidth === 'auto' ? 'white' : '#007bff', 
                cursor: 'pointer' 
              }}
            >
              Auto Width
            </button>
            <button 
              onClick={() => setCurrentWidth('fit-content')}
              style={{ 
                margin: '0.5rem', 
                padding: '0.5rem 1rem', 
                background: currentWidth === 'fit-content' ? '#007bff' : 'rgba(0,123,255,0.1)', 
                border: '1px solid #007bff', 
                borderRadius: '8px', 
                color: currentWidth === 'fit-content' ? 'white' : '#007bff', 
                cursor: 'pointer' 
              }}
            >
              Fit Content
            </button>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <h3>Alignment 選項</h3>
            <button 
              onClick={() => setCurrentAlign('left')}
              style={{ 
                margin: '0.5rem', 
                padding: '0.5rem 1rem', 
                background: currentAlign === 'left' ? '#28a745' : 'rgba(40,167,69,0.1)', 
                border: '1px solid #28a745', 
                borderRadius: '8px', 
                color: currentAlign === 'left' ? 'white' : '#28a745', 
                cursor: 'pointer' 
              }}
            >
              Left
            </button>
            <button 
              onClick={() => setCurrentAlign('center')}
              style={{ 
                margin: '0.5rem', 
                padding: '0.5rem 1rem', 
                background: currentAlign === 'center' ? '#28a745' : 'rgba(40,167,69,0.1)', 
                border: '1px solid #28a745', 
                borderRadius: '8px', 
                color: currentAlign === 'center' ? 'white' : '#28a745', 
                cursor: 'pointer' 
              }}
            >
              Center
            </button>
            <button 
              onClick={() => setCurrentAlign('right')}
              style={{ 
                margin: '0.5rem', 
                padding: '0.5rem 1rem', 
                background: currentAlign === 'right' ? '#28a745' : 'rgba(40,167,69,0.1)', 
                border: '1px solid #28a745', 
                borderRadius: '8px', 
                color: currentAlign === 'right' ? 'white' : '#28a745', 
                cursor: 'pointer' 
              }}
            >
              Right
            </button>
          </div>
        </div>
      </div>
    );
  },
};

// With Icons and Badges
export const WithIconsAndBadges: Story = {
  args: {
    variant: 'default',
    glass: 'medium',
    position: 'top',
    size: 'md',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
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
          <GlassNavigationToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </GlassNavigation>
      </div>
    );
  },
};

// Liquid Flow Effect
export const LiquidFlow: Story = {
  args: {
    variant: 'default',
    glass: 'medium',
    position: 'top',
    size: 'md',
    liquid: true,
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
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
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
          <GlassNavigationToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </GlassNavigation>
        <div style={{ padding: '2rem', color: '#333' }}>
          <h1>移動端導航示例</h1>
          <p>在移動設備上查看漢堡菜單效果</p>
        </div>
      </div>
    );
  },
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
    liquid: true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
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
          <GlassNavigationToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </GlassNavigation>
        <div style={{ padding: '2rem', color: '#333' }}>
          <h1>複雜導航示例</h1>
          <p>這是一個包含多種功能的複雜導航示例，包括圖標、徽章、粘性效果等。</p>
          <div style={{ height: '100vh' }}></div>
          <h2>滾動查看粘性效果</h2>
          <p>導航欄會在滾動時保持可見，並顯示不同的樣式。</p>
        </div>
      </div>
    );
  },
};

// Figma Design Recreation
export const FigmaDesign: Story = {
  args: {
    variant: 'default',
    glass: 'medium',
    position: 'top',
    size: 'md',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
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
          <GlassNavigationToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </GlassNavigation>
        
        <div style={{ color: '#333', textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 1rem 0', fontSize: '2rem' }}>Figma Design Recreation</h1>
          <p style={{ margin: '0', opacity: 0.8 }}>
            完全按照 Figma 設計重新製作的導航組件
          </p>
        </div>
      </div>
    );
  },
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
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
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
          <GlassNavigationToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
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
    );
  },
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
