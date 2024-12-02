import { Component } from '@angular/core';
import { asignarRutaTotal } from '../models/asignarRutaTotal';
import { AsignarRutaService } from '../services/asignar-ruta.service';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-asignar-ruta',
  imports: [CommonModule,RouterModule],
  templateUrl: './asignar-ruta.component.html',
  styleUrl: './asignar-ruta.component.scss'
})
export class AsignarRutaComponent {
  asignarRutaSeleccionada!:number;
  asignarRuta:asignarRutaTotal[]=[];
  usuarioId!: number;
  usuarioNombre?:String

  mostrarModal = false;
  constructor(private asignarRutaService: AsignarRutaService,private router: Router, private messageService: MessageService ) {}

  ngOnInit(): void {
    this.obtenerUsuarioLogueado();
    if (this.usuarioId) {
      this.ListarAsignarRuta();
    }
  }
  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/usuario']); // Redirigir al login
  }

  obtenerUsuarioLogueado(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioData = JSON.parse(usuario);
      this.usuarioId = usuarioData.idUsuario;
      this.usuarioNombre = usuarioData.nombre;
    }
  }


  ListarAsignarRuta(): void {

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
  
    this.asignarRutaService.listarAsignarRutaUsuario(usuarioId).subscribe({
      next: (asignarRuta) => {
        this.asignarRuta = asignarRuta;  // Asigna la respuesta
        this.renderizarAsignada();       // Llama a la función de renderizado
      },
      error: (error) => {
        console.error('Error al obtener las rutas asignadas:', error);
      }
    });
  }
  

  renderizarAsignada(): void {
    const tabla = document.getElementById('tabla-ruta');
    if (tabla) {
      tabla.innerHTML = ''; // Limpia la tabla antes de renderizar
      this.asignarRuta.forEach((asignar) => {
        const fila = `
          <tr>
            <td>${asignar.idAsignarRuta}</td>
            <td>${asignar.conductor}</td>
            <td>${asignar.ruta}</td>
            <td>${asignar.vehiculo}</td>

          </tr>
        `;
        tabla.innerHTML += fila;
      });
    }
  }
  
  seleccionarAsignar(id: number): void {
    this.asignarRutaSeleccionada = id;
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
    if (this.asignarRutaSeleccionada) {
      this.asignarRutaService.eliminarAsignarRuta(this.asignarRutaSeleccionada).subscribe({
        next: () => {
          alert('Ruta Asignada eliminada exitosamente');
          this.ListarAsignarRuta(); // Actualiza la lista de vehículos
          this.cerrarModal(); // Cierra el modal
        },
        error: (error) => {
          console.error('Error al eliminar rutaAsignada:', error);
          alert('No se pudo eliminar la rutaAsignada.');
          this.cerrarModal(); // Cierra el modal
        }
      });
    }
  }
  
}

