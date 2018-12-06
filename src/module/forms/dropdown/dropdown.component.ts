/**
 * Created by pratik on 1/12/17.
 */

/*
 Component Name : Amexio Dropdown
 Component Selector :  <amexio-dropdown>
 Component Description : Drop-Down component has been created to render
 N numbers of drop-down items based on data-set configured. Data-set can be
 configured using HTTP call OR Define fix number of dropdown-items. User can configure different attributes
 for enabling filter, multi-select, maximum selection in case of multi select.
*/
import {
  AfterViewInit, ChangeDetectorRef, Component, ContentChild,
  ElementRef, EventEmitter, forwardRef, Input,
  OnInit, Output, Renderer2, TemplateRef, ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';
import { BaseFormValidator } from '../../base/base.validator.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { AmexioFormValidator } from './../form-validator/amexio.form.validator.component';
const noop = () => {
};

@Component({
  selector: 'amexio-dropdown',
  templateUrl: './dropdown.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioDropDownComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioDropDownComponent), multi: true,
  }],
})
export class AmexioDropDownComponent extends BaseFormValidator<any> implements OnInit, ControlValueAccessor, Validators {
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

  displayValue = '';

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
description : Fire when multiple record select in drop down.this event is only
applied when multi-select=true
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
description : Show place-holder inside dropdown component*/
  @Input('place-holder') placeholder = '';
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
  isValid: boolean;
  selectedindex = 0;
  responseData: any;
  previousData: any;
  viewData: any;
  multiselectValues: any[] = [];
  maskloader = true;
  scrollposition = 30;
  // The internal dataviews model

  @Output() isComponentValid: any = new EventEmitter<any>();
  @Input('name') name: string;
  constructor(
    public dataService: CommonDataService, public element: ElementRef, public renderer: Renderer2, _cd: ChangeDetectorRef,
  ) {
    super(renderer, element, _cd);

  }
  ngOnInit() {
    this.name = this.generateName(this.name, this.fieldlabel, 'textinput');
    this.isValid = this.allowblank;
    this.isComponentValid.emit(this.allowblank);
    if (this.placeholder === '') {
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
    this.componentLoaded = true;
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
    this.setResponseData(responsedata);
    this.multiSelection();
    this.setUserSelection();
    this.maskloader = false;
  }
  setResponseData(responsedata: any) {
    if (responsedata) {
      this.viewData = responsedata.sort((a: any, b: any) => a[this.displayfield].toLowerCase()
        !== b[this.displayfield].toLowerCase() ?
        a[this.displayfield].toLowerCase() < b[this.displayfield].toLowerCase() ? -1 : 1 : 0);
      this.filteredOptions = this.viewData;
    }
  }
  multiSelection() {
    if (this.multiselect) {
      let preSelectedMultiValues = '';
      const optionsChecked: any = [];
      this.viewData.forEach((row: any) => {
        if (row.hasOwnProperty('checked')) {
          if (row.checked) {
            optionsChecked.push(row[this.valuefield]);
            this.multiselectValues.push(row);
            preSelectedMultiValues === '' ? preSelectedMultiValues +=
              row[this.displayfield] : preSelectedMultiValues += ',' + row[this.displayfield];
          }
        } else {
          row['checked'] = false;
        }

      });
      this.displayValue = this.setMultiSelect();
      this.onMultiSelect.emit(this.multiselectValues);
    }
  }

  setUserSelection() {
    // Set user selection
    if (this.innerValue != null) {
      const valueKey = this.valuefield;
      const displayKey = this.displayfield;
      const val = this.innerValue;
      if (this.viewData.length > 0) {
        this.viewData.forEach((item: any) => {
          if (item[valueKey] === val) {
            this.isValid = true;
            this.isComponentValid.emit(true);
            this.displayValue = item[displayKey];
            this.onSingleSelect.emit(item);
          }
        });
      }

    }
  }
  onItemSelect(selectedItem: any) {
    if (this.multiselect) {
      const optionsChecked: any[] = [];
      this.multiselectValues = [];
      if (selectedItem.hasOwnProperty('checked')) {
        selectedItem.checked = !selectedItem.checked;
        this.filteredOptions.forEach((row: any) => {
          if (row.checked) {
            optionsChecked.push(row[this.valuefield]);
            this.multiselectValues.push(row);
          }
        });
        this.innerValue = optionsChecked;
        this.displayValue = this.setMultiSelect();
        this.onMultiSelect.emit(this.multiselectValues);
      }
    } else {
      this.value = selectedItem[this.valuefield];  // Issue here?
      this.displayValue = selectedItem[this.displayfield];
      this.multiselect ? this.showToolTip = true : this.showToolTip = false;
      this.onSingleSelect.emit(selectedItem);
    }
    this.isValid = true;
    this.isComponentValid.emit(true);
  }
  setMultiSelectData() {
    this.multiselectValues = [];
    if (this.innerValue && this.innerValue.length > 0) {
      const modelValue = this.innerValue;
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
  getDisplayText() {
    if (this.innerValue != null || this.innerValue !== '') {
      if (this.multiselect) {
        this.displayValue = this.setMultiSelect();
      } else {
        this.displayValue = '';
        this.filteredOptions.forEach((test) => {
          if (test[this.valuefield] === this.innerValue) {
            this.displayValue = test[this.displayfield];
          }
        });
        this.displayValue = this.displayValue === undefined ? '' : this.displayValue;
      }
    }
  }
  setMultiSelect() {
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
  }
  onChange(event: string) {
    this.innerValue = event;
    this.isValid = true;
    this.getDisplayText();
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
    if (event.keyCode === 8) {
      this.innerValue = '';
    }
    if (event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13) {
      this.navigateUsingKey(event);
    }
    this.onBaseFocusEvent({});
  }
  navigateUsingKey(event: any) {
    if (this.selectedindex > this.filteredOptions.length) {
      this.selectedindex = 0;
    }
    if (event.keyCode === 40 || event.keyCode === 38 && this.selectedindex <
      this.filteredOptions.length) {
      this.navigateFilterOptions();
    }
    if (event.keyCode === 13 && this.filteredOptions[this.selectedindex]) {
      this.onItemSelect(this.filteredOptions[this.selectedindex]);
    }
  }
  navigateFilterOptions() {
    if (!this.showToolTip) {
      this.showToolTip = true;
    }
    let prevselectedindex = 0;
    if (this.selectedindex === 0) {
      this.selectedindex = 1;
    } else {
      prevselectedindex = this.selectedindex;
      this.scrollPositionIndex(event);
    }
    if (this.filteredOptions[this.selectedindex]) {
      this.filteredOptions[this.selectedindex].selected = true;
    }
    if (this.filteredOptions[prevselectedindex]) {
      this.filteredOptions[prevselectedindex].selected = false;
    }
  }
  scrollPositionIndex(event: any) {
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
    }
  }
  // get accessor
  get value(): any {
    return this.innerValue;
  }
  // set accessor including call the onchange callback
  set value(v: any) {

    if (v != null && v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }
  // Set touched on blur
  onblur(event: any) {
    if (event.target && event.target.value && this.filteredOptions &&
      this.filteredOptions.length === 1) {
      const fvalue = event.target.value;
      const row = this.filteredOptions[0];
      const rvalue = row[this.displayfield];
      if (fvalue && rvalue && (fvalue.toLowerCase() === rvalue.toLowerCase())) {
        this.onItemSelect(row);
      }
    }
    this.onTouchedCallback();
    this.onBaseBlurEvent(event);
    this.onBlur.emit();
  }
  onFocus(elem: any) {
    this.onBaseFocusEvent(elem);
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
    if (value != null) {
      this.writeChangedValue(value);
    } else {
      this.innerValue = '';
      if (this.allowblank) {
        this.isValid = true;
      }
    }
  }
  writeChangedValue(value: any) {
    if (value !== this.innerValue) {
      let status = false;
      if (this.viewData && this.viewData.length > 0) {
        this.viewData.forEach((item: any) => {
          if (item[this.valuefield] === value) {
            this.isValid = true;
            this.displayValue = item[this.displayfield];
            status = true;
            return;
          }
        });
      }
      if (!status) {
        this.displayValue = '';
      }
      this.value = value;
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
      this.onBaseFocusEvent({});
      this.showToolTip = !this.showToolTip;
    }
  }
  // THIS MEHTOD CHECK INPUT IS VALID OR NOT
  checkValidity(): boolean {
    return this.isValid;
  }
  public validate(c: FormControl) {
    return ((!this.allowblank && (this.value || this.value === 0) ) || this.allowblank) ? null : {
      jsonParseError: {
        valid: true,
      },
    };
  }
}
