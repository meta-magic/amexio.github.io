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

/*
Component Name : Amexio column chart
Component Selector : <amexio-chart-column>
Component Description : A column chart is a vertical bar chart rendered in the browser using SVG.
*/

import {AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit,  QueryList, ViewChild} from '@angular/core';
import {ChartAreaComponent} from '../chartarea/chart.area.component';
import {ChartLegendComponent} from '../chartlegend/chart.legend.component';
import {ChartTitleComponent} from '../charttitle/chart.title.component';

import {ChartLoaderService} from '../chart.loader.service';

declare var google: any;
@Component({
  selector: 'amexio-chart-column', template: `
    <div  *ngIf="showChart" #columnchart
         [style.width]="width"
         [style.height]="height"
         (window:resize)="onResize($event)">
      <div *ngIf="!hasLoaded" class="lmask">
      </div>
    </div>
  `, styles: [`.lmask {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #000;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9999;
    opacity: 0.4;
  }

  .lmask.fixed {
    position: fixed;
  }

  .lmask:before {
    content: '';
    background-color: transparent;
    border: 5px solid rgba(0, 183, 229, 0.9);
    opacity: .9;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-radius: 50px;
    box-shadow: 0 0 35px #2187e7;
    width: 50px;
    height: 50px;
    -moz-animation: spinPulse 1s infinite ease-in-out;
    -webkit-animation: spinPulse 1s infinite linear;
    margin: -25px 0 0 -25px;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .lmask:after {
    content: '';
    background-color: transparent;
    border: 5px solid rgba(0, 183, 229, 0.9);
    opacity: .9;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-radius: 50px;
    box-shadow: 0 0 15px #2187e7;
    width: 30px;
    height: 30px;
    -moz-animation: spinoffPulse 1s infinite linear;
    -webkit-animation: spinoffPulse 1s infinite linear;
    margin: -15px 0 0 -15px;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  @-moz-keyframes spinPulse {
    0% {
      -moz-transform: rotate(160deg);
      opacity: 0;
      box-shadow: 0 0 1px #2187e7;
    }
    50% {
      -moz-transform: rotate(145deg);
      opacity: 1;
    }
    100% {
      -moz-transform: rotate(-320deg);
      opacity: 0;
    }
  }

  @-moz-keyframes spinoffPulse {
    0% {
      -moz-transform: rotate(0deg);
    }
    100% {
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spinPulse {
    0% {
      -webkit-transform: rotate(160deg);
      opacity: 0;
      box-shadow: 0 0 1px #2187e7;
    }
    50% {
      -webkit-transform: rotate(145deg);
      opacity: 1;
    }
    100% {
      -webkit-transform: rotate(-320deg);
      opacity: 0;
    }
  }

  @-webkit-keyframes spinoffPulse {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  ` ],
})

export class ColumnChartComponent implements AfterContentInit, OnInit {

  private options: any;
  private columnData: any;
  private chart: any;

  id: any;
 /*
Properties
name : width
datatype : string
version : 4.0 onwards
default : none
description : Width of chart
*/
@Input() width: string;

 /*
Properties
name : height
datatype : string
version : 4.0 onwards
default : none
description : height of chart
*/
@Input() height: string;

  showChart: boolean;
  _data: any;

  get data(): any {
    return this._data;
  }

 /*
Properties
name : data
datatype : any
version : 4.0 onwards
default : none
description : For the use of local data
*/
@Input('data')
  set data(data: any) {
    if (data) {
      this._data = data;
      this.showChart = true;
    } else {
      this.showChart = false;
    }
  }

// showing stack chart

 /*
Properties
name : stacked
datatype : boolean
version : 4.0 onwards
default : false
description : If set to true, stacks the elements for all series at each domain value.default value is false
*/
@Input() stacked = false;

 /*
Properties
name : background-color
datatype : string
version : 4.0 onwards
default : none
description : sets background color
*/
@Input('background-color') backgroundcolor: string;

  hasLoaded: boolean;

  @ContentChildren(ChartLegendComponent) chartLegendComp: QueryList<ChartLegendComponent>;

  @ContentChildren(ChartTitleComponent) chartTitleComp: QueryList<ChartTitleComponent>;

  @ContentChildren(ChartAreaComponent) chartAreaComp: QueryList<ChartAreaComponent>;

  chartAreaArray: ChartAreaComponent[];

  chartAreaComponent: ChartAreaComponent;

  chartLegendArray: ChartLegendComponent[];

  chartLengendComponent: ChartLegendComponent;

  chartTitleArray: ChartTitleComponent[];

  chartTitleComponent: ChartTitleComponent;

  @ViewChild('columnchart') private columnchart: ElementRef;

  constructor(private loader: ChartLoaderService) {
    this.width = '100%';
  }

  drawChart() {
    if (this.showChart) {
      this.columnData = this.createTable(this._data);
      this.options = {
        title: this.chartTitleComponent ? this.chartTitleComponent.title : null,
        titleTextStyle: this.chartTitleComponent ? this.chartTitleTextStyle() : null,
        isStacked: this.stacked,
        backgroundcolor: this.backgroundcolor,
        legend: this.chartLengendComponent ? this.chartLegendStyle() : 'none',
        chartArea: this.chartAreaComponent ? this.chartBackGroundColor() : null,
      };
      if (this.columnData) {
        this.chart = new google.visualization.ColumnChart(this.columnchart.nativeElement);
        this.hasLoaded = true;
        this.chart.draw(this.columnData, this.options);
        google.visualization.events.addListener(this.chart, 'click', this.onClick);
      }
    }
  }
  chartTitleTextStyle() {
    return{
      color: this.chartTitleComponent.color ? this.chartTitleComponent.color : null,
      fontName: this.chartTitleComponent.fontname ? this.chartTitleComponent.fontname : null,
      fontsize: this.chartTitleComponent.fontsize ? this.chartTitleComponent.fontsize : null,
      bold: this.chartTitleComponent.bold ? this.chartTitleComponent.bold : null,
      italic: this.chartTitleComponent.italic ? this.chartTitleComponent.italic : null,
    };
  }
  chartLegendStyle() {
    return{
      position: this.chartLengendComponent.position ? this.chartLengendComponent.position : null,
           // this work only in chart position is top
          maxLines: this.chartLengendComponent.maxlines ? this.chartLengendComponent.maxlines : null,
          textStyle: {
            color: this.chartLengendComponent.color ? this.chartLengendComponent.color : null,
            fontsize: this.chartLengendComponent.fontsize ? this.chartLengendComponent.fontsize : null,
            fontName: this.chartLengendComponent.fontname ? this.chartLengendComponent.fontname : null,
            bold: this.chartLengendComponent.bold ? this.chartLengendComponent.bold : null,
            alignment: this.chartLengendComponent.alignment ? this.chartLengendComponent.alignment : null,
          },
        };
    }
  chartBackGroundColor() {
    return{
      backgroundcolor: this.chartAreaComponent.chartbackgroundcolor ? this.chartAreaComponent.chartbackgroundcolor : null,
          left: this.chartAreaComponent.leftposition ? this.chartAreaComponent.leftposition : null,
          top: this.chartAreaComponent.topposition ? this.chartAreaComponent.topposition : null,
          height: this.chartAreaComponent.chartheight ? this.chartAreaComponent.chartheight : null,
          width: this.chartAreaComponent.chartwidth ? this.chartAreaComponent.chartwidth : null,
    };
  }

  onClick(e: any) {

  }

  // after content init for inner directive is run
  ngAfterContentInit(): void {
    this.chartLegendArray = this.chartLegendComp.toArray();
    this.chartTitleArray = this.chartTitleComp.toArray();
    this.chartAreaArray = this.chartAreaComp.toArray();
    // take first component
    if (this.chartLegendArray.length === 1) {
      this.chartLengendComponent = this.chartLegendArray.pop();
    }
    if (this.chartTitleArray.length === 1) {
      this.chartTitleComponent = this.chartTitleArray.pop();
    }
    if (this.chartAreaArray.length === 1) {
      this.chartAreaComponent = this.chartAreaArray.pop();
    }
  }

  // This method create data table structure of array and return in required chart data
  createTable(array: any[]): any {
    // create Duplicate Array for data arrangement
    const dupArray = array.slice();
    const data = new google.visualization.DataTable();
    const labelObject = dupArray[0];
    // remove first object of array
    dupArray.shift();

    labelObject.forEach((datatypeObject: any) => {
      data.addColumn(datatypeObject.datatype, datatypeObject.label);
    });
    const finalArray: any[] = [];
    dupArray.forEach((rowObject) => {
      finalArray.push(rowObject);
    });
    data.addRows(finalArray);
    return data;
  }

  ngOnInit(): void {
    this.hasLoaded = false;
    this.loader.loadCharts('ColumnChart').subscribe((value) => console.log(), (errror) => console.error(errror), () => {
      this.drawChart();
    });
  }

  onResize(event: any) {
    this.drawChart();
  }
}
