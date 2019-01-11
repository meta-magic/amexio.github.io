/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by Sagar.
*/

/*
 Component Name : Amexio gaugechart
 Component Selector : <amexio-dashboard-gauge>
 Component Description : A gauge with a dial,rendered within the browser using SVG.
 Gauges are available under AmexioDashboardModule from amexio-ng-extensions/dashboard
*/
import {AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, ViewChild} from '@angular/core';
import {DashboardLoaderService} from '../chart.loader.service';
import {DashBoardTitleComponent} from '../dashboardtitle/dashboard.title.component';
declare var google: any;
@Component({
  selector: 'amexio-dashboard-gauge', template: `
    <div *ngIf="showChart" #gaugedashboard
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

  ` ] ,
})

export class GaugeChartComponent implements AfterContentInit, OnInit {

  private options: any;
  private gaugeData: any;
  private chart: any;

  id: any;
  hasLoaded: boolean;

  elementId: string;

  /*
Properties
name : width
datatype :  string
version : 4.0 onwards
default : none
description :  Width of chart
*/
  @Input() width: string;

  /*
Properties
name : height
datatype :  string
version : 4.0 onwards
default : none
description :  Height of chart
*/
  @Input() height: string;

  showChart: boolean;
  _data: any;

  get data(): any{
    return this._data;
  }

/*
Properties
name : data
datatype : any
version : 4.0 onwards
default : none
description : Local data for gauge chart
*/
  @Input('data')
  set data(data: any){
    if (data) {
    this._data = data;
    this.showChart = true;
    } else {
    this.showChart = false;
    }
  }

/*
Properties
name : red-color-from
datatype : number
version : 4.0 onwards
default : none
description : The lowest value for a range marked by a red color.
*/
  @Input('red-color-from') redcolorfrom: number;

  /*
Properties
name : red-color-from
datatype : number
version : 4.0 onwards
default : none
description : The highest value for a range marked by a red color.
*/
  @Input('red-color-to') redcolorto: number;

   /*
Properties
name : yellow-color-from
datatype : number
version : 4.0 onwards
default : none
description : The lowest value for a range marked by a yellow color.
*/
  @Input('yellow-color-from') yellowcolorfrom: number;

   /*
Properties
name : yellow-color-to
datatype : number
version : 4.0 onwards
default : none
description : The highest value for a range marked by a yellow color.
*/
  @Input('yellow-color-to') yellowcolorto: number;

  // allow to show minor ticks
     /*
Properties
name : scale-value
datatype : number
version : 4.0 onwards
default : none
description : The number of minor tick section in each major tick section.
*/
  @Input('scale-value') scalevalue: number;

  @ContentChildren(DashBoardTitleComponent) chartTitleComp: QueryList<DashBoardTitleComponent>;

  chartTitleArray: DashBoardTitleComponent[];

  chartTitleComponent: DashBoardTitleComponent;

  @ViewChild('gaugedashboard') private gaugedashboard: ElementRef;

  constructor(private loader: DashboardLoaderService) {
    this.width = '100%';
  }

  drawChart() {
    if (this.showChart) {
      this.gaugeData = google.visualization.arrayToDataTable(this._data);
      this.options = {
        width: this.width,
        height: this.height,
        redFrom: this.redcolorfrom,
        redTo: this.redcolorto,
        yellowFrom: this.yellowcolorfrom,
        yellowTo: this.yellowcolorto,
        scalevalue: this.scalevalue,
      };
      if (this.gaugeData) {
        this.chart = new google.visualization.Gauge(this.gaugedashboard.nativeElement);
        this.hasLoaded = true;
        this.chart.draw(this.gaugeData, this.options);
      }
    }
  }

  ngAfterContentInit(): void {
    this.chartTitleArray = this.chartTitleComp.toArray();
    // take first component
    if (this.chartTitleArray.length === 1) {
      this.chartTitleComponent = this.chartTitleArray.pop();
    }
  }
  ngOnInit(): void {
    this.hasLoaded = false;
    this.loader.loadCharts('Gauge').subscribe((value: any) => console.log(), (errror: any) => console.error(errror), () => {
      this.drawChart();
    });
  }

  onResize(event: any) {
    this.drawChart();
  }
}
