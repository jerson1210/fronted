import { usuario } from './usuario';  

export interface ruta {
  idRuta: number;   
  overviewPolyline: string;    
  coordenadas: string[];       
  usuario: usuario; 
}
