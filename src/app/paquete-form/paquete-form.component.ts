
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaqueteService } from '../services/paquete.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';


import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-paquete-form',
  imports: [ReactiveFormsModule,FormsModule,ButtonModule,ToastModule,RouterModule,InputTextModule,InputNumberModule,CardModule,CalendarModule],
  templateUrl: './paquete-form.component.html',
  styleUrl: './paquete-form.component.scss'
})
export class PaqueteFormComponent {
  formPaquete!:FormGroup;
  isSaveInProgress:boolean=false;
  edit:boolean=false;

  constructor(private fb:FormBuilder,private paqueteService:PaqueteService,private activatedRoute:ActivatedRoute,private messageService:MessageService,private navrouter:Router){
    this.formPaquete = this.fb.group({
      IdPaqueteEnvio: [null], // Asegúrate de que el id sea numérico
      Nombre: ['', Validators.required], // Campo de texto con validación requerida
      Numero: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // Número con validación requerida
      Direccion: ['', Validators.required], // Campo de texto con validación requerida
      PesoPaquete: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // Peso numérico
      Fecha: ['', Validators.required] // Campo de texto para fecha con validación requerida
    });

  }

  ngOnInit():void{
    let id=this.activatedRoute.snapshot.paramMap.get("IdPaqueteEnvio")
    if(id && id !== "new"){
      this.edit=true
      this.getPaqueteId(+id!)
    }
  }
  getPaqueteId(id:number){
    this.paqueteService.getVehiculoId(id).subscribe({
      next:foundPaquete=>{
        this.formPaquete.patchValue(foundPaquete);
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"No Encontro"});
        //this.navrouter.navigateByUrl("/")
      }

    })
  }

  createPaquete(){
    if(this.formPaquete.invalid){
      this.messageService.add({severity:"error",summary:"Error",detail:"Revise los campos"});
        return
    }
    this.paqueteService.createVehiculo(this.formPaquete.value).subscribe({
      next:()=>{
        this.messageService.add({severity:"guardado",summary:"guardado",detail:"vehiculo guardado"});
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"Revise los campos"});
      }

    })
  }

  updatePaquete(){
    if(this.formPaquete.invalid){
      this.messageService.add({severity:"error",summary:"Error",detail:"Revise los cambios"});
        return
    }
    this.paqueteService.actualizarVehiculo(this.formPaquete.value).subscribe({
      next:()=>{
        this.messageService.add({severity:"guardado",summary:"guardado",detail:"vehiculo actualizado"});
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"Revise los cambios"});
      }

    })
  }
}
