import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicio/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimiento-usuario',
  templateUrl: './mantenimiento-usuario.component.html',
  styleUrls: ['./mantenimiento-usuario.component.css']
})
export class MantenimientoUsuarioComponent implements OnInit {

  listaUsuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (resp) => {
        this.listaUsuarios = resp.usuarios;
      },
      error: (err) => {
        console.error('❌ Error al cargar usuarios:', err);
        Swal.fire('Error', 'No se pudieron cargar los usuarios.', 'error');
      }
    });
  }

  editar(id: number): void {
    // redirigir o mostrar modal de edición
    Swal.fire('Editar', `Función de editar para el usuario ID: ${id}`, 'info');
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(id).subscribe({
          next: () => {
            this.cargarUsuarios();
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
          },
          error: (err) => {
            console.error('❌ Error al eliminar:', err);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        });
      }
    });
  }
}