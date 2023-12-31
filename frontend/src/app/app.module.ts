import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddUserComponent } from './add-user/add-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GetUserComponent } from './get-user/get-user.component';
import { GetPackageComponent } from './get-package/get-package.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { RegisterComponent } from './register/register.component';
import { GetDeliveryComponent } from './get-delivery/get-delivery.component';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { LivreurComponent } from './livreur/livreur.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import {MatListModule} from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapsComponent } from './maps/maps.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {FormsModule} from '@angular/forms';
import { NgFor } from '@angular/common';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    GetUserComponent,
    GetPackageComponent,
    AddPackageComponent,
    RegisterComponent,
    GetDeliveryComponent,
    AddDeliveryComponent,
    LoginComponent,
    IndexComponent,
    LivreurComponent,
    SideBarComponent,
    DashboardComponent,
    MapsComponent,
    NotfoundComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    AppRoutingModule,
    FormsModule,
    NgFor,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
