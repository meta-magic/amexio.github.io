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

import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';
import { BaseInputEventComponent } from '../../../base/base.inputevent.component';
import { ValueAccessorBaseComponent } from '../../../base/value-accessor';

@Component({
  selector: 'amexio-password-input',
  templateUrl: './passwordinput.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioPasswordComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioPasswordComponent), multi: true,
  }],
})
export class AmexioPasswordComponent extends BaseInputEventComponent implements OnInit, Validators {
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
  name : min-length
  datatype : number
  version : 4.0 onwards
  default :
  description : The smallest positive representable number -that is,
  the positive number closest to zero (without actually being zero).
  The smallest negative representable number is -min-length.
  */
  @Input('min-length') minlength: number;
  /*
  Properties
  name : max-length
  datatype : number
  version : 4.0 onwards
  default :
  description : The smallest positive representable number -that is,
  the positive number closest to zero (without actually being zero).
  The smallest negative representable number is -max-length.
  */
  @Input('max-length') maxlength: number;
  /*
Properties
name : allow-blank
datatype : string
version : 4.0 onwards
default :
description : Sets if field is required
*/
  @Input('allow-blank') allowblank: boolean;
  isValid = false;
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
  /*
  Properties
  name : place-holder
  datatype : string
  version : 4.0 onwards
  default :
  description :	Show place-holder inside dropdown component
  */
  @Input('place-holder') placeholder: string;
  /*
  Properties
  name : disabled
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : True to disable the field.
  */
  @Input() disabled: boolean;
  /*
  Properties
  name : icon-feedback
  datatype : boolean
  version : 4.0 onwards
  default : false
  description :
  */
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
 name : show-password
 datatype : boolean
 version : 5.19 onwards
 default : false
 description : flag to set label
 */
  @Input('show-password') showpassword = false;
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

  /*
  Events
  name : onBlur
  datatype : any
  version : 4.0 onwards
  default :
  description : On blur event
  */
  @ViewChild(NgModel) model: NgModel;
  @Input('name') name: string;
  show = false;
  type = 'password';
  componentId: any;
  constructor() {
    super();
    this.showToolTip = false;
  }
  ngOnInit() {
    this.isValid = this.isFieldValid();
    this.name = this.generateName(this.name, this.fieldlabel, 'passwordinput');
    this.componentId = this.createCompId('passwordinput', this.name);
  }
  public validate(c: FormControl) {
    return this.isFieldValid() ? null : {
      jsonParseError: {
        valid: true,
      },
    };
  }

  onInputPasswordEvent(event: any) {
    super.onInputEvent(event);
  }

  toggleShow() {
    this.show = !this.show;
    if (this.show) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
}
