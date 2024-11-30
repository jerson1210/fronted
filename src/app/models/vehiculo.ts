import { usuario } from "./usuario";

export interface vehiculo{
    idVehiculo:number;
    tipoVehiculo:String;
    pesoVehiculo:number;
    marca:String;
    estado:boolean;
    placa:String;
    usuario?:usuario

}    
