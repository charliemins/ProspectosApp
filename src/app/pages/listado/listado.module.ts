import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoRoutingModule } from './listado-routing.module';
import { MaterialModule } from '../../material/material.module';
import { ListadoComponent } from './listado.component';


@NgModule({
  declarations: [
    ListadoComponent,
  ],
  imports: [
    CommonModule,
    ListadoRoutingModule,
    MaterialModule
  ]
})
export class ListadoModule { }
