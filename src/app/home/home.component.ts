
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { vehiculos } from '../models/vehiculo';
import { VehiculoService } from '../services/vehiculo.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-home',
  imports: [TableModule,ButtonModule,CommonModule,RouterModule,SidebarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  sidebarVisible: boolean = false;
  vehiculos:vehiculos[]=[]

  constructor(private vehiculoService:VehiculoService){}

  ngOnInit():void{

  }
  getAllVehiculos(){
    this.vehiculoService.getVehiculo().subscribe((data)=>{
      this.vehiculos=data;
    })
  }
    trackById(index: number, vehiculo: vehiculos): number {
    return vehiculo.IdVehiculo;  // Usamos el id como clave única para cada elemento
  }
}