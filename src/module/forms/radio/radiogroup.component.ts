/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by  Pratik on 27/11/17.
*/

import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';
import { CommonDataService } from '../../services/data/common.data.service';
import { ValueAccessorBase } from './../../base/value-accessor';
import { AmexioFormValidator } from './../form-validator/amexio.form.validator.component';

import { of } from 'rxjs';

const noop = () => {
};

@Component({
  selector: 'amexio-radio-group',
  templateUrl: './radiogroup.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioRadioGroupComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: AmexioRadioGroupComponent, multi: true,
  }],
})

export class AmexioRadioGroupComponent extends ValueAccessorBase<string> implements OnInit, Validators {

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
   name :name
   datatype : string
   version : 4.0 onwards
   default : false
   description :
   */
  @Input() name: string;

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
   name : data-reader
   datatype : string
   version : 4.0 onwards
   default :
   description : 	Key in JSON datasource for records
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
   description : 	REST url for fetching datasource.
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
   name : default-value
   datatype : string
   version : 4.0 onwards
   default :
   description : Default Value to be checked
   */
  @Input('default-value') defaultSelectedValue = '';
  /*
   Properties
   name : horizontal
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : Set true for horizontal checkbox
   */
  @Input() horizontal: boolean;
  /*
   Properties
   name : data
   datatype : any
   version : 4.0 onwards
   default :
   description : 	Local data for radio group.
   */
  @Input() data: any[] = [];
  /*
   Properties
   name : disabled
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : true to disable the field.
   */
  @Input() disabled: boolean;
  /*
   Events
   name : onSelection
   datatype : any
   version : 4.0 onwards
   default :
   description : Fires selection event
   */
  @Output() onSelection: any = new EventEmitter<any>();

  @Output() onSelect: any = new EventEmitter<any>();

  isValid: boolean;

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  // private onTouchedCallback: () => void = noop;
  // private onChangeCallback: (_: any) => void = noop;

  @Output() isComponentValid: any = new EventEmitter<any>();

  viewData: any;
  componentId: any;
  listCopy: any;
  tabFocus = false;

  // The internal dataviews model
  // private innerValue: any = '';

  constructor(public amxHttp: CommonDataService, private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.componentId = this.createCompId('radiogroup', this.name);

    this.name = this.generateName(this.name, this.fieldlabel, 'radiogroup');
    if (this.defaultSelectedValue) {
      this.value = this.defaultSelectedValue;
    }
    this.isValid = this.allowblank;
    this.isComponentValid.emit(this.allowblank);
    if (this.httpmethod && this.httpurl) {
      this.amxHttp.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.data = this.getResponseData(response);
      });
    } else if (this.data != null) {
      this.data = this.getResponseData(this.data);
    }
  }

  checkDefaultValidation(viewData: any) {
    viewData.forEach((opt: any) => {
      opt['tabindex'] = '-1';
      opt['radioId'] = 'radio' + '_' + opt[this.valuefield] + '_' + this.getRandomString();
      if (opt[this.valuefield] === this.innerValue || (opt.hasOwnProperty('selected') && opt.selected)) {
        this.isValid = true;
        opt['selected'] = true;
        opt['tabindex'] = '0';
        this.isComponentValid.emit(true);
        return;
      } else {
        opt['selected'] = false;
        const tempArray: any = [];
        viewData.forEach((option: any) => {
          if (option.selected === false) {
            tempArray.push('0');
            if (tempArray.length === viewData.length) {
              viewData[0].tabindex = '0';
            }
          }
        });
      }
    });
  }

  checkSelectedFlag(viewData: any) {
    viewData.forEach((opt: any) => {
      if (this.innerValue === '' && (opt.hasOwnProperty('selected') && opt.selected)) {
        this.value = opt[this.valuefield];
        opt.tabindex = '0';
        return;
      }
    });
  }

  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      if (dr != null) {
        for (const ir of dr) {
          responsedata = responsedata[ir];
        }
      }
    } else {
      responsedata = httpResponse;
    }
    this.checkSelectedFlag(responsedata);

    if (!this.allowblank) {
      this.checkDefaultValidation(responsedata);
    }

    return responsedata;
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.checkDefaultValidation(this.data);
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

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.tabFocus = false;
    this.onTouchedCallback();
  }
  onFocus() {
    this.tabFocus = true;
  }

  onClick(row: any, event: any) {
    for (const r of this.data) {
      if (r.selected) {
        r.selected = false;
      }
    }
    for (const r of this.data) {
      if (r === row) {
        r.selected = true;
        this.isValid = true;
        this.value = row[this.valuefield];
        this.listCopy = Object.assign([], row);
        delete this.listCopy.tabindex;
        delete this.listCopy.radioId;
        this.onSelection.emit(this.listCopy);
        delete row.tabindex;
        this.isComponentValid.emit(true);
        this.onSelection.emit(row);
        const obj = {};
        obj['row'] = row;
        obj['event'] = event;
        this.onSelect.emit(obj);
      } else {
        r.selected = false;
      }
    }
  }
  // THIS MEHTOD CHECK INPUT IS VALID OR NOT
  checkValidity(): boolean {
    return this.isValid;
  }
  public validate(c: FormControl) {
    return ((!this.allowblank && this.value) || this.allowblank) ? null : {
      jsonParseError: {
        valid: true,
      },
    };
  }
}
