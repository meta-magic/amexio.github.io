import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { DataPointNorthComponent } from './north.component';

describe('amexio-north-dataPoint', () => {
    let comp: DataPointNorthComponent;
    let fixture: ComponentFixture<DataPointNorthComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [DataPointNorthComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(DataPointNorthComponent);
        comp = fixture.componentInstance;

    });

    it('check cclass variable', () => {
        comp.ngOnInit();
        comp.cclass = null;

        expect(comp.cclass).toEqual(null);

        comp.cclass = 'datapoints-north';
        comp.ngOnInit();
        expect(comp.cclass).toEqual('datapoints-north');

    });
});


