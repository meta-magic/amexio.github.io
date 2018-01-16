/**
 * Created by ketangote on 11/21/17.
 */


import {Component, DoCheck, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonDataService} from "../../services/data/common.data.service";

const noop = () => {
};

export const CUSTOM_TYPEAHEAD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmexioTypeAheadComponent),
  multi: true
};

@Component({
  selector : 'amexio-typeahead',
  templateUrl : './typeahead.component.html',
  styleUrls : ['./typeahead.component.scss'],
  providers : [CUSTOM_TYPEAHEAD_CONTROL_VALUE_ACCESSOR]
})
export class AmexioTypeAheadComponent implements OnInit, ControlValueAccessor,DoCheck{

  @Input()    fieldLabel: string;

  @Input()    allowBlank: string;

  @Input()    data : any;

  @Input()    dataReader : string;

  @Input()    httpMethod : string;

  @Input()    httpUrl : string;

  @Input()    displayField : string;

  @Input()    valueField : string;

  @Output()   onBlur : any = new EventEmitter<any>();

  @Output()   input : any = new EventEmitter<any>();

  @Output()   focus : any = new EventEmitter<any>();

  @Output()   change : any = new EventEmitter<any>();


  displayValue : any;

  helpInfoMsg: string;

  _errorMsg : string;

  get errorMsg(): string {
    return this._errorMsg;
  }

  @Input('errorMsg')
  set errorMsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  showToolTip : boolean;

  @Input()   placeholder: string;

  @Input()   disabled: boolean;

  @Input()   iconFeedBack: boolean;

  @Input()   fontStyle: string;

  @Input()   fontFamily: string;

  @Input()   fontSize: string;

  @Input()   hasLabel: boolean = true;

  @Input()   enablePopOver : boolean;

  responseData : any;

  previousData : any;

  viewData : any;

  filteredResult : any;

  @Input()  key: any;

  @Input()  triggerChar: number;

  constructor(public dataService : CommonDataService){

  }

  ngOnInit() {
    if(this.placeholder == '' || this.placeholder == null)
      this.placeholder = 'Choose Option';

    if(!this.triggerChar){
      this.triggerChar = 1;
    }

    if(this.httpMethod && this.httpUrl){
      this.dataService.fetchData(this.httpUrl,this.httpMethod).subscribe(
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
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }


  onKeyUp(event : any){
    this.filteredResult = [];
    this.showToolTip = false;
    let keyword : any = event.target.value;
    if(keyword != null && keyword != ' ' && keyword.length >= this.triggerChar){
      let search_term  = keyword.toLowerCase();
      this.viewData.forEach((item: any) => {
        if(item != null){
          if(item[this.key].toLowerCase().startsWith(search_term) ){
            this.filteredResult.push( item );
          }
        }
      });
      if(this.filteredResult.length > 0)
        this.showToolTip = true;
      else{
        this.showToolTip = false;
      }
    }

  }

  onChange(event : any){
    this.value = event;
    this.change.emit(this.value);
  }


  setData(httpResponse : any){
    //Check if key is added?
    let responsedata = httpResponse;
    if(this.dataReader!= null){
      let dr = this.dataReader.split(".");
      for(let ir = 0 ; ir<dr.length; ir++){
        responsedata = responsedata[dr[ir]];
      }
    }
    else{
      responsedata = httpResponse;
    }

    this.viewData = responsedata;
  }

  ngDoCheck(){
    if(JSON.stringify(this.previousData) != JSON.stringify(this.data)){
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  onItemSelect(row : any){
    this.value = row[this.valueField];
    this.displayValue = row[this.displayField];
    this.showToolTip = false;
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
  onblur() {
    this.onTouchedCallback();
    this.onBlur.emit(this.value);
  }

  onFocus(){
    this.showToolTip = true;
    this.focus.emit(this.value);
  }
  onInput(){
    this.input.emit(this.value);
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
