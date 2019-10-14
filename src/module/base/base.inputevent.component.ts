import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IInputValidator } from './input.validator';
import { ValueAccessorBaseComponent } from './value-accessor';
// @Component({
//     selector: 'list.base.datepicker',
//     template: './list.base.datepicker.component.html',
//   })
export class BaseInputEventComponent extends ValueAccessorBaseComponent<string>  {
    showToolTip: boolean;
    isValid = false;
    emailpattern: any = /\S+@\S+\.\S+/;
    @Input('allow-blank') allowblank: boolean;
    @Input('min-length') minlength: number;
    @Input('min-value') minvalue: any;
    @Input('max-value') maxvalue: any;
    @Output() onBlur: any = new EventEmitter<any>();
    @Output() input: any = new EventEmitter<any>();
    @Output() focus: any = new EventEmitter<any>();
    @Output() change: any = new EventEmitter<any>();
    constructor() {
        super();
        this.showToolTip = false;
    }
    onBlurEvent() {
        this.showToolTip = false;
        this.onBlur.emit(this.value);
    }
    onFocusEvent(event: any) {
        this.eventPropagationText(event);
        this.showToolTip = true;
        this.focus.emit(this.value);
    }

    onInputEvent(event: any) {
        this.eventPropagationText(event);
        this.isValid = this.isFieldValid();
        this.input.emit(this.value);
    }
    onChangeEvent(event: any) {
        this.eventPropagationText(event);
        this.change.emit(this.value);
    }

    eventPropagationText(event: any) {
        event.stopPropagation();
    }

    isFieldValid(): boolean {
        let valid: boolean;
        valid = (!this.allowblank && (this.value && ((this.value.length >= this.minlength) && this.value.length > 0)) ||
            (!this.minlength && this.value && this.value.length > 0)) || this.allowblank;
        this.isValid = valid;
        return valid;
    }
    isFieldValidate(): boolean {
        if (this.minvalue && !this.maxvalue) {
            return this.innerValue && (this.innerValue >= this.minvalue);
        } else if (!this.minvalue && this.maxvalue) {
            return this.innerValue && (this.innerValue <= this.maxvalue);
        } else if (!this.minvalue && !this.maxvalue && this.innerValue) {
            return true;
        } else {
            return this.innerValue && (this.innerValue >= this.minvalue && this.innerValue <= this.maxvalue);
        }
    }
    onNumberInputEvent(event: any) {
        this.eventPropagationText(event);
        this.isValid = this.isFieldValidate();
        this.input.emit(this.value);
    }
    onEmailInputEvent(event: any) {
        this.eventPropagationText(event);
        this.isValid = this.isEmailFieldValid();
        this.input.emit(this.value);
    }

    isEmailFieldValid(): boolean {
        return (!this.allowblank && this.emailpattern.test(this.value)) || this.allowblank;
    }
}
