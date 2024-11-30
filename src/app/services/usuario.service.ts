import { Injectable } from '@angular/core';
import { usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl ="http://localhost:8080/book"

  constructor(private http:HttpClient) { }

  getVehiculo():Observable<usuario[]>{
    return this.http.get<usuario[]>(this.apiUrl)
  }

  getVehiculoId(id: number): Observable<usuario> {
    return this.http.get<usuario>(`${this.apiUrl}/listar/${id}`);
  }
  

  createVehiculo(vehiculo: usuario): Observable<usuario> {
    return this.http.post<usuario>(`${this.apiUrl}/crear`, vehiculo);
  }
  

  actualizarVehiculo(vehiculo: usuario): Observable<usuario> {
    return this.http.put<usuario>(`${this.apiUrl}/actualizar`, vehiculo);
  }
  

  deleteVehiculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
