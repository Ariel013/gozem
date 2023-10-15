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

      let packageResponse: any;

      try {
        // Tentative de recherche sur le modèle package
        packageResponse = await this._packagesService.getPackageById(this.entityId).toPromise();
      } catch (error) {
        // Si une erreur se produit, nous supposons que c'est un ID de delivery et essayons le modèle de delivery
      }

      if (packageResponse) {
        this.packageDetails = packageResponse;
        if (this.packageDetails.active_delivery_id) {
          // Si un delivery actif est associé au package
          // console.log(this.packageDetails.active_delivery_id)

          const deliveryResponse: any = await this._deliveryService.getDeliveryById(this.packageDetails.active_delivery_id).toPromise();
          if (deliveryResponse && deliveryResponse.location) {
            const lat = deliveryResponse.location.lat;
            const lng = deliveryResponse.location.lng;
            this.initializeMap(lat, lng);
          } else {
            console.error('Coordonnées de localisation manquantes dans les détails de la livraison.');
          }
        } else if (this.packageDetails.from_location) {
          // SI on ne trouve pas de delivery actif on prend la localisation su package
          const lat = this.packageDetails.from_location.lat;
          const lng = this.packageDetails.from_location.lng
          this.initializeMap(lat, lng);
        } else {
          console.error('Coordonnées de localisation manquantes dans les détails de la livraison.')
        }

      } else {
        // Faire la recherche dans le model delivery
        const deliveryResponse: any = await this._deliveryService.getDeliveryById(this.entityId).toPromise();
        if (deliveryResponse && deliveryResponse.location) {
          const lat = deliveryResponse.location.lat;
          const lng = deliveryResponse.location.lng;
          this.initializeMap(lat, lng);
        } else {
          console.error('Coordonnées de localisation manquantes dans les détails de la livraison.');
        };
      }

    })
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
      if(mapElement) {
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
