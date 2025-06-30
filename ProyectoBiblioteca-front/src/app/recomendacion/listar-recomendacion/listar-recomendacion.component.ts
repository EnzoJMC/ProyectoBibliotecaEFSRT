import { Component, OnInit } from '@angular/core';
import { RecomendacionService } from '../../servicio/recomendacion.service';
import { UsuarioService } from '../../servicio/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-recomendacion',
  templateUrl: './listar-recomendacion.component.html',
  styleUrls: ['./listar-recomendacion.component.css']
})
export class ListarRecomendacionComponent implements OnInit {

  listaRecomendacion: any[] = [];
  usuarioId?: number;

  constructor(
    private recomendacionService: RecomendacionService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerPerfilYRecomendaciones();
  }

  obtenerPerfilYRecomendaciones(): void {
  this.usuarioService.obtenerPerfil().subscribe({
    next: (resp) => {
      this.usuarioId = resp.usuario.id;
      if (this.usuarioId !== undefined) {
        this.cargarRecomendacionesPorUsuario(this.usuarioId);
      } else {
        console.error('ID de usuario no disponible.');
        Swal.fire('Error', 'No se obtuvo el ID del usuario.', 'error');
      }
    },
    error: (error) => {
      console.error(' Error al obtener perfil:', error);
      Swal.fire('Error', 'No se pudo obtener el perfil del usuario.', 'error');
    }
  });
}

  cargarRecomendacionesPorUsuario(idUsuario: number): void {
    this.recomendacionService.obtenerRecomendacionesPorUsuario(idUsuario).subscribe({
      next: (resp) => {
        this.listaRecomendacion = resp.recomendacion;
        console.log(' Recomendaciones del usuario:', this.listaRecomendacion);
      },
      error: (error) => {
        console.error(' Error al obtener recomendaciones del usuario:', error);
        Swal.fire('Error', 'No cuenta con recomendaciones.', 'error');
      }
    });
  }

  nuevaRecomendacion(): void {
    this.router.navigate(['/recomendaciones/nuevo']);
  }

  editar(id: number): void {
    this.router.navigate(['/recomendaciones/editar', id]);
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la recomendación permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.recomendacionService.eliminarRecomendacion(id).subscribe({
          next: () => {
            this.cargarRecomendacionesPorUsuario(this.usuarioId!);
            Swal.fire('Eliminado', 'La recomendación fue eliminada exitosamente.', 'success');
          },
          error: (error) => {
            console.error(' Error al eliminar la recomendación:', error);
            Swal.fire('Error', 'No se pudo eliminar la recomendación.', 'error');
          }
        });
      }
    });
  }
}
