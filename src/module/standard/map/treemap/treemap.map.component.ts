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
*  Created by sagar on 18/8/17.
*/
import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter,
Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';

import { MapTitleComponent } from '../maptitle/map.title.component';

import { MapLoaderService } from '../map.loader.service';
declare var google: any;
@Component({
  selector: 'amexio-map-treemap', template: `
    <div *ngIf="showChart" #treemapmap
         [style.width]="width"
         [style.height]="height" (window:resize)="onResize($event)"
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

export class TreeMapComponent implements AfterContentInit, OnInit {

  private options: any;
  private treemapData: any;
  private chart: any;
  hasLoaded: boolean;
  id: any;
  /*
  Properties
  name : width
  datatype : string
  version : 4.0 onwards
  default : none
  description : Width of chart.
  */
  @Input() width: string;
  /*
  Properties
  name : height
  datatype : string
  version : 4.0 onwards
  default : none
  description : height of chart.
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
  description : Local data for TreeMap.
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
 name : min-color
 datatype : string
 version : 4.0 onwards
 default : none
 description : The color for a rectangle with the column 3 value of min-colorValue. Specify an HTML color value.
 */
  @Input('min-color') mincolor: string;
  /*
  Properties
  name : mid-color
  datatype : string
  version : 4.0 onwards
  default : none
  description : The color for a rectangle with a column 3
  value midway between max-colorValue and min-colorValue.
  Specify an HTML color value.
  */
  @Input('mid-color') midcolor: string;
  /*
  Properties
  name : max-color
  datatype : string
  version : 4.0 onwards
  default : none
  description : The color for a rectangle with a column 3 value of max-colorValue. Specify an HTML color value.
  */
  @Input('max-color') maxcolor: string;
  /*
  Properties
  name : show-scale
  datatype : boolean
  version : 4.0 onwards
  default : none
  description : Whether or not to show a color gradient scale from
  min-color to max-color along the top of the chart. Specify true to
  show the scale.
  */
  @Input('show-scale') showscale: boolean;
  /*
  Properties
  name : max-post-depth
  datatype : number
  version : 4.0 onwards
  default : none
  description : number of levels of nodes beyond maxDepth to show in 'hinted' fashion.
  */
  @Input('max-post-depth') maxpostdepth: number;

  @Output() onClick = new EventEmitter<any>();

  @ContentChildren(MapTitleComponent) maptleComp: QueryList<MapTitleComponent>;

  mapTitleArray: MapTitleComponent[];

  mapTitleComponent: MapTitleComponent;

  @ViewChild('treemapmap') private treemapmap: ElementRef;

  constructor(private loader: MapLoaderService) {

    this.width = '100%';
  }

  drawChart() {
    let chart: any;
    const localData = this._data;
    if (this.showChart) {
      this.treemapData = google.visualization.arrayToDataTable(this._data);
      this.initializeOptions();

      if (this.treemapData) {
        chart = new google.visualization.TreeMap(this.treemapmap.nativeElement);
        this.hasLoaded = true;
        chart.draw(this.treemapData, this.options);
        google.visualization.events.addListener(chart, 'select', (eve: any, event: any) => {
          localData.forEach((element: any, index: any) => {
            if ((chart.getSelection())[0].row + 1 === index) {
              this.onClick.emit(element);
            }
          });
        });
      }
    }
  }

  initializeOptions() {
    this.options = {
      title: this.mapTitleComponent ? this.mapTitleComponent.title : null,
      titleTextStyle: this.mapTitleComponent ? this.mapTitleTextStyle() : null,
      mincolor: this.mincolor ? this.mincolor : null, midcolor: this.midcolor ? this.midcolor : null,
      maxcolor: this.maxcolor ? this.maxcolor : null, headerHeight: 15, fontcolor: 'black',
      showscale: this.showscale ? this.showscale : false,
      maxpostdepth: this.maxpostdepth ? this.maxpostdepth : 1,
    };
  }
  mapTitleTextStyle() {
    return {
      color: this.mapTitleComponent.color ? this.mapTitleComponent.color : null,
      fontName: this.mapTitleComponent.fontname ? this.mapTitleComponent.fontname : null,
      bold: this.mapTitleComponent.bold ? this.mapTitleComponent.bold : null,
      italic: this.mapTitleComponent.italic ? this.mapTitleComponent.italic : null,
    };
  }

  click(e: any) {
  }

  ngAfterContentInit(): void {
    this.mapTitleArray = this.maptleComp.toArray();
    if (this.mapTitleArray.length === 1) {
      this.mapTitleComponent = this.mapTitleArray.pop();
    }
  }

  ngOnInit(): void {
    this.hasLoaded = false;
    this.loader.loadCharts('TreeMap').subscribe((value) => console.log(), (errror) => console.error(errror), () => {
      this.drawChart();
    });
  }

  onResize(event: any) {
    this.drawChart();
  }
}
