import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-imagenmodal',
  templateUrl: './imagenmodal.page.html',
  styleUrls: ['./imagenmodal.page.scss'],
})
export class ImagenmodalPage implements OnInit {
  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;
  img:any
  slideOpts={
    zoom: {
      maxRatio: 3
    }
  };
  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.img = this.navParams.get('img')
  }

  zoom(zoomIn:boolean){
    let zoom = this.slider.nativeElement.swiper.zoom
    zoomIn ? zoom.in(): zoom.out()
    
  }

  cerrar(){
    this.modalCtrl.dismiss()
  }
  tap(e){
    console.log(e);
    
  }
}
