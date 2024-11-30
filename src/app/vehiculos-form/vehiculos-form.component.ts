import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehiculoService } from '../services/vehiculo.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-vehiculos-form',
  imports: [ReactiveFormsModule,FormsModule,ButtonModule,ToastModule,RouterModule,InputTextModule,InputNumberModule,CardModule],
  templateUrl: './vehiculos-form.component.html',
  styleUrl: './vehiculos-form.component.scss'
})
export class VehiculosFormComponent {
  formVehiculo!:FormGroup;
  isSaveInProgress:boolean=false;
  edit:boolean=false;

  constructor(private fb:FormBuilder,private vehiculoService:VehiculoService,private activatedRoute:ActivatedRoute,private messageService:MessageService,private navrouter:Router){
    this.formVehiculo=this.fb.group({
      IdVehiculo: [null],  // Asegúrate de que el id sea numérico
      TipoVehiculo: ['', Validators.required],  // Campo de texto con validación requerida
      PesoVehiculo: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],  // Peso numérico
      Marca: ['', Validators.required],  // Campo de texto con validación requerida
      Estado: [false, Validators.required] 
    })

  }

  ngOnInit():void{
    let id=this.activatedRoute.snapshot.paramMap.get("IdVehiculo")
    if(id && id !== "new"){
      this.edit=true
      this.getVehiculoId(+id!)
    }
  }
  getVehiculoId(id:number){
    this.vehiculoService.getVehiculoId(id).subscribe({
      next:foundVehiculo=>{
        this.formVehiculo.patchValue(foundVehiculo);
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"No Encontro"});
        //this.navrouter.navigateByUrl("/")
      }

    })
  }

  createVehiculo(){
    if(this.formVehiculo.invalid){
      this.messageService.add({severity:"error",summary:"Error",detail:"Revise los campos"});
        return
    }
    this.vehiculoService.createVehiculo(this.formVehiculo.value).subscribe({
      next:()=>{
        this.messageService.add({severity:"guardado",summary:"guardado",detail:"vehiculo guardado"});
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"Revise los campos"});
      }

    })
  }

  updateVehiculo(){
    if(this.formVehiculo.invalid){
      this.messageService.add({severity:"error",summary:"Error",detail:"Revise los cambios"});
        return
    }
    this.vehiculoService.actualizarVehiculo(this.formVehiculo.value).subscribe({
      next:()=>{
        this.messageService.add({severity:"guardado",summary:"guardado",detail:"vehiculo actualizado"});
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"Revise los cambios"});
      }

    })
  }

}
