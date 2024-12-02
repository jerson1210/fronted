import { Component, OnInit } from '@angular/core';
import { vehiculoTotal } from '../models/vehiculoTotal';
import { VehiculoService } from '../services/vehiculo.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ CommonModule ,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  vehiculos: vehiculoTotal[] = [];
  usuarioId!: number;
  usuarioNombre!:String;
  vehiculoSeleccionado!: number;
  
  mostrarModal = false;

  constructor(private vehiculoService: VehiculoService,private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarioLogueado();
    if (this.usuarioId) {
      this.listarVehiculos();
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

  listarVehiculos(): void {
    this.vehiculoService.listarVehiculosPorUsuario(this.usuarioId).subscribe({
      next: (vehiculos) => {
        this.vehiculos = vehiculos;
        this.renderizarVehiculos();
      },
      error: (error) => {
        console.error('Error al obtener los vehículos:', error);
      }
    });
  }

  renderizarVehiculos(): void {
    const tabla = document.getElementById('tabla-vehiculos');
    if (tabla) {
      tabla.innerHTML = ''; // Limpia la tabla antes de renderizar
      this.vehiculos.forEach((vehiculo) => {
        const fila = `
          <tr>
            <td>${vehiculo.idVehiculo}</td>
            <td>${vehiculo.tipoVehiculo}</td>
            <td>${vehiculo.peso} kg</td>
            <td>${vehiculo.marca}</td>
            <td>${vehiculo.placa}</td>
            <td>${vehiculo.estado ? 'Activo' : 'Inactivo'}</td>
          </tr>
        `;
        tabla.innerHTML += fila;
      });
    }
  }
  
  seleccionarVehiculo(id: number): void {
    this.vehiculoSeleccionado = id;
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
  eliminarVehiculo(): void {
    if (this.vehiculoSeleccionado) {
      this.vehiculoService.deleteVehiculo(this.vehiculoSeleccionado).subscribe({
        next: () => {
          alert('Vehículo eliminado exitosamente');
          this.listarVehiculos(); // Actualiza la lista de vehículos
          this.cerrarModal(); // Cierra el modal
        },
        error: (error) => {
          console.error('Error al eliminar vehículo:', error);
          alert('No se pudo eliminar el vehículo.');
          this.cerrarModal(); // Cierra el modal
        }
      });
    }
  }
  
  goToUpdateForm(idVehiculo: number): void {
    // Redirige a la ruta del formulario de actualización
    this.router.navigate(['/vehiculos-form', idVehiculo]);
  }
  
  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/usuario']); // Redirigir al login
  }


}
