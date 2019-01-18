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
import {
  Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild,
} from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';
import { ValueAccessorBase } from '../../base/value-accessor';

@Component({
  selector: 'amexio-number-input',
  templateUrl: './numberinput.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioNumberInputComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioNumberInputComponent), multi: true,
  }],
})
export class AmexioNumberInputComponent extends ValueAccessorBase<string> implements OnInit, Validators {

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
name : min-value
datatype : number
version : 4.0 onwards
default :
description : Defines the min range limit for number input.
*/
  @Input('min-value') minvalue: any;
  /*
Properties
name : max-value
datatype : number
version : 4.0 onwards
default :
description : Defines the max range limit for number input.
*/
  @Input('max-value') maxvalue: any;

  regEx: RegExp;

  showToolTip: boolean;

  /*
 Properties
 name : min-error-msg
 datatype : string
 version : 4.0 onwards
 default :
 description : Sets the error message for min validation
 */
  @Input('min-error-msg') minerrormsg: string;
  /*
  Properties
  name : max-error-msg
  datatype : string
  version : 4.0 onwards
  default :
  description : Sets the error message for max validation
  */
  @Input('max-error-msg') maxerrormsg: string;
  /*
  Properties
  name : error-msg
  datatype : string
  version : 4.0 onwards
  default :
  description : Sets the error message for validation
  */
  @Input('error-msg') errormsg: string;

  isValid = false;
  /*
Properties
name : place-holder
datatype : string
version : 4.0 onwards
default :
description : 	Show place-holder inside dropdown component
*/
  @Input('place-holder') placeholder: string;
  /*
  Properties
  name : disabled
  datatype : boolean
  version : 4.0 onwards
  default : none
  description : True to disable the field.
  */
  @Input() disabled: boolean;
  /*
  Events
  name : onBlur
  datatype : any
  version : 4.0 onwards
  default :
  description : On blur event
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
 description : On focus event field.
 */
  @Output() focus: any = new EventEmitter<any>();
  /*
 Events
 name : change
 datatype : any
 version : none
 default :
 description : On field value change event
 */
  @Output() change: any = new EventEmitter<any>();

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
default : true
description : Flag to set label
*/
  @Input('has-label') haslabel = true;

  @Input('name') name: string;

  _pattern: string;

  get pattern(): string {
    return this._pattern;
  }
  /*
Properties
name : pattern
datatype : string
version : 4.0 onwards
default :
description : Apply Reg-ex to the field
*/
  @Input('pattern')
  set pattern(value: string) {
    if (value != null) {
      this.regEx = new RegExp(this.pattern);
    }
  }
  /*
Properties
name : enable-popover
datatype : string
version : 4.0 onwards
default :
description : Set enable / disable popover.
*/
  @Input('enable-popover') enablepopover: boolean;

  @ViewChild(NgModel) model: NgModel;
  componentId: any;

  constructor() {
    super();
    this.showToolTip = false;
  }

  ngOnInit() {
    this.componentId = this.createCompId('numberinput', this.name);
    this.name = this.generateName(this.name, this.fieldlabel, 'numberinput');
  }
  // THIS METHOD USED FOR BLUR EVENT.
  onBlurEvent() {
    this.showToolTip = false;
    this.onBlur.emit(this.value);
  }
  // THIS METHOD USED FOR FOCUS EVENT .
  onFocus() {
    this.showToolTip = true;
    this.focus.emit(this.value);
  }
  // THIS METHOD USED FOR  INPUT EVENT .
  onInput() {
    this.isValid = this.isFieldValidate();
    this.input.emit(this.value);
  }
  // THIS METHOD USED FOR CHANGE EVENT  .
  onChangeEv() {
    this.change.emit(this.value);
  }
  // THIS METHOD FOR KEYBORAD KEY HOME PRESS.
  onKeyUpHome(event: any) {
    this.value = this.minvalue;
  }
  // THIS METHOD FOR KEYBORAD KEY END PRESS.
  onKeyUpEnd(event: any) {
    this.value = this.maxvalue;
  }

  isFieldValidate(): boolean {
    if (this.minvalue && !this.maxvalue) {
      return this.innerValue && (this.innerValue >= this.minvalue);
    } else if (!this.minvalue && this.maxvalue) {
      return this.innerValue && (this.innerValue <= this.maxvalue);
    } else if (!this.minvalue && !this.maxvalue && this.innerValue) {
      return true;
    } else {
      return this.innerValue && (this.innerValue >= this.minvalue && this.innerValue <= this.maxvalue);
    }
  }

  public validate(c: FormControl) {
    const isValid: boolean = (!this.allowblank && this.isFieldValidate()) || this.allowblank;
    return isValid ? null : {
      jsonParseError: {
        valid: true,
      },
    };
  }
}
