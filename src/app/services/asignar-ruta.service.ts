import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { asignarRutaDto } from '../models/asignarRutaDto';
import { asignarRuta } from '../models/asignarRuta';
import { asignarRutaTotal } from '../models/asignarRutaTotal';

@Injectable({
  providedIn: 'root'
})
export class AsignarRutaService {
  private apiUrl = 'http://localhost:8080/asignar';

  constructor(private http: HttpClient) {}

  listarRutaAsignada():Observable<asignarRutaTotal[]>{
    return this.http.get<asignarRutaTotal[]>(`${this.apiUrl}/listar`)
  }


  listarAsignarRutaConductor(id: number): Observable<asignarRutaDto[]> {
    return this.http.get<asignarRutaDto[]>(`${this.apiUrl}/listar/${id}`);
  }

  listarAsignarRutaUsuario(id: number): Observable<asignarRutaTotal[]> {
    return this.http.get<asignarRutaTotal[]>(`${this.apiUrl}/listarUsuario/${id}`);
  }

  crearAsignacion(asignarRuta: asignarRuta): Observable<asignarRuta> {
    return this.http.post<asignarRuta>(`${this.apiUrl}/crear`, asignarRuta);
  }

  eliminarAsignarRuta(idAsignarRuta: number): Observable<void> {
    const url = `${this.apiUrl}/eliminar/${idAsignarRuta}`; // Asegúrate de que el endpoint sea correcto
    return this.http.delete<void>(url);
  }
  

}
