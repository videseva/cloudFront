import { Component } from '@angular/core';
import { cuenta } from 'src/app/models/cuenta';
import { usuario } from 'src/app/models/usuario';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  nuevoAccount = new cuenta();
  user = new usuario();
  id = 0;

  inputsHabilitados = false;
  modoEdicion = false;
  mensajeEditar = '';
  constructor(private accountService: AccountService, private userService: UserService) { }

  ngOnInit() {
    this.consultAccount();
    this.consultUser();
  }

  consultAccount() {

    this.accountService.getId().subscribe(result => {
      this.nuevoAccount = result
    });
  }
  consultUser() {

    const userIdFromLocalStorage = localStorage.getItem('user_id');
    this.id = userIdFromLocalStorage ? +userIdFromLocalStorage : 0;
    this.userService.getId(this.id).subscribe(result => {
      this.user = result;
    });
  }
 /* savePassword(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Estás Seguro?",
      text: "que deseas cambiar tu contraseña!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, guardar!",
      cancelButtonText: "No, Cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "GUARDADO!",
          text: "Su contraseña ha sido guardada :)",
          icon: "success"
        });
      } else if (
         Read more about handling dismissals below 
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "su contraseña no se guardo :(",
          icon: "error"
        });
      }
    });
  }
*/

  habilitarInputs() {
    this.mensajeEditar='Ahora ya puedes editar tus datos ';
    this.inputsHabilitados = true;
    this.modoEdicion = true;
  }

  guardarCambios() {

    this.mensajeEditar=' ';
//aqui va mi codigo para guardar

    this.inputsHabilitados = false;
    this.modoEdicion = false;
    this.consultUser();
  }
}
