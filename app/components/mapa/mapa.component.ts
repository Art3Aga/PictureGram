import { Component, OnInit, Input, ViewChild } from '@angular/core';
declare var mapboxgl:any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @Input() coordenadas: string
  @ViewChild('mapa') mapa;
  //Enviarle a la propiedad container el elemento HTML en el cual renderizar el mapa, por
  //eso usar una referencia local al mapa del HTML #mapa
  constructor() { }

  ngOnInit() {
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
