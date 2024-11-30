import { Component } from '@angular/core';
import { paquete } from '../models/paquete';
import { PaqueteService } from '../services/paquete.service';

import { ButtonModule } from 'primeng/button';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-paquete',
  imports: [TableModule,ButtonModule,CommonModule,RouterModule,SidebarModule],
  templateUrl: './paquete.component.html',
  styleUrl: './paquete.component.scss'
})
export class PaqueteComponent {
  sidebarVisible: boolean = false;
  paquete:paquete[]=[]

  constructor(private paqueteService:PaqueteService){}

  ngOnInit():void{

  }
  getAllVehiculos(){
    this.paqueteService.getVehiculo().subscribe((data)=>{
      this.paquete=data;
    })
  }
    trackById(index: number, paquete: paquete): number {
    return paquete.IdPaqueteEnvio;  // Usamos el id como clave única para cada elemento
  }
}
