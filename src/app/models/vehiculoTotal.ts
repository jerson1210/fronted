import { usuario } from "./usuario";

export interface vehiculoTotal {
    idVehiculo: number;
    tipoVehiculo: string;
    peso: number;
    marca: string;
    placa: string;
    estado: boolean;
    usuario: usuario;
}