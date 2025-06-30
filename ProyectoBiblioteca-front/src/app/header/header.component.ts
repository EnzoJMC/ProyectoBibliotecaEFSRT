import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UsuarioService } from '../servicio/usuario.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  usuario: any;
  esPaginaLogin: boolean = false;
esPaginaRegistrar: boolean = false;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.verificarRutaYUsuario();

  
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.verificarRutaYUsuario();
      });
  }

  verificarRutaYUsuario(): void {
    this.esPaginaLogin = this.router.url.includes('/login');
    this.esPaginaRegistrar = this.router.url.includes('/registrar');
    this.obtenerPerfilUsuario();
  }

  obtenerPerfilUsuario(): void {
    this.usuarioService.obtenerPerfil().subscribe({
      next: (response) => {
        this.usuario = response.usuario;
        console.log(' Usuario desde backend:', this.usuario);
      },
      error: () => {
        this.usuario = null;
      }
    });
  }

  irAlInicio(): void {
    if (this.usuario?.tipoUsuario=== 'administrador') {
      this.router.navigate(['/vistaAdmin']);
    } else {
      this.router.navigate(['/libros']);
    }
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.usuario = null;
    this.router.navigate(['/login']);
  }
}