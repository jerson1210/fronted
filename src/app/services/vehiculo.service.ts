import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { vehiculos } from '../models/vehiculo';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private apiUrl ="http://localhost:8080/vehiculo"

  constructor(private http:HttpClient) { }

  getVehiculo():Observable<vehiculos[]>{
    return this.http.get<vehiculos[]>(this.apiUrl)
  }

  getVehiculoId(id: number): Observable<vehiculos> {
    return this.http.get<vehiculos>(`${this.apiUrl}/listar/${id}`);
  }
  

  createVehiculo(vehiculo: vehiculos): Observable<vehiculos> {
    return this.http.post<vehiculos>(`${this.apiUrl}/crear`, vehiculo);
  }
  

  actualizarVehiculo(vehiculo: vehiculos): Observable<vehiculos> {
    return this.http.put<vehiculos>(`${this.apiUrl}/actualizar`, vehiculo);
  }
  

  deleteVehiculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
  
}
