import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ListarLibroComponent } from './libro/listar-libro/listar-libro.component';
import { FormularioLibroComponent } from './libro/formulario-libro/formulario-libro.component';
import { DetalleLibroComponent } from './libro/detalle-libro/detalle-libro.component';


import { ListarRecomendacionComponent } from './recomendacion/listar-recomendacion/listar-recomendacion.component';
import { FormularioRecomendacionComponent } from './recomendacion/formulario-recomendacion/formulario-recomendacion.component';
import { IniciarSesionComponent } from './autenticacion/iniciar-sesion/iniciar-sesion.component';

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
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
