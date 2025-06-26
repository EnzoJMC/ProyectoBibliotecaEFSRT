import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './autenticacion/iniciar-sesion/iniciar-sesion.component';
import { RegistrarComponent } from './autenticacion/registrar/registrar.component';
import { FormularioLibroComponent } from './libro/formulario-libro/formulario-libro.component';
import { ListarLibroComponent } from './libro/listar-libro/listar-libro.component';
import { FormularioRecomendacionComponent } from './recomendacion/formulario-recomendacion/formulario-recomendacion.component';
import { ListarRecomendacionComponent } from './recomendacion/listar-recomendacion/listar-recomendacion.component';
import { DetalleLibroComponent } from './libro/detalle-libro/detalle-libro.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RegistrarComponent,
    FormularioLibroComponent,
    ListarLibroComponent,
    FormularioRecomendacionComponent,
    ListarRecomendacionComponent,
    DetalleLibroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
