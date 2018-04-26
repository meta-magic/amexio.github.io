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
/*
 Component Name : Amexio Toggle
 Component Selector :  <amexio-toggle>
 Component Description : Toggle Button
*/
import {
  Input, OnInit, forwardRef, Component, AfterViewInit, Output, EventEmitter, ViewEncapsulation
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const noop = () => {
};

export const CUSTOM_tOGGLE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioToggleComponent), multi: true
};

@Component({
  selector: 'amexio-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [CUSTOM_tOGGLE_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})

export class AmexioToggleComponent implements OnInit, ControlValueAccessor {
  /*
Properties
name :shape
datatype : string
version : 4.0 onwards
default : round
description : Round or Square Shape for toggle switch ,example shape=round,square .
*/
  @Input() shape: string;
  /*
Properties
name :field-label
datatype : string
version : 4.0 onwards
default : none
description : The label of this field.
*/
  @Input('field-label') fieldlabel: string;
/*
Events
name : onChange
datatype : any
version : 4.0 onwards
default : none
description : Event is fired on toggle component click
*/
/*
  Properties
  name : required
  datatype : boolean
  version : 4.0 onwards
  default : true
  description : sets if field is required
*/
  @Input() required: boolean;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  isComponentValid : boolean;

  constructor() {

  }

  ngOnInit() {
    this.shape == '' || this.shape == null ? this.shape = 'round' : 0;
    this.isComponentValid = !this.required;
  }

  onToggle() {
    this.isComponentValid = this.value;
    this.onChange.emit(this.value);
  }

  // The internal dataviews model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  }

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
      if (value) {
        this.isComponentValid = value;
      } else {
        this.isComponentValid = value;
      }
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

