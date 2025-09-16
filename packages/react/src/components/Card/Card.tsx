import React from 'react';
import './Card.css';

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'outline' | 'solid';
  interactive?: boolean;
  liquid?: boolean;
  loading?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface GlassCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface GlassCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface GlassCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface GlassCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface GlassCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className = '',
      size = 'md',
      variant = 'default',
      interactive = false,
      liquid = false,
      loading = false,
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'gh-card';
    const sizeClasses = `gh-card-${size}`;
    const variantClasses = variant !== 'default' ? `gh-card-${variant}` : '';
    const interactiveClasses = interactive ? 'gh-card-interactive' : '';
    const liquidClasses = liquid ? 'gh-card-liquid' : '';
    const loadingClasses = loading ? 'gh-card-loading' : '';

    const classes = [
      baseClasses,
      sizeClasses,
      variantClasses,
      interactiveClasses,
      liquidClasses,
      loadingClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

const GlassCardHeader = React.forwardRef<HTMLDivElement, GlassCardHeaderProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`gh-card-header ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCardHeader.displayName = 'GlassCardHeader';

const GlassCardTitle = React.forwardRef<HTMLHeadingElement, GlassCardTitleProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`gh-card-title ${className}`}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

GlassCardTitle.displayName = 'GlassCardTitle';

const GlassCardDescription = React.forwardRef<HTMLParagraphElement, GlassCardDescriptionProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`gh-card-description ${className}`}
        {...props}
      >
        {children}
      </p>
    );
  }
);

GlassCardDescription.displayName = 'GlassCardDescription';

const GlassCardContent = React.forwardRef<HTMLDivElement, GlassCardContentProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`gh-card-content ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCardContent.displayName = 'GlassCardContent';

const GlassCardFooter = React.forwardRef<HTMLDivElement, GlassCardFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`gh-card-footer ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCardFooter.displayName = 'GlassCardFooter';

export {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
  GlassCardFooter,
  // Legacy exports for backward compatibility
  GlassCard as Card,
  GlassCardHeader as CardHeader,
  GlassCardTitle as CardTitle,
  GlassCardDescription as CardDescription,
  GlassCardContent as CardContent,
  GlassCardFooter as CardFooter,
};
