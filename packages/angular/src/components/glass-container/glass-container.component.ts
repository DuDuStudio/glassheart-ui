import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
export type ContainerVariant = 'default' | 'outline' | 'solid' | 'transparent';
export type GlassType = 'light' | 'medium' | 'heavy';
export type SpacingType = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type RoundedType = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ShadowType = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type OverflowType = 'visible' | 'hidden' | 'scroll' | 'auto';
export type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

@Component({
  selector: 'gh-glass-container',
  template: `
    <div
      [class]="containerClasses"
      [style]="containerStyle"
      (click)="onClick()"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      [attr.role]="interactive ? 'button' : null"
      [attr.tabindex]="interactive ? 0 : null"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./glass-container.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GlassContainerComponent),
      multi: true,
    },
  ],
})
export class GlassContainerComponent implements ControlValueAccessor {
  @Input() size: ContainerSize = 'md';
  @Input() variant: ContainerVariant = 'default';
  @Input() glass: GlassType = 'medium';
  @Input() interactive: boolean = false;
  @Input() liquid: boolean = false;
  @Input() animated: boolean = false;
  @Input() padding: SpacingType = 'md';
  @Input() margin: SpacingType = 'none';
  @Input() rounded: RoundedType = 'md';
  @Input() shadow: ShadowType = 'md';
  @Input() overflow: OverflowType = 'visible';
  @Input() position: PositionType = 'static';
  @Input() zIndex: number | undefined = undefined;
  @Input() className: string = '';

  @Output() click = new EventEmitter<void>();
  @Output() mouseenter = new EventEmitter<void>();
  @Output() mouseleave = new EventEmitter<void>();

  get containerClasses(): string {
    const baseClasses = 'gh-container';
    const sizeClasses = `gh-container-${this.size}`;
    const variantClasses = this.variant !== 'default' ? `gh-container-${this.variant}` : '';
    const glassClasses = `gh-glass-${this.glass}`;
    const interactiveClasses = this.interactive ? 'gh-container-interactive' : '';
    const liquidClasses = this.liquid ? 'gh-container-liquid' : '';
    const animatedClasses = this.animated ? 'gh-container-animated' : '';
    const paddingClasses = this.padding !== 'none' ? `gh-p-${this.padding}` : '';
    const marginClasses = this.margin !== 'none' ? `gh-m-${this.margin}` : '';
    const roundedClasses = this.rounded !== 'none' ? `gh-rounded-${this.rounded}` : '';
    const shadowClasses = this.shadow !== 'none' ? `gh-shadow-${this.shadow}` : '';
    const overflowClasses = this.overflow !== 'visible' ? `gh-overflow-${this.overflow}` : '';
    const positionClasses = this.position !== 'static' ? `gh-position-${this.position}` : '';

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
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  get containerStyle(): string {
    const styles: string[] = [];
    if (this.zIndex !== undefined) {
      styles.push(`z-index: ${this.zIndex}`);
    }
    return styles.join('; ');
  }

  onClick(): void {
    this.click.emit();
  }

  onMouseEnter(): void {
    this.mouseenter.emit();
  }

  onMouseLeave(): void {
    this.mouseleave.emit();
  }

  // ControlValueAccessor implementation
  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    // Not applicable for container component
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Not applicable for container component
  }
}
