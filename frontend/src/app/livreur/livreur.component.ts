import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeliveryService } from '../services/delivery.service';
import { PackagesService } from '../services/packages.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  deliveryDetails: any; // Variable pour stocker les détails du delivery
  socket: any

  constructor(private fb: FormBuilder,
    private _deliveryService: DeliveryService,
    private _packagesService: PackagesService) {
    this.searchForm = this.fb.group({
      id: ['']
    });
    this.socket = io('http://localhost:5000', {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });

  }

  ngOnInit() {
    // Écoute des mises à jour de localisation du serveur
    this.socket.on('location_changed', (data: any) => {
      // Mettez à jour l'affichage avec la nouvelle localisation reçue du serveur
      // data contient les données de localisation envoyées par le serveur
    })

    // Démarrer la mise à jour de la localisation si le statut est adéquat
    this.startLocationUpdateInterval();
  }

  ngOnDestroy() {
    // Assurez-vous de fermer la connexion websocket lorsque le composant est détruit
    this.socket.disconnect();
  }

  // Fonction pour envoyer la mise à jour de localisation au serveur via WebSocket
  sendLocationUpdate(location: any) {
    // Envoyez la mise à jour de localisation via WebSocket
    this.socket.emit('update_location', location);
  }

  // Appel de la fonction toutes les 20 secondes
  locationUpdateInterval: any;

  startLocationUpdateInterval() {
    this.locationUpdateInterval = setInterval(() => this.updateLocationPeriodically(), 20000);
  }

  async onSubmit() {
    const idControl = this.searchForm.get('id');

    if (idControl) {
      const deliveryId = idControl.value;

      try {
        // Appel du service pour effectuer la recherche du delivery avec son ID
        const response: any = await this._deliveryService.getDeliveryById(deliveryId).toPromise();
        this.deliveryDetails = response;

        if (this.deliveryDetails && this.deliveryDetails.package_id) {
          // Appel du service pour obtenir les informations du package
          const packageData: any = await this._packagesService.getPackageById(this.deliveryDetails.package_id).toPromise();

          // Assurez-vous que les données du package sont disponibles
          if (packageData) {
            // Ajoutez les informations du package aux détails de la livraison
            this.deliveryDetails.package = packageData;
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

              let newPick: Date | undefined;
              let newStart: Date | undefined;
              let newEnd: Date | undefined;

              if (newStatus === 'picked-up' && !this.deliveryDetails.pickup_time) {
                newPick = new Date();
              } else if (newStatus === 'in-transit' && !this.deliveryDetails.start_time) {
                newStart = new Date();
              } else if ((newStatus === 'delivered' || newStatus === 'failed') && !this.deliveryDetails.end_time) {
                newEnd = new Date();
              }

              // Création d'un JSON pour le statut
              const requestBody = { status: newStatus, location: { lat, lng }, pickup_time: newPick, start_time: newStart, end_time: newEnd }

              // Mise à jour du statut
              this._deliveryService.updateDelivery(this.deliveryDetails._id, requestBody).subscribe(
                (response: any) => {
                  console.log(`Statut mis à jour avec succès: ${newStatus}`)
                },
                (error: any) => {
                  console.error(`Erreur lors de la mise à jour du statut: ${error}`)
                }
              );

              // Envoyer la mise à jour de localisation via websocket
              this.socket.emit('update_location', { delivery_id: this.deliveryDetails._id, location: { lat, lng } });
              // Envoyez la mise à jour du statut via WebSocket
              this.socket.emit('update_status', { delivery_id: this.deliveryDetails._id, newStatus });

              // Broadcast
              this.socket.emit('delivery_updated', { event: 'delivery_updated', delivery_object: this.deliveryDetails });


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

  updateLocationPeriodically() {
    // Vérification du statut et récupération de la localisation
    if (this.deliveryDetails && (this.deliveryDetails.status === 'picked-up' || this.deliveryDetails.status === 'in-transit')) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Créez un objet de mise à jour de localisation
          const locationUpdate = { delivery_id: this.deliveryDetails._id, location: { lat, lng } };

          // Envoyez la mise à jour de localisation au serveur
          this.sendLocationUpdate(locationUpdate);
        });
      }
    }
  }


}
