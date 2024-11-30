
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
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule,FormsModule,ButtonModule,ToastModule,RouterModule,InputTextModule,InputNumberModule,CardModule,CalendarModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent {

  formUsuario!:FormGroup;
  isSaveInProgress:boolean=false;
  edit:boolean=false;

  constructor(private fb:FormBuilder,private usuarioServide:UsuarioService,private activatedRoute:ActivatedRoute,private messageService:MessageService,private navrouter:Router){
    this.formUsuario = this.fb.group({
      IdUsuario: [null],  // Id del usuario, puede ser un número
      nombre: ['', Validators.required],       // Campo de nombre con validación requerida
      apellido: ['', Validators.required],     // Campo de apellido con validación requerida
      correo: ['', [Validators.required, Validators.email]],  // Campo de correo con validación de email
      telefono: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],  // Teléfono con validación numérica y longitud de 10 dígitos
      contrasena: ['', [Validators.required, Validators.minLength(6)]],  // Contraseña con validación mínima de 6 caracteres
    });
  }

  ngOnInit():void{
    let id=this.activatedRoute.snapshot.paramMap.get("IdUsuario")
    if(id && id !== "new"){
      this.edit=true
      this.getUsuarioId(+id!)
    }
  }
  onTelefonoChange(event: any): void {
    const rawValue = event.target.value;
    // Elimina todo lo que no sea un número
    const cleanedValue = rawValue.replace(/\D/g, '');
    this.formUsuario.get('Telefono')?.setValue(cleanedValue); // Establece el valor limpio
  }
  getUsuarioId(id:number){
    this.usuarioServide.getUsuarioId(id).subscribe({
      next:foundUsuario=>{
        this.formUsuario.patchValue(foundUsuario);
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"No Encontro"});
        //this.navrouter.navigateByUrl("/")
      }

    })
  }

  createUsuario(){
    if(this.formUsuario.invalid){
      this.messageService.add({severity:"error",summary:"Error",detail:"Revise los campos"});
        return
    }
    this.usuarioServide.createUsuario(this.formUsuario.value).subscribe({
      next:()=>{
        this.messageService.add({severity:"guardado",summary:"guardado",detail:"usuario guardado"});
        this.navrouter.navigateByUrl("usuario")
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"Revise los campos"});
      }

    })
  }

  updateUsuario(){
    if(this.formUsuario.invalid){
      this.messageService.add({severity:"error",summary:"Error",detail:"Revise los cambios"});
        return
    }
    this.usuarioServide.actualizarUsuario(this.formUsuario.value).subscribe({
      next:()=>{
        this.messageService.add({severity:"guardado",summary:"guardado",detail:"vehiculo actualizado"});
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"Revise los cambios"});
      }

    })
  }

}
