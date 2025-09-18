import { Component, Input, Output, EventEmitter, forwardRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type NavigationVariant = 'default' | 'transparent' | 'solid' | 'floating';
export type GlassType = 'light' | 'medium' | 'heavy';
export type NavigationPosition = 'top' | 'bottom' | 'left' | 'right';
export type NavigationSize = 'sm' | 'md' | 'lg';
export type ShadowType = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type SpacingType = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RoundedType = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'gh-glass-navigation',
  template: `
    <nav [class]="navigationClasses" [style]="navigationStyle">
      <div class="gh-navigation-container">
        <ng-content></ng-content>
      </div>
    </nav>
  `,
  styleUrls: ['./glass-navigation.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GlassNavigationComponent),
      multi: true,
    },
  ],
})
export class GlassNavigationComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() variant: NavigationVariant = 'default';
  @Input() glass: GlassType = 'medium';
  @Input() position: NavigationPosition = 'top';
  @Input() size: NavigationSize = 'md';
  @Input() sticky: boolean = false;
  @Input() fixed: boolean = false;
  @Input() liquid: boolean = false;
  @Input() animated: boolean = false;
  @Input() blur: boolean = true;
  @Input() shadow: ShadowType = 'md';
  @Input() padding: SpacingType = 'md';
  @Input() rounded: RoundedType = 'none';
  @Input() zIndex: number | undefined = undefined;
  @Input() className: string = '';

  @Output() toggle = new EventEmitter<boolean>();
  @Output() itemClick = new EventEmitter<{ item: string; index: number }>();

  isOpen: boolean = false;
  isScrolled: boolean = false;

  get navigationClasses(): string {
    const baseClasses = 'gh-navigation';
    const variantClasses = `gh-navigation-${this.variant}`;
    const glassClasses = `gh-glass-${this.glass}`;
    const positionClasses = `gh-navigation-${this.position}`;
    const sizeClasses = `gh-navigation-${this.size}`;
    const stickyClasses = this.sticky ? 'gh-navigation-sticky' : '';
    const fixedClasses = this.fixed ? 'gh-navigation-fixed' : '';
    const liquidClasses = this.liquid ? 'gh-navigation-liquid' : '';
    const animatedClasses = this.animated ? 'gh-navigation-animated' : '';
    const blurClasses = this.blur ? 'gh-navigation-blur' : '';
    const shadowClasses = this.shadow !== 'none' ? `gh-shadow-${this.shadow}` : '';
    const paddingClasses = this.padding !== 'none' ? `gh-p-${this.padding}` : '';
    const roundedClasses = this.rounded !== 'none' ? `gh-rounded-${this.rounded}` : '';
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
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  get navigationStyle(): string {
    const styles: string[] = [];
    if (this.zIndex !== undefined) {
      styles.push(`z-index: ${this.zIndex}`);
    }
    return styles.join('; ');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.sticky || this.fixed) {
      this.isScrolled = window.scrollY > 10;
    }
  }

  ngOnInit(): void {
    // Component initialization
  }

  ngOnDestroy(): void {
    // Cleanup
  }

  onToggle(): void {
    this.isOpen = !this.isOpen;
    this.toggle.emit(this.isOpen);
  }

  onItemClick(item: string, index: number): void {
    this.itemClick.emit({ item, index });
    this.isOpen = false;
  }

  // ControlValueAccessor implementation
  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    // Not applicable for navigation component
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Not applicable for navigation component
  }
}
