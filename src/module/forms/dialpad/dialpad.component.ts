import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'amexio-dial-pad',
    templateUrl: './dialpad.component.html',
})
export class AmexioDialpadComponent implements OnInit {
    btnArray1 = [0, 1, 2, 3, 4];
    btnArray2 = [5, 6, 7, 8, 9];
    textType = '';
    isValid: boolean;
    cls: any;
    @Input() value = '';
    @Input('field-label') label = '';
    @Input() type = '2-rows';
    @Input() random: boolean;
    @Input() password: boolean;
    @Input('max-length') maxlen: number;
    @Input('min-length') minlen: number;
    @Input('icon-feedback') iconfeedback = false;

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
        if (this.minlen) {
            if (this.value.length >= this.minlen) {
                this.isValid = true;
            } else {
                this.isValid = false;
            }
        }
    }

    validateMax() {
        if (this.maxlen) {
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
        if (!this.minlen && !this.maxlen) {
            this.minlen = 1;
            this.validateMinMax();
        } else {
            this.validateMinMax();
        }
        // if isvalid thn set green
        // if isvalid thn set red
        if (this.isValid) {
            this.cls = 'greencls';
        } else {
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
        if (!this.minlen && !this.maxlen) {
            this.minlen = 1;
            this.validateMinMax();
        } else {
            this.validateMinMax();
        }
        // if isvalid thn set green
        // if isvalid thn set red
        if (this.isValid) {
            this.cls = 'greencls';
        } else {
            this.cls = 'redcls';
        }
        if (this.value.length < 1) {
            this.isValid = null;
            this.cls = 'nonecls';
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
        this.cls = 'nonecls';
    }

}
