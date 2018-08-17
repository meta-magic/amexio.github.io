import { BarChartComponent} from './bar.chart.component';
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
describe('BAR CHART', () => {
    //let ChartTitleComponent=new ChartTitleComponent()
    // let ChartTitleComponent = [{'name':'chart','title':'','position':'','color':'','fontname':'','fontsize':'','bold':false,'italic':''}];
    let barchartcomp: BarChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let chartAreaArray:ChartAreaComponent[];
    let chartLegendArray: ChartLegendComponent[];
    let chartTitleComponent:  ChartTitleComponent[];
    let linefixture: ComponentFixture<BarChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;

    let chartAreaArray2: ChartAreaComponent [];
    let chartLegendArray2: ChartLegendComponent []; 

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [BarChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
            providers: [ChartLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent(BarChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);

        barchartcomp = linefixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp = chartlegendfixture.componentInstance;
        chartareacomp = chartareafixture.componentInstance;

        barchartcomp.chartTitleComponent = charttitlecomp;
        barchartcomp.chartLengendComponent=chartlegendcomp;
        barchartcomp.chartAreaComponent=chartareacomp;

        chartAreaArray2 = [];
        chartAreaArray2.push(chartareacomp);

        chartLegendArray2 = [];
        chartLegendArray2.push(chartlegendcomp);

    });
    it('show chart', () => {
        barchartcomp.showChart = false;
        charttitlecomp.title = '';
        expect(false).toBe( barchartcomp.showChart);
        let newdata = [{ 'name': 'linechart' }];
        barchartcomp.data = newdata;
    });
    
    it('dont show chart', () => {
        let newdata;
        barchartcomp.data = newdata;
        expect(false).toBe(barchartcomp.showChart);
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
    it('createChartBar() properties', () => {
        chartareacomp.chartbackgroundcolor = '';
        chartareacomp.chartheight = 10;
        chartareacomp.chartwidth = 10;
        chartareacomp.leftposition = 10;
        chartareacomp.topposition = null;

    });
  
    it('drawchart()', () => {
        barchartcomp.drawChart();
        barchartcomp.chartTitleComponent;
        barchartcomp.chartTitleTextStyle();
        barchartcomp.backgroundcolor;
        barchartcomp.createChartLegend();
        barchartcomp.createChartBar();

    });
    it('chartTitleTextStyle()', () => {
        barchartcomp.chartTitleComponent;
        barchartcomp.chartTitleComponent.color = 'red';
        barchartcomp.chartTitleComponent.fontname='times new roman';
        barchartcomp.chartTitleComponent.fontsize=5;
        barchartcomp.chartTitleComponent.bold=true;
        barchartcomp.chartTitleComponent.italic=true;
        const charttextstyle= barchartcomp.chartTitleTextStyle();
    });
    
    it('chartLegendStyle()',()=>{
        barchartcomp.chartLengendComponent.position='left';
        barchartcomp.chartLengendComponent.maxlines=5;
        barchartcomp.chartLengendComponent.color='black';
        barchartcomp.chartLengendComponent.fontsize='12';
        barchartcomp.chartLengendComponent.alignment='center';
        barchartcomp.chartLengendComponent.fontname='times';
        barchartcomp.chartLengendComponent.bold=true;
        const chartlegendstyle= barchartcomp.createChartLegend();

    })
    it('chartBackgroundStyle()',()=>{
        barchartcomp.chartAreaComponent.chartbackgroundcolor='red';
        barchartcomp.chartAreaComponent.chartheight=50;
        barchartcomp.chartAreaComponent.chartwidth=100;
        barchartcomp.chartAreaComponent.leftposition=null;
        const chartbgstyle =  barchartcomp.createChartBar();
    })

    it('get data method', () => {
        barchartcomp.data;
        expect( barchartcomp.data).toBe( barchartcomp._data);
    });
    it('ngOnInit()',()=>{
        expect(barchartcomp.hasLoaded).toBeUndefined;
        //barchartcomp.ngOnInit();
    })

    it('Draw Chart Test', () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            barchartcomp.showChart = true;
            let newdata = [{ name: 'linechart' }];
            barchartcomp.data = newdata;
            barchartcomp.drawChart();
            expect(false).toBe( barchartcomp.hasLoaded);
        }
    });
    it('onResize()',()=>{
        barchartcomp.onResize(ComponentFixture);
        barchartcomp.drawChart();
      });
      
}); 






