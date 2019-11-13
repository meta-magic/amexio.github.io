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
Component Name : Amexio bar chart
Component Selector : <amexio-chart-bar>
Component Description : An bar chart that is rendered within the browser using SVG.
A bar chart is a chart that presents grouped data with rectangular bars with lengths proportional to the values that they represent.
*/
import { AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { ChartAreaComponent } from '../chartarea/chart.area.component';
import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
import { ChartTitleComponent } from '../charttitle/chart.title.component';

import { ChartLoaderService } from '../chart.loader.service';

declare var google: any;
@Component({
  selector: 'amexio-chart-bar', template: `
    <div *ngIf="showChart" #barchart
         [style.width]="width"
         [style.height]="height" (window:resize)="onResize($event)">
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

  `],
})
export class BarChartComponent implements AfterContentInit, OnInit {

  private options: any;
  private barData: any;
  private chart: any;

  hasLoaded: boolean;
  id: any;
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
default :
description : Local data for AreaChart
*/
  @Input('data')
  set data(data: any) {
    if (data) {
      this.showChart = true;
      this._data = data;
    } else {
      this.showChart = false;
    }
  }

  /*
Properties
name : width
datatype : string
version : 4.0 onwards
default :
description : Width of chart
*/
  @Input() width: string;

  /*
Properties
name : height
datatype : string
version : 4.0 onwards
default :
description : Height of chart
*/
  @Input() height: string;

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
name : x-axis-title
datatype : string
version : 4.0 onwards
default :
description : Sets title for x axis
*/
  @Input('x-axis-title') xaxistitle: string;

  /*
Properties
name : y-axis-title
datatype : string
version : 4.0 onwards
default :
description : Sets title for y axis
*/
  @Input('y-axis-title') yaxistitle: string;

  /*
Properties
name : background-color
datatype : string
version : 4.0 onwards
default :
description : Sets background-color
*/
  @Input('background-color') backgroundcolor: string;

  @ContentChildren(ChartLegendComponent) chartLegendComp: QueryList<ChartLegendComponent>;

  @ContentChildren(ChartTitleComponent) chartTitleComp: QueryList<ChartTitleComponent>;

  @ContentChildren(ChartAreaComponent) chartAreaComp: QueryList<ChartAreaComponent>;

  chartAreaArray: ChartAreaComponent[];

  chartAreaComponent: ChartAreaComponent;

  chartLegendArray: ChartLegendComponent[];

  chartLengendComponent: ChartLegendComponent;

  chartTitleArray: ChartTitleComponent[];

  chartTitleComponent: ChartTitleComponent;

  @ViewChild('barchart') private barchart: ElementRef;

  constructor(private loader: ChartLoaderService) {

    this.width = '100%';
  }

  drawChart() {
    if (this.showChart) {
      // bind the data
      this.barData = google.visualization.arrayToDataTable(this._data);
      this.options = {
        title: this.chartTitleComponent ? this.chartTitleComponent.title : null,
        titleTextStyle: this.chartTitleComponent ? this.chartTitleTextStyle() : null,
        isStacked: this.stacked,
        backgroundcolor: this.backgroundcolor,
        legend: this.chartLengendComponent ? this.createChartLegend() : 'none',
        chartArea: this.chartAreaComponent ? this.createChartBar() : null,
        hAxis: {
          title: this.xaxistitle, minvalue: 0,
        },
        vAxis: {
          title: this.yaxistitle,
        },
      };
      if (this.barData) {
        this.chart = new google.visualization.BarChart(this.barchart.nativeElement);
        this.hasLoaded = true;
        this.chart.draw(this.barData, this.options);
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
createChartLegend() {
  return{
    position: this.chartLengendComponent.position ? this.chartLengendComponent.position : null,
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
createChartBar() {
return{
  backgroundcolor: this.chartAreaComponent.chartbackgroundcolor ? this.chartAreaComponent.chartbackgroundcolor : null,
  left: this.chartAreaComponent.leftposition ? this.chartAreaComponent.leftposition : null,
  top: this.chartAreaComponent.topposition ? this.chartAreaComponent.topposition : null,
  height: this.chartAreaComponent.chartheight ? this.chartAreaComponent.chartheight : null,
  width: this.chartAreaComponent.chartwidth ? this.chartAreaComponent.chartwidth : null,
  };
}
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

  ngOnInit(): void {
    this.hasLoaded = false;
    this.loader.loadCharts('BarChart').subscribe((value) => console.log(), (errror) => console.error(errror), () => {
      this.drawChart();
    });
  }

  onResize(event: any) {
    this.drawChart();
  }

}
