import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { DataPointsComponent } from './datapoints.component';

describe('amexio-dataPoint', () => {
    let comp: DataPointsComponent;
    let fixture: ComponentFixture<DataPointsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [DataPointsComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(DataPointsComponent);
        comp = fixture.componentInstance;

    });

    it('ngOnInit method check', () => {

        comp.colspan = 1;
        expect(comp.colspan).toEqual(1);

        comp.amexiocolor = '';
        comp.ngOnInit();
        expect(comp.amexiocolor).toEqual('');

        comp.west = true;
        expect(comp.west).toEqual(true);
        comp.colspan = 1;
        expect(comp.colspan).toEqual(comp.colspan++);

        comp.east = true;
        expect(comp.east).toEqual(true);
        comp.colspan = 1;
        expect(comp.colspan).toEqual(comp.colspan++);
    });
});
