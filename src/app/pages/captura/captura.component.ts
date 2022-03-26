import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Prospecto } from '../../Interfaces/prospecto';
import Swal from 'sweetalert2';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-captura',
  templateUrl: './captura.component.html',
  styleUrls: ['./captura.component.css']
})
export class CapturaComponent implements OnInit {
  public prospecto: Prospecto;
  public prospectos: Prospecto[];
  public miFormulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      nombre: ['', Validators.required],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      colonia: ['', Validators.required],
      codigo_postal: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern(/\d{5}/)]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/\d{10}/)]],
      rfc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    })
    this.obtenerProspectos();
  }

  getErrorMessage(campo: string) {
    if (this.miFormulario.get(campo).hasError('required')) {
      return 'Este campo es obligatorio';
    }
    else if(this.miFormulario.get(campo).invalid){
      return 'Ingrese el formato correcto'
    }
  }

  obtenerProspectos(){
    this.apiService.obtenerProspectos().subscribe(
      res=>{
        this.prospectos = res;
        console.log(this.prospectos);
      },
      err=>{
        console.log(err);
      }
    )
  }

  enviar(){
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
    } else {
      Swal.fire({
        title: '¿Estás seguro que deseas registrar al prospecto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#247ba0',
        cancelButtonColor: '#999',
        confirmButtonText: 'Si, confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.prospecto = this.miFormulario.value;
          this.prospecto.status = 'enviado';
          this.apiService.prospectoRegistro(this.prospecto).subscribe(
            res=>{
              console.log(res);
              Swal.fire({
                icon: 'success',
                title: 'Registro correcto',
                showConfirmButton: false,
                timer: 1500
              })
              this.reloadCurrentRoute();
            },
            err=>{
              console.log(err);
            }
          )
          console.log(this.prospecto);
  }
      })
    }
  }

  salir(){
    Swal.fire({
      title: '¿Estás seguro que deseas salir de la pantalla?',
      text: "Se perdera la información del formulario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B83735',
      cancelButtonColor: '#999',
      confirmButtonText: 'Si, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['home']);
      }
    })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

}
