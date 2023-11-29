import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'front';
  showSideBar: boolean = false;
  constructor(private location: Location, private el: ElementRef) {
    let currentUrl = this.location.path();
    console.log('currentUrl', currentUrl);
    this.showSideBar = currentUrl == '' ? false : !currentUrl.includes('pageWeb');
  }

  ngOnInit() {
    this.hideSideBar();
  }

  hideSideBar(): boolean{
    if(this.showSideBar){
      return false;
    }
    const element = this.el.nativeElement.querySelector('main');
    element.style['margin-top'] = 'unset';
    element.style['margin-left'] = 'unset';
    element.style['width'] = 'auto';
    element.style['padding'] = '0';
    const elementoHijo = element.querySelector('div');
    //elementoHijo.style['padding'] = '0';
    return true;
  }

  highlightNavigationItem() {
    const toggle = document.querySelector('.col-md-4') as HTMLElement;
    const navegation = document.querySelector('.col-md-4') as HTMLElement;
    const main = document.querySelector('.col-md-8') as HTMLElement;
    toggle.onclick = () => {
      navegation.classList.toggle('active');
      main.classList.toggle('active');
    }
  }
}