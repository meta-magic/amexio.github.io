import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioFieldSetComponent } from './fieldset.component';
import { AmexioStepsComponent } from '../steps/steps.component';
import { toUnicode } from 'punycode';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';
import { CommonIconComponent } from './../../base/components/common.icon.component';

describe('amexio-fieldset', () => {
    let comp: AmexioFieldSetComponent;
    let fixture: ComponentFixture<AmexioFieldSetComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioFieldSetComponent, AmexioStepsComponent,CommonIconComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioFieldSetComponent);
        comp = fixture.componentInstance;
    });


    it('checking ngOnInit method', () => {

        comp.ngOnInit();
        comp.collapsible = false;
        expect(comp.collapsible).toEqual(false);
        comp.isActive = true;
        expect(comp.isActive).toEqual(true);
    });

    it('checking ngOnInit method', () => {

        comp.onLegendClick();
        comp.collapsible = true;
        expect(comp.collapsible).toEqual(true);
        comp.isActive = false;
        expect(comp.isActive).toEqual(false);
    });

});

