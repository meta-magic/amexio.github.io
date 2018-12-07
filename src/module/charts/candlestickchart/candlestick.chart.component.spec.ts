import { CandlestickChartComponent } from './candlestick.chart.component';
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
describe('CANDLESTICK CHART', () => {
    //let ChartTitleComponent=new ChartTitleComponent()
    // let ChartTitleComponent = [{'name':'chart','title':'','position':'','color':'','fontname':'','fontsize':'','bold':false,'italic':''}];
    let candlestickchartcomp: CandlestickChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let chartvercomp: VerticalAxisComponent;
    let charthoricomp: HorizontalAxisComponent;
    let chartAreaArray: ChartAreaComponent[];
    let chartLegendArray: ChartLegendComponent[];
    let chartTitleComponent: ChartTitleComponent[];
    let linefixture: ComponentFixture<CandlestickChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;
    let charthorifixture: ComponentFixture<HorizontalAxisComponent>;
    let chartverifixture: ComponentFixture<VerticalAxisComponent>;

    let chartAreaArray2: ChartAreaComponent[];
    let chartLegendArray2: ChartLegendComponent[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CandlestickChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent, VerticalAxisComponent, HorizontalAxisComponent],
            providers: [ChartLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent(CandlestickChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);
        charthorifixture = TestBed.createComponent(HorizontalAxisComponent);
        chartverifixture = TestBed.createComponent(VerticalAxisComponent);

        candlestickchartcomp = linefixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp = chartlegendfixture.componentInstance;
        chartareacomp = chartareafixture.componentInstance;
        chartvercomp = chartverifixture.componentInstance;
        charthoricomp = charthorifixture.componentInstance;

        candlestickchartcomp.chartTitleComponent = charttitlecomp;
        //candlestickchartcomp.ChartLegendComponent=chartlegendcomp;
        candlestickchartcomp.chartAreaComponent = chartareacomp;
        candlestickchartcomp.verticalComponent = chartvercomp;
        candlestickchartcomp.horizontalComponent = charthoricomp;

        chartAreaArray2 = [];
        chartAreaArray2.push(chartareacomp);

        chartLegendArray2 = [];
        chartLegendArray2.push(chartlegendcomp);

    });
    it('show chart', () => {
        candlestickchartcomp.showChart = false;
        charttitlecomp.title = '';
        expect(false).toBe(candlestickchartcomp.showChart);
        let newdata = [{ 'name': 'linechart' }];
        candlestickchartcomp.data = newdata;
    });
    it('dont show chart', () => {
        let newdata;
        candlestickchartcomp.data = newdata;
        expect(false).toBe(candlestickchartcomp.showChart);
    });
    // it('chartTitleTextStyle() properties', () => {
    //     charttitlecomp.color = '';
    //     charttitlecomp.fontname = '';
    //     charttitlecomp.fontsize = 10;
    //     charttitlecomp.bold = false;
    //     charttitlecomp.position = '';
    //     charttitlecomp.title = '';
    //     charttitlecomp.italic = false;
    // });
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
    it('chartVerticalStyle() properties', () => {
        chartvercomp.title = '';
        chartvercomp.titlecolor = '';
        const chartvc=candlestickchartcomp.chartVerticalStyle();
    });
    it('chartHorizontalStyle() properties', () => {
        charthoricomp.title = '';
        charthoricomp.titlecolor = '';
        const chartvc=candlestickchartcomp.chartHorizontalStyle();
    })
    it('drawchart()', () => {
        candlestickchartcomp.drawChart();
        candlestickchartcomp.chartTitleComponent;
        candlestickchartcomp.chartHorizontalStyle();
        candlestickchartcomp.chartLegendStyle();
        candlestickchartcomp.chartTileTextStyle();
        candlestickchartcomp.backgroundcolor;
        candlestickchartcomp.chartVerticalStyle();
        

    });
    it('chartTitleTextStyle()', () => {
        candlestickchartcomp.chartTitleComponent;
        candlestickchartcomp.chartTitleComponent.color = 'red';
        candlestickchartcomp.chartTitleComponent.fontname = 'times new roman';
        candlestickchartcomp.chartTitleComponent.fontsize = 5;
        candlestickchartcomp.chartTitleComponent.bold = true;
        candlestickchartcomp.chartTitleComponent.italic = true;
        const charttextstyle = candlestickchartcomp.chartTileTextStyle();
        // console.log(JSON.stringify(charttextstyle));
    });
    it('chartLegendStyle()', () => {
        candlestickchartcomp.chartAreaComponent.topposition = 5;
        candlestickchartcomp.chartAreaComponent.leftposition = 6;
        candlestickchartcomp.chartAreaComponent.chartheight = 6;
        candlestickchartcomp.chartAreaComponent.chartbackgroundcolor = 'red';
        candlestickchartcomp.chartAreaComponent.topposition = 6;
        const chartlegendstyle = candlestickchartcomp.chartLegendStyle();
     
        })
        it('chartBackgroundStyle()', () => {
            candlestickchartcomp.chartAreaComponent.chartbackgroundcolor = 'red';
            candlestickchartcomp.chartAreaComponent.chartheight = 50;
            candlestickchartcomp.chartAreaComponent.chartwidth = 100;
            candlestickchartcomp.chartAreaComponent.leftposition = null;
            //const chartbgstyle =  candlestickchartcomp.chartBackgroundColor();
            //const json1 = {"backgroundcolor":null,"left":null,"top":null,"height":50,"width":100}
            //console.log(JSON.stringify(chartbgstyle));
        });
        it('ngOnInit()', () => {
            candlestickchartcomp.ngOnInit();
            expect(false).toBe(candlestickchartcomp.hasLoaded);
            candlestickchartcomp.drawChart();
        });


        it('get data method', () => {
            candlestickchartcomp.data;
            expect(candlestickchartcomp.data).toBe(candlestickchartcomp._data);
        });

        it('Draw Chart Test', () => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://www.gstatic.com/charts/loader.js';
            script.async = true;
            script.defer = true;
            script.onload = () => {
                candlestickchartcomp.showChart = true;
                let newdata = [{ name: 'linechart' }];
                candlestickchartcomp.data = newdata;
                candlestickchartcomp.drawChart();
                expect(false).toBe(candlestickchartcomp.hasLoaded);
            }
        });
        it('onResize()', () => {
            candlestickchartcomp.onResize(ComponentFixture);
            candlestickchartcomp.drawChart();
        })
    });






