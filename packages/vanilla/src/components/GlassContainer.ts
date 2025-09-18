export interface GlassContainerOptions {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  variant?: 'default' | 'outline' | 'solid' | 'transparent';
  glass?: 'light' | 'medium' | 'heavy';
  interactive?: boolean;
  liquid?: boolean;
  animated?: boolean;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  zIndex?: number;
  className?: string;
  content?: string;
  children?: HTMLElement[];
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export class GlassContainer {
  private element: HTMLDivElement;
  private options: GlassContainerOptions;

  constructor(options: GlassContainerOptions = {}) {
    this.options = {
      size: 'md',
      variant: 'default',
      glass: 'medium',
      interactive: false,
      liquid: false,
      animated: false,
      padding: 'md',
      margin: 'none',
      rounded: 'md',
      shadow: 'md',
      overflow: 'visible',
      position: 'static',
      className: '',
      content: '',
      children: [],
      ...options,
    };

    this.element = this.createElement();
    this.setupEventListeners();
  }

  private createElement(): HTMLDivElement {
    const element = document.createElement('div');
    
    // Set classes
    const classes = this.getContainerClasses();
    element.className = classes;

    // Set styles
    const styles = this.getContainerStyles();
    Object.assign(element.style, styles);

    // Set content
    if (this.options.content) {
      element.innerHTML = this.options.content;
    }

    // Append children
    if (this.options.children && this.options.children.length > 0) {
      this.options.children.forEach(child => {
        element.appendChild(child);
      });
    }

    return element;
  }

  private getContainerClasses(): string {
    const baseClasses = 'gh-container';
    const sizeClasses = `gh-container-${this.options.size}`;
    const variantClasses = this.options.variant !== 'default' ? `gh-container-${this.options.variant}` : '';
    const glassClasses = `gh-glass-${this.options.glass}`;
    const interactiveClasses = this.options.interactive ? 'gh-container-interactive' : '';
    const liquidClasses = this.options.liquid ? 'gh-container-liquid' : '';
    const animatedClasses = this.options.animated ? 'gh-container-animated' : '';
    const paddingClasses = this.options.padding !== 'none' ? `gh-p-${this.options.padding}` : '';
    const marginClasses = this.options.margin !== 'none' ? `gh-m-${this.options.margin}` : '';
    const roundedClasses = this.options.rounded !== 'none' ? `gh-rounded-${this.options.rounded}` : '';
    const shadowClasses = this.options.shadow !== 'none' ? `gh-shadow-${this.options.shadow}` : '';
    const overflowClasses = this.options.overflow !== 'visible' ? `gh-overflow-${this.options.overflow}` : '';
    const positionClasses = this.options.position !== 'static' ? `gh-position-${this.options.position}` : '';

    return [
      baseClasses,
      sizeClasses,
      variantClasses,
      glassClasses,
      interactiveClasses,
      liquidClasses,
      animatedClasses,
      paddingClasses,
      marginClasses,
      roundedClasses,
      shadowClasses,
      overflowClasses,
      positionClasses,
      this.options.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  private getContainerStyles(): Record<string, string> {
    const styles: Record<string, string> = {};
    
    if (this.options.zIndex !== undefined) {
      styles.zIndex = this.options.zIndex.toString();
    }

    return styles;
  }

  private setupEventListeners(): void {
    if (this.options.onClick) {
      this.element.addEventListener('click', this.options.onClick);
    }

    if (this.options.onMouseEnter) {
      this.element.addEventListener('mouseenter', this.options.onMouseEnter);
    }

    if (this.options.onMouseLeave) {
      this.element.addEventListener('mouseleave', this.options.onMouseLeave);
    }
  }

  // Public methods
  render(selector: string | HTMLElement): void {
    const target = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;
    
    if (target) {
      target.appendChild(this.element);
    } else {
      console.error('Target element not found:', selector);
    }
  }

  appendTo(element: HTMLElement): void {
    element.appendChild(this.element);
  }

  remove(): void {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }

  update(options: Partial<GlassContainerOptions>): void {
    Object.assign(this.options, options);
    
    // Recreate element with new options
    const newElement = this.createElement();
    if (this.element.parentNode) {
      this.element.parentNode.replaceChild(newElement, this.element);
    }
    this.element = newElement;
    this.setupEventListeners();
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  // Getters for current state
  get size(): string {
    return this.options.size || 'md';
  }

  get variant(): string {
    return this.options.variant || 'default';
  }

  get glass(): string {
    return this.options.glass || 'medium';
  }

  get interactive(): boolean {
    return this.options.interactive || false;
  }

  get liquid(): boolean {
    return this.options.liquid || false;
  }

  get animated(): boolean {
    return this.options.animated || false;
  }

  // Static factory methods
  static create(options: GlassContainerOptions = {}): GlassContainer {
    return new GlassContainer(options);
  }

  static fromElement(element: HTMLElement, options: GlassContainerOptions = {}): GlassContainer {
    const container = new GlassContainer(options);
    container.element = element as HTMLDivElement;
    container.setupEventListeners();
    return container;
  }
}
