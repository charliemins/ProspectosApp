import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapturaComponent } from './captura.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CapturaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CapturaModule { }
