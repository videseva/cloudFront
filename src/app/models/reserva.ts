import { Data } from "@angular/router";
import { zonaComun } from "./zonacomun";
import { usuario } from "./usuario";

export class reserva {
    id: number =0
    idCuenta:number =0;
    idCategoria:number =0;
    idZone :number=0;
    zone: zonaComun = new zonaComun();
    idUser:number= 0;
    user: usuario = new usuario();
    descripcion: string ="";
    horario: string="";
    fechaReserver: string ="";
    estado:number =0;
    date:string ="";

}

