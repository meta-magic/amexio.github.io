/**
 * Created by sagar on 10/8/17.
 */
import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {ChartBaseClass} from "../baseclass/base.chart.class";
import {ChartAreaComponent} from "../chartarea/chart.area.component";
import {ChartLoaderService} from "../chart.loader.service";

declare var google: any;
@Component({
  selector: 'amexio-chart-geo',
  template: `
    <div [attr.id]="id"
         [style.width.px]="width"
         [style.height.px]="height"
    >
    </div>
  `
})

export class GeoChartComponent extends ChartBaseClass implements AfterContentInit ,OnInit{

  private options;
  private geomapData;
  private chart;

  id: any;

  @Input() width: number;

  @Input() height: number;

  @Input() data: any;

  @Input() displayCountryName:boolean=false;

  @Input() regionCode:string;

  @Input() backgroundColor:string;

  @Input() datalessRegionColor:string;

  @ContentChildren(ChartAreaComponent)  chartAreaComp:QueryList<ChartAreaComponent>;

  chartAreaArray:ChartAreaComponent[];

  chartAreaComponent:ChartAreaComponent;

  constructor(private loader : ChartLoaderService) {
  super(loader);
  this.id='amexio-map-geomap'+Math.random();
  }
  drawChart() {
    this.geomapData = this.createDataTable(this.data);
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
    this.chart = this.createGeoMap(document.getElementById(this.id));
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
    google.charts.setOnLoadCallback(() => this.drawChart());
  }
}
