/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author -  Pratik Kelwalkar
 *
 */
import {AfterViewInit, Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormInputBase} from '../baseclass/form.base.class';
import {CommonHttpService} from '../common.http.service';

declare var $;

const noop = () => {
};

export const CUSTOM_AUTO_COMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TypeAheadComponent),
  multi: true
};

export const BASE_IMPL_AUTO_COMPLETE : any = {
  provide : FormInputBase,
  useExisting: forwardRef(() => TypeAheadComponent)
};



@Component({
  selector: 'amexio-typeahead',
  template : `    
    <div class="dropdown" data-toggle="dropdown" [ngClass]="{'show': showDropDown}">
      <div class="row">
        <label [attr.for]="elementId">{{fieldLabel}}</label>
        <input type="search" class="form-control" [attr.aria-expanded]="showDropDown" 
               [attr.id]="elementId"  (keyup)="onKeyUp($event)"
               (blur)="onBlur()"  [(ngModel)]="value" #inp>
<!--        <span [ngClass]="{'showIcon' : showDropDown,'hideIcon' : !showDropDown}" (click)="clearResult(inp)" class="glyphicon glyphicon-remove-circle searchIconPos"></span>-->
      </div>
     
      <ul class="dropdown-menu amexio-scrollable-options" style="width: 100%">
        <li *ngFor="let item of filteredResult" (click)="setValue(item[key],inp)" style="cursor: pointer;">
            {{item[key]}}
        </li>
      </ul>
    </div>
  `,
  providers : [CUSTOM_AUTO_COMPLETE_CONTROL_VALUE_ACCESSOR, BASE_IMPL_AUTO_COMPLETE, CommonHttpService],
  styleUrls : [
      '../baseclass/form.inputs.base.css',
      'autocomplete.component.css'
  ]
})

export class TypeAheadComponent extends FormInputBase  implements OnInit, AfterViewInit {

  @Input()  httpUrl: string;

  @Input()  httpMethod: string;

  @Input()  dataReader: string;

  @Input()  datalist: any;

  @Input()  key: any;

  @Input()  triggerChar: number;

  data: any;

  responseData: any;

  filteredResult: any[] = [];

  showDropDown:  boolean = false;



  constructor(public amxHttp: CommonHttpService) {
    super();
    this.elementId = 'auto-complete-' + Math.floor(Math.random()*90000) + 10000;
  }

  ngOnInit() {
    if(this.triggerChar == null){
      this.triggerChar = 1;
    }
      if(this.httpMethod && this.httpUrl){
          this.amxHttp.fetchData(this.httpUrl,this.httpMethod).subscribe(
              res=>{
                  this.responseData = res.json();
              },
              error=>{

              },
              ()=>{
                  this.setData(this.responseData);
              }
          );
      }
      else if(this.datalist){
          this.setData(this.datalist);
      }
  }

  ngAfterViewInit(){

  }

  onKeyUp(event : any){
    this.filteredResult = [];
    this.showDropDown = false;
    let keyword : any = event.target.value;
    if(keyword != null && keyword != ' ' && keyword.length >= this.triggerChar){

      let search_term  = keyword.toLowerCase();
      this.data.forEach(item => {
        if(item != null){
          if(item[this.key].toLowerCase().startsWith(search_term) ){
            this.filteredResult.push( item );
          }
        }
      });
      if(this.filteredResult.length > 0)
        this.showOptions();
      else{
        this.showDropDown = false;
      }
    }

  }

  showOptions(){
    this.showDropDown = true;
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




  setData(data: any){
    let autocompleteData = this.getResponseData(data);
    if(autocompleteData){
      this.data = autocompleteData;
    }
  }

  setValue(value : any, ref : any){
    this.value = value;
    this.showDropDown = false;
  }

  getResponseData(httpResponse : any){
    let responsedata = httpResponse;
    let dr = this.dataReader.split(".");
    for(let ir = 0 ; ir<dr.length; ir++){
      responsedata = responsedata[dr[ir]];
    }
    return responsedata;
  }

  clearResult(inp : any){
    this.showDropDown = false;
    this.filteredResult = [];
    inp.value = null;
    this.value = null;
  }
}
