import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'amexio-dialpad',
    templateUrl: './dialpad.component.html',
})
export class AmexioDialpadComponent {
    btnArray1 = [0, 1, 2, 3, 4];
    btnArray2 = [5, 6, 7, 8, 9];

    @Input() value = '';
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

    getBtnData(data: any) {
        this.value = this.value + data;
        this.emitBtnData(data);
        this.valueChange.emit(this.value);
    }

    eraseData() {
        let str;
        str = this.value.slice(0, -1);
        this.value = str;
        const object = { data: this.value };
        this.onClick.emit(object);
        this.valueChange.emit(this.value);
    }

    emitBtnData(keycode: any) {
        const obj = { key: keycode, data: this.value };
        this.onClick.emit(obj);
    }

}
