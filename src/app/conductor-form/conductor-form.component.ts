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
import { conductor } from '../models/conductor';

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

  constructor(private fb:FormBuilder,private router:Router,private conductorService:ConductorService,private activatedRoute:ActivatedRoute,private messageService:MessageService,private navrouter:Router){
    this.formConductor = this.fb.group({
      idConductor: [null], // Asegúrate de que el id sea numérico
      nombre: ['', Validators.required], // Campo de texto con validación requerida
      apellido: ['', Validators.required], // Campo de texto con validación requerida
      correo: ['', [Validators.required, Validators.email]], // Campo de correo con validación requerida y formato de email
      telefono: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // Número con validación requerida
      contrasena: ['', [Validators.required, Validators.minLength(6)]] // Contraseña con longitud mínima requerida
    });

  }

  ngOnInit():void{
    const id=this.activatedRoute.snapshot.paramMap.get("idConductor")
    console.log("ID conductor:", id);
    if(id && id !== "new"){
      this.edit=true
      this.getConductorId(+id!)
    }
  }
  getConductorId(id:number):void{
    this.conductorService.getCondcutorId(id).subscribe({
      next:foundCoductor=>{
        this.formConductor.patchValue(foundCoductor);
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"No Encontro"});
        //this.navrouter.navigateByUrl("/")
      }

    })
  }

  createConductor() {
    if (this.formConductor.invalid) {
      this.messageService.add({ severity: "error", summary: "Error", detail: "Revise los campos" });
      return;
    }

    // Obtener el usuario desde localStorage
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      this.messageService.add({ severity: "error", summary: "Error", detail: "No se encontró usuario en el localStorage" });
      return;
    }

    const usuarioData = JSON.parse(usuario);  // Ahora 'usuario' es de tipo 'string', no 'null'
    const usuarioId = usuarioData ? usuarioData.idUsuario : null;

    if (!usuarioId) {
      this.messageService.add({ severity: "error", summary: "Error", detail: "Usuario no encontrado" });
      return;
    }

    // Preparar los datos del vehículo, agregando el usuario con el idUsuario
    const conductorData: conductor = {
      nombre: this.formConductor.value.nombre,
      apellido: this.formConductor.value.apellido,
      correo: this.formConductor.value.correo,
      telefono: this.formConductor.value.telefono,
      contrasena: this.formConductor.value.contrasena,
      usuario: { idUsuario: usuarioId }  // Se incluye el idUsuario en el cuerpo
    };

    // Llamar al servicio para crear el vehículo
    this.conductorService.createConductor(conductorData).subscribe({
      next: () => {
        this.messageService.add({ severity: "success", summary: "Guardado", detail: "Vehículo guardado" });
        this.router.navigateByUrl("/conductor"); // Ajusta la ruta a donde necesites
      },
      error: (err) => {
        console.error('Error al guardar el vehículo', err);
        this.messageService.add({ severity: "error", summary: "Error", detail: "Hubo un error al guardar el vehículo" });
      }
    });
  }

  updateConductor() {
    if (this.formConductor.invalid) {
      this.messageService.add({ severity: "error", summary: "Error", detail: "Revise los cambios" });
      return;
    }
  
    const conductorData = this.formConductor.value;  
  
    this.conductorService.actualizarConductor(conductorData).subscribe({
      next: () => {
        this.messageService.add({ severity: "success", summary: "Guardado", detail: "conductor actualizado" });
        this.router.navigateByUrl("/conductor");
      },
      error: (err) => {
        console.error('Error al actualizar el conductor', err);
        this.messageService.add({ severity: "error", summary: "Error", detail: "Hubo un error al actualizar el conductor" });
      }
    });
  }

}
