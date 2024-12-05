import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehiculoService } from '../services/vehiculo.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { CardModule } from 'primeng/card';
import { vehiculo } from '../models/vehiculo';


@Component({
  selector: 'app-vehiculos-form',
  imports: [ReactiveFormsModule,FormsModule,ButtonModule,ToastModule,RouterModule,InputTextModule,InputNumberModule,CardModule],
  templateUrl: './vehiculos-form.component.html',
  styleUrl: './vehiculos-form.component.scss'
})
export class VehiculosFormComponent {
  formVehiculo!:FormGroup;
  isSaveInProgress:boolean=false;
  edit:boolean=false;

  constructor(private fb:FormBuilder,private vehiculoService:VehiculoService,private router:Router,private activatedRoute:ActivatedRoute,private messageService:MessageService,private navrouter:Router){
    this.formVehiculo=this.fb.group({
      idVehiculo: [null],  // Asegúrate de que el id sea numérico
      tipoVehiculo: ['', Validators.required],  // Campo de texto con validación requerida
      peso: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],  // Peso numérico
      marca: ['', Validators.required],  // Campo de texto con validación requerida
      estado: [false, Validators.required] ,
      placa: ["", Validators.required]
    
    })

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('idVehiculo');
    console.log("ID Vehiculo:", id);  // Agrega esto para verificar el ID
    if (id && id !== 'new') {
      this.edit = true;
      this.getVehiculoId(+id);  // Usamos el ID para cargar los datos
    }
  }
  getVehiculoId(id: number): void {
    this.vehiculoService.getVehiculoId(id).subscribe({
      next: (vehiculo) => {
        console.log('Datos del vehículo:', vehiculo);  // Verifica que los datos se están recibiendo
        this.formVehiculo.patchValue(vehiculo); // Rellenamos el formulario con los datos del vehículo
      },
      error: (err) => {
        console.error('Error al cargar el vehículo', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el vehículo' });
      }
    });
  }
  
  
  
  

  createVehiculo() {
    if (this.formVehiculo.invalid) {
      this.messageService.add({ severity: "error", summary: "Error", detail: "Revise los campos" });
      return;
    }

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

    // Preparar los datos del vehículo, agregando el usuario con el idUsuario
    const vehiculoData: vehiculo = {
      tipoVehiculo: this.formVehiculo.value.tipoVehiculo,
      peso: this.formVehiculo.value.peso,
      marca: this.formVehiculo.value.marca,
      placa: this.formVehiculo.value.placa,
      estado: this.formVehiculo.value.estado,
      usuario: { idUsuario: usuarioId }  // Se incluye el idUsuario en el cuerpo
    };

    // Llamar al servicio para crear el vehículo
    this.vehiculoService.createVehiculo(vehiculoData).subscribe({
      next: () => {
        this.messageService.add({ severity: "success", summary: "Guardado", detail: "Vehículo guardado" });
        this.router.navigateByUrl("/vehiculo"); // Ajusta la ruta a donde necesites
      },
      error: (err) => {
        console.error('Error al guardar el vehículo', err);
        this.messageService.add({ severity: "error", summary: "Error", detail: "Hubo un error al guardar el vehículo" });
      }
    });
  }
  
  
  

  updateVehiculo() {
    if (this.formVehiculo.invalid) {
      this.messageService.add({ severity: "error", summary: "Error", detail: "Revise los cambios" });
      return;
    }
  
    const vehiculoData = this.formVehiculo.value;  // Aquí ya tienes todos los campos, incluido el idVehiculo
  
    this.vehiculoService.actualizarVehiculo(vehiculoData).subscribe({
      next: () => {
        this.messageService.add({ severity: "success", summary: "Guardado", detail: "Vehículo actualizado" });
        this.router.navigateByUrl("/vehiculo");
      },
      error: (err) => {
        console.error('Error al actualizar el vehículo', err);
        this.messageService.add({ severity: "error", summary: "Error", detail: "Hubo un error al actualizar el vehículo" });
      }
    });
  }
  
  

}
