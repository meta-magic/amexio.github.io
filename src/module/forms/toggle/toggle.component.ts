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
  AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';
import { AmexioFormValidator } from './../form-validator/amexio.form.validator.component';

const noop = () => {
};

@Component({
  selector: 'amexio-toggle',
  templateUrl: './toggle.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioToggleComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioToggleComponent), multi: true,
  }],
  encapsulation: ViewEncapsulation.None,
})

export class AmexioToggleComponent extends AmexioFormValidator implements OnInit, ControlValueAccessor, Validators {
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
default :
description : The label of this field.
*/
  @Input('field-label') fieldlabel: string;
  /*
  Events
  name : onChange
  datatype : any
  version : 4.0 onwards
  default :
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

  @Input('size') size: any;
  @Input('type') type: number;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  isValid: boolean;

  checked: boolean;

  componentId: string;

  toggleId: string;

  @Output() isComponentValid: any = new EventEmitter<any>();

  // The internal dataviews model
  private innerValue: any = '';

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {
    super();
  }

  ngOnInit() {

    this.componentId =  this.createCompId('togglebtn', this.fieldlabel);
    this.toggleId = this.createCompId('toggleId', this.fieldlabel);
    if (this.shape === '' || this.shape == null) {
      this.shape = 'round';
    }
    this.isValid = !this.required;
    this.isComponentValid.emit(false);
  }

  onToggle() {
    this.checked = !this.checked;
    this.value = this.checked;
    this.isValid = this.value;
    this.isComponentValid.emit(this.value);
    this.onChange.emit(this.value);
  }

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value && value !== this.innerValue) {
      this.isValid = value;
    }
    if (!value && value !== this.innerValue) {
      this.isValid = value;
    }
    this.innerValue = value;
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // THIS MEHTOD CHECK INPUT IS VALID OR NOT
  checkValidity(): boolean {
    return this.isValid;
  }

  public validate(c: FormControl) {
    return ((this.required && this.value) || !this.required) ? null : {
      jsonParseError: {
        valid: true,
      },
    };
  }

  onEventFilter(event: any) {
   this.onToggle();
  }
}
