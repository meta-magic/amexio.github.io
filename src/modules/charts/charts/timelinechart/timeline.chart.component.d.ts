import { AfterContentInit, OnInit, QueryList } from "@angular/core";
import { ChartTitleComponent } from "../charttitle/chart.title.component";
import { ChartLegendComponent } from "../chartlegend/chart.legend.component";
import { ChartAreaComponent } from "../chartarea/chart.area.component";
export declare class TimeLineChartComponent implements AfterContentInit, OnInit {
    private chart;
    id: any;
    width: string;
    data: any;
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
