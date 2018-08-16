import { PieChartComponent } from './pie.chart.component';
//import { AmexioFormIconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonDataService } from '../../services/data/common.data.service';
import { ChartLoaderService } from './../chart.loader.service';
import { ChartTitleComponent } from '../charttitle/chart.title.component';
import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
import { ChartAreaComponent } from '../chartarea/chart.area.component';
declare var google: any;
describe('PIE CHART', () => {
    //let ChartTitleComponent=new ChartTitleComponent()
    // let ChartTitleComponent = [{'name':'chart','title':'','position':'','color':'','fontname':'','fontsize':'','bold':false,'italic':''}];
    let piechartcomp: PieChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let chartAreaArray:ChartAreaComponent[];
    let chartLegendArray: ChartLegendComponent[];
    let chartTitleComponent:  ChartTitleComponent[];
    let linefixture: ComponentFixture<PieChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;

    let chartAreaArray2: ChartAreaComponent [];
    let chartLegendArray2: ChartLegendComponent []; 

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [PieChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
            providers: [ChartLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent(PieChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);

        piechartcomp = linefixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp = chartlegendfixture.componentInstance;
        chartareacomp = chartareafixture.componentInstance;

        piechartcomp.chartTitleComponent = charttitlecomp;
        piechartcomp.chartLengendComponent=chartlegendcomp;
        piechartcomp.chartAreaComponent=chartareacomp;

        chartAreaArray2 = [];
        chartAreaArray2.push(chartareacomp);

        chartLegendArray2 = [];
        chartLegendArray2.push(chartlegendcomp);

    });
    it('show chart', () => {
        piechartcomp.showChart = false;
        charttitlecomp.title = '';
        expect(false).toBe(piechartcomp.showChart);
        let newdata = [{ 'name': 'linechart' }];
        piechartcomp.data = newdata;
    });
    it('dont show chart', () => {
        let newdata;
        piechartcomp.data = newdata;
        expect(false).toBe(piechartcomp.showChart);
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
        piechartcomp.drawChart();
        piechartcomp.chartTitleComponent.title = null;
        piechartcomp.chartBackgroundStyle();
        piechartcomp.chartLengendStyle();
        piechartcomp.charttitleTextStyle();
        piechartcomp.is3d;
        piechartcomp.piehole;
        piechartcomp.startangle;

    });
    it('chartTitleTextStyle()', () => {
        piechartcomp.charttitleTextStyle();
        piechartcomp.chartTitleComponent.color = 'red';
        piechartcomp.chartTitleComponent.fontname='times new roman';
        piechartcomp.chartTitleComponent.fontsize=5;
        piechartcomp.chartTitleComponent.bold=true;
        piechartcomp.chartTitleComponent.italic=true;
        const charttextstyle= piechartcomp.charttitleTextStyle();
       // console.log(JSON.stringify(charttextstyle));
    });
    it('chartLegendStyle()',()=>{
        piechartcomp.chartLengendComponent.position='left';
        piechartcomp.chartLengendComponent.maxlines=5;
        piechartcomp.chartLengendComponent.color='black';
        piechartcomp.chartLengendComponent.fontsize='12';
        piechartcomp.chartLengendComponent.alignment='center';
        piechartcomp.chartLengendComponent.fontname='times';
        piechartcomp.chartLengendComponent.bold=true;
        const chartlegendstyle= piechartcomp.chartLengendStyle();
        // const json1 = {"position":null,"maxLines":5,"textStyle":{"color":"black","fontsize":"12","fontName":"times","bold":null,"alignment":"center"}}
        //console.log(JSON.stringify(chartlegendstyle));
        // expect(chartlegendstyle).toEqual(json1);

    })
    it('chartBackgroundStyle()',()=>{
        piechartcomp.chartAreaComponent.chartbackgroundcolor='red';
        piechartcomp.chartAreaComponent.chartheight=50;
        piechartcomp.chartAreaComponent.chartwidth=100;
        piechartcomp.chartAreaComponent.leftposition=null;
        const chartbgstyle = piechartcomp.chartBackgroundStyle();
        //const json1 = {"backgroundcolor":null,"left":null,"top":null,"height":50,"width":100}
        //console.log(JSON.stringify(chartbgstyle));
    })
    it('ngOnInit()', () => {
        piechartcomp.ngOnInit();
        expect(false).toBe( piechartcomp.hasLoaded);
        piechartcomp.drawChart();
    });

    it('get data method', () => {
        piechartcomp.data;
        expect(piechartcomp.data).toBe(piechartcomp._data);
    });

    it('Draw Chart Test', () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            piechartcomp.showChart = true;
            let newdata = [{ name: 'linechart' }];
            piechartcomp.data = newdata;
            piechartcomp.drawChart();
            expect(false).toBe(piechartcomp.hasLoaded);
        }
    });
    it('onResize()',()=>{
        piechartcomp.onResize(ComponentFixture);
        piechartcomp.drawChart();
      });
}); 






