import { Component, OnInit } from '@angular/core';
import { RecomendacionService } from '../../servicio/recomendacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-recomendacion',
  templateUrl: './listar-recomendacion.component.html',
  styleUrls: ['./listar-recomendacion.component.css']
})
export class ListarRecomendacionComponent implements OnInit {

  listaRecomendacion : any[] = [];

  constructor(
    private recomendacionService: RecomendacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarRecomendaciones();
  }

  cargarRecomendaciones(): void {
    this.recomendacionService.obtenerRecomendaciones().subscribe({
      next: (data) => {
        this.listaRecomendacion = data.recomendaciones;
        console.log(data)
      },
      error: (error) => {
        console.error('❌ Error al obtener recomendaciones:', error);
        Swal.fire('Error', 'No se pudieron cargar las recomendaciones.', 'error');
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
            this.cargarRecomendaciones();
            Swal.fire('Eliminado', 'La recomendación fue eliminada exitosamente.', 'success');
          },
          error: (error) => {
            console.error('❌ Error al eliminar la recomendación:', error);
            Swal.fire('Error', 'No se pudo eliminar la recomendación.', 'error');
          }
        });
      }
    });
  }
}
