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
import {ChartLegendComponent} from "../chartlegend/chart.legend.component";
import {ChartTitleComponent} from "../charttitle/chart.title.component";
import {ChartAreaComponent} from "../chartarea/chart.area.component";
import {ChartLoaderService} from "../chart.loader.service";

declare var google: any;
@Component({
  selector: 'amexio-chart-donut', template: `
    <div [attr.id]="id"
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

  `]
})

export class DonutChartComponent implements AfterContentInit {

  private options: any;
  private donutData: any;
  private chart: any;

  id: any;

  @Input() width: string;

  @Input() height: string;

  @Input() data: any;

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

  constructor(private loader: ChartLoaderService) {
    this.id = 'amexio-chart-donut' + Math.floor(Math.random() * 90000) + 10000;
    this.width = '100%';
  }

  drawChart() {
    this.donutData = google.visualization.arrayToDataTable(this.data);
    this.options = {
      title: this.chartTitleComponent ? this.chartTitleComponent.title : null,
      titleTextStyle: this.chartTitleComponent ? {
        color: this.chartTitleComponent.color ? this.chartTitleComponent.color : null,
        fontName: this.chartTitleComponent.fontname ? this.chartTitleComponent.fontname : null,
        fontsize: this.chartTitleComponent.fontsize ? this.chartTitleComponent.fontsize : null,
        bold: this.chartTitleComponent.bold ? this.chartTitleComponent.bold : null,
        italic: this.chartTitleComponent.italic ? this.chartTitleComponent.italic : null
      } : null,
      piehole: 0.4,
      backgroundcolor: this.backgroundcolor,
      legend: this.chartLengendComponent ? {
        position: this.chartLengendComponent.position ? this.chartLengendComponent.position : null, //this work only in chart position is top
        maxLines: this.chartLengendComponent.maxlines ? this.chartLengendComponent.maxlines : null, textStyle: {
          color: this.chartLengendComponent.color ? this.chartLengendComponent.color : null,
          fontsize: this.chartLengendComponent.fontsize ? this.chartLengendComponent.fontsize : null,
          fontName: this.chartLengendComponent.fontname ? this.chartLengendComponent.fontname : null,
          bold: this.chartLengendComponent.bold ? this.chartLengendComponent.bold : null,
          alignment: this.chartLengendComponent.alignment ? this.chartLengendComponent.alignment : null
        }
      } : 'none',
      chartArea: this.chartAreaComponent ? {
        backgroundcolor: this.chartAreaComponent.chartbackgroundcolor ? this.chartAreaComponent.chartbackgroundcolor : null,
        left: this.chartAreaComponent.leftposition ? this.chartAreaComponent.leftposition : null,
        top: this.chartAreaComponent.topposition ? this.chartAreaComponent.topposition : null,
        height: this.chartAreaComponent.chartheight ? this.chartAreaComponent.chartheight : null,
        width: this.chartAreaComponent.chartwidth ? this.chartAreaComponent.chartwidth : null
      } : null,
    };
    this.chart = new google.visualization.PieChart(document.getElementById(this.id));
    this.hasLoaded = true;
    this.chart.draw(this.donutData, this.options);
    google.visualization.events.addListener(this.chart, 'click', this.onClick);
  }

  onClick(e: any) {

  }

  //after content init for inner directive is run
  ngAfterContentInit(): void {
    this.chartLegendArray = this.chartLegendComp.toArray();
    this.chartTitleArray = this.chartTitleComp.toArray();
    this.chartAreaArray = this.chartAreaComp.toArray();
    //take first component
    if (this.chartLegendArray.length == 1) {
      this.chartLengendComponent = this.chartLegendArray.pop();
    }
    if (this.chartTitleArray.length == 1) {
      this.chartTitleComponent = this.chartTitleArray.pop();
    }
    if (this.chartAreaArray.length == 1) {
      this.chartAreaComponent = this.chartAreaArray.pop();
    }
  }

  ngOnInit(): void {
    this.hasLoaded = false;
    this.loader.loadCharts('PieChart').subscribe(value => console.log(), errror => console.error(errror), () => {
      this.drawChart();
    });
  }

  onResize(event: any) {
    this.drawChart();
  }
}
