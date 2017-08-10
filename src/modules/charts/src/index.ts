import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarChartComponent} from "./bar-chart/barchart.component";
import {ChartLegendComponent} from "./chart-legend/chartlegend.component";
import {ChartTitleComponent} from "./chart-title/chart.title.component";
import {PieChartComponent} from "./pie-chart/pie.chart.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      BarChartComponent,
      ChartLegendComponent,
      ChartTitleComponent,
      PieChartComponent
  ],
  exports: [
    BarChartComponent,
    ChartLegendComponent,
    ChartTitleComponent,
    PieChartComponent
  ]
})
export class AmexioChartsModule {}

export * from './baseclass/base.chart.class';
export * from './bar-chart/barchart.component';
export * from './chart-legend/chartlegend.component';
export * from './chart-title/chart.title.component';