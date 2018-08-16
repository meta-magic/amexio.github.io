import { ColumnChartComponent} from './column.chart.component';
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
describe('DONUT CHART', () => {
    //let ChartTitleComponent=new ChartTitleComponent()
    // let ChartTitleComponent = [{'name':'chart','title':'','position':'','color':'','fontname':'','fontsize':'','bold':false,'italic':''}];
    let columnchartcomp: ColumnChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let chartAreaArray:ChartAreaComponent[];
    let chartLegendArray: ChartLegendComponent[];
    let chartTitleComponent:  ChartTitleComponent[];
    let linefixture: ComponentFixture<ColumnChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;

    let chartAreaArray2: ChartAreaComponent [];
    let chartLegendArray2: ChartLegendComponent []; 

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ColumnChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
            providers: [ChartLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent(ColumnChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);

        columnchartcomp = linefixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp = chartlegendfixture.componentInstance;
        chartareacomp = chartareafixture.componentInstance;

        columnchartcomp.chartTitleComponent = charttitlecomp;
        columnchartcomp.chartLengendComponent=chartlegendcomp;
        columnchartcomp.chartAreaComponent=chartareacomp;

        chartAreaArray2 = [];
        chartAreaArray2.push(chartareacomp);

        chartLegendArray2 = [];
        chartLegendArray2.push(chartlegendcomp);

    });
    it('show chart', () => {
        columnchartcomp.showChart = false;
        charttitlecomp.title = '';
        expect(false).toBe( columnchartcomp.showChart);
        let newdata = [{ 'name': 'linechart' }];
        columnchartcomp.data = newdata;
    });
    it('dont show chart', () => {
        let newdata;
        columnchartcomp.data = newdata;
        expect(false).toBe( columnchartcomp.showChart);
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
        columnchartcomp.drawChart();
        columnchartcomp.chartTitleComponent;
        columnchartcomp.chartTitleTextStyle();
        columnchartcomp.chartBackGroundColor();
        columnchartcomp.chartLegendStyle();

    });
    it('chartTitleTextStyle()', () => {
        columnchartcomp.chartTitleComponent;
        columnchartcomp.chartTitleComponent.color = 'red';
        columnchartcomp.chartTitleComponent.fontname='times new roman';
        columnchartcomp.chartTitleComponent.fontsize=5;
        columnchartcomp.chartTitleComponent.bold=true;
        columnchartcomp.chartTitleComponent.italic=true;
        const charttextstyle= columnchartcomp.chartTitleTextStyle();
       // console.log(JSON.stringify(charttextstyle));
    });
    it('chartLegendStyle()',()=>{
        columnchartcomp.chartLengendComponent.position='left';
        columnchartcomp.chartLengendComponent.maxlines=5;
        columnchartcomp.chartLengendComponent.color='black';
        columnchartcomp.chartLengendComponent.fontsize='12';
        columnchartcomp.chartLengendComponent.alignment='center';
        columnchartcomp.chartLengendComponent.fontname='times';
        columnchartcomp.chartLengendComponent.bold=true;
        const chartlegendstyle= columnchartcomp.chartLegendStyle();
        // const json1 = {"position":null,"maxLines":5,"textStyle":{"color":"black","fontsize":"12","fontName":"times","bold":null,"alignment":"center"}}
        //console.log(JSON.stringify(chartlegendstyle));
        // expect(chartlegendstyle).toEqual(json1);

    })
    it('chartBackgroundStyle()',()=>{
        columnchartcomp.chartAreaComponent.chartbackgroundcolor='red';
        columnchartcomp.chartAreaComponent.chartheight=50;
        columnchartcomp.chartAreaComponent.chartwidth=100;
        columnchartcomp.chartAreaComponent.leftposition=null;
        const chartbgstyle = columnchartcomp.chartBackGroundColor();
        //const json1 = {"backgroundcolor":null,"left":null,"top":null,"height":50,"width":100}
        //console.log(JSON.stringify(chartbgstyle));
    })
    it('ngOnInit()', () => {
        columnchartcomp.ngOnInit();
        expect(false).toBe(  columnchartcomp.hasLoaded);
        columnchartcomp.drawChart();
    });

    it('get data method', () => {
        columnchartcomp.data;
        expect(columnchartcomp.data).toBe(columnchartcomp._data);
    });

    it('Draw Chart Test', () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            columnchartcomp.showChart = true;
            let newdata = [{ name: 'linechart' }];
            columnchartcomp.data = newdata;
            columnchartcomp.drawChart();
            expect(false).toBe(columnchartcomp.hasLoaded);
        }
    });
    it('onResize()',()=>{
        columnchartcomp.onResize(ComponentFixture);
        columnchartcomp.drawChart();
      });
}); 






