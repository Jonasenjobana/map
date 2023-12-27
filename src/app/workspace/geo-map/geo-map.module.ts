import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoMapRoutingModule } from './geo-map-routing.module';
import { GeoMapComponent } from './geo-map/geo-map.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GeoMapComponent
  ],
  imports: [
    CommonModule,
    GeoMapRoutingModule,
    FormsModule
  ]
})
export class GeoMapModule { }
