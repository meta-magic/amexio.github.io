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
import {Component, Input, OnInit} from '@angular/core';
import {ChartBaseClass} from "../baseclass/base.chart.class";
import {ChartLoaderService} from "../chart.loader.service";
declare var google: any;
@Component({
  selector: 'amexio-chart-gauge',
  template: `
    <div [attr.id]="id"
         [style.width.px]="width"
         [style.height.px]="height"
    >
    </div>
  `
})

export class GaugeChartComponent extends ChartBaseClass implements OnInit{

  private options;
  private gaugeData;
  private chart;

  id: any;

  @Input() width: number;

  @Input() height: number;

  @Input() data: any;

  @Input() redColorFrom:number;

  @Input() redColorTo:number;

  @Input() yellowColorFrom:number;

  @Input() yellowColorTo:number;

  //allow to show minor ticks
  @Input() minorTicks:number;

    constructor(private loader : ChartLoaderService) {
    super(loader);
    this.id = 'amexio-chart-gauge' + Math.random();
  }
  drawChart() {
    this.gaugeData = this.createDataTable(this.data);
    this.options = {
      width: this.width,
      height: this.height,
      redFrom: this.redColorFrom,
      redTo: this.redColorTo,
      yellowFrom:this.yellowColorFrom,
      yellowTo:this.yellowColorTo,
      minorTicks: this.minorTicks
    };
    this.chart = this.createGaugeChart(document.getElementById(this.id));
    this.chart.draw(this.gaugeData, this.options);
  }
  ngOnInit(): void {
    //call draw chart method
    google.charts.setOnLoadCallback(() => this.drawChart());
  }
}
