import { MapLoaderService } from '../map.loader.service';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeoChartComponent } from './geo.chart.component'
import { MapPropertiesComponent } from '../mapproperties/map.properties';
declare var google: any;
describe('Geo Chart', () => {
    let geochartcomp: GeoChartComponent;
    let linefixture: ComponentFixture<GeoChartComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [GeoChartComponent],
            providers: [MapLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent(GeoChartComponent);

        geochartcomp = linefixture.componentInstance;

    });
    it('check test case', () => {
        expect(true).toBe(true);
    });
    it('get data method', () => {
        geochartcomp.data;
        expect(geochartcomp.data).toBe(geochartcomp._data);
    });
    it('show chart', () => {
        geochartcomp.showChart = false;
        expect(geochartcomp.showChart).toBe(false);
        // let newdata = [{ 'name': 'geochart' }];
        // geochartcomp.data = newdata;
    });
    // it('set Data()', () => {
    //     geochartcomp.data = true;
    //     expect(geochartcomp.data).toBe(true);
    //     console.log('geochartcomp.data = ',geochartcomp.data,'geochartcomp.showChart =',geochartcomp.showChart )
    //     expect(geochartcomp.data).toEqual(geochartcomp._data);
    //     geochartcomp.showChart = true;
    //     expect(geochartcomp.data).toEqual(geochartcomp.showChart);
    //   //  expect(geochartcomp.showChart).toBe(true);
    //     geochartcomp.data = false;
    //    //  expect(geochartcomp.data).toEqual(false);
    //     geochartcomp.showChart = false;

    //   // expect(geochartcomp.showChart).toEqual(false);

    //     expect(geochartcomp.data).toEqual(geochartcomp.showChart);
    // })
    it('ngOnInit()', () => {
        geochartcomp.ngOnInit();
        geochartcomp.hasLoaded = false;
        expect(false).toBe(geochartcomp.hasLoaded);
        // candlestickchartcomp.drawChart();
    });

    it('show chart exist()', () => {

    });

    it('drawChart()', () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            geochartcomp.showChart = true;
            let newdata = [{ name: 'linechart' }];
            geochartcomp.data = newdata;
            geochartcomp.drawChart();
            expect(false).toBe(geochartcomp.hasLoaded);
        }
        // geochartcomp.showChart = true;
        // expect(geochartcomp.showChart).toEqual(true);
        // this.geomapData = google.visualization.arrayToDataTable(this._data)
    })

});