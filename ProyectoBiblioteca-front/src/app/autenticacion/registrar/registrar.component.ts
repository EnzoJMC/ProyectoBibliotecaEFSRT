import { Component } from '@angular/core';
import { UsuarioService } from '../../servicio/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css',
})
export class RegistrarComponent {
  nombre = '';
  correo = '';
  contrasena = '';
  tipoUsuario = 'USER';

  constructor(private usuarioService: UsuarioService) {}

  registrarUsuario() {
    const usuario = {
      nombre: this.nombre,
      correo: this.correo,
      contrasena: this.contrasena,
      tipoUsuario: this.tipoUsuario,
    };

    this.usuarioService.crearUsuario(usuario).subscribe({
      next: (res) => {
        console.log('Usuario creado:', res);
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error('Error creando usuario:', err);
        alert('Error al crear usuario');
      },
    });
  }

  limpiarFormulario() {
    this.nombre = '';
    this.correo = '';
    this.contrasena = '';
    this.tipoUsuario = 'USER';
  }
}
