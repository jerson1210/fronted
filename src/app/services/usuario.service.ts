import { Injectable } from '@angular/core';
import { usuario } from '../models/usuario';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl ="http://localhost:8080/usuario"

  constructor(private http:HttpClient) { }
  
  validarUsuario(nombre: string, contrasena: string): Observable<string> {
    const loginRequest = { nombre, contrasena };
    return this.http.post<string>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap((response: any) => {
        // Suponiendo que el response contiene un objeto de usuario
        // Almacenar el usuario en el localStorage o en el servicio
        localStorage.setItem('usuario', JSON.stringify(response));
      }));
  }

  obtenerUsuario(): usuario | null {
    // Devuelve el usuario almacenado en el localStorage
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
 // getUsuario():Observable<usuario[]>{
   // return this.http.get<usuario[]>(this.apiUrl)
  //}

  getUsuarioId(id: number): Observable<usuario> {
    return this.http.get<usuario>(`${this.apiUrl}/listar/${id}`);
  }
  

  createUsuario(usuario: usuario): Observable<usuario> {
    return this.http.post<usuario>(`${this.apiUrl}/crear`, usuario);
  }
  

  actualizarUsuario(usuario: usuario): Observable<usuario> {
    return this.http.put<usuario>(`${this.apiUrl}/actualizar`, usuario);
  }
  

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
