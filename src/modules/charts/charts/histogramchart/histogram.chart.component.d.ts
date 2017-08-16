import { AfterContentInit, OnInit, QueryList } from '@angular/core';
import { ChartLegendComponent } from "../chartlegend/chart.legend.component";
import { ChartTitleComponent } from "../charttitle/chart.title.component";
import { ChartAreaComponent } from "../chartarea/chart.area.component";
export declare class HistogramChartComponent implements AfterContentInit, OnInit {
    private options;
    private histogramData;
    private chart;
    id: any;
    width: string;
    height: string;
    data: any;
    backgroundColor: string;
    chartLegendComp: QueryList<ChartLegendComponent>;
    chartTitleComp: QueryList<ChartTitleComponent>;
    chartAreaComp: QueryList<ChartAreaComponent>;
    chartAreaArray: ChartAreaComponent[];
    chartAreaComponent: ChartAreaComponent;
    chartLegendArray: ChartLegendComponent[];
    chartLengendComponent: ChartLegendComponent;
    chartTitleArray: ChartTitleComponent[];
    chartTitleComponent: ChartTitleComponent;
    constructor();
    drawChart(): void;
    onClick(e: any): void;
    ngAfterContentInit(): void;
    ngOnInit(): void;
}
