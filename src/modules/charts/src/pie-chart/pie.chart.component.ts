/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Sagar Jadhav
 *
 */
import {AfterContentInit, Component, ContentChildren, Input, QueryList} from "@angular/core";
import {ChartTitleComponent} from "../chart-title/chart.title.component";
import {ChartLegendComponent} from "../chart-legend/chartlegend.component";
import {ChartBaseClass} from "../baseclass/base.chart.class";
declare var google: any;
@Component({
    selector: 'amexio-chart-pie',
    template: `
        <div [attr.id]="id"
             [style.width.px]="width"
             [style.height.px]="height"
        ></div>
    `
})
export class PieChartComponent extends ChartBaseClass implements AfterContentInit {

    private pieOptions;
    private pieData;
    private chart;

    id: any;

    @Input() width: number;

    @Input() height: number;

    @Input() is3D: boolean = false;

    //this input for hole inside pie chart
    @Input() pieHole: number;

    @Input() data: any;

    //this input for angle rotation start
    @Input() pieStartAngle: number;

    @Input() backgroundColor: string;

    @ContentChildren(ChartLegendComponent) chartLegendComp: QueryList<ChartLegendComponent>;

    @ContentChildren(ChartTitleComponent) chartTitleComp:QueryList<ChartTitleComponent>;

    chartLegendArray: ChartLegendComponent[];

    chartLengendComponent: ChartLegendComponent;

    chartTitleArray:ChartTitleComponent[];

    chartTitleComponent:ChartTitleComponent;

    constructor() {
        super();
        this.id = 'amexio-chart-pie' + Math.random();
    }

    drawChart() {
        this.pieData = this.createDataTable(this.data);
        this.pieOptions = {

        };
        this.chart = this.createPieChart(document.getElementById(this.id));
        this.chart.draw(this.pieData, this.pieOptions);
        google.visualization.events.addListener(this.chart, 'click', this.onClick);
    }

    onClick(e) {
        debugger
    }

    //after content init for inner directive is run
    ngAfterContentInit(): void {
        this.chartLegendArray = this.chartLegendComp.toArray();
        this.chartTitleArray=this.chartTitleComp.toArray();
        //take first component
        if (this.chartLegendArray.length == 1) {
            this.chartLengendComponent = this.chartLegendArray.pop();
        }
        if(this.chartTitleArray.length==1){
            this.chartTitleComponent= this.chartTitleArray.pop();
        }
    }
}

