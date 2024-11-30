import { Component } from '@angular/core';
import { conductor } from '../models/conductor';
import { ConductorService } from '../services/conductor.service';

import { ButtonModule } from 'primeng/button';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-conductor',
  imports: [TableModule,ButtonModule,CommonModule,RouterModule,SidebarModule],
  templateUrl: './conductor.component.html',
  styleUrl: './conductor.component.scss'
})
export class ConductorComponent {

  sidebarVisible: boolean = false;
  conductor:conductor[]=[]
  

  constructor(private conductorService:ConductorService){}

  ngOnInit():void{

  }
  getAllVehiculos(){
    this.conductorService.getConductor().subscribe((data)=>{
      this.conductor=data;
    })
  }
    trackById(index: number, conductor: conductor): number {
    return conductor.idConductor  // Usamos el id como clave única para cada elemento
  }

}
