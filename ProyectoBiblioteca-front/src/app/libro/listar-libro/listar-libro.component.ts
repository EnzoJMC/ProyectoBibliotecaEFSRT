import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibroServiceService } from '../../servicio/libro.service';
import { UsuarioService } from '../../servicio/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listar-libro',
  templateUrl: './listar-libro.component.html',
  styleUrl: './listar-libro.component.css'
})

export class ListarLibroComponent implements OnInit {
  baseImageUrl: string = 'http://localhost:8080/';
  listaLibros: any[] = [];
  librosAgrupados: any[][] = [];
  usuario: any;

  constructor(
    private libroService: LibroServiceService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerLibros();
    this.obtenerPerfilUsuario();
  }

  obtenerPerfilUsuario(): void {
    this.usuarioService.obtenerPerfil().subscribe({
      next: (response) => {
        this.usuario = response.usuario;
      },
      error: (error) => console.error('Error al obtener perfil', error)
    });
  }

  obtenerLibros(): void {
    this.libroService.listarLibros().subscribe({
      next: (data) => {
        this.listaLibros = data.libros;
        this.librosAgrupados = this.agruparLibros(this.listaLibros, 3);
      },
      error: (error) => console.error('Error al obtener libros', error)
    });
  }

  agruparLibros(libros: any[], grupoTam: number): any[][] {
    const grupos = [];
    for (let i = 0; i < libros.length; i += grupoTam) {
      grupos.push(libros.slice(i, i + grupoTam));
    }
    return grupos;
  }

  verDetalleLibro(id: number): void {
    this.router.navigate(['/libros/detalle', id]);
  }

  irACrearRecomendacion(): void {
    this.router.navigate(['/recomendaciones/nuevo']);
  }

  irAMisReservas(): void {
    this.router.navigate(['/reservasUsuario']);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  verMisRecomendaciones(): void {
    this.router.navigate(['/recomendaciones']);
  }
}