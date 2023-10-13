import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryService } from '../services/delivery.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { AddDeliveryComponent } from '../add-delivery/add-delivery.component';

@Component({
  selector: 'app-get-delivery',
  templateUrl: './get-delivery.component.html',
  styleUrls: ['./get-delivery.component.css']
})
export class GetDeliveryComponent implements OnInit{

  displayedColumns: string[] = ['pickup_time', 'start_time', 'end_time', 'status', 'location.lat', 'location.long', 'action',];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _deliveryService: DeliveryService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getDelivery();
  }
  openAddDeliveryForm() {
    const dialogRef = this._dialog.open(AddDeliveryComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDelivery();
        }
      }
    })
  }

  getDelivery() {
    this._deliveryService.getDelivery().subscribe({
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

  deleteDelivery(id: string) {
    this._deliveryService.deleteDelivery(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Delivery deleted sucessfully!', 'done')
        this.getDelivery();
      },
      error: console.log,
    })
  }

  openEditDeliveryForm(data: any) {
    const dialogRef = this._dialog.open(AddDeliveryComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDelivery();
        }
      }
    })

  }

}