import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CapturaComponent } from './pages/captura/captura.component';
import { EvaluacionComponent } from './pages/evaluacion/evaluacion.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { ListadoModule } from './pages/listado/listado.module';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'captura',
    component: CapturaComponent
  },
  {
    path: 'evaluacion',
    component: EvaluacionComponent
  },
  {
    path: 'listado',
    component: ListadoComponent
  },
  {
    path: '**',
    redirectTo: 'home', 
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
