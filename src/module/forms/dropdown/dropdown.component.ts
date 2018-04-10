/**
 * Created by pratik on 1/12/17.
 */

/*
 Component Name : Amexio Dropdown
 Component Selector :  <amexio-dropdown>
 Component Description : Drop-Down component has been created to render N numbers of drop-down items based on data-set configured. Data-set can be configured using HTTP call OR Define fix number of dropdown-items. User can configure different attributes for enabling filter, multi-select, maximum selection in case of multi select.

 
*/
import {
  Component, DoCheck, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, Renderer2, ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonDataService} from "../../services/data/common.data.service";

const noop = () => {
};

export const CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioDropDownComponent), multi: true
};


@Component({
  selector: 'amexio-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class AmexioDropDownComponent implements OnInit, DoCheck, ControlValueAccessor {

   /*
Properties
name : field-label
datatype : string
version : 4.0 onwards
default : none
description : The label of this field
*/
  @Input('field-label') fieldlabel: string;

  /*
Properties
name : allow-blank
datatype : string
version : 4.0 onwards
default : none
description :
*/
  @Input('allow-blank') allowblank: string;

  /*
Properties
name : data
datatype : any
version : 4.0 onwards
default : none
description : Local data for dropdown.
*/
  @Input() data: any;

 /*
Properties
name : data-reader
datatype : string
version : 4.0 onwards
default : none
description : Key in JSON datasource for records
*/
  @Input('data-reader') datareader: string;

/*
Properties
name : http-method
datatype : string
version : 4.0 onwards
default : none
description : Type of HTTP call, POST,GET.
*/
  @Input('http-method') httpmethod: string;

 /*
Properties
name : http-url
datatype : string
version : 4.0 onwards
default : none
description : REST url for fetching datasource.
*/
  @Input('http-url') httpurl: string;

   /*
Properties
name : display-field
datatype : string
version : 4.0 onwards
default : none
description : Name of key inside response data to display on ui.
*/
  @Input('display-field') displayfield: string;


   /*
Properties
name : value-field
datatype : string
version : 4.0 onwards
default : none
description : Name of key inside response data.use to send to backend
*/
  @Input('value-field') valuefield: string;

   /*
Properties
name : search
datatype : boolean
version : 4.0 onwards
default : false
description : true for search box enable
*/
  @Input() search: boolean;

  /*
Properties
name : multi-select
datatype : boolean
version : 4.0 onwards
default : false
description : true for select multiple options
*/
  @Input('multi-select') multiselect: boolean;

  @ViewChild('dropdownitems', {read: ElementRef}) public dropdownitems: ElementRef;

  helpInfoMsg: string;

  displayValue: any;

  _errormsg: string;

  filteredOptions: any[] = [];

  get errormsg(): string {
    return this._errormsg;
  }


/*
Properties
name : error-msg
datatype : none
version : 4.0 onwards
default : none
description :
*/
  @Input('error-msg')
  set errormsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }


/*
Events
name : onBlur
datatype : any
version : 4.0 onwards
default : none
description :
*/
  @Output() onBlur: any = new EventEmitter<any>();

  /*
Events
name : input
datatype : any
version : none
default : none
description : 	On input event field.
*/
  @Output() input: any = new EventEmitter<any>();

  /*
Events
name : focus
datatype : any
version : none
default : none
description :
*/
  @Output() focus: any = new EventEmitter<any>();

  /*
Events
name : onSingleSelect
datatype : any
version : none
default : none
description : Fire when drop down item selected.
*/
  @Output() onSingleSelect: any = new EventEmitter<any>();

  /*
Events
name : onMultiSelect
datatype : any
version :none
default : none
description : Fire when multiple record select in drop down.this event is only applied when multi-select=true

*/
  @Output() onMultiSelect: any = new EventEmitter<any>();

  /*
Events
name : onBlur
datatype : any
version :none
default : none
description : On record select event.this event is only for normal dropdown.

*/
  @Output() onClick: any = new EventEmitter<any>();

  showToolTip: boolean;

   /*
Properties
name : place-holder
datatype : string
version : 4.0 onwards
default : none
description : 	Show place-holder inside dropdown component*/
  @Input('place-holder') placeholder: string;

  /*
Properties
name : disabled
datatype :  boolean
version : 4.0 onwards
default : none
description : If true will not react on any user events and show disable icon over*/
  @Input() disabled: boolean;

  /*
Properties
name : icon-feedback
datatype : boolean
version : 4.0 onwards
default : none
description : */
  @Input('icon-feedback') iconfeedback: boolean;

  @Input('font-style') fontstyle: string;

  @Input('font-family') fontfamily: string;

  @Input('font-size') fontsize: string;

  @Input('has-label') haslabel: boolean = true;

  @Input('enable-popover') enablepopover: boolean;

  posixUp : boolean;


  @HostListener('document:click', ['$event.target']) @HostListener('document: touchstart', ['$event.target'])
  public onElementOutClick(targetElement: HTMLElement) {
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

  responseData: any;

  previousData: any;

  viewData: any;

  multiselectValues: any[] = [];

  maskloader:boolean=true;

  constructor(public dataService: CommonDataService, public element: ElementRef, public renderer: Renderer2) {
  }

  ngOnInit() {
    if (this.placeholder == '' || this.placeholder == null) this.placeholder = 'Choose Option';
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe(response => {
        this.responseData = response;
      }, error => {
      }, () => {
        this.setData(this.responseData);
      });

    } else if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }

  }
  setData(httpResponse: any) {
    //Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      this.multiselectValues = [];
      let dr = this.datareader.split(".");
      if(dr) {
        for (let ir = 0; ir < dr.length; ir++) {
          responsedata = responsedata[dr[ir]];
        }
      }

    } else {
      responsedata = httpResponse;
    }
    if(responsedata) {
      this.viewData = responsedata.sort((a: any, b: any) => a[this.displayfield].toLowerCase() !== b[this.displayfield].toLowerCase() ? a[this.displayfield].toLowerCase() < b[this.displayfield].toLowerCase() ? -1 : 1 : 0);
      this.filteredOptions = this.viewData;
    }
    if (this.multiselect) {
      let preSelectedMultiValues: string = '';
      let optionsChecked: any [] = [];
      this.viewData.forEach((row: any) => {
        if (row.hasOwnProperty('checked') && row.checked) {
          optionsChecked.push(row[this.valuefield]);
          this.multiselectValues.push(row);
          preSelectedMultiValues == '' ? preSelectedMultiValues += row[this.displayfield] : preSelectedMultiValues += ',' + row[this.displayfield];
        }
      });
      //this.value = optionsChecked;
      this.displayValue = preSelectedMultiValues;
      this.onMultiSelect.emit(this.multiselectValues);
    }

    //Set user selection
    if (this.value != null) {
      let valueKey = this.valuefield;
      let displayKey = this.displayfield;
      let val = this.value;

      this.viewData.forEach((item: any) => {
        if (item[valueKey] == val)
        {
          this.displayValue = item[displayKey];
          this.onSingleSelect.emit(item);
        }
      });

    }
    this.maskloader=false;
  }
  ngDoCheck() {
    if (JSON.stringify(this.previousData) != JSON.stringify(this.data)) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }
  onItemSelect(row: any) {
    if (this.multiselect) {
      let optionsChecked: any [] = [];
      this.multiselectValues = [];
      if (row.hasOwnProperty('checked')) {
        row.checked = !row.checked;
        this.filteredOptions.forEach((row: any) => {
          if (row.checked) {
            optionsChecked.push(row[this.valuefield]);
            this.multiselectValues.push(row);
          }
        });
        this.value = optionsChecked;
        this.onMultiSelect.emit(this.multiselectValues);
      }
    } else {
      this.value = row[this.valuefield];  //Issue here?
      this.displayValue = row[this.displayfield];

      this.multiselect ? this.showToolTip = true : this.showToolTip = false;
      this.onSingleSelect.emit(row);
    }
  }
  setMultiSelectData () {
    this.multiselectValues = [];
    if(this.value.length > 0){
      let modelValue = this.value;
      this.filteredOptions.forEach((test)=>{
        modelValue.forEach((mdValue: any)=>{
          if(test[this.valuefield] == mdValue) {
            if(test.hasOwnProperty('checked')) {
              test.checked = true;
            }
            this.multiselectValues.push(test);
          }
        });
      });
    }
  }
  navigateKey(event:any){

  }
  getDisplayText(): string {
    if(this.value != null || this.value != '' || this.value != "") {
      if (this.multiselect) {
        this.setMultiSelectData();
        let multiselectDisplayString: any = '';
        this.multiselectValues.forEach((row: any) => {
          multiselectDisplayString == '' ? multiselectDisplayString += row[this.displayfield] : multiselectDisplayString += ',' + row[this.displayfield];
        });
        if (this.multiselectValues.length > 0) {
          return multiselectDisplayString;
        } else {
         return '';
        }
      } else {
        this.filteredOptions.forEach((test) => {
          if (test[this.valuefield] == this.value) {
            this.displayValue = test[this.displayfield];
          }
        });
        return this.displayValue == undefined ? '' : this.displayValue;
      }
    }
  }
  onDropDownClick(event: any) {
    this.onClick.emit(event);

  }
  onChange(event: any) {
    this.value = event;
  }

  onInput() {
    this.input.emit();
  }

  selectedindex : number=0;
  scrollposition : number = 30;

  onDropDownSearchKeyUp(event: any) {
    if (this.search) {
      let keyword = event.target.value;
      if (keyword != null && keyword != '' && keyword != ' ') {
        this.filteredOptions = [];
        let search_Term = keyword.toLowerCase();
        this.viewData.forEach((row: any) => {
          //row.selected = true;
          if (row[this.displayfield].toLowerCase().startsWith(search_Term)) {
            this.filteredOptions.push(row);
          }
        });
      }
      if (keyword == '') {
        this.filteredOptions = this.viewData;
        //this.selectedindex = 0;
      }
    }
    if(event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13)
    {
      this.navigateUsingKey(event);
    }
  }

  navigateUsingKey(event: any){

    if(this.selectedindex > this.filteredOptions.length){
      this.selectedindex=0;
    }
    if(event.keyCode === 40 || event.keyCode === 38  && this.selectedindex < this.filteredOptions.length){
      if(!this.showToolTip){
        this.showToolTip = true;
      }
      let prevselectedindex = 0;
      if(this.selectedindex === 0){
        this.selectedindex = 1;
      }else{
        prevselectedindex = this.selectedindex;
        if(event.keyCode === 40)
        {
          this.selectedindex++;
          if((this.selectedindex > 5 )){
            this.dropdownitems.nativeElement.scroll(0,this.scrollposition);
            this.scrollposition = this.scrollposition  +30;
          }
        }
        else if(event.keyCode === 38){
          this.selectedindex--;
          console.log(this.scrollposition);
          if(this.scrollposition>=0 && this.selectedindex>1){
            this.dropdownitems.nativeElement.scroll(0,this.scrollposition);
            this.scrollposition = this.scrollposition  -30;
          }
          if(this.selectedindex === 1){
            this.scrollposition = 30;
          }

          if(this.selectedindex <=0){
            //this.selectedindex = 1;
          }
        }
      }

      if(this.filteredOptions[this.selectedindex]){
        this.filteredOptions[this.selectedindex].selected = true;

      }
      if(this.filteredOptions[prevselectedindex]){
        this.filteredOptions[prevselectedindex].selected = false;
      }
    }

    console.log(new Date().getTime()+"--"+this.selectedindex+"--"+this.filteredOptions.length);
    if(event.keyCode === 13 && this.filteredOptions[this.selectedindex]){
      console.log("exist drop down");
      this.onItemSelect(this.filteredOptions[this.selectedindex]);
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
    if(v!=null) {
      if (v !== this.innerValue) {
        this.innerValue = v;
        this.onChangeCallback(v);
      }
    }
  }

  //Set touched on blur
  onblur() {
    this.onTouchedCallback();
    this.onBlur.emit();
  }

  onFocus(elem : any) {
    this.showToolTip = true;
    this.posixUp = this.getListPosition(elem);
    this.focus.emit();
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

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if(value != null) {
      if (value !== this.innerValue) {
        this.innerValue = value;
      }
    } else {
      this.value = '';
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

  onIconClick() {
    if(!this.disabled)
      this.showToolTip = ! this.showToolTip;
  }

}
