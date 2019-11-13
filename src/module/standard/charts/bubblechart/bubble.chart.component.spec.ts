// import { BubbleChartComponent } from './bubble.chart.component';
// import { FormsModule } from '@angular/forms';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ChartLoaderService } from './../chart.loader.service';
// import { ChartTitleComponent } from '../charttitle/chart.title.component';
// import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
// import { ChartAreaComponent } from '../chartarea/chart.area.component';
// import { HorizontalAxisComponent } from '../horizontalaxis/chart.horizontalaxis.component';
// import { VerticalAxisComponent } from '../verticalaxis/chart.verticalaxis.component';

// declare var google: any;
// describe('BUBBLE CHART', () => {
//     let bubblechartcomp: BubbleChartComponent;
//     let charttitlecomp: ChartTitleComponent;
//     let chartlegendcomp: ChartLegendComponent;
//     let chartareacomp: ChartAreaComponent;
//     let chartvercomp: VerticalAxisComponent;
//     let charthorcomp: HorizontalAxisComponent;
//     let linefixture: ComponentFixture<BubbleChartComponent>;
//     let charttitlefixture: ComponentFixture<ChartTitleComponent>;
//     let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
//     let chartareafixture: ComponentFixture<ChartAreaComponent>;
//     let chartverfixture: ComponentFixture<VerticalAxisComponent>;
//     let charthorfixture: ComponentFixture<HorizontalAxisComponent>

//     let chartAreaArray2: ChartAreaComponent[];
//     let chartLegendArray2: ChartLegendComponent[];

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule],
//             declarations: [BubbleChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent, HorizontalAxisComponent, VerticalAxisComponent],
//             providers: [ChartLoaderService]
//         }).compileComponents();
//         linefixture = TestBed.createComponent(BubbleChartComponent);
//         charttitlefixture = TestBed.createComponent(ChartTitleComponent);
//         chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
//         chartareafixture = TestBed.createComponent(ChartAreaComponent);
//         chartverfixture = TestBed.createComponent(VerticalAxisComponent);
//         charthorfixture = TestBed.createComponent(HorizontalAxisComponent);

//         bubblechartcomp = linefixture.componentInstance;
//         charttitlecomp = charttitlefixture.componentInstance;
//         chartlegendcomp = chartlegendfixture.componentInstance;
//         chartareacomp = chartareafixture.componentInstance;
//         chartvercomp = chartverfixture.componentInstance;
//         charthorcomp = charthorfixture.componentInstance;

//         bubblechartcomp.chartTitleComponent = charttitlecomp;
//         bubblechartcomp.chartLengendComponent = chartlegendcomp;
//         bubblechartcomp.chartAreaComponent = chartareacomp;
//         bubblechartcomp.verticalComponent = chartvercomp;
//         bubblechartcomp.horizontalComponent = charthorcomp;

//         chartAreaArray2 = [];
//         chartAreaArray2.push(chartareacomp);

//         chartLegendArray2 = [];
//         chartLegendArray2.push(chartlegendcomp);

//     });
//     it('show chart', () => {
//         bubblechartcomp.showChart = false;
//         charttitlecomp.title = '';
//         expect(false).toBe(bubblechartcomp.showChart);
//         let newdata = [{ 'name': 'linechart' }];
//         bubblechartcomp.data = newdata;
//     });
//     it('dont show chart', () => {
//         let newdata;
//         bubblechartcomp.data = newdata;
//         expect(false).toBe(bubblechartcomp.showChart);
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
//         bubblechartcomp.drawChart();
//         bubblechartcomp.chartTitleComponent;
//         bubblechartcomp.createTitleTextStyle();
//         bubblechartcomp.createChartLegend();
//         bubblechartcomp.createChartBackground();
//         bubblechartcomp.createchartHorizontal();
//         bubblechartcomp.createChartVertical();
//         bubblechartcomp.chartAreaComponent;

//     });
//     it('chartTitleTextStyle()', () => {
//         bubblechartcomp.chartTitleComponent;
//         bubblechartcomp.chartTitleComponent.color = 'red';
//         bubblechartcomp.chartTitleComponent.fontname = 'times new roman';
//         bubblechartcomp.chartTitleComponent.fontsize = 5;
//         bubblechartcomp.chartTitleComponent.bold = true;
//         bubblechartcomp.chartTitleComponent.italic = true;
//         bubblechartcomp.createTitleTextStyle();
//         // console.log(JSON.stringify(charttextstyle));
//     });
//     // it('chartLegendStyle()', () => {
//     //     bubblechartcomp.chartLengendComponent.position = 'left';
//     //     bubblechartcomp.chartLengendComponent.maxlines = 5;
//     //     bubblechartcomp.chartLengendComponent.color = 'black';
//     //     bubblechartcomp.chartLengendComponent.fontsize = '12';
//     //     bubblechartcomp.chartLengendComponent.alignment = 'center';
//     //     bubblechartcomp.chartLengendComponent.fontname = 'times';
//     //     bubblechartcomp.chartLengendComponent.bold = true;
//     //     bubblechartcomp.createChartLegend();

//     // });
//     it('createchartHorizontal()', () => {
//         charthorcomp.title = '';
//         charthorcomp.titlecolor = '';
//         bubblechartcomp.createchartHorizontal();
//     })
//     it('chartBackgroundStyle()', () => {
//         bubblechartcomp.chartAreaComponent.chartbackgroundcolor = 'red';
//         bubblechartcomp.chartAreaComponent.chartheight = 50;
//         bubblechartcomp.chartAreaComponent.chartwidth = 100;
//         bubblechartcomp.chartAreaComponent.leftposition = null;
//         bubblechartcomp.createChartBackground();

//     })
//     it('ngOnInit()', () => {
//         bubblechartcomp.hasLoaded = false;
//         expect(bubblechartcomp.hasLoaded).toBe(false);
//         bubblechartcomp.drawChart();
//         bubblechartcomp.ngOnInit();

//     })

//     it('get data method', () => {
//         bubblechartcomp.data;
//         expect(bubblechartcomp.data).toBe(bubblechartcomp._data);
//     });

//     it('Draw Chart Test', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             bubblechartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             bubblechartcomp.data = newdata;
//             bubblechartcomp.drawChart();
//             expect(false).toBe(bubblechartcomp.hasLoaded);
//         };
//     });
//     it('onResize()', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             bubblechartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             bubblechartcomp.data = newdata;
//             bubblechartcomp.onResize(ComponentFixture);
//             bubblechartcomp.drawChart();
//             expect(false).toBe(bubblechartcomp.hasLoaded);
//         };
//     });


// });






