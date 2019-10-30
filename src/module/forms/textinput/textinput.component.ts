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

import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';
import {BaseInputEventComponent} from '../../base/base.inputevent.component';
import { ValueAccessorBaseComponent } from '../../base/value-accessor';
@Component({
  selector: 'amexio-text-input',
  templateUrl: './textinput.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioTextInputComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioTextInputComponent), multi: true,
  }],
  encapsulation: ViewEncapsulation.None,
})

export class AmexioTextInputComponent extends BaseInputEventComponent  implements OnInit, Validators {

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
description : Minimum length required for textfield
*/
  @Input('min-length') minlength: number;
  /*
Properties
name : mac-length
datatype : number
version : 4.0 onwards
default :
description : Maximum length required for textfield
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

  regEx: RegExp;
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
description : Show place-holder inside dropdown component
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
 name : readonly
 datatype : boolean
 version : 5.21 onwards
 default : false
 description : True to readonly the field.
 */
@Input() readonly: boolean;
  /*
Properties
name : icon-feedback
datatype : boolean
version : 4.0 onwards
default :false
description :
*/
  @Input('icon-feedback') iconfeedback = false;
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
description : Flag to set label
*/
  @Input('has-label') haslabel = true;

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
      this._pattern = value;
      this.regEx = new RegExp(this._pattern);
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

  isValid = false;

  @ViewChild(NgModel) model: NgModel;

  @Input('name') name: string;

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
description :   On input event field.
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
  componentId: any;
  constructor() {
    super();
  }

  ngOnInit() {
    this.name = this.generateName(this.name, this.fieldlabel, 'textinput');
    this.componentId = this.createCompId('textinput', this.name);
  }
  public validate(c: FormControl) {
    return this.isFieldValid() ? null : {
      jsonParseError: {
        valid: true,
      },
    };
  }

  onInputTextEvent(event: any) {
    super.onInputEvent(event);
  }
}
