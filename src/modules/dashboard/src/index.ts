import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import {DashBoardTitle} from "./dashboardtitle/dashboard.title.component";
import {GaugeChartComponent} from "./gaugechart/gauge.chart.component";
import {DataPointCenterComponent} from './datapoints/center.component';
import {DataPointsComponent} from './datapoints/datapoints.component';
import {DataPointEastComponent} from './datapoints/east.component';
import {DataPointNorthComponent} from './datapoints/north.component';
import {DataPointSouthComponent} from './datapoints/south.component';
import {DataPointWestComponent} from './datapoints/west.component';
import {DashboardLoaderService} from "./chart.loader.service";

export * from './dashboardtitle/dashboard.title.component';
export * from './gaugechart/gauge.chart.component';

export * from './datapoints/center.component';
export * from './datapoints/datapoints.component';
export * from './datapoints/east.component';
export * from './datapoints/north.component';
export * from './datapoints/south.component';
export * from './datapoints/west.component';
export * from "./chart.loader.service";

const DASHBOARD = [
  DashBoardTitle,
  GaugeChartComponent,
  DataPointCenterComponent,
  DataPointsComponent,
  DataPointEastComponent,
  DataPointNorthComponent,
  DataPointSouthComponent,
  DataPointWestComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: DASHBOARD,
  exports: DASHBOARD
})
export class AmexioDashboardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioDashboardModule,
      providers: [DashboardLoaderService]
    };
  }
}
