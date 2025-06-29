import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibroServiceService } from '../../servicio/libro.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-libro',
  templateUrl: './formulario-libro.component.html',
  styleUrl: './formulario-libro.component.css'
})
export class FormularioLibroComponent implements OnInit {

  formLibro: FormGroup;
  modo: 'crear' | 'editar' = 'crear';
  idLibro?: number;
  imagenURL: string = '';

  constructor(
    private fb: FormBuilder,
    private libroService: LibroServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formLibro = this.fb.group({
  titulo: [''],
  autor: [''],
  anioPublicacion: [''],
  resumen: [''],
  categoria: [''], 
});
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.modo = 'editar';
        this.idLibro = +idParam;
        this.cargarLibro(this.idLibro);
      }
    });
  }

  cargarLibro(id: number): void {
    this.libroService.obtenerLibroPorId(id).subscribe({
      next: (data) => {
        this.formLibro.patchValue(data.libro);
        this.imagenURL = data.libro.imagenPortada; 
      },
      error: (err) => console.error('Error al cargar libro', err)
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.libroService.subirImagen(formData).subscribe({
        next: (url: string) => {
          this.imagenURL = url;
          Swal.fire('Imagen subida', 'Se subió correctamente la portada', 'success');
        },
        error: (err) => {
          console.error('Error al subir imagen', err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.formLibro.invalid || !this.imagenURL) {
      Swal.fire('Error', 'Completa todos los campos y sube una imagen.', 'warning');
      return;
    }

    const libro = {
      ...this.formLibro.value,
      imagenPortada: this.imagenURL
    };

    if (this.modo === 'crear') {
      this.libroService.crearLibro(libro).subscribe({
        next: () => {
          Swal.fire('Guardado', 'Libro registrado correctamente', 'success');
          this.router.navigate(['/mantenimientoLibros']);
        },
        error: (err) => console.error('Error al registrar libro', err)
      });
    } else if (this.modo === 'editar' && this.idLibro) {
      this.libroService.actualizarLibro(this.idLibro, libro).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Libro modificado correctamente', 'success');
          this.router.navigate(['/libros']);
        },
        error: (err) => console.error('Error al actualizar libro', err)
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/mantenimientoLibros']);
  }
}
