import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecomendacionService } from '../../servicio/recomendacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-recomendacion',
  templateUrl: './detalle-recomendacion.component.html',
  styleUrls: ['./detalle-recomendacion.component.css']
})
export class DetalleRecomendacionComponent implements OnInit {

  recomendacion: any;

  constructor(
    private route: ActivatedRoute,
    private recomendacionService: RecomendacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarDetalle(+id);
    }
  }

  cargarDetalle(id: number): void {
    this.recomendacionService.obtenerRecomendacion(id).subscribe({
      next: (resp) => {
        this.recomendacion = resp.recomendacion;
      },
      error: (error) => {
        console.error('Error al obtener detalle', error);
        Swal.fire('Error', 'No se pudo cargar la recomendación.', 'error');
        this.router.navigate(['/totalRecomendaciones']);
      }
    });
  }

  volver(): void {
    this.router.navigate(['/totalRecomendaciones']);
  }
}