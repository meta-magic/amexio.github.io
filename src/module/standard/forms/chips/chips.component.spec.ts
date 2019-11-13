/**
 * Created by pratik on 11/12/17.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../../index';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { AmexioChipComponent } from '../chip/chip.component';
import { AmexioLabelComponent } from '../label/label.component';
import { AmexioChipsComponent } from './chips.component';
describe('amexio-chips', () => {

    let comp: AmexioChipsComponent;
    let fixture: ComponentFixture<AmexioChipsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioChipsComponent, AmexioLabelComponent, AmexioChipComponent, CommonIconComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioChipsComponent);
        comp = fixture.componentInstance;
    });

    it('ngoninit check ', () => {
        comp.ngOnInit();
        comp.componentId = 'chips' + window.crypto.getRandomValues(new Uint32Array(1))[0];

    });

});
