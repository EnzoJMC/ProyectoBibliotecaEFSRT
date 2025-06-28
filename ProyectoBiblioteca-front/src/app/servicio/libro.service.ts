import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../api.routes';

@Injectable({
  providedIn: 'root'
})


export class LibroServiceService {

  private urlBase = BASE_URL + '/libros';

 

  constructor(private http: HttpClient) {}

  listarLibros(): Observable<any> {
    return this.http.get(`${this.urlBase}/listar`);
    
  }

  obtenerLibroPorId(id: number): Observable<any> {
    return this.http.get(`${this.urlBase}/${id}`);
  }

  crearLibro(libro: any): Observable<any> {
    return this.http.post(`${this.urlBase}/crear`, libro);
  }

  actualizarLibro(id: number, libro: any): Observable<any> {
    return this.http.put(`${this.urlBase}/${id}`, libro);
  }

  eliminarLibro(id: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);

  }

 subirImagen(formData: FormData): Observable<string> {
  return this.http.post(`${this.urlBase}/upload`, formData, { responseType: 'text' });
}

}
