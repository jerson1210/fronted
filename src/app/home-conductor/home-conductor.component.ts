/// <reference types="google.maps" />
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router
import { AsignarRutaService } from '../services/asignar-ruta.service';
import { asignarRutaDto } from '../models/asignarRutaDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-conductor',
  imports: [CommonModule],
  templateUrl: './home-conductor.component.html',
  styleUrl: './home-conductor.component.scss'
})
export class HomeConductorComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  asignaciones: asignarRutaDto[] = [];
  vehiculo!: any;
  mostrarRuta: boolean = false;
  mostrarVehiculo: boolean = false;

  constructor(
    private asignarRutaService: AsignarRutaService,
    private ngZone: NgZone,
    private router: Router // Inyecta el Router
  ) {}

  ngOnInit(): void {
    this.obtenerAsignaciones();
  }

  ngAfterViewInit(): void {
    // Aquí ya puedes estar seguro de que el ViewChild está disponible.
    if (this.mapContainer) {
      console.log(this.mapContainer.nativeElement); // Verifica si el contenedor está disponible
    }
  }

  eliminarAsignacion(idAsignarRuta: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta asignación?')) {
      this.asignarRutaService.eliminarAsignarRuta(idAsignarRuta).subscribe(
        () => {
          console.log(`Asignación con id ${idAsignarRuta} eliminada.`);
          this.obtenerAsignaciones(); // Actualiza la lista sin recargar la página
        },
        (error) => {
          console.error('Error al eliminar la asignación', error);
        }
      );
    }
  }
  
  obtenerAsignaciones(): void {
    // Obtener el id del conductor desde el localStorage
    const conductorData = JSON.parse(localStorage.getItem('conductor') || '{}');
    const conductorId: number = conductorData.idConductor;

    if (!conductorId) {
      console.error('No se encontró el id del conductor.');
      return;
    }

    console.log(conductorId); // Muestra el id del conductor si se encuentra en el localStorage

    // Usar el conductorId en la lógica de la solicitud
    this.asignarRutaService.listarAsignarRutaConductor(conductorId).subscribe(
      (data) => {
        this.asignaciones = data;
        this.vehiculo = data[0]?.vehiculo; // Suponiendo que tomas la primera asignación
      },
      (error) => {
        console.error('Error al obtener asignaciones', error);
      }
    );
  }

  // Método para mostrar la ruta
  toggleRuta(): void {
    this.mostrarRuta = true;
    this.mostrarVehiculo = false;
    this.ngZone.runOutsideAngular(() => this.loadMap());
  }

  // Método para mostrar información del vehículo
  toggleVehiculo(): void {
    this.mostrarVehiculo = true;
    this.mostrarRuta = false;
  }

  loadMap(): void {
    if (!this.mapContainer || !this.mapContainer.nativeElement) {
      console.error('El contenedor del mapa no está disponible');
      return;
    }

    const encodedPath = this.asignaciones[0]?.ruta?.overviewPolyline;
    if (!encodedPath) return;

    // Crea el mapa
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      zoom: 13,
      center: { lat: 7.1186677, lng: -73.1247597 },  // Coordenada de ejemplo
    });

    // Decodifica la ruta y dibuja la polilínea
    const path = google.maps.geometry.encoding.decodePath(encodedPath);
    const polyline = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    polyline.setMap(this.map);

    // Ajusta los límites del mapa para mostrar toda la ruta
    const bounds = new google.maps.LatLngBounds();
    path.forEach((latLng) => bounds.extend(latLng));
    this.map.fitBounds(bounds);

    // Agregar los puntos azules desde las coordenadas obtenidas
    const coordenadasPuntos = this.asignaciones[0]?.ruta.coordenadas; // Suponiendo que los puntos están en esta propiedad

    if (coordenadasPuntos) {
      coordenadasPuntos.forEach((coord: string) => {
        const [lat, lng] = coord.split(',').map(Number);
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: this.map,
          title: `Punto: ${lat}, ${lng}`,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: "blue",
            fillOpacity: 1,
            scale: 5, // Tamaño del marcador
            strokeColor: "blue",
            strokeWeight: 2
          }
        });
      });
    }
  }

  // Método para redirigir al usuario a la página /usuario
  regresar(): void {
    this.router.navigate(['/usuario']); // Redirige al usuario a /usuario
  }
}
