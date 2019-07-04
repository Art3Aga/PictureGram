import { ComentariosPage } from './../comentarios/comentarios.page';
import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlide, IonSlides, NavController, 
  AlertController, LoadingController, ToastController, ModalController,IonInfiniteScroll } from '@ionic/angular';
import { UsuarioService } from '../services/usuarios/usuario.service';
import { Storage } from '@ionic/storage';
import { ImagenmodalPage } from '../imagenmodal/imagenmodal.page';
import { PostService } from '../services/posts/post.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  @ViewChild('slideLogin') slides:IonSlides
  //Emitir al componente padre el avatar seleccionado
  @Output() avatarSeleccionado = new EventEmitter<string>();
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];
  id_usuario:any
  tokenStorage:any
  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    effect: 'slide',
    spaceBetween: 8,
    slidesPerView: 3.5,
    freeMode: true,
    loop: false
  };
  existeLike:boolean = false
  loginUsuario = {
    email: 'alberymartinez@gmail.com',
    clave: '12345'
  }
  nombre:string
  clave:string
  email:string
  token:string = null
  avatar:any = 'av-1.png'
  constructor(private _userService: UsuarioService, private storage:Storage, 
            private navCtrl: NavController, private alertCtrl: AlertController,
            public loadingController: LoadingController,
            public toastController: ToastController,
            public _post: PostService, private modalCtrl: ModalController) {
    
  }
  ngOnInit(){
    //this.bloquear()
    //this._post.getMyPost(this.id_usuario).then()
    this.getMisPost()
  }
  siguiente_pagina(event?){
    //this._post.getMyPost(this.id_usuario).then(()=>{
      //event.target.complete()
    //})
    this.getMisPost().then(()=>{
      event.target.complete()
    })
  }
  recargar(event){
    if(event){
      this._post.pagina3 = 0
      this._post.mis_post = []
      //this._post.getMyPost(this.id_usuario).then(()=>{
        //event.target.complete()
      //})
      this.getMisPost().then(()=>{
        event.target.complete()
      })
    }
  }
  async getMisPost(){
    await this.storage.get('id_usuario').then(id=>{
      //this.id_usuario = id
      this._post.getMyPost(id).then()
    })
  }
  async getToken(){
    await this.storage.get('token').then(token=>{
      this.tokenStorage = token
    })
  }

  login(flogin:NgForm){
    if(flogin.invalid){
      return
    }
    this._userService.login(this.loginUsuario.email, this.loginUsuario.clave)
    /*.subscribe(data=>{
      console.log(data);
      if(data['ok']){
        this.showToast(`${data['nombre']}`,'Bienvenido', 'top', 2000, 'success')
        this.navCtrl.navigateRoot('/tabs/tab1', { animated: true })
        this.saveToken(data['token'])
      }
      else{
        console.log(`${data['mensaje']}`);
        this.alertMsm('Incorrecto', `${data['mensaje']}`)
      }
    })*/
    //this.navCtrl.navigateRoot('/tabs/tab1', { animated: true })
    //console.log(this.loginUsuario);
    
  }
  async registro(fRegistro:NgForm){
    if(fRegistro.invalid){
      return
    }
    const valido = await this._userService.registro(this.nombre, this.email, this.clave, this.avatar)
    if(valido){
      this.navCtrl.navigateBack('/tabs/tab1', {animated: true})
      this.avatars.forEach(item=>{
        item.seleccionado = false
      })
      this.nombre = ""
      this.email = ""
      this.clave = ""
      //this.mostrarLogin()
    }
    else{
      this.alertMsm('Error', 'Ese correo electronico ya existe')
    }
  }
  /*bloquear(){
    this.slides.lockSwipes(true)
  }
  mostrarRegistro(){
    this.slides.lockSwipes(false)
    this.slides.slideTo(1)
    this.slides.lockSwipes(true)
  }
  mostrarLogin(){
    this.slides.lockSwipes(false)
    this.slides.slideTo(0)
    this.slides.lockSwipes(true)
  }*/
  seleccionarAvatar(avatar){
    this.avatars.forEach(item=>{
      item.seleccionado = false
    })
    avatar.seleccionado = true
    console.log(avatar.img);    
    this.avatarSeleccionado.emit(avatar.img)
    this.avatar = avatar.img
  }

  async alertMsm(header:string, message:string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: 
      [
        {text: 'Cancelar', role: 'cancel'},
        {text: 'Aceptar', role: 'cancel'}
      ]
    });

    await alert.present();
  }

  async saveToken(token:string){
    this.token = token
    await this.storage.set('token', token)
  }

  async presentLoading(message:string, duration:number) {
    const loading = await this.loadingController.create({
      message,
      duration
    });
    await loading.present();
  }

  async showToast(header:string, message:string, position:any, duration:any ,color:string) {
    const toast = await this.toastController.create({
      header,
      message,
      position,
      color,
      duration,
      buttons: [
        {
          side: 'end',
          icon: 'done-all',
          //text: 'Favorite',
          handler: () => {
            //console.log('Favorite clicked');
          }
        }, 
        /*{
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }*/
      ]
    });
    toast.present();
  }

  async logout(){
    const alert = await this.alertCtrl.create({
      header: 'Informacion!',
      message: '¿Seguro que desea cerrar sesion?',
      cssClass: 'logout-alert',
      buttons: 
      [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'button-cancelar'
        },
        {
          text: 'Aceptar',
          cssClass: 'button-aceptar',
          handler:()=>{
            this.token = null
            this.id_usuario = null
            this.storage.clear()
            this.navCtrl.navigateBack('/login', {animated: true})
            this.presentLoading('Adios...', 2000)
          }
        }
      ]
    })
    alert.present()
  }
  verImg(img:any){
    this.modalCtrl.create({
      component: ImagenmodalPage,
      componentProps: {
        img
      }
    }).then(modal => modal.present())
  }

  async verComentarios(id_post:any){
    const modal = await this.modalCtrl.create({
      component: ComentariosPage,
      cssClass: 'comentarios-modal',
      componentProps: {
        id_post        
      }
    })
    modal.present()
  }

  like(id_post:any){
    this.existeLike = true
    console.log(id_post);
    this._post.agregarLike(id_post).then(()=>{
      this.showMsm('Like Agregado!', 1000, 'primary', 'thumbs-up')
    })
  }

  async showMsm(message:string, duration:number, color:any, icon:string) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position: 'top',
      buttons: [
        {
          side: 'end',
          icon,
        }, 
      ]
    });
    toast.present();
  }

}
