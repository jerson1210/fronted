export interface paquete{
    
    nombre:String;
    numero:number;
    direccion:String;
    pesoPaquete:number;
    fecha:String
    usuario: {
        idUsuario: number; // Relación con el usuario, solo es necesario el ID
      };

}    