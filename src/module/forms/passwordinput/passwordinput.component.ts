/*
 Component Name : Amexio Email Input
 Component Selector :  <amexio-email-input>
 Component Description : Email input field
*/
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';
import { ValueAccessorBase } from '../../base/value-accessor';

const noop = () => {
};

@Component({
  selector: 'amexio-password-input',
  templateUrl: './passwordinput.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioPasswordComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioPasswordComponent), multi: true,
  }],
})
export class AmexioPasswordComponent extends ValueAccessorBase<string> implements OnInit, Validators {
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
  componentClass: any;
  helpInfoMsg: string;
  isValid: boolean;
  regEx: RegExp;
  showToolTip: boolean;
  _errormsg: string;
  get errormsg(): string {
    return this._errormsg;
  }
  /*
  Properties
  name : error-msg
  datatype : none
  version : 4.0 onwards
  default : none
  description : Sets the error message
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
  default :
  description : Sets the error message for min validation
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
  default :
  description : Sets the error message for max validation
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
  @Output() isComponentValid: any = new EventEmitter<any>();
  @ViewChild('ref', { read: ElementRef }) public inputRef: ElementRef;
  @Input('name') name: string;
  constructor() {
    super();
    this.showToolTip = false;
  }

  // Set touched on blur
  onblur(input: any) {
    this.showToolTip = false;
    this.onBlur.emit(this.value);
  }
  onInput(input: any) {
    this.input.emit(this.value);
  }
  onFocus() {
    this.showToolTip = true;
    this.focus.emit(this.value);
  }
  onChangeEv() {
    this.change.emit(this.value);
  }

  ngOnInit() {
    this.generateName();
    this.isComponentValid.emit(this.allowblank);
  }

  isFieldValidate(): boolean {
    return (this.value && (this.value.length >= this.minlength)) ||
      (!this.minlength && this.value && this.value.length > 0);
  }

  public validate(c: FormControl) {
    const isValid: boolean = (!this.allowblank && this.isFieldValidate()) || this.allowblank;
    if (this.inputRef.nativeElement && this.inputRef.nativeElement.selectionStart) {
      this.componentClass = isValid ? 'input-control-success' : 'input-control-error';
    }
    return isValid ? null : {
      jsonParseError: {
        valid: true,
      },
    };
  }
  // THIS METHOD GENERATE RANDOM STRING
  generateName() {
    if (!this.name && this.fieldlabel) {
      this.name = this.fieldlabel.replace(/\s/g, '');
    } else if (!this.name && !this.fieldlabel) {
      this.name = 'textinput-' + this.getRandomString();
    }
  }
  getRandomString(): string {
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    for (let i = 0; i < 6; i++) {
      randomString += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }
    return randomString;
  }
}
