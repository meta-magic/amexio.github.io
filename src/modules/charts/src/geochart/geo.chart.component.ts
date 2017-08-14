/**
 * Created by sagar on 10/8/17.
 */
import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {ChartAreaComponent} from "../chartarea/chart.area.component";
import {ChartLoaderService} from "../chart.loader.service";

declare var google: any;
@Component({
  selector: 'amexio-chart-geo',
  template: `
      <div [attr.id]="id"
           [style.width]="width"
           [style.height]="height"
      >
      </div>
  `
})

export class GeoChartComponent implements AfterContentInit ,OnInit{

  private options;
  private geomapData;
  private chart;

  id: any;

  @Input() width: string;

  @Input() height: string;

  @Input() data: any;

  @Input() displayCountryName:boolean=false;

  @Input() regionCode:string;

  @Input() backgroundColor:string;

  @Input() datalessRegionColor:string;

  @ContentChildren(ChartAreaComponent)  chartAreaComp:QueryList<ChartAreaComponent>;

  chartAreaArray:ChartAreaComponent[];

  chartAreaComponent:ChartAreaComponent;

  constructor(private loader : ChartLoaderService) {
    this.id='amexio-map-geomap'+ Math.floor(Math.random()*90000) + 10000;
    this.width='100%';
  }
  drawChart() {
    this.geomapData = google.visualization.arrayToDataTable(this.data);
    this.options = {
      displayMode:this.displayCountryName?'text':null,
      region:this.regionCode?this.regionCode:null,
      backgroundColor:this.backgroundColor?this.backgroundColor:null,
      datalessRegionColor:this.datalessRegionColor?this.datalessRegionColor:null,
      chartArea:this.chartAreaComponent?{
        backgroundColor:this.chartAreaComponent.chartBackgroundColor?this.chartAreaComponent.chartBackgroundColor:null,
        left:this.chartAreaComponent.leftPosition?this.chartAreaComponent.leftPosition:null,
        top:this.chartAreaComponent.topPosition?this.chartAreaComponent.topPosition:null,
        height:this.chartAreaComponent.chartHeightInper?this.chartAreaComponent.chartHeightInper:null,
        width:this.chartAreaComponent.chartWidthInPer?this.chartAreaComponent.chartWidthInPer:null
      }:null,
    };
    this.chart = new google.visualization.GeoChart(document.getElementById(this.id));
    this.chart.draw(this.geomapData, this.options);
    google.visualization.events.addListener(this.chart, 'click', this.click);
  }

  click(e){
  }
  ngAfterContentInit(): void {
    this.chartAreaArray=this.chartAreaComp.toArray();
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
