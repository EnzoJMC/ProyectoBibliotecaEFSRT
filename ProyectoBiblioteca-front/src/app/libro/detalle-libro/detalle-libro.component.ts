import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroServiceService } from '../../servicio/libro.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../servicio/usuario.service';
import { ReservaService } from '../../servicio/reserva.service';


@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrl: './detalle-libro.component.css'
})
export class DetalleLibroComponent implements OnInit {
  libro: any = {};
  libroId!: number;
  usuarioId!: number;

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroServiceService,
    private usuarioService: UsuarioService,
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.libroId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarLibro();
    this.obtenerPerfilUsuario();
  }

  cargarLibro(): void {
    this.libroService.obtenerLibroPorId(this.libroId).subscribe({
      next: (resp) => {
        this.libro = resp.libro;
      },
      error: (error) => {
        console.error(' Error al obtener el libro:', error);
        Swal.fire('Error', 'No se pudo cargar el libro.', 'error');
      }
    });
  }

  obtenerPerfilUsuario(): void {
    this.usuarioService.obtenerPerfil().subscribe({
      next: (resp) => {
        this.usuarioId = resp.usuario.id;
      },
      error: (error) => {
        console.error(' Error al obtener perfil:', error);
        Swal.fire('Error', 'No se pudo obtener el perfil del usuario.', 'error');
      }
    });
  }

  registrarReserva(): void {
    if (!this.usuarioId || !this.libroId) {
      Swal.fire('Error', 'Faltan datos para registrar la reserva.', 'error');
      return;
    }

    const nuevaReserva = {
      usuario: { id: this.usuarioId },
      libro: { id: this.libroId },
      estado: 'activa'
    };

    this.reservaService.crearReserva(nuevaReserva).subscribe({
      next: () => {
        Swal.fire('Reservado', 'La reserva fue registrada con éxito.', 'success');
      },
      error: (error) => {
        console.error(' Error al registrar reserva:', error);
        Swal.fire('Error', 'No se pudo registrar la reserva.', 'error');
      }
    });
  }

  volver(): void {
    this.router.navigate(['/libros']);
  }
}