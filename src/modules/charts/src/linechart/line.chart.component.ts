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
import {ChartLegendComponent} from "../chartlegend/chart.legend.component";
import {ChartTitleComponent} from "../charttitle/chart.title.component";
import {ChartLoaderService} from "../chart.loader.service";

declare var google: any;
@Component({
  selector: 'amexio-chart-line', template: `
        <div [attr.id]="id"
             [style.width]="width"
             [style.height]="height"
        >
        </div>

  `
})

export class LineChartComponent implements AfterContentInit,OnInit {

  private options;
  private lineData;
  private chart;

  id: any;

  @Input() width: string;

  @Input() height: string;

  @Input() data: any;

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
    this.id = 'amexio-chart-line' + Math.floor(Math.random()*90000) + 10000;
    this.width='100%';
  }

  drawChart() {
    this.lineData = this.createTable(this.data);
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
      chartArea:this.chartAreaComponent?{
        backgroundColor:this.chartAreaComponent.chartBackgroundColor?this.chartAreaComponent.chartBackgroundColor:null,
        left:this.chartAreaComponent.leftPosition?this.chartAreaComponent.leftPosition:null,
        top:this.chartAreaComponent.topPosition?this.chartAreaComponent.topPosition:null,
        height:this.chartAreaComponent.chartHeightInper?this.chartAreaComponent.chartHeightInper:null,
        width:this.chartAreaComponent.chartWidthInPer?this.chartAreaComponent.chartWidthInPer:null
      }:null,
    };
    debugger;
    this.chart = new google.visualization.LineChart(document.getElementById(this.id));
    this.chart.draw(this.lineData, this.options);
    google.visualization.events.addListener(this.chart, 'click', this.onClick);
  }

  onClick(e){

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
  /**
   * This method create data table structure of array and return in required chart data
   *
   * */
  createTable(array: any[]): any {
    //create Duplicate Array for data arrangement
    let dupArray=array.slice();
    let data = new google.visualization.DataTable();
    let labelObject = dupArray[0];
    //remove first object of array
    dupArray.shift();

    labelObject.forEach((dataTypeObject) => {
      data.addColumn(dataTypeObject.dataType, dataTypeObject.label);
    });
    let finalArray: any[] = [];
    dupArray.forEach((rowObject) => {
      finalArray.push(rowObject);
    });
    data.addRows(finalArray);
    return data;
  }
  ngOnInit(): void {
    //call draw chart method
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(() => this.drawChart());
  }
}
