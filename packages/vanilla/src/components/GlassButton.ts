export class GlassButton {
  private element: HTMLButtonElement;
  private options: ButtonOptions;

  constructor(options: ButtonOptions = {}) {
    this.options = {
      variant: 'default',
      size: 'md',
      glass: 'medium',
      liquid: false,
      loading: false,
      disabled: false,
      ...options
    };
    this.element = this.createElement();
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

    return button;
  }

  private getClassNames(): string {
    const classes = ['gh-button'];
    
    // Variant classes
    if (this.options.variant) {
      classes.push(`gh-button-${this.options.variant}`);
    }
    
    // Size classes
    if (this.options.size) {
      classes.push(`gh-button-${this.options.size}`);
    }
    
    // Glass effect
    if (this.options.glass) {
      classes.push(`gh-glass-${this.options.glass}`);
    }
    
    // Liquid effect
    if (this.options.liquid) {
      classes.push('gh-liquid-flow');
    }
    
    // Loading state
    if (this.options.loading) {
      classes.push('gh-loading');
    }
    
    // Disabled state
    if (this.options.disabled) {
      classes.push('gh-disabled');
    }

    return classes.join(' ');
  }

  public render(container: HTMLElement | string): void {
    const target = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;
    
    if (target) {
      target.appendChild(this.element);
    }
  }

  public destroy(): void {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }

  public getElement(): HTMLButtonElement {
    return this.element;
  }

  public setText(text: string): void {
    this.element.textContent = text;
  }

  public setDisabled(disabled: boolean): void {
    this.element.disabled = disabled;
  }
}

export interface ButtonOptions {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  glass?: 'light' | 'medium' | 'heavy';
  liquid?: boolean;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  onClick?: (event: MouseEvent) => void;
}
