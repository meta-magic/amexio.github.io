import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {GeoChartComponent} from './geochart/geo.chart.component';
import {MapPropertiesComponent} from './mapproperties/map.properties';
import {MapTitleComponent} from './maptitle/map.title.component';
import {TreeMapComponent} from './treemap/treemap.map.component';

import {CommonDataService} from '../services/data/common.data.service';
import {MapLoaderService} from './map.loader.service';

import { AmexioCommonModule } from '../base/amexio.common.module';

export * from './mapproperties/map.properties';
export * from './geochart/geo.chart.component';
export * from './treemap/treemap.map.component';
export * from './maptitle/map.title.component';
export * from './map.loader.service';
export * from '../services/data/common.data.service';

const MAP_COMPONENTS = [
  MapPropertiesComponent,
  GeoChartComponent,
  TreeMapComponent,
  MapTitleComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AmexioCommonModule,
  ],
  exports: MAP_COMPONENTS,
  declarations: MAP_COMPONENTS,
  providers : [CommonDataService, MapLoaderService],
})
export class AmexioMapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioMapModule,
      providers: [CommonDataService, MapLoaderService],
    };
  }
}
