import { DonutChartComponent} from './donut.chart.component';
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
    let donutchartcomp: DonutChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let chartAreaArray:ChartAreaComponent[];
    let chartLegendArray: ChartLegendComponent[];
    let chartTitleComponent:  ChartTitleComponent[];
    let linefixture: ComponentFixture<DonutChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;

    let chartAreaArray2: ChartAreaComponent [];
    let chartLegendArray2: ChartLegendComponent []; 

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [DonutChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
            providers: [ChartLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent(DonutChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);

        donutchartcomp = linefixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp = chartlegendfixture.componentInstance;
        chartareacomp = chartareafixture.componentInstance;

        donutchartcomp.chartTitleComponent = charttitlecomp;
        donutchartcomp.chartLengendComponent=chartlegendcomp;
        donutchartcomp.chartAreaComponent=chartareacomp;

        chartAreaArray2 = [];
        chartAreaArray2.push(chartareacomp);

        chartLegendArray2 = [];
        chartLegendArray2.push(chartlegendcomp);

    });
    it('show chart', () => {
        donutchartcomp.showChart = false;
        charttitlecomp.title = '';
        expect(false).toBe( donutchartcomp.showChart);
        let newdata = [{ 'name': 'linechart' }];
        donutchartcomp.data = newdata;
    });
    it('dont show chart', () => {
        let newdata;
        donutchartcomp.data = newdata;
        expect(false).toBe( donutchartcomp.showChart);
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
        donutchartcomp.drawChart();
        donutchartcomp.chartTitleComponent.title = null;
        donutchartcomp.chariTitleTextStyle();
        donutchartcomp.chartBackgroundColor();
        donutchartcomp.chartLegendStyle();
        donutchartcomp.backgroundcolor;

    });
    it('chartTitleTextStyle()', () => {
        donutchartcomp.chartTitleComponent;
        donutchartcomp.chartTitleComponent.color = 'red';
        donutchartcomp.chartTitleComponent.fontname='times new roman';
        donutchartcomp.chartTitleComponent.fontsize=5;
        donutchartcomp.chartTitleComponent.bold=true;
        donutchartcomp.chartTitleComponent.italic=true;
        const charttextstyle= donutchartcomp.chariTitleTextStyle();
       // console.log(JSON.stringify(charttextstyle));
    });
    it('chartLegendStyle()',()=>{
        donutchartcomp.chartLengendComponent.position='left';
        donutchartcomp.chartLengendComponent.maxlines=5;
        donutchartcomp.chartLengendComponent.color='black';
        donutchartcomp.chartLengendComponent.fontsize='12';
        donutchartcomp.chartLengendComponent.alignment='center';
        donutchartcomp.chartLengendComponent.fontname='times';
        donutchartcomp.chartLengendComponent.bold=true;
        const chartlegendstyle= donutchartcomp.chartLegendStyle();
        // const json1 = {"position":null,"maxLines":5,"textStyle":{"color":"black","fontsize":"12","fontName":"times","bold":null,"alignment":"center"}}
        //console.log(JSON.stringify(chartlegendstyle));
        // expect(chartlegendstyle).toEqual(json1);

    })
    it('chartBackgroundStyle()',()=>{
        donutchartcomp.chartAreaComponent.chartbackgroundcolor='red';
        donutchartcomp.chartAreaComponent.chartheight=50;
        donutchartcomp.chartAreaComponent.chartwidth=100;
        donutchartcomp.chartAreaComponent.leftposition=null;
        const chartbgstyle =  donutchartcomp.chartBackgroundColor();
        //const json1 = {"backgroundcolor":null,"left":null,"top":null,"height":50,"width":100}
        //console.log(JSON.stringify(chartbgstyle));
    })
    it('ngOnInit()', () => {
        donutchartcomp.ngOnInit();
        expect(false).toBe(  donutchartcomp.hasLoaded);
        donutchartcomp.drawChart();
    });

    it('get data method', () => {
        donutchartcomp.data;
        expect(donutchartcomp.data).toBe(donutchartcomp._data);
    });

    it('Draw Chart Test', () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            donutchartcomp.showChart = true;
            let newdata = [{ name: 'linechart' }];
            donutchartcomp.data = newdata;
            donutchartcomp.drawChart();
            expect(false).toBe(donutchartcomp.hasLoaded);
        }
    });
    it('onResize()',()=>{
        donutchartcomp.onResize(ComponentFixture);
        donutchartcomp.drawChart();
      });
}); 






