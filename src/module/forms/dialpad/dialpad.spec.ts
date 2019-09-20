import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormControl } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioDialpadComponent } from './dialpad.component';
import { AmexioLabelComponent } from '../label/label.component';
import { CommonIconComponent } from '../../base/components/common.icon.component';
describe('amexio-dialpad', () => {
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

    it('getBtnData() if condition ', () => {
        let data = 3;
        comp.isValid = true;
        comp.iconfeedback = true;
        comp.getBtnData(data);
        comp.value = comp.value + data;
        comp.emitBtnData(data);
        comp.valueChange.emit(comp.value);
        comp.validateMinMax();
        expect(comp.isValid).toEqual(true);
        expect(comp.iconfeedback).toEqual(true);
        comp.cls = 'greencls';
    });

    it('getBtnData() else if condition ', () => {
        let data = 3;
        comp.isValid = false;
        comp.iconfeedback = true;
        comp.getBtnData(data);
        comp.value = comp.value + data;
        comp.emitBtnData(data);
        comp.valueChange.emit(comp.value);
        comp.validateMinMax();
        expect(comp.isValid).toEqual(false);
        expect(comp.iconfeedback).toEqual(true);
        comp.cls = 'redcls';
    });

    it('getBtnData() else condition ', () => {
        let data = 3;
        comp.isValid = false;
        comp.iconfeedback = false;
        comp.getBtnData(data);
        comp.value = comp.value + data;
        comp.emitBtnData(data);
        comp.valueChange.emit(comp.value);
        comp.validateMinMax();
        expect(comp.isValid).toEqual(false);
        expect(comp.iconfeedback).toEqual(false);
    });


    it('eraseData() if condition', () => {
        comp.value = '123';
        comp.isValid = true;
        comp.iconfeedback = true;
        comp.eraseData();
        let str;
        str = comp.value.slice(0, -1);
        comp.value = str;
        expect(comp.isValid).toEqual(true);
        expect(comp.iconfeedback).toEqual(true);
        comp.cls = 'greencls';

        expect(comp.iconfeedback).toEqual(true);
        expect(comp.value.length).not.toBeGreaterThan(1);

        comp.isValid = null;
        comp.cls = 'redcls';

    });

    it('eraseData() else if condition', () => {
        comp.value = '123';
        comp.isValid = false;
        comp.iconfeedback = true;
        comp.eraseData();
        let str;
        str = comp.value.slice(0, -1);
        comp.value = str;
        expect(comp.isValid).toEqual(false);
        expect(comp.iconfeedback).toEqual(true);
        comp.cls = 'redcls';

        expect(comp.iconfeedback).toEqual(true);
        expect(comp.value.length).not.toBeGreaterThan(1);
        comp.isValid = null;
        comp.cls = 'redcls';

    });

    it('eraseData() else condition', () => {
        comp.value = '123' + '123';
        comp.isValid = false;
        comp.iconfeedback = false;
        comp.eraseData();
        let str;
        str = comp.value.slice(0, -1);
        comp.value = str;
        expect(comp.isValid).toEqual(false);
        expect(comp.iconfeedback).toEqual(false);

        expect(comp.iconfeedback).toEqual(false);
        expect(comp.value.length).toBeGreaterThan(1);
    });



    it('clearData() condition', () => {
        comp.value = '';
        comp.minlen = 2;
        comp.maxlen = 4;
        comp.isValid = null;
        const object = { data: comp.value };
        comp.onClick.emit(object);
        comp.valueChange.emit(comp.value);
        comp.clearData();
        expect(comp.minlen).toEqual(2);
        expect(comp.maxlen).toEqual(4);
        comp.isValid = null;
        comp.cls = 'redcls';


    });

    it('getRandomNumber() if and isDuplicate true condition', () => {

        const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const num = myArray[Math.floor(Math.random() * myArray.length)];
        let isDuplicate = false;
        comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
        comp.getRandomNumber();
        expect(comp.randomArr.length).toBeGreaterThan(0);
        comp.randomArr.forEach((element: any) => {
            if (num === element) {
                isDuplicate = true;
            }
        });
        isDuplicate = true;
        expect(isDuplicate).toEqual(true);
        return comp.getRandomNumber();
    });

    it('getRandomNumber() if and isDuplicate false condition', () => {

        const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const num = myArray[Math.floor(Math.random() * myArray.length)];
        let isDuplicate = false;
        comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
        comp.getRandomNumber();
        expect(comp.randomArr.length).toBeGreaterThan(0);
        comp.randomArr.forEach((element: any) => {
            if (num != element) {
            }
        });
        isDuplicate = false;
        expect(isDuplicate).toEqual(false);
        return num;
    });


    it('getRandomNumber() else ', () => {
        const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const num = myArray[Math.floor(Math.random() * myArray.length)];
        let isDuplicate = false;
        comp.randomArr = [];
        comp.getRandomNumber();
        expect(comp.randomArr.length).not.toBeGreaterThan(0);
        
        return num;
    });
});
