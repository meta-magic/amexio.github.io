import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapProperties} from "./mapproperties/map.properties";
import {GeoChartComponent} from "./geochart/geo.chart.component";

export * from './mapproperties/map.properties';
export * from './geochart/geo.chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      MapProperties,
      GeoChartComponent
  ],
  exports: [
    MapProperties,
    GeoChartComponent
  ]
})
export class AmexioMapsModule {

}
