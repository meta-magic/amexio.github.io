import { HistogramChartComponent } from './histogram.chart.component';
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
describe('HISTOGRAM CHART', () => {
    //let ChartTitleComponent=new ChartTitleComponent()
    // let ChartTitleComponent = [{'name':'chart','title':'','position':'','color':'','fontname':'','fontsize':'','bold':false,'italic':''}];
    let histochartcomp: HistogramChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let chartAreaArray:ChartAreaComponent[];
    let chartLegendArray: ChartLegendComponent[];
    let chartTitleComponent:  ChartTitleComponent[];
    let linefixture: ComponentFixture<HistogramChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;
    let chartAreaArray2:ComponentFixture<ChartAreaComponent[]>;
    let chartLegendArray2:ComponentFixture<ChartLegendComponent[]>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HistogramChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
            providers: [ChartLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent(HistogramChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);
        histochartcomp = linefixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp = chartlegendfixture.componentInstance;
        chartareacomp = chartareafixture.componentInstance;
        histochartcomp.chartTitleComponent = charttitlecomp;
        histochartcomp.chartLengendComponent=chartlegendcomp;
        histochartcomp.chartAreaComponent=chartareacomp;

    });
    it('show chart', () => {
        histochartcomp.chartAreaComponent=chartareacomp;
        histochartcomp.showChart = false;
        charttitlecomp.title = '';
        expect(false).toBe(histochartcomp.showChart);
        let newdata = [{ 'name': 'linechart' }];
        histochartcomp.data = newdata;
    });
    it('dont show chart', () => {
        let newdata;
        histochartcomp.data = newdata;
        expect(false).toBe(histochartcomp.showChart);
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
        histochartcomp.drawChart();
        histochartcomp.chartTitleComponent.title = null;
        histochartcomp.chartBackground();
        histochartcomp.chartegendStyle();
        histochartcomp.charttitleTextStyle();
        histochartcomp.chartAreaComponent;
    

    });
    it('chartTitleTextStyle()', () => {
        histochartcomp.charttitleTextStyle();
        histochartcomp.chartTitleComponent.color = 'red';
        histochartcomp.chartTitleComponent.fontname='times new roman';
        histochartcomp.chartTitleComponent.fontsize=5;
        histochartcomp.chartTitleComponent.bold=true;
        histochartcomp.chartTitleComponent.italic=true;
        const charttextstyle= histochartcomp.charttitleTextStyle();
       // console.log(JSON.stringify(charttextstyle));
    });
    it('chartLegendStyle()',()=>{
        histochartcomp.chartLengendComponent.position='left';
        histochartcomp.chartLengendComponent.maxlines=5;
        histochartcomp.chartLengendComponent.color='black';
        histochartcomp.chartLengendComponent.fontsize='12';
        histochartcomp.chartLengendComponent.alignment='center';
        histochartcomp.chartLengendComponent.fontname='times';
        histochartcomp.chartLengendComponent.bold=true;
        const chartlegendstyle= histochartcomp.chartegendStyle();
        // const json1 = {"position":null,"maxLines":5,"textStyle":{"color":"black","fontsize":"12","fontName":"times","bold":null,"alignment":"center"}}
        //console.log(JSON.stringify(chartlegendstyle));
        // expect(chartlegendstyle).toEqual(json1);

    })
    it('chartBackgroundStyle()',()=>{
        histochartcomp.chartAreaComponent.chartbackgroundcolor='red';
        histochartcomp.chartAreaComponent.chartheight=50;
        histochartcomp.chartAreaComponent.chartwidth=100;
        histochartcomp.chartAreaComponent.leftposition=null;
        const chartbgstyle = histochartcomp.chartBackground();
        //const json1 = {"backgroundcolor":null,"left":null,"top":null,"height":50,"width":100}
        //console.log(JSON.stringify(chartbgstyle));
    });

    it('get data method', () => {
        histochartcomp.data;
        expect( histochartcomp.data).toBe( histochartcomp._data);
    });
    it('ngOnInit()', () => {
        histochartcomp.ngOnInit();
        expect(false).toBe(histochartcomp.hasLoaded);
        histochartcomp.drawChart();
    });

    it('Draw Chart Test', () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            histochartcomp.showChart = true;
            let newdata = [{ name: 'linechart' }];
            histochartcomp.data = newdata;
            histochartcomp.drawChart();
            expect(false).toBe(histochartcomp.hasLoaded);
        }
    });
}); 






