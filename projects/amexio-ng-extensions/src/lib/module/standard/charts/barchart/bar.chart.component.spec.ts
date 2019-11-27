import { BarChartComponent } from './bar.chart.component';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTitleComponent } from '../charttitle/chart.title.component';
import { ChartLegendComponent } from '../chartlegend/chart.legend.component';
import { ChartAreaComponent } from '../chartarea/chart.area.component';
import { ChartLoaderService } from '../../../services/chart/chart.loader.service';
declare var google: any;
describe('BAR CHART', () => {
    let barchartcomp: BarChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let chartareacomp: ChartAreaComponent;
    let fixture: ComponentFixture<BarChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture: ComponentFixture<ChartLegendComponent>;
    let chartareafixture: ComponentFixture<ChartAreaComponent>;

    let chartAreaArray2: ChartAreaComponent[];
    let chartLegendArray2: ChartLegendComponent[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [BarChartComponent, ChartTitleComponent, ChartLegendComponent, ChartAreaComponent],
            providers: [ChartLoaderService]
        }).compileComponents();

        fixture = TestBed.createComponent(BarChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture = TestBed.createComponent(ChartLegendComponent);
        chartareafixture = TestBed.createComponent(ChartAreaComponent);

        barchartcomp = fixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp = chartlegendfixture.componentInstance;
        chartareacomp = chartareafixture.componentInstance;

        barchartcomp.chartTitleComponent = charttitlecomp;
        barchartcomp.chartLengendComponent = chartlegendcomp;
        barchartcomp.chartAreaComponent = chartareacomp;

        chartAreaArray2 = [];
        chartAreaArray2.push(chartareacomp);

        chartLegendArray2 = [];
        chartLegendArray2.push(chartlegendcomp);

        barchartcomp.showChart = false;

    });

    it('chart  : BarChartComponent defined', () => {
        expect(fixture.componentInstance).toBeDefined();
    });

});






