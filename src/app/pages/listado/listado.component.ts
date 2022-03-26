import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Prospecto } from 'src/app/Interfaces/prospecto';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  public prospecto: Prospecto;
  public prospectos: Prospecto[];

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.obtenerProspectos();
  }

  obtenerProspectos(){
    this.apiService.obtenerProspectos().subscribe(
      res=>{
        this.prospectos = res;
        console.log(this.prospectos);
      }
    )
  }

  consultar(id:number){
    this.apiService.obtenerProspecto(id).subscribe(
      res=>{
        console.log(res);
      }
    )
  }

}
