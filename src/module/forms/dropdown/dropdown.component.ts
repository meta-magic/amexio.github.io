/**
 * Created by pratik on 1/12/17.
 */


import {
  Component, DoCheck, ElementRef, forwardRef, HostListener, Input, OnInit,
  Renderer2
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonDataService} from "../../services/data/common.data.service";

const noop = () => {
};

export const CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmexioDropDownComponent),
  multi: true
};


@Component({
  selector : 'amexio-dropdown',
  templateUrl:'./dropdown.component.html' ,
  styleUrls : ['./dropdown.component.scss'],
  providers : [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class AmexioDropDownComponent implements OnInit, DoCheck,ControlValueAccessor{

  @Input()    fieldLabel: string;

  @Input()    allowBlank: string;

  @Input()    data : any;

  @Input()    dataReader : string;

  @Input()    httpMethod : string;

  @Input()    httpUrl : string;

  @Input()    displayField : string;

  @Input()    valueField : string;

  @Input()    searchBox : boolean;

  @Input()    multiSelect : boolean;

  helpInfoMsg: string;

  displayValue : any;

  _errorMsg : string;

  filteredOptions : any[] = [];

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



  @HostListener('document:click', ['$event.target'])
  @HostListener('document: touchstart', ['$event.target'])
  public onElementOutClick(targetElement : HTMLElement) {
    let parentFound = false;
    while (targetElement != null && !parentFound) {
      if (targetElement === this.element.nativeElement) {
        parentFound = true;
      }
      targetElement = targetElement.parentElement;
    }
    if (!parentFound) {
      this.showToolTip = false;
    }
  }

  responseData : any;

  previousData : any;

  viewData : any;

  multiSelectValues : any[] = [];

  constructor(public dataService : CommonDataService,public element: ElementRef,public renderer: Renderer2){}

  ngOnInit() {
    if(this.placeholder == '' || this.placeholder == null)
      this.placeholder = 'Choose Option';

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


  setData(httpResponse : any){
    //Check if key is added?
    let responsedata = httpResponse;
    if(this.dataReader!= null){
      this.multiSelectValues = [];
      let dr = this.dataReader.split(".");
      for(let ir = 0 ; ir<dr.length; ir++){
        responsedata = responsedata[dr[ir]];
      }
    }
    else{
      responsedata = httpResponse;
    }


    // this.viewData = responsedata;
    this.viewData = responsedata.sort((a : any, b : any) => a[this.displayField].toLowerCase() !== b[this.displayField].toLowerCase() ? a[this.displayField].toLowerCase() < b[this.displayField].toLowerCase() ? -1 : 1 : 0);
    this.filteredOptions = this.viewData;

    if(this.multiSelect){
      let preSelectedMultiValues : string = '';
      let optionsChecked  : any [] = [];
      this.viewData.forEach( (row : any)=>{
        if(row.hasOwnProperty('checked') && row.checked){
          optionsChecked.push(row[this.valueField]);
          this.multiSelectValues.push(row);
          preSelectedMultiValues == '' ? preSelectedMultiValues += row[this.displayField] : preSelectedMultiValues += ','+row[this.displayField];
        }
      });
      this.value = optionsChecked;
      this.displayValue = preSelectedMultiValues;
    }

    //Set user selection
    if(this.value != null){
      let valueKey = this.valueField;
      let displayKey = this.displayField;
      let val = this.value;

      this.viewData.forEach((item : any)=>{
        if(item[valueKey] == val)
          this.displayValue = item[displayKey];
      })
    }
  }

  ngDoCheck(){
    if(JSON.stringify(this.previousData) != JSON.stringify(this.data)){
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  onItemSelect(row : any){
    if(this.multiSelect){
      let optionsChecked  : any [] = [];
      this.multiSelectValues = [];
      if(row.hasOwnProperty('checked')){
        row.checked = !row.checked;
        this.filteredOptions.forEach( (row : any)=>{
          if(row.checked){
            optionsChecked.push(row[this.valueField]);
            this.multiSelectValues.push(row);
          }
        });
        this.value = optionsChecked;
        // this.onMultiSelect.emit(this.multiSelectValues);
      }
    }
    else {
      this.value = row[this.valueField];  //Issue here?
      this.displayValue = row[this.displayField];

      this.multiSelect ? this.showToolTip= true : this.showToolTip = false;
    }
  }

  getDisplayText(): string{
    if(this.multiSelect){
      let multiSelectDisplayString : any = '';
      this.multiSelectValues.forEach( (row : any)=>{
        multiSelectDisplayString== '' ? multiSelectDisplayString += row[this.displayField] : multiSelectDisplayString += ','+row[this.displayField];
      });
      if(this.multiSelectValues.length > 0)
        return multiSelectDisplayString;
      else
        return 'Choose Options';
    }
    else
      return this.displayValue == undefined ? '' : this.displayValue
  }

  onChange(event : any){
    this.value = event;
  }

  onDropDownSearchKeyUp(event : any){
    let keyword = event.target.value;
    if(keyword != null && keyword != '' && keyword!= ' '){
      this.filteredOptions = [];
      let search_Term = keyword.toLowerCase();
      this.viewData.forEach( (row : any)=>{
        if(row[this.displayField].toLowerCase().startsWith(search_Term)){
          this.filteredOptions.push(row);
        }
      });
    }
    if(keyword == ''){
      this.filteredOptions = this.viewData;
    }
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

  onFocus(){
    this.showToolTip = true;
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

