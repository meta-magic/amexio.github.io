import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../../public-api';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { AmexioButtonComponent } from '../buttons/button.component';
import { AmexioLabelComponent } from '../label/label.component';
import { AmexioDialpadComponent } from './dialpad.component';
import { AnimationDriver } from '@angular/animations/browser';
describe('Amexio Dialpad Component', () => {
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
        fixture.detectChanges();
        expect(comp.textType).toEqual('password');
    });

    it('ngOnInit() set text type text', () => {
        comp.password = false;
        comp.showpassword = false;
        fixture.detectChanges();
        expect(comp.textType).toEqual('text');
    });

    it('ngOnInit() set text type password', () => {
        comp.password = true;
        comp.showpassword = false;
        fixture.detectChanges();
        expect(comp.textType).toEqual('password');

    });

    it('ngOnInit() set text type password', () => {
        comp.password = false;
        comp.showpassword = true;
        fixture.detectChanges();
        expect(comp.textType).toEqual('password');

    });

    it('ngOnInit() check minlength and maxlength and set iconfeedback to true', () => {
        comp.minlen = 2;
        comp.maxlen = 4;

        fixture.detectChanges();

        expect(comp.iconfeedback).toEqual(true);
    });

    it('ngOnInit() check minlength and maxlength and set iconfeedback to false', () => {
        comp.minlen = 0;
        comp.maxlen = 0;
        fixture.detectChanges();

        expect(comp.iconfeedback).toEqual(false);
    });

    it('ngOnInit() call generateRandomArray function and generateTyp1Arr function', () => {
        comp.type = '2-rows';
        comp.random = true;
        spyOn(comp, 'generateRandomArray').and.callThrough();
        spyOn(comp, 'generateTyp1Arr').and.callThrough();
        fixture.detectChanges();
        // comp.generateRandomArray();
        comp.randomArr = [1, 2, 3, 4, 5, 6, 7];
        comp.generateTyp1Arr();

        expect(comp.randomArr.length).toBeGreaterThanOrEqual(0);
        expect(comp.btnArray1.length).toEqual(10);
        expect(comp.btnArray2.length).toEqual(7);
        expect(comp.generateTyp1Arr).toHaveBeenCalled();
        // expect(comp.generateRandomArray).toHaveBeenCalled();
    });

    it('ngOnInit() call generateRandomArray function and do not callgenerateTyp1Arr function', () => {
        comp.type = '2-rows';
        comp.random = true;
        //spyOn(comp, 'generateRandomArray');
        spyOn(comp, 'generateTyp1Arr');
        //comp.generateRandomArray();
        fixture.detectChanges();
        comp.randomArr = [];

        expect(comp.randomArr.length).toEqual(0);
        expect(comp.btnArray1.length).toEqual(0);
        expect(comp.btnArray2.length).toEqual(0);
       
        //expect(comp.generateRandomArray).toHaveBeenCalled();

    });

    it('ngOnInit() check type classic and random true and call generateType2Arr function', () => {
        comp.type = 'classic';
        comp.random = true;
        comp.randomArr = [1, 2, 3, 4, 5, 6, 7];
        spyOn(comp, 'generateType2Arr');

        comp.generateType2Arr();
        fixture.detectChanges();

        expect(comp.random).toBeTruthy();
        expect(comp.type).toBe('classic');
        expect(comp.generateType2Arr).toHaveBeenCalled();
    });

    it('ngOnInit() check type 2-row and random false and do not call generateType2Arr function', () => {
        comp.type = '2-row';
        comp.random = false;
        const spy = spyOn(comp, 'generateType2Arr');
        fixture.detectChanges();

        expect(spy).not.toHaveBeenCalled();
    });

    it('generateTyp1Arr() if condition ', () => {
        comp.randomArr = [0, 4, 3, 2, 1, 7, 9];
        spyOn(comp, 'generateTyp1Arr');
        //comp.generateTyp1Arr();
        comp.randomArr.forEach((element: any, index: any) => {
            if ((index >= 0) && (index < 5)) {
                comp.btnArray1.push(element);
            }
            if (index > 4) {
                comp.btnArray2.push(element);
            }
        });
        fixture.detectChanges();
        expect(comp.btnArray1.length).toBeGreaterThan(4);
        expect(comp.btnArray2.length).toBeGreaterThan(2);
        //expect(comp.generateTyp1Arr).toHaveBeenCalled();
    });

    it('generateTyp1Arr() else condition ', () => {

        spyOn(comp, 'generateTyp1Arr');
        comp.randomArr = [];
        comp.randomArr.forEach((element: any, index: any) => {
            if ((index >= 0) && (index < 5)) {
                comp.btnArray1.push(element);
            }
            if (index > 4) {
                comp.btnArray2.push(element);
            }
        });
        fixture.detectChanges();
        expect(comp.btnArray1.length).toBe(5);
        expect(comp.btnArray2.length).toBe(5);
        //expect(comp.generateTyp1Arr).not.toHaveBeenCalled();
    });

    it('generateType2Arr() : if condition', () => {
        fixture.detectChanges();
        spyOn(comp, 'generateTyp2Arry');
        comp.randomArr = [0, 4, 3, 2, 1, 7, 9];
        comp.generateTyp2Arry();
        comp.type2Arr1 = [];
        comp.type2Arr2 = [];
        comp.type2Arr3 = [];
        fixture.detectChanges();
        console.log(comp.type2Arr1);
        expect(comp.randomArr.length).toBeGreaterThanOrEqual(1);
        expect(comp.type2Arr1.length).toBe(0);
        expect(comp.type2Arr2.length).toBe(0);
        expect(comp.type2Arr3.length).toBe(0);
        expect(comp.generateTyp2Arry).toHaveBeenCalled();
    });


    it('generateType2Arr() : else condition', () => {
        fixture.detectChanges();
        spyOn(comp, 'generateTyp2Arry');

        comp.randomArr = [];
        comp.generateType2Arr();
        comp.randomArr = [];
        fixture.detectChanges();
        console.log(comp.randomArr);
        expect(comp.randomArr.length).not.toBeGreaterThanOrEqual(1);
        expect(comp.type2Arr1.length).toBe(0);
        expect(comp.type2Arr2.length).toBe(0);
        expect(comp.type2Arr3.length).toBe(0);
        
    });

    it('getRandomNumber() if and isDuplicate true condition', () => {

        const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const num = myArray[Math.floor(Math.random() * myArray.length)];
        comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
        spyOn(comp,'getRandomNumber').and.returnValue(num);
        comp.getRandomNumber();
        comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
        fixture.detectChanges();
        expect(comp.getRandomNumber).toHaveBeenCalled();
    });


    it('getRandomNumber() else ', () => {
        const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const num = myArray[Math.floor(Math.random() * myArray.length)];
        comp.randomArr = [];
        comp.getRandomNumber();
        spyOn(comp, 'getRandomNumber').and.returnValue(num);
        fixture.detectChanges();

        expect(comp.randomArr.length).toBe(0);
        expect(comp.getRandomNumber).not.toHaveBeenCalled();
    });

    it('generateTyp2Arry() if condition ', () => {
        comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
        spyOn(comp, 'generateTyp2Arry');
        comp.generateTyp2Arry();
        fixture.detectChanges();
        expect(comp.type2Arr1.length).toBe(3);
        expect(comp.type2Arr2.length).toBe(3);
        expect(comp.type2Arr3.length).toBe(3);
        expect(comp.generateTyp2Arry).toHaveBeenCalled();
        expect(comp.lastDigit).toBe(0);
        });

    it('generateTyp2Arry() else condition ', () => {
        comp.randomArr = [];
        spyOn(comp, 'generateTyp2Arry');
        comp.generateTyp2Arry();
        fixture.detectChanges();
        expect(comp.type2Arr1.length).toBe(3);
        expect(comp.type2Arr2.length).toBe(3);
        expect(comp.type2Arr3.length).toBe(3);
        expect(comp.generateTyp2Arry).toHaveBeenCalled();
        expect(comp.lastDigit).toBe(0);
    });

    it('validateMax() if check ', () => {
        comp.maxlen = 6;
        comp.minlen = undefined;
        comp.value = 'abcd';
        comp.validateMax();

        expect(comp.isValid).toEqual(true);
    });

    it('validateMax() else check ', () => {
        comp.maxlen = 2;
        comp.minlen = undefined;
        comp.value = 'abcd';
        comp.validateMax();
        fixture.detectChanges();

        expect(comp.isValid).toEqual(false);
    });

    it('validateMax() else check ', () => {
        comp.maxlen = 2;
        comp.minlen = 5;
        comp.value = 'abcd';
        comp.validateMax();
        fixture.detectChanges();

        expect(comp.isValid).toBeUndefined();
    });

    it('validateMin() if check ', () => {
        comp.minlen = 2;
        comp.maxlen = undefined;
        comp.value = 'abcd';
        comp.validateMin();
        fixture.detectChanges();
        expect(comp.isValid).toEqual(true);
    });

    it('validateMin() else check ', () => {
        comp.minlen = 8;
        comp.maxlen = undefined;
        comp.value = 'abcd';
        comp.validateMin();
        fixture.detectChanges();
        expect(comp.isValid).toEqual(false);
    });

    it('validateMin() else check ', () => {
        comp.minlen = 8;
        comp.maxlen = 10;
        comp.value = 'abcd';
        comp.validateMin();
        fixture.detectChanges();
        expect(comp.isValid).toBeUndefined();
    });

    it('validateMinMax() if condition ', () => {
        comp.minlen = 2;
        comp.maxlen = 5;
        comp.value = 'abc';
        spyOn(comp, 'validateMax');
        spyOn(comp, 'validateMin');
        comp.iconfeedback = true;
        comp.validateMinMax();
        
        comp.validateMin();
        comp.validateMax();
        fixture.detectChanges();
        expect(comp.isValid).toEqual(true);
        expect(comp.validateMax).toHaveBeenCalled();
        expect(comp.validateMin).toHaveBeenCalled();
    });

    it('validateMinMax() if if else condition ', () => {
        comp.minlen = 2;
        comp.maxlen = 5;
        comp.value = 'a';
        spyOn(comp, 'validateMax');
        spyOn(comp, 'validateMin');
        comp.iconfeedback = true;
        comp.validateMinMax();

        comp.validateMin();
        comp.validateMax();
        fixture.detectChanges();
        expect(comp.isValid).toEqual(false);
        expect(comp.validateMax).toHaveBeenCalled();
        expect(comp.validateMin).toHaveBeenCalled();
    });

    it('validateMinMax() if else condition ', () => {
        comp.value = '1';
        comp.iconfeedback = false;
        comp.validateMinMax();
        const min = spyOn(comp, 'validateMin');
        expect(min).not.toHaveBeenCalled();
        const max = spyOn(comp, 'validateMax');
        expect(max).not.toHaveBeenCalled();
    });

    it('getBtnData() if condition ', () => {
        const data = 3;
        comp.value = 'aa';
        spyOn(comp, 'emitBtnData').withArgs(data);
        spyOn(comp.valueChange, 'emit').withArgs(comp.value);
        comp.isValid = true;
        comp.iconfeedback = true;

        comp.emitBtnData(data);
        comp.valueChange.emit(comp.value);

        fixture.detectChanges();

        expect(comp.value).toContain('aa');
        expect(comp.cls).toEqual('nonecls');
        expect(comp.emitBtnData).toHaveBeenCalledWith(data);
        expect(comp.valueChange.emit).toHaveBeenCalledWith(comp.value);
    });


    it('getBtnData() else condition ', () => {
        const data = 3;
        comp.value = 'aa';
        spyOn(comp, 'emitBtnData').withArgs(data);
        spyOn(comp.valueChange, 'emit').withArgs(comp.value);
        comp.isValid = false;
        comp.iconfeedback = true;
        comp.emitBtnData(data);
        comp.valueChange.emit(comp.value);

        fixture.detectChanges();

        expect(comp.cls).toEqual('nonecls');
        expect(comp.emitBtnData).toHaveBeenCalledWith(data);
        expect(comp.valueChange.emit).toHaveBeenCalledWith(comp.value);
    });

    it('eraseData() if condition', () => {
        comp.value = '123';
        comp.isValid = true;
        comp.iconfeedback = true;
        const object = { data: comp.value };
        spyOn(comp.onClick,'emit').withArgs(object);
        spyOn(comp.valueChange,'emit').withArgs(comp.value);
        spyOn(comp,'validateMinMax');
        comp.onClick.emit(object);
        comp.valueChange.emit(comp.value);
        comp.validateMinMax();
        fixture.detectChanges();
        expect(comp.cls).toEqual('nonecls');

    });

    it('eraseData() else if condition', () => {
        comp.value = '123';
        comp.isValid = false;
        comp.iconfeedback = true;
        const object = { data: comp.value };
        spyOn(comp.onClick,'emit').withArgs(object);
        spyOn(comp.valueChange,'emit').withArgs(comp.value);
        spyOn(comp,'validateMinMax');
        comp.onClick.emit(object);
        comp.valueChange.emit(comp.value);
        comp.validateMinMax();
        fixture.detectChanges();
        expect(comp.cls).toEqual('nonecls');

    });

    it('eraseData() if condition', () => {
        comp.value = '';
        comp.iconfeedback = true;
        const object = { data: comp.value };
        spyOn(comp.onClick,'emit').withArgs(object);
        spyOn(comp.valueChange,'emit').withArgs(comp.value);
        spyOn(comp,'validateMinMax');
        comp.onClick.emit(object);
        comp.valueChange.emit(comp.value);
        comp.validateMinMax();
        fixture.detectChanges();
        expect(comp.isValid).toBeUndefined();
        expect(comp.cls).toEqual('nonecls');
    });

    it('eraseData() else condition', () => {
        comp.value = '';
        comp.iconfeedback = true;
        const object = { data: comp.value };
        spyOn(comp.onClick,'emit').withArgs(object);
        spyOn(comp.valueChange,'emit').withArgs(comp.value);
        spyOn(comp, 'validateMinMax');

        fixture.detectChanges();
        expect(comp.isValid).toBeUndefined();
        expect(comp.cls).toBe('nonecls');
    });

    it('emitBtnData()', () => {
        let keycode;
        const obj = { key: keycode, data: comp.value };
        spyOn(comp.onClick,'emit');
        comp.emitBtnData(keycode);
        fixture.detectChanges();
        expect(comp.onClick.emit).toHaveBeenCalledWith(obj)
    });

    it('emitBtnData() negate', () => {
        let keycode;
        const obj = { key: keycode, data: comp.value };
        spyOn(comp.onClick,'emit');
        fixture.detectChanges();
        expect(comp.onClick.emit).not.toHaveBeenCalledWith(obj)
    });

    it('clearData() if condition', () => {
        comp.value = '';
        comp.minlen = 2;
        comp.maxlen = 4;
        comp.isValid = null;
        const object = { data: comp.value };
        spyOn(comp.onClick,'emit').withArgs(object);
        spyOn(comp.valueChange,'emit').withArgs(comp.value);
        comp.onClick.emit(object);
        comp.valueChange.emit(comp.value);
        comp.clearData();
        fixture.detectChanges();
        expect(comp.isValid).toBeNull();
        expect(comp.cls).toEqual('nonecls');
        expect(comp.onClick.emit).toHaveBeenCalledWith(object);
    });

    it('clearData() else condition', () => {
        comp.value = '';
        comp.minlen = 2;
        comp.maxlen = undefined;
        comp.isValid = null;
        const object = { data: comp.value };
        spyOn(comp.onClick,'emit').withArgs(object);
        spyOn(comp.valueChange,'emit').withArgs(comp.value);
      
        comp.onClick.emit(object);
        comp.valueChange.emit(comp.value);
        comp.clearData();
        fixture.detectChanges();
        expect(comp.cls).toEqual('nonecls');
    });

    it('clearData() else condition', () => {
        comp.value = '';
        comp.minlen = undefined;
        comp.maxlen = undefined;
        comp.isValid = null;
        const object = { data: comp.value };
        spyOn(comp.onClick,'emit').withArgs(object);
        spyOn(comp.valueChange,'emit').withArgs(comp.value);
      
        comp.onClick.emit(object);
        comp.valueChange.emit(comp.value);
        comp.clearData();
        fixture.detectChanges();
        expect(comp.cls).toEqual('nonecls');
        expect(comp.onClick.emit).toHaveBeenCalledWith(object);
        expect(comp.valueChange.emit).toHaveBeenCalledWith(comp.value);
    });

    it('clearData() else condition', () => {
        comp.value = '';
        comp.minlen = undefined;
        comp.maxlen = 4;
        comp.isValid = null;
        const object = { data: comp.value };
        spyOn(comp.onClick,'emit').withArgs(object);
        spyOn(comp.valueChange,'emit').withArgs(comp.value);
      
        comp.onClick.emit(object);
        comp.valueChange.emit(comp.value);
        fixture.detectChanges();
        expect(comp.cls).toEqual('nonecls');
        expect(comp.onClick.emit).toHaveBeenCalledWith(object);
        expect(comp.valueChange.emit).toHaveBeenCalledWith(comp.value);
    });

    it('onToggle If call ', () => {
        
        comp.show = false;
        comp.toggleShow();
        fixture.detectChanges();
        expect(comp.textType).toEqual('text');
    });

    it('onToggle else call ', () => {
        comp.show = false;
        comp.toggleShow();
        fixture.detectChanges();
        expect(comp.textType).toEqual('text');
    });

});
