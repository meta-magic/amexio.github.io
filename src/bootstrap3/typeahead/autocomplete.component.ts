import {AfterViewInit, Component, forwardRef, Input, OnInit} from '@angular/core';
import {AutoCompleteService} from "./autocomplete.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {FormInputBase} from "../baseclass/form.base.class";

declare var $;

const noop = () => {
};

export const CUSTOM_AUTO_COMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutoComplete),
  multi: true
};

export const BASE_IMPL_AUTO_COMPLETE : any = {
  provide : FormInputBase,
  useExisting: forwardRef(() => AutoComplete)
};



@Component({
  selector: 'amexio-typeahead',
  template : `    
    <div class="dropdown-toggle" data-toggle="dropdown" [ngClass]="{'open': showDropDown}">
      <div class="row">
        <label [attr.for]="elementId">{{fieldLabel}}</label>
        <input type="search" class="form-control" [attr.aria-expanded]="showDropDown" 
               [attr.id]="elementId"  (keyup)="onKeyUp($event)"
               (blur)="onBlur()"  [(ngModel)]="value" #inp>
        <span [ngClass]="{'showIcon' : showDropDown,'hideIcon' : !showDropDown}" (click)="clearResult(inp)" class="glyphicon glyphicon-remove-circle searchIconPos"></span>
      </div>
     
      <ul class="dropdown-menu" style="width: 100%">
        <li *ngFor="let item of filteredResult" (click)="setValue(item[key],inp)" style="cursor: pointer;">
            {{item[key]}}
        </li>
      </ul>
    </div>
  `,
  styles : [`
      .searchIconPos{
        position: absolute;
        right: 5px;
        top: 15px;
        bottom: 0;
        height: 14px;
        margin: auto;
        font-size: 14px;
        cursor: pointer;
        color: #ccc;
      }
    .showIcon{
      visibility: visible;
    }
    .hideIcon{
      visibility: hidden;
    }
  `],
  providers : [CUSTOM_AUTO_COMPLETE_CONTROL_VALUE_ACCESSOR,BASE_IMPL_AUTO_COMPLETE]
})

export class AutoComplete extends FormInputBase  implements OnInit,AfterViewInit {

  @Input()
  httpUrl : string;

  @Input()
  httpMethod : string;

  @Input()
  dataReader : string;

  @Input()
  datalist : any;

  @Input()
  fieldLabel : any;

  @Input()
  key : any;

  @Input()
  triggerChar : number;

  data : any;

  responseData : any;

  filteredResult : any[] = [];

  elementId  : string;

  showDropDown :  boolean = false;



  constructor(public autoCompleteService : AutoCompleteService) {
    super();
    this.elementId = 'auto-complete-' + new Date().getTime() + Math.random();
  }

  ngOnInit() {
    if(this.triggerChar == null){
      this.triggerChar = 3;
    }
  }

  ngAfterViewInit(){
    if(this.httpMethod && this.httpUrl){
      this.autoCompleteService.fetchData(this.httpUrl,this.httpMethod).subscribe(
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

  onKeyUp(event : any){
    this.filteredResult = [];
    this.showDropDown = false;
    let keyword : any = event.target.value;
    if(keyword != null && keyword != ' ' && keyword.length >= this.triggerChar){

      let search_term  = keyword.toLowerCase();
      this.data.forEach(item => {
        if(item != null){
          if(item[this.key].toLowerCase().indexOf(search_term) !== -1 ){
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
