import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GlassButtonComponent } from './components/glass-button/glass-button.component';
import { GlassCardComponent } from './components/glass-card/glass-card.component';
import { GlassInputComponent } from './components/glass-input/glass-input.component';

@NgModule({
  declarations: [
    GlassButtonComponent,
    GlassCardComponent,
    GlassInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    GlassButtonComponent,
    GlassCardComponent,
    GlassInputComponent
  ]
})
export class GlassHeartUIModule { }
