import { AfterContentInit, OnInit, QueryList } from '@angular/core';
import { ChartAreaComponent } from "../chartarea/chart.area.component";
import { ChartLegendComponent } from "../chartlegend/chart.legend.component";
import { ChartTitleComponent } from "../charttitle/chart.title.component";
export declare class LineChartComponent implements AfterContentInit, OnInit {
    private options;
    private lineData;
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
    /**
     * This method create data table structure of array and return in required chart data
     *
     * */
    createTable(array: any[]): any;
    ngOnInit(): void;
}
