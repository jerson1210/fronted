// src/app/models/asignar-ruta.ts

import { usuario } from './usuario';  
import { ruta } from './ruta';        
import { vehiculo } from './vehiculo';
import { conductor } from './conductor'; 

export interface asignarRuta {
  idAsignarRuta: number;
  usuario: usuario;    
  ruta: ruta;        
  vehiculo: vehiculo;  
  conductor: conductor; 
}
