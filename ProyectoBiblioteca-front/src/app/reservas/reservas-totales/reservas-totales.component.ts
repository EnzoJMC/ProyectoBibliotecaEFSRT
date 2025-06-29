import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../servicio/reserva.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas-totales',
  templateUrl: './reservas-totales.component.html',
  styleUrls: ['./reservas-totales.component.css']
})
export class ReservasTotalesComponent implements OnInit {

  listaReservas: any[] = [];
  cargando: boolean = false;

  constructor(
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarTodasLasReservas();
  }

  cargarTodasLasReservas(): void {
    this.cargando = true;
    this.reservaService.listarReservas().subscribe({
      next: (resp) => {
        this.listaReservas = resp.reservas || resp;
        this.cargando = false;
        console.log(' Reservas cargadas:', this.listaReservas);
      },
      error: (error) => {
        console.error(' Error al obtener todas las reservas:', error);
        this.cargando = false;
        Swal.fire('Error', 'No se pudieron cargar las reservas.', 'error');
      }
    });
  }

  verDetalles(id: number): void {
   
    this.router.navigate(['/reservas/detalle', id]);
  }

  eliminarReserva(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará la reserva permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      this.reservaService.eliminarReserva(id).subscribe({
        next: () => {
          Swal.fire('Eliminada', 'La reserva fue eliminada correctamente.', 'success');
          this.cargarTodasLasReservas();
        },
        error: (error) => {
          console.error(' Error al eliminar la reserva:', error);
          Swal.fire('Error', 'No se pudo eliminar la reserva.', 'error');
        }
      });
    }
  });
}

}
