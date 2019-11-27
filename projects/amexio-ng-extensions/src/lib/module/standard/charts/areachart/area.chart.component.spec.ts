import { AreaChartComponent } from './area.chart.component';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTitleComponent } from '../charttitle/chart.title.component';
import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
import { ChartAreaComponent } from '../chartarea/chart.area.component';
import { ChartLoaderService } from '../../../services/chart/chart.loader.service';
import { By } from '@angular/platform-browser';
declare var google: any;
describe('Amexio Area Chart', () => {
    let areacomp: AreaChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let fixture: ComponentFixture<AreaChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;

    let chartAreaArray2: ChartAreaComponent[];
    let chartLegendArray2: ChartLegendComponent[];

    let chart: any;
    let chartHtml: HTMLElement;
    let element;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AreaChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
            providers: [ChartLoaderService],
        }).compileComponents();

        fixture = TestBed.createComponent(AreaChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);

        areacomp = fixture.componentInstance;
        element = fixture.debugElement;
        //chartHtml = fixture.debugElement.query(By.css('chart'));
        chart = element.nativeElement.querySelector('chart');
    });

    it('chart  : AreaChartComponent defined', () => {
        expect(fixture.componentInstance).toBeDefined();
    });


    
});






