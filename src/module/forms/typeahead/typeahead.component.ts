/**
 * Created by ketangote on 11/21/17.
 */


import {Component, DoCheck, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonDataService} from "../../services/data/common.data.service";

const noop = () => {
};

export const CUSTOM_TYPEAHEAD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioTypeAheadComponent), multi: true
};

@Component({
  selector: 'amexio-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  providers: [CUSTOM_TYPEAHEAD_CONTROL_VALUE_ACCESSOR]
})
export class AmexioTypeAheadComponent implements OnInit, ControlValueAccessor, DoCheck {

  @Input('field-label') fieldlabel: string;

  @Input('allow-blank') allowblank: string;

  @Input() data: any;

  @Input('data-reader') datareader: string;

  @Input('http-method') httpmethod: string;

  @Input('http-url') httpurl: string;

  @Input('display-field') displayfield: string;

  @Input('value-field') valuefield: string;

  @Output() onBlur: any = new EventEmitter<any>();

  @Output() input: any = new EventEmitter<any>();

  @Output() focus: any = new EventEmitter<any>();

  @Output() change: any = new EventEmitter<any>();

  @Output() onClick: any = new EventEmitter<any>();

  @ViewChild('dpList') dpList : any;

  posixUp : boolean;

  activeindex : number =0;

  currentActive : any;

  displayValue: any;

  helpInfoMsg: string;

  _errormsg: string;

  get errormsg(): string {
    return this._errormsg;
  }

  @Input('error-msg')
  set errormsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  showToolTip: boolean;

  @Input('place-holder') placeholder: string;

  @Input() disabled: boolean;

  @Input('icon-feedback') iconfeedback: boolean;

  @Input('font-style') fontstyle: string;

  @Input('font-family') fontfamily: string;

  @Input('font-size') fontsize: string;

  @Input('has-label') haslabel: boolean = true;

  @Input('enable-popover') enablepopover: boolean;

  responseData: any;

  previousData: any;

  viewData: any;

  filteredResult: any;

  @Input() key: any;

  @Input('trigger-char') triggerchar: number;

  @ViewChild('rootDiv') rootDiv : any;

  constructor(public dataService: CommonDataService) {

  }

  ngOnInit() {
    if (this.placeholder == '' || this.placeholder == null) this.placeholder = 'Choose Option';

    if (!this.triggerchar) {
      this.triggerchar = 1;
    }

    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe(response => {
        this.responseData = response.json();
      }, error => {
      }, () => {
        this.setData(this.responseData);
      });

    } else if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  onclick() {
    this.onClick.emit();
  }


  onKeyUp(event: any) {
    let maxScrollHeight : number = this.dpList.nativeElement.scrollHeight;
    this.filteredResult = [];
    this.showToolTip = false;
    let keyword: any = event.target.value;
    if (keyword != null && keyword != ' ' && keyword.length >= this.triggerchar) {
      let search_term = keyword.toLowerCase();
      this.viewData.forEach((item: any) => {
        if (item != null) {
          if (item[this.key].toLowerCase().startsWith(search_term)) {
            this.filteredResult.push(item);
          }
        }
      });
      if (this.filteredResult.length > 0) this.showToolTip = true; else {
        this.showToolTip = false;
      }
    }else if(event.keyCode){
      if(event.keyCode === 40){
        let currentScroll = this.dpList.nativeElement.scrollTop;
        let scrollByValue = this.activeindex % 5 == 0 ? 120: 0;
        this.showAllData(this.activeindex);
        this.activeindex++;
        if(currentScroll < maxScrollHeight)
          this.dpList.nativeElement.scrollBy(0,scrollByValue);
      }
      if(event.keyCode === 38){
        let scrollByValue = this.activeindex % 5 == 0 ? -120: 0;
        this.activeindex--;
        this.showAllData(this.activeindex);
        this.dpList.nativeElement.scrollBy(0,scrollByValue);
      }else  if(event.keyCode === 13){
        this.showToolTip = false;
        this.onItemSelect(this.currentActive);
      }
    }

  }

  onChange(event: any) {
    this.value = event;
    this.change.emit(this.value);
  }

  showAllData(activerow:number){
    let i = 0 ;
    this.viewData.forEach((item: any) => {
      if (item != null) {

        if(i === activerow){
          item.active = true;
          this.currentActive = item;
        }else{
          item.active = false;
        }
        item.activerow = activerow;
        this.filteredResult.push(item);
      }
      i++;
    });

    if (this.filteredResult.length > 0){
      this.showToolTip = true;
    }

  }


  setData(httpResponse: any) {
    //Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      let dr = this.datareader.split(".");
      for (let ir = 0; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
      }
    } else {
      responsedata = httpResponse;
    }

    this.viewData = responsedata;
  }

  ngDoCheck() {
    if (JSON.stringify(this.previousData) != JSON.stringify(this.data)) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  onItemSelect(row: any) {
    this.value = row[this.valuefield];
    this.displayValue = row[this.displayfield];
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

  onFocus(elem : any) {
    this.showToolTip = true;
    this.posixUp = this.getListPosition(elem);
    this.focus.emit(this.value);
  }

  getListPosition(elementRef : any) :boolean{
    let dropdownHeight : number = 325; //must be same in dropdown.scss
    if(window.screen.height - (elementRef.getBoundingClientRect().bottom) < dropdownHeight){
      return true;
      //  return false;
    }
    else{
      return false;
    }
  }

  onInput() {
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
