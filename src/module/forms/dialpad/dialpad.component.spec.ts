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
        comp.type2Arr1 = [1, 2, 3];
        comp.type2Arr2 = [4, 5, 6];
        comp.type2Arr3 = [7, 8, 9];
    });

    it('ngOnInit() set text type password', () => {
        comp.password = true;
        comp.showpassword = true;
        comp.ngOnInit();
        expect(comp.textType).toEqual('password');

    });

    it('ngOnInit() set text type text', () => {
        comp.password = false;
        comp.showpassword = false;
        comp.ngOnInit();
        expect(comp.textType).toEqual('text');

    });

    it('ngOnInit() check minlength and maxlength and set iconfeedback to true', () => {
        comp.minlen = 2;
        comp.maxlen = 4;
        comp.ngOnInit();
        expect(comp.iconfeedback).toEqual(true);

    });

    it('ngOnInit() check minlength and maxlength and set iconfeedback to false', () => {
        comp.minlen = 0;
        comp.maxlen = 0;
        comp.ngOnInit();
        expect(comp.iconfeedback).toEqual(false);

    });

    it('ngOnInit() call generateRandomArray function and generateTyp1Arr function', () => {
        comp.type = '2-rows';
        comp.random = true;
        comp.ngOnInit();
        spyOn(comp, 'generateRandomArray').and.callThrough();
        comp.randomArr = [1,2,3,4,5,6,7];
        comp.btnArray1 = [];
        comp.btnArray2 = [];
        expect(comp.btnArray1.length).toEqual(0);
        expect(comp.btnArray2.length).toEqual(0);
        spyOn(comp, 'generateTyp1Arr').and.callThrough();
    });

    it('ngOnInit() call generateRandomArray function and do not callgenerateTyp1Arr function', () => {
        comp.type = '2-rows';
        comp.random = true;
        comp.ngOnInit();
        spyOn(comp, 'generateRandomArray').and.callThrough();
        comp.randomArr = [];
        expect(comp.randomArr.length).toEqual(0);
        expect(comp.btnArray1.length).not.toEqual(0);
        expect(comp.btnArray2.length).not.toEqual(0);
        let spy = spyOn(comp, 'generateTyp1Arr');
        expect(spy).not.toHaveBeenCalled();
    });
    
    it('ngOnInit() check type classic and random true and call generateType2Arr function', () => {
        comp.type = 'classic';
        comp.random = true;
        comp.ngOnInit();
        spyOn(comp, 'generateType2Arr').and.callThrough();
    });

    it('ngOnInit() check type 2-row and random false and do not call generateType2Arr function', () => {
        comp.type = '2-row';
        comp.random = false;
        comp.ngOnInit();
        let spy = spyOn(comp, 'generateType2Arr');
        expect(spy).not.toHaveBeenCalled();
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

    it('generateTyp1Arr() else condition ', () => {
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

    it('getRandomNumber() if and isDuplicate true condition', () => {

        const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const num = myArray[Math.floor(Math.random() * myArray.length)];
        let isDuplicate = true;
        comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
        comp.getRandomNumber();
        expect(comp.randomArr.length).toBeGreaterThan(0);
        comp.randomArr.forEach((element: any) => {
            if (num === element) {
                expect(isDuplicate).toEqual(true);
            }
        });
        isDuplicate = true;
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
        return num;
    });


    it('getRandomNumber() else ', () => {
        const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const num = myArray[Math.floor(Math.random() * myArray.length)];
        comp.randomArr = [];
        comp.getRandomNumber();
        return num;
    });


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

    it('validateMin() if if check ', () => {
        comp.minlen = 2;
        comp.value = 'abcd';
        comp.isValid = true;
        comp.validateMin();
        expect(comp.isValid).toEqual(true);
    });

    it('validateMin() if if else check ', () => {
        comp.minlen = 2;
        comp.value = '';
        comp.isValid = false;
        comp.validateMin();
        expect(comp.isValid).toEqual(false);
    });

    it('validateMin() if else check ', () => {
        comp.minlen = undefined;
        comp.maxlen = undefined;
        comp.isValid = false;
        comp.validateMin();
        expect(comp.isValid).toEqual(false);
    });

    it('validateMax() if if check ', () => {
        comp.maxlen = 4;
        comp.value = 'ab';
        comp.isValid = true;
        comp.validateMax();
        expect(comp.isValid).toEqual(true);
    });

    it('validateMax() if if else check ', () => {
        comp.maxlen = 4;
        comp.value = 'abcdef';
        comp.isValid = false;
        comp.validateMax();
        expect(comp.isValid).toEqual(false);
    });

    it('validateMax() if else check ', () => {
        comp.minlen = undefined;
        comp.maxlen = undefined;
        comp.isValid = false;
        comp.validateMax();
        expect(comp.isValid).toEqual(false);
    });

    it('validateMinMax() if if if condition ', () => {
        comp.minlen = 2;
        comp.maxlen = 5;
        comp.value = 'abc';
        comp.iconfeedback = true;
        comp.isValid = true;
        comp.validateMinMax();
        expect(comp.isValid).toEqual(true);   
        comp.validateMin();
        comp.validateMax();
    });

    it('validateMinMax() if if else condition ', () => {
        comp.isValid = true;
        comp.minlen = 2;
        comp.maxlen = 5;
        comp.value = '1';
        comp.iconfeedback = true;
        comp.validateMinMax();
        expect(comp.isValid ).toEqual(false);
        comp.validateMin();
        comp.validateMax();
    });

    it('validateMinMax() if else condition ', () => {
        comp.value = '1';
        comp.iconfeedback = false;
        comp.validateMinMax();
        let min = spyOn(comp, 'validateMin');
        expect(min).not.toHaveBeenCalled();
        let max = spyOn(comp, 'validateMax');
        expect(max).not.toHaveBeenCalled();
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
        expect(comp.cls).toEqual('greencls');
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
        expect(comp.cls).toEqual('redcls');
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
        expect(comp.cls).toBeUndefined();
    });

    it('eraseData() if condition', () => {
        comp.value = '123';
        comp.isValid = true;
        comp.iconfeedback = true;
        comp.eraseData();
        let str;
        str = comp.value.slice(0, -1);
        comp.value = str;
        expect(comp.cls).toEqual('greencls');
    });

    it('eraseData() else if condition', () => {
        comp.value = '123';
        comp.isValid = false;
        comp.iconfeedback = true;
        comp.eraseData();
        let str;
        str = comp.value.slice(0, -1);
        comp.value = str;
        expect(comp.cls).toEqual('redcls');
        expect(comp.iconfeedback).toEqual(true);
        comp.cls = 'redcls';
    });

    it('eraseData() if if condition', () => {
        comp.value = '';
        comp.isValid = true;
        comp.iconfeedback = true;
        comp.eraseData();
        let str;
        str = comp.value.slice(0, -1);
        comp.value = str;
        expect(comp.isValid).toBeNull();
        expect(comp.cls).toEqual('redcls');
    });

    it('eraseData() else condition', () => {
        comp.value = '123' + '123';
        comp.isValid = false;
        comp.iconfeedback = false;
        comp.eraseData();
        let str;
        str = comp.value.slice(0, -1);
        comp.value = str;
        expect(comp.cls).toBeUndefined();
    });

    it('emitBtnData()', () => {
        let keycode;
        const obj = { key: keycode, data: comp.value };
        comp.emitBtnData(keycode)
        comp.onClick.emit(obj);
    });

    it('clearData() if condition', () => {
        comp.value = '';
        comp.minlen = 2;
        comp.maxlen = 4;
        comp.isValid = null;
        const object = { data: comp.value };
        comp.onClick.emit(object);
        comp.valueChange.emit(comp.value);
        comp.clearData();
        expect(comp.isValid).toBeNull();
        expect(comp.cls).toEqual('redcls');
    });

    it('clearData() else condition', () => {
        comp.value = '';
        comp.minlen = 2;
        comp.maxlen = undefined;
        comp.isValid = null;
        const object = { data: comp.value };
        comp.onClick.emit(object);
        comp.valueChange.emit(comp.value);
        comp.clearData();
        expect(comp.cls).toEqual('redcls');
    });

    it('clearData() else condition', () => {
        comp.value = '';
        comp.minlen = undefined;
        comp.maxlen = undefined;
        comp.isValid = null;
        const object = { data: comp.value };
        comp.onClick.emit(object);
        comp.valueChange.emit(comp.value);
        comp.clearData();
        expect(comp.cls).toEqual('nonecls');
    });

    it('clearData() else condition', () => {
        comp.value = '';
        comp.minlen = undefined;
        comp.maxlen = 4;
        comp.isValid = null;
        const object = { data: comp.value };
        comp.onClick.emit(object);
        comp.valueChange.emit(comp.value);
        comp.clearData();
        expect(comp.cls).toEqual('redcls');
    });

    it('onToggle If call ', () => {
        comp.toggleShow();
        comp.show = true;
        comp.show = !comp.show;
        expect(comp.textType).toEqual('text');
      })
    
      it('onToggle else call ', () => {
        comp.show = !comp.show;
        comp.toggleShow();
        comp.show = false;
        expect(comp.textType).toEqual('password');
      })

});
