/*
 * Copyright 2017-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Sagar Jadhav
 *
 */

 /*
Component Name : Amexio Gantt chart
Component Selector : <amexio-chart-gantt>
Component Description : A timeline is a chart that depicts how a set of resources are used over time.
*/

import {Component, ContentChildren, ElementRef, Input, OnInit, QueryList, ViewChild} from '@angular/core';
import {ChartLoaderService} from '../chart.loader.service';
declare var google: any;
@Component({
  selector: 'amexio-chart-gantt', template: `
    <div *ngIf='showChart' #gantt
         [style.width]='width'
    >
      <div *ngIf='!hasLoaded' class='lmask'>
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
export class GanttChartComponent implements OnInit {

  private chart: any;

  id: any;

/*
Properties
name : width
datatype : string
version : 4.3 onwards
default : none
description : width of chart
*/
@Input() width: string;

  showChart: boolean;
  _data: any;

  get data(): any {
    return this._data;
  }

/*
Properties
name : data
datatype : any
version : 4.3 onwards
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

  /*
Properties
name : critical-path-enabled
datatype : boolean
version : 4.3 onwards
default : false
description : If you set the criticalPathEnabled option to true, it show critical path line
*/
@Input('critical-path-enabled') criticalPathEnabled = false;

  /*
Properties
name : critical-path-enabled
datatype : boolean
version : 4.3 onwards
default : false
description : inner-grid-track-color set inner grid color
*/
@Input('inner-grid-track-color') innerGridTrackColor: string;

  /*
Properties
name : inner-grid-dark-track-color
datatype : string
version : 4.3 onwards
default : false
description : inner-grid-dark-track-color set inner grid dark color
*/
@Input('inner-grid-dark-track-color') innerGridDarkTrack: string;

  hasLoaded: boolean;

  private options: any;

  @ViewChild('gantt') private ganttchart: ElementRef;

  constructor(private loader: ChartLoaderService) {
    this.width = '100%';
  }

  drawChart() {
    if (this.data && this.showChart) {
      this.hasLoaded = true;
      this.options = {gantt: {criticalPathEnabled: this.criticalPathEnabled,
          criticalPathStyle: {stroke: '#e64a19',
            strokeWidth: 5}},
        innerGridTrack: {fill: this.innerGridTrackColor ? this.innerGridTrackColor : ''},
        innerGridDarkTrack: {fill: this.innerGridDarkTrack ? this.innerGridDarkTrack : ''},
      };
      if ( google && google.visualization) {
        this.chart = new google.visualization.Gantt(this.ganttchart.nativeElement);
        this.chart.draw(this.createTable(this._data), this.options);
        google.visualization.events.addListener(this.chart, 'click', this.onClick);

      } else {
        this.hasLoaded = false;
      }
    }
  }

  onClick(e: any) {
  }

 createTable(array: any[]): any {
    const copyOfArray = array.slice();
    const data = new google.visualization.DataTable();
    const labelObject = copyOfArray[0];
    copyOfArray.shift();
    labelObject.forEach((datatypeObject: any) => {
      data.addColumn(datatypeObject.datatype, datatypeObject.label);
    });
    const newArray: any[] = [];
    copyOfArray.forEach((rowObject: any) => {
      newArray.push(rowObject);
    });
    data.addRows(newArray);
    return data;
  }

  ngOnInit(): void {
    this.hasLoaded = false;
    this.loader.loadCharts('Gantt').subscribe((value) => console.log(), (errror) => console.error(errror), () => {
      this.drawChart();
    });
  }
}
