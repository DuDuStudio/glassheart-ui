import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UseLiquidGlassService, LiquidGlassOptions } from '../../services/useLiquidGlass.service';
import { Observable } from 'rxjs';

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link';
export type ButtonShape = 'default' | 'circle' | 'pill';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GlassType = 'light' | 'medium' | 'heavy';

@Component({
  selector: 'gh-glass-button',
  template: `
    <button
      #buttonElement
      [class]="buttonClasses"
      [style]="liquidGlassStyle | async"
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
export class GlassButtonComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() variant: ButtonVariant = 'default';
  @Input() shape: ButtonShape = 'default';
  @Input() size: ButtonSize = 'md';
  @Input() glass: GlassType = 'medium';
  @Input() liquidGlass: boolean = false;
  @Input() liquidGlassOptions: Partial<LiquidGlassOptions> = {};
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

  @Output() onClick = new EventEmitter<MouseEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onMouseEnter = new EventEmitter<MouseEvent>();
  @Output() onMouseLeave = new EventEmitter<MouseEvent>();

  public liquidGlassStyle: Observable<{ backdropFilter: string }> = new Observable();

  private liquidGlassHook: any;

  constructor(private useLiquidGlassService: UseLiquidGlassService) {}

  ngOnInit() {
    if (this.liquidGlass) {
      this.liquidGlassHook = this.useLiquidGlassService.useLiquidGlass({
        depth: 8,
        strength: 100,
        chromaticAberration: 0,
        blur: 2,
        ...this.liquidGlassOptions,
      });
      
      this.liquidGlassStyle = this.liquidGlassHook.liquidGlassStyle$;
    }
  }

  ngOnDestroy() {
    // Cleanup is handled by the service
  }

  get buttonClasses(): string {
    const classes = ['gh-btn'];
    
    // Variant classes
    classes.push(`gh-btn-${this.variant}`);
    
    // Shape classes
    if (this.shape !== 'default') {
      classes.push(`gh-btn-${this.shape}`);
    }
    
    // Size classes
    classes.push(`gh-btn-${this.size}`);
    
    // Glass classes
    classes.push(`gh-glass-${this.glass}`);
    
    // Liquid glass classes
    if (this.liquidGlass) {
      classes.push('gh-btn-liquid-glass');
    }
    
    // Loading classes
    if (this.loading) {
      classes.push('gh-btn-loading');
    }
    
    return classes.filter(Boolean).join(' ');
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    // Not applicable for buttons
  }

  registerOnChange(fn: (value: any) => void): void {
    // Not applicable for buttons
  }

  registerOnTouched(fn: () => void): void {
    // Not applicable for buttons
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}