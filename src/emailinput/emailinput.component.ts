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

import {Input, OnInit, forwardRef, Component, AfterViewInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FormInputBase} from "../baseclass/form.base.class";
declare var $;
const noop = () => {
};

export const CUSTOM_EMAIL_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EmailInputComponent),
    multi: true
};

export const BASE_IMPL_EMAIL_INPUT: any = {
  provide : FormInputBase,
  useExisting: forwardRef(() => EmailInputComponent)
};
declare var $: any;
@Component({
    selector: 'amexio-email-input',
    template : `
      <div [attr.class]="divCss">

        <ng-container *ngIf="hasLabel">
          <label [attr.for]="elementId"
                 [style.font-style]="fontStyle"
                 [style.font-family]="fontFamily"
                 [style.font-size]="fontSize"
                 class="control-label">
            {{fieldLabel}}
          </label>
        </ng-container>

        <input type="email"
               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
               (blur)="onBlur()"
               [(ngModel)]="value"
               [attr.fieldName] = "fieldName"
               [attr.id]="elementId"
               [attr.placeholder]="placeholder"
               [attr.maxLength]="maxLength"
               [attr.minLength]="minLength"
               [attr.disabled] = "disabled ? true: null"
               [required]="allowBlank ? true: null"
               [attr.data-error]="errorMsg"
               [attr.aria-describedby]="spanId"
               autocomplete="off"
               class="form-control"
               [attr.data-toggle]="popoverField" title="Info" [attr.data-placement]="popoverPlacement"  data-trigger="focus"  data-html="true"  [attr.data-content]="helpInfoMsg">

        <ng-container *ngIf="iconFeedBack">
        <span class="form-control-feedback-custom">
          <i [attr.class]="iconClassName"></i>
        </span>
        </ng-container>

        <ng-container *ngIf="!iconFeedBack">
          <i [class]="fieldglyphIcon"></i>
        </ng-container>

      </div>


    `,
    providers : [CUSTOM_EMAIL_INPUT_CONTROL_VALUE_ACCESSOR, BASE_IMPL_EMAIL_INPUT],
    styleUrls : [
        `../baseclass/form.inputs.base.css`
    ]
})

export class EmailInputComponent extends FormInputBase implements OnInit, AfterViewInit, ControlValueAccessor {

   constructor() {
      super();
      this.elementId = 'input-email-' + Math.floor(Math.random()*90000) + 10000;
      this.spanId = 'span-msg-' + Math.random();

      if(this.iconFeedBack)
        this.divCss = 'form-group has-feedback';
      else
        this.divCss = 'form-group has-feedback has-feedback-custom';
    }

    ngOnInit() {
        if(this.errorMsg)
            this.helpInfoMsg = this.errorMsg +'<br/>';

        //Regex check
        if(this.pattern !=null){
            this.regEx = new RegExp(this.pattern);
        }
        if(this.popoverPlacement == null){
            this.popoverPlacement = 'bottom';
        }
        if (this.enablePopOver) {
          this.popoverField = 'popover';
        }
    }
    ngAfterViewInit(){
        $('[data-toggle="popover"]').popover();
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
        this.validate();
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


    validate(){
        this.isValid = this.isValidInput();

    }

    isValidInput(){

        let hasError = false;
        let valueLength = 0;

        if(this.value !=null){
          valueLength = this.value.length;
        }
        if((!this.allowBlank && (!this.value || valueLength==0))){
            hasError = true;
        }else if(this.pattern != null && !this.regEx.test(this.value)){
            hasError = true;
        }
        else {
            let cmp: any = document.getElementById(this.elementId);
            hasError = !cmp.validity.valid;
        }

        if(hasError){
            this.setValidClassNames();
        }else{
            this.setInvalidatedClassNames();
        }

        return hasError;
    }

}
