// import { PieChartComponent } from './pie.chart.component';
// import { FormsModule } from '@angular/forms';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ChartLoaderService } from './../chart.loader.service';
// import { ChartTitleComponent } from '../charttitle/chart.title.component';
// import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
// import { ChartAreaComponent } from '../chartarea/chart.area.component';
// declare var google: any;
// describe('PIE CHART', () => {
//     let piechartcomp: PieChartComponent;
//     let charttitlecomp: ChartTitleComponent;
//     let chartlegendcomp: ChartLegendComponent;
//     let chartareacomp: ChartAreaComponent;
//     let linefixture: ComponentFixture<PieChartComponent>;
//     let charttitlefixture: ComponentFixture<ChartTitleComponent>;
//     let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
//     let chartareafixture: ComponentFixture<ChartAreaComponent>;

//     let chartAreaArray2: ChartAreaComponent[];
//     let chartLegendArray2: ChartLegendComponent[];

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule],
//             declarations: [PieChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
//             providers: [ChartLoaderService]
//         }).compileComponents();
//         linefixture = TestBed.createComponent(PieChartComponent);
//         charttitlefixture = TestBed.createComponent(ChartTitleComponent);
//         chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
//         chartareafixture = TestBed.createComponent(ChartAreaComponent);

//         piechartcomp = linefixture.componentInstance;
//         charttitlecomp = charttitlefixture.componentInstance;
//         chartlegendcomp = chartlegendfixture.componentInstance;
//         chartareacomp = chartareafixture.componentInstance;

//         piechartcomp.chartTitleComponent = charttitlecomp;
//         piechartcomp.chartLengendComponent = chartlegendcomp;
//         piechartcomp.chartAreaComponent = chartareacomp;

//         chartAreaArray2 = [];
//         chartAreaArray2.push(chartareacomp);

//         chartLegendArray2 = [];
//         chartLegendArray2.push(chartlegendcomp);
//         piechartcomp.showChart = false;

//     });
//     it('show chart', () => {

//         charttitlecomp.title = '';
//         expect(piechartcomp.showChart).toBe(false);
//         let newdata = [{ 'name': 'linechart' }];
//         piechartcomp.data = newdata;
//     });
//     it('dont show chart', () => {

//         expect(piechartcomp.showChart).toBe(false);
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
//         piechartcomp.drawChart();
//         piechartcomp.chartTitleComponent.title = null;
//         piechartcomp.chartBackgroundStyle();
//         piechartcomp.chartLengendStyle();
//         piechartcomp.charttitleTextStyle();
//         piechartcomp.is3d;
//         piechartcomp.piehole;
//         piechartcomp.startangle;

//     });
//     it('chartTitleTextStyle()', () => {
//         piechartcomp.charttitleTextStyle();
//         piechartcomp.chartTitleComponent.color = 'red';
//         piechartcomp.chartTitleComponent.fontname = 'times new roman';
//         piechartcomp.chartTitleComponent.fontsize = 5;
//         piechartcomp.chartTitleComponent.bold = true;
//         piechartcomp.chartTitleComponent.italic = true;
//         piechartcomp.charttitleTextStyle();
//     });
//     it('chartLegendStyle()', () => {
//         piechartcomp.chartLengendComponent.position = 'left';
//         piechartcomp.chartLengendComponent.maxlines = 5;
//         piechartcomp.chartLengendComponent.color = 'black';
//         piechartcomp.chartLengendComponent.fontsize = '12';
//         piechartcomp.chartLengendComponent.alignment = 'center';
//         piechartcomp.chartLengendComponent.fontname = 'times';
//         piechartcomp.chartLengendComponent.bold = true;
//         piechartcomp.chartLengendStyle();


//     })
//     it('chartBackgroundStyle()', () => {
//         piechartcomp.chartAreaComponent.chartbackgroundcolor = 'red';
//         piechartcomp.chartAreaComponent.chartheight = 50;
//         piechartcomp.chartAreaComponent.chartwidth = 100;
//         piechartcomp.chartAreaComponent.leftposition = null;
//         piechartcomp.chartBackgroundStyle();

//     })
//     it('ngOnInit()', () => {
//         piechartcomp.ngOnInit();
//         expect(piechartcomp.hasLoaded).toBe(false);
//         piechartcomp.drawChart();
//     });

//     it('get data method', () => {
//         piechartcomp.data;
//         expect(piechartcomp.data).toBe(piechartcomp._data);
//     });

//     it('Draw Chart Test', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             piechartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             piechartcomp.data = newdata;
//             piechartcomp.drawChart();
//             expect(false).toBe(piechartcomp.hasLoaded);
//         };
//     });
//     it('onResize()', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             piechartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             piechartcomp.data = newdata;
//             piechartcomp.onResize(ComponentFixture);
//             piechartcomp.drawChart();
//             expect(false).toBe(piechartcomp.hasLoaded);
//         };
//     });
// });






