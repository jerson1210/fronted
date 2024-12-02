import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-acerca-de',
  imports: [ CommonModule ,RouterModule],
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.scss']
})
export class AcercaDeComponent {
  usuarioId!: number;
  usuarioNombre?: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarioLogueado();
  }

  // Método para obtener datos del usuario
  obtenerUsuarioLogueado(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioData = JSON.parse(usuario);
      this.usuarioId = usuarioData.idUsuario;
      this.usuarioNombre = usuarioData.nombre;
    }
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    localStorage.removeItem('usuario');  // Elimina los datos del usuario
    this.router.navigate(['/usuario']);  // Redirige a la página de inicio de sesión
  }
}
