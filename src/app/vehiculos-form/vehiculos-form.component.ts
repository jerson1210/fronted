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
      pesoVehiculo: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],  // Peso numérico
      marca: ['', Validators.required],  // Campo de texto con validación requerida
      estado: [false, Validators.required] ,
      placa: ["", Validators.required]
    
    })

  }

  ngOnInit():void{
    let id=this.activatedRoute.snapshot.paramMap.get("IdVehiculo")
    if(id && id !== "new"){
      this.edit=true
      this.getVehiculoId(+id!)
    }
  }
  getVehiculoId(id:number){
    this.vehiculoService.getVehiculoId(id).subscribe({
      next:foundVehiculo=>{
        this.formVehiculo.patchValue(foundVehiculo);
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"No Encontro"});
        //this.navrouter.navigateByUrl("/")
      }

    })
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
        this.router.navigateByUrl("/vehiculos"); // Ajusta la ruta a donde necesites
      },
      error: (err) => {
        console.error('Error al guardar el vehículo', err);
        this.messageService.add({ severity: "error", summary: "Error", detail: "Hubo un error al guardar el vehículo" });
      }
    });
  }
  
  
  

  updateVehiculo(){
    if(this.formVehiculo.invalid){
      this.messageService.add({severity:"error",summary:"Error",detail:"Revise los cambios"});
        return
    }
    this.vehiculoService.actualizarVehiculo(this.formVehiculo.value).subscribe({
      next:()=>{
        this.messageService.add({severity:"guardado",summary:"guardado",detail:"vehiculo actualizado"});
      },
      error:()=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"Revise los cambios"});
      }

    })
  }

}
