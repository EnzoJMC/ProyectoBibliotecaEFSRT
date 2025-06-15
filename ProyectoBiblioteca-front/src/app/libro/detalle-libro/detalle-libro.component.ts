import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroServiceService } from '../../servicio/libro.service';


@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrl: './detalle-libro.component.css'
})
export class DetalleLibroComponent implements OnInit {

  libro: any;

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroServiceService,
    private router: Router 
  ) {}

  ngOnInit(): void {  
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.libroService.obtenerLibroPorId(id).subscribe({
      next: (data) => this.libro = data.libro,
      error: (err) => console.error('Error al cargar detalle', err)
    });
  }

  volver(): void {
  this.router.navigate(['/libros']);
}

}
