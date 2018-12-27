import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GanttChartComponent } from './gantt.chart.component';
import { ChartLoaderService } from './../chart.loader.service';
declare var google: any;
describe('GANTT CHART', () => {
  let comp: GanttChartComponent;
  let fixture: ComponentFixture<GanttChartComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [GanttChartComponent],
      providers: [ChartLoaderService]
    });
    fixture = TestBed.createComponent(GanttChartComponent);
    comp = fixture.componentInstance;
    comp.criticalPathEnabled = false;
    comp.innerGridTrackColor = '';
    comp.innerGridDarkTrack = '';

  });

  it('show chart', () => {
    let newdata = [{ 'name': 'chart' }];
    comp.data = newdata;
    comp.criticalPathEnabled = true;
    comp.innerGridTrackColor = '#e64a19';
    comp.innerGridDarkTrack = '#e64a19';
    expect(newdata).toEqual(comp.data);
    expect(true).toBe(comp.showChart);
  });
  it('drawchart()', () => {
    comp.drawChart();
    comp.criticalPathEnabled;
    comp.innerGridDarkTrack;
    comp.innerGridTrackColor;
    comp['options'] = {
      gantt: {
        criticalPathEnabled: comp.criticalPathEnabled, criticalPathStyle: {
          stroke: '#e64a19',
          strokeWidth: 5
        }
      },
      innerGridTrack: { fill: comp.innerGridTrackColor ? comp.innerGridTrackColor : '' },
      innerGridDarkTrack: { fill: comp.innerGridDarkTrack ? comp.innerGridDarkTrack : '' },
    };

  });
  let array = [
    [{ "datatype": 'string', "label": 'Task ID' }, { "datatype": 'string', "label": 'Task Name' }, { "datatype": 'string', "label": 'Resource' }, { "datatype": 'date', "label": 'Start' }, { "datatype": 'date', "label": 'End' }, { "datatype": 'number', "label": 'Duration' }, { "datatype": 'number', "label": 'Percent Complete' }, { "datatype": 'string', "label": 'Dependencies' }],
    ['toTrain', 'Walk to train stop', 'walk', null, null,(5 * 24 * 60 * 60 * 1000), 100, null],
    ['music', 'Listen to music', 'music', null, null,(70 * 24 * 60 * 60 * 1000), 100, null],
    ['wait', 'Wait for train', 'wait', null, null,(10 * 24 * 60 * 60 * 1000), 100, 'toTrain'],
    ['train', 'Train ride', 'train', null, null, (45 * 24 * 60 * 60 * 1000), 75, 'wait'],
    ['toWork', 'Walk to work', 'walk', null, null,(10 * 24 * 60 * 60 * 1000), 0, 'train'],
    ['work', 'Sit down at desk', null, null, null,(2 * 24 * 60 * 60 * 1000), 0, 'toWork']
  ];

  it('dont show chart', () => {
    let newdata;
    comp.data = newdata;
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
      let newdata = [{ name: 'chart' }];
      comp.data = newdata;
      comp.drawChart();
      expect(false).toBe(comp.hasLoaded);
    };


  });
  it('ngOnInit()', () => {
    comp.ngOnInit();
    expect(false).toBe(comp.hasLoaded);
    comp.drawChart();
  });



});
