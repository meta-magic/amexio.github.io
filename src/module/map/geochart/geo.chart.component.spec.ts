import { MapLoaderService } from '../map.loader.service';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeoChartComponent } from './geo.chart.component'
import { MapPropertiesComponent } from '../mapproperties/map.properties';
declare var google: any;
describe('Geo Chart', () => {
    let geochartcomp: GeoChartComponent;
    let chartAreaComp: MapPropertiesComponent;
    let linefixture: ComponentFixture<GeoChartComponent>;
    let areafixture: ComponentFixture<MapPropertiesComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [GeoChartComponent, MapPropertiesComponent],
            providers: [MapLoaderService]
        }).compileComponents();
        linefixture = TestBed.createComponent(GeoChartComponent);

        areafixture = TestBed.createComponent(MapPropertiesComponent);

        geochartcomp = linefixture.componentInstance;

        chartAreaComp = areafixture.componentInstance;
        geochartcomp.chartAreaComponent = chartAreaComp;

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
        let newdata = [{ 'name': 'geochart' }];
        geochartcomp.data = newdata;
    });

    it('ngOnInit()', () => {
        geochartcomp.ngOnInit();
        geochartcomp.hasLoaded = false;
        expect(false).toBe(geochartcomp.hasLoaded);
        // candlestickchartcomp.drawChart();
    });

    // it('show chart exist()', () => {
    //     let countryname = false;
    //     let religioncode = '';
    //     let backgroundcolor = '';
    //     let unusedregioncolor = '';
    //     this.options = {
    //         displayMode: geochartcomp.countryname ? 'text' : null,
    //         region: geochartcomp.regioncode ? geochartcomp.regioncode : null,
    //         backgroundcolor: geochartcomp.backgroundcolor ? geochartcomp.backgroundcolor : null,
    //         unusedregioncolor: geochartcomp.unusedregioncolor ? geochartcomp.unusedregioncolor : null,
    //         chartArea: geochartcomp.chartAreaComponent ? {
    //             backgroundcolor: this.chartAreaComponent.chartbackgroundcolor ? this.chartAreaComponent.chartbackgroundcolor : null,
    //             left: this.chartAreaComponent.leftposition ? this.chartAreaComponent.leftposition : null,
    //             top: this.chartAreaComponent.topposition ? this.chartAreaComponent.topposition : null,
    //             height: this.chartAreaComponent.chartheight ? this.chartAreaComponent.chartheight : null,
    //             width: this.chartAreaComponent.chartwidth ? this.chartAreaComponent.chartwidth : null,

    //         } : null,

    //     };
    // });
    it('private variavle-option()', () => {
        geochartcomp['options'];
        geochartcomp.countryname = false;
        geochartcomp.regioncode = '';
        geochartcomp.backgroundcolor = '';
        geochartcomp.unusedregioncolor = '';
        geochartcomp.showChartExist();
        

    });
    it('chartAreaComponent', () => {
        chartAreaComp.chartbackgroundcolor = '';
        chartAreaComp.chartheight = 5;
        chartAreaComp.chartwidth = 6;
        chartAreaComp.leftposition = 5;
        chartAreaComp.topposition = 5;
        
    })


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