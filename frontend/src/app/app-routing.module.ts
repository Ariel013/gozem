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

// Index
import { IndexComponent } from './index/index.component';

//Livreur1
import { Livreur1Component } from './livreur1/livreur1.component';

//Livreur
import { LivreurComponent } from './livreur/livreur.component';

// Sidebar
import { SideBarComponent } from './side-bar/side-bar.component';

// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';

// Maps
import { MapsComponent } from './maps/maps.component';

//AuthGuard
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/adminguard.guard';
import { NotfoundComponent } from './notfound/notfound.component';

// Routes
const routes: Routes = [
  // 404 view
  {
    path: "error", component: NotfoundComponent
  },

  // users view
  {
    path: "users", component: GetUserComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "adduser", component: AddUserComponent,
    canActivate: [AdminGuard]
  },

  // packages view
  {
    path: "packages", component: GetPackageComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "packages/addpackage", component: AddPackageComponent,
    canActivate: [AdminGuard]
  },

  // delivery view
  {
    path: "delivery", component: GetDeliveryComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "delivery/adddelivery", component: AddDeliveryComponent,
    canActivate: [AdminGuard]
  },

  // register
  { path: "register", component: RegisterComponent },

  // login
  { path: "login", component: LoginComponent },

  // index
  {
    path: "index", component: IndexComponent,
    canActivate: [AuthGuard]
  },

  // livreur1
  {
    path: "livreur1", component: Livreur1Component,
    canActivate: [AuthGuard]
  },

  // livreur
  {
    path: "livreur", component: LivreurComponent,
    canActivate: [AuthGuard]
  },

  // sideBar
  {
    path: "sidebar", component: SideBarComponent,
    canActivate: [AdminGuard]
  },

  // Maps
  {
    path: "maps/:id", component: MapsComponent,
    canActivate: [AuthGuard]
  },

  // dashboard
  {
    path: "users", component: GetUserComponent,
    canActivate: [AdminGuard]

  },
  {
    path: "packages", component: GetPackageComponent,
    canActivate: [AdminGuard]

  },
  {
    path: "delivery", component: GetDeliveryComponent,
    canActivate: [AdminGuard]

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
