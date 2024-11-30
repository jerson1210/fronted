import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { vehiculo} from '../models/vehiculo';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private apiUrl ="http://localhost:8080/vehiculo"

  constructor(private http:HttpClient) { }

  getVehiculo():Observable<vehiculo[]>{
    return this.http.get<vehiculo[]>(`${this.apiUrl}/listar`)
  }

  getVehiculoId(id: number): Observable<vehiculo> {
    return this.http.get<vehiculo>(`${this.apiUrl}/listar/${id}`);
  }
  

  createVehiculo(vehiculo: vehiculo): Observable<vehiculo> {
    return this.http.post<vehiculo>(`${this.apiUrl}/crear`, vehiculo);
  }
  

  actualizarVehiculo(vehiculo: vehiculo): Observable<vehiculo> {
    return this.http.put<vehiculo>(`${this.apiUrl}/actualizar`, vehiculo);
  }
  

  deleteVehiculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
  
}
