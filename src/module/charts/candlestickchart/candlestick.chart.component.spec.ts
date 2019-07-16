// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { ChartAreaComponent } from '../chartarea/chart.area.component';
// import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
// import { ChartTitleComponent } from '../charttitle/chart.title.component';
// import { HorizontalAxisComponent } from '../horizontalaxis/chart.horizontalaxis.component';
// import { VerticalAxisComponent } from '../verticalaxis/chart.verticalaxis.component';
// import { ChartLoaderService } from './../chart.loader.service';
// import { CandlestickChartComponent } from './candlestick.chart.component';

// describe('CANDLESTICK CHART', () => {
//     let candlestickchartcomp: CandlestickChartComponent;
//     let charttitlecomp: ChartTitleComponent;
//     let chartlegendcomp: ChartLegendComponent;
//     let chartareacomp: ChartAreaComponent;
//     let chartvercomp: VerticalAxisComponent;
//     let charthoricomp: HorizontalAxisComponent;
//     let linefixture: ComponentFixture<CandlestickChartComponent>;
//     let charttitlefixture: ComponentFixture<ChartTitleComponent>;
//     let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
//     let chartareafixture: ComponentFixture<ChartAreaComponent>;
//     let charthorifixture: ComponentFixture<HorizontalAxisComponent>;
//     let chartverifixture: ComponentFixture<VerticalAxisComponent>;

//     let chartAreaArray2: ChartAreaComponent[];
//     let chartLegendArray2: ChartLegendComponent[];

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule],
//             declarations: [CandlestickChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent, VerticalAxisComponent, HorizontalAxisComponent],
//             providers: [ChartLoaderService],
//         }).compileComponents();
//         linefixture = TestBed.createComponent(CandlestickChartComponent);
//         charttitlefixture = TestBed.createComponent(ChartTitleComponent);
//         chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
//         chartareafixture = TestBed.createComponent(ChartAreaComponent);
//         charthorifixture = TestBed.createComponent(HorizontalAxisComponent);
//         chartverifixture = TestBed.createComponent(VerticalAxisComponent);

//         candlestickchartcomp = linefixture.componentInstance;
//         charttitlecomp = charttitlefixture.componentInstance;
//         chartlegendcomp = chartlegendfixture.componentInstance;
//         chartareacomp = chartareafixture.componentInstance;
//         chartvercomp = chartverifixture.componentInstance;
//         charthoricomp = charthorifixture.componentInstance;

//         candlestickchartcomp.chartTitleComponent = charttitlecomp;
//         candlestickchartcomp.chartAreaComponent = chartareacomp;
//         candlestickchartcomp.verticalComponent = chartvercomp;
//         candlestickchartcomp.horizontalComponent = charthoricomp;

//         chartAreaArray2 = [];
//         chartAreaArray2.push(chartareacomp);

//         chartLegendArray2 = [];
//         chartLegendArray2.push(chartlegendcomp);

//     });
//     it('show chart', () => {
//         candlestickchartcomp.showChart = false;
//         charttitlecomp.title = '';
//         expect(false).toBe(candlestickchartcomp.showChart);
//         const newdata = [{ name: 'linechart' }];
//         candlestickchartcomp.data = newdata;
//     });
//     it('dont show chart', () => {
//         candlestickchartcomp.showChart = false;
//         expect(candlestickchartcomp.showChart).toBe(false);
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
//     it('chartVerticalStyle() properties', () => {
//         chartvercomp.title = '';
//         chartvercomp.titlecolor = '';
//         candlestickchartcomp.chartVerticalStyle();
//     });
//     it('chartHorizontalStyle() properties', () => {
//         charthoricomp.title = '';
//         charthoricomp.titlecolor = '';
//         candlestickchartcomp.chartHorizontalStyle();
//     });
//     it('drawchart()', () => {
//         candlestickchartcomp.drawChart();
//         candlestickchartcomp.chartHorizontalStyle();
//         candlestickchartcomp.chartLegendStyle();
//         candlestickchartcomp.chartTileTextStyle();
//         candlestickchartcomp.chartVerticalStyle();

//     });
//     it('chartTitleTextStyle()', () => {
//         candlestickchartcomp.chartTitleComponent.color = 'red';
//         candlestickchartcomp.chartTitleComponent.fontname = 'times new roman';
//         candlestickchartcomp.chartTitleComponent.fontsize = 5;
//         candlestickchartcomp.chartTitleComponent.bold = true;
//         candlestickchartcomp.chartTitleComponent.italic = true;
//         candlestickchartcomp.chartTileTextStyle();
//     });
//     it('chartLegendStyle()', () => {
//         candlestickchartcomp.chartAreaComponent.topposition = 5;
//         candlestickchartcomp.chartAreaComponent.leftposition = 6;
//         candlestickchartcomp.chartAreaComponent.chartheight = 6;
//         candlestickchartcomp.chartAreaComponent.chartbackgroundcolor = 'red';
//         candlestickchartcomp.chartAreaComponent.topposition = 6;
//         candlestickchartcomp.chartLegendStyle();

//         });
//     it('chartBackgroundStyle()', () => {
//             candlestickchartcomp.chartAreaComponent.chartbackgroundcolor = 'red';
//             candlestickchartcomp.chartAreaComponent.chartheight = 50;
//             candlestickchartcomp.chartAreaComponent.chartwidth = 100;
//             candlestickchartcomp.chartAreaComponent.leftposition = null;
//         });
//     it('ngOnInit()', () => {
//             candlestickchartcomp.ngOnInit();
//             expect(false).toBe(candlestickchartcomp.hasLoaded);
//             candlestickchartcomp.drawChart();
//         });
//     it('get data method', () => {
//             expect(candlestickchartcomp.data).toBe(candlestickchartcomp._data);
//         });

//     it('Draw Chart Test', () => {
//             const script = document.createElement('script');
//             script.type = 'text/javascript';
//             script.src = 'https://www.gstatic.com/charts/loader.js';
//             script.async = false;
//             script.defer = true;
//             script.onload = () => {
//                 candlestickchartcomp.showChart = true;
//                 const newdata = [{ name: 'linechart' }];
//                   candlestickchartcomp.data = newdata;
//                 candlestickchartcomp.drawChart();
//                 expect(candlestickchartcomp.hasLoaded).toBe(false);
//             };
//         });
//     it('onResize()', () => {
//           const script = document.createElement('script');
//           script.type = 'text/javascript';
//           script.src = 'https://www.gstatic.com/charts/loader.js';
//           script.async = false;
//           script.defer = true;
//           script.onload = () => {
//             candlestickchartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             candlestickchartcomp.data = newdata;
//             candlestickchartcomp.onResize(ComponentFixture);
//             candlestickchartcomp.drawChart();
//             expect(candlestickchartcomp.hasLoaded).toBe(false);
//           };
//         });
//     });