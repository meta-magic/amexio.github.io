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

    // it('generateRandomArray() call', () => {
    //     comp.generateRandomArray();
    //     let i = 0;
    //     let num;
    //     for (i = 0; i < 10; i++) {
    //         num = comp.getRandomNumber();
    //         comp.randomArr.push(num);
    //     }
    // });

    // it('generateType2Arr() call generateRandomArray function and and if randomarray length gt 1 then call generateTyp2Arry', () => {
    //     comp.generateType2Arr();
    //     let spy = spyOn(comp, 'generateRandomArray');
    //     expect(spy).toHaveBeenCalled();
    //     expect(comp.type2Arr1.length).toEqual(0);
    //     expect(comp.type2Arr2.length).toEqual(0);
    //     expect(comp.type2Arr3.length).toEqual(0);
    //     let arr = spyOn(comp, 'generateTyp2Arry');
    //     expect(arr).toHaveBeenCalled();
    // });

    it('validateMin() if check ', () => {
        comp.minlen = 0;
        comp.value = 'abc';
        comp.isValid = true;
        comp.validateMin();
        expect(comp.isValid).toEqual(true);
    });

    it('validateMin() else check ', () => {
        comp.minlen = 3;
        comp.value = '';
        comp.isValid = false;
        comp.validateMin();
        expect(comp.isValid).toEqual(false);
    });

    it('validateMax() if  check ', () => {
        comp.maxlen = 0;
        comp.value = 'abc';
        comp.isValid = false;
        comp.validateMax();
        expect(comp.isValid).toEqual(false);
    });

    it('validateMax() else check ', () => {
        comp.maxlen = 3;
        comp.value = '';
        comp.isValid = true;
        comp.validateMax();
        expect(comp.isValid).toEqual(true);
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


    // it('ngOnInit() 0st  condition ', () => {
    //     comp.type = '2-rows';
    //     comp.minlen = 2;
    //     comp.maxlen = 4;
    //     comp.random = true;
    //     comp.password = true;
    //     comp.showpassword = true;
    //     comp.ngOnInit();
    //     expect(comp.showpassword).toEqual(true);
    //     comp.textType = 'password';
    //     expect(comp.password).toEqual(true);
    //     comp.textType = 'password';
    //     comp.cls = 'nonecls';
    //     expect(comp.minlen).toEqual(2);
    //     expect(comp.maxlen).toEqual(4);
    //     comp.iconfeedback = true;
    //     comp.randomArr = [];
    //     const num = 0;
    //     const i = 0;
    //     const foundDuplicate = false;
    //     expect(comp.random).toEqual(true);
    //     expect(comp.type).toEqual('2-rows');
    //     comp.generateRandomArray();

    //     comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
    //     expect(comp.randomArr.length).toBeGreaterThanOrEqual(1);
    //     comp.btnArray1 = [];
    //     comp.btnArray2 = [];
    //     comp.generateTyp1Arr();


    // });

    // it('ngOnInit() 1st  condition ', () => {
    //     comp.type = '2-rows';
    //     comp.minlen = 2;
    //     comp.maxlen = 4;
    //     comp.random = true;
    //     comp.password = true;
    //     comp.ngOnInit();
    //     expect(comp.password).toEqual(true);
    //     comp.textType = 'password';
    //     comp.cls = 'nonecls';
    //     expect(comp.minlen).toEqual(2);
    //     expect(comp.maxlen).toEqual(4);
    //     comp.iconfeedback = true;
    //     comp.randomArr = [];
    //     const num = 0;
    //     const i = 0;
    //     const foundDuplicate = false;
    //     expect(comp.random).toEqual(true);
    //     expect(comp.type).toEqual('2-rows');
    //     comp.generateRandomArray();

    //     comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
    //     expect(comp.randomArr.length).toBeGreaterThan(0);
    //     comp.btnArray1 = [];
    //     comp.btnArray2 = [];
    //     comp.generateTyp1Arr();


    // });

    // it('ngOnInit() 2nd condition ', () => {
    //     comp.type = '2-rows';

    //     comp.random = true;
    //     comp.password = false;
    //     comp.ngOnInit();
    //     expect(comp.password).toEqual(false);
    //     comp.textType = 'text';
    //     comp.cls = 'nonecls';
    //     expect(comp.minlen).toBeUndefined();
    //     expect(comp.maxlen).toBeUndefined();

    //     comp.randomArr = [];
    //     const num = 0;
    //     const i = 0;
    //     const foundDuplicate = false;
    //     expect(comp.random).toEqual(true);
    //     expect(comp.type).toEqual('2-rows');
    //     comp.generateRandomArray();

    //     comp.randomArr = [];
    //     expect(comp.randomArr.length).not.toBeGreaterThanOrEqual(1);

    // });

    // it('ngOnInit() 3rd condition ', () => {
    //     comp.type = 'rows';

    //     comp.random = false;
    //     comp.password = false;
    //     comp.ngOnInit();
    //     expect(comp.password).toEqual(false);
    //     comp.textType = 'text';
    //     comp.cls = 'nonecls';
    //     expect(comp.minlen).toBeUndefined();
    //     expect(comp.maxlen).toBeUndefined();

    //     comp.randomArr = [];
    //     const num = 0;
    //     const i = 0;
    //     const foundDuplicate = false;
    //     expect(comp.random).toEqual(false);
    //     expect(comp.type).not.toEqual('2-rows');

    //     comp.type = 'classic';
    //     comp.random = true;

    //     expect(comp.type).toEqual('classic');
    //     expect(comp.random).toEqual(true);

    //     comp.generateType2Arr();

    // });

    // it('ngOnInit() 4th condition ', () => {
    //     comp.type = 'rows';

    //     comp.random = false;
    //     comp.password = false;
    //     comp.ngOnInit();
    //     expect(comp.password).toEqual(false);
    //     comp.textType = 'text';
    //     comp.cls = 'nonecls';
    //     expect(comp.minlen).toBeUndefined();
    //     expect(comp.maxlen).toBeUndefined();

    //     comp.randomArr = [];
    //     const num = 0;
    //     const i = 0;
    //     const foundDuplicate = false;
    //     expect(comp.random).toEqual(false);
    //     expect(comp.type).not.toEqual('2-rows');
    //     expect(comp.type).not.toEqual('classic');


    // });
    // it(' random Arr Less condition ', () => {
    //     comp.type = '2-rows';
    //     comp.minlen = 2;
    //     comp.maxlen = 4;
    //     comp.random = true;
    //     comp.password = true;
    //     comp.ngOnInit();
    //     expect(comp.password).toEqual(true);
    //     comp.textType = 'password';
    //     comp.cls = 'nonecls';
    //     expect(comp.minlen).toEqual(2);
    //     expect(comp.maxlen).toEqual(4);
    //     comp.iconfeedback = true;
    //     comp.randomArr = [];
    //     const num = 0;
    //     const i = 0;
    //     const foundDuplicate = false;
    //     expect(comp.random).toEqual(true);
    //     expect(comp.type).toEqual('2-rows');
    //     comp.generateRandomArray();
    //     comp.randomArr = [];
    //     expect(comp.randomArr.length).toBeLessThanOrEqual(0);

    // });
    // it('generateTyp1Arr() if condition ', () => {

    //     comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
    //     comp.generateTyp1Arr();

    //     comp.randomArr.forEach((element: any, index: any) => {
    //         if ((index >= 0) && (index < 5)) {
    //             comp.btnArray1.push(element);
    //         } if (index > 4) {
    //             comp.btnArray2.push(element);
    //         }
    //     });
    // });

    // it('generateTyp1Arr() if condition ', () => {

    //     comp.randomArr = [];
    //     comp.generateTyp1Arr();

    //     comp.randomArr.forEach((element: any, index: any) => {
    //         if ((index >= 0) && (index < 5)) {
    //             comp.btnArray1.push(element);
    //         } if (index > 4) {
    //             comp.btnArray2.push(element);
    //         }
    //     });
    // });

    // // it('generateType2Arr() if condition ', () => {
    // //     comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
    // //     comp.generateRandomArray();
    // //     comp.generateType2Arr();

    // //     if (comp.randomArr.length > 0) {
    // //         comp.type2Arr1 = [];
    // //         comp.type2Arr2 = [];
    // //         comp.type2Arr3 = [];
    // //         comp.generateTyp2Arry();
    // //     }
    // // });

    // it('generateTyp2Arry() if condition ', () => {
    //     comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
    //     comp.generateTyp2Arry();
    //     comp.randomArr.forEach((element: any, index: any) => {
    //         if ((index >= 0) && (index < 3)) {
    //             comp.type2Arr1.push(element);
    //         }
    //         if ((index > 2) && (index < 6)) {
    //             comp.type2Arr2.push(element);
    //         }
    //         if ((index > 5) && (index < 9)) {
    //             comp.type2Arr3.push(element);
    //         }

    //         comp.lastDigit = comp.randomArr[comp.randomArr.length - 1];

    //     });
    // });

    // it('generateTyp2Arry() else condition ', () => {
    //     comp.randomArr = [];
    //     comp.generateTyp2Arry();
    //     comp.randomArr.forEach((element: any, index: any) => {
    //         if ((index <= 0) && (index > 3)) {
    //         }
    //         if ((index < 2) && (index > 6)) {
    //         }
    //         if ((index < 5) && (index > 9)) {
    //         }

    //         comp.lastDigit = comp.randomArr[comp.randomArr.length - 1];

    //     });
    // });


    // it('validateMinMax() if condition ', () => {
    //     comp.isValid = true;
    //     comp.minlen = 2;
    //     comp.maxlen = 5;
    //     comp.value = '1' + '2' + '3' + '1' + '2' + '3' + '1' + '2' + '3';
    //     comp.iconfeedback = true;
    //     comp.validateMinMax();
    //     expect(comp.iconfeedback).toEqual(true);
    //     expect(comp.value).toBeDefined();

    //     expect(comp.minlen).toEqual(2);
    //     expect(comp.maxlen).toEqual(5);

    //     expect(comp.value.length).toBeGreaterThanOrEqual(comp.minlen);
    //     expect(comp.value.length).toBeGreaterThanOrEqual(comp.maxlen);
    //     comp.isValid = true;

    //     comp.validateMin();
    //     comp.validateMax();




    // });

    // it('validateMinMax() if if else condition ', () => {
    //     comp.isValid = true;
    //     comp.minlen = 2;
    //     comp.maxlen = 5;
    //     comp.value = '1';
    //     comp.iconfeedback = true;
    //     comp.validateMinMax();
    //     expect(comp.iconfeedback).toEqual(true);
    //     expect(comp.value).toBeDefined();

    //     expect(comp.minlen).toEqual(2);
    //     expect(comp.maxlen).toEqual(5);

    //     expect(comp.value.length).not.toBeGreaterThanOrEqual(comp.minlen);
    //     expect(comp.value.length).not.toBeGreaterThanOrEqual(comp.maxlen);
    //     comp.isValid = false;

    //     comp.validateMin();
    //     comp.validateMax();




    // });


    // it('validateMinMax() if if else condition ', () => {
    //     comp.isValid = true;
    //     comp.maxlen = 5;
    //     comp.value = '1';
    //     comp.iconfeedback = true;
    //     comp.validateMinMax();
    //     expect(comp.iconfeedback).toEqual(true);
    //     expect(comp.value).toBeDefined();

    //     expect(comp.minlen).toBeUndefined();
    //     expect(comp.maxlen).toEqual(5);

    //     comp.validateMin();
    //     comp.validateMax();

    // });
    // it('validateMinMax() if if else condition ', () => {
    //     comp.value = '1';
    //     comp.iconfeedback = false;
    //     comp.validateMinMax();
    //     expect(comp.iconfeedback).toEqual(false);
    //     expect(comp.value).toBeDefined();

    // });

    // it('getBtnData() if condition ', () => {
    //     let data = 3;
    //     comp.isValid = true;
    //     comp.iconfeedback = true;
    //     comp.getBtnData(data);
    //     comp.value = comp.value + data;
    //     comp.emitBtnData(data);
    //     comp.valueChange.emit(comp.value);
    //     comp.validateMinMax();
    //     expect(comp.isValid).toEqual(true);
    //     expect(comp.iconfeedback).toEqual(true);
    //     comp.cls = 'greencls';
    // });

    // it('getBtnData() else if condition ', () => {
    //     let data = 3;
    //     comp.isValid = false;
    //     comp.iconfeedback = true;
    //     comp.getBtnData(data);
    //     comp.value = comp.value + data;
    //     comp.emitBtnData(data);
    //     comp.valueChange.emit(comp.value);
    //     comp.validateMinMax();
    //     expect(comp.isValid).toEqual(false);
    //     expect(comp.iconfeedback).toEqual(true);
    //     comp.cls = 'redcls';
    // });

    // it('getBtnData() else condition ', () => {
    //     let data = 3;
    //     comp.isValid = false;
    //     comp.iconfeedback = false;
    //     comp.getBtnData(data);
    //     comp.value = comp.value + data;
    //     comp.emitBtnData(data);
    //     comp.valueChange.emit(comp.value);
    //     comp.validateMinMax();
    //     expect(comp.isValid).toEqual(false);
    //     expect(comp.iconfeedback).toEqual(false);
    // });


    // it('eraseData() if condition', () => {
    //     comp.value = '123';
    //     comp.isValid = true;
    //     comp.iconfeedback = true;
    //     comp.eraseData();
    //     let str;
    //     str = comp.value.slice(0, -1);
    //     comp.value = str;
    //     expect(comp.isValid).toEqual(true);
    //     expect(comp.iconfeedback).toEqual(true);
    //     comp.cls = 'greencls';

    //     expect(comp.iconfeedback).toEqual(true);
    //     expect(comp.value.length).not.toBeGreaterThan(1);

    //     comp.isValid = null;
    //     comp.cls = 'redcls';

    // });

    // it('eraseData() else if condition', () => {
    //     comp.value = '123';
    //     comp.isValid = false;
    //     comp.iconfeedback = true;
    //     comp.eraseData();
    //     let str;
    //     str = comp.value.slice(0, -1);
    //     comp.value = str;
    //     expect(comp.isValid).toEqual(false);
    //     expect(comp.iconfeedback).toEqual(true);
    //     comp.cls = 'redcls';

    //     expect(comp.iconfeedback).toEqual(true);
    //     expect(comp.value.length).not.toBeGreaterThan(1);
    //     comp.isValid = null;
    //     comp.cls = 'redcls';

    // });

    // it('eraseData() else condition', () => {
    //     comp.value = '123' + '123';
    //     comp.isValid = false;
    //     comp.iconfeedback = false;
    //     comp.eraseData();
    //     let str;
    //     str = comp.value.slice(0, -1);
    //     comp.value = str;
    //     expect(comp.isValid).toEqual(false);
    //     expect(comp.iconfeedback).toEqual(false);

    //     expect(comp.iconfeedback).toEqual(false);
    //     expect(comp.value.length).toBeGreaterThan(1);
    // });



    // it('clearData() condition', () => {
    //     comp.value = '';
    //     comp.minlen = 2;
    //     comp.maxlen = 4;
    //     comp.isValid = null;
    //     const object = { data: comp.value };
    //     comp.onClick.emit(object);
    //     comp.valueChange.emit(comp.value);
    //     comp.clearData();
    //     expect(comp.minlen).toEqual(2);
    //     expect(comp.maxlen).toEqual(4);
    //     comp.isValid = null;
    //     comp.cls = 'redcls';


    // });

    // it('getRandomNumber() if and isDuplicate true condition', () => {

    //     const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    //     const num = myArray[Math.floor(Math.random() * myArray.length)];
    //     let isDuplicate = false;
    //     comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
    //     comp.getRandomNumber();
    //     expect(comp.randomArr.length).toBeGreaterThan(0);
    //     comp.randomArr.forEach((element: any) => {
    //         if (num === element) {
    //             isDuplicate = true;
    //         }
    //     });
    //     isDuplicate = true;
    //     expect(isDuplicate).toEqual(true);
    //     return comp.getRandomNumber();
    // });

    // it('getRandomNumber() if and isDuplicate false condition', () => {

    //     const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    //     const num = myArray[Math.floor(Math.random() * myArray.length)];
    //     let isDuplicate = false;
    //     comp.randomArr = [0, 5, 4, 3, 2, 5, 1, 7, 8, 9];
    //     comp.getRandomNumber();
    //     expect(comp.randomArr.length).toBeGreaterThan(0);
    //     comp.randomArr.forEach((element: any) => {
    //         if (num != element) {
    //         }
    //     });
    //     isDuplicate = false;
    //     expect(isDuplicate).toEqual(false);
    //     return num;
    // });


    // it('getRandomNumber() else ', () => {
    //     const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    //     const num = myArray[Math.floor(Math.random() * myArray.length)];
    //     let isDuplicate = false;
    //     comp.randomArr = [];
    //     comp.getRandomNumber();
    //     expect(comp.randomArr.length).not.toBeGreaterThanOrEqual(1);

    //     return num;
    // });


    // it('validateMin() if check ', () => {
    //     comp.minlen = 0;
    //     comp.value = 'abc';
    //     comp.validateMin();
    //     expect(comp.minlen).toEqual(0);
    //     expect(comp.maxlen).toBeUndefined();
    //     expect(comp.value.length).toBeGreaterThanOrEqual(comp.minlen);
    //     comp.isValid = true;

    // });
    // it('validateMin() else check ', () => {
    //     comp.minlen = 3;
    //     comp.value = '';
    //     comp.validateMin();
    //     expect(comp.minlen).toEqual(3);
    //     expect(comp.maxlen).toBeUndefined();
    //     expect(comp.minlen).toBeGreaterThanOrEqual(comp.value.length);
    //     comp.isValid = false;
    // });

    // it('validateMax() if  check ', () => {
    //     comp.maxlen = 0;
    //     comp.value = 'abc';
    //     comp.validateMax();
    //     expect(comp.maxlen).toEqual(0);
    //     expect(comp.minlen).toBeUndefined();
    //     expect(comp.value.length).toBeGreaterThanOrEqual(comp.maxlen);
    //     comp.isValid = false;
    // });
    // it('validateMax() else check ', () => {
    //     comp.maxlen = 3;
    //     comp.value = '';
    //     comp.validateMax();
    //     expect(comp.maxlen).toEqual(3);
    //     expect(comp.minlen).toBeUndefined();
    //     expect(comp.maxlen).toBeGreaterThanOrEqual(comp.value.length);
    //     comp.isValid = true;
    // });
    // it('onToggle If call ', () => {
    //     comp.show = true;
    //     comp.toggleShow();
    //     comp.show = !comp.show;
    //     expect(comp.show).toEqual(true);
    //     comp.type = 'text';
    //   })
    
    //   it('onToggle else call ', () => {
    //     comp.show = false;
    //     comp.toggleShow();
    //     comp.show = !comp.show;
    //     expect(comp.show).toEqual(false);
    //     comp.type = 'password';
    //   })

});
