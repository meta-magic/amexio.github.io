import { MapLoaderService } from '../map.loader.service';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeMapComponent } from './treemap.map.component';
import { MapPropertiesComponent } from '../mapproperties/map.properties';
declare var google: any;
describe('Tree Map', () => {
    let treemapcomp: TreeMapComponent;
    let treemapfixture: ComponentFixture<TreeMapComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TreeMapComponent],
            providers: [MapLoaderService]
        }).compileComponents();
        treemapfixture = TestBed.createComponent(TreeMapComponent);

        treemapcomp = treemapfixture.componentInstance;
    });

        it('check test case', () => {
            expect(true).toBe(true);
        });

        it('get data method', () => {
            treemapcomp.data;
            expect(treemapcomp.data).toBe(treemapcomp._data);
        });

        it('show chart', () => {
            treemapcomp.showChart = false;
            expect(treemapcomp.showChart).toBe(false);
            let newdata = [{ 'name': 'geochart' }];
            treemapcomp.data = newdata;
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
            treemapcomp.ngOnInit();
            treemapcomp.hasLoaded = false;
            expect(false).toBe(treemapcomp.hasLoaded);
            // candlestickchartcomp.drawChart();
        });

        it('drawChart()', () => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://www.gstatic.com/charts/loader.js';
            script.async = true;
            script.defer = true;
            script.onload = () => {
                treemapcomp.showChart = true;
                let newdata = [{ name: 'linechart' }];
                treemapcomp.data = newdata;
                treemapcomp.drawChart();
                expect(false).toBe(treemapcomp.hasLoaded);
            }
            // geochartcomp.showChart = true;
            // expect(geochartcomp.showChart).toEqual(true);
            // this.geomapData = google.visualization.arrayToDataTable(this._data)
        });
        it('onResize',()=>{
            treemapcomp.onResize(ComponentFixture);
        

        })


    
});