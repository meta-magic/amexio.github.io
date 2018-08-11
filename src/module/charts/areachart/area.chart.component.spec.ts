import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AreaChartComponent } from './area.chart.component';
import { ChartLoaderService } from './../chart.loader.service';
declare var google: any;
describe('Area Chart' , () => {
  let areachartcomponent: AreaChartComponent;
  let areafixture: ComponentFixture<AreaChartComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports : [FormsModule],
    declarations: [ AreaChartComponent],
    providers: [ ChartLoaderService ]
    });
    areafixture = TestBed.createComponent(AreaChartComponent);
    areachartcomponent = areafixture.componentInstance;

  });

  it('variable check', () => {
    const chartdata = [{'title':'area chart'}];
    areachartcomponent.data = chartdata;
    expect(areachartcomponent.showChart).toEqual(true);
    expect(areachartcomponent._data).toEqual(chartdata);

  });

});
