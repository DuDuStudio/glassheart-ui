import React from 'react';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'outline' | 'solid';
  glass?: 'light' | 'medium' | 'heavy';
  liquid?: boolean;
  error?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  button?: React.ReactNode;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'outline' | 'solid';
  glass?: 'light' | 'medium' | 'heavy';
  liquid?: boolean;
  error?: boolean;
  className?: string;
}

export interface InputGroupProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  error?: string;
  help?: string;
  required?: boolean;
}

export interface FloatingLabelProps {
  children: React.ReactNode;
  label: string;
  className?: string;
  error?: string;
  help?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'default',
      glass = 'medium',
      liquid = false,
      error = false,
      className = '',
      icon,
      iconPosition = 'left',
      button,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'gh-input';
    const sizeClasses = `gh-input-${size}`;
    const variantClasses = variant !== 'default' ? `gh-input-${variant}` : '';
    const glassClasses = `gh-glass-${glass}`;
    const liquidClasses = liquid ? 'gh-input-liquid' : '';
    const errorClasses = error ? 'border-red-500' : '';

    const inputClasses = [
      baseClasses,
      sizeClasses,
      variantClasses,
      glassClasses,
      liquidClasses,
      errorClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (icon || button) {
      const containerClasses = [
        icon ? 'gh-input-with-icon' : '',
        button ? 'gh-input-with-button' : '',
        liquidClasses,
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
            ref={ref}
            className={inputClasses}
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
        ref={ref}
        className={inputClasses}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      variant = 'default',
      glass = 'medium',
      liquid = false,
      error = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'gh-textarea';
    const sizeClasses = `gh-input-${size}`;
    const variantClasses = variant !== 'default' ? `gh-input-${variant}` : '';
    const glassClasses = `gh-glass-${glass}`;
    const liquidClasses = liquid ? 'gh-input-liquid' : '';
    const errorClasses = error ? 'border-red-500' : '';

    const classes = [
      baseClasses,
      sizeClasses,
      variantClasses,
      glassClasses,
      liquidClasses,
      errorClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <textarea
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
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

InputGroup.displayName = 'InputGroup';

const FloatingLabel = React.forwardRef<HTMLDivElement, FloatingLabelProps>(
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

FloatingLabel.displayName = 'FloatingLabel';

export { Input, Textarea, InputGroup, FloatingLabel };
