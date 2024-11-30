import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule ,Router} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-usuario',
  imports: [ReactiveFormsModule,FormsModule,ButtonModule,ToastModule,RouterModule,InputTextModule,InputNumberModule,CardModule,CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})

export class UsuarioComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null; // <---- Define la propiedad errorMessage

  constructor(   private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private navrouter: Router,
    private messageService:MessageService
    ) {
    this.loginForm = this.fb.group({
      nombre: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });
  }
  

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Revise los campos' });
      return;
    }

    this.usuarioService.validarUsuario(this.loginForm.value).subscribe({
      next: (usuario) => {
        localStorage.setItem('usuario', JSON.stringify(usuario)); 
        this.messageService.add({ severity: 'success', summary: 'Bienvenido', detail: 'Inicio de sesión exitoso' });
        this.navrouter.navigateByUrl(''); 
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos' });
      }
    });
}
}


