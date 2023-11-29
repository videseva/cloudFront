import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageWebComponent } from './Pageweb/page-web/page-web.component';
import { LoginComponent } from './Pageweb/login/login.component';
import { RegisterUserComponent } from './Pageweb/register-user/register-user.component';
import { HomeComponent } from './PanelAdministrativo/home/home.component';
import { ReserveComponent } from './PanelAdministrativo/reserve/reserve.component';
import { ZoneResidentComponent } from './PanelAdministrativo/zone-resident/zone-resident.component';
import { ReserverAdminComponent } from './PanelAdministrativo/reserver-admin/reserver-admin.component';
import { UsersAdminComponent } from './PanelAdministrativo/users-admin/users-admin.component';
import { ZoneAdminComponent } from './PanelAdministrativo/zone-admin/zone-admin.component';
import { CategoryAdminComponent } from './PanelAdministrativo/category-admin/category-admin.component';
import { AccountComponent } from './PanelAdministrativo/account/account.component';
import { ProfileComponent } from './PanelAdministrativo/profile/profile.component';
import { AccountSadminComponent } from './PanelAdministrativo/account-sadmin/account-sadmin.component';
import { ProfileSuperAdminComponent } from './PanelAdministrativo/profile-super-admin/profile-super-admin.component';
import { HomeSadminComponent } from './PanelAdministrativo/home-sadmin/home-sadmin.component';
import { HomeResidenteComponent } from './PanelAdministrativo/home-residente/home-residente.component';
import { AyudaAdminComponent } from './PanelAdministrativo/ayuda-admin/ayuda-admin.component';
import { AyudaResidentComponent } from './PanelAdministrativo/ayuda-resident/ayuda-resident.component';

const routes: Routes = [
  { path: '', component: PageWebComponent },
  // PagesWeb
  { path: 'pageWeb/pagewebHome', component: PageWebComponent },
  { path: 'pageWeb/login', component: LoginComponent },
  { path: 'pageWeb/registrarUser', component: RegisterUserComponent },
  //PanelAdministrativo
  { path: 'home', component: HomeComponent },
  { path: 'reserve', component: ReserveComponent},
  { path: 'zoneResident', component: ZoneResidentComponent},
  { path: 'reserverAdmin', component: ReserverAdminComponent},
  { path: 'usersAdmin', component:UsersAdminComponent},
  { path: 'zoneAdmin', component:ZoneAdminComponent},
  { path: 'category-admin', component: CategoryAdminComponent},
  { path: 'account', component:AccountComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'accountSadmin', component: AccountSadminComponent},
  { path: 'profileSadmin', component: ProfileSuperAdminComponent},
  { path: 'homeSadmin', component: HomeSadminComponent},
  { path: 'homeResidente', component: HomeResidenteComponent},
  { path: 'helpAdmin', component: AyudaAdminComponent},
  { path: 'helpResident', component: AyudaResidentComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
