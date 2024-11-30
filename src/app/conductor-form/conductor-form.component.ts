import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConductorService } from '../services/conductor.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-conductor-form',
  imports: [ReactiveFormsModule,FormsModule,ButtonModule,ToastModule,RouterModule,InputTextModule,InputNumberModule,CardModule],
  templateUrl: './conductor-form.component.html',
  styleUrl: './conductor-form.component.scss'
})
export class ConductorFormComponent {
  formConductor!:FormGroup;
  isSaveInProgress:boolean=false;
  edit:boolean=false;

  constructor(private fb:FormBuilder,private conductorService:ConductorService,private activatedRoute:ActivatedRoute,private messageService:MessageService,private navrouter:Router){
    this.formConductor = this.fb.group({
      IdConductor: [null], // Asegúrate de que el id sea numérico
      Nombre: ['', Validators.required], // Campo de texto con validación requerida
      Apellido: ['', Validators.required], // Campo de texto con validación requerida
      Correo: ['', [Validators.required, Validators.email]], // Campo de correo con validación requerida y formato de email
      Telefono: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // Número con validación requerida
      contrasena: ['', [Validators.required, Validators.minLength(6)]] // Contraseña con longitud mínima requerida
    });

  }

  ngOnInit():void{
    let id=this.activatedRoute.snapshot.paramMap.get("IdConductor")
    if(id && id !== "new"){
      this.edit=true
      this.getConductorId(+id!)
    }
  }
  getConductorId(id:number){
    this.conductorService.getVehiculoId(id).subscribe({
      next:foundCoductor=>{
        this.formConductor.patchValue(foundCoductor);
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"No Encontro"});
        //this.navrouter.navigateByUrl("/")
      }

    })
  }

  createConductor(){
    if(this.formConductor.invalid){
      this.messageService.add({severity:"error",summary:"Error",detail:"Revise los campos"});
        return
    }
    this.conductorService.createVehiculo(this.formConductor.value).subscribe({
      next:()=>{
        this.messageService.add({severity:"guardado",summary:"guardado",detail:"conductor guardado"});
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"Revise los campos"});
      }

    })
  }

  updateConductor(){
    if(this.formConductor.invalid){
      this.messageService.add({severity:"error",summary:"Error",detail:"Revise los cambios"});
        return
    }
    this.conductorService.actualizarVehiculo(this.formConductor.value).subscribe({
      next:()=>{
        this.messageService.add({severity:"guardado",summary:"guardado",detail:"conductor actualizado"});
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"Revise los cambios"});
      }

    })
  }

}
