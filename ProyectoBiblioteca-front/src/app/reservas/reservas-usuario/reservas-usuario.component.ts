import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../servicio/reserva.service';
import { UsuarioService } from '../../servicio/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas-usuario',
  templateUrl: './reservas-usuario.component.html',
  styleUrls: ['./reservas-usuario.component.css']
})
export class ReservasUsuarioComponent implements OnInit {

  listaReservas: any[] = [];
  usuarioId?: number;
  cargando: boolean = true;

  constructor(
    private reservaService: ReservaService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerPerfilYReservas();
  }

  obtenerPerfilYReservas(): void {
    this.usuarioService.obtenerPerfil().subscribe({
      next: (resp) => {
        this.usuarioId = resp.usuario.id;
        if (this.usuarioId !== undefined) {
          this.cargarReservasPorUsuario(this.usuarioId);
        } else {
          console.error('ID de usuario no disponible.');
          Swal.fire('Error', 'No se obtuvo el ID del usuario.', 'error');
        }
      },
      error: (error) => {
        console.error('❌ Error al obtener perfil:', error);
        Swal.fire('Error', 'No se pudo obtener el perfil del usuario.', 'error');
      }
    });
  }

  cargarReservasPorUsuario(idUsuario: number): void {
    this.reservaService.obtenerReservasPorUsuario(idUsuario).subscribe({
      next: (resp) => {
        this.listaReservas = resp.reservas;
        this.cargando = false;
        console.log('✅ Reservas del usuario:', this.listaReservas);
      },
      error: (error) => {
        console.error('❌ Error al obtener reservas del usuario:', error);
        this.cargando = false;
      }
    });
  }

  cancelarReserva(reserva: any): void {
  Swal.fire({
    title: '¿Cancelar reserva?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'No'
  }).then(result => {
    if (result.isConfirmed) {
      const datosActualizados = {
        usuario: { id: reserva.usuario.id },
        libro: { id: reserva.libro.id },
        estado: 'cancelada'
      };

      this.reservaService.actualizarReserva(reserva.id, datosActualizados).subscribe({
        next: () => {
          Swal.fire('Cancelada', 'La reserva fue cancelada correctamente.', 'success');
          this.cargarReservasPorUsuario(this.usuarioId!);
        },
        error: (error) => {
          console.error(' Error al cancelar la reserva:', error);
          Swal.fire('Error', 'No se pudo cancelar la reserva.', 'error');
        }
      });
    }
  });
}
}
