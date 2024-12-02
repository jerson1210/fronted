// src/app/models/asignar-ruta.ts

import { usuario } from './usuario';  
import { ruta } from './ruta';        
import { vehiculo } from './vehiculo';
import { conductor } from './conductor'; 
import { rutaTotal } from './rutaTotal';

export interface asignarRutaTotal {
  idAsignarRuta: number;
  usuario: usuario;    
  ruta: rutaTotal;        
  vehiculo: vehiculo;  
  conductor: conductor; 
}