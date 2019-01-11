/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Author: Sagar
*/

import { TimeLineChartComponent} from './timeline.chart.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonDataService } from '../../services/data/common.data.service';
import { ChartLoaderService } from './../chart.loader.service';
import { ChartTitleComponent } from '../charttitle/chart.title.component';
import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
import { ChartAreaComponent } from '../chartarea/chart.area.component';
declare var google: any;
describe('TIMELINE CHART', () => {
    //let ChartTitleComponent=new ChartTitleComponent()
    // let ChartTitleComponent = [{'name':'chart','title':'','position':'','color':'','fontname':'','fontsize':'','bold':false,'italic':''}];
    let timelinechartcomp: TimeLineChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let chartAreaArray:ChartAreaComponent[];
    let chartLegendArray: ChartLegendComponent[];
    let chartTitleComponent:  ChartTitleComponent[];
    let linefixture: ComponentFixture<TimeLineChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;

    let chartAreaArray2: ChartAreaComponent [];
    let chartLegendArray2: ChartLegendComponent []; 

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TimeLineChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
            providers: [ChartLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent(TimeLineChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);

        timelinechartcomp = linefixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp = chartlegendfixture.componentInstance;
        chartareacomp = chartareafixture.componentInstance;

        timelinechartcomp.chartTitleComponent = charttitlecomp;
        timelinechartcomp.chartLengendComponent=chartlegendcomp;
        timelinechartcomp.chartAreaComponent=chartareacomp;

        chartAreaArray2 = [];
        chartAreaArray2.push(chartareacomp);

        chartLegendArray2 = [];
        chartLegendArray2.push(chartlegendcomp);

    });
    it('show chart', () => {
        timelinechartcomp.showChart = false;
        charttitlecomp.title = '';
        expect(false).toBe( timelinechartcomp.showChart);
        let newdata = [{ 'name': 'linechart' }];
        timelinechartcomp.data = newdata;
    });
    it('dont show chart', () => {
        let newdata;
        timelinechartcomp.data = newdata;
        expect(false).toBe( timelinechartcomp.showChart);
    });
    it('chartTitleTextStyle() properties', () => {
        charttitlecomp.color = '';
        charttitlecomp.fontname = '';
        charttitlecomp.fontsize = 10;
        charttitlecomp.bold = false;
        charttitlecomp.position = '';
        charttitlecomp.title = '';
        charttitlecomp.italic = false;
    });
    it('chartLegendStyle() properties', () => {
        chartlegendcomp.position = '';
        chartlegendcomp.alignment = '';
        chartlegendcomp.color = '';
        chartlegendcomp.fontname = '';
        chartlegendcomp.fontsize = '';
        chartlegendcomp.bold = false;
        chartlegendcomp.maxlines=null;
    });
    it('chartBackgroundStyle() properties', () => {
        chartareacomp.chartbackgroundcolor = '';
        chartareacomp.chartheight = 10;
        chartareacomp.chartwidth = 10;
        chartareacomp.leftposition = 10;
        chartareacomp.topposition = null;

    });
    it('drawchart()', () => {
        timelinechartcomp.drawChart();
        timelinechartcomp.chartTitleComponent.title = null;
        expect(timelinechartcomp.hasLoaded).toBeUndefined;
        timelinechartcomp.ngOnInit();

    });
    // it('create table()',() =>{
    //     const dupArray='';
    //     const data='';
    //     const labelobject='';
    //     let aa=  [
    //         [{"datatype":'string',"label":'Prime Minister'},
    //           {"datatype":"date", "label":'Start'},
    //           {"datatype":"date","label":"End"}
    //         ],
    //         [ 'Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
    //         [ 'Adams',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
    //         [ 'Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]
    //       ];
    //       timelinechartcomp.ngOnInit();
    //      //  timelinechartcomp.createTable(aa);

    // })
    // it('chartTitleTextStyle()', () => {
    //     timelinechartcomp.chartTitleTextStyle();
    //     scatterchartcomp.chartTitleComponent.color = 'red';
    //     scatterchartcomp.chartTitleComponent.fontname='times new roman';
    //     scatterchartcomp.chartTitleComponent.fontsize=5;
    //     scatterchartcomp.chartTitleComponent.bold=true;
    //     scatterchartcomp.chartTitleComponent.italic=true;
    //     const charttextstyle= scatterchartcomp.chartTitleTextStyle();
    //    // console.log(JSON.stringify(charttextstyle));
    // });
    // it('chartLegendStyle()',()=>{
    //     scatterchartcomp.chartLengendComponent.position='left';
    //     scatterchartcomp.chartLengendComponent.maxlines=5;
    //     scatterchartcomp.chartLengendComponent.color='black';
    //     scatterchartcomp.chartLengendComponent.fontsize='12';
    //     scatterchartcomp.chartLengendComponent.alignment='center';
    //     scatterchartcomp.chartLengendComponent.fontname='times';
    //     scatterchartcomp.chartLengendComponent.bold=true;
    //     const chartlegendstyle= scatterchartcomp.chartLegendStyle();
    //     // const json1 = {"position":null,"maxLines":5,"textStyle":{"color":"black","fontsize":"12","fontName":"times","bold":null,"alignment":"center"}}
    //     //console.log(JSON.stringify(chartlegendstyle));
    //     // expect(chartlegendstyle).toEqual(json1);

    // })
    // it('chartBackgroundStyle()',()=>{
    //     scatterchartcomp.chartAreaComponent.chartbackgroundcolor='red';
    //     scatterchartcomp.chartAreaComponent.chartheight=50;
    //     scatterchartcomp.chartAreaComponent.chartwidth=100;
    //     scatterchartcomp.chartAreaComponent.leftposition=null;
    //     const chartbgstyle =  scatterchartcomp.chartBackgroundColor();
    //     //const json1 = {"backgroundcolor":null,"left":null,"top":null,"height":50,"width":100}
    //     //console.log(JSON.stringify(chartbgstyle));
    // })
    it('ngOnInit()', () => {
        timelinechartcomp.ngOnInit();
        expect(false).toBe(  timelinechartcomp.hasLoaded);
        timelinechartcomp.drawChart();
    });


    it('get data method', () => {
        timelinechartcomp.data;
        expect(timelinechartcomp.data).toBe(timelinechartcomp._data);
    });

    it('Draw Chart Test', () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            timelinechartcomp.showChart = true;
            let newdata = [{ name: 'linechart' }];
            timelinechartcomp.data = newdata;
            timelinechartcomp.drawChart();
            expect(false).toBe(timelinechartcomp.hasLoaded);
        }
    });
}); 






