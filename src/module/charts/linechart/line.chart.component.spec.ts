import { LineChartComponent } from './line.chart.component';
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
describe('LINE CHART', () => {
    //let ChartTitleComponent=new ChartTitleComponent()
    // let ChartTitleComponent = [{'name':'chart','title':'','position':'','color':'','fontname':'','fontsize':'','bold':false,'italic':''}];
    let linechartcomp: LineChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let chartAreaArray:ChartAreaComponent[];
    let chartLegendArray: ChartLegendComponent[];
    let chartTitleComponent:  ChartTitleComponent[];
    let linefixture: ComponentFixture<LineChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;

    let chartAreaArray2: ChartAreaComponent [];
    let chartLegendArray2: ChartLegendComponent []; 

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [LineChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
            providers: [ChartLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent(LineChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);

        linechartcomp = linefixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp = chartlegendfixture.componentInstance;
        chartareacomp = chartareafixture.componentInstance;

        linechartcomp.chartTitleComponent = charttitlecomp;
        linechartcomp.chartLengendComponent=chartlegendcomp;
        linechartcomp.chartAreaComponent=chartareacomp;

        chartAreaArray2 = [];
        chartAreaArray2.push(chartareacomp);

        chartLegendArray2 = [];
        chartLegendArray2.push(chartlegendcomp);

    });
    it('show chart', () => {
        linechartcomp.showChart = false;
        charttitlecomp.title = '';
        expect(false).toBe(linechartcomp.showChart);
        let newdata = [{ 'name': 'linechart' }];
        linechartcomp.data = newdata;
    });
    it('dont show chart', () => {
        let newdata;
        linechartcomp.data = newdata;
        expect(false).toBe(linechartcomp.showChart);
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
        linechartcomp.drawChart();
        linechartcomp.chartTitleComponent.title = null;

    });
    it('chartTitleTextStyle()', () => {
        linechartcomp.chartTitleTextStyle();
        linechartcomp.chartTitleComponent.color = 'red';
        linechartcomp.chartTitleComponent.fontname='times new roman';
        linechartcomp.chartTitleComponent.fontsize=5;
        linechartcomp.chartTitleComponent.bold=true;
        linechartcomp.chartTitleComponent.italic=true;
        const charttextstyle=linechartcomp.chartTitleTextStyle();
       // console.log(JSON.stringify(charttextstyle));
    });
    it('chartLegendStyle()',()=>{
    linechartcomp.chartLengendComponent.position='left';
      linechartcomp.chartLengendComponent.maxlines=5;
        linechartcomp.chartLengendComponent.color='black';
        linechartcomp.chartLengendComponent.fontsize='12';
        linechartcomp.chartLengendComponent.alignment='center';
        linechartcomp.chartLengendComponent.fontname='times';
        linechartcomp.chartLengendComponent.bold=true;
        const chartlegendstyle=linechartcomp.chartLegendStyle();
        // const json1 = {"position":null,"maxLines":5,"textStyle":{"color":"black","fontsize":"12","fontName":"times","bold":null,"alignment":"center"}}
        //console.log(JSON.stringify(chartlegendstyle));
        // expect(chartlegendstyle).toEqual(json1);

    })
    it('chartBackgroundStyle()',()=>{
        linechartcomp.chartAreaComponent.chartbackgroundcolor='red';
        linechartcomp.chartAreaComponent.chartheight=50;
        linechartcomp.chartAreaComponent.chartwidth=100;
        linechartcomp.chartAreaComponent.leftposition=null;
        const chartbgstyle = linechartcomp.chartBackgroundStyle();
        //const json1 = {"backgroundcolor":null,"left":null,"top":null,"height":50,"width":100}
        //console.log(JSON.stringify(chartbgstyle));
    })
    it('ngAfterContentInit()',()=>{
        
        //linechartcomp.ngAfterContentInit();
        //console.log(" ********************* "+chartAreaArray2.toArray());
       // linechartcomp.ngAfterContentInit();
       // expect(linechartcomp.chartLegendArray).toEqual(linechartcomp.chartLegendComp.length[1]);
       //expect(linechartcomp.chartLengendComponent ).toEqual(linechartcomp.chartLegendArray.pop());
    
    
    
    });

    it('get data method', () => {
        linechartcomp.data;
        expect(linechartcomp.data).toBe(linechartcomp._data);
    });

    it('Draw Chart Test', () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            linechartcomp.showChart = true;
            let newdata = [{ name: 'linechart' }];
            linechartcomp.data = newdata;
            linechartcomp.drawChart();
            expect(false).toBe(linechartcomp.hasLoaded);
        }
    });
    it('onResize()',()=>{
        linechartcomp.onResize(ComponentFixture);
        linechartcomp.drawChart();
      });
}); 






