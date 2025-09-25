import React from 'react';
import './GlassButton.css';
import { useLiquidGlass, LiquidGlassOptions } from '../../hooks/useLiquidGlass';

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link';
  shape?: 'default' | 'circle' | 'pill';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  glass?: 'light' | 'medium' | 'heavy';
  liquidGlass?: boolean;
  liquidGlassOptions?: Partial<LiquidGlassOptions>;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      children,
      variant = 'default',
      shape = 'default',
      size = 'md',
      glass = 'medium',
      liquidGlass = false,
      liquidGlassOptions = {},
      loading = false,
      disabled = false,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    // Use liquid glass hook if enabled
    const liquidGlassHook = useLiquidGlass({
      depth: 8,
      strength: 100,
      chromaticAberration: 0,
      blur: 2,
      ...liquidGlassOptions,
    });

    const baseClasses = 'gh-btn';
    const variantClasses = `gh-btn-${variant}`;
    const shapeClasses = shape !== 'default' ? `gh-btn-${shape}` : '';
    const sizeClasses = `gh-btn-${size}`;
    const glassClasses = `gh-glass-${glass}`;
    const liquidGlassClasses = liquidGlass ? 'gh-btn-liquid-glass' : '';
    const loadingClasses = loading ? 'gh-btn-loading' : '';

    const classes = [
      baseClasses,
      variantClasses,
      shapeClasses,
      sizeClasses,
      glassClasses,
      liquidGlassClasses,
      loadingClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Get liquid glass style if enabled
    const liquidGlassStyle = liquidGlass ? liquidGlassHook.getLiquidGlassStyle() : {};

    return (
      <button
        ref={liquidGlass ? liquidGlassHook.elementRef as React.Ref<HTMLButtonElement> : ref}
        type="button"
        className={classes}
        disabled={disabled || loading}
        onClick={onClick}
        style={liquidGlassStyle}
        {...props}
      >
        {loading ? null : children}
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export interface GlassButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  vertical?: boolean;
}

const GlassButtonGroup = React.forwardRef<HTMLDivElement, GlassButtonGroupProps>(
  ({ children, className = '', vertical = false, ...props }, ref) => {
    const baseClasses = 'gh-btn-group';
    const verticalClasses = vertical ? 'flex-col' : '';

    const classes = [baseClasses, verticalClasses, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassButtonGroup.displayName = 'GlassButtonGroup';

export { GlassButton, GlassButtonGroup };
