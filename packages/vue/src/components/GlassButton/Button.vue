<template>
  <button
    :class="buttonClasses"
    :style="buttonStyle"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="gh-loading-spinner"></span>
    <slot v-else />
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { useLiquidGlass } from '../../composables/useLiquidGlass';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'secondary', 'accent', 'destructive', 'outline', 'ghost', 'link'].includes(value)
  },
  shape: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'circle', 'pill'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  glass: {
    type: String,
    default: 'medium',
    validator: (value) => ['light', 'medium', 'heavy'].includes(value)
  },
  liquidGlass: {
    type: Boolean,
    default: false
  },
  liquidGlassOptions: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

// Use liquid glass hook if enabled
const liquidGlassHook = useLiquidGlass({
  depth: 8,
  strength: 100,
  chromaticAberration: 0,
  blur: 2,
  ...props.liquidGlassOptions,
});

const buttonClasses = computed(() => {
  const classes = ['gh-btn'];
  
  // Variant classes
  classes.push(`gh-btn-${props.variant}`);
  
  // Shape classes
  if (props.shape !== 'default') {
    classes.push(`gh-btn-${props.shape}`);
  }
  
  // Size classes
  classes.push(`gh-btn-${props.size}`);
  
  // Glass classes
  classes.push(`gh-glass-${props.glass}`);
  
  // Liquid glass classes
  if (props.liquidGlass) {
    classes.push('gh-btn-liquid-glass');
  }
  
  // Loading classes
  if (props.loading) {
    classes.push('gh-btn-loading');
  }
  
  return classes;
});

const buttonStyle = computed(() => {
  const baseStyle = {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px) saturate(1.2)',
    WebkitBackdropFilter: 'blur(10px) saturate(1.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  // Size specific styles
  const sizeStyles = {
    xs: { height: '1.5rem', padding: '0 0.5rem', fontSize: '0.75rem', lineHeight: '1rem' },
    sm: { height: '2rem', padding: '0 1rem', fontSize: '0.75rem', lineHeight: '1rem' },
    md: { height: '2.5rem', padding: '0 1.5rem', fontSize: '0.875rem', lineHeight: '1.25rem' },
    lg: { height: '3rem', padding: '0 2rem', fontSize: '1rem', lineHeight: '1.5rem' },
    xl: { height: '3.5rem', padding: '0 2rem', fontSize: '1.125rem', lineHeight: '1.75rem' },
  };

  // Shape specific styles
  if (props.shape === 'circle') {
    Object.assign(baseStyle, {
      borderRadius: '50%',
      aspectRatio: '1',
      padding: '0',
    });
  } else if (props.shape === 'pill') {
    Object.assign(baseStyle, {
      borderRadius: '9999px',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    });
  }

  // Variant specific styles
  const variantStyles = {
    default: { background: 'rgba(255, 255, 255, 0.1)', color: 'rgb(17, 24, 39)', borderColor: 'rgba(255, 255, 255, 0.2)' },
    primary: { 
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.6) 100%)', 
      color: 'rgb(255, 255, 255)', 
      borderColor: 'rgba(59, 130, 246, 0.3)' 
    },
    secondary: { 
      background: 'linear-gradient(135deg, rgba(107, 114, 128, 0.8) 0%, rgba(107, 114, 128, 0.6) 100%)', 
      color: 'rgb(255, 255, 255)', 
      borderColor: 'rgba(107, 114, 128, 0.3)' 
    },
    accent: { 
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0.6) 100%)', 
      color: 'rgb(255, 255, 255)', 
      borderColor: 'rgba(139, 92, 246, 0.3)' 
    },
    destructive: { 
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(239, 68, 68, 0.6) 100%)', 
      color: 'rgb(255, 255, 255)', 
      borderColor: 'rgba(239, 68, 68, 0.3)' 
    },
    outline: { 
      background: 'transparent', 
      color: 'rgb(17, 24, 39)', 
      borderColor: 'rgb(229, 231, 235)',
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none'
    },
    ghost: { 
      background: 'transparent', 
      color: 'rgb(17, 24, 39)', 
      borderColor: 'transparent',
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none'
    },
    link: { 
      background: 'transparent', 
      color: 'rgb(59, 130, 246)', 
      borderColor: 'transparent',
      textDecoration: 'underline',
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none'
    },
  };

  // Merge all styles
  const finalStyle = {
    ...baseStyle,
    ...sizeStyles[props.size],
    ...variantStyles[props.variant],
  };

  // Add liquid glass style if enabled
  if (props.liquidGlass) {
    const liquidStyle = liquidGlassHook.getLiquidGlassStyle();
    Object.assign(finalStyle, liquidStyle);
  }

  return finalStyle;
});

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>