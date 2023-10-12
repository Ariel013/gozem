import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UsersService } from '../services/users.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit{

  displayedColumns: string[] = ['name', 'email', 'phone', 'role', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _usersService: UsersService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._usersService.getUsers().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.users)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
        console.log(res.users)
      },
      error: console.log
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUsers(id: string) {
    this._usersService.deleteUsers(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('User deleted sucessfully!', 'done')
        this.getUsers();
      },
      error: console.log,
    })
  }

  openEditUserForm(data: any) {
    const dialogRef = this._dialog.open(AddUserComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers();
        }
      }
    })

  }

}
