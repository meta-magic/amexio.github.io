// import { AreaChartComponent } from './area.chart.component';
// import { FormsModule } from '@angular/forms';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ChartLoaderService } from './../chart.loader.service';
// import { ChartTitleComponent } from '../charttitle/chart.title.component';
// import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
// import { ChartAreaComponent } from '../chartarea/chart.area.component';
// import { DebugElement } from '@angular/core';
// declare var google: any;
// describe('AREA CHART', () => {
//     let areachartcomp: AreaChartComponent;
//     let charttitlecomp: ChartTitleComponent;
//     let chartlegendcomp: ChartLegendComponent;
//     let chartareacomp: ChartAreaComponent;
//     let linefixture: ComponentFixture<AreaChartComponent>;
//     let charttitlefixture: ComponentFixture<ChartTitleComponent>;
//     let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
//     let chartareafixture: ComponentFixture<ChartAreaComponent>;

//     let chartAreaArray2: ChartAreaComponent[];
//     let chartLegendArray2: ChartLegendComponent[];

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule],
//             declarations: [AreaChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
//             providers: [ChartLoaderService],
//         }).compileComponents();
//         linefixture = TestBed.createComponent(AreaChartComponent);
//         charttitlefixture = TestBed.createComponent(ChartTitleComponent);
//         chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
//         chartareafixture = TestBed.createComponent(ChartAreaComponent);

//         areachartcomp = linefixture.componentInstance;
//         charttitlecomp = charttitlefixture.componentInstance;
//         chartlegendcomp = chartlegendfixture.componentInstance;
//         chartareacomp = chartareafixture.componentInstance;

//         areachartcomp.chartTitleComponent = charttitlecomp;
//         areachartcomp.chartLengendComponent = chartlegendcomp;
//         areachartcomp.chartAreaComponent = chartareacomp;

//         chartAreaArray2 = [];
//         chartAreaArray2.push(chartareacomp);

//         chartLegendArray2 = [];
//         chartLegendArray2.push(chartlegendcomp);
//         areachartcomp.showChart = false;

//     });
//     it('show chart', () => {

//         charttitlecomp.title = '';
//         expect(areachartcomp.showChart).toBe(false);
//         let newdata = [{ 'name': 'linechart' }];
//         areachartcomp.data = newdata;
//     });
//     it('dont show chart', () => {
//         expect(areachartcomp.showChart).toBe(false);
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

//         areachartcomp.drawChart();
//         areachartcomp.chartTitleComponent;
//         areachartcomp.backgroundcolor;
//         areachartcomp.createTitleTextStyle();
//         areachartcomp.createChartArea();
//         areachartcomp.createChartLegend();

//     });
//     it('chartTitleTextStyle()', () => {
//         areachartcomp.chartTitleComponent;
//         areachartcomp.chartTitleComponent.color = 'red';
//         areachartcomp.chartTitleComponent.fontname = 'times new roman';
//         areachartcomp.chartTitleComponent.fontsize = 5;
//         areachartcomp.chartTitleComponent.bold = true;
//         areachartcomp.chartTitleComponent.italic = true;
//         areachartcomp.createTitleTextStyle();
//     });
//     it('chartLegendStyle()', () => {
//         areachartcomp.chartLengendComponent.position = 'left';
//         areachartcomp.chartLengendComponent.maxlines = 5;
//         areachartcomp.chartLengendComponent.color = 'black';
//         areachartcomp.chartLengendComponent.fontsize = '12';
//         areachartcomp.chartLengendComponent.alignment = 'center';
//         areachartcomp.chartLengendComponent.fontname = 'times';
//         areachartcomp.chartLengendComponent.bold = true;
//         areachartcomp.createChartLegend();

//     })
//     it('chartBackgroundStyle()', () => {
//         areachartcomp.chartAreaComponent.chartbackgroundcolor = 'red';
//         areachartcomp.chartAreaComponent.chartheight = 50;
//         areachartcomp.chartAreaComponent.chartwidth = 100;
//         areachartcomp.chartAreaComponent.leftposition = null;
//         areachartcomp.createChartArea();
//     })
//     it('ngOnInit()', () => {
//         areachartcomp.ngOnInit();
//         expect(areachartcomp.hasLoaded).toBe(false);
//         areachartcomp.drawChart();
//     });

//     it('get data method', () => {
//         areachartcomp.data;
//         expect(areachartcomp.data).toBe(areachartcomp._data);
//     });

//     it('Draw Chart Test', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             areachartcomp.showChart = true;
//             let newdata = [{ name: 'linechart' }];
//             areachartcomp.data = newdata;
//             areachartcomp.drawChart();
//             expect(false).toBe(areachartcomp.hasLoaded);
//             areachartcomp.showChart=true;
//             expect(areachartcomp.showChart).toBe(true);
//             areachartcomp['areaData'] = google.visualization.arrayToDataTable(areachartcomp._data);
//             areachartcomp['options'] = {
//                 title: areachartcomp.chartTitleComponent ? areachartcomp.chartTitleComponent.title : null,
//                 titleTextStyle: areachartcomp.chartTitleComponent ? areachartcomp.createTitleTextStyle() : null,
//                 backgroundcolor: areachartcomp.backgroundcolor,
//                 legend: areachartcomp.chartLengendComponent ? areachartcomp.createChartLegend() : 'none',
//                 chartArea: areachartcomp.chartAreaComponent ? areachartcomp.createChartArea() : null,

//             };
//             areachartcomp['areaData']=true;
//             expect(areachartcomp['areaData']).toBe(true) ; 
//                 areachartcomp['chart'] = new google.visualization.AreaChart(areachartcomp.areachart.nativeElement);
//                 areachartcomp.hasLoaded = true;
//                 areachartcomp['chart'].draw( areachartcomp['areaData'],  areachartcomp['options']);
//                 google.visualization.events.addListener(areachartcomp['chart'], 'click', areachartcomp.click);

//             areachartcomp.ngOnInit();

//         }
//     });
//     it('onResize()', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//           areachartcomp.showChart = true;
//           const newdata = [{ name: 'linechart' }];
//           areachartcomp.data = newdata;
//           areachartcomp.onResize(ComponentFixture);
//           areachartcomp.drawChart();
//           expect(areachartcomp.hasLoaded).toBe(false);
//         };
//       });

// });






