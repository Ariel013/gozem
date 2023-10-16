import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPackageComponent } from '../add-package/add-package.component';
import { PackagesService } from '../services/packages.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { DeliveryService } from '../services/delivery.service';

@Component({
  selector: 'app-get-package',
  templateUrl: './get-package.component.html',
  styleUrls: ['./get-package.component.css']
})
export class GetPackageComponent implements OnInit {
  displayedColumns: string[] = ['description', 'weight', 'width', 'from_name', 'to_name', 'action', 'add'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _packagesService: PackagesService,
    private _coreService: CoreService,
    private _deliveryService: DeliveryService
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
        // console.log(res)
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

  onAddDeliveryClick(packageId: string) {
    console.log('Je suis là', packageId)

    // Création d'un objet pour la nouvelle livraison
    const newDelivery = {
      packageId: packageId,
    };

    // Appel du service d'ajout de livraison
    this._deliveryService.addDelivery(newDelivery).subscribe({
      next: (res: any) => {
        console.log('Reponse from server', res)

        const active_delivery_id = res.delivery_id

        // Mise à jour de la valeur du active_delivery_id
        this.updatePackageActiveDelivery(packageId, active_delivery_id)


        this._coreService.openSnackBar('Delivery added successfully!', 'done');
      },
      error: (err: any) => {
        console.error(err);
        if (err.error && err.error.message) {
          // Affichage du message d'erreur renvoyé par le serveur
          alert(err.error.message);
        } else {
          // Gestion d'erreur générique
          alert('Une erreur s\'est produite lors de l\'ajout de la livraison.');
        }
      }
    });

    console.log('Bouton "Add Delivery" cliqué pour le package avec l\'ID:', packageId);
  }

  updatePackageActiveDelivery(packageId: string, deliveryId: string) {
    this._packagesService.updatePackage(packageId, deliveryId).subscribe({
      next: (result: any) => {
        console.log('Le Champ active_delivery_id a été mis à jour avec succès')
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }
}
