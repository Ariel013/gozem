import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// users
import { AddUserComponent } from './add-user/add-user.component';
import { GetUserComponent } from './get-user/get-user.component';

// packages
import { GetPackageComponent } from './get-package/get-package.component';
import { AddPackageComponent } from './add-package/add-package.component';

const routes: Routes = [
  // users view
  { path: "users", component: GetUserComponent },
  { path: "adduser", component: AddUserComponent },

  { path: "packages", component: GetPackageComponent },
  { path: "packages/addpackage", component: AddPackageComponent },
  // packages view
  // {
  //   path: "packages",
  //   children: [
  //     { path: "getpackages", component: GetPackageComponent },
  //     { path: "addpackage", component: AddPackageComponent }
  //   ],
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
