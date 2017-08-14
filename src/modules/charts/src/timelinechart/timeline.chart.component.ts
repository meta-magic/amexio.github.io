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
  selector: 'amexio-chart-timeline',
  template: `
    <div [attr.id]="id"
         [style.width]="width"
    ></div>
  `
})
export class TimeLineChartComponent implements AfterContentInit,OnInit {

  private chart;

  id: any;

  @Input() width: string;

  @Input() data: any;

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
    this.id = 'amexio-chart-timeline' + Math.floor(Math.random()*90000) + 10000;
    this.width='100%';
  }

  drawChart() {
    this.chart = new google.visualization.Timeline(document.getElementById(this.id));
    this.chart.draw(this.createTable(this.data));
    google.visualization.events.addListener(this.chart, 'click', this.onClick);
  }

  onClick(e) {
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
    google.charts.load('current', {packages: ['timeline']});
    google.charts.setOnLoadCallback(() => this.drawChart());
  }
}

