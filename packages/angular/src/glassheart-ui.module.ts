import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GlassButtonComponent } from './components/glass-button/glass-button.component';
import { GlassCardComponent } from './components/glass-card/glass-card.component';
import { GlassInputComponent } from './components/glass-input/glass-input.component';
import { GlassTypographyComponent } from './components/glass-typography/glass-typography.component';
import { GlassContainerComponent } from './components/glass-container/glass-container.component';

@NgModule({
  declarations: [
    GlassButtonComponent,
    GlassCardComponent,
    GlassInputComponent,
    GlassTypographyComponent,
    GlassContainerComponent
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
    GlassTypographyComponent,
    GlassContainerComponent
  ]
})
export class GlassHeartUIModule { }
