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
import {ChartLoaderService} from "../chart.loader.service";
import {ChartTitleComponent} from "../charttitle/chart.title.component";
declare var google: any;
@Component({
  selector: 'amexio-chart-gauge',
  template: `
      <div [attr.id]="id"
           [style.width]="width"
           [style.height]="height">
      </div>
  `
})

export class GaugeChartComponent implements AfterContentInit , OnInit{

  private options;
  private gaugeData;
  private chart;

  id: any;

  elementId:string;

  @Input() width: string;

  @Input() height: string;

  @Input() data: any;

  @Input() redColorFrom:number;

  @Input() redColorTo:number;

  @Input() yellowColorFrom:number;

  @Input() yellowColorTo:number;

  //allow to show minor ticks
  @Input() minorTicks:number;

  @ContentChildren(ChartTitleComponent) chartTitleComp : QueryList<ChartTitleComponent>;

  chartTitleArray:ChartTitleComponent[];

  chartTitleComponent:ChartTitleComponent;

  constructor(private loader : ChartLoaderService) {
    this.id = 'amexio-chart-gauge' + Math.floor(Math.random()*90000) + 10000;
    this.width='100%';
  }
  drawChart() {
    this.gaugeData =  google.visualization.arrayToDataTable(this.data);
    this.options = {
      width: this.width,
      height: this.height,
      redFrom: this.redColorFrom,
      redTo: this.redColorTo,
      yellowFrom:this.yellowColorFrom,
      yellowTo:this.yellowColorTo,
      minorTicks: this.minorTicks
    };
    this.chart= new google.visualization.Gauge(document.getElementById(this.id));
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
    //call draw chart method
    google.charts.load('current', {packages: ['gauge']});
    google.charts.setOnLoadCallback(() => this.drawChart());
  }
}
