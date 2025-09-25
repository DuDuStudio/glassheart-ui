import React from 'react';
import './GlassInput.css';
import { useLiquidGlass, LiquidGlassOptions } from '../../hooks/useLiquidGlass';

export interface GlassInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'outline' | 'solid';
  glass?: 'light' | 'medium' | 'heavy';
  liquidGlass?: boolean;
  liquidGlassOptions?: Partial<LiquidGlassOptions>;
  error?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  button?: React.ReactNode;
}

export interface GlassTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'outline' | 'solid';
  glass?: 'light' | 'medium' | 'heavy';
  liquidGlass?: boolean;
  liquidGlassOptions?: Partial<LiquidGlassOptions>;
  error?: boolean;
  className?: string;
}

export interface GlassInputGroupProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  error?: string;
  help?: string;
  required?: boolean;
}

export interface GlassFloatingLabelProps {
  children: React.ReactNode;
  label: string;
  className?: string;
  error?: string;
  help?: string;
  required?: boolean;
}

const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      size = 'md',
      variant = 'default',
      glass = 'medium',
      liquidGlass = false,
      liquidGlassOptions = {},
      error = false,
      className = '',
      icon,
      iconPosition = 'left',
      button,
      ...props
    },
    ref
  ) => {
    // Use liquid glass hook if enabled
    const liquidGlassHook = useLiquidGlass({
      depth: 6,
      strength: 120,
      chromaticAberration: 0,
      blur: 2,
      ...liquidGlassOptions,
    });

    const baseClasses = 'gh-input';
    const sizeClasses = `gh-input-${size}`;
    const variantClasses = variant !== 'default' ? `gh-input-${variant}` : '';
    const glassClasses = `gh-glass-${glass}`;
    const liquidGlassClasses = liquidGlass ? 'gh-input-liquid-glass' : '';
    const errorClasses = error ? 'border-red-500' : '';

    const inputClasses = [
      baseClasses,
      sizeClasses,
      variantClasses,
      glassClasses,
      liquidGlassClasses,
      errorClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Get liquid glass style if enabled
    const liquidGlassStyle = liquidGlass ? liquidGlassHook.getLiquidGlassStyle() : {};

    if (icon || button) {
      const containerClasses = [
        icon ? 'gh-input-with-icon' : '',
        button ? 'gh-input-with-button' : '',
        liquidGlassClasses,
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <div className={containerClasses}>
          {icon && (
            <div className={`gh-input-icon ${iconPosition === 'right' ? 'gh-input-icon-right' : ''}`}>
              {icon}
            </div>
          )}
          <input
            ref={liquidGlass ? liquidGlassHook.elementRef as React.Ref<HTMLInputElement> : ref}
            className={inputClasses}
            style={liquidGlassStyle}
            {...props}
          />
          {button && (
            <div className="gh-input-button">
              {button}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        ref={liquidGlass ? liquidGlassHook.elementRef as React.Ref<HTMLInputElement> : ref}
        className={inputClasses}
        style={liquidGlassStyle}
        {...props}
      />
    );
  }
);

GlassInput.displayName = 'GlassInput';

const GlassTextarea = React.forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  (
    {
      size = 'md',
      variant = 'default',
      glass = 'medium',
      liquidGlass = false,
      liquidGlassOptions = {},
      error = false,
      className = '',
      ...props
    },
    ref
  ) => {
    // Use liquid glass hook if enabled
    const liquidGlassHook = useLiquidGlass({
      depth: 8,
      strength: 100,
      chromaticAberration: 0,
      blur: 3,
      ...liquidGlassOptions,
    });

    const baseClasses = 'gh-textarea';
    const sizeClasses = `gh-input-${size}`;
    const variantClasses = variant !== 'default' ? `gh-input-${variant}` : '';
    const glassClasses = `gh-glass-${glass}`;
    const liquidGlassClasses = liquidGlass ? 'gh-input-liquid-glass' : '';
    const errorClasses = error ? 'border-red-500' : '';

    const classes = [
      baseClasses,
      sizeClasses,
      variantClasses,
      glassClasses,
      liquidGlassClasses,
      errorClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Get liquid glass style if enabled
    const liquidGlassStyle = liquidGlass ? liquidGlassHook.getLiquidGlassStyle() : {};

    return (
      <textarea
        ref={liquidGlass ? liquidGlassHook.elementRef as React.Ref<HTMLTextAreaElement> : ref}
        className={classes}
        style={liquidGlassStyle}
        {...props}
      />
    );
  }
);

GlassTextarea.displayName = 'GlassTextarea';

const GlassInputGroup = React.forwardRef<HTMLDivElement, GlassInputGroupProps>(
  ({ children, className = '', label, error, help, required, ...props }, ref) => {
    const classes = ['gh-input-group', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {label && (
          <label className="gh-input-label">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {children}
        {error && <div className="gh-input-error">{error}</div>}
        {help && !error && <div className="gh-input-help">{help}</div>}
      </div>
    );
  }
);

GlassInputGroup.displayName = 'GlassInputGroup';

const GlassFloatingLabel = React.forwardRef<HTMLDivElement, GlassFloatingLabelProps>(
  ({ children, label, className = '', error, help, required, ...props }, ref) => {
    const classes = ['gh-input-floating', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
        <label className="gh-input-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {error && <div className="gh-input-error">{error}</div>}
        {help && !error && <div className="gh-input-help">{help}</div>}
      </div>
    );
  }
);

GlassFloatingLabel.displayName = 'GlassFloatingLabel';

export { GlassInput, GlassTextarea, GlassInputGroup, GlassFloatingLabel };
