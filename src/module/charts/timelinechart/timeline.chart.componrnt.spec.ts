// /*
// * Copyright [2019] [Metamagic]
// *
// * Licensed under the Apache License, Version 2.0 (the "License");
// * you may not use this file except in compliance with the License.
// * You may obtain a copy of the License at
// *
// *     http://www.apache.org/licenses/LICENSE-2.0
// *
// * Unless required by applicable law or agreed to in writing, software
// * distributed under the License is distributed on an "AS IS" BASIS,
// * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// * See the License for the specific language governing permissions and
// * limitations under the License.
// *
// * Author: Sagar
// */

// import { TimeLineChartComponent } from './timeline.chart.component';
// import { FormsModule } from '@angular/forms';
// import { IconLoaderService } from '../../../index'
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CommonDataService } from '../../services/data/common.data.service';
// import { ChartLoaderService } from './../chart.loader.service';
// import { ChartTitleComponent } from '../charttitle/chart.title.component';
// import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
// import { ChartAreaComponent } from '../chartarea/chart.area.component';
// declare var google: any;
// describe('TIMELINE CHART', () => {
//     let timelinechartcomp: TimeLineChartComponent;
//     let charttitlecomp: ChartTitleComponent;
//     let chartlegendcomp: ChartLegendComponent;
//     let chartareacomp: ChartAreaComponent;
//     let linefixture: ComponentFixture<TimeLineChartComponent>;
//     let charttitlefixture: ComponentFixture<ChartTitleComponent>;
//     let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
//     let chartareafixture: ComponentFixture<ChartAreaComponent>;

//     let chartAreaArray2: ChartAreaComponent[];
//     let chartLegendArray2: ChartLegendComponent[];

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule],
//             declarations: [TimeLineChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
//             providers: [ChartLoaderService]
//         }).compileComponents();
//         linefixture = TestBed.createComponent(TimeLineChartComponent);
//         charttitlefixture = TestBed.createComponent(ChartTitleComponent);
//         chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
//         chartareafixture = TestBed.createComponent(ChartAreaComponent);

//         timelinechartcomp = linefixture.componentInstance;
//         charttitlecomp = charttitlefixture.componentInstance;
//         chartlegendcomp = chartlegendfixture.componentInstance;
//         chartareacomp = chartareafixture.componentInstance;

//         timelinechartcomp.chartTitleComponent = charttitlecomp;
//         timelinechartcomp.chartLengendComponent = chartlegendcomp;
//         timelinechartcomp.chartAreaComponent = chartareacomp;

//         chartAreaArray2 = [];
//         chartAreaArray2.push(chartareacomp);

//         chartLegendArray2 = [];
//         chartLegendArray2.push(chartlegendcomp);
//         timelinechartcomp.showChart = false;

//     });
//     it('show chart', () => {

//         charttitlecomp.title = '';
//         expect(timelinechartcomp.showChart).toBe(false);
//         let newdata = [{ 'name': 'linechart' }];
//         timelinechartcomp.data = newdata;
//     });
//     it('dont show chart', () => {
//         expect(timelinechartcomp.showChart).toBe(false);
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
//         timelinechartcomp.drawChart();
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             timelinechartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             timelinechartcomp.data = newdata;
//             timelinechartcomp.drawChart();
//             expect(timelinechartcomp.hasLoaded).toBe(false);
//         };
//         timelinechartcomp.chartTitleComponent.title = null;
//         expect(timelinechartcomp.hasLoaded).toBeUndefined;
//         timelinechartcomp.ngOnInit();

//     });

//     it('ngOnInit()', () => {
//         timelinechartcomp.ngOnInit();
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             timelinechartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             timelinechartcomp.data = newdata;
//             timelinechartcomp.drawChart();
//             expect(timelinechartcomp.hasLoaded).toBe(false);
//         };

//     });


//     it('get data method', () => {
//         timelinechartcomp.data;
//         expect(timelinechartcomp.data).toBe(timelinechartcomp._data);
//     });

//     it('Draw Chart Test', () => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://www.gstatic.com/charts/loader.js';
//         script.async = false;
//         script.defer = true;
//         script.onload = () => {
//             timelinechartcomp.showChart = true;
//             const newdata = [{ name: 'linechart' }];
//             timelinechartcomp.data = newdata;
//             timelinechartcomp.drawChart();
//             expect(timelinechartcomp.hasLoaded).toBe(false);
//         };
//     });
// });






