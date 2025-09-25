import React from 'react';
import './GlassContainer.css';
import { useLiquidGlass, LiquidGlassOptions } from '../../hooks/useLiquidGlass';

export interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  variant?: 'default' | 'outline' | 'solid' | 'transparent';
  glass?: 'light' | 'medium' | 'heavy';
  interactive?: boolean;
  liquidGlass?: boolean;
  liquidGlassOptions?: Partial<LiquidGlassOptions>;
  animated?: boolean;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  zIndex?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
}

const GlassContainer = React.forwardRef<HTMLDivElement, GlassContainerProps>(
  (
    {
      children,
      className = '',
      size = 'md',
      variant = 'default',
      glass = 'medium',
      interactive = false,
      liquidGlass = false,
      liquidGlassOptions = {},
      animated = false,
      padding = 'md',
      margin = 'none',
      rounded = 'md',
      shadow = 'md',
      overflow = 'visible',
      position = 'static',
      zIndex,
      onClick,
      onMouseEnter,
      onMouseLeave,
      style,
      ...props
    },
    ref
  ) => {
    // Use liquid glass hook if enabled
    const liquidGlassHook = useLiquidGlass({
      depth: 15,
      strength: 60,
      chromaticAberration: 0,
      blur: 4,
      ...liquidGlassOptions,
    });

    const baseClasses = 'gh-container';
    const sizeClasses = `gh-container-${size}`;
    const variantClasses = variant !== 'default' ? `gh-container-${variant}` : '';
    const glassClasses = `gh-glass-${glass}`;
    const interactiveClasses = interactive ? 'gh-container-interactive' : '';
    const liquidGlassClasses = liquidGlass ? 'gh-container-liquid-glass' : '';
    const animatedClasses = animated ? 'gh-container-animated' : '';
    const paddingClasses = padding !== 'none' ? `gh-p-${padding}` : '';
    const marginClasses = margin !== 'none' ? `gh-m-${margin}` : '';
    const roundedClasses = rounded !== 'none' ? `gh-rounded-${rounded}` : '';
    const shadowClasses = shadow !== 'none' ? `gh-shadow-${shadow}` : '';
    const overflowClasses = overflow !== 'visible' ? `gh-overflow-${overflow}` : '';
    const positionClasses = position !== 'static' ? `gh-position-${position}` : '';

    const classes = [
      baseClasses,
      sizeClasses,
      variantClasses,
      glassClasses,
      interactiveClasses,
      liquidGlassClasses,
      animatedClasses,
      paddingClasses,
      marginClasses,
      roundedClasses,
      shadowClasses,
      overflowClasses,
      positionClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Get liquid glass style if enabled
    const liquidGlassStyle = liquidGlass ? liquidGlassHook.getLiquidGlassStyle() : {};

    const containerStyle: React.CSSProperties = {
      ...style,
      ...liquidGlassStyle,
      ...(zIndex !== undefined && { zIndex }),
    };

    return (
      <div
        ref={liquidGlass ? liquidGlassHook.elementRef as React.Ref<HTMLDivElement> : ref}
        className={classes}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={containerStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassContainer.displayName = 'GlassContainer';

export { GlassContainer };
