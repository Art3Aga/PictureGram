import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token:string = null
  id_usuario:string = null
  mostrar_tutorial:boolean = true
  constructor(private http:HttpClient, private storage:Storage,
    private navCtrl: NavController, private alertCtrl: AlertController,
    public loadingController: LoadingController,public toastController: ToastController) {
  }
  login(email:string, clave:string){
    /*let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
        headers: headers
    }
    this.http.post('http://localhost/codeigniter/index.php/login/logearse', {email, clave}, options).subscribe(resp=>{
      console.log(resp)
    })*/

    return new Promise(resolve=>{
      this.http.get(`${environment.url}/login/logearse2/${email}/${clave}`).subscribe(data=>{
        this.presentLoading('Verificando cuenta...', 300)
        console.log(data);
        if(!data['ok']){
          this.alertMsm('Incorrecto', `${data['mensaje']}`)
          this.token = null
          this.storage.clear()
          resolve(false)
        }
        else{
          this.showToast(`${data['nombre']}`,'Bienvenido', 'top', 2500, 'primary')
          this.saveToken(data['token'])
          this.saveId_Usuario(data['id_usuario'])
          resolve(true)
        }
      })
    })
    /*this.http.get(`${URL_SERVICIOS}login/logearse2/${email}/${clave}`)
    .subscribe(resp=>{
      console.log(resp);
      if(resp['ok'] == true){
        console.log(resp['token']);
        
        //this.saveToken(resp['token'])
        //this.navCtrl.navigateRoot('/tabs/tab1', { animated: true })
      }
      // if(resp['ok'] == false)
      else{
        console.log(resp['ok']);
        
        //this.token = null
        //this.storage.clear()
        this.alertMsm('Incorrecto', 'Usuario y/o Clave Incorrectos\nIntente denuevo')
      }
    })*/

  }

  registro(nombre:string, email:string, clave:string, avatar:string){
    return new Promise(resolve=>{
      this.http.get(`${environment.url}/login/registro2/${nombre}/${email}/${clave}/${avatar}`).subscribe(data=>{
        //this.presentLoading('Espere porfavor...', 600)
        console.log(data);  
        if(!data['error']){
          this.showToast(`${data['nombre']}`,'Bienvenido', 'top', 2500, 'primary')
          this.saveToken(data['token'])
          //this.navCtrl.navigateBack('/tabs/tab1', {animated: true})
          resolve(true)
        }
        else{
          console.log(`Todos los campos son requeridos`);
          this.alertMsm('Incorrecto', `Todos los campos son requeridos`)
          this.token = null
          this.storage.clear()
          resolve(false)
        }
      })
    })
  }

  async saveTutorial(tutorial:any){
    await this.storage.set('tutorial', tutorial)
  }
  cargarStorage(){
    return new Promise((resolve, reject)=>{
      this.storage.get('tutorial').then(tuto=>{
        if(tuto){
          this.mostrar_tutorial = tuto
          resolve();
        }
      })
    })
  }

  async saveToken(token:string){
    this.token = token
    await this.storage.set('token', token)
  }
  async saveId_Usuario(id_usuario:string){
    this.id_usuario = id_usuario
    await this.storage.set('id_usuario', id_usuario)
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

  async presentLoading(message:string,duration:number) {
    const loading = await this.loadingController.create({
      message ,
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
}



interface Usuario{
  avatar?: string
  id?:string
  email?: string
  clave?:string
}
