import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlide, IonSlides, NavController, 
  AlertController, LoadingController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuarios/usuario.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
  emailLogin:string
  claveLogin:string
  loginUsuario = {
    email: this.emailLogin,
    clave: this.claveLogin
  }
  nombre:string
  clave:string
  email:string
  token:string = null
  private id:number = 0
  avatar:any
  constructor(private _userService: UsuarioService, private storage:Storage, 
            private navCtrl: NavController, private alertCtrl: AlertController,
            public loadingController: LoadingController,
            public toastController: ToastController) {
    
  }
  ngOnInit(){
    this.bloquear()
  }

  async login(flogin:NgForm){
    if(flogin.invalid){
      return
    }
    /*this._userService.login(this.loginUsuario.email, this.loginUsuario.clave)
    .subscribe(data=>{
      console.log(data);
      if(data['ok']){
        this.showToast(`${data['nombre']}`,'Bienvenido', 'top', 2000, 'success')
        this.navCtrl.navigateRoot('/tabs/tab1', { animated: true })
        this.saveToken(data['token'])
        this.saveId_Usuario(data['id_usuario'])
      }
      else{
        console.log(`${data['mensaje']}`);
        this.alertMsm('Incorrecto', `${data['mensaje']}`)
      }
    })*/
    const valido = await this._userService.login(this.loginUsuario.email, this.loginUsuario.clave)  
    if(valido){
      this.navCtrl.navigateRoot('/tabs/tab1', { animated: true })
    }
    //this.navCtrl.navigateRoot('/tabs/tab1', { animated: true })
    //console.log(this.loginUsuario);
    
  }
  async registro(fRegistro:NgForm){
    if(fRegistro.invalid){
      return
    }
    const valido = await this._userService.registro(this.nombre, this.email, this.clave, this.avatar)
    if(valido){
      this._userService.login(this.email, this.clave)
      this.navCtrl.navigateBack('/tabs/tab1', {animated: true})
      /*this.avatars.forEach(item=>{
        item.seleccionado = false
      })
      this.nombre = ""
      this.email = ""
      this.clave = ""
      this.mostrarLogin()*/

    }
    else{
      this.alertMsm('Error', 'Ese correo electronico ya existe')
    }
  }
  bloquear(){
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
  }
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
  async saveId_Usuario(id:number){
    this.id = id
    await this.storage.set('id_usuario', id)
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Comprobando...',
      duration: 1200
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

}
