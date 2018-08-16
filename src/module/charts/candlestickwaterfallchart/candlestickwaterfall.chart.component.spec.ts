import { CandlestickWaterfallChartComponent } from './candlestickwaterfall.chart.component';
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
import {HorizontalAxisComponent} from '../horizontalaxis/chart.horizontalaxis.component';

declare var google: any;
describe('CANDLESTICKWATERFALL CHART', () => {
    //let ChartTitleComponent=new ChartTitleComponent()
    // let ChartTitleComponent = [{'name':'chart','title':'','position':'','color':'','fontname':'','fontsize':'','bold':false,'italic':''}];
    let candlestickwaterchartcomp: CandlestickWaterfallChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let chartvercomp: VerticalAxisComponent;
    let charthorcomp: HorizontalAxisComponent;
    let chartAreaArray: ChartAreaComponent[];
    let chartLegendArray: ChartLegendComponent[];
    let chartTitleComponent: ChartTitleComponent[];
    let chartverfixture: ComponentFixture<VerticalAxisComponent>;
    let charthorfixture: ComponentFixture<HorizontalAxisComponent>;
    let linefixture: ComponentFixture<CandlestickWaterfallChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;

    let chartAreaArray2: ChartAreaComponent[];
    let chartLegendArray2: ChartLegendComponent[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CandlestickWaterfallChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent, VerticalAxisComponent,HorizontalAxisComponent],
            providers: [ChartLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent(CandlestickWaterfallChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);
        chartverfixture = TestBed.createComponent(VerticalAxisComponent);
        charthorfixture=TestBed.createComponent(HorizontalAxisComponent);
        candlestickwaterchartcomp = linefixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp = chartlegendfixture.componentInstance;
        chartareacomp = chartareafixture.componentInstance;
        chartvercomp = chartverfixture.componentInstance;
        charthorcomp=charthorfixture.componentInstance;


        candlestickwaterchartcomp.chartTitleComponent = charttitlecomp;
        //candlestickwaterchartcomp.chartLengendComponent=chartlegendcomp;
        candlestickwaterchartcomp.chartAreaComponent = chartareacomp;
        candlestickwaterchartcomp.verticalComponent = chartvercomp;
        candlestickwaterchartcomp.horizontalComponent= charthorcomp;
        chartAreaArray2 = [];
        chartAreaArray2.push(chartareacomp);

        chartLegendArray2 = [];
        chartLegendArray2.push(chartlegendcomp);

    });
    it('show chart', () => {
        candlestickwaterchartcomp.showChart = false;
        charttitlecomp.title = '';
        expect(false).toBe(candlestickwaterchartcomp.showChart);
        let newdata = [{ 'name': 'linechart' }];
        candlestickwaterchartcomp.data = newdata;
    });
    it('dont show chart', () => {
        let newdata;
        candlestickwaterchartcomp.data = newdata;
        expect(false).toBe(candlestickwaterchartcomp.showChart);
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
        chartlegendcomp.maxlines = null;
    });
    it('chartBackgroundStyle() properties', () => {
        chartareacomp.chartbackgroundcolor = '';
        chartareacomp.chartheight = 10;
        chartareacomp.chartwidth = 10;
        chartareacomp.leftposition = 10;
        chartareacomp.topposition = null;

    });
    it('chartcolorstyle() properties',()=>{
        candlestickwaterchartcomp.fallingcolor='red';
        candlestickwaterchartcomp.risingcolor='red';
        candlestickwaterchartcomp.chartColorStyle();
    }),
    it('drawchart()', () => {
        candlestickwaterchartcomp.drawChart();
        expect(candlestickwaterchartcomp.showChart).toBeUndefined;
        candlestickwaterchartcomp['options'];
        
        candlestickwaterchartcomp.chartTitleComponent;
        candlestickwaterchartcomp.chartAreaComponent;
        candlestickwaterchartcomp.chartLegendStyle;
        candlestickwaterchartcomp.chartVerticalComponent();
        candlestickwaterchartcomp.chartHorizontalComponent();
        candlestickwaterchartcomp.chartColorStyle();
    });
    it('chartTitleTextStyle()', () => {
        candlestickwaterchartcomp.chartTitleComponent;
        candlestickwaterchartcomp.chartTitleComponent.color = 'red';
        candlestickwaterchartcomp.chartTitleComponent.fontname = 'times new roman';
        candlestickwaterchartcomp.chartTitleComponent.fontsize = 5;
        candlestickwaterchartcomp.chartTitleComponent.bold = true;
        candlestickwaterchartcomp.chartTitleComponent.italic = true;
        const charttextstyle = candlestickwaterchartcomp.chartTitleTextStyle();
    });
    // it('chartLegendStyle()',()=>{
    //     candlestickwaterchartcomp.chartLengendComponent.position='left';
    //     columnchartcomp.chartLengendComponent.maxlines=5;
    //     columnchartcomp.chartLengendComponent.color='black';
    //     columnchartcomp.chartLengendComponent.fontsize='12';
    //     columnchartcomp.chartLengendComponent.alignment='center';
    //     columnchartcomp.chartLengendComponent.fontname='times';
    //     columnchartcomp.chartLengendComponent.bold=true;
    //     const chartlegendstyle= columnchartcomp.chartLegendStyle();
    //     // const json1 = {"position":null,"maxLines":5,"textStyle":{"color":"black","fontsize":"12","fontName":"times","bold":null,"alignment":"center"}}
    //     //console.log(JSON.stringify(chartlegendstyle));
    //     // expect(chartlegendstyle).toEqual(json1);

    // })
    it(' chartLegendStyle()', () => {
        chartareacomp.leftposition = 5;
        chartareacomp.chartheight = 8;
        chartareacomp.chartwidth = 6;
        chartareacomp.chartbackgroundcolor = 'red';
        chartareacomp.topposition = 5;
        const chartlegendstyle = candlestickwaterchartcomp.chartLegendStyle();

    })
    it('chartBackgroundStyle()', () => {
        candlestickwaterchartcomp.chartAreaComponent.chartbackgroundcolor = 'red';
        candlestickwaterchartcomp.chartAreaComponent.chartheight = 50;
        candlestickwaterchartcomp.chartAreaComponent.chartwidth = 100;
        candlestickwaterchartcomp.chartAreaComponent.leftposition = null;
        //  const chartbgstyle = candlestickwaterchartcomp.chartBackGroundColor();
        //const json1 = {"backgroundcolor":null,"left":null,"top":null,"height":50,"width":100}
        //console.log(JSON.stringify(chartbgstyle));
    })
    it('chartVerticalComponent()', () => {
        chartvercomp.title='';
        chartvercomp.titlecolor='';
        const chartverstyle = candlestickwaterchartcomp.chartVerticalComponent();
    });
    it('chartHorizontalComponent()',()=>{
        charthorcomp.title='';
        chartvercomp.titlecolor='';
        const charthorstyle=candlestickwaterchartcomp.chartHorizontalComponent();
    })
    it('ngOnInit()', () => {
        candlestickwaterchartcomp.ngOnInit();
        expect(false).toBe(candlestickwaterchartcomp.hasLoaded);
        candlestickwaterchartcomp.drawChart();
    });

    it('get data method', () => {
        candlestickwaterchartcomp.data;
        expect(candlestickwaterchartcomp.data).toBe(candlestickwaterchartcomp._data);
    });

    it('Draw Chart Test', () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            candlestickwaterchartcomp.showChart = true;
            let newdata = [{ name: 'linechart' }];
            candlestickwaterchartcomp.data = newdata;
            candlestickwaterchartcomp.drawChart();
            expect(false).toBe(candlestickwaterchartcomp.hasLoaded);
            it('title',()=>{
                charttitlecomp.title='CandleStickwaterfall chart';
                expect(charttitlecomp.title).toBe(true);
                expect(charttitlecomp.title).toBe(false);
            })
        }
    });
    it('onResize()', () => {
        candlestickwaterchartcomp.onResize(ComponentFixture);
        candlestickwaterchartcomp.drawChart();
    });
});






