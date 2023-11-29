import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './PanelAdministrativo/sidebar/sidebar.component';
import { HeaderComponent } from './PanelAdministrativo/header/header.component';
import { LoginComponent } from './Pageweb/login/login.component';
import { RegisterUserComponent } from './Pageweb/register-user/register-user.component';
import { PageWebComponent } from './Pageweb/page-web/page-web.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './PanelAdministrativo/home/home.component';
import { ZoneResidentComponent } from './PanelAdministrativo/zone-resident/zone-resident.component';
import { ReserveComponent } from './PanelAdministrativo/reserve/reserve.component';
import { ReserverAdminComponent } from './PanelAdministrativo/reserver-admin/reserver-admin.component';
import { UsersAdminComponent } from './PanelAdministrativo/users-admin/users-admin.component';
import { ZoneAdminComponent } from './PanelAdministrativo/zone-admin/zone-admin.component';
import { CategoryAdminComponent } from './PanelAdministrativo/category-admin/category-admin.component';
import { AccountComponent } from './PanelAdministrativo/account/account.component';
import { ProfileComponent } from './PanelAdministrativo/profile/profile.component';
import { AccountSadminComponent } from './PanelAdministrativo/account-sadmin/account-sadmin.component';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ProfileSuperAdminComponent } from './PanelAdministrativo/profile-super-admin/profile-super-admin.component';
import { HomeSadminComponent } from './PanelAdministrativo/home-sadmin/home-sadmin.component';
import { HomeResidenteComponent } from './PanelAdministrativo/home-residente/home-residente.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { AyudaAdminComponent } from './PanelAdministrativo/ayuda-admin/ayuda-admin.component';
import { AyudaResidentComponent } from './PanelAdministrativo/ayuda-resident/ayuda-resident.component'; // Importa el módulo FullCalendar
import { FullCalendarModule } from '@fullcalendar/angular'; // importa el módulo FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // importa el plugin de la vista de día


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    RegisterUserComponent,
    PageWebComponent,
    HomeComponent,
    ZoneResidentComponent,
    ReserveComponent,
    ReserverAdminComponent,
    UsersAdminComponent,
    ZoneAdminComponent,
    CategoryAdminComponent,
    AccountComponent,
    ProfileComponent,
    AccountSadminComponent,
    ProfileSuperAdminComponent,
    HomeSadminComponent,
    HomeResidenteComponent,
    AyudaAdminComponent,
    AyudaResidentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    FormsModule,
    ReactiveFormsModule,HttpClientModule,
    NgApexchartsModule,
    FullCalendarModule
  

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
