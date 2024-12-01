export interface asignarRutaDto {
    idAsignarRuta: number; 
    ruta: RutaDTO;
    vehiculo: VehiculoDTO;
  }
  
  export interface RutaDTO {
    overviewPolyline: string;
    coordenadas: string[];
  }
  
  export interface VehiculoDTO {
    peso: number;
    placa: string;
    estado: boolean;
    marca: string;
    idVehiculo: number;
    tipoVehiculo: string;
  }
  