export class GlassButton {
  private element: HTMLButtonElement;
  private options: ButtonOptions;

  constructor(options: ButtonOptions = {}) {
    this.options = {
      variant: 'primary',
      size: 'md',
      liquid: false,
      disabled: false,
      ...options
    };
    this.element = this.createElement();
  }

  private createElement(): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = this.getClassNames();
    button.textContent = this.options.text || 'Button';
    button.disabled = this.options.disabled || false;
    
    if (this.options.onClick) {
      button.addEventListener('click', this.options.onClick);
    }

    return button;
  }

  private getClassNames(): string {
    const classes = ['gh-btn'];
    
    // Variant classes
    if (this.options.variant) {
      classes.push(`gh-btn-${this.options.variant}`);
    }
    
    // Size classes
    if (this.options.size) {
      classes.push(`gh-btn-${this.options.size}`);
    }
    
    // Glass effect
    if (this.options.liquid) {
      classes.push('gh-liquid-flow');
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
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  liquid?: boolean;
  disabled?: boolean;
  text?: string;
  onClick?: (event: MouseEvent) => void;
}
