import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { UsuarioService } from './services/usuarios/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  token:any = null
  id_usuario:any = null
  tutorial:any = "si"
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private navCtrl: NavController,
    private _userService:UsuarioService
  ) {
    this.getTutorial()
    this.getID()
    this.getToken()
    this.initializeApp();
  }
  getToken(){
    this.storage.get('token').then(token=>{
      if(token){
        this.token = token
      }
      else{
        this.token = null
      }
    })
  }
  getID(){
    this.storage.get('id_usuario').then(id=>{
      if(id){
        this.id_usuario = id
      }
      else{
        this.id_usuario = null
        console.log("No hay ID");
        
      }
    })
  }
  getTutorial(){
    this.storage.get('tutorial').then(tuto=>{
      if(tuto){
        this.tutorial = tuto
        this.storage.get('token').then(token=>{
          if(token){
            this.storage.get('id_usuario').then(id=>{
              if(id){
                this.navCtrl.navigateForward('/tabs/tab1')  
                //this.navCtrl.navigateForward('/login')  
              }
            })
            //this.navCtrl.navigateForward('/login')  
          }
          else{
            this.navCtrl.navigateForward('/login')
          }
        })
        //this.navCtrl.navigateForward('/login')
      }
      else{
        this.tutorial = "no"
        this.navCtrl.navigateForward('/tutorial')
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      /*if(this.tutorial == "no"){
        if(!this.token  && !this.id_usuario){
          this.navCtrl.navigateForward('/login')
        }
        else{
          this.navCtrl.navigateForward('/tabs/tab1')
        }
      }
      else if(this.tutorial == "si" || this.tutorial == null){
        this.navCtrl.navigateForward('/tutorial')
      }*/
      /*this._userService.cargarStorage().then(()=>{
        if(this._userService.mostrar_tutorial == true){
          this.navCtrl.navigateRoot('/tutorial')
        }
        else{
          this.navCtrl.navigateRoot('/login')
        }
      })*/
    });
  }
}
