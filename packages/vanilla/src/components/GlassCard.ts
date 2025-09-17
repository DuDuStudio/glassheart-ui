export class GlassCard {
  private element: HTMLElement;
  private options: CardOptions;

  constructor(options: CardOptions = {}) {
    this.options = {
      size: 'md',
      variant: 'default',
      glass: 'medium',
      liquid: false,
      interactive: false,
      loading: false,
      ...options
    };
    this.element = this.createElement();
  }

  private createElement(): HTMLElement {
    const card = document.createElement('div');
    card.className = this.getClassNames();
    
    if (this.options.content) {
      card.innerHTML = this.options.content;
    }

    return card;
  }

  private getClassNames(): string {
    const classes = ['gh-card'];
    
    // Size classes
    if (this.options.size) {
      classes.push(`gh-card-${this.options.size}`);
    }
    
    // Variant classes
    if (this.options.variant) {
      classes.push(`gh-card-${this.options.variant}`);
    }
    
    // Glass effect
    if (this.options.glass) {
      classes.push(`gh-glass-${this.options.glass}`);
    }
    
    // Liquid effect
    if (this.options.liquid) {
      classes.push('gh-liquid-flow');
    }
    
    // Interactive
    if (this.options.interactive) {
      classes.push('gh-interactive');
    }
    
    // Loading state
    if (this.options.loading) {
      classes.push('gh-loading');
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

  public getElement(): HTMLElement {
    return this.element;
  }
}

export interface CardOptions {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'outline' | 'solid';
  glass?: 'light' | 'medium' | 'heavy';
  liquid?: boolean;
  interactive?: boolean;
  loading?: boolean;
  content?: string;
}
