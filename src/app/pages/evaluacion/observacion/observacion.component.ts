import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.css']
})
export class ObservacionComponent implements OnInit {

  public observacion: string

  constructor(
    private dialogRef: MatDialogRef<ObservacionComponent>,
  ) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    return 'Este campo es obligatorio';
  }

  confirmar(){
    if (this.observacion == null) {
      this.getErrorMessage();
    }else{
      this.dialogRef.close(this.observacion);
    }
  }

}
