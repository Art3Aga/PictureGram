import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapitaComponent } from "./mapita/mapita.component";

@NgModule({
  declarations: [MapitaComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[MapitaComponent]
})
export class ComponentesModule { }
