import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { paquete } from '../models/paquete';
import { paqueteTotal } from '../models/paqueteTotal';

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
    return this.http.get<paquete>(`${this.apiUrl}/buscar/${id}`);
  }
  

  createPaquete(paquete: paquete): Observable<paquete> {
    return this.http.post<paquete>(`${this.apiUrl}/crear`, paquete);
  }
  

  actualizarPaquete(paquete: paquete): Observable<paquete> {
    return this.http.put<paquete>(`${this.apiUrl}/actualizar`, paquete);
  }
  

  deletePaquete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  listarPaquetePorUsuario(idUsuario: number): Observable<paqueteTotal[]> {
    return this.http.get<paqueteTotal[]>(`${this.apiUrl}/listar/${idUsuario}`);
  }
}
