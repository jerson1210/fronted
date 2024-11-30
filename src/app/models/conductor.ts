import { usuario } from './usuario';
import { asignarRuta } from './asignarRuta';

export interface conductor{
    idConductor: number; 
    nombre: string;    
    apellido: string;    
    correo: string;    
    telefono: string;    
    contrasena?: string;
    usuario?: usuario;   
    asignarRuta?: asignarRuta;

}    