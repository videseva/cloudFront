import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';
  login:any;
  user:any;
  correo :string="";
  contrasena: string=""
  username="";
  visible: boolean = true;
  changetype: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      userType: [] // Valor predeterminado para el tipo de usuario
    });

  }

  onSubmit() {
    this.login ={
      correo:this.correo,
      contrasena:this.contrasena 
     };
          this.authService.post(this.login).subscribe((result) => {
            if (result != null) {
              this.user = result;
              console.log(this.user);
              localStorage.setItem('user_id',result.user.id);
              localStorage.setItem('user_idCuenta',result.user.idCuenta);
              localStorage.setItem('user_nombre',result.user.nombre);
              localStorage.setItem('user_tipoUser',result.user.tipoUser);
              localStorage.setItem('token',result.token.token);
              localStorage.setItem('username','admin');


              switch (true) {
                case this.authService.isSuperAdmin():
                  this.router.navigate(['/homeSadmin']);
                  break;
              
                case this.authService.isAdmin():
                  this.router.navigate(['/home']);
                  break;
              
                case this.authService.isResidente():
                  this.router.navigate(['/homeResidente']);
                  break;
            
              }

            }
          }
          );
         // this.username = localStorage.getItem('username') || '';
         
        
          
         // this.calculateUserType(this.username);
       
   }

   isAdmin(): boolean {
    // Verifica si el tipo de usuario es administrador
    return this.user && this.user.tipoUser === 'admin';
  }
  
    
  
  // onSubmit() {
  //   this.authService.logout();
  //   if (this.loginForm.valid) {
  //     console.log('Formulario válido:', this.loginForm.valid);
  //     const { username, password, userType } = this.loginForm.value;
  //     console.log('Valores del formulario:', username, password, userType);
  //     const calculatedUserType = this.calculateUserType(username);
  //     console.log('Calculated userType:', calculatedUserType);

  //     if (this.authService.login(username, password, calculatedUserType)) {
  //       console.log('Inicio de sesión exitoso');
  //       console.log('AuthService isAuthenticated:', this.authService.isAuthenticated);
  //       console.log('AuthService userType:', this.authService.userType);
  //       this.router.navigate(['/home']);


  //     } else {
  //       // Manejar error de inicio de sesión
  //       this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
  //     }
  //   } else {

  //     this.errorMessage = 'Por favor, completa todos los campos.';
  //   }
  // }

  private calculateUserType(username: string): number {
    if (username === 'superAdmin') {
      return 1;
    } else if (username === 'admin') {
      return 2;
    } else if (username === 'residente') {
      return 3;
    } else {
      return 0; // Valor predeterminado o manejar el caso de usuario no reconocido
    }
  }

  
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

}







