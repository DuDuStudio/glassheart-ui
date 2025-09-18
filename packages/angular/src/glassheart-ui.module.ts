import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GlassButtonComponent } from './components/glass-button/glass-button.component';
import { GlassCardComponent } from './components/glass-card/glass-card.component';
import { GlassInputComponent } from './components/glass-input/glass-input.component';
import { GlassTypographyComponent } from './components/glass-typography/glass-typography.component';

@NgModule({
  declarations: [
    GlassButtonComponent,
    GlassCardComponent,
    GlassInputComponent,
    GlassTypographyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    GlassButtonComponent,
    GlassCardComponent,
    GlassInputComponent,
    GlassTypographyComponent
  ]
})
export class GlassHeartUIModule { }
