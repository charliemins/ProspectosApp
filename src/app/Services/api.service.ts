import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { apiResponse } from '../Interfaces/apiResponse';
import { Prospecto } from '../Interfaces/prospecto';
import { ProspectoU } from '../Interfaces/prospectoU';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url;
  constructor(
    public http: HttpClient,
  ) { 
    this.url = environment.apiUrl;
  }

  // prospectoRegistro(data)
  // {
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');

  //   return this.http.post<apiResponse>(this.url, data, {headers: headers});
  // }
  
  prospectoRegistro(data):Observable<Prospecto[]>{
    const url = `${this.url}`; 
    return this.http.post<Prospecto[]>(url, data);
  }
  
  obtenerProspectos():Observable<Prospecto[]>{
    const url = `${this.url}`; 
    return this.http.get<Prospecto[]>(url);
  }

  obtenerProspecto(id):Observable<Prospecto>{
    const url = `${this.url}`; 
    return this.http.get<Prospecto>(url + id);
  }
  
  obtenerProspectosEnviados():Observable<Prospecto[]>{
    const url = `${this.url}`; 
    return this.http.get<Prospecto[]>(url + '/enviados');
  }

  prospectoActualizacion(id, data){
    const url = `${this.url}`; 
    return this.http.put<ProspectoU>(url + id, data);
  }


}
