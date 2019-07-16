// import { ScatterChartComponent } from './scatter.chart.component';
// import { FormsModule } from '@angular/forms';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ChartLoaderService } from './../chart.loader.service';
// import { ChartTitleComponent } from '../charttitle/chart.title.component';
// import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
// import { ChartAreaComponent } from '../chartarea/chart.area.component';
// import { VerticalAxisComponent } from '../verticalaxis/chart.verticalaxis.component';
// import { HorizontalAxisComponent } from '../horizontalaxis/chart.horizontalaxis.component';

// declare var google: any;
// describe('SCATTER CHART', () => {
//     let scatterchartcomp: ScatterChartComponent;
//     let charttitlecomp: ChartTitleComponent;
//     let chartlegendcomp: ChartLegendComponent;
//     let chartareacomp: ChartAreaComponent;
//     let chartvercomp: VerticalAxisComponent;
//     let charthorcomp: HorizontalAxisComponent;
//     let linefixture: ComponentFixture<ScatterChartComponent>;
//     let charttitlefixture: ComponentFixture<ChartTitleComponent>;
//     let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
//     let chartareafixture: ComponentFixture<ChartAreaComponent>;
//     let charthorfixture: ComponentFixture<HorizontalAxisComponent>;
//     let chartverfixture: ComponentFixture<VerticalAxisComponent>;


//     let chartAreaArray2: ChartAreaComponent[];
//     let chartLegendArray2: ChartLegendComponent[];

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule],
//             declarations: [ScatterChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent, HorizontalAxisComponent, VerticalAxisComponent],
//             providers: [ChartLoaderService]
//         }).compileComponents();
//         linefixture = TestBed.createComponent(ScatterChartComponent);
//         charttitlefixture = TestBed.createComponent(ChartTitleComponent);
//         chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
//         chartareafixture = TestBed.createComponent(ChartAreaComponent);
//         charthorfixture = TestBed.createComponent(HorizontalAxisComponent);
//         chartverfixture = TestBed.createComponent(VerticalAxisComponent);

//         scatterchartcomp = linefixture.componentInstance;
//         charttitlecomp = charttitlefixture.componentInstance;
//         chartlegendcomp = chartlegendfixture.componentInstance;
//         chartareacomp = chartareafixture.componentInstance;
//         charthorcomp = charthorfixture.componentInstance;
//         chartvercomp = chartverfixture.componentInstance;


//         scatterchartcomp.chartTitleComponent = charttitlecomp;
//         scatterchartcomp.chartLengendComponent = chartlegendcomp;
//         scatterchartcomp.chartAreaComponent = chartareacomp;
//         scatterchartcomp.verticalComponent = chartvercomp;
//         scatterchartcomp.horizontalComponent = charthorcomp;

//         chartAreaArray2 = [];
//         chartAreaArray2.push(chartareacomp);

//         chartLegendArray2 = [];
//         chartLegendArray2.push(chartlegendcomp);
//         scatterchartcomp.showChart = false;

//     });
//     it('show chart', () => {

//         charttitlecomp.title = '';
//         expect(scatterchartcomp.showChart).toBe(false);
//         let newdata = [{ 'name': 'linechart' }];
//         scatterchartcomp.data = newdata;
//     });
//     it('dont show chart', () => {

//         expect(scatterchartcomp.showChart).toBe(false);
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
//         scatterchartcomp.drawChart();
//         scatterchartcomp.chartTitleComponent.title = null;

//     });
//     it('chartTitleTextStyle()', () => {
//         scatterchartcomp.chartTitleTextStyle();
//         scatterchartcomp.chartTitleComponent.color = 'red';
//         scatterchartcomp.chartTitleComponent.fontname = 'times new roman';
//         scatterchartcomp.chartTitleComponent.fontsize = 5;
//         scatterchartcomp.chartTitleComponent.bold = true;
//         scatterchartcomp.chartTitleComponent.italic = true;
//         scatterchartcomp.chartTitleTextStyle();
//     });
//     it('chartLegendStyle()', () => {
//         scatterchartcomp.chartLengendComponent.position = 'left';
//         scatterchartcomp.chartLengendComponent.maxlines = 5;
//         scatterchartcomp.chartLengendComponent.color = 'black';
//         scatterchartcomp.chartLengendComponent.fontsize = '12';
//         scatterchartcomp.chartLengendComponent.alignment = 'center';
//         scatterchartcomp.chartLengendComponent.fontname = 'times';
//         scatterchartcomp.chartLengendComponent.bold = true;
//         scatterchartcomp.chartLegendStyle();


//     });
//     it('chartBackgroundStyle()', () => {
//         scatterchartcomp.chartAreaComponent.chartbackgroundcolor = 'red';
//         scatterchartcomp.chartAreaComponent.chartheight = 50;
//         scatterchartcomp.chartAreaComponent.chartwidth = 100;
//         scatterchartcomp.chartAreaComponent.leftposition = null;
//         scatterchartcomp.chartBackgroundColor();

//     });
//     it('chartVerticalStyle()', () => {
//         chartvercomp.title = '';
//         chartvercomp.titlecolor = 'red';
//         scatterchartcomp.chartVerticalStyle();
//     });
//     it('chartHorizontalStyle()', () => {
//         charthorcomp.title = '';
//         charthorcomp.titlecolor = 'red';
//         scatterchartcomp.chartHorizontalStyle();
//     });
//     it('ngOnInit()', () => {
//         scatterchartcomp.ngOnInit();
//         expect(scatterchartcomp.hasLoaded).toBe(false);
//         scatterchartcomp.drawChart();
//     });



//     it('get data method', () => {
//         scatterchartcomp.data;
//         expect(scatterchartcomp.data).toBe(scatterchartcomp._data);
//     });

//     it('Draw Chart Test', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             scatterchartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             scatterchartcomp.data = newdata;
//             scatterchartcomp.drawChart();
//             expect(scatterchartcomp.hasLoaded).toBe(false);
//         };
//     });
//     it('onResize()', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             scatterchartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             scatterchartcomp.data = newdata;
//             scatterchartcomp.onResize(ComponentFixture);
//             scatterchartcomp.drawChart();
//             expect(scatterchartcomp.hasLoaded).toBe(false);
//         };
//     });
// });






