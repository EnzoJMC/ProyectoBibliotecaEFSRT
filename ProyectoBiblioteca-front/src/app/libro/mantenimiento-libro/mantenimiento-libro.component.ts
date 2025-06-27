import { Component, OnInit } from '@angular/core';
import { LibroServiceService } from '../../servicio/libro.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimiento-libro',
  templateUrl: './mantenimiento-libro.component.html',
  styleUrls: ['./mantenimiento-libro.component.css']
})
export class MantenimientoLibroComponent implements OnInit {

  libros: any[] = [];

  constructor(
    private libroService: LibroServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros(): void {
    this.libroService.listarLibros().subscribe({
      next: (data) => {
        this.libros = data.libros;
      },
      error: (error) => {
        console.error('Error al obtener libros', error);
        Swal.fire('Error', 'No se pudo cargar la lista de libros.', 'error');
      }
    });
  }

  crearLibro(): void {
    this.router.navigate(['/libros/nuevo']);
  }

  editarLibro(id: number): void {
    this.router.navigate(['/libros/editar', id]);
  }

  eliminarLibro(id: number): void {
    Swal.fire({
      title: '¿Eliminar libro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroService.eliminarLibro(id).subscribe({
          next: () => {
            this.libros = this.libros.filter(libro => libro.id !== id);
            Swal.fire('Eliminado', 'El libro fue eliminado exitosamente.', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar libro', err);
            Swal.fire('Error', 'No se pudo eliminar el libro.', 'error');
          }
        });
      }
    });
  }
}