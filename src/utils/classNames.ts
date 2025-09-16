/**
 * Utility functions for class name manipulation
 */

/**
 * Combine class names into a single string
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Create a class name with conditional classes
 */
export const clsx = (...inputs: (string | Record<string, boolean> | undefined | null | false)[]): string => {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (typeof input === 'string') {
      classes.push(input);
    } else if (input && typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }
  
  return classes.join(' ');
};

/**
 * Create variant-based class names
 */
export const createVariants = <T extends Record<string, Record<string, string>>>(
  variants: T,
  defaultVariants?: Partial<Record<keyof T, keyof T[keyof T]>>
) => {
  return (props: Partial<Record<keyof T, keyof T[keyof T]>>) => {
    const result: string[] = [];
    
    for (const [variant, value] of Object.entries(props)) {
      if (value && variants[variant as keyof T] && variants[variant as keyof T][value as keyof T[keyof T]]) {
        result.push(variants[variant as keyof T][value as keyof T[keyof T]]);
      } else if (defaultVariants && defaultVariants[variant as keyof T] && variants[variant as keyof T] && variants[variant as keyof T][defaultVariants[variant as keyof T] as keyof T[keyof T]]) {
        result.push(variants[variant as keyof T][defaultVariants[variant as keyof T] as keyof T[keyof T]]);
      }
    }
    
    return result.join(' ');
  };
};

/**
 * Create size-based class names
 */
export const createSizes = (sizes: Record<string, string>) => {
  return (size: string) => sizes[size] || '';
};

/**
 * Create responsive class names
 */
export const createResponsive = (breakpoints: Record<string, string>) => {
  return (responsive: Record<string, string>) => {
    const classes: string[] = [];
    
    for (const [breakpoint, value] of Object.entries(responsive)) {
      if (breakpoints[breakpoint]) {
        classes.push(`${breakpoints[breakpoint]}:${value}`);
      }
    }
    
    return classes.join(' ');
  };
};

/**
 * Create glass effect class names
 */
export const createGlassClasses = (glass: 'light' | 'medium' | 'heavy' = 'medium') => {
  return `gh-glass gh-glass-${glass}`;
};

/**
 * Create animation class names
 */
export const createAnimationClasses = (animation?: string) => {
  return animation ? `gh-animate-${animation}` : '';
};

/**
 * Create size class names
 */
export const createSizeClasses = (size: string, prefix: string = 'gh') => {
  return `${prefix}-${size}`;
};

/**
 * Create variant class names
 */
export const createVariantClasses = (variant: string, prefix: string = 'gh') => {
  return `${prefix}-${variant}`;
};
