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
import {
    AfterViewInit, Component, DoCheck, EventEmitter, forwardRef, Input, OnInit, Output,
    ViewChild
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormInputBase} from '../baseclass/form.base.class';
import {CommonHttpService} from '../common.http.service';

declare var $;

const noop = () => {
};

export const CUSTOM_TAG_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TagInputComponent),
  multi: true
}; // TODO Support ngModel

export const BASE_IMPL_TAG_INPUT : any = {
  provide : FormInputBase,
  useExisting: forwardRef(() => TagInputComponent)
};



@Component({
  selector: 'amexio-tag-input',
  template : `
      <div class="form-group amexio-tagsinput-dropdown">
          <ng-container *ngIf="fieldLabel">
              <label [attr.for]="elementId">{{fieldLabel}}</label>
          </ng-container>
          <div data-toggle="dropdown" [ngClass]="{'show': showDropDown}">
              <div class="amexio-tagsinput" [ngStyle]="{width:width}">
                  <span *ngFor="let item of selectedValues" style="padding-right: 2px;" class="badge badge-pill badge-primary">&nbsp; {{item[key]}} &nbsp;&nbsp;<i (click)="removePill(item)" style="cursor: pointer" class="fa fa-times" aria-hidden="true"></i>&nbsp;</span>
                  <input type="text" class="form-control" [attr.aria-expanded]="showDropDown"
                         (input)="onInput()"
                         (focus)="onFocus()"
                         [attr.id]="elementId"  (keyup)="onKeyUp($event)" #inp>
              </div>
              <ul class="amexio-scrollable-options" [ngStyle]="{width:width}">
                  <li *ngFor="let item of filteredResult" (click)="setValue(item,inp)" style="cursor: pointer;">
                      {{item[key]}}
                  </li>
              </ul>
          </div>

          <!--        <span [ngClass]="{'showIcon' : showDropDown,'hideIcon' : !showDropDown}" (click)="clearResult(inp)" class="glyphicon glyphicon-remove-circle searchIconPos"></span>-->

      </div>
  `,
  providers : [CUSTOM_TAG_INPUT_CONTROL_VALUE_ACCESSOR, BASE_IMPL_TAG_INPUT, CommonHttpService],
  styles : [
      `
          .amexio-tagsinput-dropdown ul{
              padding-left: 10px;
              overflow: auto;
          }
          .amexio-tagsinput {
              background-color: #fff;
              border: 1px solid #ccc;
              box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
              display: inline-block;
              padding: 4px 6px;
              color: #555;
              vertical-align: middle;
              border-radius: 4px;
              max-width: 100%;
              line-height: 22px;
              cursor: text;
          }
          .amexio-tagsinput input {
              border: none;
              box-shadow: none;
              outline: none;
              background-color: transparent;
              padding: 0 6px;
              margin: 0;
              width: auto;
              max-width: inherit;
          }
          .amexio-tagsinput.form-control input::-moz-placeholder {
              color: #777;
              opacity: 1;
          }
          .amexio-tagsinput.form-control input:-ms-input-placeholder {
              color: #777;
          }
          .amexio-tagsinput.form-control input::-webkit-input-placeholder {
              color: #777;
          }
          .amexio-tagsinput input:focus {
              border: none;
              box-shadow: none;
          }
          .amexio-tagsinput .tag {
              margin-right: 2px;
              color: white;
          }


          .amexio-scrollable-options {
              height: auto;
              max-height: 200px;
              overflow-x: hidden;
              list-style: none;
          }
          /**
       A Style Sheet for all form inputs common used classes
       */

          .has-feedback-custom label ~ .form-control-feedback-custom {
              top: 32px;
          }
          .has-feedback-custom label.sr-only ~ .form-control-feedback-custom {
              top: 0;
          }
    `
  ]
})

export class TagInputComponent extends FormInputBase  implements OnInit, AfterViewInit, DoCheck {

  @Input()  httpUrl: string;

  @Input()  httpMethod: string;

  @Input()  dataReader: string;

  @Input()  datalist: any;

  @Input()  key: any;

  @Input() width: any;

  @Input()  triggerChar: number;

  @Output()   onChange  : EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('inp')  inpHandle : any;

    @Output() blur : EventEmitter<any> = new EventEmitter<any>();
    @Output() input : EventEmitter<any> = new EventEmitter<any>();
    @Output() focus : EventEmitter<any> = new EventEmitter<any>();

  data: any;

  responseData: any;

  filteredResult: any[] = [];

  showDropDown:  boolean = false;

  selectedValues : any[] = [];

    previousValue: any;


  constructor(public amxHttp: CommonHttpService) {
    super();
    this.elementId = 'tag-input-' + Math.floor(Math.random()*90000) + 10000;
  }

  ngOnInit() {
    if(!this.width) {
      this.width = '250px';
    }
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
        this.previousValue = JSON.parse(JSON.stringify(this.datalist));
      this.setData(this.datalist);
    }
  }

    ngDoCheck() {
        if (JSON.stringify(this.previousValue) != JSON.stringify(this.datalist)) {
            this.previousValue = JSON.parse(JSON.stringify(this.datalist));
            this.setData(this.datalist);
        }
    }

  ngAfterViewInit(){

  }

    onInput(){
        this.input.emit();
    }

    onFocus(){
        this.focus.emit();
    }

  removePill(item : any){
    let indexToRemove : number = null;
    this.selectedValues.forEach((selectedVal,index)=>{
      if(selectedVal == item)
        indexToRemove = index;
    });
    this.selectedValues.splice(indexToRemove,1);
    this.onChange.emit(this.selectedValues);
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




  setData(data: any){
    let autocompleteData = this.getResponseData(data);
    if(autocompleteData){
      this.data = autocompleteData;
    }
  }

  setValue(value : any, ref : any){
    this.inpHandle.nativeElement.value= '';
    this.selectedValues.push(value);
    this.onChange.emit(this.selectedValues);
    this.showDropDown = false;

  }

  getResponseData(httpResponse : any){
    let responsedata = httpResponse;
    if(this.dataReader != null){
      let dr = this.dataReader.split(".");
      for(let ir = 0 ; ir<dr.length; ir++){
        responsedata = responsedata[dr[ir]];
      }
    }
    else{
      responsedata = httpResponse;
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

