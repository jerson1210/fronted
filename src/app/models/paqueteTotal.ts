import { usuario } from "./usuario";

export interface paqueteTotal {
    idPaqueteEnvio:number;
    nombre:String;
    numero:number;
    direccion:String;
    pesoPaquete:number;
    fecha:String
    usuario: usuario;
}