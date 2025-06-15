import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {

  private apiUrl = 'http://localhost:8080/recomendaciones';

  constructor(private http: HttpClient) {}


  obtenerRecomendaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar`);
}

 obtenerRecomendacionesPorUsuario(idUsuario: number): Observable<any> {
  return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}`);
}

  crearRecomendacion(recomendacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, recomendacion);
  }


  actualizarRecomendacion(id: number, recomendacion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, recomendacion);
  }


  eliminarRecomendacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
