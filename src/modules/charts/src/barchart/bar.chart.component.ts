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

import {AfterContentInit, Component, ContentChildren, Input, QueryList} from "@angular/core";
import {ChartBaseClass} from "../baseclass/base.chart.class";
import {ChartLegendComponent} from "../chartlegend/chart.legend.component";
import {ChartTitleComponent} from "../charttitle/chart.title.component";
import {ChartLoaderService} from "../chart.loader.service";
import {ChartAreaComponent} from "../chartarea/chart.area.component";

@Component({
    selector: 'amexio-chart-bar',
    template: `
        <div [attr.id]="id"
             [style.width.px]="width"
             [style.height.px]="height">

        </div>
    `
})
export class BarChartComponent extends ChartBaseClass implements AfterContentInit {

    private options;
    private barData;
    private chart;

    id: any;

    @Input() data: any;

    @Input() width: number;

    @Input() height: number;

    //showing stack chart
    @Input() isBarStacked: boolean = false;

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
        super(loader);
        this.id = 'amexio-chart-bar' + Math.random();
    }

    drawChart() {
        //bind the data
        this.barData = this.createDataTable(this.data);
        this.options = {
          title: this.chartTitleComponent?this.chartTitleComponent.title:null,
          titleTextStyle:this.chartTitleComponent?{
            color:this.chartTitleComponent.titleColor?this.chartTitleComponent.titleColor:null,
            fontName:this.chartTitleComponent.titleFontName?this.chartTitleComponent.titleFontName:null,
            fontSize:this.chartTitleComponent.titleFontSize?this.chartTitleComponent.titleFontSize:null,
            bold:this.chartTitleComponent.isTitleBold?this.chartTitleComponent.isTitleBold:null,
            italic:this.chartTitleComponent.isTitleItalic?this.chartTitleComponent.isTitleItalic:null
          }:null,
          isStacked: this.isBarStacked,
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
        this.chart = this.createBarChart(document.getElementById(this.id));
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
}
