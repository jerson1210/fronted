import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { vehiculo} from '../models/vehiculo';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private apiUrl ="http://localhost:8080/vehiculo"

  constructor(private http:HttpClient) { }

  getVehiculo():Observable<vehiculo[]>{
    return this.http.get<vehiculo[]>(`${this.apiUrl}/listar`)
  }

  getVehiculoId(id: number): Observable<vehiculo> {
    
    return this.http.get<vehiculo>(`${this.apiUrl}/listar/${id}`);
  }
  

  createVehiculo(vehiculo: any): Observable<any> {
    const usuarioString = localStorage.getItem('usuario');  // Obtener el usuario desde localStorage
  
    // Comprobar si 'usuario' es null o vacío
    if (!usuarioString) {
      throw new Error("No se encontró el usuario en el localStorage");
    }
  
    // Si no es null, parsear el JSON
    const usuario = JSON.parse(usuarioString);
  
    // Asegurarse de que usuario no sea null
    if (!usuario || !usuario.idUsuario) {
      throw new Error("El usuario no tiene un ID válido");
    }
  
    const usuarioId = usuario.idUsuario;  // Obtener el ID del usuario
  
    // Asignar el ID del usuario al objeto vehiculo
    const vehiculoConUsuario = { 
      ...vehiculo,  // Copiar todas las propiedades del vehículo
      IdUsuario: usuarioId  // Asignar el ID del usuario al vehículo
    };
  
    // Enviar la solicitud POST con el objeto vehiculo que incluye el usuarioId
    return this.http.post<any>(`${this.apiUrl}/crear`, vehiculoConUsuario);
  }
  

  actualizarVehiculo(vehiculo: vehiculo): Observable<vehiculo> {
    return this.http.put<vehiculo>(`${this.apiUrl}/actualizar`, vehiculo);
  }
  

  deleteVehiculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
  
}
