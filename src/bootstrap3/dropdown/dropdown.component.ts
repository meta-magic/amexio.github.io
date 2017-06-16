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
import {
  Component, OnInit, Input, forwardRef, AfterViewInit, Output, EventEmitter, OnDestroy,
  AfterViewChecked
} from '@angular/core';
import {DropDownService} from "./dropdown.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {FormInputBase} from "../baseclass/form.base.class";

declare var $ : any;

const noop = () => {
};

export const CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropDownComponent),
  multi: true
};

export const BASE_IMPL_DROPDOWN_INPUT : any = {
  provide : FormInputBase,
  useExisting: forwardRef(() => DropDownComponent)
};

@Component({
  selector: 'amexio-dropdown',
  template : `
      <label [attr.for]="elementId">{{fieldLabel}}</label>
      <select class="selectpicker form-control"
              [title]="placeholder"
              (blur)="onBlur()"
              [(ngModel)]="value"
              [attr.id]="elementId"
              [attr.multiple]="multiSelect ? 'multiple' : null"
              [attr.data-live-search]="searchBox ? 'true' : null"
              [attr.data-max-options]="maxMultiSelect"
              [attr.data-actions-box]="multiSelectHelp ? 'true' : null"
              [attr.data-selected-text-format]="multiCountDisplay"
              [attr.data-width]="width"
              (change)="setRowData($event)">
          <option *ngFor="let row of viewData" [attr.value]="row[valueField]">{{row[displayField]}}</option>
      </select>

  `,
  providers : [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR,BASE_IMPL_DROPDOWN_INPUT,DropDownService]
})
export class DropDownComponent extends FormInputBase implements OnInit,AfterViewInit,OnDestroy,AfterViewChecked {

  @Input()    fieldLabel : string;

  @Input()    placeholder : string;

  @Input()    fieldName : string;

  @Input()    allowBlank : string;

  @Input()    errorMsg : string;

  @Input()    emptyText : string;

  @Input()    disabled : boolean;

  @Input()    dataReader : string;

  @Input()    httpMethod : string;

  @Input()    httpUrl : string;

  @Input()    displayField : string;

  @Input()    valueField : string;

  @Input()    data : any;

  @Input()    multiSelect : boolean;

  @Input()    maxMultiSelect : string;

  @Input()    multiSelectHelp : boolean;

  @Input()    searchBox : boolean;

  @Input()    multiCountDisplay : string;

  @Input()    width     : string;

  @Output()   onSingleSelect : any = new EventEmitter<any>();

  @Output()   onMultiSelect : any = new EventEmitter<any>();

  multiSelectValues  : any[] = [];

  elementId : string;

  viewData : any[];

  isValid : boolean;

  responseData : any;

  constructor(private dropDownService : DropDownService) {
    super();
    this.elementId = 'dropdown-' + new Date().getTime() + Math.floor(Math.random()*90000) + 10000;
  }

  ngOnInit() {
    if(this.httpMethod && this.httpUrl){
      this.dropDownService.fetchData(this.httpUrl,this.httpMethod).subscribe(
          response=>{
            this.responseData = response.json();
          },
          error=>{
          },
          ()=>{
            this.setData(this.responseData);
          }
      );

    }else if(this.data){
      this.setData(this.data);
    }
  }

  ngAfterViewInit(){
    $('#'+this.elementId).on('changed.bs.select', (e : any,clickedIndex : any, newValue : any, oldValue : any)=> {
      // Check if multi option is on? then load on array avoiding duplicates
      if(this.multiSelect){
        this.addMultiSelectedData(this.viewData[clickedIndex]);
      }else {
        this.addSingleSelectedData(this.viewData[clickedIndex-1]);
      }

    });
  }

  ngAfterViewChecked(){
    $('#'+this.elementId).selectpicker('refresh'); // TODO : Check Performance??
  }
  ngOnDestroy(){
    $('#'+this.elementId).selectpicker('destroy');
  }

  setRowData(event : any){
  }

  addSingleSelectedData(value : any){
    this.onSingleSelect.emit({data:value});
  }

  addMultiSelectedData(val : string){

    if(this.multiSelectValues.indexOf(val) > -1){
      this.multiSelectValues = this.multiSelectValues.filter(item => item!==val);
    }
    else{
      this.multiSelectValues.push(val);
    }
    this.onMultiSelect.emit({data : this.multiSelectValues})
  }

  setData(httpResponse : any){
    let responsedata = httpResponse;
    let dr = this.dataReader.split(".");
    for(let ir = 0 ; ir<dr.length; ir++){
      responsedata = responsedata[dr[ir]];
    }
    this.viewData = responsedata;
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
    return hasError;
  }

}
