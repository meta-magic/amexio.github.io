/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Pratik Kelwalkar
 *
 */
import {Input, OnInit, forwardRef, Component, AfterViewInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FormInputBase} from "../baseclass/form.base.class";
const noop = () => {
};

export const CUSTOM_RANGE_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmexioRangeInputComponent),
  multi: true
};

export const BASE_IMPL_RANGE_INPUT: any = {
  provide : FormInputBase,
  useExisting: forwardRef(() => AmexioRangeInputComponent)
};

@Component({
 selector: 'amexio-range-input',
 template: `
   <div class="amexio-range">
    <input type="range"
           name="value"
           #rangeHndl
           (blur)="onBlur()"
           [(ngModel)]="value"
           [attr.id]="elementId"
           [attr.min]="minValue"
           [attr.max]="maxValue"
           [attr.step]="stepValue"
           />
     <output [attr.for]="elementId">{{value}}</output>
   </div>
 `,
  styleUrls : ['range.input.style.css'],
  providers : [CUSTOM_RANGE_INPUT_CONTROL_VALUE_ACCESSOR, BASE_IMPL_RANGE_INPUT],
})

export class AmexioRangeInputComponent extends FormInputBase implements OnInit, ControlValueAccessor{

  @Input()  minValue  : any;

  @Input()  maxValue  : any;

  @Input()  stepValue : any;

   constructor() {
     super();
     this.elementId = 'input-range-' + Math.floor(Math.random()*90000) + 10000;
   }

   ngOnInit() { }

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

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
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
