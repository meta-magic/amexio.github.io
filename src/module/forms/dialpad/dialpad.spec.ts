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


    it('ngOnInit() 1st  condition ', () => {
        comp.type = '2-rows';
        comp.minlen = 2;
        comp.maxlen = 4;
        comp.random = true;
        comp.password = true;
        comp.ngOnInit();
        expect(comp.password).toEqual(true);
        comp.textType = 'password';
        comp.cls = 'nonecls';
        expect(comp.minlen).toEqual(2);
        expect(comp.maxlen).toEqual(4);
        comp.iconfeedback = true;
        comp.randomArr = [];
        const num = 0;
        const i = 0;
        const foundDuplicate = false;
        expect(comp.random).toEqual(true);
        expect(comp.type).toEqual('2-rows');
        comp.generateRandomArray();

        comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
        expect(comp.randomArr.length).toBeGreaterThan(0);
        comp.btnArray1 = [];
        comp.btnArray2 = [];
        comp.generateTyp1Arr();


    });

    it('ngOnInit() 2nd condition ', () => {
        comp.type = '2-rows';

        comp.random = true;
        comp.password = false;
        comp.ngOnInit();
        expect(comp.password).toEqual(false);
        comp.textType = 'text';
        comp.cls = 'nonecls';
        expect(comp.minlen).toBeUndefined();
        expect(comp.maxlen).toBeUndefined();

        comp.randomArr = [];
        const num = 0;
        const i = 0;
        const foundDuplicate = false;
        expect(comp.random).toEqual(true);
        expect(comp.type).toEqual('2-rows');
        comp.generateRandomArray();

        comp.randomArr = [];
        expect(comp.randomArr.length).not.toBeGreaterThan(0);

    });

    it('ngOnInit() 3rd condition ', () => {
        comp.type = 'rows';

        comp.random = false;
        comp.password = false;
        comp.ngOnInit();
        expect(comp.password).toEqual(false);
        comp.textType = 'text';
        comp.cls = 'nonecls';
        expect(comp.minlen).toBeUndefined();
        expect(comp.maxlen).toBeUndefined();

        comp.randomArr = [];
        const num = 0;
        const i = 0;
        const foundDuplicate = false;
        expect(comp.random).toEqual(false);
        expect(comp.type).not.toEqual('2-rows');

        comp.type = 'classic';
        comp.random = true;

        expect(comp.type).toEqual('classic');
        expect(comp.random).toEqual(true);

        comp.generateType2Arr();

    });

    it('ngOnInit() 3rd condition ', () => {
        comp.type = 'rows';

        comp.random = false;
        comp.password = false;
        comp.ngOnInit();
        expect(comp.password).toEqual(false);
        comp.textType = 'text';
        comp.cls = 'nonecls';
        expect(comp.minlen).toBeUndefined();
        expect(comp.maxlen).toBeUndefined();

        comp.randomArr = [];
        const num = 0;
        const i = 0;
        const foundDuplicate = false;
        expect(comp.random).toEqual(false);
        expect(comp.type).not.toEqual('2-rows');
        expect(comp.type).not.toEqual('classic');


    });

    it('generateTyp1Arr() if condition ', () => {

        comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
        comp.generateTyp1Arr();

        comp.randomArr.forEach((element: any, index: any) => {
            if ((index >= 0) && (index < 5)) {
                comp.btnArray1.push(element);
            } if (index > 4) {
                comp.btnArray2.push(element);
            }
        });
    });

    it('generateTyp1Arr() if condition ', () => {

        comp.randomArr = [];
        comp.generateTyp1Arr();

        comp.randomArr.forEach((element: any, index: any) => {
            if ((index >= 0) && (index < 5)) {
                comp.btnArray1.push(element);
            } if (index > 4) {
                comp.btnArray2.push(element);
            }
        });
    });

    // it('generateType2Arr() if condition ', () => {
    //     comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
    //     comp.generateRandomArray();
    //     comp.generateType2Arr();

    //     if (comp.randomArr.length > 0) {
    //         comp.type2Arr1 = [];
    //         comp.type2Arr2 = [];
    //         comp.type2Arr3 = [];
    //         comp.generateTyp2Arry();
    //     }
    // });

    it('generateTyp2Arry() if condition ', () => {
        comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
        comp.generateTyp2Arry();
        comp.randomArr.forEach((element: any, index: any) => {
            if ((index >= 0) && (index < 3)) {
                comp.type2Arr1.push(element);
            }
            if ((index > 2) && (index < 6)) {
                comp.type2Arr2.push(element);
            }
            if ((index > 5) && (index < 9)) {
                comp.type2Arr3.push(element);
            }

            comp.lastDigit = comp.randomArr[comp.randomArr.length - 1];

        });
    });

    it('generateTyp2Arry() else condition ', () => {
        comp.randomArr = [];
        comp.generateTyp2Arry();
        comp.randomArr.forEach((element: any, index: any) => {
            if ((index <= 0) && (index > 3)) {
            }
            if ((index < 2) && (index > 6)) {
            }
            if ((index < 5) && (index > 9)) {
            }

            comp.lastDigit = comp.randomArr[comp.randomArr.length - 1];

        });
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


    it('validateMin() if check ', () => {
        comp.minlen = 0;
        comp.value = 'abc';
        comp.validateMin();
        expect(comp.minlen).toEqual(0);
        expect(comp.maxlen).toBeUndefined();
        expect(comp.value.length).toBeGreaterThanOrEqual(comp.minlen);
        comp.isValid = true;

    });
    it('validateMin() else check ', () => {
        comp.minlen = 3;
        comp.value = '';
        comp.validateMin();
        expect(comp.minlen).toEqual(3);
        expect(comp.maxlen).toBeUndefined();
        expect(comp.minlen).toBeGreaterThanOrEqual(comp.value.length);
        comp.isValid = false;
    });

    it('validateMax() if  check ', () => {
        comp.maxlen = 0;
        comp.value = 'abc';
        comp.validateMax();
        expect(comp.maxlen).toEqual(0);
        expect(comp.minlen).toBeUndefined();
        expect(comp.value.length).toBeGreaterThanOrEqual(comp.maxlen);
        comp.isValid = false;
    });
    it('validateMax() else check ', () => {
        comp.maxlen = 3;
        comp.value = '';
        comp.validateMax();
        expect(comp.maxlen).toEqual(3);
        expect(comp.minlen).toBeUndefined();
        expect(comp.maxlen).toBeGreaterThanOrEqual(comp.value.length);
        comp.isValid = true;
    });


});
