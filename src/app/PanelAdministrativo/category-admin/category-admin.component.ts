import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria';
import { AlertaService } from 'src/app/services/alerta.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent {
  //1° paso crear el formulario
  // Después e inicializo la variables
  categoryForm: FormGroup = new FormGroup({});
  nuevaCategoria = new Categoria();
  categoryUpdate = new Categoria();
  

  //Gley 1° paso declara ñas variables que vas usar
  categoriaConsult = new Categoria();
  listCategory: Categoria[] = [];
  totalCategory: number = 0;
  items: Categoria[] = [];

  //Stefanny
  filtroBusqueda: string = '';


  //2° Paso colocar en el cosntructor private formBuilder: FormBuilder
  //Gley coloca en el consturctor el services que vas utilizar
  constructor(private formBuilder: FormBuilder,
     private categoryService: CategoryService,
     private alertaService: AlertaService) { }
  ngOnInit() {

    //3° Paso inicializar el formulario
    this.inicializarFormulario();
    this.consultCategory();
  }

  //4° crear el formulario reactivo 
  private inicializarFormulario() {
    this.categoryForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      // Agrega más campos según tus necesidades
    });
  }

  //5° crear el formulario reactivo 
  //Gley 3° paso modifica el metood guardar
  saveCategory() {
    if (this.categoryForm.valid) {
      this.nuevaCategoria.nombre = this.categoryForm.value.nombre;
      //Para Glrey: 2 paso metodo guardar
      this.categoryService.post(this.nuevaCategoria).subscribe((result) => {
        if (result != null) {
          this.consultCategory();
          // alerta
          this.alertaService.alertaGuardar('Categoria Registrada');
        }
      });
      //6° reinicio el formulario reactivo 
      this.categoryForm.reset();
      console.log(this.nuevaCategoria);
    }
  }
  //Gley 4° paso crea el metodo consultar
  consultCategory() {
    this.categoryService.get().subscribe(result => {
      this.items = result;
      console.log(this.items)
      this.totalCategory = this.items.length;
    });

  }
  //Gley 5° paso crea el metodo consultar por id
  consultCategoryId() {
    this.categoryService.getId(this.nuevaCategoria.id).subscribe(result => {
      this.categoriaConsult = result;
    });
  }

  vercategory(item: any){
    this.categoryUpdate = item;
    
  }
  //Gley 6° paso crea el metodo actualizar 
  updateCategory() {
    this.categoryService.put(this.categoryUpdate.id, this.categoryUpdate).subscribe(result => {
     this.categoryUpdate = result;
     this.consultCategory();
     this.alertaService.alertaGuardar('Categoria Actualizada');
     
    });
    
  }
  //Gley 7° paso crea el metodo actualizar 
  deleteCategory(item: any) {
    this.nuevaCategoria = item;
    //Se colcoa la alerta 
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
        this.categoryService.delete(this.nuevaCategoria.id, this.nuevaCategoria).subscribe(result => {
          this.consultCategory();
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


}
