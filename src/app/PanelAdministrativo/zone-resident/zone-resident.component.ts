import { Component } from '@angular/core';
import { zonaComun } from 'src/app/models/zonacomun';
import { CategoryService } from 'src/app/services/category.service';
import { ZoneCommonService } from 'src/app/services/zone-common.service';

@Component({
  selector: 'app-zone-resident',
  templateUrl: './zone-resident.component.html',
  styleUrls: ['./zone-resident.component.css']
})
export class ZoneResidentComponent {
  nuevoZona = new zonaComun();
  verZone= new zonaComun();
  items: zonaComun[] = [];
  totalZone = 0;
  filtroBusqueda: string = '';
  constructor( private zoneCommonService: ZoneCommonService, private categoryService: CategoryService) { }

  ngOnInit() {
    //3° Paso inicializar el formulario

    this.consultZone();}
    consultZone() {
      this.zoneCommonService.get().subscribe(result => {
        this.items = result;
        this.totalZone = this.items.length;
      });
    }
    seeZone(item:any){
      this.verZone = item;
      console.log(this.verZone);
    }
    filtrarItems() {
      return this.items.filter(item =>
        item.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        item.id.toString().includes(this.filtroBusqueda.toLowerCase())
      );
    }
}
