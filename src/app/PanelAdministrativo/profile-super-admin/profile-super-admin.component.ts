import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { cuenta } from 'src/app/models/cuenta';
import { usuario } from 'src/app/models/usuario';
import { AccountService } from 'src/app/services/account.service';
import { AlertaService } from 'src/app/services/alerta.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-super-admin',
  templateUrl: './profile-super-admin.component.html',
  styleUrls: ['./profile-super-admin.component.css']
})
export class ProfileSuperAdminComponent {
  profileForm: FormGroup = new FormGroup({});
  nuevoAccount = new cuenta();
  user = new usuario();

  id = 0;
  totalZone = 0;
  inputsHabilitados = false;
  modoEdicion = false;
  mensajeEditar = '';
  
  constructor(private accountService: AccountService, private userService: UserService, private alertaService: AlertaService) { }

  ngOnInit() {
    this.consultAccount();
    this.consultUser();
  }

  consultAccount() {

    this.accountService.getId().subscribe(result => {
      this.nuevoAccount = result;
      
    });
  }

  consultUser() {

    const userIdFromLocalStorage = localStorage.getItem('user_id');
    this.id = userIdFromLocalStorage ? +userIdFromLocalStorage : 0;
    this.userService.getId(this.id).subscribe(result => {
      this.user = result;
    });
  }

  habilitarInputs() {
    this.mensajeEditar='Ahora ya puedes editar tus datos ';
    this.inputsHabilitados = true;
    this.modoEdicion = true;
   
  }

  guardarCambios() {
    
    this.mensajeEditar=' ';
   /* this.userService.put(this.perfilUpdate.id, this.perfilUpdate)
    .subscribe(result => {
      this.perfilUpdate = result;
    });*/
    this.inputsHabilitados = false;
    this.modoEdicion = false;
    this.consultUser();
    this.alertaService.alertaGuardar('datos actualizado');
  }

}
