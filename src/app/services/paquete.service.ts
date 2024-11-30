import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { paquete } from '../models/paquete';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {
  private apiUrl ="http://localhost:8080/book"

  constructor(private http:HttpClient) { }

  getVehiculo():Observable<paquete[]>{
    return this.http.get<paquete[]>(this.apiUrl)
  }

  getVehiculoId(id: number): Observable<paquete> {
    return this.http.get<paquete>(`${this.apiUrl}/listar/${id}`);
  }
  

  createVehiculo(vehiculo: paquete): Observable<paquete> {
    return this.http.post<paquete>(`${this.apiUrl}/crear`, vehiculo);
  }
  

  actualizarVehiculo(vehiculo: paquete): Observable<paquete> {
    return this.http.put<paquete>(`${this.apiUrl}/actualizar`, vehiculo);
  }
  

  deleteVehiculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
