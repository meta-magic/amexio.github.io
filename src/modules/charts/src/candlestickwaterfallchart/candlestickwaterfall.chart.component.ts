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
import {ChartAreaComponent} from "../chartarea/chart.area.component";
import {HorizontalAxisComponent} from "../horizontalaxis/chart.horizontalaxis.component";
import {VerticalAxisComponent} from "../verticalaxis/chart.verticalaxis.component";
import {ChartTitleComponent} from "../charttitle/chart.title.component";

declare var google: any;
@Component({
  selector: 'amexio-chart-candlestick-waterfall',
  template: `
      <div [attr.id]="id"
           [style.width]="width"
           [style.height]="height" (window:resize)="onResize($event)">

      </div>
  `
})

export class CandlestickWaterfallChartComponent  implements AfterContentInit ,OnInit{

  private options;
  private candlestickData;
  private chart;

  id: any;

  @Input() width: string;

  @Input() height: string;

  @Input() data: any;

  @Input() backgroundColor: string;

  @Input() barWidthGroup:string;

  @Input() fallingColorOfBar:string;

  @Input() risingColorOfBar:string;

  @ContentChildren(ChartAreaComponent)  chartAreaComp:QueryList<ChartAreaComponent>;

  @ContentChildren(ChartTitleComponent) chartTitleComp:QueryList<ChartTitleComponent>;


  @ContentChildren(HorizontalAxisComponent) horizontalComp:QueryList<HorizontalAxisComponent>;

  horizontalArray:HorizontalAxisComponent[];

  horizontalComponent:HorizontalAxisComponent;

  @ContentChildren(VerticalAxisComponent) verticalComp:QueryList<VerticalAxisComponent>;

  verticalArray:HorizontalAxisComponent[];

  verticalComponent:HorizontalAxisComponent;

  chartAreaArray:ChartAreaComponent[];

  chartAreaComponent:ChartAreaComponent;

  chartTitleArray:ChartTitleComponent[];

  chartTitleComponent:ChartTitleComponent;

  constructor() {
    this.id = 'amexio-chart-candlestick-waterfall' + Math.floor(Math.random()*90000) + 10000;
    this.width='100%';
  }

  drawChart() {
    this.candlestickData = google.visualization.arrayToDataTable(this.data,true);
    this.options = {
      title: this.chartTitleComponent?this.chartTitleComponent.title:null,
      titleTextStyle:this.chartTitleComponent?{
        color:this.chartTitleComponent.titleColor?this.chartTitleComponent.titleColor:null,
        fontName:this.chartTitleComponent.titleFontName?this.chartTitleComponent.titleFontName:null,
        fontSize:this.chartTitleComponent.titleFontSize?this.chartTitleComponent.titleFontSize:null,
        bold:this.chartTitleComponent.isTitleBold?this.chartTitleComponent.isTitleBold:null,
        italic:this.chartTitleComponent.isTitleItalic?this.chartTitleComponent.isTitleItalic:null
      }:null,
      backgroundColor: this.backgroundColor,
      legend:'none',
      chartArea:this.chartAreaComponent?{
        backgroundColor:this.chartAreaComponent.chartBackgroundColor?this.chartAreaComponent.chartBackgroundColor:null,
        left:this.chartAreaComponent.leftPosition?this.chartAreaComponent.leftPosition:null,
        top:this.chartAreaComponent.topPosition?this.chartAreaComponent.topPosition:null,
        height:this.chartAreaComponent.chartHeightInper?this.chartAreaComponent.chartHeightInper:null,
        width:this.chartAreaComponent.chartWidthInPer?this.chartAreaComponent.chartWidthInPer:null
      }:null,
      vAxis:this.verticalComponent? {title: this.verticalComponent.title ?this.verticalComponent.title:null,titleTextStyle:{color:this.verticalComponent.titleTextColor? this.verticalComponent.titleTextColor:null}}:null,
      hAxis: this.horizontalComponent? {title: this.horizontalComponent.title ? this.horizontalComponent.title:null,titleTextStyle:{color:this.horizontalComponent.titleTextColor? this.horizontalComponent.titleTextColor:null}}:null,
      bar: { groupWidth: this.barWidthGroup ? this.barWidthGroup:null }, // Remove space between bars.
      candlestick: {
        fallingColor:this.fallingColorOfBar? { strokeWidth: 0, fill: this.fallingColorOfBar ?this.fallingColorOfBar:null }:null, // red
        risingColor: this.risingColorOfBar?{ strokeWidth: 0, fill: this.risingColorOfBar ?this.risingColorOfBar :null}:null  // green
      }
    };
    this.chart =  new google.visualization.CandlestickChart(document.getElementById(this.id));
    this.chart.draw(this.candlestickData, this.options);
    google.visualization.events.addListener(this.chart, 'click', this.click)
  }

  click(e) {

  }

  //after content init for inner directive is run
  ngAfterContentInit(): void{
    this.chartAreaArray=this.chartAreaComp.toArray();
    this.horizontalArray=this.horizontalComp.toArray();
    this.verticalArray=this.verticalComp.toArray();
    this.chartTitleArray=this.chartTitleComp.toArray();

    //take first component
    if(this.chartTitleArray.length==1){
      this.chartTitleComponent= this.chartTitleArray.pop();
    }
    if(this.chartAreaArray.length==1){
      this.chartAreaComponent=this.chartAreaArray.pop();
    }
    if(this.horizontalArray.length==1){
      this.horizontalComponent=this.horizontalArray.pop();
    }
    if(this.verticalArray.length==1){
      this.verticalComponent=this.verticalArray.pop();
    }
  }

  ngOnInit(): void {
    this.createChart();
  }
  createChart(){
    //call draw chart method
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(() => this.drawChart());
  }
  onResize(event){
    this.createChart();
  }
}
