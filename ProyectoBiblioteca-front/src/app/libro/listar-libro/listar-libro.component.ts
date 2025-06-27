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

    listaLibros: any[] = [];
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
        console.log('Perfil:', this.usuario);
      },
      error: (error) => console.error('Error al obtener perfil', error)
    });
  }

  obtenerLibros(): void {
    this.libroService.listarLibros().subscribe({
      next: (data) => {
        this.listaLibros = data.libros;
        console.log(data)
      },
      error: (error) => console.error('Error al obtener libros', error)
    });
  }

  /*

  irACrearLibro(): void {
    this.router.navigate(['/libros/nuevo']);
  }

  irAEditarLibro(id: number): void {
    this.router.navigate(['/libros/editar', id]);
  }

  eliminarLibro(id: number): void {
    Swal.fire({
      title: '¿Eliminar este libro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.libroService.eliminarLibro(id).subscribe({
          next: () => {
            this.listaLibros = this.listaLibros.filter(libro => libro.id !== id);
            Swal.fire('Eliminado', 'El libro fue eliminado correctamente.', 'success');
          },
          error: (err) => console.error('Error al eliminar', err)
        });
      }
    });
  }



*/
  verDetalleLibro(id: number): void {
  this.router.navigate(['/libros/detalle', id]);
}
irACrearRecomendacion(): void {
  this.router.navigate(['/recomendaciones/nuevo']);
}
  logout(): void {
    this.router.navigate(['/login']);
  }

  verMisRecomendaciones(): void {
  this.router.navigate(['/recomendaciones']);
}
}
