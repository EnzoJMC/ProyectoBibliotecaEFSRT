import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './autenticacion/iniciar-sesion/iniciar-sesion.component';
import { RegistrarComponent } from './autenticacion/registrar/registrar.component';
import { FormularioLibroComponent } from './libro/formulario-libro/formulario-libro.component';
import { EliminarLibroComponent } from './libro/eliminar-libro/eliminar-libro.component';
import { ListarLibroComponent } from './libro/listar-libro/listar-libro.component';
import { FormularioRecomendacionComponent } from './recomendacion/formulario-recomendacion/formulario-recomendacion.component';
import { EliminarRecomendacionComponent } from './recomendacion/eliminar-recomendacion/eliminar-recomendacion.component';
import { ListarRecomendacionComponent } from './recomendacion/listar-recomendacion/listar-recomendacion.component';
import { DetalleLibroComponent } from './libro/detalle-libro/detalle-libro.component';

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RegistrarComponent,
    FormularioLibroComponent,
    EliminarLibroComponent,
    ListarLibroComponent,
    FormularioRecomendacionComponent,
    EliminarRecomendacionComponent,
    ListarRecomendacionComponent,
    DetalleLibroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
