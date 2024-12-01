
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private apiUrl = 'http://localhost:8080/api/rutas'; // Asegúrate de usar la URL de tu API

  constructor(private http: HttpClient) { }
  obtenerPaquetes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Método para crear la ruta
  crearRuta(rutaData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/crear', rutaData); // Enviar la solicitud POST
  }
}
