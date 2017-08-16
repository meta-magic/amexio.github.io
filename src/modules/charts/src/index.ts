import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";


import {ChartLegendComponent} from "./chartlegend/chart.legend.component";
import {ChartTitleComponent} from "./charttitle/chart.title.component";
import {PieChartComponent} from "./piechart/pie.chart.component";
import {AreaChartComponent} from "./areachart/area.chart.component";
import {ChartAreaComponent} from "./chartarea/chart.area.component";
import {ColumnChartComponent} from "./columnchart/column.chart.component";
import {DonutChartComponent} from "./donutchart/donut.chart.component";
import {HistogramChartComponent} from "./histogramchart/histogram.chart.component";
import {LineChartComponent} from "./linechart/line.chart.component";
import {BarChartComponent} from "./barchart/bar.chart.component";
import {TimeLineChartComponent} from "./timelinechart/timeline.chart.component";

export  * from "./chartlegend/chart.legend.component";
export  * from  "./charttitle/chart.title.component";
export  * from "./piechart/pie.chart.component";
export  * from  "./areachart/area.chart.component";
export  * from  "./chartarea/chart.area.component";
export  * from  "./columnchart/column.chart.component";
export  * from  "./donutchart/donut.chart.component";
export  * from  "./histogramchart/histogram.chart.component";
export  * from "./linechart/line.chart.component";
export  * from  "./barchart/bar.chart.component";
export * from  "./timelinechart/timeline.chart.component";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AreaChartComponent, BarChartComponent, ChartAreaComponent,
    ChartLegendComponent, ChartTitleComponent, ColumnChartComponent,
    DonutChartComponent, HistogramChartComponent, LineChartComponent,
    PieChartComponent,TimeLineChartComponent],
  exports: [
    AreaChartComponent, BarChartComponent, ChartAreaComponent,
    ChartLegendComponent, ChartTitleComponent, ColumnChartComponent,
    DonutChartComponent, HistogramChartComponent, LineChartComponent, PieChartComponent,
    TimeLineChartComponent],
})
export class AmexioChartModule {

}
