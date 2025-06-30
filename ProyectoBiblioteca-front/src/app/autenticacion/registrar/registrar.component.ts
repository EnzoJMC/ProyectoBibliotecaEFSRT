import { Component } from '@angular/core';
import { UsuarioService } from '../../servicio/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
 nombre = '';
  correo = '';
  contrasena = '';
  tipoUsuario = 'USER';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  registrarUsuario() {
  const usuario = {
    nombre: this.nombre,
    correo: this.correo,
    contrasena: this.contrasena,
    tipoUsuario: this.tipoUsuario,
  };

  this.usuarioService.crearUsuario(usuario).subscribe({
    next: (res) => {
    Swal.fire({
      icon: 'success',
      title: 'Usuario creado',
     
      confirmButtonColor: '#0d6efd',
    }).then(() => {
      this.limpiarFormulario();  
      this.router.navigate(['/login']); 
    });
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
