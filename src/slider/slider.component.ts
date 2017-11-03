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
  useExisting: forwardRef(() => AmexioSliderComponent),
  multi: true
};

export const BASE_IMPL_RANGE_INPUT: any = {
  provide : FormInputBase,
  useExisting: forwardRef(() => AmexioSliderComponent)
};

@Component({
 selector: 'amexio-slider',
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
  styles : [`input[type=range] {
      height: 25px;
      -webkit-appearance: none;
      margin: 10px 0;
      width: 100%;
  }
  input[type=range]:focus {
      outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 7px;
      cursor: pointer;
      animate: 0.2s;
      box-shadow: 0px 0px 0px #000000;
      background: #838688;
      border-radius: 1px;
      border: 0px solid #000000;
  }
  input[type=range]::-webkit-slider-thumb {
      box-shadow: 0px 0px 0px #000000;
      border: 1px solid #2497E3;
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: #A1D0FF;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -7px;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
      background: #838688;
  }
  input[type=range]::-moz-range-track {
      width: 100%;
      height: 5px;
      cursor: pointer;
      animate: 0.2s;
      box-shadow: 0px 0px 0px #000000;
      background: #838688;
      border-radius: 1px;
      border: 0px solid #000000;
  }
  input[type=range]::-moz-range-thumb {
      box-shadow: 0px 0px 0px #000000;
      border: 1px solid #2497E3;
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: #A1D0FF;
      cursor: pointer;
  }
  input[type=range]::-ms-track {
      width: 100%;
      height: 5px;
      cursor: pointer;
      animate: 0.2s;
      background: transparent;
      border-color: transparent;
      color: transparent;
  }
  input[type=range]::-ms-fill-lower {
      background: #838688;
      border: 0px solid #000000;
      border-radius: 2px;
      box-shadow: 0px 0px 0px #000000;
  }
  input[type=range]::-ms-fill-upper {
      background: #838688;
      border: 0px solid #000000;
      border-radius: 2px;
      box-shadow: 0px 0px 0px #000000;
  }
  input[type=range]::-ms-thumb {
      margin-top: 1px;
      box-shadow: 0px 0px 0px #000000;
      border: 1px solid #2497E3;
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: #A1D0FF;
      cursor: pointer;
  }
  input[type=range]:focus::-ms-fill-lower {
      background: #838688;
  }
  input[type=range]:focus::-ms-fill-upper {
      background: #838688;
  }
  .amexio-range{
      display: inline !important;
  }
  `],
  providers : [CUSTOM_RANGE_INPUT_CONTROL_VALUE_ACCESSOR, BASE_IMPL_RANGE_INPUT],
})

export class AmexioSliderComponent extends FormInputBase implements OnInit, ControlValueAccessor{

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
