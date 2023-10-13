import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// users
import { AddUserComponent } from './add-user/add-user.component';
import { GetUserComponent } from './get-user/get-user.component';

// packages
import { GetPackageComponent } from './get-package/get-package.component';
import { AddPackageComponent } from './add-package/add-package.component';

// register
import { RegisterComponent } from './register/register.component';

// delivery
import { GetDeliveryComponent } from './get-delivery/get-delivery.component';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
