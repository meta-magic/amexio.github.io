import { AfterContentInit, OnInit, QueryList } from '@angular/core';
import { DashBoardTitle } from "../dashboardtitle/dashboard.title.component";
export declare class GaugeChartComponent implements AfterContentInit, OnInit {
    private options;
    private gaugeData;
    private chart;
    id: any;
    elementId: string;
    width: string;
    height: string;
    data: any;
    redColorFrom: number;
    redColorTo: number;
    yellowColorFrom: number;
    yellowColorTo: number;
    minorTicks: number;
    chartTitleComp: QueryList<DashBoardTitle>;
    chartTitleArray: DashBoardTitle[];
    chartTitleComponent: DashBoardTitle;
    constructor();
    drawChart(): void;
    ngAfterContentInit(): void;
    ngOnInit(): void;
}
