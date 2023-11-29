import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { usuario } from 'src/app/models/usuario';

import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css'],
})
export class UsersAdminComponent {
  //1° jennifer
  UserForm: FormGroup = new FormGroup({});
  nuevoUser = new usuario();
  userUpdate = new usuario();

  userConsult = new usuario();
  listUser: usuario[] = [];
  totalUser: number = 0;

  items : usuario[]=[];
  filtroBusqueda: string = '';


  //eva prueba
  users: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertaService: AlertaService
  ) {}

  ngOnInit() {
    //3° Paso inicializar el formulario
    this.inicializarFormulario();
    this.consultUser();
  }

  private inicializarFormulario() {
    this.UserForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }

  saveFile(){
    this.alertaService.alertaGuardar('Foto Guardada');
  }

  saveUser() {
    if (this.UserForm.valid) {
     
        this.nuevoUser.nombre = this.UserForm.value.nombre,
        this.nuevoUser.genero= this.UserForm.value.genero,
        this.nuevoUser.telefono= this.UserForm.value.telefono,
        this.nuevoUser.correo= this.UserForm.value.correo,
        this.nuevoUser.direccion= this.UserForm.value.direccion,
        
      // alerta
      this.userService.post(this.nuevoUser).subscribe((result) => {
        if (result != null) {
          this.consultUser();
          this.alertaService.alertaGuardar('Usuario Registrado');
        }
      });
      //6° reinicio el formulario reactivo
      this.UserForm.reset();
      console.log(this.nuevoUser);
    }
    
  }
  consultUser() {
    this.userService.get().subscribe(result => {
      this.items = [];
      this.items = result;
      this.totalUser = this.items.length;
      
    });
  }
  consultUserId() {
    this.userService.getId(this.nuevoUser.id).subscribe(result => {
      this.userConsult = result;
    });
  }
  verUsers(item:any){
    this.userUpdate = item;
  }
  updateUser() {
    this.userService
      .put(this.userUpdate.id, this.userUpdate)
      .subscribe(result => {
        this.userUpdate = result;
        this.consultUser();
        this.alertaService.alertaGuardar('Usuario Actualizado');
  });
 
}
  deleteUser(item: any) {
    this.nuevoUser = item;
    
        //Se colcoa la alerta
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: 'Estás Seguro?',
            text: 'No Podrás Revertir Esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, Cancelar!',
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.userService.delete(this.nuevoUser.id, this.nuevoUser).subscribe(result => {
                this.consultUser();
              });
              swalWithBootstrapButtons.fire({
                title: 'Eliminado!',
                text: 'Su Archivo se ha Eliminado.',
                icon: 'success',
              });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: 'Cancelado',
                text: 'Tu Archivo está a salvo :)',
                icon: 'error',
              });
            }
          });
      
  }

  onFileChange(event:any){
    const file = event.target.files[0];
    if (file) {
      this.readExcel(file);
      console.log("Abrio el archivo")
    }
  }
  readExcel(file: any): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
  
      // Especifica el tipo como string[][]
      const usersArray: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      // Itera sobre los datos del archivo Excel y agrégales al arreglo 'users'
      for (let i = 1; i < usersArray.length; i++) {
        const user = {
          nombre: usersArray[i][0],
          genero: usersArray[i][1],
          telefono: usersArray[i][2],
          correo: usersArray[i][3],
          direccion: usersArray[i][4],
        };
        this.users.push(user);
      }
    };
    reader.readAsArrayBuffer(file);
    console.log(this.users)
  
  }
  filtrarItems() {
    return this.items.filter(item =>
      item.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
      item.id.toString().includes(this.filtroBusqueda.toLowerCase()) ||
      item.genero.toString().includes(this.filtroBusqueda.toLowerCase()) ||
      item.direccion.toString().includes(this.filtroBusqueda.toLowerCase()) 

    );
  }
}
