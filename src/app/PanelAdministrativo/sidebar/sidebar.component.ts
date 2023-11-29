import { Component } from '@angular/core';
import { reserva } from 'src/app/models/reserva';
import { AuthService } from 'src/app/services/auth.service';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  reservaPendiente = 0;
  itemsR: reserva[] = [];
  claseReservaPendiente: string = ''; 


  constructor(public authService: AuthService,  private reserverService: ReserveService) {
    this.authService.obtenerLocalStorage();

    if (this.authService.isAdmin()) {
      console.log('El usuario es un administrador.');
    } else if (this.authService.isSuperAdmin()) {
      console.log('El usuario es un superadministrador.');
    } else if (this.authService.isResidente()) {
      console.log('El usuario es un residente.');
    }
  
  }
  ngOnInit() {
    this. consultReserver();
    this.highlightNavigationItem();

  }

  ngAfterViewInit() {
    const list = document.querySelectorAll('.navegation li') as NodeListOf<HTMLElement>;

    const toggleClass = (element: HTMLElement) => {
      list.forEach((item) =>
        item.classList.remove('hovered'));
      element.classList.add('hovered');
    }

    list.forEach((item) => {

      item.addEventListener('click', () => toggleClass(item));
    });
  }


  highlightNavigationItem() {
    const toggle = document.querySelector('.toggle') as HTMLElement;
    const navegation = document.querySelector('.navegation') as HTMLElement;
    const main = document.querySelector('.main') as HTMLElement;
    toggle.onclick = () => {
      navegation.classList.toggle('active');
      main.classList.toggle('active');
      toggle.classList.toggle('active');
    }
  }

  consultReserver() {
    this.reserverService.get().subscribe(result => {
      this.itemsR = result;
      console.log(this.itemsR)
      
      this.reservaPendiente = this.itemsR.filter(item => item.estado === 1).length;
      console.log(this.reservaPendiente + 'Reserva Pendiente')
    this.claseReservaPendiente = this.reservaPendiente === 0 ? 'text-bg-secondary0' : '';
      
    });

  }
 




}