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

import {Input, OnInit, forwardRef, Component, AfterViewInit, Output, EventEmitter} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FormInputBase} from "../baseclass/form.base.class";
const noop = () => {
};

export const CUSTOM_TOGGLE_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmexioToggleComponent),
  multi: true
};

export const BASE_IMPL_TOGGLE_INPUT: any = {
  provide : FormInputBase,
  useExisting: forwardRef(() => AmexioToggleComponent)
};
@Component({
  selector: 'amexio-toggle',
  template : `    
    <label>{{fieldLabel}}</label>
    <label class="amexio-toggle" style="">
      <input type="checkbox" checked
             name="value"
             #rangeHndl
             (blur)="onBlur()"
             [(ngModel)]="value"
             (change)="onToggle()">
      <span class="amexio-slider"></span>
    </label>
  `,
   styleUrls : ['toggle.component.style.css'],
  providers : [BASE_IMPL_TOGGLE_INPUT,CUSTOM_TOGGLE_INPUT_CONTROL_VALUE_ACCESSOR]
 })

export class AmexioToggleComponent extends FormInputBase implements OnInit {

  @Output()   onChange  : EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() { }

  onToggle(){
    this.onChange.emit(this.value);
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
