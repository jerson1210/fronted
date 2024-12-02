import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { RutaService } from '../services/ruta.service';
import { VehiculoService } from '../services/vehiculo.service';
import { ConductorService } from '../services/conductor.service';
import { AsignarRutaService } from '../services/asignar-ruta.service';
import { conductorTotal } from '../models/conductorTotal';
import { rutaTotal } from '../models/rutaTotal';
import { vehiculoTotal } from '../models/vehiculoTotal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-asignar-ruta-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './asignar-ruta-form.component.html',
  styleUrl: './asignar-ruta-form.component.scss'
})
export class AsignarRutaFormComponent {
    // Ruta seleccionada
    rutaId: number | null = null;

    // Nombre del conductor seleccionado
    conductorNombre: string | null = null;
  
    // Placa del vehículo seleccionado
    vehiculoPlaca: string | null = null;
  usuarioId!: number;
  ruta:rutaTotal[]=[];
  vehiculos: vehiculoTotal[] = [];
  conductor:conductorTotal[]=[];

  // Campos seleccionados en el formulario
 


  constructor(
    private usuarioService: UsuarioService,
    private rutaService: RutaService,
    private vehiculoService: VehiculoService,
    private conductorService: ConductorService,
    private asignarRutaService: AsignarRutaService,
    private router:Router
  ) {}

  ngOnInit(): void {
    // Asegúrate de obtener el id correcto, por ejemplo desde una sesión o un servicio
    this.obtenerUsuarioLogueado();
    if (this.usuarioId) {
      this.listarConductores();
      this.ListarRuta();
      this.listarVehiculos();
      
    } // Solo como ejemplo, reemplaza con el id dinámico


  }

  obtenerUsuarioLogueado(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioData = JSON.parse(usuario);
      this.usuarioId = usuarioData.idUsuario;
    }
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
            <td>${conductor.nombre}</td>
          </tr>
        `;
        tabla.innerHTML += fila;
      });
    }
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
          </tr>
        `;
        tabla.innerHTML += fila;
      });
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
            <td>${vehiculo.placa}</td>
          </tr>
        `;
        tabla.innerHTML += fila;
      });
    }
  }


  crearAsignarRuta(): void {
    if (!this.rutaId || !this.conductorNombre || !this.vehiculoPlaca) {
      alert('Por favor, selecciona una ruta, un conductor y un vehículo.');
      return;
    }
  
    // Encuentra el ID del conductor y del vehículo basado en la selección
    const conductorSeleccionado = this.conductor.find(c => c.nombre === this.conductorNombre);
    const vehiculoSeleccionado = this.vehiculos.find(v => v.placa === this.vehiculoPlaca);
  
    if (!conductorSeleccionado || !vehiculoSeleccionado) {
      alert('No se pudo encontrar el conductor o el vehículo seleccionados.');
      return;
    }
  
    // Construir el JSON que será enviado al backend
    const asignacionData = {
      usuario: { idUsuario: this.usuarioId },
      ruta: { idRuta: this.rutaId },
      vehiculo: { idVehiculo: vehiculoSeleccionado.idVehiculo },
      conductor: { idConductor: conductorSeleccionado.idConductor }
    };
  
    // Llamar al servicio para enviar la asignación
    this.asignarRutaService.crearAsignacion(asignacionData).subscribe({
      next: (response) => {
        alert('La asignación se ha creado con éxito.');
        console.log('Respuesta del servidor:', response);
        this.router.navigateByUrl("/asignarRuta");
      },
      error: (error) => {
        console.error('No se Puede elegir un conductor , una ruta o un vehiculo si ya tiene ruta asignada:', error);
        alert('No se Puede elegir un conductor , una ruta o un vehiculo si ya tiene ruta asignada');
      }
    });
  }
}