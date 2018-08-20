import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { DataPointWestComponent } from './west.component';
import { toUnicode } from 'punycode';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

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
        comp.cclass = 'datapoint-west';
        comp.ngOnInit();
        expect(comp.cclass).toEqual('datapoint-west');

    });
});


