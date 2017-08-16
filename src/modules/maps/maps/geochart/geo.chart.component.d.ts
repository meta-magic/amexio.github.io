/**
 * Created by sagar on 10/8/17.
 */
import { AfterContentInit, OnInit, QueryList } from '@angular/core';
import { MapProperties } from "../mapproperties/map.properties";
export declare class GeoChartComponent implements AfterContentInit, OnInit {
    private options;
    private geomapData;
    private chart;
    id: any;
    width: string;
    height: string;
    data: any;
    displayCountryName: boolean;
    regionCode: string;
    backgroundColor: string;
    datalessRegionColor: string;
    chartAreaComp: QueryList<MapProperties>;
    chartAreaArray: MapProperties[];
    chartAreaComponent: MapProperties;
    constructor();
    drawChart(): void;
    click(e: any): void;
    ngAfterContentInit(): void;
    ngOnInit(): void;
}
