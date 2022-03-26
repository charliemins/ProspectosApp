import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Prospecto } from 'src/app/Interfaces/prospecto';
import Swal from 'sweetalert2';
import { ApiService } from '../../Services/api.service';
import { ObservacionComponent } from './observacion/observacion.component';
import { ProspectoU } from '../../Interfaces/prospectoU';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

  prospectoA: ProspectoU = {
    observacion: 'ninguna',
    status: 'autorizado'
  }
  prospectoR: ProspectoU = {
    observacion: '',
    status: 'rechazado'
  }
  public prospectos: Prospecto[];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerProspectros()
  }

  obtenerProspectros(){
    this.apiService.obtenerProspectosEnviados().subscribe(
      res=>{
        this.prospectos = res;
        console.log(this.prospectos);
      }
    )
  }

  autorizar(id:number){
    this.apiService.prospectoActualizacion(id, this.prospectoA).subscribe(
      res=>{
        console.log(res);
        this.reloadCurrentRoute();
        Swal.fire({
          icon: 'success',
          title: 'Autorización exitosa',
          showConfirmButton: false,
          timer: 1500
        });
      },
      err=>{
        console.log(err);
      }
    )
  }
  
  rechazar(id:number){
    const dialog = this.dialog.open(ObservacionComponent, {});

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.prospectoR.observacion = result;
          this.apiService.prospectoActualizacion(id, this.prospectoR).subscribe(
            res => {
              console.log(this.prospectoR);
              
              console.log(res);
              Swal.fire({
                icon: 'success',
                title: 'Rechazo exitoso',
                showConfirmButton: false,
                timer: 1500
              });
              this.reloadCurrentRoute();
            }
          )
        }
      }
    )
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
