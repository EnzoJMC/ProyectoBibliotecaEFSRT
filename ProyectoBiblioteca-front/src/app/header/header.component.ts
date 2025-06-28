import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicio/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  usuario: any;
  esPaginaLogin: boolean = false;
constructor(
    
    private router: Router,
    private usuarioService: UsuarioService
  ) {}
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.esPaginaLogin = this.router.url.includes('/login');
    });
    const userData = localStorage.getItem('usuario');
    if (userData) {
      this.usuario = JSON.parse(userData);
    }
    this.obtenerPerfilUsuario(); 
    console.log('Usuario desde localStorage:', userData);

    
  }

obtenerPerfilUsuario(): void {
    this.usuarioService.obtenerPerfil().subscribe({
      next: (response) => {
        this.usuario = response.usuario;
        console.log('Perfil:', this.usuario);
      },
      error: (error) => console.error('Error al obtener perfil', error)
    });
  }
  
}