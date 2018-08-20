import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { DataPointEastComponent } from './east.component';
import { toUnicode } from 'punycode';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

describe('amexio-east-dataPoint', () => {
    let comp: DataPointEastComponent;
    let fixture: ComponentFixture<DataPointEastComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [DataPointEastComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(DataPointEastComponent);
        comp = fixture.componentInstance;

    });

    it('check cclass variable', () => {

        comp.ngOnInit();
        comp.cclass =  null;
        
        expect(comp.cclass).toEqual( null);
        comp.cclass =  'datapoint-east';
        comp.ngOnInit();
        expect(comp.cclass).toEqual( 'datapoint-east');
    
});
});


