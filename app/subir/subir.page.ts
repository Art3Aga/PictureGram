import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController, NavController } from '@ionic/angular';
import { PostService } from '../services/posts/post.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
declare var window:any;

@Component({
  selector: 'app-subir',
  templateUrl: './subir.page.html',
  styleUrls: ['./subir.page.scss'],
})
export class SubirPage implements OnInit {
  titulo:string = ""
  imagenes:string[] =[]
  img:any = null
  activarPosicion:boolean = false
  cargando:boolean = false
  coordenadas:any = null
  valorStorage:any
  valorStorageToken:any
  constructor(private camera: Camera, private geoloc: Geolocation,
    public toastController: ToastController, private _postService:PostService,
    private storage:Storage, public route:Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.getStorageId()
    this.getStorageToken()
  }

  mostrar_camara(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG || this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {
     //let base64Image = 'data:image/jpeg;base64,' + imageData;
     const img = window.Ionic.WebView.convertFileSrc(imageData)
     let nombreImg:string = img.split('/')[11].split('?')[0]
     console.log(`Nombre de la Foto: ${nombreImg} `);
     this.img = nombreImg
     this._postService.saveImagen(imageData, nombreImg)
     //console.log(img);
     this.imagenes.push(img)
     this.img = nombreImg;
    }, (err) => {
      console.log(`Error en Camara: ${err}`);
      
    });
  }
  mostrar_galeria(){
    const options: CameraOptions = {
      quality: 100,
      //destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG || this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then((imageData) => {
     //let base64Image = 'data:image/jpeg;base64,' + imageData;
     const img:string = window.Ionic.WebView.convertFileSrc(imageData)
     //console.log("Imagen en galeria seleccionada: " +img);
     console.log(`Path de la Img: ${imageData}`);
     let nombreImg:string = img.split('/')[11].split('?')[0]
     console.log(`Nombre de la Imagen: ${nombreImg} `);
     this.img = nombreImg
     this._postService.saveImagen(imageData, nombreImg)
    
     /*console.log(`Substr IMG: ${img.substr(img.lastIndexOf('/') + 1)}`);
     console.log(`Substr IMG2!!: ${img.lastIndexOf('/') + 1}`);
     console.log(`Substr IMG3---: ${img.substr(img.lastIndexOf('/') + 1).substr(img.substr(img.lastIndexOf('/') + 1).lastIndexOf('/')+1)}`);*/
     this.imagenes.push(img)
     this.img = nombreImg
    }, (err) => {
      console.log(`Error al subir xdxd: ${err}`);
      
      this.showMsm(err, 5000, 'danger')
    });
  }
  getGeolocation(){
    if(this.activarPosicion == false){
      this.coordenadas = null
      return
    }
    this.cargando = true
    this.geoloc.getCurrentPosition().then((resp) => {
      this.cargando = false
      this.coordenadas = `${resp.coords.latitude}, ${resp.coords.longitude}`
      console.log(this.coordenadas);
      
     }).catch((error) => {
       console.log('Error al Obtener Posicion GPS', error);
       this.showMsm(`Error GPS ${error}`, 5000, 'danger')
       this.cargando = false
     });

     /*let watch = this.geoloc.watchPosition();
      watch.subscribe((data) => {
      });*/
    
  }
  crearPost(){
    let post = {
      titulo: this.titulo,
      coordenadas: this.coordenadas,
      id_usuario: this.valorStorage,
      likes: 0,
      token: this.valorStorageToken,
      img: this.img
    }
    this._postService.crearPost(post.id_usuario, post.titulo, post.coordenadas, post.likes, post.img)
    this.imagenes = []
    this.showMsm('¡Publicacion Realizada!\nRecargue la Aplicacion',2000, 'primary')
    this.navCtrl.navigateBack('/tabs/tab1')
    /*if(this.img != null || this.img != undefined){
      let post = {
        titulo: this.titulo,
        coordenadas: this.coordenadas,
        id_usuario: this.valorStorage,
        likes: 0,
        token: this.valorStorageToken,
        img: this.img
      }
      this._postService.crearPost3(post.id_usuario, post.titulo,post.coordenadas, post.likes)
      this.imagenes = []
      this.showMsm('¡Publicacion Realizada!.\nRecargue la Aplicacion',2000, 'primary')
      this.navCtrl.navigateBack('/tabs/tab1')
    }
    else if(this.coordenadas != null || this.coordenadas != undefined){
      let post = {
        titulo: this.titulo,
        coordenadas: this.coordenadas,
        id_usuario: this.valorStorage,
        likes: 0,
        token: this.valorStorageToken,
        img: this.img
      }
      this._postService.crearPost4(post.id_usuario, post.titulo, post.img, post.likes)
      this.imagenes = []
      this.showMsm('¡Publicacion Realizada!.\nRecargue la Aplicacion',2000, 'primary')
      this.navCtrl.navigateBack('/tabs/tab1')
    }
    else if(this.img !=null || this.img != undefined || this.coordenadas != null || this.coordenadas != undefined){
      let post = {
        titulo: this.titulo,
        coordenadas: this.coordenadas,
        id_usuario: this.valorStorage,
        likes: 0,
        token: this.valorStorageToken,
        img: this.img
      }
      this._postService.crearPost(post.id_usuario, post.titulo, post.coordenadas, post.likes, post.img)
      this.imagenes = []
      this.showMsm('¡Publicacion Realizada!\nRecargue la Aplicacion',2000, 'primary')
      this.navCtrl.navigateBack('/tabs/tab1')
    }*/
  }
  subirImagen(){
    //this._postService.saveImagen(this.img)
    //console.log(`Imagen a subir: ${this.img}`);
  }

  getStorageId(){
    this.storage.get('id_usuario').then(valor=>{
      this.valorStorage = valor
    })
  }
  getStorageToken(){
    this.storage.get('token').then(valor=>{
      this.valorStorageToken = valor
    })
  }

  async showMsm(message:string, duration:number, color:any) {
    const toast = await this.toastController.create({
      message,
      duration,
      color
    });
    toast.present();
  }

}