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
import {ChartTitleComponent} from "../charttitle/chart.title.component";
import {ChartLegendComponent} from "../chartlegend/chart.legend.component";
import {ChartLoaderService} from "../chart.loader.service";
import {ChartAreaComponent} from "../chartarea/chart.area.component";
declare var google: any;
@Component({
  selector: 'amexio-chart-pie', template: `
        <div [attr.id]="id"
             [style.width]="width"
             [style.height]="height"
        ></div>
  `
})
export class PieChartComponent implements AfterContentInit,OnInit {

  private options;
  private pieData;
  private chart;

  id: any;

  @Input() width: string;

  @Input() height: string;


  @Input() is3D: boolean = false;

  //this input for hole inside pie chart
  @Input() pieHole: number;

  @Input() data: any;

  //this input for angle rotation start
  @Input() pieStartAngle: number;

  @Input() backgroundColor: string;

  @ContentChildren(ChartLegendComponent) chartLegendComp: QueryList<ChartLegendComponent>;

  @ContentChildren(ChartTitleComponent) chartTitleComp: QueryList<ChartTitleComponent>;

  @ContentChildren(ChartAreaComponent)  chartAreaComp:QueryList<ChartAreaComponent>;

  chartAreaArray:ChartAreaComponent[];

  chartAreaComponent:ChartAreaComponent;

  chartLegendArray: ChartLegendComponent[];

  chartLengendComponent: ChartLegendComponent;

  chartTitleArray: ChartTitleComponent[];

  chartTitleComponent: ChartTitleComponent;

  constructor(private loader: ChartLoaderService) {
    this.id = 'amexio-chart-pie' + Math.floor(Math.random()*90000) + 10000;
    this.width='100%';
  }

  drawChart() {
    this.pieData = google.visualization.arrayToDataTable(this.data);
    this.options = {
      title: this.chartTitleComponent? this.chartTitleComponent.title : null,
      titleTextStyle: this.chartTitleComponent?{
        color: this.chartTitleComponent.titleColor ? this.chartTitleComponent.titleColor : null,
        fontName: this.chartTitleComponent.titleFontName ? this.chartTitleComponent.titleFontName : null,
        fontSize: this.chartTitleComponent.titleFontSize ? this.chartTitleComponent.titleFontSize : null,
        bold: this.chartTitleComponent.isTitleBold ? this.chartTitleComponent.isTitleBold : null,
        italic: this.chartTitleComponent.isTitleItalic ? this.chartTitleComponent.isTitleItalic : null
      }:null,
      is3D: this.is3D,
      pieHole: this.pieHole,
      pieStartAngle: this.pieStartAngle,
      backgroundColor: this.backgroundColor,
      legend: this.chartLengendComponent ? {
        position: this.chartLengendComponent.legendPosition ? this.chartLengendComponent.legendPosition : null, //this work only in chart position is top
        maxLines: this.chartLengendComponent.maxLinesOfLegend ? this.chartLengendComponent.maxLinesOfLegend : null,
        textStyle: {
          color: this.chartLengendComponent.legendColor ? this.chartLengendComponent.legendColor : null,
          fontSize: this.chartLengendComponent.legendFontSize ? this.chartLengendComponent.legendFontSize : null,
          fontName: this.chartLengendComponent.legendFontName ? this.chartLengendComponent.legendFontName : null,
          bold: this.chartLengendComponent.isLegendBold ? this.chartLengendComponent.isLegendBold : null,
          alignment: this.chartLengendComponent.legendAlignment ? this.chartLengendComponent.legendAlignment : null
        }
      } : 'none',
      chartArea: this.chartAreaComponent ? {
        backgroundColor: this.chartAreaComponent.chartBackgroundColor ? this.chartAreaComponent.chartBackgroundColor : null,
        left: this.chartAreaComponent.leftPosition ? this.chartAreaComponent.leftPosition : null,
        top: this.chartAreaComponent.topPosition ? this.chartAreaComponent.topPosition : null,
        height: this.chartAreaComponent.chartHeightInper ? this.chartAreaComponent.chartHeightInper : null,
        width: this.chartAreaComponent.chartWidthInPer ? this.chartAreaComponent.chartWidthInPer : null
      } : null,
    };
    this.chart = new google.visualization.PieChart(document.getElementById(this.id));
    this.chart.draw(this.pieData, this.options);
    google.visualization.events.addListener(this.chart, 'click', this.onClick);
  }

  onClick(e) {
    debugger
  }

  //after content init for inner directive is run
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
    //call draw chart method
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(() => this.drawChart());
  }
}

