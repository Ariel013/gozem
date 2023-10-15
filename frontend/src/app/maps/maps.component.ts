import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService } from '../services/delivery.service';
import { PackagesService } from '../services/packages.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, AfterViewInit {
  entityId: any;
  deliveryDetails: any;
  packageDetails: any;

  private map: google.maps.Map | undefined;
  private marker: google.maps.Marker | undefined;

  constructor(private route: ActivatedRoute,
    private _deliveryService: DeliveryService,
    private _packagesService: PackagesService) { }

  ngOnInit(): void {
    // Récupération l'ID de la livraison depuis les paramètres de l'URL
    this.route.params.subscribe(async (params) => {
      this.entityId = params['id'];

      // Appel du service pour effectuer la recherche du delivery avec son ID
      try {

        // CHerchons si l'ID correspond à un active_delivery_id
        const packageResponse: any = await this._packagesService.getPackageById(this.entityId).toPromise
        this.packageDetails = packageResponse;

        if(this.packageDetails) {
          if (this.packageDetails.active_delivery_id) {
            // Si un delivery actif est associé au package
            const deliveryResponse: any = await this._deliveryService.getDeliveryById(this.packageDetails.active_delivery_id).toPromise();
            if (deliveryResponse && deliveryResponse.location) {
              const lat = deliveryResponse.location.lat;
              const lng = deliveryResponse.location.lng;
              this.initializeMap(lat, lng);
            }
          }
        } else if (this.packageDetails.from_location){
          // SI on ne trouve pas de delivery actif on prend la localisation su package
          const lat = this.packageDetails.from_location.lat;
          const lng = this.packageDetails.from_location.lng
          this.initializeMap(lat, lng);
        } else {
          console.error('Coordonnées de localisation manquantes dans les détails de la livraison.');
        }
      } catch (error) {
        console.error('Erreur lors de la recherche de la livraison :', error);
      }

    });
  }

  ngAfterViewInit() {
    const loader = new Loader({
      apiKey: 'AIzaSyABllXWc735BWqURbAcpxsPqaBl4HGPYGg'
    });

    loader.load().then(() => {
      console.log('Carte chargée');
      // this.initializeMap();
    });
  }

  initializeMap(lat: number, lng: number) {
    const mapOptions: google.maps.MapOptions = {
      center: { lat, lng },
      zoom: 12,
    };

    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, mapOptions)

      // Marker
      const markerOptions: google.maps.MarkerOptions = {
        position: { lat, lng },
        map: this.map,
        title: 'Position de votre colis'
      };

      this.marker = new google.maps.Marker(markerOptions);

    } else {
      console.error('Élément "map" introuvable.');

    }
  }
}
