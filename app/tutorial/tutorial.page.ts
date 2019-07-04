import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuarios/usuario.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  slidesItems:any[] = [
    {
      title: "Bienvenido!!!",
      description: "Esta <b>aplicación</b> esta pensada para aquellas personas que gustan de publicar fotos o imagenes!",
      image: "../../assets/img/ica-slidebox-img-1.png",
      color: 'red;'
    },
    {
      title: "Interfaz Amigable",
      description: "<b>PictureGram</b> ofrece una interfaz de usuario bastante amigable e intuitiva a todas las personas que la usan.",
      image: "../../assets/img/ica-slidebox-img-2.png",
      color: 'green;'
    },
    {
      title: "¿Que hace esta app?",
      description: "Ademas de poder publicar una foto nuestra, tambien tendremos la posibilidad de agregar nuestra <b>Ubicacion GPS</b>.<br>Mostrando un mapa del lugar donde nos encontramos solo si activamos dicha opcion",
      image: "../../assets/img/ica-slidebox-img-3.png",
      color: 'blue;'
    }
  ];
  slideOpts={
    
  }
  constructor(private _userService:UsuarioService, private navCtrl:NavController) { }

  ngOnInit() {
  }
  saltar_tutorial(){
    this._userService.saveTutorial("no")
    this.navCtrl.navigateForward('/login')
  }

}
