import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {

  private apiUrl = 'http://localhost:8080/api/recomendaciones';

  constructor(private http: HttpClient) {}

  // ✅ GET /api/recomendaciones/listar
  obtenerRecomendaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar`);
  }

  // ✅ GET /api/recomendaciones/recomendacionesUsuario/{id}
  obtenerRecomendacionesPorUsuario(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/recomendacionesUsuario/${idUsuario}`);
  }

  // ✅ GET /api/recomendaciones/{id}
  obtenerRecomendacion(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ✅ POST /api/recomendaciones/crear
  crearRecomendacion(recomendacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, recomendacion);
  }

  // ✅ PUT /api/recomendaciones/{id}
  actualizarRecomendacion(id: number, recomendacion: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, recomendacion);
  }

  // ✅ DELETE /api/recomendaciones/{id}
  eliminarRecomendacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}