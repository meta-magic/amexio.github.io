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


});