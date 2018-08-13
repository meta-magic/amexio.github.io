import {  AreaChartComponent} from './area.chart.component';
//import { AmexioFormIconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonDataService } from '../../services/data/common.data.service';
import { ChartLoaderService } from './../chart.loader.service';
import { ChartTitleComponent } from '../charttitle/chart.title.component';
import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
import { ChartAreaComponent } from '../chartarea/chart.area.component';
declare var google: any;
describe('DONUT CHART', () => {
    //let ChartTitleComponent=new ChartTitleComponent()
    // let ChartTitleComponent = [{'name':'chart','title':'','position':'','color':'','fontname':'','fontsize':'','bold':false,'italic':''}];
    let areachartcomp: AreaChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let chartAreaArray:ChartAreaComponent[];
    let chartLegendArray: ChartLegendComponent[];
    let chartTitleComponent:  ChartTitleComponent[];
    let linefixture: ComponentFixture< AreaChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;

    let chartAreaArray2: ChartAreaComponent [];
    let chartLegendArray2: ChartLegendComponent []; 

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ AreaChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
            providers: [ChartLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent( AreaChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);

        areachartcomp = linefixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp = chartlegendfixture.componentInstance;
        chartareacomp = chartareafixture.componentInstance;

        areachartcomp.chartTitleComponent = charttitlecomp;
        areachartcomp.chartLengendComponent=chartlegendcomp;
        areachartcomp.chartAreaComponent=chartareacomp;

        chartAreaArray2 = [];
        chartAreaArray2.push(chartareacomp);

        chartLegendArray2 = [];
        chartLegendArray2.push(chartlegendcomp);

    });
    it('show chart', () => {
      areachartcomp.showChart = false;
        charttitlecomp.title = '';
        expect(false).toBe( areachartcomp.showChart);
        let newdata = [{ 'name': 'linechart' }];
        areachartcomp.data = newdata;
    });
    it('dont show chart', () => {
        let newdata;
        areachartcomp.data = newdata;
        expect(false).toBe( areachartcomp.showChart);
    });
    it('chartTitleTextStyle() properties', () => {
        charttitlecomp.color = '';
        charttitlecomp.fontname = '';
        charttitlecomp.fontsize = 10;
        charttitlecomp.bold = false;
        charttitlecomp.position = '';
        charttitlecomp.title = '';
        charttitlecomp.italic = false;
    });
    it('chartLegendStyle() properties', () => {
        chartlegendcomp.position = '';
        chartlegendcomp.alignment = '';
        chartlegendcomp.color = '';
        chartlegendcomp.fontname = '';
        chartlegendcomp.fontsize = '';
        chartlegendcomp.bold = false;
        chartlegendcomp.maxlines=null;
    });
    it('chartBackgroundStyle() properties', () => {
        chartareacomp.chartbackgroundcolor = '';
        chartareacomp.chartheight = 10;
        chartareacomp.chartwidth = 10;
        chartareacomp.leftposition = 10;
        chartareacomp.topposition = null;

    });
    // it('drawchart()', () => {
    //  let draw = google.visualization.arrayToDataTable(areachartcomp.data);

    //   areachartcomp.drawChart();
    //   expect(draw).toEqual( (<any>areachartcomp).areaData);
    //   areachartcomp.chartTitleComponent.title = null;

    // });
    it('chartTitleTextStyle()', () => {
      areachartcomp.chartTitleComponent;
      areachartcomp.chartTitleComponent.color = 'red';
      areachartcomp.chartTitleComponent.fontname='times new roman';
      areachartcomp.chartTitleComponent.fontsize=5;
      areachartcomp.chartTitleComponent.bold=true;
      areachartcomp.chartTitleComponent.italic=true;
        const charttextstyle= areachartcomp.createTitleTextStyle();
       // console.log(JSON.stringify(charttextstyle));
    });
    it('chartLegendStyle()',()=>{
      areachartcomp.chartLengendComponent.position='left';
      areachartcomp.chartLengendComponent.maxlines=5;
      areachartcomp.chartLengendComponent.color='black';
      areachartcomp.chartLengendComponent.fontsize='12';
      areachartcomp.chartLengendComponent.alignment='center';
      areachartcomp.chartLengendComponent.fontname='times';
      areachartcomp.chartLengendComponent.bold=true;
        const chartlegendstyle= areachartcomp.createChartLegend();
        // const json1 = {"position":null,"maxLines":5,"textStyle":{"color":"black","fontsize":"12","fontName":"times","bold":null,"alignment":"center"}}
        //console.log(JSON.stringify(chartlegendstyle));
        // expect(chartlegendstyle).toEqual(json1);

    })
    it('chartBackgroundStyle()',()=>{
      areachartcomp.chartAreaComponent.chartbackgroundcolor='red';
      areachartcomp.chartAreaComponent.chartheight=50;
      areachartcomp.chartAreaComponent.chartwidth=100;
      areachartcomp.chartAreaComponent.leftposition=null;
       const chartbgstyle = areachartcomp.createChartArea();
        //const json1 = {"backgroundcolor":null,"left":null,"top":null,"height":50,"width":100}
        //console.log(JSON.stringify(chartbgstyle));
    })
    it('ngAfterContentInit()',()=>{
        
        //linechartcomp.ngAfterContentInit();
        //console.log(" ********************* "+chartAreaArray2.toArray());
       // linechartcomp.ngAfterContentInit();
       // expect(linechartcomp.chartLegendArray).toEqual(linechartcomp.chartLegendComp.length[1]);
       //expect(linechartcomp.chartLengendComponent ).toEqual(linechartcomp.chartLegendArray.pop());
    
    
    
    });

    it('get data method', () => {
      areachartcomp.data;
        expect(areachartcomp.data).toBe(areachartcomp._data);
    });

    it('Draw Chart Test', () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          areachartcomp.showChart = true;
            let newdata = [{ name: 'linechart' }];
            areachartcomp.data = newdata;
            areachartcomp.drawChart();
            expect(false).toBe(areachartcomp.hasLoaded);
            // let draw = google.visualization.arrayToDataTable(areachartcomp.data);
            // areachartcomp.drawChart();
            // expect(draw).toEqual( (<any>areachartcomp).areaData);
            // areachartcomp.chartTitleComponent.title = null;
      
        }
    });
    it('onResize()',()=>{
      areachartcomp.onResize(ComponentFixture);
      areachartcomp.drawChart();
    })
}); 






