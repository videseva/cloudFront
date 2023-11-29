import { Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { UserService } from 'src/app/services/user.service';
import { ZoneCommonService } from 'src/app/services/zone-common.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { reserva } from 'src/app/models/reserva';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexFill,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptionsReservas = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  dataLabels: ApexDataLabels,
 
  colors:any;
  fill: ApexFill
  legend: any; 
};

@Component({
  selector: 'app-home-residente',
  templateUrl: './home-residente.component.html',
  styleUrls: ['./home-residente.component.css']
})
export class HomeResidenteComponent {
  @ViewChild('fullcalendar', { static: true }) fullcalendar!: FullCalendarComponent; // Nota: '!' indica que la variable no es nula
  public ChartOptionsReservas!: ChartOptionsReservas;
  reservaPendiente = 0;
  reservaAceptada = 0;
  reservaRechazada = 0;


  currentDateTime: string ="";
  
  eventos = [
    {
      title: 'Evento 1',
      start: '2023-11-22',
    },
    // ... otros eventos
  ];
  eventos2: any[] = [

  ];
  calendarOptions: any = {};
  itemsR: reserva[] = [];
  totalReserver=0;
  

  constructor(private datePipe: DatePipe,
    private userService: UserService,
    private zoneCommonService: ZoneCommonService,
    private reserverService: ReserveService,
    

  ) {
    this.getCurrentDateTime();
   

  }

  
  ngOnInit() {
    this.consultReserver();
   
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin], // Agrega interactionPlugin si necesitas funciones de interacción
      defaultView: 'dayGridMonth',
      initialEvents: this.eventos2

    };
    console.log('Entrando al ngOnInit...');
    let paginaRecargada = sessionStorage.getItem('paginaRecargada');
  
    if (paginaRecargada === null) {
      console.log('Primera carga, configurando paginaRecargada a false...');
      paginaRecargada = 'false';
      sessionStorage.setItem('paginaRecargada', paginaRecargada);
    }
  
    if (paginaRecargada === 'false') {
      console.log('Recargando la página...');
      sessionStorage.setItem('paginaRecargada', 'true');
      window.location.reload();
    }
  }
  
 
  getCurrentDateTime() {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');

    // Verifica si el resultado de transform es null antes de asignar
    this.currentDateTime = formattedDate || '';

  }
  consultReserver() {
    this.reserverService.get().subscribe(result => {
      this.itemsR = result;
      this.fillEvents();



      console.log(this.itemsR)
      this.totalReserver = this.itemsR.length;
      this.reservaPendiente = this.itemsR.filter(item => item.estado === 1).length;
      console.log(this.reservaPendiente + 'Reserva Pendiente')
      this.reservaAceptada = this.itemsR.filter(item => item.estado === 2).length;
      console.log(this.reservaAceptada + 'ReserAceptada')
      this.reservaRechazada = this.itemsR.filter(item => item.estado === 3).length;
      console.log(this.reservaRechazada + 'ReservaRechazada')
      this.graficaSolicitudes(this.reservaPendiente, this.reservaAceptada, this.reservaRechazada);

      

    });

  }
 
  fillEvents() {
    // Recorres el listado de reservas y asignas los valores correspondientes al array de eventos
    this.itemsR.forEach((itemsreserva: reserva) => {

      const evento = {
        title: itemsreserva.descripcion, // Asignas la descripción como título
        start: itemsreserva.fechaReserver,
      };
      console.log('Evento antes de agregar:', evento);
      this.eventos2.push(evento);

    });
    console.log("Los eventos son :", this.eventos2)
    this.inicializarCalendario();
    this.actualizarCalendario();
  }
  inicializarCalendario() {
    // Configuración del calendario
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      events: this.eventos2
    };
  }
  actualizarCalendario() {

    console.log("llenando los  eventos son :", this.eventos2)
    console.log(" los  eventos son :", this.eventos)
    if (this.fullcalendar) {
      this.fullcalendar.getApi().addEventSource(this.eventos2);
    }
  }

  graficaSolicitudes(pendiente: number, aceptada: number, rechazada: number) {

    this.ChartOptionsReservas = {
      series: [pendiente, aceptada, rechazada],
      chart: {
        width: 500,
        type: "donut",
      }, 
      
      labels: ["Pendiente", "Aceptada", "Rechazada"],
      dataLabels: {
        style: {
          colors: ['#fff']
        }
      },
     

    
      colors: ['#68B984', '#ff6969', '#FF0066'],
      fill: {
        colors: ['#68B984', '#ff6969', '#FF0066'], // Colores personalizados
      },

      responsive: [
        {
          breakpoint: 280,
          options: {
            chart: {
              width: 20
            }
          }
        }
      ],
      legend: {
        position: "bottom",
        offsetX: 0,
        offsetY: 0,
        horizontalAlign: 'center', 
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
      }

  };

  }
}
