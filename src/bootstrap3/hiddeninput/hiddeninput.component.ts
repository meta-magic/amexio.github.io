/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas
 *
 */

import {Input, OnInit, forwardRef, Component} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HiddenInputComponent),
    multi: true
};

@Component({
    selector: 'amexio-hidden-input',
    template : `
        <input type="hidden"
               class="form-control"
               [(ngModel)]="value"

        >
    `,
    providers : [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class HiddenInputComponent implements OnInit,ControlValueAccessor {

    elementId : string;

    constructor() {
        this.elementId = "input-text-"+new Date().getTime();
    }

    ngOnInit() {

    }

    //The internal dataviews model
    private innerValue: any = '';

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }



    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }






}
