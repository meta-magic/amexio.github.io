// import { DonutChartComponent } from './donut.chart.component';
// import { FormsModule } from '@angular/forms';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ChartLoaderService } from './../chart.loader.service';
// import { ChartTitleComponent } from '../charttitle/chart.title.component';
// import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
// import { ChartAreaComponent } from '../chartarea/chart.area.component';
// declare var google: any;
// describe('DONUT CHART', () => {
//     let donutchartcomp: DonutChartComponent;
//     let charttitlecomp: ChartTitleComponent;
//     let chartlegendcomp: ChartLegendComponent;
//     let chartareacomp: ChartAreaComponent;
//     let linefixture: ComponentFixture<DonutChartComponent>;
//     let charttitlefixture: ComponentFixture<ChartTitleComponent>;
//     let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
//     let chartareafixture: ComponentFixture<ChartAreaComponent>;

//     let chartAreaArray2: ChartAreaComponent[];
//     let chartLegendArray2: ChartLegendComponent[];

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule],
//             declarations: [DonutChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
//             providers: [ChartLoaderService]
//         }).compileComponents();
//         linefixture = TestBed.createComponent(DonutChartComponent);
//         charttitlefixture = TestBed.createComponent(ChartTitleComponent);
//         chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
//         chartareafixture = TestBed.createComponent(ChartAreaComponent);

//         donutchartcomp = linefixture.componentInstance;
//         charttitlecomp = charttitlefixture.componentInstance;
//         chartlegendcomp = chartlegendfixture.componentInstance;
//         chartareacomp = chartareafixture.componentInstance;

//         donutchartcomp.chartTitleComponent = charttitlecomp;
//         donutchartcomp.chartLengendComponent = chartlegendcomp;
//         donutchartcomp.chartAreaComponent = chartareacomp;

//         chartAreaArray2 = [];
//         chartAreaArray2.push(chartareacomp);

//         chartLegendArray2 = [];
//         chartLegendArray2.push(chartlegendcomp);

//     });
//     it('show chart', () => {
//         donutchartcomp.showChart = false;
//         charttitlecomp.title = '';
//         expect(donutchartcomp.showChart).toBe(false);
//         let newdata = [{ 'name': 'linechart' }];
//         donutchartcomp.data = newdata;
//     });
//     it('dont show chart', () => {
//         donutchartcomp.showChart = false;
//         expect(donutchartcomp.showChart).toBe(false);
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
//     it('drawchart()', () => {
//         donutchartcomp.drawChart();
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             donutchartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             donutchartcomp.data = newdata;
//             donutchartcomp.drawChart();
//             expect(false).toBe(donutchartcomp.hasLoaded);
//         };
       
//         donutchartcomp.chartTitleComponent.title = null;
//         donutchartcomp.chariTitleTextStyle();
//         donutchartcomp.chartBackgroundColor();
//         donutchartcomp.chartLegendStyle();
//         donutchartcomp.backgroundcolor;

//     });
//     it('chartTitleTextStyle()', () => {
//         donutchartcomp.chartTitleComponent;
//         donutchartcomp.chartTitleComponent.color = 'red';
//         donutchartcomp.chartTitleComponent.fontname = 'times new roman';
//         donutchartcomp.chartTitleComponent.fontsize = 5;
//         donutchartcomp.chartTitleComponent.bold = true;
//         donutchartcomp.chartTitleComponent.italic = true;
//         donutchartcomp.chariTitleTextStyle();
//     });
//     it('chartLegendStyle()', () => {
//         donutchartcomp.chartLengendComponent.position = 'left';
//         donutchartcomp.chartLengendComponent.maxlines = 5;
//         donutchartcomp.chartLengendComponent.color = 'black';
//         donutchartcomp.chartLengendComponent.fontsize = '12';
//         donutchartcomp.chartLengendComponent.alignment = 'center';
//         donutchartcomp.chartLengendComponent.fontname = 'times';
//         donutchartcomp.chartLengendComponent.bold = true;

//     })
//     it('chartBackgroundStyle()', () => {
//         donutchartcomp.chartAreaComponent.chartbackgroundcolor = 'red';
//         donutchartcomp.chartAreaComponent.chartheight = 50;
//         donutchartcomp.chartAreaComponent.chartwidth = 100;
//         donutchartcomp.chartAreaComponent.leftposition = null;
//         donutchartcomp.chartBackgroundColor();
//     })
//     it('ngOnInit()', () => {
//         donutchartcomp.ngOnInit();
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             donutchartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             donutchartcomp.data = newdata;
//             donutchartcomp.drawChart();
//             expect(false).toBe(donutchartcomp.hasLoaded);
//         };
       
//     });

//     it('get data method', () => {
//         donutchartcomp.data;
//         expect(donutchartcomp.data).toBe(donutchartcomp._data);
//     });

//     it('Draw Chart Test', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             donutchartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             donutchartcomp.data = newdata;
//             donutchartcomp.drawChart();
//             expect(false).toBe(donutchartcomp.hasLoaded);
//         };
//     });
//     it('onResize()', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             donutchartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             donutchartcomp.data = newdata;
//             donutchartcomp.onResize(ComponentFixture);
//             donutchartcomp.drawChart();
//             expect(false).toBe(donutchartcomp.hasLoaded);
//         };
//     });
// });






