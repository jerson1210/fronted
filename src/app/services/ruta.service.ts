import { Injectable } from '@angular/core';
import { rutaTotal } from '../models/rutaTotal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RutaService {
 private apiUrl ="http://localhost:8080/ruta"
  constructor(private http:HttpClient) { }
  ListarRutaPorUsuario(idUsuario: number): Observable<rutaTotal[]> {
    return this.http.get<rutaTotal[]>(`${this.apiUrl}/listar/${idUsuario}`);
  }
  
  deleteRuta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
