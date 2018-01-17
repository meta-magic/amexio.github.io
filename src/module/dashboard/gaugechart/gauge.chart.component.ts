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
import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {DashboardLoaderService} from "../chart.loader.service";
import {DashBoardTitle} from "../dashboardtitle/dashboard.title.component";
declare var google: any;
@Component({
  selector: 'amexio-dashboard-gauge',
  template: `
      <div [attr.id]="id"
           [style.width]="width"
           [style.height]="height" (window:resize)="onResize($event)" >
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

export class GaugeChartComponent implements AfterContentInit , OnInit{

  private options:any;
  private gaugeData:any;
  private chart:any;

  id: any;
  hasLoaded:boolean;

  elementId:string;

  @Input() width: string;

  @Input() height: string;

  @Input() data: any;

  @Input() redcolorfrom:number;

  @Input() redcolorto:number;

  @Input() yellowcolorfrom:number;

  @Input() yellowcolorto:number;

  //allow to show minor ticks
  @Input() scalevalue:number;

  @ContentChildren(DashBoardTitle) chartTitleComp : QueryList<DashBoardTitle>;

  chartTitleArray:DashBoardTitle[];

  chartTitleComponent:DashBoardTitle;

  constructor(private loader : DashboardLoaderService) {
    this.id = 'amexio-chart-gauge' + Math.floor(Math.random()*90000) + 10000;
    this.width='100%';
  }
  drawChart() {
    this.gaugeData =  google.visualization.arrayToDataTable(this.data);
    this.options = {
      width: this.width,
      height: this.height,
      redFrom: this.redcolorfrom,
      redTo: this.redcolorto,
      yellowFrom:this.yellowcolorfrom,
      yellowTo:this.yellowcolorto,
      scalevalue: this.scalevalue
    };
    this.chart= new google.visualization.Gauge(document.getElementById(this.id));
    this.hasLoaded=true;
    this.chart.draw(this.gaugeData, this.options);
  }
  ngAfterContentInit(): void {
    this.chartTitleArray=this.chartTitleComp.toArray();
    //take first component
    if(this.chartTitleArray.length==1){
      this.chartTitleComponent= this.chartTitleArray.pop();
    }
  }


  ngOnInit(): void {
    this.hasLoaded=false;
    this.loader.loadCharts('Gauge').subscribe(
      value=>console.log(),
      errror=>console.error(errror),
      ()=> {
        this.drawChart();
      }
    );
  }
  onResize(event:any){
    this.drawChart();
  }
}
