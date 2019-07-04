import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { DataPointSouthComponent } from './south.component';

describe('amexio-south-dataPoint', () => {
    let comp: DataPointSouthComponent;
    let fixture: ComponentFixture<DataPointSouthComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [DataPointSouthComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(DataPointSouthComponent);
        comp = fixture.componentInstance;

    });

    it('check cclass variable', () => {

        comp.ngOnInit();
        comp.cclass = null;
        expect(comp.cclass).toEqual(null);

        comp.cclass = 'datapoint-south';
        comp.ngOnInit();
        expect(comp.cclass).toEqual('datapoint-south');

    });
});


