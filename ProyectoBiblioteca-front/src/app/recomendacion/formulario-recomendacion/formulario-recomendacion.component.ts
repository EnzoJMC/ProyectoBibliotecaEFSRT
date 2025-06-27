import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RecomendacionService } from '../../servicio/recomendacion.service';
import { UsuarioService } from '../../servicio/usuario.service';

@Component({
  selector: 'app-formulario-recomendacion',
  templateUrl: './formulario-recomendacion.component.html',
  styleUrl: './formulario-recomendacion.component.css'
})
export class FormularioRecomendacionComponent implements OnInit {

  formRecomendacion: FormGroup;
  modo: 'crear' | 'editar' = 'crear';
  idRecomendacion?: number;
  usuarioId?: number;
usuario?: any; 


  constructor(
    private fb: FormBuilder,
    private recomendacionService: RecomendacionService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formRecomendacion = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      razon: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.obtenerPerfilUsuario();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modo = 'editar';
      this.idRecomendacion = +idParam;
      this.cargarRecomendacion(this.idRecomendacion);
    }
  }

  obtenerPerfilUsuario(): void {
  this.usuarioService.obtenerPerfil().subscribe({
    next: (resp) => {
      this.usuarioId = resp.usuario.id;
      this.usuario = resp.usuario; 
    },
    error: (err) => {
      console.error('Error al obtener perfil', err);
      Swal.fire('Error', 'No se pudo obtener el perfil del usuario.', 'error');
    }
  });
}

  cargarRecomendacion(id: number): void {
    this.recomendacionService.obtenerRecomendacion(id).subscribe({
      next: (resp) => {
        if (resp.recomendacion) {
          this.formRecomendacion.patchValue(resp.recomendacion);
        }
      },
      error: (err) => {
        console.error('Error al cargar recomendación', err);
        Swal.fire('Error', 'No se pudo cargar la recomendación.', 'error');
      }
    });
  }

  onSubmit(): void {
    if (this.formRecomendacion.invalid || !this.usuarioId) {
      Swal.fire('Error', 'Completa todos los campos', 'warning');
      return;
    }

    const recomendacion = {
      ...this.formRecomendacion.value,
      fecha: new Date(),
      usuario: { id: this.usuarioId }
    };

    if (this.modo === 'crear') {
      this.recomendacionService.crearRecomendacion(recomendacion).subscribe({
        next: () => {
          Swal.fire('Guardado', 'Recomendación registrada correctamente', 'success');
          this.router.navigate(['/recomendaciones']);
        },
        error: (err) => {
          console.error('Error al registrar recomendación', err);
          Swal.fire('Error', 'No se pudo registrar la recomendación.', 'error');
        }
      });
    } else if (this.idRecomendacion) {
      this.recomendacionService.actualizarRecomendacion(this.idRecomendacion, recomendacion).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Recomendación actualizada correctamente', 'success');
          this.router.navigate(['/recomendaciones']);
        },
        error: (err) => {
          console.error('Error al actualizar recomendación', err);
          Swal.fire('Error', 'No se pudo actualizar la recomendación.', 'error');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/libros']);
  }
}