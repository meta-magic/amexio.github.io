// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { GanttChartComponent } from './gantt.chart.component';
// import { ChartLoaderService } from './../chart.loader.service';
// describe('GANTT CHART', () => {
//   let comp: GanttChartComponent;
//   let fixture: ComponentFixture<GanttChartComponent>;


//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [FormsModule],
//       declarations: [GanttChartComponent],
//       providers: [ChartLoaderService]
//     });
//     fixture = TestBed.createComponent(GanttChartComponent);
//     comp = fixture.componentInstance;
//     comp.criticalPathEnabled = false;
//     comp.innerGridTrackColor = '';
//     comp.innerGridDarkTrack = '';
//     comp.hasLoaded = false;
//     comp.showChart = false;

//   });

//   it('show chart', () => {
//     let newdata = [{ 'name': 'chart' }];
//     comp.data = newdata;
//     comp.criticalPathEnabled = true;
//     comp.innerGridTrackColor = '#e64a19';
//     comp.innerGridDarkTrack = '#e64a19';
//     expect(newdata).toEqual(comp.data);
//     expect(true).toBe(comp.showChart);
//   });
//   it('drawchart()', () => {
//     comp.drawChart();
//     comp.criticalPathEnabled;
//     comp.innerGridDarkTrack;
//     comp.innerGridTrackColor;
//     comp['options'] = {
//       gantt: {
//         criticalPathEnabled: comp.criticalPathEnabled, criticalPathStyle: {
//           stroke: '#e64a19',
//           strokeWidth: 5
//         }
//       },
//       innerGridTrack: { fill: comp.innerGridTrackColor ? comp.innerGridTrackColor : '' },
//       innerGridDarkTrack: { fill: comp.innerGridDarkTrack ? comp.innerGridDarkTrack : '' },
//     };

//   });


//   it('dont show chart', () => {
//     comp.showChart = false;
//     expect(comp.showChart).toBe(false);
//   });


//   it('ngOnInit()', () => {
//     comp.ngOnInit();
//     expect(comp.hasLoaded).toBe(false);
//     comp.drawChart();
//   });

//   it('Draw Chart Test', () => {
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://www.gstatic.com/charts/loader.js';
//     script.async = false;
//     script.defer = true;
//     script.onload = () => {
//         comp.showChart = true;
//         const newdata = [{ name: 'linechart' }];
//         comp.data = newdata;
//         comp.drawChart();
//         expect(false).toBe(comp.hasLoaded);
//     };
// });


// });
