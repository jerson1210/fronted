import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { conductorTotal } from '../models/conductorTotal';
import { conductor } from '../models/conductor';
import { loginRequest } from '../models/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private apiUrl ="http://localhost:8080/conductor"

  constructor(private http:HttpClient) { }

  getConductor():Observable<conductor[]>{
    return this.http.get<conductor[]>(`${this.apiUrl}/listar`)
  }

  getCondcutorId(id: number): Observable<conductor> {
    return this.http.get<conductor>(`${this.apiUrl}/obtener/${id}`);
  }
  

  createConductor(conductor: conductor): Observable<conductor> {
    return this.http.post<conductor>(`${this.apiUrl}/crear`, conductor);
  }
  

  actualizarConductor(conductor: conductor): Observable<conductor> {
    return this.http.put<conductor>(`${this.apiUrl}/actualizar`, conductor);
  }
  

  deleteConductor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  validarConductor(loginRequestt: loginRequest): Observable<conductor> {
    return this.http.post<conductor>(`${this.apiUrl}/login`, loginRequestt);
  }

  listarConductorPorUsuario(idUsuario: number): Observable<conductorTotal[]> {
    return this.http.get<conductorTotal[]>(`${this.apiUrl}/listar/${idUsuario}`);
  }

}
