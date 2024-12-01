import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehiculosFormComponent } from './vehiculos-form/vehiculos-form.component';
import { PaqueteComponent } from './paquete/paquete.component';
import { PaqueteFormComponent } from './paquete-form/paquete-form.component';
import { ConductorComponent } from './conductor/conductor.component';
import { ConductorFormComponent } from './conductor-form/conductor-form.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { HomeConductorComponent } from './home-conductor/home-conductor.component';
import { AsignarRutaComponent } from './asignar-ruta/asignar-ruta.component';
import { RutaComponent } from './ruta/ruta.component';


export const routes: Routes = [

    {
        path:"",
        component:HomeComponent,
        title:"pagina Inicio"
    },
    {
        path:"asignarRuta",
        component:AsignarRutaComponent,
        title:"pagina Inicio"
    },
    {
        path:"ruta",
        component:RutaComponent,
        title:"pagina Inicio"
    },
    {
        path:"ruta-form",
        component:RutaComponent,
        title:"pagina Inicio"
    },
    {
        path:"vehiculos-form",
        component:VehiculosFormComponent,
        title:"Formulario Vehiculos"
    },
    {
        path:"paquete",
        component:PaqueteComponent,
        title:"Formulario Vehiculos"
    },
    { path: 'vehiculos-form/:idVehiculo', component: VehiculosFormComponent } ,
    { path: 'paquete-form/:idPaquete', component: PaqueteFormComponent } ,
    { path: 'conductor-form/:idConductor', component: ConductorFormComponent } ,
    {
        path:"paquete-form",
        component:PaqueteFormComponent,
        title:"Formulario Vehiculos"
    },
    {
        path:"conductor",
        component:ConductorComponent,
        title:"Formulario Vehiculos"
    },
    {
        path:"conductor-form",
        component:ConductorFormComponent,
        title:"Formulario Vehiculos"
    },
    {
        path:"usuario",
        component:UsuarioComponent,
        title:"Formulario Vehiculos"
    },
    {
        path:"home-conductor",
        component:HomeConductorComponent,
        title:"homeConductor"
    },
    {
        path:"**",
        redirectTo:"",
        pathMatch:"full"
    }

];
