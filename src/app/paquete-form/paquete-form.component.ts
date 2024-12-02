
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,ValidationErrors,AbstractControl} from '@angular/forms';
import { PaqueteService } from '../services/paquete.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { paquete } from '../models/paquete';

@Component({
  selector: 'app-paquete-form',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,ButtonModule,ToastModule,RouterModule,InputTextModule,InputNumberModule,CardModule,CalendarModule],
  templateUrl: './paquete-form.component.html',
  styleUrl: './paquete-form.component.scss'
})
export class PaqueteFormComponent {
  formPaquete!:FormGroup;
  isSaveInProgress:boolean=false;
  edit:boolean=false;

  constructor(private fb:FormBuilder,private paqueteService:PaqueteService,private activatedRoute:ActivatedRoute,private messageService:MessageService,private router:Router){
    
    
    this.formPaquete = this.fb.group({
      idPaqueteEnvio: [null], // Asegúrate de que el id sea numérico
      nombre: ['', Validators.required], // Campo de texto con validación requerida
      numero: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // Número con validación requerida
      direccion: ['', Validators.required,this.direccionValidator], // Campo de texto con validación requerida
      pesoPaquete: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // Peso numérico
      fecha: ['', Validators.required] // Campo de texto para fecha con validación requerida
    });

  }
  direccionValidator(control: AbstractControl): ValidationErrors | null {
    const direccionRegex = /^[a-zA-Z\s]+\s\d{1,4}(\s\d{1,4})?(,\s[a-zA-Z\s]+){2,3},\s[a-zA-Z\s]+$/;
    if (control.value && !direccionRegex.test(control.value)) {
      return { direccionInvalida: true };
    }
    return null;
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('idPaquete');
    console.log("ID Paquete:", id);  // Agrega esto para verificar el ID
    if (id && id !== 'new') {
      this.edit = true;
      this.getPaqueteId(+id);  // Usamos el ID para cargar los datos
    }
  }
  getPaqueteId(id: number): void {
    this.paqueteService.getPaqueteId(id).subscribe({
      next: (paquete) => {
        console.log('Datos del Paquete:', paquete);  // Verifica que los datos se están recibiendo
        this.formPaquete.patchValue(paquete); // Rellenamos el formulario con los datos del vehículo
      },
      error: (err) => {
        console.error('Error al cargar el paquete', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el vehículo' });
      }
    });
  }

  createPaquete() {
    if (this.formPaquete.invalid) {
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
    const fechaSeleccionada = this.formPaquete.value.fecha;

// Convertir a string si es necesario
const fechaComoString = fechaSeleccionada instanceof Date 
  ? fechaSeleccionada.toISOString().split('T')[0] // Formato "yyyy-mm-dd"
  : fechaSeleccionada;

    // Preparar los datos del vehículo, agregando el usuario con el idUsuario
    const paqueteData: paquete = {
      nombre: this.formPaquete.value.nombre,
      numero: this.formPaquete.value.numero,
      direccion: this.formPaquete.value.direccion,
      pesoPaquete: this.formPaquete.value.pesoPaquete,
      fecha: this.formPaquete.value.fecha,
      usuario: { idUsuario: usuarioId }  // Se incluye el idUsuario en el cuerpo
    };

    // Llamar al servicio para crear el vehículo
    this.paqueteService.createPaquete(paqueteData).subscribe({
      next: () => {
        this.messageService.add({ severity: "success", summary: "Guardado", detail: "paquete guardado" });
        this.router.navigateByUrl("/paquete"); // Ajusta la ruta a donde necesites
      },
      error: (err) => {
        console.error('Error al guardar el vehículo', err);
        this.messageService.add({ severity: "error", summary: "Error", detail: "Hubo un error al guardar el paquete" });
      }
    });
  }

  updatePaquete() {
    if (this.formPaquete.invalid) {
      this.messageService.add({ severity: "error", summary: "Error", detail: "Revise los cambios" });
      return;
    }
  
    const paqueteData = this.formPaquete.value;  // Aquí ya tienes todos los campos, incluido el idVehiculo
  
    this.paqueteService.actualizarPaquete(paqueteData).subscribe({
      next: () => {
        this.messageService.add({ severity: "success", summary: "Guardado", detail: "Vehículo actualizado" });
        this.router.navigateByUrl("/paquete");
      },
      error: (err) => {
        console.error('Error al actualizar el vehículo', err);
        this.messageService.add({ severity: "error", summary: "Error", detail: "Hubo un error al actualizar el vehículo" });
      }
    });
  }
}
