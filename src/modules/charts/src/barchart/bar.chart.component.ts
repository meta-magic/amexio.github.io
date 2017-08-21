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

import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from "@angular/core";
import {ChartLegendComponent} from "../chartlegend/chart.legend.component";
import {ChartTitleComponent} from "../charttitle/chart.title.component";
import {ChartLoaderService} from "../chart.loader.service";
import {ChartAreaComponent} from "../chartarea/chart.area.component";
declare var google;
@Component({
    selector: 'amexio-chart-bar',
    template: `
        <div [attr.id]="id"
             [style.width]="width"
             [style.height]="height"  (window:resize)="onResize($event)">
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
export class BarChartComponent implements AfterContentInit,OnInit{

    private options;
    private barData;
    private chart;

     hasLoaded:boolean;
    id: any;

    @Input() data: any;

    @Input() width: string;

    @Input() height: string;

    //showing stack chart
    @Input() isStacked: boolean = false;

    @Input() xAxisTitle: string;

    @Input() yAxisTitle: string;

    @Input() backgroundColor: string;

    @ContentChildren(ChartLegendComponent) chartLegendComp: QueryList<ChartLegendComponent>;

    @ContentChildren(ChartTitleComponent) chartTitleComp:QueryList<ChartTitleComponent>;

    @ContentChildren(ChartAreaComponent)  chartAreaComp:QueryList<ChartAreaComponent>;

    chartAreaArray:ChartAreaComponent[];

    chartAreaComponent:ChartAreaComponent;

    chartLegendArray: ChartLegendComponent[];

    chartLengendComponent: ChartLegendComponent;

    chartTitleArray:ChartTitleComponent[];

    chartTitleComponent:ChartTitleComponent;


    constructor(private loader : ChartLoaderService) {

        this.id = 'amexio-chart-bar' + Math.floor(Math.random()*90000) + 10000;
        this.width='100%';
    }

    drawChart() {
        //bind the data
        this.barData = google.visualization.arrayToDataTable(this.data);

        this.options = {
            title: this.chartTitleComponent?this.chartTitleComponent.title:null,
            titleTextStyle:this.chartTitleComponent?{
                color:this.chartTitleComponent.titleColor?this.chartTitleComponent.titleColor:null,
                fontName:this.chartTitleComponent.titleFontName?this.chartTitleComponent.titleFontName:null,
                fontSize:this.chartTitleComponent.titleFontSize?this.chartTitleComponent.titleFontSize:null,
                bold:this.chartTitleComponent.isTitleBold?this.chartTitleComponent.isTitleBold:null,
                italic:this.chartTitleComponent.isTitleItalic?this.chartTitleComponent.isTitleItalic:null
            }:null,
            isStacked: this.isStacked,
            backgroundColor: this.backgroundColor,
            legend: this.chartLengendComponent ? {
                position: this.chartLengendComponent.legendPosition ? this.chartLengendComponent.legendPosition : null,
                maxLines: this.chartLengendComponent.maxLinesOfLegend ? this.chartLengendComponent.maxLinesOfLegend : null,
                textStyle: {
                    color: this.chartLengendComponent.legendColor ? this.chartLengendComponent.legendColor : null,
                    fontSize: this.chartLengendComponent.legendFontSize ? this.chartLengendComponent.legendFontSize : null,
                    fontName: this.chartLengendComponent.legendFontName ? this.chartLengendComponent.legendFontName : null,
                    bold: this.chartLengendComponent.isLegendBold ? this.chartLengendComponent.isLegendBold : null,
                    alignment: this.chartLengendComponent.legendAlignment ? this.chartLengendComponent.legendAlignment : null
                }
            } : 'none',
            chartArea:this.chartAreaComponent?{
                backgroundColor:this.chartAreaComponent.chartBackgroundColor?this.chartAreaComponent.chartBackgroundColor:null,
                left:this.chartAreaComponent.leftPosition?this.chartAreaComponent.leftPosition:null,
                top:this.chartAreaComponent.topPosition?this.chartAreaComponent.topPosition:null,
                height:this.chartAreaComponent.chartHeightInper?this.chartAreaComponent.chartHeightInper:null,
                width:this.chartAreaComponent.chartWidthInPer?this.chartAreaComponent.chartWidthInPer:null
            }:null,
            hAxis: {
                title: this.xAxisTitle, minValue: 0
            },
            vAxis: {
                title: this.yAxisTitle
            }
        };
        this.chart = new google.visualization.BarChart(document.getElementById(this.id));
         this.hasLoaded=true;
        this.chart.draw(this.barData, this.options);
    }

    ngAfterContentInit(): void {
        this.chartLegendArray = this.chartLegendComp.toArray();
        this.chartTitleArray=this.chartTitleComp.toArray();
        this.chartAreaArray=this.chartAreaComp.toArray();
        //take first component
        if (this.chartLegendArray.length == 1) {
            this.chartLengendComponent = this.chartLegendArray.pop();
        }
        if(this.chartTitleArray.length==1){
            this.chartTitleComponent= this.chartTitleArray.pop();
        }
        if(this.chartAreaArray.length==1){
            this.chartAreaComponent=this.chartAreaArray.pop();
        }
    }
    ngOnInit(): void {
      this.hasLoaded = false;
      this.loader.loadCharts('BarChart').subscribe(
        value=>console.log(),
        errror=>console.error(errror),
        ()=> {
          this.drawChart();
        }
      );
    }
    onResize(event){
      this.drawChart();
    }

}
