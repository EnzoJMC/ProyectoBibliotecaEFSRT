import { Component, OnInit } from '@angular/core';
import { RecomendacionService } from '../../servicio/recomendacion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-recomendaciones',
  templateUrl: './total-recomendaciones.component.html',
  styleUrls: ['./total-recomendaciones.component.css']
})
export class TotalRecomendacionesComponent implements OnInit {

  listaRecomendaciones: any[] = [];

  constructor(
    private recomendacionService: RecomendacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarTodasRecomendaciones();
  }

  cargarTodasRecomendaciones(): void {
    this.recomendacionService.obtenerRecomendaciones().subscribe({
      next: (resp) => {
        this.listaRecomendaciones = resp.recomendaciones;
      },
      error: (err) => {
        console.error('Error al obtener recomendaciones:', err);
        Swal.fire('Error', 'No se pudieron cargar las recomendaciones.', 'error');
      }
    });
  }

  verDetalles(id: number): void {
    this.router.navigate(['/recomendaciones/detalle', id]);
  }
}