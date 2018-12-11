/*

Component Name : Amexio Textarea Input
Component Selector :  <amexio-textarea-input>
Component Description : TextArea input component has been created with
different configurable attributes for validation
(min/max value, allow blank, custom regex), custom error message, help, custom styles.

*/
import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';
import { ValueAccessorBase } from '../../base/value-accessor';

@Component({
  selector: 'amexio-textarea-input',
  templateUrl: './textarea.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioTextAreaComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioTextAreaComponent), multi: true,
  }],
})
export class AmexioTextAreaComponent extends ValueAccessorBase<string> implements OnInit, Validators {

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
name : rows
datatype : number
version : 4.0 onwards
default : none
description : rows to have in textarea
*/
  @Input() rows: number;
  /*
Properties
name : rows
datatype : number
version : 4.0 onwards
default : none
description : rows to have in textarea
*/
  @Input() columns: number;
  /*
Properties
name : allow-blank
datatype : string
version : 4.0 onwards
default : none
description : Sets if field is required
*/
  @Input('allow-blank') allowblank: boolean;

  helpInfoMsg: string;

  regEx: RegExp;

  showToolTip: boolean;

  _errormsg: string;

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

  get errormsg(): string {
    return this._errormsg;
  }
  /*
  Properties
  name : error-msg
  datatype : none
  version : 4.0 onwards
  default : none
  description : sets the error message
  */
  @Input('error-msg')
  set errormsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  _minerrormsg: string;

  get minerrormsg(): string {
    return this._minerrormsg;
  }
  /*
  Properties
  name : min-error-msg
  datatype : string
  version : 4.0 onwards
  default : none
  description : sets the error message for min validation
  */
  @Input('min-error-msg')
  set minerrormsg(value: string) {
    this.helpInfoMsg = this.helpInfoMsg + '<b>Min Length<b/>: ' + value + '<br/>';
  }

  _maxerrormsg: string;

  get maxerrormsg(): string {
    return this._maxerrormsg;
  }
  /*
  Properties
  name : max-error-msg
  datatype : string
  version : 4.0 onwards
  default : none
  description : sets the error message for max validation
  */
  @Input('max-error-msg')
  set maxerrormsg(value: string) {
    this.helpInfoMsg = this.helpInfoMsg + 'Max Length: ' + value;
  }

  /*
Properties
name : place-holder
datatype : string
version : 4.0 onwards
default : none
description :	Show place-holder inside dropdown component
*/
  @Input('place-holder') placeholder: string;
  /*
  Properties
  name : disabled
  datatype : boolean
  version : 4.0 onwards
  default : none
  description : true to disable the field.
  */
  @Input() disabled: boolean;
  /*
Properties
name : icon-feedback
datatype : boolean
version : 4.0 onwards
default : none
description :
*/
  @Input('icon-feedback') iconfeedback: boolean;
  /*
Properties
name : font-style
datatype : string
version : 4.0 onwards
default : none
description : Set font-style to field
*/
  @Input('font-style') fontstyle: string;
  /*
Properties
name : font-family
datatype : string
version : 4.0 onwards
default : none
description : Set font-family to field
*/
  @Input('font-family') fontfamily: string;
  /*
Properties
name : font-size
datatype : string
version : 4.0 onwards
default : none
description : Set font-size to field
*/
  @Input('font-size') fontsize: string;
  /*
Properties
name : has-label
datatype : boolean
version : 4.0 onwards
default : none
description : flag to set label
*/
  @Input('has-label') haslabel = true;

  _pattern: string;

  isValid = false;

  get pattern(): string {
    return this._pattern;
  }
  /*
Properties
name : pattern
datatype : string
version : 4.0 onwards
default : none
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
default : none
description : Set enable / disable popover.
*/
  @Input('enable-popover') enablepopover: boolean;

  @Input('name') name: string;

  @ViewChild(NgModel) model: NgModel;

  constructor() {
    super();
    this.showToolTip = false;
  }
  ngOnInit() {
    this.name = this.generateName(this.name, this.fieldlabel, 'textareainput');
  }

  // Set touched on blur
  onBlurEvent() {
    this.showToolTip = false;
    this.onBlur.emit(this.value);
  }

  onFocusEvent() {
    this.showToolTip = true;
    this.focus.emit(this.value);
  }

  onInputEvent() {
    this.isValid = this.isFieldValid();
    this.input.emit(this.value);
  }

  onChangeEv() {
    this.change.emit(this.value);
  }

  // THIS METHOD IS USED FOR VALIDATION
  isFieldValid(): boolean {
    return (!this.allowblank && (this.value && (this.value.length > 0)) ||
      (this.value && this.value.length > 0)) || this.allowblank;
  }
  public validate(c: FormControl) {
    return this.isFieldValid() ? null : {
      jsonParseError: {
        valid: true,
      },
    };
  }
}
