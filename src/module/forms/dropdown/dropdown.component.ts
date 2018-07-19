/**
 * Created by pratik on 1/12/17.
 */
/*
 Component Name : Amexio Dropdown
 Component Selector :  <amexio-dropdown>
 Component Description : Drop-Down component has been created to render N numbers
  of drop-down items based on data-set configured. Data-set can be configured
   using HTTP call OR Define fix number of dropdown-items. User can configure
    different attributes for enabling filter, multi-select, maximum selection
     in case of multi select.
*/
import {
  Component, ContentChild, ElementRef, EventEmitter, forwardRef,
  HostListener, Input, OnInit, Output, Renderer2, TemplateRef, ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonDataService } from '../../services/data/common.data.service';
const noop = () => {
};
@Component({
  selector: 'amexio-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioDropDownComponent), multi: true,
  }],
})
export class AmexioDropDownComponent implements OnInit, ControlValueAccessor {
  /*
  Properties
  name : field-label
  datatype : string
  version : 4.0 onwards
  default :
  description : The label of this field
  */
  @Input('field-label') fieldlabel: string;
  /*
  Properties
  name : allow-blank
  datatype : string
  version : 4.0 onwards
  default :
  description : Sets if field is required
  */
  @Input('allow-blank') allowblank: boolean;
  /*
  Properties
  name : data
  datatype : any
  version : 4.0 onwards
  default :
  description : Local data for dropdown.
  */
  _data: any;
  componentLoaded: boolean;
  @Input('data')
  set data(value: any) {
    this._data = value;
    if (this.componentLoaded) {
      this.setData(this._data);
    }
  }
  get data(): any {
    return this._data;
  }
  /*
  Properties
  name : data-reader
  datatype : string
  version : 4.0 onwards
  default :
  description : Key in JSON datasource for records
  */
  @Input('data-reader') datareader: string;
  /*
  Properties
  name : http-method
  datatype : string
  version : 4.0 onwards
  default :
  description : Type of HTTP call, POST,GET.
  */
  @Input('http-method') httpmethod: string;
  /*
  Properties
  name : http-url
  datatype : string
  version : 4.0 onwards
  default :
  description : REST url for fetching datasource.
  */
  @Input('http-url') httpurl: string;
  /*
  Properties
  name : display-field
  datatype : string
  version : 4.0 onwards
  default :
  description : Name of key inside response data to display on ui.
  */
  @Input('display-field') displayfield: string;
  /*
  Properties
  name : value-field
  datatype : string
  version : 4.0 onwards
  default :
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
  name : readonly
  datatype : boolean
  version : 4.2.1 onwards
  default : false
  description : true for set dropdown input readonly.
  */
  @Input() readonly: boolean;
  /*
  Properties
  name : multi-select
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : true for select multiple options
  */
  @Input('multi-select') multiselect: boolean;
  @ViewChild('dropdownitems', { read: ElementRef }) public dropdownitems: ElementRef;
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
  datatype : string
  version : 4.0 onwards
  default :
  description : Sets the error message
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
  default :
  description : 	On blur event
  */
  @Output() onBlur: any = new EventEmitter<any>();

  /*
Events
name : input
datatype : any
version : none
default :
description : 	On input event field.
*/
  @Output() input: any = new EventEmitter<any>();

  /*
Events
name : focus
datatype : any
version : none
default :
description : On field focus event
*/
  @Output() focus: any = new EventEmitter<any>();

  /*
Events
name : onSingleSelect
datatype : any
version : none
default :
description : Fire when drop down item selected.
*/
  @Output() onSingleSelect: any = new EventEmitter<any>();

  /*
Events
name : onMultiSelect
datatype : any
version :none
default :
description : Fire when multiple record select in drop down.this event is only applied when multi-select=true

*/
  @Output() onMultiSelect: any = new EventEmitter<any>();

  /*
Events
name : onClick
datatype : any
version :none
default :
description : On record select event.this event is only for normal dropdown.

*/
  @Output() onClick: any = new EventEmitter<any>();

  showToolTip: boolean;

  /*
Properties
name : place-holder
datatype : string
version : 4.0 onwards
default :
description : 	Show place-holder inside dropdown component*/
  @Input('place-holder') placeholder: string;

  /*
Properties
name : disabled
datatype :  boolean
version : 4.0 onwards
default : false
description : If true will not react on any user events and show disable icon over*/
  @Input() disabled: boolean;

  /*
Properties
name : icon-feedback
datatype : boolean
version : 4.0 onwards
default : false
description : */
  @Input('icon-feedback') iconfeedback: boolean;
  /*
Properties
name : font-style
datatype : string
version : 4.0 onwards
default :
description : Set font-style to field
*/
  @Input('font-style') fontstyle: string;
  /*
Properties
name : font-family
datatype : string
version : 4.0 onwards
default :
description : Set font-family to field
*/
  @Input('font-family') fontfamily: string;
  /*
Properties
name : font-size
datatype : string
version : 4.0 onwards
default :
description : Set font-size to field
*/
  @Input('font-size') fontsize: string;
  /*
Properties
name : has-label
datatype : boolean
version : 4.0 onwards
default : false
description : flag to set label
*/
  @Input('has-label') haslabel = true;
  /*
Properties
name : enable-popover
datatype : boolean
version : 4.0 onwards
default :false
description : Set enable / disable popover.
*/
  @Input('enable-popover') enablepopover: boolean;
  @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;
  posixUp: boolean;
  responseData: any;
  previousData: any;
  viewData: any;
  multiselectValues: any[] = [];
  maskloader = true;
  selectedindex = 0;
  scrollposition = 30;
  arr: any[];
  private innerValue: any = '';

  isValid: boolean;
  @Output() isComponentValid: any = new EventEmitter<any>();

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
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
  constructor(public dataService: CommonDataService, public element: ElementRef, public renderer: Renderer2) {
  }
  ngOnInit() {
    this.isValid = this.allowblank;
    this.isComponentValid.emit(this.allowblank);
    if (this.placeholder === '' || this.placeholder === null) {
      this.placeholder = 'Choose Option';
    }
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.setData(this.responseData);
      });
    } else if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }
  setData(httpResponse: any) {
    // Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      this.multiselectValues = [];
      const dr = this.datareader.split('.');
      if (dr) {
        for (const ir of dr) {
          responsedata = responsedata[ir];
        }
      }
    } else {
      responsedata = httpResponse;
    }
    if (responsedata) {
      this.setDataResponse(responsedata);
    }
    if (this.multiselect) {
      this.setDataMultiSelect();
    }
    // Set user selection
    if (this.value != null) {
      this.setUserSelection();
    }
    this.maskloader = false;
  }

  // response Data
  setDataResponse(responsedata: any) {
    this.viewData = responsedata.sort((a: any, b: any) =>
      a[this.displayfield].toLowerCase() !== b[this.displayfield].toLowerCase() ? a[this.displayfield].toLowerCase()
        < b[this.displayfield].toLowerCase() ? -1 : 1 : 0);
    this.filteredOptions = this.viewData;
  }

  // Set Data for Multi Select
  setDataMultiSelect() {
    let preSelectedMultiValues = '';
    const optionsChecked: any[] = [];
    this.arr = optionsChecked;
    this.viewData.forEach((row: any) => {
      if (row.hasOwnProperty('checked') && row.checked) {
        optionsChecked.push(row[this.valuefield]);
        this.multiselectValues.push(row);
        preSelectedMultiValues === '' ? preSelectedMultiValues +=
          row[this.displayfield] : preSelectedMultiValues += ',' + row[this.displayfield];
      }
    });
    this.displayValue = preSelectedMultiValues;
    this.onMultiSelect.emit(this.multiselectValues);
  }

  // Set User Selection
  setUserSelection() {
    const valueKey = this.valuefield;
    const displayKey = this.displayfield;
    const val = this.value;
    this.viewData.forEach((item: any) => {
      if (item[valueKey] === val) {
        this.isComponentValid = true;
        this.displayValue = item[displayKey];
        this.onSingleSelect.emit(item);
      }
    });
  }

  onItemSelect(row: any) {
    if (this.multiselect) {
      const optionsChecked: any[] = [];
      this.multiselectValues = [];
      if (row.hasOwnProperty('checked')) {
        row.checked = !row.checked;
        this.filteredOptions.forEach((eachRow: any) => {
          if (eachRow.checked) {
            optionsChecked.push(eachRow[this.valuefield]);
            this.multiselectValues.push(eachRow);
          }
        });
        this.value = optionsChecked;
        this.onMultiSelect.emit(this.multiselectValues);
      }
    } else {
      this.value = row[this.valuefield];  // Issue here?
      this.displayValue = row[this.displayfield];
      this.multiselect ? this.showToolTip = true : this.showToolTip = false;
      this.onSingleSelect.emit(row);
    }
    this.isValid = true;
    this.isComponentValid.emit(true);
  }

  setMultiSelectData() {
    this.multiselectValues = [];
    if (this.value.length > 0) {
      const modelValue = this.value;
      this.filteredOptions.forEach((test) => {
        modelValue.forEach((mdValue: any) => {
          if (test[this.valuefield] === mdValue) {
            if (test.hasOwnProperty('checked')) {
              test.checked = true;
            }
            this.multiselectValues.push(test);
          }
        });
      });
    }
  }

  navigateKey(event: any) {
  }

  getDisplayText(): string {
    if ((this.value != null || this.value !== '' || this.value !== '') && this.multiselect) {
      this.setMultiSelectData();
      let multiselectDisplayString: any = '';
      this.multiselectValues.forEach((row: any) => {
        multiselectDisplayString === '' ? multiselectDisplayString +=
          row[this.displayfield] : multiselectDisplayString += ',' + row[this.displayfield];
      });
      if (this.multiselectValues.length > 0) {
        return multiselectDisplayString;
      } else {
        return '';
      }
    } else if ((this.value != null || this.value !== '' || this.value !== '') && !this.multiselect) {
      this.getMultiSelectDisplayText();
      return this.displayValue === undefined ? '' : this.displayValue;
    }
  }
  getMultiSelectDisplayText() {
    this.displayValue = '';
    this.filteredOptions.forEach((test) => {
      if (test[this.valuefield] === this.value) {
        this.displayValue = test[this.displayfield];
      }
    });
    return this.displayValue === undefined ? '' : this.displayValue;
  }

  onDropDownClick(event: any) {
    this.onClick.emit(event);
  }
  onChange(event: any) {
    this.value = event;
    this.isValid = true;
    this.isComponentValid.emit(true);
  }
  onInput(input: any) {
    this.input.emit();
    this.isValid = input.valid;
    this.isComponentValid.emit(input.valid);
  }

  onDropDownSearchKeyUp(event: any) {
    if (this.search) {
      const keyword = event.target.value;
      if (keyword != null && keyword !== '' && keyword !== ' ') {
        this.filteredOptions = [];
        const search_Term = keyword.toLowerCase();
        this.viewData.forEach((row: any) => {
          if (row[this.displayfield].toLowerCase().startsWith(search_Term)) {
            this.filteredOptions.push(row);
          }
        });
      }
      if (keyword === '') {
        this.filteredOptions = this.viewData;
      }
    }
    if (event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13) {
      this.navigateUsingKey(event);
    }
  }

  navigateUsingKey(event: any) {
    if (this.selectedindex > this.filteredOptions.length) {
      this.selectedindex = 0;
    }
    if (event.keyCode === 40 || event.keyCode === 38 && this.selectedindex < this.filteredOptions.length) {
      if (!this.showToolTip) {
        this.showToolTip = true;
      }
      let prevselectedindex = 0;
      if (this.selectedindex === 0) {
        this.selectedindex = 1;
      } else {
        prevselectedindex = this.selectedindex;
        this.navigateMethod(event);
      }
      if (this.filteredOptions[this.selectedindex]) {
        this.filteredOptions[this.selectedindex].selected = true;
      }
      if (this.filteredOptions[prevselectedindex]) {
        this.filteredOptions[prevselectedindex].selected = false;
      }
    }
    if (event.keyCode === 13 && this.filteredOptions[this.selectedindex]) {
      this.onItemSelect(this.filteredOptions[this.selectedindex]);
    }
  }

  navigateMethod(event: any) {
    if (event.keyCode === 40) {
      this.selectedindex++;
      if ((this.selectedindex > 5)) {
        this.dropdownitems.nativeElement.scroll(0, this.scrollposition);
        this.scrollposition = this.scrollposition + 30;
      }
    } else if (event.keyCode === 38) {
      this.selectedindex--;
      if (this.scrollposition >= 0 && this.selectedindex > 1) {
        this.dropdownitems.nativeElement.scroll(0, this.scrollposition);
        this.scrollposition = this.scrollposition - 30;
      }
      if (this.selectedindex === 1) {
        this.scrollposition = 30;
      }
      if (this.selectedindex <= 0) {
      }
    }
  }
  // The internal dataviews model
  // get accessor
  get value(): any {
    return this.innerValue;
  }
  // set accessor including call the onchange callback
  set value(v: any) {
    if (v != null) {
      if (v !== this.innerValue) {
        this.innerValue = v;
        this.onChangeCallback(v);
      }
    }
  }
  // Set touched on blur
  onblur(event: any) {
    if (event.target && event.target.value && this.filteredOptions && this.filteredOptions.length === 1) {
      const fvalue = event.target.value;
      const row = this.filteredOptions[0];
      const rvalue = row[this.displayfield];
      if (fvalue && rvalue && (fvalue.toLowerCase() === rvalue.toLowerCase())) {
        this.onItemSelect(row);
      }
    }
    this.onTouchedCallback();
    this.onBlur.emit();
  }

  // Set on blur method
  onFocus(elem: any) {
    this.showToolTip = true;
    this.posixUp = this.getListPosition(elem);
    this.focus.emit();
  }

  getListPosition(elementRef: any): boolean {
    const dropdownHeight = 325; // must be same in dropdown.scss
    if (window.screen.height - (elementRef.getBoundingClientRect().bottom) < dropdownHeight) {
      return true;
    } else {
      return false;
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (!this.allowblank) {
      if (value != null) {
        if (value !== this.innerValue) {
          this.writeValueData(value);
          this.innerValue = value;
        }
      } else {
        this.value = '';
        this.isComponentValid = false;
      }
    }
  }

  writeValueData(value: any) {
    if (this.viewData && this.viewData.length > 0) {
      this.viewData.forEach((item: any) => {
        if (item[this.valuefield] === value) {
          this.isComponentValid = true;
        }
      });
    }
  }
  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  onIconClick() {
    if (!this.disabled) {
      this.showToolTip = !this.showToolTip;
    }
  }
    // THIS MEHTOD CHECK INPUT IS VALID OR NOT
    checkValidity(): boolean {
      return this.isValid;
    }

}
