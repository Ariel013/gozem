import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Users
import { AddUserComponent } from './add-user/add-user.component';
import { GetUserComponent } from './get-user/get-user.component';

// Packages
import { GetPackageComponent } from './get-package/get-package.component';
import { AddPackageComponent } from './add-package/add-package.component';

// Register
import { RegisterComponent } from './register/register.component';

// Delivery
import { GetDeliveryComponent } from './get-delivery/get-delivery.component';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';

//Login
import { LoginComponent } from './login/login.component';

// index
import { IndexComponent } from './index/index.component';
import { LivreurComponent } from './livreur/livreur.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapsComponent } from './maps/maps.component';

const routes: Routes = [
  // users view
  { path: "users", component: GetUserComponent },
  { path: "adduser", component: AddUserComponent },
  
  // packages view
  { path: "packages", component: GetPackageComponent },
  { path: "packages/addpackage", component: AddPackageComponent },

  // delivery view
  { path: "delivery", component: GetDeliveryComponent },
  { path: "delivery/adddelivery", component: AddDeliveryComponent },
  
  // register
  { path: "register", component: RegisterComponent },

  // login
  { path: "login", component: LoginComponent },

  // index
  { path: "index", component: IndexComponent },

  // livreur
  { path: "livreur", component: LivreurComponent },

  // sideBar
  { path: "sidebar", component: SideBarComponent },

  // Maps
  { path: "maps", component: MapsComponent },

  // dashboard
  { path: "dashboard", component: DashboardComponent,
children: [
  {
    path: "users", component:GetUserComponent,
  },
  {
    path: "packages", component:GetPackageComponent,
  },
  {
    path: "delivery", component:GetDeliveryComponent,
  }
] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
