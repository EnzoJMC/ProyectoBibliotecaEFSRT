import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../servicio/login.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'] 
})
export class IniciarSesionComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private _loginService: LoginService,
    private route: Router,
    private fb: FormBuilder
  ) {
    
    this.formLogin = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit(): void {
   
  }

  
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload); // Base64 decode
    return JSON.parse(decodedPayload);
  }

  login() {
  if (this.formLogin.valid) {
    this._loginService.ingresar(this.formLogin.value).subscribe({
      next: (res: any) => {
        console.log("Response: ", res);

        if (res && res.token) {
          // Guarda el token
          localStorage.setItem('token', res.token);

          // Decodifica el token
          const decoded = this.decodeToken(res.token);
          const tipo = decoded.tipoUsuario;
          const correo = decoded.sub || decoded.email || decoded.correo; // ajusta según tu token

   
          localStorage.setItem('tipo', tipo);
          localStorage.setItem('correo', correo);

   
          if (tipo === 'administrador') {
            this.route.navigate(['/vistaAdmin']);
          } else if (tipo === 'cliente') {
            this.route.navigate(['/libros']);
          } else {
            this.alertaError('Tipo de usuario desconocido');
          }

        } else {
          this.alertaError("Respuesta inválida del servidor");
        }
      },
      error: (err: HttpErrorResponse) => {
        this.alertaError("Correo o contraseña incorrecta");
      }
    });
  }
}


  alertaError(message: string) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
    this.formLogin.reset();
  }
}
