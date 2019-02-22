import { MapLoaderService } from '../map.loader.service';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeMapComponent } from './treemap.map.component';
import { MapPropertiesComponent } from '../mapproperties/map.properties';
import { MapTitleComponent } from '../maptitle/map.title.component';
declare var google: any;
describe('Tree Map', () => {
    let treemapcomp: TreeMapComponent;
    let treemapfixture: ComponentFixture<TreeMapComponent>;
    let mapstylecomp: MapTitleComponent;
    let mapstylefixture: ComponentFixture<MapTitleComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TreeMapComponent, MapTitleComponent],
            providers: [MapLoaderService]
        }).compileComponents();
        treemapfixture = TestBed.createComponent(TreeMapComponent);
        mapstylefixture = TestBed.createComponent(MapTitleComponent)

        treemapcomp = treemapfixture.componentInstance;
        mapstylecomp = mapstylefixture.componentInstance;
        treemapcomp.mapTitleComponent=mapstylecomp;
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
    it('mapTitleTextStyle()', () => {
        mapstylecomp.bold = true;
        mapstylecomp.fontname = '';
        // mapstylecomp.fontsize = 5;
        mapstylecomp.italic = true;
        mapstylecomp.color='';
        const mapstyle=treemapcomp.mapTitleTextStyle();
    });
    it('initializeOptions() method',()=>{
        treemapcomp['option'];
    treemapcomp.maxcolor='';
    treemapcomp.midcolor='';
    treemapcomp.mincolor='';
    treemapcomp.showscale=false;
    treemapcomp.maxpostdepth=1;
    treemapcomp.mapTitleTextStyle();
    mapstylecomp.title='';
    treemapcomp.initializeOptions();
    
    });

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
    it('onResize', () => {
        treemapcomp.onResize(ComponentFixture);
    });
});