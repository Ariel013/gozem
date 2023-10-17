import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeliveryService } from '../services/delivery.service';
import { PackagesService } from '../services/packages.service';
import { environment } from 'src/environments/environment.prod';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  searchForm: FormGroup;
  packageDetails: any;
  private socket: any;
  private BACK_URL = environment.BACK_URL


  constructor(private fb: FormBuilder,
    private _deliveryService: DeliveryService,
    private _packagesService: PackagesService) {
    this.searchForm = this.fb.group({
      id: ['']
    });
    this.socket = io(`${this.BACK_URL}`, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });

  }

  async onSubmit() {
    const idControl = this.searchForm.get('id');
    if (idControl) {
      const packageId = idControl.value;

      try {
        // Appel du service pour effectuer la recherche du package avec son ID
        const response: any = await this._packagesService.getPackageById(packageId).toPromise();
        this.packageDetails = response;
        console.log(this.packageDetails)

        if (this.packageDetails && this.packageDetails.active_delivery_id) {
          // Appel du service pour obtenir les informations du delivery
          const deliveryData: any = await this._deliveryService.getDeliveryById(this.packageDetails.active_delivery_id).toPromise();

          // Assurez-vous que les données du package sont disponibles
          if (deliveryData) {
            // Ajoutez les informations du package aux détails de la livraison
            this.packageDetails.delivery = deliveryData;
          } else {
            console.error('Les informations du package sont indisponibles.');
          }
        } else {
          console.error('L\'ID du package est manquant dans les détails de la livraison.');
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la recherche de la livraison :', error);
      }
    } else {
      alert('Une erreur s\'est produite lors de la recherche de la livraison.');
    }
  }

}
