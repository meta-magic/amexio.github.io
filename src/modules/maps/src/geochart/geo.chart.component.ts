/**
 * Created by sagar on 10/8/17.
 */
import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {MapLoaderService} from "../map.loader.service";
import {MapProperties} from "../mapproperties/map.properties";

declare var google: any;
@Component({
  selector: 'amexio-map-geo-chart',
  template: `
      <div [attr.id]="id"
           [style.width]="width"
           [style.height]="height"
      >
        <div *ngIf="!hasLoaded" class="lmask">
        </div>
      </div>
  `,
  styles:[`.lmask {
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

  `]
})

export class GeoChartComponent implements AfterContentInit ,OnInit{

  private options;
  private geomapData;
  private chart;

  hasLoaded:boolean;
  id: any;

  @Input() width: string;

  @Input() height: string;

  @Input() data: any;

  @Input() displayCountryName:boolean=false;

  @Input() regionCode:string;

  @Input() backgroundColor:string;

  @Input() datalessRegionColor:string;

    @ContentChildren(MapProperties)  chartAreaComp:QueryList<MapProperties>;

  chartAreaArray:MapProperties[];

  chartAreaComponent:MapProperties;

  constructor(private loader : MapLoaderService) {
    this.id='amexio-map-geomap'+ Math.floor(Math.random()*90000) + 10000;
    this.width='100%';
  }
  drawChart() {
    this.geomapData = google.visualization.arrayToDataTable(this.data);
    this.options = {
      displayMode:this.displayCountryName?'text':null,
      region:this.regionCode?this.regionCode:null,
      backgroundColor:this.backgroundColor?this.backgroundColor:null,
      datalessRegionColor:this.datalessRegionColor?this.datalessRegionColor:null,
      chartArea:this.chartAreaComponent?{
        backgroundColor:this.chartAreaComponent.chartBackgroundColor?this.chartAreaComponent.chartBackgroundColor:null,
        left:this.chartAreaComponent.leftPosition?this.chartAreaComponent.leftPosition:null,
        top:this.chartAreaComponent.topPosition?this.chartAreaComponent.topPosition:null,
        height:this.chartAreaComponent.chartHeightInper?this.chartAreaComponent.chartHeightInper:null,
        width:this.chartAreaComponent.chartWidthInPer?this.chartAreaComponent.chartWidthInPer:null
      }:null,
    };
    this.chart = new google.visualization.GeoChart(document.getElementById(this.id));
    this.hasLoaded=true;
    this.chart.draw(this.geomapData, this.options);
    google.visualization.events.addListener(this.chart, 'click', this.click);
  }

  click(e){
  }
  ngAfterContentInit(): void {
    this.chartAreaArray=this.chartAreaComp.toArray();
    if(this.chartAreaArray.length==1){
      this.chartAreaComponent=this.chartAreaArray.pop();
    }
  }
  ngOnInit(): void {
  this.hasLoaded=false;
    this.loader.loadCharts('GeoChart').subscribe(
      value=>console.log(),
      errror=>console.error(errror),
      ()=> {
        this.drawChart();
      }
    );
  }
}
