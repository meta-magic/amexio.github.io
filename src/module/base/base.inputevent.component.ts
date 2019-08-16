import { EventEmitter, Input, Output } from '@angular/core';
import { InputValidator } from './input.validator';
import { ValueAccessorBase } from './value-accessor';

export class BaseInputEvent extends ValueAccessorBase<string>  {
    showToolTip: boolean;
    isValid = false;
    @Input('allow-blank') allowblank: boolean;
    @Input('min-length') minlength: number;
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
        return valid;
    }
}
