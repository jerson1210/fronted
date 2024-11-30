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
    ) {
    this.loginForm = this.fb.group({
      nombre: ['', [Validators.required]],  // Cambiado de 'email' a 'nombre'
      password: ['', [Validators.required]],
    });
  }
  

  onSubmit(): void {
    if (this.loginForm.valid) {
      const nombre = this.loginForm.value.nombre;
      const password = this.loginForm.value.password;

      this.usuarioService.validarUsuario(nombre, password).subscribe({
        next: (response) => {
          console.log('Usuario válido:', response);

          this.navrouter.navigateByUrl("")
          
        },
        error: () => {
          this.errorMessage = 'Credenciales inválidas, intenta nuevamente.'; // Asigna un mensaje de error
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.'; // Mensaje genérico si el formulario no es válido
    }
    
    }
}


