import { Component } from '@angular/core';

import { PaqueteService } from '../services/paquete.service';

import { ButtonModule } from 'primeng/button';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { paqueteTotal } from '../models/paqueteTotal';

@Component({
  selector: 'app-paquete',
  imports: [TableModule,ButtonModule,CommonModule,RouterModule,SidebarModule],
  templateUrl: './paquete.component.html',
  styleUrl: './paquete.component.scss'
})
export class PaqueteComponent {
  paqueteSeleccionado!:number;
  paquete:paqueteTotal[]=[];
  usuarioId!: number;

  mostrarModal = false;

  constructor(private paqueteService: PaqueteService,private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarioLogueado();
    if (this.usuarioId) {
      this.listarPaquete();
    }
  }

  obtenerUsuarioLogueado(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioData = JSON.parse(usuario);
      this.usuarioId = usuarioData.idUsuario;
    }
  }

  listarPaquete(): void {
    this.paqueteService.listarPaquetePorUsuario(this.usuarioId).subscribe({
      next: (paquete) => {
        this.paquete = paquete;
        this.renderizarPaquete();
      },
      error: (error) => {
        console.error('Error al obtener los vehículos:', error);
      }
    });
  }

  renderizarPaquete(): void {
    const tabla = document.getElementById('tabla-paquete');
    if (tabla) {
      tabla.innerHTML = ''; // Limpia la tabla antes de renderizar
      this.paquete.forEach((paquete) => {
        const fila = `
          <tr>
            <td>${paquete.idPaqueteEnvio}</td>
            <td>${paquete.nombre}</td>
            <td>${paquete.numero} kg</td>
            <td>${paquete.direccion}</td>
            <td>${paquete.pesoPaquete}</td>
            <td>${paquete.fecha}</td>
          </tr>
        `;
        tabla.innerHTML += fila;
      });
    }
  }
  
  seleccionarPaquete(id: number): void {
    this.paqueteSeleccionado = id;
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
  eliminarPaquete(): void {
    if (this.paqueteSeleccionado) {
      this.paqueteService.deletePaquete(this.paqueteSeleccionado).subscribe({
        next: () => {
          alert('Paquete eliminado exitosamente');
          this.listarPaquete(); // Actualiza la lista de vehículos
          this.cerrarModal(); // Cierra el modal
        },
        error: (error) => {
          console.error('Error al eliminar Paquete:', error);
          alert('No se pudo eliminar el vehículo.');
          this.cerrarModal(); // Cierra el modal
        }
      });
    }
  }
  
  goToUpdateForm(idPaqueteEnvio: number): void {
    // Redirige a la ruta del formulario de actualización
    this.router.navigate(['/paquete-form', idPaqueteEnvio]);
  }


}
