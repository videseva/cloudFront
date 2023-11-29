import { DatePipe } from '@angular/common';
import { reserva } from 'src/app/models/reserva';
import { usuario } from 'src/app/models/usuario';
import { zonaComun } from 'src/app/models/zonacomun';
import { ReserveService } from 'src/app/services/reserve.service';
import { UserService } from 'src/app/services/user.service';
import { ZoneCommonService } from 'src/app/services/zone-common.service';
import { Component, ViewChild } from "@angular/core";
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';

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
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  colors: string[];
  xaxis: ApexXAxis;
  fill: ApexFill;
  stroke: ApexStroke;
};

export type ChartOptionsReservas = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors:any;
  fill: ApexFill
  legend: any;
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('fullcalendar', { static: true }) fullcalendar!: FullCalendarComponent; // Nota: '!' indica que la variable no es nula

  @ViewChild("chart")
  chart!: ChartComponent;
  public chartOptions!: ChartOptions;
  public ChartOptionsReservas!: ChartOptionsReservas;
  currentDateTime: string = "";
  items: usuario[] = [];
  totalUser: number = 0;
  totalZone = 0;
  itemsZ: zonaComun[] = [];
  totalReserver = 0;
  itemsR: reserva[] = [];
  countUserActivef = 0;
  countUserActiveM = 0;
  countUserinacActivef = 0;
  countUserInacActiveM = 0;
  reservaPendiente = 0;
  reservaAceptada = 0;
  reservaRechazada = 0;


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






  constructor(private datePipe: DatePipe,
    private userService: UserService,
    private zoneCommonService: ZoneCommonService,
    private reserverService: ReserveService

  ) {
    this.getCurrentDateTime();
    this.consultUser();
  }

  ngOnInit() {
    this.consultUser();
    this.consultZone();
    this.consultReserver();

    this.graficaUserTipo(0, 0, 0, 0);
    this.graficaSolicitudes(0, 0, 0);
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

  consultUser() {
    this.userService.get().subscribe(result => {
      this.items = [];
      this.items = result;
      this.totalUser = this.items.length;
      console.log("consultandolos")
      console.log(this.items)
      // para ver los usuario femeninos que estan activos 
      this.countUserActivef = this.items.filter(item => item.estado === 1 && item.genero === '2').length;
      console.log(this.countUserActivef)
      //inactivos femeninos

      this.countUserinacActivef = this.items.filter(item => item.estado === 2 && item.genero === '2').length;
      console.log(this.countUserinacActivef)


      // activos masculinos 

      this.countUserActiveM = this.items.filter(item => item.estado === 1 && item.genero === '1').length;
      console.log(this.countUserActiveM + 'MASCULINOS')

      this.countUserInacActiveM = this.items.filter(item => item.estado === 2 && item.genero === '1').length;
      console.log(this.countUserInacActiveM + 'MASCULINOS')

      //this.countUserActive = this.items.filter(item => item.estado === 2).length;
      this.graficaUserTipo(this.countUserActivef, this.countUserActiveM, this.countUserinacActivef, this.countUserInacActiveM);

    });
  }
  consultZone() {
    this.zoneCommonService.get().subscribe(result => {
      this.itemsZ = result;
      this.totalZone = this.itemsZ.length;
    });
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

  graficaUserTipo(acivoF: number, activoM: number, Inactivof: number, InacctivoM: number) {
    this.chartOptions = {
      series: [
        {
          name: "Hombres",
          data: [activoM, InacctivoM]
        },
        {
          name: "Mujeres",
          data: [acivoF, Inactivof]
        },

      ],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",

        },


      },
      colors: [

        "#26a69a",
        "#D10CE8"
      ],
      dataLabels: {
        enabled: false,
    
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          ["Usuarios", " Activos"],
          ["Usuarios", " Inactivos"]

        ]
      },

      fill: {
        opacity: 1,
        colors: [ '#ff6969','#68B984'], 
      },

    };
  }

  graficaSolicitudes(pendiente: number, aceptada: number, rechazada: number) {

    this.ChartOptionsReservas = {
      series: [pendiente, aceptada, rechazada],
      chart: {
        width: 450,
        type: "donut",
      }, 
      
      labels: ["Pendiente", "Aceptada", "Rechazada"],
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
      },
    };

  }

  getCurrentDateTime() {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');

    // Verifica si el resultado de transform es null antes de asignar
    this.currentDateTime = formattedDate || '';

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
}