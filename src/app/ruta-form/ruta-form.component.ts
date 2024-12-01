import { Component, OnInit } from '@angular/core';
import { RutaService } from '../services/ruta.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { paquete } from '../models/paquete';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-ruta-form',
  templateUrl: './ruta-form.component.html',
  styleUrls: ['./ruta-form.component.scss']
})
export class RutaFormComponent implements OnInit {

  paquetes: any[] = []; // Lista de paquetes obtenidos desde el backend
  paquetesSeleccionados: any[] = []; // Paquetes seleccionados por el usuario

  constructor(private rutaService: RutaService, private router: Router, private messageService:MessageService) { }

  ngOnInit(): void {
    // Obtener los paquetes al cargar el componente
    this.rutaService.obtenerPaquetes().subscribe(
      (response) => {
        this.paquetes = response;
      },
      (error) => {
        console.error('Error al obtener los paquetes', error);
      }
    );
  }
  onPackageSelect(paquete: any): void {
    if (paquete.seleccionado) {
      // Si el paquete es seleccionado, lo agregamos a la lista de seleccionados
      this.paquetesSeleccionados.push(paquete);
    } else {
      // Si es desmarcado, lo eliminamos de la lista de seleccionados
      const index = this.paquetesSeleccionados.indexOf(paquete);
      if (index !== -1) {
        this.paquetesSeleccionados.splice(index, 1);
      }
    }
  }
  

  // Método para crear la ruta con los paquetes seleccionados
  crearRuta(): void {
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
    // Aquí solo enviamos los paquetes seleccionados al backend
    const rutaData = this.paquetesSeleccionados.map(paquete => ({
      usuario: { idUsuario: usuarioId } , // Esto se puede cambiar por el usuario actual si es necesario
      idPaqueteEnvio: paquete.idPaqueteEnvio,
      direccion: paquete.direccion,
      nombre: paquete.nombre,
      numero: paquete.numero,
      peso: paquete.peso,
      fecha: paquete.fecha
    }));

    this.rutaService.crearRuta(rutaData).subscribe(
      (response) => {
        console.log('Ruta creada exitosamente', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al crear la ruta', error);
      }
    );
  }
}
