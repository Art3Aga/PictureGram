import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/posts/post.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  id_post:any
  comentario:string = ""
  constructor(private modalCtrl: ModalController, private navParams: NavParams,
    public _post:PostService, public storage: Storage, public toastController:ToastController) { }

  ngOnInit() {
    this.id_post = this.navParams.get('id_post')
    this.getComentarios()
  }
  cerrarModal(){
    this.modalCtrl.dismiss()
  }
  getComentarios(){
    this._post.comentarios = []
    this._post.getComentariosPost(this.id_post)
  }
  //comentar(id_usuario:any, id_postexto:any, likes:any, dislikes:any){
    //this._post.agregarComentario(id_usuario, this.comentario, id_postexto, likes, dislikes)    
  //}
  async comentar(){
    await this.storage.get('id_usuario').then(id=>{
      this._post.agregarComentario(id, this.comentario, this.id_post, 0, 0).then(()=>{
        this.comentario = ""
        this.showMsm(`¡Comentario Agregado!\nRefresque la aplicacion`, 3500, 'primary', 'done-all');
      })
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
  recargar(event){
    if(event){
      this._post.comentarios = []
      this._post.getComentariosPost(this.id_post).then(()=>{
        event.target.complete()
      })
    }
  }

}
