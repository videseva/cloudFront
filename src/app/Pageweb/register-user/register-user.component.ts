import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { cuenta } from 'src/app/models/cuenta';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NEVER } from 'rxjs';
import { usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user.service';
import { AlertaService } from 'src/app/services/alerta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent   {

  // services cuenta y user 
cuentaFrom : FormGroup = new FormGroup({});
nuevaCuenta :  any;
nuevouser = new usuario();


totalAccounts: number = 0;
items:cuenta[]=[];

filtroBusqueda: string = '';



constructor(private formBuilder: 
  FormBuilder, private accountService: AccountService, 
  private UserService: UserService,
  private alertaService: AlertaService ,
  private router: Router
  ) { }

  ngOnInit() {
    //3° Paso inicializar el formulario
    this.inicializarFormulario();
  }

private inicializarFormulario() {
  this.cuentaFrom = this.formBuilder.group({
    nombreU: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
   
    correo: ['', [Validators.required]],
    contrasena: ['', [Validators.required]],
    mombreCondominio: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    tipocondominio: ['', [Validators.required]],
    

    // Agrega más campos según tus necesidades
  });
}

saveCuenta() {
  if (this.cuentaFrom.valid) {
     this.nuevaCuenta = {  
      nombreU: this.cuentaFrom.value.nombreU,
      genero: this.cuentaFrom.value.genero,
      telefono: this.cuentaFrom.value.telefono,
      correo: this.cuentaFrom.value.correo,
      contrasena: this.cuentaFrom.value.contrasena,
      mombreCondominio: this.cuentaFrom.value.mombreCondominio,
      direccion: this.cuentaFrom.value.direccion,
      descripcion: this.cuentaFrom.value.descripcion,
      tipocondominio: this.cuentaFrom.value.tipocondominio,
     // datos del condominio 
    };
    this.accountService.post(this.nuevaCuenta).subscribe(result => {
      if (result != null) {
        
          this.router.navigate(['/login.component']);
      }
    });
   
  }
}



}
