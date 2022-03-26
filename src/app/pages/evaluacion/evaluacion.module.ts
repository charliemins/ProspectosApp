import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluacionComponent } from './evaluacion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ObservacionComponent } from './observacion/observacion.component';



@NgModule({
  declarations: [
    EvaluacionComponent,
    ObservacionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EvaluacionModule { }
