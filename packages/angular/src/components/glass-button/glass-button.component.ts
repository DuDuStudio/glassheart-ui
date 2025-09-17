import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GlassType = 'light' | 'medium' | 'heavy';

@Component({
  selector: 'gh-glass-button',
  template: `
    <button
      [class]="buttonClasses"
      [disabled]="disabled || loading"
      (click)="onClick.emit($event)"
      (focus)="onFocus.emit($event)"
      (blur)="onBlur.emit($event)"
      (mouseenter)="onMouseEnter.emit($event)"
      (mouseleave)="onMouseLeave.emit($event)"
    >
      <span *ngIf="loading" class="gh-loading-spinner"></span>
      <ng-content *ngIf="!loading"></ng-content>
    </button>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GlassButtonComponent),
      multi: true
    }
  ]
})
export class GlassButtonComponent implements ControlValueAccessor {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'md';
  @Input() glass: GlassType = 'medium';
  @Input() liquid: boolean = false;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() className: string = '';

  @Output() onClick = new EventEmitter<MouseEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onMouseEnter = new EventEmitter<MouseEvent>();
  @Output() onMouseLeave = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    const classes = ['gh-button'];
    
    if (this.variant) {
      classes.push(`gh-button-${this.variant}`);
    }
    
    if (this.size) {
      classes.push(`gh-button-${this.size}`);
    }
    
    if (this.glass) {
      classes.push(`gh-glass-${this.glass}`);
    }
    
    if (this.liquid) {
      classes.push('gh-liquid-flow');
    }
    
    if (this.loading) {
      classes.push('gh-loading');
    }
    
    if (this.disabled) {
      classes.push('gh-disabled');
    }

    if (this.className) {
      classes.push(this.className);
    }

    return classes.join(' ');
  }

  // ControlValueAccessor implementation
  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    // Button doesn't have a value, but we can track disabled state
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
