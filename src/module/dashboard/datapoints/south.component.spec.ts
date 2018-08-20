import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { DataPointSouthComponent } from './south.component';
import { toUnicode } from 'punycode';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

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
        comp.cclass =  null;
        expect(comp.cclass).toEqual( null);
        
        comp.cclass =  'datapoint-south';
        comp.ngOnInit();
        expect(comp.cclass).toEqual( 'datapoint-south');
    
});
});


