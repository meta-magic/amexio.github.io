import { BubbleChartComponent} from './bubble.chart.component';
//import { AmexioFormIconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonDataService } from '../../services/data/common.data.service';
import { ChartLoaderService } from './../chart.loader.service';
import { ChartTitleComponent } from '../charttitle/chart.title.component';
import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
import { ChartAreaComponent } from '../chartarea/chart.area.component';
import { HorizontalAxisComponent } from '../horizontalaxis/chart.horizontalaxis.component';
import { VerticalAxisComponent } from '../verticalaxis/chart.verticalaxis.component';

declare var google: any;
describe('BUBBLE CHART', () => {
    //let ChartTitleComponent=new ChartTitleComponent()
    // let ChartTitleComponent = [{'name':'chart','title':'','position':'','color':'','fontname':'','fontsize':'','bold':false,'italic':''}];
    let bubblechartcomp: BubbleChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let chartvercomp: VerticalAxisComponent ;
    let charthorcomp: HorizontalAxisComponent ;
    let chartAreaArray:ChartAreaComponent[];
    let chartLegendArray: ChartLegendComponent[];
    let chartTitleComponent:  ChartTitleComponent[];
    let linefixture: ComponentFixture<BubbleChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;
    let chartverfixture:ComponentFixture<VerticalAxisComponent>;
    let charthorfixture:ComponentFixture<HorizontalAxisComponent> 

    let chartAreaArray2: ChartAreaComponent [];
    let chartLegendArray2: ChartLegendComponent []; 

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [BubbleChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent, HorizontalAxisComponent, VerticalAxisComponent],
            providers: [ChartLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent(BubbleChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);
        chartverfixture= TestBed.createComponent(VerticalAxisComponent);
        charthorfixture=TestBed.createComponent(HorizontalAxisComponent);

        bubblechartcomp = linefixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp = chartlegendfixture.componentInstance;
        chartareacomp = chartareafixture.componentInstance;
        chartvercomp =chartverfixture.componentInstance;
        charthorcomp= charthorfixture.componentInstance;

        bubblechartcomp.chartTitleComponent = charttitlecomp;
        bubblechartcomp.chartLengendComponent=chartlegendcomp;
        bubblechartcomp.chartAreaComponent=chartareacomp;
        bubblechartcomp.verticalComponent=chartvercomp;
        bubblechartcomp.horizontalComponent=charthorcomp;

        chartAreaArray2 = [];
        chartAreaArray2.push(chartareacomp);

        chartLegendArray2 = [];
        chartLegendArray2.push(chartlegendcomp);

    });
    it('show chart', () => {
        bubblechartcomp.showChart = false;
        charttitlecomp.title = '';
        expect(false).toBe( bubblechartcomp.showChart);
        let newdata = [{ 'name': 'linechart' }];
        bubblechartcomp.data = newdata;
    });
    it('dont show chart', () => {
        let newdata;
        bubblechartcomp.data = newdata;
        expect(false).toBe( bubblechartcomp.showChart);
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
        bubblechartcomp.drawChart();
        bubblechartcomp.chartTitleComponent;
        bubblechartcomp.createTitleTextStyle();
        bubblechartcomp.createChartLegend();
        bubblechartcomp.createChartBackground();
        bubblechartcomp.createchartHorizontal();
        bubblechartcomp.createChartVertical();
        bubblechartcomp.chartAreaComponent;

    });
    it('chartTitleTextStyle()', () => {
        bubblechartcomp.chartTitleComponent;
        bubblechartcomp.chartTitleComponent.color = 'red';
        bubblechartcomp.chartTitleComponent.fontname='times new roman';
        bubblechartcomp.chartTitleComponent.fontsize=5;
        bubblechartcomp.chartTitleComponent.bold=true;
        bubblechartcomp.chartTitleComponent.italic=true;
        const charttextstyle= bubblechartcomp.createTitleTextStyle();
       // console.log(JSON.stringify(charttextstyle));
    });
    it('chartLegendStyle()',()=>{
        bubblechartcomp.chartLengendComponent.position='left';
        bubblechartcomp.chartLengendComponent.maxlines=5;
        bubblechartcomp.chartLengendComponent.color='black';
        bubblechartcomp.chartLengendComponent.fontsize='12';
        bubblechartcomp.chartLengendComponent.alignment='center';
        bubblechartcomp.chartLengendComponent.fontname='times';
        bubblechartcomp.chartLengendComponent.bold=true;
        const chartlegendstyle=bubblechartcomp.createChartLegend();
        // const json1 = {"position":null,"maxLines":5,"textStyle":{"color":"black","fontsize":"12","fontName":"times","bold":null,"alignment":"center"}}
        //console.log(JSON.stringify(chartlegendstyle));
        // expect(chartlegendstyle).toEqual(json1);

    });
    it(' createChartVertical()',()=>{
        chartvercomp.title='';
        chartvercomp.titlecolor='';
        const chartVerStyle=bubblechartcomp.createChartVertical();
    });
    it('createchartHorizontal()',()=>{
        charthorcomp.title='';
        charthorcomp.titlecolor='';
        const chartHorStyle=bubblechartcomp.createchartHorizontal();
    })
    it('chartBackgroundStyle()',()=>{
        bubblechartcomp.chartAreaComponent.chartbackgroundcolor='red';
        bubblechartcomp.chartAreaComponent.chartheight=50;
        bubblechartcomp.chartAreaComponent.chartwidth=100;
        bubblechartcomp.chartAreaComponent.leftposition=null;
        const chartbgstyle =  bubblechartcomp.createChartBackground();
        //const json1 = {"backgroundcolor":null,"left":null,"top":null,"height":50,"width":100}
        //console.log(JSON.stringify(chartbgstyle));
    })
  

    it('get data method', () => {
        bubblechartcomp.data;
        expect(bubblechartcomp.data).toBe(bubblechartcomp._data);
    });

    it('Draw Chart Test', () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            bubblechartcomp.showChart = true;
            let newdata = [{ name: 'linechart' }];
            bubblechartcomp.data = newdata;
            bubblechartcomp.drawChart();
            expect(false).toBe(bubblechartcomp.hasLoaded);
        }
    });
    it('onResize()',()=>{
        bubblechartcomp.onResize(ComponentFixture);
        bubblechartcomp.drawChart();
      });
      it('ngOnInit()',() => {
          bubblechartcomp.hasLoaded=false;
          expect(bubblechartcomp.hasLoaded).toBe(false);
         bubblechartcomp.drawChart();
         bubblechartcomp.ngOnInit();

     })
    
}); 






