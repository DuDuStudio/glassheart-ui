import React, { useState, useEffect } from 'react';
import './GlassNavigation.css';

export interface GlassNavigationProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'transparent' | 'solid' | 'floating';
  glass?: 'light' | 'medium' | 'heavy';
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  sticky?: boolean;
  fixed?: boolean;
  liquid?: boolean;
  animated?: boolean;
  blur?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  width?: 'auto' | 'full' | 'fit-content';
  align?: 'left' | 'center' | 'right';
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
      liquid = false,
      animated = false,
      blur = true,
      shadow = 'md',
      padding = 'md',
      rounded = 'none',
      width = 'full',
      align = 'center',
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
    const liquidClasses = liquid ? 'gh-navigation-liquid' : '';
    const animatedClasses = animated ? 'gh-navigation-animated' : '';
    const blurClasses = blur ? 'gh-navigation-blur' : '';
    const shadowClasses = shadow !== 'none' ? `gh-shadow-${shadow}` : '';
    const paddingClasses = padding !== 'none' ? `gh-p-${padding}` : '';
    const roundedClasses = rounded !== 'none' ? `gh-rounded-${rounded}` : '';
    const widthClasses = `gh-navigation-width-${width}`;
    const alignClasses = `gh-navigation-align-${align}`;
    const scrolledClasses = isScrolled ? 'gh-navigation-scrolled' : '';

    const classes = [
      baseClasses,
      variantClasses,
      glassClasses,
      positionClasses,
      sizeClasses,
      stickyClasses,
      fixedClasses,
      liquidClasses,
      animatedClasses,
      blurClasses,
      shadowClasses,
      paddingClasses,
      roundedClasses,
      widthClasses,
      alignClasses,
      scrolledClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const navigationStyle: React.CSSProperties = {
      ...style,
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
        ref={ref as React.Ref<HTMLElement>}
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
    const classes = `gh-navigation-menu ${isOpen ? 'gh-navigation-menu-open' : ''} ${className}`.trim();

    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              onItemClick: (item: string) => onItemClick?.(item, index),
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
