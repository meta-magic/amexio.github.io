import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonDataService} from "../services/data/common.data.service";
import {HttpModule} from "@angular/http";
import {MapProperties} from "./mapproperties/map.properties";
import {GeoChartComponent} from "./geochart/geo.chart.component";
import {TreeMapComponent} from "./treemap/treemap.map.component";
import {MapTitleComponent} from "./maptitle/map.title.component";
import {MapLoaderService} from "./map.loader.service";

export * from './mapproperties/map.properties';
export * from './geochart/geo.chart.component';
export * from "./treemap/treemap.map.component";
export * from "./maptitle/map.title.component";
export * from "./map.loader.service";
export * from '../services/data/common.data.service';

const MAP_COMPONENTS = [
  MapProperties,
  GeoChartComponent,
  TreeMapComponent,
  MapTitleComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: MAP_COMPONENTS,
  declarations: MAP_COMPONENTS,
  providers : [CommonDataService, MapLoaderService]
})
export class AmexioMapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioMapModule,
      providers: [CommonDataService,MapLoaderService]
    };
  }
}
