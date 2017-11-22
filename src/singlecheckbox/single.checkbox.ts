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
import {Input, OnInit, forwardRef, Component, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormInputBase} from '../baseclass/form.base.class';

declare var $;

const noop = () => {
};

export const CUSTOM_CHECkBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SingleCheckbox),
  multi: true
};

export const BASE_IMPL_CHECKBOX: any = {
  provide : FormInputBase,
  useExisting: forwardRef(() => SingleCheckbox)
};


@Component({
 selector: 'amexio-single-checkbox',
 template: `
   <label class="custom-control custom-checkbox">
     <input type="checkbox"  
            (blur)="onBlur()"
            (change)="onChange()"
            (input)="onInput()"
            (focus)="onFocus()"
            [(ngModel)]="value"
            [attr.disabled] = "disabled ? true: null"
            [required]="allowBlank ? true: null"
            [attr.data-error]="errorMsg"
            [attr.aria-describedby]="spanId"
            [attr.data-toggle]="popoverField" title="Info" [attr.data-placement]="popoverPlacement"  data-trigger="focus"  data-html="true"  [attr.data-content]="helpInfoMsg"
            class="custom-control-input">
     <span class="custom-control-indicator"></span>
     <span class="custom-control-description">{{fieldLabel}}</span>
   </label>
 `,
  providers : [CUSTOM_CHECkBOX_CONTROL_VALUE_ACCESSOR, BASE_IMPL_CHECKBOX]
})

export class SingleCheckbox extends FormInputBase implements OnInit, ControlValueAccessor{

    @Output() blur : EventEmitter<any> = new EventEmitter<any>();
    @Output() change : EventEmitter<any> = new EventEmitter<any>();
    @Output() input : EventEmitter<any> = new EventEmitter<any>();
    @Output() focus : EventEmitter<any> = new EventEmitter<any>();
 constructor() {
   super();
   this.elementId = 'input-text-' + Math.floor(Math.random()*90000) + 10000;
 }

    ngOnInit() {
        if(this.errorMsg)
            this.helpInfoMsg = this.errorMsg +'<br/>';

        if(this.minErrorMsg)
            this.helpInfoMsg = this.helpInfoMsg + 'Min Length: '+this.minErrorMsg+'<br/>';

        if(this.maxErrorMsg)
            this.helpInfoMsg = this.helpInfoMsg + 'Max Length: '+this.maxErrorMsg;

        if(!this.iconFeedBack)
            this.fieldglyphIcon = 'form-control-feedback glyphicon glyphicon-'+this.fieldIcon;

        if (this.enablePopOver) {
            this.popoverField = 'popover';
        }
        if(this.popoverPlacement == null){
            this.popoverPlacement = 'bottom';
        }

    }
    ngAfterViewInit() {
        $('[data-toggle="popover"]').popover();
    }

    onChange(){
        this.change.emit();
    }

    onInput(){
        this.input.emit();
    }

    onFocus(){
        this.focus.emit();
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
    this.blur.emit();
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
