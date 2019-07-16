// import { LineChartComponent } from './line.chart.component';
// import { FormsModule } from '@angular/forms';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ChartLoaderService } from './../chart.loader.service';
// import { ChartTitleComponent } from '../charttitle/chart.title.component';
// import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
// import { ChartAreaComponent } from '../chartarea/chart.area.component';
// declare var google: any;
// describe('LINE CHART', () => {
//     let linechartcomp: LineChartComponent;
//     let charttitlecomp: ChartTitleComponent;
//     let chartlegendcomp: ChartLegendComponent;
//     let chartareacomp: ChartAreaComponent;

//     let linefixture: ComponentFixture<LineChartComponent>;
//     let charttitlefixture: ComponentFixture<ChartTitleComponent>;
//     let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
//     let chartareafixture: ComponentFixture<ChartAreaComponent>;

//     let chartAreaArray2: ChartAreaComponent[];
//     let chartLegendArray2: ChartLegendComponent[];

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule],
//             declarations: [LineChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
//             providers: [ChartLoaderService]
//         }).compileComponents();
//         linefixture = TestBed.createComponent(LineChartComponent);
//         charttitlefixture = TestBed.createComponent(ChartTitleComponent);
//         chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
//         chartareafixture = TestBed.createComponent(ChartAreaComponent);

//         linechartcomp = linefixture.componentInstance;
//         charttitlecomp = charttitlefixture.componentInstance;
//         chartlegendcomp = chartlegendfixture.componentInstance;
//         chartareacomp = chartareafixture.componentInstance;

//         linechartcomp.chartTitleComponent = charttitlecomp;
//         linechartcomp.chartLengendComponent = chartlegendcomp;
//         linechartcomp.chartAreaComponent = chartareacomp;

//         chartAreaArray2 = [];
//         chartAreaArray2.push(chartareacomp);

//         chartLegendArray2 = [];
//         chartLegendArray2.push(chartlegendcomp);

//         linechartcomp.showChart = false;
//         linechartcomp.hasLoaded = false;


//     });

//     it('dont show chart', () => {
//         linechartcomp.showChart = false;
//         expect(linechartcomp.showChart).toBe(false);
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
//         linechartcomp.drawChart();
//         linechartcomp.chartTitleComponent.title = null;
//         linechartcomp.chartBackgroundStyle();
//         linechartcomp.chartLegendStyle();
//         linechartcomp.chartTitleTextStyle();


//     });
//     it('chartTitleTextStyle()', () => {
//         linechartcomp.chartTitleTextStyle();
//         linechartcomp.chartTitleComponent.color = 'red';
//         linechartcomp.chartTitleComponent.fontname = 'times new roman';
//         linechartcomp.chartTitleComponent.fontsize = 5;
//         linechartcomp.chartTitleComponent.bold = true;
//         linechartcomp.chartTitleComponent.italic = true;
//         linechartcomp.chartTitleTextStyle();
//     });
//     it('chartLegendStyle()', () => {
//         linechartcomp.chartLengendComponent.position = 'left';
//         linechartcomp.chartLengendComponent.maxlines = 5;
//         linechartcomp.chartLengendComponent.color = 'black';
//         linechartcomp.chartLengendComponent.fontsize = '12';
//         linechartcomp.chartLengendComponent.alignment = 'center';
//         linechartcomp.chartLengendComponent.fontname = 'times';
//         linechartcomp.chartLengendComponent.bold = true;
//         linechartcomp.chartLegendStyle();


//     })
//     it('chartBackgroundStyle()', () => {
//         linechartcomp.chartAreaComponent.chartbackgroundcolor = 'red';
//         linechartcomp.chartAreaComponent.chartheight = 50;
//         linechartcomp.chartAreaComponent.chartwidth = 100;
//         linechartcomp.chartAreaComponent.leftposition = null;
//         linechartcomp.chartBackgroundStyle();

//     });
//     it('ngOnInit()', () => {
//         linechartcomp.ngOnInit();
//         expect(linechartcomp.hasLoaded).toBe(false);
//         linechartcomp.drawChart();
//     });
//     it('get data method', () => {
//         linechartcomp.data;
//         expect(linechartcomp.data).toBe(linechartcomp._data);
//     });

//     it('Draw Chart Test', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             linechartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             linechartcomp.data = newdata;
//             linechartcomp.drawChart();
//             expect(false).toBe(linechartcomp.hasLoaded);
//         };
//     });
//     it('onResize()', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             linechartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             linechartcomp.data = newdata;
//             linechartcomp.onResize(ComponentFixture);
//             linechartcomp.drawChart();
//             expect(false).toBe(linechartcomp.hasLoaded);
//         };
//     });
// });






