import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { paquete } from '../models/paquete';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {
  private apiUrl ="http://localhost:8080/paquete"

  constructor(private http:HttpClient) { }

  getPaquete():Observable<paquete[]>{
    return this.http.get<paquete[]>(this.apiUrl)
  }

  getPaqueteId(id: number): Observable<paquete> {
    return this.http.get<paquete>(`${this.apiUrl}/listar/${id}`);
  }
  

  createPaquete(vehiculo: paquete): Observable<paquete> {
    return this.http.post<paquete>(`${this.apiUrl}/crear`, vehiculo);
  }
  

  actualizarPaquete(vehiculo: paquete): Observable<paquete> {
    return this.http.put<paquete>(`${this.apiUrl}/actualizar`, vehiculo);
  }
  

  deletePaquete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
