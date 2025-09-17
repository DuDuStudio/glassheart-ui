export class GlassInput {
  private element: HTMLInputElement;
  private options: InputOptions;

  constructor(options: InputOptions = {}) {
    this.options = {
      type: 'text',
      size: 'md',
      variant: 'default',
      glass: 'medium',
      liquid: false,
      error: false,
      disabled: false,
      ...options
    };
    this.element = this.createElement();
  }

  private createElement(): HTMLInputElement {
    const input = document.createElement('input');
    input.className = this.getClassNames();
    input.type = this.options.type || 'text';
    input.placeholder = this.options.placeholder || '';
    input.disabled = this.options.disabled || false;
    
    if (this.options.value) {
      input.value = this.options.value;
    }

    if (this.options.onChange) {
      input.addEventListener('input', this.options.onChange);
    }

    if (this.options.onFocus) {
      input.addEventListener('focus', this.options.onFocus);
    }

    if (this.options.onBlur) {
      input.addEventListener('blur', this.options.onBlur);
    }

    return input;
  }

  private getClassNames(): string {
    const classes = ['gh-input'];
    
    // Size classes
    if (this.options.size) {
      classes.push(`gh-input-${this.options.size}`);
    }
    
    // Variant classes
    if (this.options.variant) {
      classes.push(`gh-input-${this.options.variant}`);
    }
    
    // Glass effect
    if (this.options.glass) {
      classes.push(`gh-glass-${this.options.glass}`);
    }
    
    // Liquid effect
    if (this.options.liquid) {
      classes.push('gh-liquid-flow');
    }
    
    // Error state
    if (this.options.error) {
      classes.push('gh-input-error');
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

  public getElement(): HTMLInputElement {
    return this.element;
  }

  public getValue(): string {
    return this.element.value;
  }

  public setValue(value: string): void {
    this.element.value = value;
  }

  public setDisabled(disabled: boolean): void {
    this.element.disabled = disabled;
  }
}

export interface InputOptions {
  type?: 'text' | 'email' | 'password' | 'number';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'outline' | 'solid';
  glass?: 'light' | 'medium' | 'heavy';
  liquid?: boolean;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (event: Event) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}
