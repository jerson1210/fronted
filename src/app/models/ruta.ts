import { usuario } from './usuario';  

export interface ruta {
  
  overviewPolyline: string;    
  coordenadas: string[];       
  usuario: {
    idUsuario: number; // Relación con el usuario, solo es necesario el ID
  };
}
