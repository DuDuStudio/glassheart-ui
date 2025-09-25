export interface GlassNavigationOptions {
  variant?: 'default' | 'transparent' | 'solid' | 'floating';
  glass?: 'light' | 'medium' | 'heavy';
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  sticky?: boolean;
  fixed?: boolean;
  liquid?: boolean;
  animated?: boolean;
  blur?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  zIndex?: number;
  className?: string;
  onToggle?: (isOpen: boolean) => void;
  onItemClick?: (item: string, index: number) => void;
}

export interface GlassNavigationItemOptions {
  text: string;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  icon?: string;
  badge?: string | number;
  onClick?: () => void;
}

export class GlassNavigation {
  private element: HTMLElement;
  private options: GlassNavigationOptions;
  private isOpen: boolean = false;
  private isScrolled: boolean = false;
  private items: GlassNavigationItem[] = [];

  constructor(options: GlassNavigationOptions = {}) {
    this.options = {
      variant: 'default',
      glass: 'medium',
      position: 'top',
      size: 'md',
      sticky: false,
      fixed: false,
      liquid: false,
      animated: false,
      blur: true,
      shadow: 'md',
      padding: 'md',
      rounded: 'full',
      className: '',
      ...options,
    };

    this.element = this.createElement();
    this.setupEventListeners();
  }

  private createElement(): HTMLElement {
    const element = document.createElement('nav');
    
    // Set classes
    const classes = this.getNavigationClasses();
    element.className = classes;

    // Set styles
    const styles = this.getNavigationStyles();
    Object.assign(element.style, styles);

    // Create container
    const container = document.createElement('div');
    container.className = 'gh-navigation-container';
    element.appendChild(container);

    return element;
  }

  private getNavigationClasses(): string {
    const baseClasses = 'gh-navigation';
    const variantClasses = `gh-navigation-${this.options.variant}`;
    const glassClasses = `gh-glass-${this.options.glass}`;
    const positionClasses = `gh-navigation-${this.options.position}`;
    const sizeClasses = `gh-navigation-${this.options.size}`;
    const stickyClasses = this.options.sticky ? 'gh-navigation-sticky' : '';
    const fixedClasses = this.options.fixed ? 'gh-navigation-fixed' : '';
    const liquidClasses = this.options.liquid ? 'gh-navigation-liquid' : '';
    const animatedClasses = this.options.animated ? 'gh-navigation-animated' : '';
    const blurClasses = this.options.blur ? 'gh-navigation-blur' : '';
    const shadowClasses = this.options.shadow !== 'none' ? `gh-shadow-${this.options.shadow}` : '';
    const paddingClasses = this.options.padding !== 'none' ? `gh-p-${this.options.padding}` : '';
    const roundedClasses = this.options.rounded !== 'none' ? `gh-rounded-${this.options.rounded}` : '';
    const scrolledClasses = this.isScrolled ? 'gh-navigation-scrolled' : '';

    return [
      baseClasses,
      variantClasses,
      glassClasses,
      positionClasses,
      sizeClasses,
      stickyClasses,
      fixedClasses,
      liquidClasses,
      animatedClasses,
      blurClasses,
      shadowClasses,
      paddingClasses,
      roundedClasses,
      scrolledClasses,
      this.options.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  private getNavigationStyles(): Record<string, string> {
    const styles: Record<string, string> = {};
    
    if (this.options.zIndex !== undefined) {
      styles.zIndex = this.options.zIndex.toString();
    }

    return styles;
  }

  private setupEventListeners(): void {
    if (this.options.sticky || this.options.fixed) {
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  private handleScroll(): void {
    this.isScrolled = window.scrollY > 10;
    this.updateClasses();
  }

  private updateClasses(): void {
    this.element.className = this.getNavigationClasses();
  }

  // Public methods
  addBrand(text: string, href?: string, onClick?: () => void): void {
    const brand = document.createElement(href ? 'a' : 'div');
    brand.className = 'gh-navigation-brand';
    brand.textContent = text;
    
    if (href) {
      (brand as HTMLAnchorElement).href = href;
    }
    
    if (onClick) {
      brand.addEventListener('click', onClick);
    }

    const container = this.element.querySelector('.gh-navigation-container');
    if (container) {
      container.appendChild(brand);
    }
  }

  addItem(options: GlassNavigationItemOptions): GlassNavigationItem {
    const item = new GlassNavigationItem(options);
    this.items.push(item);
    
    const container = this.element.querySelector('.gh-navigation-container');
    if (container) {
      // Create menu if it doesn't exist
      let menu = container.querySelector('.gh-navigation-menu');
      if (!menu) {
        menu = document.createElement('div');
        menu.className = 'gh-navigation-menu';
        container.appendChild(menu);
      }
      
      menu.appendChild(item.getElement());
    }

    return item;
  }

  addToggle(): void {
    const toggle = document.createElement('button');
    toggle.className = 'gh-navigation-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Add hamburger lines
    for (let i = 0; i < 3; i++) {
      const line = document.createElement('span');
      line.className = 'gh-navigation-toggle-line';
      toggle.appendChild(line);
    }

    toggle.addEventListener('click', () => {
      this.toggle();
    });

    const container = this.element.querySelector('.gh-navigation-container');
    if (container) {
      container.appendChild(toggle);
    }
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.updateMenuState();
    this.options.onToggle?.(this.isOpen);
  }

  private updateMenuState(): void {
    const menu = this.element.querySelector('.gh-navigation-menu');
    const toggle = this.element.querySelector('.gh-navigation-toggle');
    
    if (menu) {
      if (this.isOpen) {
        menu.classList.add('gh-navigation-menu-open');
      } else {
        menu.classList.remove('gh-navigation-menu-open');
      }
    }

    if (toggle) {
      if (this.isOpen) {
        toggle.classList.add('gh-navigation-toggle-open');
      } else {
        toggle.classList.remove('gh-navigation-toggle-open');
      }
    }
  }

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

  update(options: Partial<GlassNavigationOptions>): void {
    Object.assign(this.options, options);
    this.updateClasses();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  // Static factory methods
  static create(options: GlassNavigationOptions = {}): GlassNavigation {
    return new GlassNavigation(options);
  }
}

export class GlassNavigationItem {
  private element: HTMLElement;
  private options: GlassNavigationItemOptions;

  constructor(options: GlassNavigationItemOptions) {
    this.options = {
      active: false,
      disabled: false,
      ...options,
    };

    this.element = this.createElement();
    this.setupEventListeners();
  }

  private createElement(): HTMLElement {
    const isLink = !!this.options.href && !this.options.disabled;
    const element = isLink ? document.createElement('a') : document.createElement('button');
    
    const baseClasses = 'gh-navigation-item';
    const activeClasses = this.options.active ? 'gh-navigation-item-active' : '';
    const disabledClasses = this.options.disabled ? 'gh-navigation-item-disabled' : '';
    
    element.className = [baseClasses, activeClasses, disabledClasses]
      .filter(Boolean)
      .join(' ');

    if (isLink) {
      (element as HTMLAnchorElement).href = this.options.href!;
    }

    if (this.options.disabled && element instanceof HTMLButtonElement) {
      element.disabled = true;
    }

    // Add icon
    if (this.options.icon) {
      const icon = document.createElement('span');
      icon.className = 'gh-navigation-item-icon';
      icon.textContent = this.options.icon;
      element.appendChild(icon);
    }

    // Add text
    const text = document.createElement('span');
    text.className = 'gh-navigation-item-text';
    text.textContent = this.options.text;
    element.appendChild(text);

    // Add badge
    if (this.options.badge) {
      const badge = document.createElement('span');
      badge.className = 'gh-navigation-item-badge';
      badge.textContent = this.options.badge.toString();
      element.appendChild(badge);
    }

    return element;
  }

  private setupEventListeners(): void {
    this.element.addEventListener('click', () => {
      if (!this.options.disabled) {
        this.options.onClick?.();
      }
    });
  }

  getElement(): HTMLElement {
    return this.element;
  }

  setActive(active: boolean): void {
    this.options.active = active;
    if (active) {
      this.element.classList.add('gh-navigation-item-active');
    } else {
      this.element.classList.remove('gh-navigation-item-active');
    }
  }

  setDisabled(disabled: boolean): void {
    this.options.disabled = disabled;
    if (disabled) {
      this.element.classList.add('gh-navigation-item-disabled');
      if (this.element instanceof HTMLButtonElement) {
        this.element.disabled = true;
      }
    } else {
      this.element.classList.remove('gh-navigation-item-disabled');
      if (this.element instanceof HTMLButtonElement) {
        this.element.disabled = false;
      }
    }
  }
}
