/*

Component Name : Amexio Textarea Input
Component Selector :  <amexio-textarea-input>
Component Description : TextArea input component has been created with
different configurable attributes for validation
(min/max value, allow blank, custom regex), custom error message, help, custom styles.

*/
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';
import { AmexioFormValidator } from './../form-validator/amexio.form.validator.component';

const noop = () => {
};

@Component({
  selector: 'amexio-textarea-input',
  templateUrl: './textarea.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioTextAreaComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioTextAreaComponent), multi: true,
}],
})
export class AmexioTextAreaComponent extends AmexioFormValidator implements ControlValueAccessor, OnInit, Validators {

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

  componentClass: any;

  helpInfoMsg: string;

  regEx: RegExp;

  showToolTip: boolean;

  _errormsg: string;

  @Output() isComponentValid: any = new EventEmitter<any>();

  @ViewChild('ref', {read: ElementRef}) public inputRef: ElementRef;

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // The internal dataviews model
  private innerValue: any = '';

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

  isValid: boolean;

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

  constructor() {
    super();
    this.showToolTip = false;
  }
  ngOnInit() {
    this.generateName();
    this.isComponentValid.emit(this.allowblank);
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

  // Set touched on blur
  onBlur(input: any) {
    this.onTouchedCallback();
    this.showToolTip = false;
    this.componentClass = this.validateClass(input);
  }

  onFocus() {
    this.showToolTip = true;
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
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

  getCssClass(): any {
    return { 'input-control-error': true };
  }

  validateClass(inp: any): any {
    let classObj;
    if (!this.allowblank) {
      if (this.innerValue === null || this.innerValue === '') {
        this.noInnerValue(inp);
      } else if (inp.touched && !this.allowblank && (this.value === '' || this.value === null)) {
        classObj = this.getCssClass();
        this.isValid = false;
      } else {
        this.otherValidation(inp);
      }
    } else {
      this.isValid = true;
    }
    this.isComponentValid.emit(this.isValid);
    return classObj;
  }

  onInput(input: any) {
    this.componentClass = this.validateClass(input);
  }

  noInnerValue(inp: any) {
    let classObj;
    if (inp.touched) {
      classObj = this.getCssClass();
      this.isValid = false;
    } else {
      this.isValid = false;
    }
    return classObj;
  }

  // Else Block for validations
  otherValidation(inp: any) {
    let classObj;
    classObj = {
      'input-control-error': inp.invalid && (inp.dirty || inp.touched),
      'input-control-success': inp.valid && (inp.dirty || inp.touched),
    };
    if (inp.valid) {
      this.isValid = true;
    }
    return classObj;
  }

  // THIS MEHTOD CHECK INPUT IS VALID OR NOT
  checkValidity(): boolean {
    return (this.inputRef && this.inputRef.nativeElement &&
      this.inputRef.nativeElement.validity && this.inputRef.nativeElement.validity.valid);
  }

  public validate(c: FormControl) {
    return ((!this.allowblank && (this.value && this.value.length > 0)) || this.allowblank) ? null : {
        jsonParseError: {
            valid: true,
        },
    };
}
 // THIS METHOD GENERATE RANDOM STRING
 generateName() {
  if (!this.name && this.fieldlabel ) {
    this.name = this.fieldlabel.replace(/\s/g, '');
  } else if ( !this.name && !this.fieldlabel) {
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
