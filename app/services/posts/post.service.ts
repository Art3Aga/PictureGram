import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { URL_SERVICIOS } from '../../config/url.servicios';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  pagina:number = 0
  pagina2:number = 0
  pagina3:number = 0
  pagina4:number = 0
  post:any[] =[]
  n_comentarios:any = 0
  comentarios:any[] = []
  mis_post:any[] = []
  constructor(private http: HttpClient, private transfer: FileTransfer) { }

  
  getPost(deslizar:boolean = false){
    if(deslizar == true){
      this.pagina = 0
    }
    else{
      this.pagina+=1
      let url = `${environment.url}/post/getTodos/${this.pagina}`
        return this.http.get(url)
    }
    /*return new Promise((resolve, reject)=>{
      let url = `${URL_SERVICIOS}post/getTodos/${this.pagina}`
      this.http.get(url).subscribe(data=>{
        console.log(data);
        if(!data['error']){
          this.post.push(...data['post'])
          this.pagina+=1
        }
      })
    })*/
  }
  getPost2(){
    this.pagina2++
    let url = `${environment.url}/post/getTodos/${this.pagina2}`
      return this.http.get(url)
  }
  getPost3(){
    return new Promise(resolve=>{
      let url = `${environment.url}/post/getTodos/${this.pagina}`;
      this.http.get(url).subscribe(data=>{
        console.log(data);
        if(data['error']==false){
          this.post.push(...data['post'])
          this.pagina+=1
        }
        resolve()
      })
    })
  }
  agregarLike(id_post:any){
    return new Promise(resolve=>{
      let url = `${environment.url}/post/agregarLike/${id_post}`;
      this.http.get(url).subscribe(data=>{
        console.log("Like Agregado: Cantidad de Likes: "+ data);
        resolve()
      })
    })
  }
  guardarImagen(img:any){
    const publicacion = new HttpParams().set('imagen', img);
    let url = `${environment.url}/post/guardarImagen`;
    const headers = new HttpHeaders().set('Conten-Type', 'multipart/form-data');
    this.http.post(url, publicacion.toString(), {headers}).subscribe(data=>{
      console.log(data);
    })
    //let formData:FormData = new FormData();
    //formData.append('imagen', )
    //this.http.post(`${url}`)
  }
  saveImagen(img:string, fileName:string){
    /*const headers = new HttpHeaders();
    let url = `${environment.url}/post/guardarImagen`;
    headers.append('Content-Type', 'application/form-data');
    this.http.post(url, img, {headers}).subscribe(data=>{
      console.log(data);
    })*/
    //let url = `${environment.url}/post/subirImagen`;
    let url = "http://192.168.1.7/subirImg.php"
    const options: FileUploadOptions ={
      //filekey es el imagen en el form-data
      fileKey: 'file',
      fileName
      /*headers:{
        'Content-Type': 'multipart/form-data'
      },*/
      //mimeType: 'multipart/form-data'
    };
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.upload(img, url, options).then(data=>{
      console.log(data);
    }).catch(error=>{
      console.log(`Error al subir imagen: ${error}`);
      
    })
    //let url = `${environment.url}/post/subirImagen`;
    //let postData = new FormData();
    //postData.append('file', img);
    //this.http.post(url, postData).subscribe(data=>{
      //console.log(data);
      
    //})
  }
  getMyPost(id_usuario:any){
    return new Promise(resolve=>{
      let url = `${environment.url}/post/getMyPost/${this.pagina3}/${id_usuario}`;
      this.http.get(url).subscribe(data=>{
        console.log(data);
        if(data['error']==false){
          this.mis_post.push(...data['mis_post'])
          this.pagina3+=1
        }
        resolve()
      })
    })
  }
  getComentariosPost(id_post:any){
    return new Promise(resolve=>{
      let url = `${environment.url}/post/getComentarios/${id_post}`;
      this.http.get(url).subscribe(data=>{
        console.log(data);
        if(data['error']==false){
          this.comentarios.push(...data['comentarios'])
          //this.pagina4+=1
          resolve(true)
        }
      })
    })
  }
  getNumeroComentarios(id_post:any){
    return new Promise(resolve=>{
      let url = `${environment.url}/post/agregarLike/${id_post}`;
      this.http.get(url).subscribe(data=>{
        this.n_comentarios = data
        resolve(true)
      })
    })
  }

  crearPost(id:any, titulo:any, coordenadas:any, likes:any, img:string){
    const publicacion = new HttpParams()
    .set('id_usuario', id)
    .set('titulo', titulo)
    .set('coordenadas', coordenadas)
    .set('likes', likes)
    .set('img', img)
    let url = `${environment.url}/post/savePost` 
    //console.log(publicacion);
    //console.log(publicacion.toString());
    
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset-UTF-8;'
    })*/
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded; charset-UTF-8;')
    this.http.post(`${url}`, publicacion.toString(), {headers}).subscribe(data=>{
      console.log(data);
    })
  }
  crearPost2(id:any, titulo:any, likes:any){
    const publicacion = new HttpParams()
    .set('id_usuario', id)
    .set('titulo', titulo)
    .set('likes', likes)
    let url = `${environment.url}/post/savePost` 
    //console.log(publicacion);
    //console.log(publicacion.toString());
    
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset-UTF-8;'
    })*/
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded; charset-UTF-8;')
    this.http.post(`${url}`, publicacion.toString(), {headers}).subscribe(data=>{
      console.log(data);
    })
  }
  crearPost3(id:any, titulo:any, coordenadas:any, likes:any){
    const publicacion = new HttpParams()
    .set('id_usuario', id)
    .set('titulo', titulo)
    .set('coordenadas', coordenadas)
    .set('likes', likes)
    let url = `${environment.url}/post/savePost` 
    //console.log(publicacion);
    //console.log(publicacion.toString());
    
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset-UTF-8;'
    })*/
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded; charset-UTF-8;')
    this.http.post(`${url}`, publicacion.toString(), {headers}).subscribe(data=>{
      console.log(data);
    })
  }
  crearPost4(id:any, titulo:any, img:any, likes:any){
    const publicacion = new HttpParams()
    .set('id_usuario', id)
    .set('titulo', titulo)
    .set('img', img)
    .set('likes', likes)
    let url = `${environment.url}/post/savePost` 
    //console.log(publicacion);
    //console.log(publicacion.toString());
    
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset-UTF-8;'
    })*/
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded; charset-UTF-8;')
    this.http.post(`${url}`, publicacion.toString(), {headers}).subscribe(data=>{
      console.log(data);
    })
  }
  agregarComentario(id_usuario:any, comentario:string, id_postexto:any, likes:any, dislikes:any){
    return new Promise(resolve=>{
      const publicacion = new HttpParams()
      .set('id_usuario', id_usuario)
      .set('comentario', comentario)
      .set('id_postexto', id_postexto)
      .set('likes', likes)
      .set('dislikes', dislikes)
      let url = `${environment.url}/post/addComentario` 
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded; charset-UTF-8;')
      this.http.post(`${url}`, publicacion.toString(), {headers}).subscribe(data=>{
        console.log(data);
        resolve()
      })
    })
  }
  
}
