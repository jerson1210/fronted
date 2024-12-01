import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { asignarRutaDto } from '../models/asignarRutaDto';

@Injectable({
  providedIn: 'root'
})
export class AsignarRutaService {
  private apiUrl = 'http://localhost:8080/asignar';

  constructor(private http: HttpClient) {}

  listarAsignarRutaConductor(id: number): Observable<asignarRutaDto[]> {
    return this.http.get<asignarRutaDto[]>(`${this.apiUrl}/listar/${id}`);
  }

  eliminarRuta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  eliminarAsignarRuta(idAsignarRuta: number): Observable<void> {
    const url = `${this.apiUrl}/eliminar/${idAsignarRuta}`; // Asegúrate de que el endpoint sea correcto
    return this.http.delete<void>(url);
  }
  

}
