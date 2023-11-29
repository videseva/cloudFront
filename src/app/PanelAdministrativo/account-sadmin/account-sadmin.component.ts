import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { cuenta } from 'src/app/models/cuenta';
import { usuario } from 'src/app/models/usuario';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-account-sadmin',
  templateUrl: './account-sadmin.component.html',
  styleUrls: ['./account-sadmin.component.css']
})
export class AccountSadminComponent {

  cuentaForm: FormGroup = new FormGroup({});
  nuevaCuenta = new cuenta(); 
  nuevoUser = new usuario(); 
  userForm: FormGroup = new FormGroup({});

  totalCuenta = 0;
  countEstadoActive=0;
  countEstadoInactive=0;
  items: cuenta[] = [];
  filtroBusqueda: string = '';


  constructor(private accountService: AccountService,
     private formBuilder: FormBuilder,
     private userService: UserService, 
     private alertaService: AlertaService) { }


  deleteAccount() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
  ngOnInit() {
    //3° Paso inicializar el formulario
    this.inicializarFormulario();
    this.consultAccounts();
  }

  private inicializarFormulario() {
    this.cuentaForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      tipoCondominio: ['', [Validators.required]],
      
      // Agrega más campos según tus necesidades
    });
  
  }

  saveAccount(){
    if (this.cuentaForm.valid) {
     
      this.nuevaCuenta.id = this.cuentaForm.value.id,
      this.nuevaCuenta.nombre= this.cuentaForm.value.nombre,
      this.nuevaCuenta.direccion= this.cuentaForm.value.direccion,
      this.nuevaCuenta.tipoCondominio= this.cuentaForm.value.tipoCondominio

    this.alertaService.alertaGuardar('Usuario Registrado');
    //6° reinicio el formulario reactivo
    this.cuentaForm.reset();
    console.log(this.nuevaCuenta);
  }
  }

  consultAccounts(){
    this.accountService.get().subscribe(result => {
      this.items = result;
      this.totalCuenta = this.items.length;
      console.log("consultandolos")
      console.log(this.items)
      this.countEstadoActive = this.items.filter(item => item.estado === 1).length;
      this.countEstadoInactive = this.items.filter(item => item.estado === 2).length;
    });
   
  }

  filtrarItems() {
    return this.items.filter(item =>
      item.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
      item.id.toString().includes(this.filtroBusqueda.toLowerCase())
    );
  }
  


}
