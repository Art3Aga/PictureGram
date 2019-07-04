import { ImagenmodalPage } from './imagenmodal/imagenmodal.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Importaciones
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';
//Servicios
import { PostService } from './services/posts/post.service';
import { ImagenmodalPageModule } from './imagenmodal/imagenmodal.module';
import { ComentariosPageModule } from './comentarios/comentarios.module';
//Camara
import { Camera } from '@ionic-native/camera/ngx';
//Geolocalizacion
import { Geolocation } from '@ionic-native/geolocation/ngx';
//ImagePicker
import { ImagePicker } from '@ionic-native/image-picker/ngx';
//FileTransfer
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@NgModule({
  declarations: [AppComponent],
entryComponents: [/*ImagenmodalPage*/],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(), //es una coleccion de servicios
    ImagenmodalPageModule,
    ComentariosPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PostService,
    Camera,
    ImagePicker,
    Geolocation,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
