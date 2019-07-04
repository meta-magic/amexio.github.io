import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { DataPointWestComponent } from './west.component';

describe('amexio-west-dataPoint', () => {
    let comp: DataPointWestComponent;
    let fixture: ComponentFixture<DataPointWestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [DataPointWestComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(DataPointWestComponent);
        comp = fixture.componentInstance;

    });

    it('check cclass variable', () => {
        comp.ngOnInit();
        comp.cclass = null;
        expect(comp.cclass).toEqual(null);


        comp.cclass = 'datapoint-west';
        comp.ngOnInit();
        expect(comp.cclass).toEqual('datapoint-west');

    });
});


