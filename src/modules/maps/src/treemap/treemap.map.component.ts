/**
 * Created by sagar on 18/8/17.
 */
import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {MapTitleComponent} from "../maptitle/map.title.component";


declare var google: any;
@Component({
  selector: 'amexio-map-treemap',
  template: `
      <div [attr.id]="id"
           [style.width]="width"
           [style.height]="height" (window:resize)="onResize($event)"
      >
      </div>
  `
})

export class TreeMapComponent implements AfterContentInit ,OnInit{

  private options;
  private treemapData;
  private chart;

  id: any;

  @Input() width: string;

  @Input() height: string;

  @Input() data: any;

  @Input() minColor:string;

  @Input() midColor:string;

  @Input() maxColor:string;

  @Input() showScale:boolean;

  @Input() maxPostDepth:number;

  @ContentChildren(MapTitleComponent) maptleComp:QueryList<MapTitleComponent>;

  mapTitleArray:MapTitleComponent[];

  mapTitleComponent:MapTitleComponent;

  constructor() {
    this.id='amexio-map-treemap'+ Math.floor(Math.random()*90000) + 10000;
    this.width='100%';
  }
  drawChart() {
    this.treemapData = google.visualization.arrayToDataTable(this.data);
    this.options = {
      title: this.mapTitleComponent?this.mapTitleComponent.title:null,
      titleTextStyle:this.mapTitleComponent?{
        color:this.mapTitleComponent.titleColor?this.mapTitleComponent.titleColor:null,
        fontName:this.mapTitleComponent.titleFontName?this.mapTitleComponent.titleFontName:null,
        fontSize:this.mapTitleComponent.titleFontSize?this.mapTitleComponent.titleFontSize:null,
        bold:this.mapTitleComponent.isTitleBold?this.mapTitleComponent.isTitleBold:null,
        italic:this.mapTitleComponent.isTitleItalic?this.mapTitleComponent.isTitleItalic:null
      }:null,
      minColor: this.minColor?this.minColor:null,
      midColor: this.midColor?this.midColor:null,
      maxColor: this.maxColor?this.maxColor:null,
      headerHeight: 15,
      fontColor: 'black',
      showScale: this.showScale ?this.showScale :false,
      maxPostDepth:this.maxPostDepth ?this.maxPostDepth:1
    };
    this.chart = new google.visualization.TreeMap(document.getElementById(this.id));
    this.chart.draw(this.treemapData, this.options);
    google.visualization.events.addListener(this.chart, 'click', this.click);
  }

  click(e){
  }
  ngAfterContentInit(): void {
    this.mapTitleArray=this.maptleComp.toArray();
    if(this.mapTitleArray.length==1){
      this.mapTitleComponent=this.mapTitleArray.pop();
    }
  }
  ngOnInit(): void {
    this.createChart();
  }
  createChart(){
    //call draw chart method
    google.charts.load('current', {packages: ['treemap']});
    google.charts.setOnLoadCallback(() => this.drawChart());
  }
  onResize(event){
    this.createChart();
  }
}
