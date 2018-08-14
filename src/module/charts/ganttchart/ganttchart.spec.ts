import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { GanttChartComponent } from './gantt.chart.component';
import { ChartLoaderService } from './../chart.loader.service';
declare var google: any;
describe('amexio-text-field' , () => {
  let comp: GanttChartComponent;
  let fixture: ComponentFixture<GanttChartComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
  TestBed.configureTestingModule({
  imports : [FormsModule],
  declarations: [ GanttChartComponent],
  providers: [ ChartLoaderService ]
  });
  fixture = TestBed.createComponent(GanttChartComponent);
  comp = fixture.componentInstance;

  });

  it('show chart', () => {
    let newdata = [{'name':'chart'}];
    comp.data = newdata ;
    comp.criticalPathEnabled=true;
    comp.innerGridTrackColor='#e64a19';
    comp.innerGridDarkTrack='#e64a19';
    expect(newdata).toEqual(comp.data);
    expect(true).toBe(comp.showChart);
  });

  it('dont show chart', () => {
    let newdata;
    comp.data = newdata ;
    expect(false).toBe(comp.showChart);
  });

  it('Draw Chart Test', () => {
    
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      comp.showChart = true;
      let newdata = [{ name : 'chart'}];
      comp.data = newdata;
      comp.drawChart();
      expect(false).toBe(comp.hasLoaded);
    };
  
  });

  // it('Draw Chart Test', () => {
  //     comp.showChart = true;
  //   let newdata = [{ name : 'chart'}];
  //   comp.data = newdata;
  //   comp.drawChart();
  //   expect(false).toBe(comp.hasLoaded);
  // });

  // it('Check Undefined', () => {
  //   let newdata = [{ name : 'chart'}];
  //   comp.data = newdata ;
  //   comp.drawChart();
  //   comp.ngOnInit();
  //   expect(comp.options).not.toBeUndefined();
  // });
  });
