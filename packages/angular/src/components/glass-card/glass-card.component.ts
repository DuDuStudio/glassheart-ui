import { Component, Input, Output, EventEmitter } from '@angular/core';

export type CardSize = 'sm' | 'md' | 'lg' | 'xl';
export type CardVariant = 'default' | 'outline' | 'solid';
export type GlassType = 'light' | 'medium' | 'heavy';

@Component({
  selector: 'gh-glass-card',
  template: `
    <div
      [class]="cardClasses"
      (click)="onClick.emit($event)"
      (mouseenter)="onMouseEnter.emit($event)"
      (mouseleave)="onMouseLeave.emit($event)"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class GlassCardComponent {
  @Input() size: CardSize = 'md';
  @Input() variant: CardVariant = 'default';
  @Input() glass: GlassType = 'medium';
  @Input() liquid: boolean = false;
  @Input() interactive: boolean = false;
  @Input() loading: boolean = false;
  @Input() className: string = '';

  @Output() onClick = new EventEmitter<MouseEvent>();
  @Output() onMouseEnter = new EventEmitter<MouseEvent>();
  @Output() onMouseLeave = new EventEmitter<MouseEvent>();

  get cardClasses(): string {
    const classes = ['gh-card'];
    
    if (this.size) {
      classes.push(`gh-card-${this.size}`);
    }
    
    if (this.variant) {
      classes.push(`gh-card-${this.variant}`);
    }
    
    if (this.glass) {
      classes.push(`gh-glass-${this.glass}`);
    }
    
    if (this.liquid) {
      classes.push('gh-liquid-flow');
    }
    
    if (this.interactive) {
      classes.push('gh-interactive');
    }
    
    if (this.loading) {
      classes.push('gh-loading');
    }

    if (this.className) {
      classes.push(this.className);
    }

    return classes.join(' ');
  }
}
