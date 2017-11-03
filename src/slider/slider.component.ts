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
     <div class="amexio-slider">
         <input type="range"
                name="value"
                #rangeHndl
                (blur)="onBlur()"
                [(ngModel)]="value"
                [attr.id]="elementId"
                [attr.min]="minValue"
                [attr.max]="maxValue"
                [attr.step]="stepValue"
                [ngStyle]="{'background':'linear-gradient(to right, #2cafb3 0%, #2cafb3 '+this.value +'%, #fff ' + this.value + '%, #636363 100%)'}"
         />
         <!--<output [attr.for]="elementId">{{value}}</output>-->
     </div>
 `,
  styles : [`
      .amexio-slider input {
          background: -webkit-linear-gradient(left, #2cafb3 0%, #2cafb3 50%, #636363 50%, #636363 100%);
          background: linear-gradient(to right, #2cafb3 0%, #2cafb3 50%, #636363 50%, #636363 100%);
          border: solid 1px #2cafb3;
          border-radius: 8px;
          height: 7px;
          width: 356px;
          outline: none;
          -webkit-transition: background 450ms ease-in;
          transition: background 450ms ease-in;
          -webkit-appearance: none;
      }
      .amexio-slider input::-webkit-slider-thumb {
          background-color: black;
          border: solid 12px black;
          border-radius: 0;
          height: 15px;
          width: 15px;
          border-radius: 50%;
          -webkit-appearance: none;
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
