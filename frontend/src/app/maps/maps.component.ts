import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, AfterViewInit {

  private map: google.maps.Map | undefined;
  private marker: google.maps.Marker | undefined;

  constructor() { }

  ngOnInit(): void {
    // Le chargement de la carte se fait dans ngAfterViewInit
  }

  ngAfterViewInit() {
    const loader = new Loader({
      apiKey: 'AIzaSyABllXWc735BWqURbAcpxsPqaBl4HGPYGg'
    });

    loader.load().then(() => {
      console.log('Carte chargée');
      this.initializeMap();
    });
  }

  initializeMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 6.3660892, lng: 2.4290249 },
      zoom: 6,
    };

    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, mapOptions)

      // Marker
      const markerOptions: google.maps.MarkerOptions = {
        position: { lat: 6.3660892, lng: 2.4290249 },
        map: this.map,
        title: 'Position de votre colis'
      };

      this.marker = new google.maps.Marker(markerOptions);

    } else {
      console.error('Élément "map" introuvable dans le DOM.');

    }
  }
}
