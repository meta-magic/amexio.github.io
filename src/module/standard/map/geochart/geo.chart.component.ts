/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*  Created by Sagar on 10/8/17..
*/
import { AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, ViewChild} from '@angular/core';
import { MapLoaderService } from '../map.loader.service';
import { MapPropertiesComponent} from '../mapproperties/map.properties';

declare var google: any;
@Component({
  selector: 'amexio-map-geo-chart', template: `
    <div *ngIf="showChart" #geochart
         [style.width]="width"
         [style.height]="height"
    >
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

export class GeoChartComponent implements AfterContentInit, OnInit {

  private options: any;
  private geomapData: any;
  private chart: any;

  hasLoaded: boolean;
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
  not in use
*/
  @Input('country-name') countryname = false;

  /* not in use
*/
  @Input('region-code') regioncode: string;

  /* not in use
*/
  @Input('background-color') backgroundcolor: string;
  /* not in use
  */
  @Input('unused-region-color') unusedregioncolor: string;

  @ContentChildren(MapPropertiesComponent) chartAreaComp: QueryList<MapPropertiesComponent>;

  chartAreaArray: MapPropertiesComponent[];
  chartAreaComponent: MapPropertiesComponent;
  @ViewChild('geochart') private geochart: ElementRef;

  constructor(private loader: MapLoaderService) {
    this.width = '100%';
  }
  drawChart() {
    if (this.showChart) {
      this.geomapData = google.visualization.arrayToDataTable(this._data);
      this.showChartExist();

      if (this.geomapData) {
        this.chart = new google.visualization.GeoChart(this.geochart.nativeElement);
        this.hasLoaded = true;
        this.chart.draw(this.geomapData, this.options);
        google.visualization.events.addListener(this.chart, 'click', this.click);
      }
    }
  }

  showChartExist() {
    this.options = {
      displayMode: this.countryname ? 'text' : null,
      region: this.regioncode ? this.regioncode : null,
      backgroundcolor: this.backgroundcolor ? this.backgroundcolor : null,
      unusedregioncolor: this.unusedregioncolor ? this.unusedregioncolor : null,
      chartArea: this.chartAreaComponent ? {
        backgroundcolor: this.chartAreaComponent.chartbackgroundcolor ? this.chartAreaComponent.chartbackgroundcolor : null,
        left: this.chartAreaComponent.leftposition ? this.chartAreaComponent.leftposition : null,
        top: this.chartAreaComponent.topposition ? this.chartAreaComponent.topposition : null,
        height: this.chartAreaComponent.chartheight ? this.chartAreaComponent.chartheight : null,
        width: this.chartAreaComponent.chartwidth ? this.chartAreaComponent.chartwidth : null,
      } : null,
    };
  }

  click(e: any) {
  }
  ngAfterContentInit(): void {
    this.chartAreaArray = this.chartAreaComp.toArray();
    if (this.chartAreaArray.length === 1) {
      this.chartAreaComponent = this.chartAreaArray.pop();
    }
  }

  ngOnInit(): void {
    this.hasLoaded = false;
    this.loader.loadCharts('GeoChart').subscribe((value) => console.log(), (errror) => console.error(errror), () => {
      this.drawChart();
    });
  }
}
