import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  // Obtener perfil del usuario autenticado
  obtenerPerfil(): Observable<any> {
    return this.http.get(`${this.baseUrl}/perfil`);
  }

  // Listar todos los usuarios
  listarUsuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`);
  }

  // Obtener usuario por ID
  obtenerUsuario(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Crear nuevo usuario
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, usuario);
  }

  // Actualizar usuario existente
  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, usuario);
  }

  // Eliminar usuario
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}