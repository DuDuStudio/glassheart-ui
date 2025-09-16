import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  glass?: 'light' | 'medium' | 'heavy';
  liquid?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      glass = 'medium',
      liquid = false,
      loading = false,
      disabled = false,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'gh-btn';
    const variantClasses = `gh-btn-${variant}`;
    const sizeClasses = `gh-btn-${size}`;
    const glassClasses = `gh-glass-${glass}`;
    const liquidClasses = liquid ? 'gh-btn-liquid' : '';
    const loadingClasses = loading ? 'gh-btn-loading' : '';

    const classes = [
      baseClasses,
      variantClasses,
      sizeClasses,
      glassClasses,
      liquidClasses,
      loadingClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {loading ? null : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  vertical?: boolean;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
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

ButtonGroup.displayName = 'ButtonGroup';

export { Button, ButtonGroup };
