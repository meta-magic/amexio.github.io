import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioBorderLayoutItemComponent } from './borderlayoutitem.component';
import { AmexioButtonComponent } from '../../forms/buttons/button.component';

import { CommonIconComponent } from './../../base/components/common.icon.component';

describe('amexio-borderlayout-item', () => {
    let comp: AmexioBorderLayoutItemComponent;
    let fixture: ComponentFixture<AmexioBorderLayoutItemComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioBorderLayoutItemComponent, AmexioButtonComponent, CommonIconComponent],
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
