import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormControl } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioDialpadComponent } from './dialpad.component';
import { AmexioLabelComponent } from '../label/label.component';
import { CommonIconComponent } from '../../base/components/common.icon.component';
fdescribe('amexio-dialpad', () => {
    let comp: AmexioDialpadComponent;
    let fixture: ComponentFixture<AmexioDialpadComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioDialpadComponent, AmexioButtonComponent, CommonIconComponent, AmexioLabelComponent],

            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioDialpadComponent);
        comp = fixture.componentInstance;
        comp.value = '';
        comp.btnArray1 = [0, 1, 2, 3, 4];
        comp.btnArray2 = [5, 6, 7, 8, 9];
    });

    it('getBtnData()', () => {
        let data = 3;
        comp.getBtnData(data);
        comp.value = comp.value + data;
    });


    it('eraseData()', () => {
        comp.value = '123';
        comp.eraseData();
        let str;
        str = comp.value.slice(0, -1);
        comp.value = str;
    });

});
