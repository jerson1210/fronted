import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { conductor } from '../models/conductor';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private apiUrl ="http://localhost:8080/conductor"

  constructor(private http:HttpClient) { }

  getConductor():Observable<conductor[]>{
    return this.http.get<conductor[]>(this.apiUrl)
  }

  getCondcutorId(id: number): Observable<conductor> {
    return this.http.get<conductor>(`${this.apiUrl}/listar/${id}`);
  }
  

  createConductor(vehiculo: conductor): Observable<conductor> {
    return this.http.post<conductor>(`${this.apiUrl}/crear`, vehiculo);
  }
  

  actualizarConductor(vehiculo: conductor): Observable<conductor> {
    return this.http.put<conductor>(`${this.apiUrl}/actualizar`, vehiculo);
  }
  

  deleteConductor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
