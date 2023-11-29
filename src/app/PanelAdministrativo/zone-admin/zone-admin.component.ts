import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria';
import { zonaComun } from 'src/app/models/zonacomun';
import { CategoryService } from 'src/app/services/category.service';
import { ZoneCommonService } from 'src/app/services/zone-common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zone-admin',
  templateUrl: './zone-admin.component.html',
  styleUrls: ['./zone-admin.component.css']
})
export class ZoneAdminComponent {

  //1° jennifer
  zonaForm: FormGroup = new FormGroup({});
  nuevoZona = new zonaComun();
  zonaUpdate = new zonaComun();
  items: zonaComun[] = [];
  itemsCategory: Categoria[] = [];
  totalZone = 0;
  filtroBusqueda: string = '';
  zonaConsult = new zonaComun();
  selectedFile= new File([], 'dummy', { type: 'image/png' })
fotoBase64: string = "";


  //2° paso dos inicializar constructor
  constructor(private formBuilder: FormBuilder, private zoneCommonService: ZoneCommonService, private categoryService: CategoryService,
    ) { }

  ngOnInit() {
    //3° Paso inicializar el formulario
    this.inicializarFormulario();
    this.consultZone();
    this.consultCategoryCuenta();
  }


  private inicializarFormulario() {
    this.zonaForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      capacidad: ['', [Validators.required]],
      idCategoria: ['', [Validators.required]],
      foto: [ [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    // Utiliza FileReader para leer el contenido del archivo como base64
    const reader = new FileReader();
    reader.onloadend = () => {
     this.fotoBase64 = reader.result as string;

      // Llama a la función para enviar la imagen al servidor
     
    };

    // Lee el contenido del archivo como base64
    reader.readAsDataURL(file);
  }

  saveZona() {

    if (this.zonaForm.valid) {

      this.nuevoZona.nombre= this.zonaForm.value.nombre,
      this.nuevoZona.capacidad= this.zonaForm.value.capacidad,
      this.nuevoZona.idCategoria= this.zonaForm.value.idCategoria,
      
      this.nuevoZona.foto=this.fotoBase64,
      this.nuevoZona.descripcion= this.zonaForm.value.descripcion,
      this.nuevoZona.disponibilidad= "",
        this.nuevoZona.noPermitido= "",
      this.nuevoZona.date= '',
      
       
      // alerta
      this.zoneCommonService.post(this.nuevoZona).subscribe(result => {
        if (result != null) {
          this.consultZone();
        }
      });
      //6° reinicio el formulario reactivo 
      this.zonaForm.reset();
      console.log(this.nuevoZona);
    }
    
    //alerta de guardado
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Signed in successfully"
    });

  }
  consultZone() {
    this.zoneCommonService.get().subscribe(result => {
      this.items = result;
      this.totalZone = this.items.length;
    });
  }

  consultUserId() {
    this.zoneCommonService.getId(this.nuevoZona.id).subscribe(result => {
      this.zonaConsult = result;
    });
  }
  verZona(item:any){
    this.zonaUpdate = item;
  }
  updateZona() {
    this.zoneCommonService
      .put(this.zonaUpdate.id, this.zonaUpdate)
      .subscribe(result => {
        this.zonaUpdate = result;
        this.consultZone();
       
        
  });
}

  deleteZone(item: any) {
    this.nuevoZona = item;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Estás Seguro?",
      text: "No Podrás Revertir Esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "No, Cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.zoneCommonService.delete(this.nuevoZona.id, this.nuevoZona).subscribe(result => {
          this.consultZone();
        });
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "Su Archivo se ha Eliminado.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Tu Archivo está a salvo :)",
          icon: "error"
        });
      }
    });
  }
  filtrarItems() {
    return this.items.filter(item =>
      item.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
      item.id.toString().includes(this.filtroBusqueda.toLowerCase())
    );
  }
 

  consultCategoryCuenta() {
    this.categoryService.get().subscribe(result => {
      this.itemsCategory = result;
      console.log(this.itemsCategory)
    });
  }
}
