import { Component } from '@angular/core';
import { PaqueteService } from '../services/paquete.service';
import { Router, RouterModule } from '@angular/router';
import { paqueteTotal } from '../models/paqueteTotal';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.scss'],
  imports: [RouterModule, CommonModule],
})
export class PaqueteComponent {
  paqueteSeleccionado!: number;
  paquete: paqueteTotal[] = [];
  paquetesSeleccionados: number[] = [];
  usuarioId!: number;
  usuarioNombre?:String;

  mostrarModal = false;

  constructor(private paqueteService: PaqueteService, private router: Router, private http: HttpClient) {}

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
      this.usuarioNombre = usuarioData.nombre;
    }
  }

  listarPaquete(): void {
    this.paqueteService.listarPaquetePorUsuario(this.usuarioId).subscribe({
      next: (paquete) => {
        this.paquete = paquete;
      },
      error: (error) => {
        console.error('Error al obtener los paquetes:', error);
      },
    });
  }
  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/usuario']); // Redirigir al login
  }


  seleccionarPaquete(id: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.paquetesSeleccionados.push(id);
    } else {
      this.paquetesSeleccionados = this.paquetesSeleccionados.filter((paqueteId) => paqueteId !== id);
    }
  }

  seleccionarTodos(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.paquetesSeleccionados = this.paquete.map((paquete) => paquete.idPaqueteEnvio);
    } else {
      this.paquetesSeleccionados = [];
    }
  }

  seleccionarPaqueteParaEliminar(id: number): void {
    this.paqueteSeleccionado = id;
    this.mostrarModal = true;
  }

  eliminarPaquete(): void {
    if (this.paqueteSeleccionado) {
      this.paqueteService.deletePaquete(this.paqueteSeleccionado).subscribe({
        next: () => {
          alert('Paquete eliminado exitosamente');
          this.listarPaquete();
          this.mostrarModal = false;
        },
        error: (error) => {
          console.error('Error al eliminar paquete:', error);
          alert('No se pudo eliminar el paquete.');
          this.mostrarModal = false;
        },
      });
    }
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  goToUpdateForm(idPaqueteEnvio: number): void {
    this.router.navigate(['/paquete-form', idPaqueteEnvio]);
  }

  crearRuta(): void {
    // Crear un arreglo con los paquetes seleccionados en el formato esperado por el backend
    const paquetesParaRuta = this.paquetesSeleccionados.map((id) => {
      const paquete = this.paquete.find((p) => p.idPaqueteEnvio === id);
      return {
        usuario: { idUsuario: this.usuarioId }, // Asignamos el usuario logueado
        nombre: paquete?.nombre,
        numero: paquete?.numero,
        pesoPaquete: paquete?.pesoPaquete,
        fecha: paquete?.fecha,
        idPaqueteEnvio: paquete?.idPaqueteEnvio,
        direccion: paquete?.direccion,
      };
    });
  
    // Hacer la solicitud HTTP al backend para crear la ruta
    this.http.post('http://localhost:8080/ruta/crear', paquetesParaRuta).subscribe({
      next: (response) => {
        console.log('Ruta creada con éxito:', response);
        alert('Ruta creada con éxito');
        this.router.navigate(['/ruta']); // Redirigir a la página de la ruta creada
  
        // Ahora eliminar los paquetes seleccionados
      
      },
      error: (error) => {
        console.error('Error al crear la ruta:', error);
        alert('No se pudo crear la ruta.');
      },
    });
  }
  

  

  // Método adicional para verificar si un paquete ya está seleccionado
  esPaqueteSeleccionado(id: number): boolean {
    return this.paquetesSeleccionados.includes(id);
  }
}


