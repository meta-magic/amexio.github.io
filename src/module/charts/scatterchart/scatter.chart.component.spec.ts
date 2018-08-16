import { ScatterChartComponent} from './scatter.chart.component';
//import { AmexioFormIconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonDataService } from '../../services/data/common.data.service';
import { ChartLoaderService } from './../chart.loader.service';
import { ChartTitleComponent } from '../charttitle/chart.title.component';
import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
import { ChartAreaComponent } from '../chartarea/chart.area.component';
import { VerticalAxisComponent } from '../verticalaxis/chart.verticalaxis.component';
import { HorizontalAxisComponent } from '../horizontalaxis/chart.horizontalaxis.component';

declare var google: any;
describe('SCATTER CHART', () => {
    //let ChartTitleComponent=new ChartTitleComponent()
    // let ChartTitleComponent = [{'name':'chart','title':'','position':'','color':'','fontname':'','fontsize':'','bold':false,'italic':''}];
    let scatterchartcomp: ScatterChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let chartvercomp: VerticalAxisComponent;
    let charthorcomp: HorizontalAxisComponent; 
    let chartAreaArray:ChartAreaComponent[];
    let chartLegendArray: ChartLegendComponent[];
    let chartTitleComponent:  ChartTitleComponent[];
    let linefixture: ComponentFixture<ScatterChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;
    let charthorfixture: ComponentFixture<HorizontalAxisComponent>;
    let chartverfixture: ComponentFixture<VerticalAxisComponent>;
    

    let chartAreaArray2: ChartAreaComponent [];
    let chartLegendArray2: ChartLegendComponent []; 

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ScatterChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent,HorizontalAxisComponent,VerticalAxisComponent],
            providers: [ChartLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent(ScatterChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);
        charthorfixture = TestBed.createComponent(HorizontalAxisComponent);
        chartverfixture = TestBed.createComponent(VerticalAxisComponent);

        scatterchartcomp = linefixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp = chartlegendfixture.componentInstance;
        chartareacomp = chartareafixture.componentInstance;
        charthorcomp =charthorfixture.componentInstance;
        chartvercomp = chartverfixture.componentInstance;


        scatterchartcomp.chartTitleComponent = charttitlecomp;
        scatterchartcomp.chartLengendComponent=chartlegendcomp;
        scatterchartcomp.chartAreaComponent=chartareacomp;
        scatterchartcomp.verticalComponent=chartvercomp;
        scatterchartcomp.horizontalComponent=charthorcomp;

        chartAreaArray2 = [];
        chartAreaArray2.push(chartareacomp);

        chartLegendArray2 = [];
        chartLegendArray2.push(chartlegendcomp);

    });
    it('show chart', () => {
        scatterchartcomp.showChart = false;
        charttitlecomp.title = '';
        expect(false).toBe( scatterchartcomp.showChart);
        let newdata = [{ 'name': 'linechart' }];
        scatterchartcomp.data = newdata;
    });
    it('dont show chart', () => {
        let newdata;
        scatterchartcomp.data = newdata;
        expect(false).toBe( scatterchartcomp.showChart);
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
    it('drawchart()', () => {
        scatterchartcomp.drawChart();
        scatterchartcomp.chartTitleComponent.title = null;

    });
    it('chartTitleTextStyle()', () => {
        scatterchartcomp.chartTitleTextStyle();
        scatterchartcomp.chartTitleComponent.color = 'red';
        scatterchartcomp.chartTitleComponent.fontname='times new roman';
        scatterchartcomp.chartTitleComponent.fontsize=5;
        scatterchartcomp.chartTitleComponent.bold=true;
        scatterchartcomp.chartTitleComponent.italic=true;
        const charttextstyle= scatterchartcomp.chartTitleTextStyle();
       // console.log(JSON.stringify(charttextstyle));
    });
    it('chartLegendStyle()',()=>{
        scatterchartcomp.chartLengendComponent.position='left';
        scatterchartcomp.chartLengendComponent.maxlines=5;
        scatterchartcomp.chartLengendComponent.color='black';
        scatterchartcomp.chartLengendComponent.fontsize='12';
        scatterchartcomp.chartLengendComponent.alignment='center';
        scatterchartcomp.chartLengendComponent.fontname='times';
        scatterchartcomp.chartLengendComponent.bold=true;
        const chartlegendstyle= scatterchartcomp.chartLegendStyle();
        // const json1 = {"position":null,"maxLines":5,"textStyle":{"color":"black","fontsize":"12","fontName":"times","bold":null,"alignment":"center"}}
        //console.log(JSON.stringify(chartlegendstyle));
        // expect(chartlegendstyle).toEqual(json1);

    });
    it('chartBackgroundStyle()',()=>{
        scatterchartcomp.chartAreaComponent.chartbackgroundcolor='red';
        scatterchartcomp.chartAreaComponent.chartheight=50;
        scatterchartcomp.chartAreaComponent.chartwidth=100;
        scatterchartcomp.chartAreaComponent.leftposition=null;
        const chartbgstyle =  scatterchartcomp.chartBackgroundColor();
        //const json1 = {"backgroundcolor":null,"left":null,"top":null,"height":50,"width":100}
        //console.log(JSON.stringify(chartbgstyle));
    });
    it('chartVerticalStyle()',()=>{
        chartvercomp.title='';
        chartvercomp.titlecolor='red';
        const chartverstyle =  scatterchartcomp.chartVerticalStyle();
    });
    it('chartHorizontalStyle()',()=>{
        charthorcomp.title='';
        charthorcomp.titlecolor='red';
        const chartverstyle =  scatterchartcomp.chartHorizontalStyle();
    });
    it('ngOnInit()', () => {
        scatterchartcomp.ngOnInit();
        expect(false).toBe(scatterchartcomp.hasLoaded);
        scatterchartcomp.drawChart();
    });



    it('get data method', () => {
        scatterchartcomp.data;
        expect(scatterchartcomp.data).toBe(scatterchartcomp._data);
    });

    it('Draw Chart Test', () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            scatterchartcomp.showChart = true;
            let newdata = [{ name: 'linechart' }];
            scatterchartcomp.data = newdata;
            scatterchartcomp.drawChart();
            expect(false).toBe(scatterchartcomp.hasLoaded);
        }
    });
    it('onResize()',()=>{
        scatterchartcomp.onResize(ComponentFixture);
        scatterchartcomp.drawChart();
      });
}); 






