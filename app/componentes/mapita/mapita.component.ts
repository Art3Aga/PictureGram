import { Component, OnInit, Input, ViewChild } from '@angular/core';
declare var mapboxgl:any;
@Component({
  selector: 'app-mapita',
  templateUrl: './mapita.component.html',
  styleUrls: ['./mapita.component.scss'],
})
export class MapitaComponent implements OnInit {
  @Input() coordenadas: string
  @ViewChild('mapa') mapa;
  constructor() { }

  ngOnInit() {
    if(this.coordenadas != null || this.coordenadas != undefined){
      console.log(this.coordenadas);
      const latLng = this.coordenadas.split(',')
      const latitud = Number(latLng[0])
      const longitud = Number(latLng[1])
      mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ0ZWFnYSIsImEiOiJjang3ODBsaGQwN21wM3pvMTViamdrNGF0In0.ROL0c1H7DI7ldhZCHYHfHA';
      const map = new mapboxgl.Map({
        container: this.mapa.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitud, latitud],
        zoom: 16
      });

      const marcador = new mapboxgl.Marker()
            .setLngLat([longitud, latitud]).addTo(map)
    }
  }

}
