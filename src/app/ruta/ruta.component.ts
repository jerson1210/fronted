import { Component } from '@angular/core';
import { rutaTotal } from '../models/rutaTotal';
import { RutaService } from '../services/ruta.service';

import { ButtonModule } from 'primeng/button';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';



@Component({
  selector: 'app-ruta',
  imports: [TableModule,ButtonModule,CommonModule,RouterModule,SidebarModule],
  templateUrl: './ruta.component.html',
  styleUrl: './ruta.component.scss'
})
export class RutaComponent {
  rutaSeleccionada!:number;
  ruta:rutaTotal[]=[];
  usuarioId!: number;
  usuarioNombre?:String;

  mostrarModal = false;
  constructor(private rutaService: RutaService,private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarioLogueado();
    if (this.usuarioId) {
      this.ListarRuta();
    }
  }

  obtenerUsuarioLogueado(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioData = JSON.parse(usuario);
      this.usuarioId = usuarioData.idUsuario;
      this.usuarioNombre = usuarioData.nombre; 
    }
  }
  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/usuario']); // Redirigir al login
  }

  ListarRuta(): void {
    this.rutaService.ListarRutaPorUsuario(this.usuarioId).subscribe({
      next: (ruta) => {
        this.ruta = ruta;
        this.renderizarRuta();
      },
      error: (error) => {
        console.error('Error al obtener los vehículos:', error);
      }
    });
  }

  renderizarRuta(): void {
    const tabla = document.getElementById('tabla-ruta');
    if (tabla) {
      tabla.innerHTML = ''; // Limpia la tabla antes de renderizar
      this.ruta.forEach((ruta) => {
        const fila = `
          <tr>
            <td>${ruta.idRuta}</td>
            <td>${ruta.coordenadas}</td>

          </tr>
        `;
        tabla.innerHTML += fila;
      });
    }
  }
  
  seleccionarRuta(id: number): void {
    this.rutaSeleccionada = id;
    this.abrirModalEliminar();  // Muestra el modal de confirmación
  }
  abrirModalEliminar(): void {
    this.mostrarModal = true;  // Muestra el modal
  }

  // Cierra el modal sin realizar ninguna acción
  cerrarModal(): void {
    this.mostrarModal = false;  // Cierra el modal
  }

  // Confirma la eliminación
  eliminarRuta(): void {
    if (this.rutaSeleccionada) {
      this.rutaService.deleteRuta(this.rutaSeleccionada).subscribe({
        next: () => {
          alert('Paquete eliminado exitosamente');
          this.ListarRuta(); // Actualiza la lista de vehículos
          this.cerrarModal(); // Cierra el modal
        },
        error: (error) => {
          console.error('Error al eliminar ruta:', error);
          alert('No se pudo eliminar el ruta.');
          this.cerrarModal(); // Cierra el modal
        }
      });
    }
  }
  



}
