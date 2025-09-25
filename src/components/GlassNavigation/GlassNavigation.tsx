import React, { useState, useEffect } from 'react';
import './GlassNavigation.css';
import { useLiquidGlass, LiquidGlassOptions } from '../../hooks/useLiquidGlass';

export interface GlassNavigationProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'transparent' | 'solid' | 'floating';
  glass?: 'light' | 'medium' | 'heavy';
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  sticky?: boolean;
  fixed?: boolean;
  liquidGlass?: boolean;
  liquidGlassOptions?: Partial<LiquidGlassOptions>;
  animated?: boolean;
  blur?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  zIndex?: number;
  onToggle?: (isOpen: boolean) => void;
  onItemClick?: (item: string, index: number) => void;
  style?: React.CSSProperties;
}

export interface GlassNavigationItemProps {
  children: React.ReactNode;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export interface GlassNavigationBrandProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export interface GlassNavigationToggleProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const GlassNavigation = React.forwardRef<HTMLElement, GlassNavigationProps>(
  (
    {
      children,
      className = '',
      variant = 'default',
      glass = 'medium',
      position = 'top',
      size = 'md',
      sticky = false,
      fixed = false,
      liquidGlass = false,
      liquidGlassOptions = {},
      animated = false,
      blur = true,
      shadow = 'md',
      padding = 'md',
      rounded = 'full',
      zIndex,
      onToggle,
      onItemClick,
      style,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Use liquid glass hook if enabled
    const liquidGlassHook = useLiquidGlass({
      depth: 10,
      strength: 50,
      chromaticAberration: 0,
      blur: 2,
      ...liquidGlassOptions,
    });

    useEffect(() => {
      if (sticky || fixed) {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }
    }, [sticky, fixed]);

    const baseClasses = 'gh-navigation';
    const variantClasses = `gh-navigation-${variant}`;
    const glassClasses = `gh-glass-${glass}`;
    const positionClasses = `gh-navigation-${position}`;
    const sizeClasses = `gh-navigation-${size}`;
    const stickyClasses = sticky ? 'gh-navigation-sticky' : '';
    const fixedClasses = fixed ? 'gh-navigation-fixed' : '';
    const liquidGlassClasses = liquidGlass ? 'gh-navigation-liquid-glass' : '';
    const animatedClasses = animated ? 'gh-navigation-animated' : '';
    const blurClasses = blur ? 'gh-navigation-blur' : '';
    const shadowClasses = shadow !== 'none' ? `gh-shadow-${shadow}` : '';
    const paddingClasses = padding !== 'none' ? `gh-p-${padding}` : '';
    const roundedClasses = rounded !== 'none' ? `gh-rounded-${rounded}` : '';
    const scrolledClasses = isScrolled ? 'gh-navigation-scrolled' : '';

    const classes = [
      baseClasses,
      variantClasses,
      glassClasses,
      positionClasses,
      sizeClasses,
      stickyClasses,
      fixedClasses,
      liquidGlassClasses,
      animatedClasses,
      blurClasses,
      shadowClasses,
      paddingClasses,
      roundedClasses,
      scrolledClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Get liquid glass style if enabled
    const liquidGlassStyle = liquidGlass ? liquidGlassHook.getLiquidGlassStyle() : {};

    const navigationStyle: React.CSSProperties = {
      ...style,
      ...liquidGlassStyle,
      ...(zIndex !== undefined && { zIndex }),
    };

    const handleToggle = () => {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      onToggle?.(newIsOpen);
    };

    const handleItemClick = (item: string, index: number) => {
      onItemClick?.(item, index);
      setIsOpen(false);
    };

    return (
      <nav
        ref={liquidGlass ? liquidGlassHook.elementRef as React.Ref<HTMLElement> : ref as React.Ref<HTMLElement>}
        className={classes}
        style={navigationStyle}
        {...props}
      >
        <div className="gh-navigation-container">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                ...child.props,
                onItemClick: handleItemClick,
                isOpen,
                onToggle: handleToggle,
              });
            }
            return child;
          })}
        </div>
      </nav>
    );
  }
);

GlassNavigation.displayName = 'GlassNavigation';

const GlassNavigationBrand = React.forwardRef<HTMLAnchorElement, GlassNavigationBrandProps>(
  ({ children, href, onClick, className = '', ...props }, ref) => {
    const classes = `gh-navigation-brand ${className}`.trim();

    if (href) {
      return (
        <a
          ref={ref}
          href={href}
          className={classes}
          onClick={onClick}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={classes}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassNavigationBrand.displayName = 'GlassNavigationBrand';

const GlassNavigationMenu = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onItemClick?: (item: string, index: number) => void;
}>(
  ({ children, className = '', isOpen = false, onItemClick, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
    const [isDeforming, setIsDeforming] = React.useState(false);
    const [deformParams, setDeformParams] = React.useState({
      width: 120,
      height: 40,
      radius: 30,
      opacity: 0.15
    });
    
    const classes = `gh-navigation-menu ${isOpen ? 'gh-navigation-menu-open' : ''} ${className}`.trim();

    const calculateDeformParams = (fromIndex: number | null, toIndex: number) => {
      if (fromIndex === null) return { width: 120, height: 40, radius: 30, opacity: 0.15 };
      
      const distance = Math.abs(toIndex - fromIndex);
      const maxDistance = 5; // Maximum distance for full deformation
      const intensity = Math.min(distance / maxDistance, 1);
      
      return {
        width: 120 + (intensity * 20), // Expand width by up to 20px
        height: 40 - (intensity * 5),  // Compress height by up to 5px
        radius: 30 - (intensity * 5),  // Reduce radius by up to 5px
        opacity: 0.15 + (intensity * 0.05) // Increase opacity slightly
      };
    };

    const handleMouseEnter = (index: number) => {
      const previousIndex = hoveredIndex;
      setHoveredIndex(index);
      
      // Calculate deformation parameters
      const newParams = calculateDeformParams(previousIndex, index);
      setDeformParams(newParams);
      
      // Trigger deformation animation
      setIsDeforming(true);
      setTimeout(() => setIsDeforming(false), 300);
    };

    const handleMouseLeave = () => {
      setHoveredIndex(null);
      setIsDeforming(false);
      setDeformParams({ width: 120, height: 40, radius: 30, opacity: 0.15 });
    };

    // Update CSS custom properties for deformation
    React.useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        const element = ref.current as HTMLElement;
        element.style.setProperty('--deform-width', `${deformParams.width}px`);
        element.style.setProperty('--deform-height', `${deformParams.height}px`);
        element.style.setProperty('--deform-radius', `${deformParams.radius}px`);
        element.style.setProperty('--deform-opacity', deformParams.opacity.toString());
      }
    }, [deformParams, ref]);

    return (
      <div
        ref={ref}
        className={classes}
        data-hover-index={hoveredIndex}
        data-deforming={isDeforming}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              onItemClick: (item: string) => onItemClick?.(item, index),
              onMouseEnter: () => handleMouseEnter(index),
              onMouseLeave: handleMouseLeave,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

GlassNavigationMenu.displayName = 'GlassNavigationMenu';

const GlassNavigationItem = React.forwardRef<HTMLAnchorElement, GlassNavigationItemProps>(
  (
    {
      children,
      href,
      active = false,
      disabled = false,
      icon,
      badge,
      onClick,
      onMouseEnter,
      onMouseLeave,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'gh-navigation-item';
    const activeClasses = active ? 'gh-navigation-item-active' : '';
    const disabledClasses = disabled ? 'gh-navigation-item-disabled' : '';
    const classes = [baseClasses, activeClasses, disabledClasses, className]
      .filter(Boolean)
      .join(' ');

    const handleClick = () => {
      if (!disabled) {
        onClick?.();
      }
    };

    const content = (
      <>
        {icon && <span className="gh-navigation-item-icon">{icon}</span>}
        <span className="gh-navigation-item-text">{children}</span>
        {badge && <span className="gh-navigation-item-badge">{badge}</span>}
      </>
    );

    if (href && !disabled) {
      return (
        <a
          ref={ref}
          href={href}
          className={classes}
          onClick={handleClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

GlassNavigationItem.displayName = 'GlassNavigationItem';

const GlassNavigationToggle = React.forwardRef<HTMLButtonElement, GlassNavigationToggleProps>(
  ({ isOpen, onClick, className = '', ...props }, ref) => {
    const classes = `gh-navigation-toggle ${isOpen ? 'gh-navigation-toggle-open' : ''} ${className}`.trim();

    return (
      <button
        ref={ref}
        className={classes}
        onClick={onClick}
        aria-label="Toggle navigation menu"
        {...props}
      >
        <span className="gh-navigation-toggle-line"></span>
        <span className="gh-navigation-toggle-line"></span>
        <span className="gh-navigation-toggle-line"></span>
      </button>
    );
  }
);

GlassNavigationToggle.displayName = 'GlassNavigationToggle';

export {
  GlassNavigation,
  GlassNavigationBrand,
  GlassNavigationMenu,
  GlassNavigationItem,
  GlassNavigationToggle,
};
