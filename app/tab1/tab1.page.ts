import { ImagenmodalPage } from './../imagenmodal/imagenmodal.page';
import { ComentariosPage } from './../comentarios/comentarios.page';
import { Component, ViewChild, OnInit } from '@angular/core';
import { PostService } from '../services/posts/post.service';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  post:any[] =[]
  existeLike:boolean = false
  coords:string = '-23.55052,-46.633309'
  imagen: any = '../assets/imgs/perro-3.jpg'
  habilitar:boolean = false
  //ViewChild para hacer referencia a elementos del HTML
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  data:any[] = Array(20)

  constructor(public _post: PostService, private modalCtrl: ModalController,
    private toastController: ToastController) {
    //this.siguientes2()
    
  }
  ngOnInit(){
    //this.siguientes2()
    this._post.getPost3().then()
    //this.getNumeroComentarios(this._post.post['id_postexto'])
  }
  siguiente_pagina(event?){
    this._post.getPost3().then(()=>{
      event.target.complete()
    })
  }
  getNumeroComentarios(id_post:any){
    this._post.getNumeroComentarios(id_post).then()
  }
  siguientes2() {
    this._post.getPost2().subscribe(data=>{
      console.log(data);
      this.post.push(...data['post'])
    })
  }
  siguientes(event?, deslizar: boolean = false) {
    if(deslizar == true){
      this.habilitar = false
      this.post = []
    }
    else{
      this._post.getPost(deslizar).subscribe(data=>{
        console.log(data);
        this.post.unshift(...data['post'])
        if(event){
          event.target.complete()
          if(data['post'].length === 0){
            event.target.disabled = true
            this.habilitar = true
          }
        }
      })
    }
    /*setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.infiniteScroll.disabled = true

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      //if (data.length == 1000) {
      //  event.target.disabled = true;
     // }
    }, 500);*/
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  verImg(img:any){
    this.modalCtrl.create({
      component: ImagenmodalPage,
      componentProps: {
        img
      }
    }).then(modal => modal.present())
  }
  recargar(event){
    if(event){
      this._post.pagina = 0
      this._post.post = []
      this._post.getPost3().then(()=>{
        event.target.complete()
      })
    }
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
