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
import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import { MantenimientoLibroComponent } from './libro/mantenimiento-libro/mantenimiento-libro.component';
import { TotalRecomendacionesComponent } from './recomendacion/total-recomendaciones/total-recomendaciones.component';
import { DetalleRecomendacionComponent } from './recomendacion/detalle-recomendacion/detalle-recomendacion.component';
import { MantenimientoUsuarioComponent } from './usuario/mantenimiento-usuario/mantenimiento-usuario.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReservasUsuarioComponent } from './reservas/reservas-usuario/reservas-usuario.component';
import { ReservasTotalesComponent } from './reservas/reservas-totales/reservas-totales.component';

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RegistrarComponent,
    FormularioLibroComponent,
    ListarLibroComponent,
    FormularioRecomendacionComponent,
    ListarRecomendacionComponent,
    DetalleLibroComponent,
    VistaAdminComponent,
    MantenimientoLibroComponent,
    TotalRecomendacionesComponent,
    DetalleRecomendacionComponent,
    MantenimientoUsuarioComponent,
    HeaderComponent,
    FooterComponent,
    ReservasUsuarioComponent,
    ReservasTotalesComponent
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
