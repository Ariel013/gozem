import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPackageComponent } from '../add-package/add-package.component';
import { PackagesService } from '../services/packages.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-get-package',
  templateUrl: './get-package.component.html',
  styleUrls: ['./get-package.component.css']
})
export class GetPackageComponent implements OnInit{
  displayedColumns: string[] = ['description', 'weight', 'width', 'from_name', 'to_name', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _packagesService: PackagesService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getPackages();
  }

  openAddPackageForm() {
    const dialogRef = this._dialog.open(AddPackageComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPackages();
        }
      }
    })
  }

  getPackages() {
    this._packagesService.getPackages().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
        console.log(res)
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

  deletePackages(id: string) {
    this._packagesService.deletePackages(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Package deleted sucessfully!', 'done')
        this.getPackages();
      },
      error: console.log,
    })
  }

  openEditPackageForm(data: any) {
    const dialogRef = this._dialog.open(AddPackageComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPackages();
        }
      }
    })

  }
}
