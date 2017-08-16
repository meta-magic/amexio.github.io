import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashBoardTitle} from "./dashboardtitle/dashboard.title.component";
import {GaugeChartComponent} from "./gaugechart/gauge.chart.component";

export * from './dashboardtitle/dashboard.title.component';
export * from './gaugechart/gauge.chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      DashBoardTitle,
      GaugeChartComponent
  ],
  exports: [
    DashBoardTitle,
    GaugeChartComponent
  ]
})
export class AmexioDashboardModule {
}
