import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent {

  constructor(private router: Router) {}

  irAMantenimientoLibros(): void {
    this.router.navigate(['/mantenimientoLibros']);
  }

  irARecomendaciones(): void {
    this.router.navigate(['/totalRecomendaciones']);
  }

  irAUsuarios(): void {
    this.router.navigate(['/usuarios']);
  }

  irAReservas(): void {
    this.router.navigate(['/totalReservas']);
  }
}