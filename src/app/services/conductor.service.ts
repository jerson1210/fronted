import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { conductor } from '../models/conductor';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private apiUrl ="http://localhost:8080/book"

  constructor(private http:HttpClient) { }

  getVehiculo():Observable<conductor[]>{
    return this.http.get<conductor[]>(this.apiUrl)
  }

  getVehiculoId(id: number): Observable<conductor> {
    return this.http.get<conductor>(`${this.apiUrl}/listar/${id}`);
  }
  

  createVehiculo(vehiculo: conductor): Observable<conductor> {
    return this.http.post<conductor>(`${this.apiUrl}/crear`, vehiculo);
  }
  

  actualizarVehiculo(vehiculo: conductor): Observable<conductor> {
    return this.http.put<conductor>(`${this.apiUrl}/actualizar`, vehiculo);
  }
  

  deleteVehiculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
