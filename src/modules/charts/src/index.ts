import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartLoaderService} from "./chart.loader.service";
import {ChartLegendComponent} from "./chartlegend/chart.legend.component";
import {ChartTitleComponent} from "./charttitle/chart.title.component";
import {PieChartComponent} from "./piechart/pie.chart.component";
import {AreaChartComponent} from "./areachart/area.chart.component";
import {ChartAreaComponent} from "./chartarea/chart.area.component";
import {ColumnChartComponent} from "./columnchart/column.chart.component";
import {DonutChartComponent} from "./donutchart/donut.chart.component";
import {GaugeChartComponent} from "./gaugechart/gauge.chart.component";
import {GeoChartComponent} from "./geochart/geo.chart.component";
import {HistogramChartComponent} from "./histogramchart/histogram.chart.component";
import {LineChartComponent} from "./linechart/line.chart.component";
import {BarChartComponent} from "./barchart/bar.chart.component";
import {TimeLineChartComponent} from "./timelinechart/timeline.chart.component";


@NgModule({
    imports: [CommonModule],
    declarations: [AreaChartComponent, BarChartComponent, ChartAreaComponent, ChartLegendComponent, ChartTitleComponent, ColumnChartComponent, DonutChartComponent, GaugeChartComponent, GeoChartComponent, HistogramChartComponent, LineChartComponent, PieChartComponent,TimeLineChartComponent],
    exports: [AreaChartComponent, BarChartComponent, ChartAreaComponent, ChartLegendComponent, ChartTitleComponent, ColumnChartComponent, DonutChartComponent, GaugeChartComponent, GeoChartComponent, HistogramChartComponent, LineChartComponent, PieChartComponent,TimeLineChartComponent],
    providers: [ChartLoaderService]
})
export class AmexioChartModule {
}
export  * from "./chartlegend/chart.legend.component";
export  * from  "./charttitle/chart.title.component";
export  * from "./piechart/pie.chart.component";
export  * from  "./areachart/area.chart.component";
export  * from  "./chartarea/chart.area.component";
export  * from  "./columnchart/column.chart.component";
export  * from  "./donutchart/donut.chart.component";
export  * from  "./gaugechart/gauge.chart.component";
export  * from  "./geochart/geo.chart.component";
export  * from  "./histogramchart/histogram.chart.component";
export  * from "./linechart/line.chart.component";
export  * from  "./barchart/bar.chart.component";
export * from "./timelinechart/timeline.chart.component";
