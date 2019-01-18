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
*/

import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ValueAccessorBase } from '../../base/value-accessor';
import { CommonDataService } from '../../services/data/common.data.service';

import { of } from 'rxjs';

@Component({
  selector: 'amexio-checkbox-group',
  templateUrl: './checkbox.group.component.html',
  providers: [
  { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioCheckBoxGroupComponent), multi: true },
  { provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioCheckBoxGroupComponent), multi: true },
]})
export class AmexioCheckBoxGroupComponent extends ValueAccessorBase<any>
  implements OnInit, Validators {

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
  name : disabled
  datatype : boolean
  version : 4.0 onwards
  default : false
  description :  If true will not react on any user events and show disable icon over
  */
  @Input() disabled = false;

  viewdata: any;
  _data: any;
  selectedCheckBox: any[];
  @Input('data')
  set data(v: any) {
    this._data = v;
    this.viewdata = of(this.data);
  }

  get data() {
    return this._data;
  }
/*
  Properties
  name : field-label
  datatype : string
  version : 4.0 onwards
  default :
  description : The label of this field
  */
  @Input('field-label') fieldlabel: any;

/*
  Properties
  name : display-field
  datatype : string
  version : 4.0 onwards
  default :
  description : Name of key inside response data to display on ui.
*/
  @Input('display-field') displayfield: any;
  /*
  Properties
  name : value-field
  datatype : string
  version : 4.0 onwards
  default :
  description : Name of key inside response data.use to send to backend
  */
  @Input('value-field') valuefield: any;

    /*
 Properties
 name : required
 datatype : boolean
 version : 4.1.7 onwards
 default : false
 description :  property to set if manditory
 */
  @Input('required') required: false;

  @Input('name') name: string;

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

  @Output() onSelection: any = new EventEmitter<any>();

  private _model: any;

  componentId: string;

  constructor(private httpService: CommonDataService) {
    super();
  }

  ngOnInit() {
    this.componentId = this.createCompId('checkboxgroup', this.name);
    let reponseData: any;
    if (this.httpmethod && this.httpurl) {
      this.httpService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        reponseData = response;
      }, (error) => {
      }, () => {
        this.data = this.getResponseData(reponseData);
      });
    } else if (this.data && this.datareader) {
      this.data = this.getResponseData(this.data);
    }
  }
  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }
    return responsedata;
  }

  contains(value: any): boolean {
    if ( this._model instanceof Array) {
      this._model.forEach((obj) => {
         if (obj[this.displayfield] === value[this.displayfield]) {
          return true;
        }
      });
    }
    return false;
  }

   add(value: any) {
    if (!this.contains(value)) {
      if (this._model instanceof Array) {
        this._model.push(value);
      } else {
        this._model = [value];
      }
      this.onChangeCallback(this._model);
    }
    this.emitCheckboxes(this._model);
  }

   remove(value: any) {
    const index = this._model.indexOf(value);
    if (!this._model || index < 0) {
      return;
    }
    this._model.splice(index, 1);
    this.onChangeCallback(this._model);
    this.emitCheckboxes(this._model);
  }
  // THIS METHOD EMMIT SELECTED CHECKBOXES
  emitCheckboxes(selectedCheckBoxes: any[]) {
    this.selectedCheckBox = [];
    if (selectedCheckBoxes && selectedCheckBoxes.length > 0) {
      selectedCheckBoxes.forEach((obj) => {
        obj.checked = true;
        this.selectedCheckBox.push(obj);
      });
    }
    this.onSelection.emit(this.selectedCheckBox);
  }

  public validate(c: FormControl) {
    return (this.required && (this._model && this._model.length > 0)) || !this.required
      ? null
      : {
          jsonParseError: {
            valid: true,
          },
        };
  }
}
