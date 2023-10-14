import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeliveryService } from '../services/delivery.service';
import { PackagesService } from '../services/packages.service';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent {
  searchForm: FormGroup;
  deliveryDetails: any; // Variable pour stocker les détails du delivery

  constructor(private fb: FormBuilder,
    private _deliveryService: DeliveryService,
    private _packagesService: PackagesService) {
    this.searchForm = this.fb.group({
      id: ['']
    })
  }
  onSubmit() {
    const idControl = this.searchForm.get('id');

    if (idControl) {
      console.log(idControl)

      const deliveryId = idControl.value;

      // Appel du service pour effectuer la recherche du delivery avec son ID
      this._deliveryService.getDeliveryById(deliveryId).subscribe({
        next: (response: any) => {
          this.deliveryDetails = response;
          // console.log(this.deliveryDetails)

          this._deliveryService.getPackageById(this.deliveryDetails.package_id)

        },
        error: (err: any) => {
          console.error(err)
        }
      })
    } else {
      alert('Une erreur s\'est produite lors de la recherche de la livraison.');

    }
  }

  updateStatus(newStatus: string) {
    // Récupération de la position du livreur
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // console.log("Latitude : " + lat);
          // console.log("Longitude : " + lng);

          if (this.deliveryDetails && this.deliveryDetails.status) {
            // Vérification de la validité du statut
            if (['picked-up', 'in-transit', 'delivered', 'failed'].includes(newStatus)) {
              this.deliveryDetails.status = newStatus;
              console.log(newStatus);

              // Création d'un JSON pour le statut
              const requestBody = { status: newStatus, location: { lat, lng } }

              // Mise à jour du statut
              this._deliveryService.updateDelivery(this.deliveryDetails._id, requestBody).subscribe(
                (response: any) => {
                  console.log(`Statut mis à jour avec succès: ${newStatus}`)
                },
                (error: any) => {
                  console.error(`Erreur lors de la mise à jour du statut: ${error}`)
                }
              );
            } else {
              console.log('Nouveau statut invalide')
            }
          } else {
            console.log('Détails de la livraison ou statut manquant')
          }
        } catch (error) {
          console.error("Erreur lors de la récupération de la position : ");
        }
      });
    } else {
      console.log("La géolocalisation n'est pas disponible dans ce navigateur.");
    }
  }


}
