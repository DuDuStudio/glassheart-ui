import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type InputVariant = 'default' | 'outline' | 'solid';
export type GlassType = 'light' | 'medium' | 'heavy';

@Component({
  selector: 'gh-glass-input',
  template: `
    <div [class]="inputGroupClasses">
      <label *ngIf="label" [for]="inputId" class="gh-input-label">{{ label }}</label>
      
      <div class="gh-input-wrapper">
        <div *ngIf="icon && iconPosition === 'left'" class="gh-input-icon-left">
          <ng-content select="[slot=icon]"></ng-content>
          <span *ngIf="!hasIconSlot">{{ icon }}</span>
        </div>
        
        <input
          [id]="inputId"
          [class]="inputClasses"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="onInput($event)"
          (focus)="onFocus.emit($event)"
          (blur)="onBlur.emit($event)"
        />
        
        <div *ngIf="icon && iconPosition === 'right'" class="gh-input-icon-right">
          <ng-content select="[slot=icon]"></ng-content>
          <span *ngIf="!hasIconSlot">{{ icon }}</span>
        </div>
        
        <div *ngIf="button" class="gh-input-button">
          <ng-content select="[slot=button]"></ng-content>
          <span *ngIf="!hasButtonSlot">{{ button }}</span>
        </div>
      </div>
      
      <div *ngIf="error" class="gh-input-error">{{ error }}</div>
      <div *ngIf="help && !error" class="gh-input-help">{{ help }}</div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GlassInputComponent),
      multi: true
    }
  ]
})
export class GlassInputComponent implements ControlValueAccessor {
  @Input() value: string = '';
  @Input() type: string = 'text';
  @Input() size: InputSize = 'md';
  @Input() variant: InputVariant = 'default';
  @Input() glass: GlassType = 'medium';
  @Input() liquid: boolean = false;
  @Input() error: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() help: string = '';
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() button: string = '';
  @Input() className: string = '';

  @Output() onChange = new EventEmitter<string>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();

  inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  hasIconSlot = false;
  hasButtonSlot = false;

  get inputGroupClasses(): string {
    const classes = ['gh-input-group'];
    
    if (this.size) {
      classes.push(`gh-input-group-${this.size}`);
    }
    
    if (this.error) {
      classes.push('gh-input-error-state');
    }

    if (this.className) {
      classes.push(this.className);
    }

    return classes.join(' ');
  }

  get inputClasses(): string {
    const classes = ['gh-input'];
    
    if (this.size) {
      classes.push(`gh-input-${this.size}`);
    }
    
    if (this.variant) {
      classes.push(`gh-input-${this.variant}`);
    }
    
    if (this.glass) {
      classes.push(`gh-glass-${this.glass}`);
    }
    
    if (this.liquid) {
      classes.push('gh-liquid-flow');
    }
    
    if (this.error) {
      classes.push('gh-input-error');
    }
    
    if (this.disabled) {
      classes.push('gh-disabled');
    }

    return classes.join(' ');
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange.emit(this.value);
    this.onChangeValue(this.value);
  }

  // ControlValueAccessor implementation
  private onChangeValue = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeValue = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
