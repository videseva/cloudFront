import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { reserva } from 'src/app/models/reserva';
import { usuario } from 'src/app/models/usuario';
import { zonaComun } from 'src/app/models/zonacomun';
import { AlertaService } from 'src/app/services/alerta.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { UserService } from 'src/app/services/user.service';
import { ZoneCommonService } from 'src/app/services/zone-common.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent {

  
  nuevaReserva = new reserva();
  updateReserve = new reserva();
  items: reserva[] = [];
  itemsTables: any[] = [];
  itemsZone: zonaComun[] = [];
  itemsUser: usuario[] = [];
  user = new usuario();
  zone = new zonaComun();
  filtroBusqueda: string = '';
  totalReserver = 0;

  Hinicion : string="";
  HFin: string="";
  
  constructor(private reserverService: ReserveService,
    private zoneCommonService: ZoneCommonService,
    private userService: UserService,
    private alertaService: AlertaService,
    private formBuilder: FormBuilder,
    ) { }
  ngOnInit() {
    this.consultReserver();
    this.consultZone();
    this.consultUser();

  }




  consultReserver() {
    this.reserverService.get().subscribe(result => {
      this.items = result;
      console.log(this.items)
      this.totalReserver = this.items.length;
    });

  }
  consultZone() {
    this.zoneCommonService.get().subscribe(result => {
      this.itemsZone = result;
    });
  }
  consultUser() {
    this.userService.get().subscribe(result => {
      this.itemsUser = result;
    });
  }
  showUser(value: any) {
    this.user.nombre = "prueba";
    console.log(value);
    for (let index = 0; index < this.itemsUser.length; index++) {
      const element = this.itemsUser[index];
      if (element.id == value.target.value) {
        this.user = element;
      }
    }
  }
  showZone(value: any) {
    console.log(value);
    for (let index = 0; index < this.itemsZone.length; index++) {
      const element = this.itemsZone[index];
      if (element.id == value.target.value) {
        this.zone = element;
        console.log(this.zone)

      }
    }
  }
  saveReserver() {

    this.nuevaReserva.idCategoria = this.zone.idCategoria;
    this.nuevaReserva.idZone = this.zone.id;
    this.nuevaReserva.horario = this.Hinicion+" hasta "+ this.HFin;
    console.log(this.nuevaReserva);
    this.reserverService.post(this.nuevaReserva).subscribe((result) => {
      if (result != null) {
        this.nuevaReserva = result
        console.log(this.nuevaReserva);
        this.alertaService.alertaGuardar('Reserva Registrada');
        this.consultReserver();
        this.nuevaReserva = new reserva();
      }
    });
  }


  filtrarItems() {
    return this.items.filter(item =>
      item.descripcion.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
      item.id.toString().includes(this.filtroBusqueda.toLowerCase())
    );
  }
  deleteReserver(item: any) {
    this.nuevaReserva = item;
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
        this.reserverService.delete(this.nuevaReserva.id, this.nuevaReserva).subscribe(result => {
          this.consultReserver();
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

  showReserver(item:any){
    this.updateReserve = item;
    //1: pendiente, 2: aceptada, 3 :cancelada
    this.reserverService.put(this.updateReserve.id,this.updateReserve).subscribe(result => {
      this.consultReserver();
    
    } 
    );
   }

   alertaReserve(){
    this.alertaService.alertaGuardar("Reserva actualizada");
   }
  
}