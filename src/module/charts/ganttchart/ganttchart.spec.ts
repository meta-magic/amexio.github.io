import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { GanttChartComponent } from './gantt.chart.component';
import { ChartLoaderService } from './../chart.loader.service';

describe('amexio-text-field' , () => {
  let comp: GanttChartComponent;
  let fixture: ComponentFixture<GanttChartComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
  TestBed.configureTestingModule({
  imports : [FormsModule],
  declarations: [ GanttChartComponent],
  providers:[ChartLoaderService]
  });
  fixture = TestBed.createComponent(GanttChartComponent);
  comp = fixture.componentInstance;

  });

  it('datacheck null', () => {
    let newdata = [{'name':'chart'}];
    comp.data = newdata ;
    expect(newdata).toEqual(comp.data);
    expect(true).toBe(comp.showChart);
  });

  });
