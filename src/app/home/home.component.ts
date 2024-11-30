
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { vehiculo} from '../models/vehiculo';
import { VehiculoService } from '../services/vehiculo.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  imports: [TableModule,ButtonModule,CommonModule,RouterModule,SidebarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  sidebarVisible: boolean = false;
  vehiculo:vehiculo[]=[];
  usuario:any;

  constructor(private vehiculoService:VehiculoService,private usuarioService:UsuarioService){}

  ngOnInit():void{
    this.usuario = this.usuarioService.obtenerUsuario();
  }
  getAllVehiculos(){
    this.vehiculoService.getVehiculo().subscribe((data)=>{
      this.vehiculo=data;
    })
  }
    trackById(index: number, vehiculo: vehiculo): number {
    return vehiculo.idVehiculo;  // Usamos el id como clave única para cada elemento
  }
}
