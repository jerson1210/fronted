import { Component,OnInit } from '@angular/core';

import { ConductorService } from '../services/conductor.service';

import { ButtonModule } from 'primeng/button';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { conductorTotal } from '../models/conductorTotal';

@Component({
  selector: 'app-conductor',
  imports: [TableModule,ButtonModule,CommonModule,RouterModule,SidebarModule],
  templateUrl: './conductor.component.html',
  styleUrl: './conductor.component.scss'
})
export class ConductorComponent implements OnInit {
  usuarioNombre?:String;
  conductor:conductorTotal[]=[];
  usuarioId!: number;
  conductorSelccionado!: number;
  
  mostrarModal = false;

  constructor(private conductorService: ConductorService,private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarioLogueado();
    if (this.usuarioId) {
      this.listarConductores();
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

  listarConductores(): void {
    this.conductorService.listarConductorPorUsuario(this.usuarioId).subscribe({
      next: (conductor) => {
        this.conductor = conductor;
        this.renderizarConductores();
      },
      error: (error) => {
        console.error('Error al obtener los conductores:', error);
      }
    });
  }

  renderizarConductores(): void {
    const tabla = document.getElementById('tabla-conductor');
    if (tabla) {
      tabla.innerHTML = ''; // Limpia la tabla antes de renderizar
      this.conductor.forEach((conductor) => {
        const fila = `
          <tr>
            <td>${conductor.idConductor}</td>
            <td>${conductor.nombre}</td>
            <td>${conductor.apellido} kg</td>
            <td>${conductor.correo}</td>
            <td>${conductor.telefono}</td>
            <td>${conductor.contrasena}</td>
          </tr>
        `;
        tabla.innerHTML += fila;
      });
    }
  }
  
  seleccionConductor(id: number): void {
    this.conductorSelccionado = id;
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
  eliminarConductor(): void {
    if (this.conductorSelccionado) {
      this.conductorService.deleteConductor(this.conductorSelccionado).subscribe({
        next: () => {
          alert('conductor eliminado exitosamente');
          this.listarConductores(); // Actualiza la lista de vehículos
          this.cerrarModal(); // Cierra el modal
        },
        error: (error) => {
          console.error('Error al eliminar conductor:', error);
          alert('No se pudo eliminar el conductor.');
          this.cerrarModal(); // Cierra el modal
        }
      });
    }
  }
  
  goToUpdateFormConductor(idConductor: number): void {
    // Redirige a la ruta del formulario de actualización
    this.router.navigate(['/conductor-form', idConductor]);
  }
}
