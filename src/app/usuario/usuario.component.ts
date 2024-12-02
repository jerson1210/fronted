import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';
import { MessageService } from 'primeng/api';
import { ConductorService } from '../services/conductor.service';

@Component({
  selector: 'app-usuario',
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, ToastModule, RouterModule, InputTextModule, InputNumberModule, CardModule, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isUserRoleSelected: boolean = false;  // Variable para saber si ya se eligió el rol
  roleSelected: string | null = null;  // Almacena el rol seleccionado

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private navrouter: Router,
    private messageService: MessageService,
    private conductorService: ConductorService,  
  ) {
    this.loginForm = this.fb.group({
      nombre: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });
  }

  // Método para seleccionar el rol
  selectRole(role: string): void {
    this.roleSelected = role;
    this.isUserRoleSelected = true;  
  }

  // Método para manejar el submit
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Revise los campos' });
      return;
    }

    if (this.roleSelected === 'administrador') {
      this.usuarioService.validarUsuario(this.loginForm.value).subscribe({
        next: (usuario) => {
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.messageService.add({ severity: 'success', summary: 'Bienvenido', detail: 'Inicio de sesión exitoso' });
          this.navrouter.navigateByUrl('/home');  
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos' });
        }
      });
    } else if (this.roleSelected === 'conductor') {
      this.conductorService.validarConductor(this.loginForm.value).subscribe({
        next: (conductor) => {
          localStorage.setItem('conductor', JSON.stringify(conductor));
          this.messageService.add({ severity: 'success', summary: 'Conductor', detail: 'Inicio de sesión como conductor exitoso' });
          this.navrouter.navigateByUrl('/home-conductor'); 
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos para conductor' });
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Debe seleccionar un rol primero.' });
    }
  }

  // Método para regresar a la selección de roles
goBackToRoleSelection(): void {
  this.isUserRoleSelected = false;
  this.roleSelected = null;  // Resetear el rol seleccionado
  this.loginForm.reset();  // Resetear el formulario
}

// Método para iniciar sesión automáticamente como administrador
loginAsAdmin(): void {
  this.roleSelected = 'administrador'; // Selecciona el rol administrador
  this.isUserRoleSelected = true; // Marca que ya se seleccionó el rol

  // Configura los valores predeterminados del formulario
  this.loginForm.setValue({
    nombre: 'Demo',
    contrasena: '123456'
  });

  // Simula el envío del formulario
  this.onSubmit();
}


}
