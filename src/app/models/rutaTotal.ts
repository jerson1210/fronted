import { usuario } from "./usuario";

export interface rutaTotal {
    idRuta: number;   
    overviewPolyline: string;    
    coordenadas: string[];       
    usuario: usuario; 
}