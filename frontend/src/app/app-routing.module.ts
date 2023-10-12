import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// users
import { AddUserComponent } from './add-user/add-user.component';
import { GetUserComponent } from './get-user/get-user.component';

const routes: Routes = [
  // users view
  {
    path: "admin",
    children: [
      
      { path: "getusers", component: GetUserComponent },
      { path: "adduser", component: AddUserComponent }
      
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
