import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'amexio-dial-pad',
    templateUrl: './dialpad.component.html',
})
export class AmexioDialpadComponent implements OnInit {
    btnArray1 = [0, 1, 2, 3, 4];
    btnArray2 = [5, 6, 7, 8, 9];
    type2Arr1 = [1, 2, 3];
    type2Arr2 = [4, 5, 6];
    type2Arr3 = [7, 8, 9];

    textType = '';
    isValid: boolean;
    cls: any;
    randomArr: any[];
    @Input() value = '';
    @Input('field-label') label = '';
    @Input() type = '2-rows';
    @Input() random: boolean;
    @Input() password: boolean;
    @Input('max-length') maxlen: number;
    @Input('min-length') minlen: number;
    iconfeedback = false;

    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
        if (this.password) {
            this.textType = 'password';
        } else {
            this.textType = 'text';
        }

        // set black cls
        this.cls = 'nonecls';

        if (this.minlen || this.maxlen) {
            this.iconfeedback = true;
        }
        this.randomArr = [];
        const num = 0;
        const i = 0;
        const foundDuplicate = false;
        if (this.random && (this.type === '2-rows')) {
            this.generateRandomArray();
            if (this.randomArr.length > 0) {
                this.btnArray1 = [];
                this.btnArray2 = [];
                this.generateTyp1Ayyay();
            }
        }

        if (this.random && (this.type === 'classic')) {
            // call random function

        }
    }

    generateTyp1Ayyay() {
        this.randomArr.forEach((element: any, index: any) => {
            if ((index >= 0) && (index < 5)) {
                this.btnArray1.push(element);
            }
            if (index > 4) {
                this.btnArray2.push(element);
            }
        });
    }

    generateRandomArray() {
        let i = 0;
        let num;
        for (i = 0; i < 10; i++) {
            num = this.getRandomNumber();
            this.randomArr.push(num);
        }
    }

    validateMinMax() {
        if (this.iconfeedback && this.value) {
            if (this.minlen && this.maxlen) {
                if (this.value.length >= this.minlen && this.value.length <= this.maxlen) {
                    this.isValid = true;
                } else {
                    this.isValid = false;
                }
            }
            this.validateMin();
            this.validateMax();
        }
    }

    validateMin() {
        if (this.minlen && (this.maxlen === undefined)) {
            if (this.value.length >= this.minlen) {
                this.isValid = true;
            } else {
                this.isValid = false;
            }
        }
    }

    validateMax() {
        if (this.maxlen && (this.minlen === undefined)) {
            if (this.value.length <= this.maxlen) {
                this.isValid = true;
            } else {
                this.isValid = false;
            }
        }
    }

    getBtnData(data: any) {
        this.value = this.value + data;
        this.emitBtnData(data);
        this.valueChange.emit(this.value);
        this.validateMinMax();
        // if isvalid thn set green
        // if isvalid thn set red
        if (this.isValid && this.iconfeedback) {
            this.cls = 'greencls';
        } else if (!this.isValid && this.iconfeedback) {
            this.cls = 'redcls';
        }
    }

    eraseData() {
        let str;
        str = this.value.slice(0, -1);
        this.value = str;
        const object = { data: this.value };
        this.onClick.emit(object);
        this.valueChange.emit(this.value);
        this.validateMinMax();
        // if isvalid thn set green
        // if !isvalid thn set red
        if (this.isValid && this.iconfeedback) {
            this.cls = 'greencls';
        } else if (!this.isValid && this.iconfeedback) {
            this.cls = 'redcls';
        }
        if (this.value.length < 1 && this.iconfeedback) {
            this.isValid = null;
            this.cls = 'redcls';
        }
    }

    emitBtnData(keycode: any) {
        const obj = { key: keycode, data: this.value };
        this.onClick.emit(obj);
    }

    clearData() {
        this.value = '';
        this.isValid = null;
        const object = { data: this.value };
        this.onClick.emit(object);
        this.valueChange.emit(this.value);
        // set black class
        if (this.minlen || this.maxlen || (this.minlen && this.maxlen)) {
            this.isValid = null;
            this.cls = 'redcls';
        } else {
            this.cls = 'nonecls';
        }
    }

    getRandomNumber(): number {
        const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const num = myArray[Math.floor(Math.random() * myArray.length)];
        let isDuplicate = false;

        if (this.randomArr.length > 0) {
            this.randomArr.forEach((element: any) => {
                if (num === element) {
                    isDuplicate = true;
                }
            });
            if (isDuplicate) {
                return this.getRandomNumber();
            } else if (!isDuplicate) {
                return num;
            }
        } else {
            return num;
        }
    }
}
