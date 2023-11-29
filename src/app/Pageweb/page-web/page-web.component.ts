import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-web',
  templateUrl: './page-web.component.html',
  styleUrls: ['./page-web.component.css']
})
export class PageWebComponent {
  title='envioCorreos';
  body:any;
  correo:string='';
  nombre:string='';
  miMensaje:string='';
  
  constructor(public authService: AuthService,private router: Router , private httpclien:HttpClient){
   

  }
  envioCorreo() {
   this.body={
    asunto: 'Bienvenido ' + this.nombre,
    correo2:this.correo,
    mensaje: 'Sr ' + this.miMensaje + ' queremos darle la bienvenida a Comininex',
   
   }
   console.log(this.body);
    
  
    this.httpclien.post('http://localhost:4000/api/envio', this.body).subscribe(resp => {
      console.log(resp);


    });
  }

  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
 


  ngOnInit() {
   

    console.log('Entrando al ngOnInit...');
    let paginaRecargada = sessionStorage.getItem('paginaRecargada');
  
    if (paginaRecargada === null) {
      console.log('Primera carga, configurando paginaRecargada a true...');
      paginaRecargada = 'true';
      sessionStorage.setItem('paginaRecargada', paginaRecargada);
    }
  
    if (paginaRecargada === 'true') {
      console.log('Recargando la página...');
      sessionStorage.setItem('paginaRecargada', 'false');
      window.location.reload();
    }
    this.logout();
  }

  // creando la clase para que el menu la despliegue 
  toggleDropdown() {
  const toggleBtn = document.querySelector('.toggle_btn') as HTMLElement;
  const dropdownMenu = document.querySelector('.dropdown_menu') as HTMLElement;
  const toggleBtnIcon = document.querySelector('.toggle_btn i') as HTMLElement;

  toggleBtn.onclick = () => {
    dropdownMenu.classList.toggle('open');
    const isOpen = dropdownMenu.classList.contains('open');
    toggleBtnIcon.classList.toggle('fa-xmark', isOpen);
    toggleBtnIcon.classList.toggle('fa-bars', !isOpen);
  };}
  logout(): void {

    
    
    
    this.authService.logout();

    
  }
 
}