// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { ChartAreaComponent } from '../chartarea/chart.area.component';
// import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
// import { ChartTitleComponent } from '../charttitle/chart.title.component';
// import { HorizontalAxisComponent } from '../horizontalaxis/chart.horizontalaxis.component';
// import { VerticalAxisComponent } from '../verticalaxis/chart.verticalaxis.component';
// import { ChartLoaderService } from './../chart.loader.service';
// import { CandlestickWaterfallChartComponent } from './candlestickwaterfall.chart.component';

// declare var google: any;
// describe('CANDLESTICKWATERFALL CHART', () => {
//     let candlestickwaterchartcomp: CandlestickWaterfallChartComponent;
//     let charttitlecomp: ChartTitleComponent;
//     let chartlegendcomp: ChartLegendComponent;
//     let chartareacomp: ChartAreaComponent;
//     let chartvercomp: VerticalAxisComponent;
//     let charthorcomp: HorizontalAxisComponent;
//     let chartverfixture: ComponentFixture<VerticalAxisComponent>;
//     let charthorfixture: ComponentFixture<HorizontalAxisComponent>;
//     let linefixture: ComponentFixture<CandlestickWaterfallChartComponent>;
//     let charttitlefixture: ComponentFixture<ChartTitleComponent>;
//     let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
//     let chartareafixture: ComponentFixture<ChartAreaComponent>;

//     let chartAreaArray2: ChartAreaComponent[];
//     let chartLegendArray2: ChartLegendComponent[];

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule],
//             declarations: [CandlestickWaterfallChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent, VerticalAxisComponent, HorizontalAxisComponent],
//             providers: [ChartLoaderService],
//         }).compileComponents();
//         linefixture = TestBed.createComponent(CandlestickWaterfallChartComponent);
//         charttitlefixture = TestBed.createComponent(ChartTitleComponent);
//         chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
//         chartareafixture = TestBed.createComponent(ChartAreaComponent);
//         chartverfixture = TestBed.createComponent(VerticalAxisComponent);
//         charthorfixture = TestBed.createComponent(HorizontalAxisComponent);
//         candlestickwaterchartcomp = linefixture.componentInstance;
//         charttitlecomp = charttitlefixture.componentInstance;
//         chartlegendcomp = chartlegendfixture.componentInstance;
//         chartareacomp = chartareafixture.componentInstance;
//         chartvercomp = chartverfixture.componentInstance;
//         charthorcomp = charthorfixture.componentInstance;

//         candlestickwaterchartcomp.chartTitleComponent = charttitlecomp;
//         candlestickwaterchartcomp.chartAreaComponent = chartareacomp;
//         candlestickwaterchartcomp.verticalComponent = chartvercomp;
//         candlestickwaterchartcomp.horizontalComponent = charthorcomp;
//         chartAreaArray2 = [];
//         chartAreaArray2.push(chartareacomp);

//         chartLegendArray2 = [];
//         chartLegendArray2.push(chartlegendcomp);

//         candlestickwaterchartcomp.hasLoaded = false;

//     });
//     it('show chart', () => {
//         candlestickwaterchartcomp.showChart = false;
//         charttitlecomp.title = '';
//         expect(false).toBe(candlestickwaterchartcomp.showChart);
//         const newdata = [{ name: 'linechart' }];
//         candlestickwaterchartcomp.data = newdata;
//     });
//     it('dont show chart', () => {
//         candlestickwaterchartcomp.showChart = false;
//         expect(false).toBe(candlestickwaterchartcomp.showChart);
//     });
//     it('chartTitleTextStyle() properties', () => {
//         charttitlecomp.color = '';
//         charttitlecomp.fontname = '';
//         charttitlecomp.fontsize = 10;
//         charttitlecomp.bold = false;
//         charttitlecomp.position = '';
//         charttitlecomp.title = '';
//         charttitlecomp.italic = false;
//     });
//     it('chartLegendStyle() properties', () => {
//         chartlegendcomp.position = '';
//         chartlegendcomp.alignment = '';
//         chartlegendcomp.color = '';
//         chartlegendcomp.fontname = '';
//         chartlegendcomp.fontsize = '';
//         chartlegendcomp.bold = false;
//         chartlegendcomp.maxlines = null;
//     });
//     it('chartBackgroundStyle() properties', () => {
//         chartareacomp.chartbackgroundcolor = '';
//         chartareacomp.chartheight = 10;
//         chartareacomp.chartwidth = 10;
//         chartareacomp.leftposition = 10;
//         chartareacomp.topposition = null;

//     });
//     it('chartcolorstyle() properties', () => {
//         candlestickwaterchartcomp.fallingcolor = 'red';
//         candlestickwaterchartcomp.risingcolor = 'red';
//         candlestickwaterchartcomp.chartColorStyle();
//     }),
//         it('drawchart()', () => {
//             candlestickwaterchartcomp.drawChart();
//             const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             candlestickwaterchartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             candlestickwaterchartcomp.data = newdata;
//             candlestickwaterchartcomp.drawChart();
//             expect(candlestickwaterchartcomp.hasLoaded).toBe(false);
//         };
//             expect(candlestickwaterchartcomp.showChart).toBeUndefined;
//             candlestickwaterchartcomp['options'];

//             candlestickwaterchartcomp.chartLegendStyle();
//             candlestickwaterchartcomp.chartVerticalComponent();
//             candlestickwaterchartcomp.chartHorizontalComponent();
//             candlestickwaterchartcomp.chartColorStyle();
//         });
//     it('chartTitleTextStyle()', () => {
//         candlestickwaterchartcomp.chartTitleComponent.color = 'red';
//         candlestickwaterchartcomp.chartTitleComponent.fontname = 'times new roman';
//         candlestickwaterchartcomp.chartTitleComponent.fontsize = 5;
//         candlestickwaterchartcomp.chartTitleComponent.bold = true;
//         candlestickwaterchartcomp.chartTitleComponent.italic = true;
//         candlestickwaterchartcomp.chartTitleTextStyle();
//     });

//     it(' chartLegendStyle()', () => {
//         chartareacomp.leftposition = 5;
//         chartareacomp.chartheight = 8;
//         chartareacomp.chartwidth = 6;
//         chartareacomp.chartbackgroundcolor = 'red';
//         chartareacomp.topposition = 5;
//         candlestickwaterchartcomp.chartLegendStyle();

//     });
//     it('chartBackgroundStyle()', () => {
//         candlestickwaterchartcomp.chartAreaComponent.chartbackgroundcolor = 'red';
//         candlestickwaterchartcomp.chartAreaComponent.chartheight = 50;
//         candlestickwaterchartcomp.chartAreaComponent.chartwidth = 100;
//         candlestickwaterchartcomp.chartAreaComponent.leftposition = null;
//     });
//     it('chartVerticalComponent()', () => {
//         chartvercomp.title = '';
//         chartvercomp.titlecolor = '';
//         candlestickwaterchartcomp.chartVerticalComponent();
//     });
//     it('chartHorizontalComponent()', () => {
//         charthorcomp.title = '';
//         chartvercomp.titlecolor = '';
//         candlestickwaterchartcomp.chartHorizontalComponent();
//     });
//     it('ngOnInit()', () => {
//         candlestickwaterchartcomp.ngOnInit();
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             candlestickwaterchartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             candlestickwaterchartcomp.data = newdata;
//             candlestickwaterchartcomp.drawChart();
//             expect(candlestickwaterchartcomp.hasLoaded).toBe(false);
//         };
//     });

//     it('get data method', () => {
//         expect(candlestickwaterchartcomp.data).toBe(candlestickwaterchartcomp._data);
//     });

//     it('Draw Chart Test', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             candlestickwaterchartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             candlestickwaterchartcomp.data = newdata;
//             candlestickwaterchartcomp.drawChart();
//             expect(candlestickwaterchartcomp.hasLoaded).toBe(false);
//         };
//     });
//     it('onResize()', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             candlestickwaterchartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             candlestickwaterchartcomp.data = newdata;
//             candlestickwaterchartcomp.onResize(ComponentFixture);
//             candlestickwaterchartcomp.drawChart();
//             expect(candlestickwaterchartcomp.hasLoaded).toBe(false);
//         };
//     });
// });