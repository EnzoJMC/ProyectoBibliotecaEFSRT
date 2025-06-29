import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../api.routes';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private urlBase = BASE_URL + '/reservas';

  constructor(private http: HttpClient) {}

  listarReservas(): Observable<any> {
    return this.http.get(`${this.urlBase}`);
  }

  obtenerReservaPorId(id: number): Observable<any> {
    return this.http.get(`${this.urlBase}/${id}`);
  }

  obtenerReservasPorUsuario(idUsuario: number): Observable<any> {
    return this.http.get(`${this.urlBase}/usuario/${idUsuario}`);
  }

  crearReserva(reserva: any): Observable<any> {
    return this.http.post(`${this.urlBase}`, reserva);
  }

  actualizarReserva(id: number, reserva: any): Observable<any> {
    return this.http.put(`${this.urlBase}/${id}`, reserva);
  }

  eliminarReserva(id: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}
