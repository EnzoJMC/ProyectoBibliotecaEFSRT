import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private login: string = 'http://localhost:8080/login';

  constructor(
    private http: HttpClient
  ) { }

  ingresar(request : any): Observable<any> {
    return this.http.post(`${this.login}`, request, {
      observe: 'response'
    }).pipe(map((response : HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;

      const beaberToken = headers.get('Authorization');
      const token = beaberToken ? beaberToken.replace('Bearer ', '') : null;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        
      }
      return body;
    }))
  }

 token(){
    return localStorage.getItem('token');
 }

 logout() {
  localStorage.removeItem('token');
}
}
