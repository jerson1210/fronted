import { Component, OnInit } from '@angular/core';
import { vehiculoTotal } from '../models/vehiculoTotal';
import { VehiculoService } from '../services/vehiculo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ CommonModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  vehiculos: vehiculoTotal[] = [];
  usuarioId!: number;

  constructor(private vehiculoService: VehiculoService) {}

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
}
