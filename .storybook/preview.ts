import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'nature',
      values: [
        {
          name: 'nature',
          value: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80") center/cover',
        },
        {
          name: 'cityscape',
          value: 'url("https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80") center/cover',
        },
        {
          name: 'abstract',
          value: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=2029&q=80") center/cover',
        },
        {
          name: 'forest',
          value: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80") center/cover',
        },
        {
          name: 'ocean',
          value: 'url("https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80") center/cover',
        },
        {
          name: 'mountains',
          value: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80") center/cover',
        },
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
          name: 'light',
          value: '#f8fafc',
        },
        {
          name: 'dark',
          value: '#0f172a',
        },
      ],
    },
  },
  decorators: [
    (Story) => {
      return React.createElement('div', {
        style: { 
          minHeight: '100vh', 
          padding: '2rem',
          background: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80") center/cover',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, [
        React.createElement('div', {
          key: 'decoration1',
          style: {
            position: 'absolute',
            top: '5%',
            left: '5%',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
            pointerEvents: 'none'
          }
        }),
        React.createElement('div', {
          key: 'decoration2',
          style: {
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite reverse',
            pointerEvents: 'none'
          }
        }),
        React.createElement('div', {
          key: 'decoration3',
          style: {
            position: 'absolute',
            bottom: '10%',
            left: '15%',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 10s ease-in-out infinite',
            pointerEvents: 'none'
          }
        }),
        React.createElement('div', {
          key: 'decoration4',
          style: {
            position: 'absolute',
            bottom: '20%',
            right: '20%',
            width: '80px',
            height: '80px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 12s ease-in-out infinite reverse',
            pointerEvents: 'none'
          }
        }),
        React.createElement('style', {
          key: 'animations'
        }, `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `),
        React.createElement(Story, { key: 'story' })
      ]);
    },
  ],
};

export default preview;
