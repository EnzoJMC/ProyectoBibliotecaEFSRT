import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ListarLibroComponent } from './libro/listar-libro/listar-libro.component';
import { FormularioLibroComponent } from './libro/formulario-libro/formulario-libro.component';
import { DetalleLibroComponent } from './libro/detalle-libro/detalle-libro.component';


import { ListarRecomendacionComponent } from './recomendacion/listar-recomendacion/listar-recomendacion.component';
import { FormularioRecomendacionComponent } from './recomendacion/formulario-recomendacion/formulario-recomendacion.component';
import { IniciarSesionComponent } from './autenticacion/iniciar-sesion/iniciar-sesion.component';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import { MantenimientoLibroComponent } from './libro/mantenimiento-libro/mantenimiento-libro.component';
import { TotalRecomendacionesComponent } from './recomendacion/total-recomendaciones/total-recomendaciones.component';
import { DetalleRecomendacionComponent } from './recomendacion/detalle-recomendacion/detalle-recomendacion.component';
import { MantenimientoUsuarioComponent } from './usuario/mantenimiento-usuario/mantenimiento-usuario.component';
import { ReservasUsuarioComponent } from './reservas/reservas-usuario/reservas-usuario.component';
import { ReservasTotalesComponent } from './reservas/reservas-totales/reservas-totales.component';

const routes: Routes = [
 
  { path: '', redirectTo: 'login', pathMatch: 'full' },

 
  { path: 'libros', component: ListarLibroComponent },
  { path: 'libros/nuevo', component: FormularioLibroComponent },
  { path: 'libros/editar/:id', component: FormularioLibroComponent },
  { path: 'libros/detalle/:id', component: DetalleLibroComponent },
  { path: 'login', component: IniciarSesionComponent },

  { path: 'recomendaciones', component: ListarRecomendacionComponent },
  { path: 'recomendaciones/nuevo', component: FormularioRecomendacionComponent },
  { path: 'recomendaciones/editar/:id', component: FormularioRecomendacionComponent },
  {path: 'recomendaciones/detalle/:id', component: DetalleRecomendacionComponent},

{path: 'usuarios',component: MantenimientoUsuarioComponent}, 

  {path: 'vistaAdmin', component: VistaAdminComponent},
  {path: 'mantenimientoLibros', component: MantenimientoLibroComponent},
 {path: 'totalRecomendaciones', component: TotalRecomendacionesComponent},
  
  {path: 'reservasUsuario', component: ReservasUsuarioComponent},
{path: 'totalReservas', component:  ReservasTotalesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
