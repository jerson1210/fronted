
// vehiculo.model.ts
export interface vehiculo {
    
    tipoVehiculo: string;
    peso: number;
    marca: string;
    placa: string;
    estado: boolean;
    usuario: {
      idUsuario: number; // Relación con el usuario, solo es necesario el ID
    };
  }
  
