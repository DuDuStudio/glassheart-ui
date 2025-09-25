import { useLiquidGlass, LiquidGlassOptions } from '../utils/useLiquidGlass';

export interface ButtonOptions {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link';
  shape?: 'default' | 'circle' | 'pill';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  glass?: 'light' | 'medium' | 'heavy';
  liquidGlass?: boolean;
  liquidGlassOptions?: Partial<LiquidGlassOptions>;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  onClick?: (event: MouseEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
}

export class GlassButton {
  private element: HTMLButtonElement;
  private options: ButtonOptions;
  private liquidGlassHook?: ReturnType<typeof useLiquidGlass>;

  constructor(options: ButtonOptions = {}) {
    this.options = {
      variant: 'default',
      shape: 'default',
      size: 'md',
      glass: 'medium',
      liquidGlass: false,
      liquidGlassOptions: {},
      loading: false,
      disabled: false,
      ...options
    };
    this.element = this.createElement();
    this.setupLiquidGlass();
  }

  private createElement(): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = this.getClassNames();
    button.textContent = this.options.text || 'Button';
    button.disabled = this.options.disabled || this.options.loading || false;
    
    if (this.options.loading) {
      const spinner = document.createElement('span');
      spinner.className = 'gh-loading-spinner';
      button.appendChild(spinner);
    }
    
    if (this.options.onClick) {
      button.addEventListener('click', this.options.onClick);
    }
    
    if (this.options.onFocus) {
      button.addEventListener('focus', this.options.onFocus);
    }
    
    if (this.options.onBlur) {
      button.addEventListener('blur', this.options.onBlur);
    }
    
    if (this.options.onMouseEnter) {
      button.addEventListener('mouseenter', this.options.onMouseEnter);
    }
    
    if (this.options.onMouseLeave) {
      button.addEventListener('mouseleave', this.options.onMouseLeave);
    }
    
    return button;
  }

  private setupLiquidGlass() {
    if (this.options.liquidGlass) {
      this.liquidGlassHook = useLiquidGlass({
        depth: 8,
        strength: 100,
        chromaticAberration: 0,
        blur: 2,
        ...this.options.liquidGlassOptions,
      });
      
      this.liquidGlassHook.elementRef = this.element;
    }
  }

  private getClassNames(): string {
    const classes = ['gh-btn'];
    
    // Variant classes
    classes.push(`gh-btn-${this.options.variant}`);
    
    // Shape classes
    if (this.options.shape !== 'default') {
      classes.push(`gh-btn-${this.options.shape}`);
    }
    
    // Size classes
    classes.push(`gh-btn-${this.options.size}`);
    
    // Glass classes
    classes.push(`gh-glass-${this.options.glass}`);
    
    // Liquid glass classes
    if (this.options.liquidGlass) {
      classes.push('gh-btn-liquid-glass');
    }
    
    // Loading classes
    if (this.options.loading) {
      classes.push('gh-btn-loading');
    }
    
    return classes.filter(Boolean).join(' ');
  }

  public getElement(): HTMLButtonElement {
    return this.element;
  }

  public updateOptions(newOptions: Partial<ButtonOptions>): void {
    this.options = { ...this.options, ...newOptions };
    this.element.className = this.getClassNames();
    this.element.disabled = this.options.disabled || this.options.loading || false;
    
    // Update text content
    if (newOptions.text !== undefined) {
      this.element.textContent = this.options.text || 'Button';
    }
    
    // Update loading state
    if (newOptions.loading !== undefined) {
      const existingSpinner = this.element.querySelector('.gh-loading-spinner');
      if (this.options.loading && !existingSpinner) {
        const spinner = document.createElement('span');
        spinner.className = 'gh-loading-spinner';
        this.element.appendChild(spinner);
      } else if (!this.options.loading && existingSpinner) {
        existingSpinner.remove();
      }
    }
    
    // Update liquid glass
    if (newOptions.liquidGlass !== undefined) {
      if (this.options.liquidGlass && !this.liquidGlassHook) {
        this.setupLiquidGlass();
      } else if (!this.options.liquidGlass && this.liquidGlassHook) {
        this.liquidGlassHook.cleanup();
        this.liquidGlassHook = undefined;
      }
    }
  }

  public destroy(): void {
    if (this.liquidGlassHook) {
      this.liquidGlassHook.cleanup();
    }
    this.element.remove();
  }
}