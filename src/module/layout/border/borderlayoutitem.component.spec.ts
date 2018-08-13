import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioBorderLayoutItemComponent } from './borderlayoutitem.component';
import { AmexioFormIconComponent } from '../../forms/icon/icon.component';
import { AmexioButtonComponent } from '../../forms/buttons/button.component';

import { toUnicode } from 'punycode';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

describe('amexio-steps', () => {
    let comp: AmexioBorderLayoutItemComponent;
    let fixture: ComponentFixture<AmexioBorderLayoutItemComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioBorderLayoutItemComponent, AmexioFormIconComponent, AmexioButtonComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioBorderLayoutItemComponent);
        comp = fixture.componentInstance;
    });

    it('positionClass css property check', () => {
        comp.positionClass = 'borderlayout-';
        expect(comp.positionClass).toEqual('borderlayout-');
    });

    // it('getClassType method check', () => {
    //     comp.getClassType();

    //     let nort = comp.position;
    //     nort = 'north';

    //     expect(nort).toEqual('north');
    // });

});
    