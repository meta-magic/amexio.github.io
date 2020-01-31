import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit, ChangeDetectorRef, Component, ContentChild,
  ElementRef, EventEmitter, forwardRef, Input,
  OnInit, Output, Renderer2, TemplateRef, ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';

import { EventBaseComponent } from '../../../base/event.base.component';

import { CommonDataService } from '../../../arc/amexio.arc.module';

import { DisplayFieldService } from '../../../base/amexio.common.module';

@Component({
  selector: 'multi-child-dropdown',
  templateUrl: 'mutli-child-dropdown.component.html',
})

export class MultiChildDropdownComponent extends EventBaseComponent<any> implements OnInit, ControlValueAccessor, Validators {

  @Input('data') filteredOptions: any;

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
  @Input('child-array-key') childArrayKey = 'childrens';

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

  @Input('group') group: boolean;
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
  // @Input('display-field') displayfield: string;
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
  @Input('display-label') displayfield: any;

  @ViewChild('dropdownitems', { read: ElementRef }) public dropdownitems: ElementRef;

  displayValue = '';

  // filteredOptions: any[] = [];

  selectAllFlag = false;
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
  @Output() onRecordSelect: any = new EventEmitter<any>();

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
  @Output() onChildRecordSelect: any = new EventEmitter<any>();

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

  @Input('enable-sort') enablesort = false;

  @Input('sort') sort = '';

  @Input('enable-checkbox') enablecheckbox = false;

  helpInfoMsg: string;
  _errormsg: string;

  get errormsg(): string {
    return this._errormsg;
  }

  @Input('error-msg')
  set errormsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;
  posixUp: boolean;
  status = false;
  isValid: boolean;
  selectedindex = -1;
  responseData: any;
  previousData: any;
  viewData: any;
  componentId: string;
  multiselectValues: any[] = [];
  maskloader = true;
  activedescendant = 'aria-activedescendant';
  key = 'index';
  // The internal dataviews model

  @Output() sendDataToParent: any = new EventEmitter<any>();

  @Output() isComponentValid: any = new EventEmitter<any>();
  @Input('name') name: string;
  constructor(
    public dataService: CommonDataService, private displayFieldService: DisplayFieldService, public element: ElementRef,
    public renderer: Renderer2, _cd: ChangeDetectorRef,
  ) {
    super(renderer, element, _cd);

  }
  ngOnInit() {
    this.name = this.generateName(this.name, this.fieldlabel, 'dropdowninput');
    this.componentId = this.createCompId('dropdown', this.name);
    this.isValid = this.allowblank;
    this.isComponentValid.emit(this.allowblank);
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response: any) => {
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

    this.maskloader = false;
  }
  setResponseData(responsedata: any) {
    if (responsedata && responsedata.length > 0) {
      this.sendDataToParent.emit(responsedata);
    }
    if (responsedata) {
      if (this.enablesort === true && (this.sort === '' || this.sort.toLowerCase() === 'asc')) {
        this.sortDataAscending(responsedata);

      } else if (this.enablesort === true && this.sort.toLowerCase() === 'desc') {
        this.sortDataDescending(responsedata);

      } else if (this.enablesort === false) {
        this.viewData = responsedata;
        this.filteredOptions = this.viewData;
        this.generateIndex(this.filteredOptions);
        this.setHover();
      }
    }
  }

  setHover() {
    this.filteredOptions.forEach((element: any) => {
      if (element.hasOwnProperty('childrens') && element.childrens.length > 0) {
        element['flag'] = false;
        element.childrens.forEach((element1: any) => {
          element1['childflag'] = true;
        });
      } else {
        element['flag'] = true;
      }
    });
  }

  sortDataAscending(data: any) {
    this.viewData = data.sort((a: any, b: any) => this.displayFieldService.findValue(this.displayfield, a).toLowerCase()
      !== this.displayFieldService.findValue(this.displayfield, b).toLowerCase() ?
      this.displayFieldService.findValue(this.displayfield, a).toLowerCase() <
        this.displayFieldService.findValue(this.displayfield, b).toLowerCase() ? -1 : 1 : 0);
    this.filteredOptions = this.viewData;
    this.generateIndex(this.filteredOptions);

  }
  sortDataDescending(data: any) {
    this.viewData = data.sort((a: any, b: any) => this.displayFieldService.findValue(this.displayfield, a).toLowerCase()
      !== this.displayFieldService.findValue(this.displayfield, b).toLowerCase() ?
      this.displayFieldService.findValue(this.displayfield, a).toLowerCase() >
        this.displayFieldService.findValue(this.displayfield, b).toLowerCase() ? -1 : 1 : 0);
    this.filteredOptions = this.viewData;
    this.generateIndex(this.filteredOptions);
  }

  generateIndex(data: any) {
    data.forEach((element: any, index: number) => {
      element['index'] = this.componentId + 'listitem' + index;
    });
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value != null && this.viewData && this.viewData.length > 0) {
      this.writeChangedValue(value);
      if (this.value && this.multiselect) {
        this.bindMultiselectModel();
      }
    } else {
      this.innerValue = '';
      if (this.allowblank) {
        this.isValid = true;
      }
    }
  }
  bindMultiselectModel() {
    if (this.value && this.multiselect && this.viewData.length > 0) {
      this.bindMultiSelectModelData(this.value);
    }
  }
  bindMultiSelectModelData(valueArray: any[]) {
    let preSelectedValues = '';
    this.viewData.forEach((row: any) => {
      if (valueArray.length > 0) {
        valueArray.forEach((valueData: any) => {
          if (row[this.valuefield] === valueData) {
            row['checked'] = true;
            preSelectedValues === '' ? preSelectedValues +=
              this.displayFieldService.findValue(this.displayfield, row) : preSelectedValues += ', ' +
              this.displayFieldService.findValue(this.displayfield, row);
          }
        });
      }
    });
    this.displayValue = preSelectedValues;
  }

  writeChangedValue(value: any) {

    if ((value !== this.innerValue) && this.viewData && this.viewData.length > 0) {
      this.viewData.forEach((item: any) => {
        if (item[this.valuefield] === value) {
          this.isValid = true;
          this.displayValue = this.displayFieldService.findValue(this.displayfield, item);
          this.status = true;
          return;
        } else if (item.hasOwnProperty('childrens') && item.childrens.length > 0) {
          item.childrens.forEach((data: any) => {
            if (data[this.valuefield] === value) {
              this.isValid = true;
              this.displayValue = this.displayFieldService.findValue(this.displayfield, data);
              this.status = true;
              return;
            }
          });
        }
      });
    }
    this.fromWriteChangedValue(value);
  }

  fromWriteChangedValue(value: any) {
    if (!this.status) {
      this.displayValue = '';
    }
    this.value = value;
  }
  onItemSelect(selectedItem: any) {
    event.preventDefault();
    event.stopPropagation();
    return this.onChildRecordSelect.emit(selectedItem);
  }
}
