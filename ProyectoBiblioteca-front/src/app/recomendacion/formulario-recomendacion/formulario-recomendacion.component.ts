import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RecomendacionService } from '../../servicio/recomendacion.service';

@Component({
  selector: 'app-formulario-recomendacion',
  templateUrl: './formulario-recomendacion.component.html',
  styleUrl: './formulario-recomendacion.component.css'
})
export class FormularioRecomendacionComponent implements OnInit {

  formRecomendacion: FormGroup;
  modo: 'crear' | 'editar' = 'crear';
  idRecomendacion?: number;

  constructor(
    private fb: FormBuilder,
    private recomendacionService: RecomendacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formRecomendacion = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      razon: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modo = 'editar';
      this.idRecomendacion = +idParam;
      this.cargarRecomendacion(this.idRecomendacion);
    }
  }

  cargarRecomendacion(id: number): void {
    this.recomendacionService.obtenerRecomendacionesPorUsuario(id).subscribe({
      next: (data) => this.formRecomendacion.patchValue(data.recomendacion),
      error: (err) => console.error('Error al cargar recomendación', err)
    });
  }

  onSubmit(): void {
    if (this.formRecomendacion.invalid) {
      Swal.fire('Error', 'Completa todos los campos', 'warning');
      return;
    }

    const recomendacion = {
      ...this.formRecomendacion.value,
      fecha: new Date(),
      usuario: { id: 1 } 
    };

    if (this.modo === 'crear') {
      this.recomendacionService.crearRecomendacion(recomendacion).subscribe({
        next: () => {
          Swal.fire('Guardado', 'Recomendación registrada correctamente', 'success');
          this.router.navigate(['/recomendaciones']);
        },
        error: (err) => console.error('Error al registrar recomendación', err)
      });
    } else if (this.idRecomendacion) {
      this.recomendacionService.actualizarRecomendacion(this.idRecomendacion, recomendacion).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Recomendación actualizada correctamente', 'success');
          this.router.navigate(['/recomendaciones']);
        },
        error: (err) => console.error('Error al actualizar recomendación', err)
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/recomendaciones']);
  }

}
