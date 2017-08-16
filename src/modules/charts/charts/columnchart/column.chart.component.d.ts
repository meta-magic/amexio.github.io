import { AfterContentInit, QueryList } from '@angular/core';
import { ChartLegendComponent } from "../chartlegend/chart.legend.component";
import { ChartTitleComponent } from "../charttitle/chart.title.component";
import { ChartAreaComponent } from "../chartarea/chart.area.component";
export declare class ColumnChartComponent implements AfterContentInit {
    private options;
    private columnData;
    private chart;
    id: any;
    width: string;
    height: string;
    data: any;
    isStacked: boolean;
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
