import { LineChartComponent } from './line.chart.component';
//import { AmexioFormIconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonDataService } from '../../services/data/common.data.service';
import { ChartLoaderService } from './../chart.loader.service';

describe('LINE CHART', () => {

    let comp: LineChartComponent;
    let fixture: ComponentFixture<LineChartComponent>;
    beforeEach(() => {
      TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ LineChartComponent,LineChartComponent],
      providers:[IconLoaderService, CommonDataService, ChartLoaderService]
      });
      fixture = TestBed.createComponent(LineChartComponent);
      comp = fixture.componentInstance;
    });

    it('on resize', () => {
        let event: any;
        comp.onResize(event);
        comp.drawChart();
    });

    it('get data', () => {
         expect(comp.data).toEqual(comp._data);
    }); 

    it('set data with not null', () => {
        expect(comp.data).not.toBeNull
        comp.data = comp.data;
        comp.showChart = true;
   }); 
   it('set data with Null', () => {
    expect(comp.data).toBeNull;
    comp.showChart = false;
}); 

   it('drawchart function',() => {
       comp.drawChart();
       comp.showChart=true;
        expect(comp.showChart).toEqual(true);
        comp['lineData'] = '';
       // expect(comp['lineData']).toEqual(comp.createTable(comp._data));
        comp['options'] = {
            title: comp.chartTitleComponent ? comp.chartTitleComponent.title : null,
            titleTextStyle: comp.chartTitleComponent ? comp.chartTitleTextStyle() : null,
            backgroundcolor: comp.backgroundcolor,
            legend: comp.chartLengendComponent ? comp.chartLegendStyle() : 'none',
            chartArea: comp.chartAreaComponent ? comp.chartBackgroundStyle() : null,
          };

          it('chartTitleTextStyle', () => {

            let obj = jasmine.any(Object);

              comp.chartTitleTextStyle()&&obj;
        }); 
        it('showChart',()=>{
            comp.showChart=true;
        })

   }); 


});