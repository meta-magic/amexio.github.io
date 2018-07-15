/*
 Component Name : Amexio Number Input
 Component Selector :  <amexio-number-input>
 Component Description : Number input component has been created
 with different configurable attributes for validation (min/max value,
   allow blank, custom regex), custom error message, help, custom styles
*/
import {Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
const noop = () => {
};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioNumberInputComponent), multi: true,
};
@Component({
  selector: 'amexio-number-input',
  templateUrl: './numberinput.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class AmexioNumberInputComponent implements OnInit, ControlValueAccessor {
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
datatype: string
version : 4.0 onwards
default :
description : Sets if field is required
*/
  @Input('allow-blank') allowblank: boolean;
  /*
Properties
name : min-value
datatype: number
version : 4.0 onwards
default :
description : Defines the min range limit for number input.
*/
  @Input('min-value') minvalue: number;
/*
Properties
name : max-value
datatype : number
version : 4.0 onwards
default :
description : Defines the max range limit for number input.
*/
  @Input('max-value') maxvalue: number;
  helpInfoMsg: string;
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
    this.helpInfoMsg = this.helpInfoMsg + 'Min value: ' + value + '<br/>';
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
    this.helpInfoMsg = this.helpInfoMsg + 'Max value: ' + value;
  }
  isValid: boolean;
  isComponentValid: boolean;
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
name : min-length
datatype : number
version : 4.0 onwards
default :
description : The smallest positive representable
number -that is, the positive number closest to zero
(without actually being zero). The smallest negative representable
number is -min-length.
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
name : disabled
datatype : boolean
version : 4.0 onwards
default : none
description : True to disable the field.
*/
  @Input() disabled: boolean;
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
    if (value !== null) {
      this.regEx = new RegExp(this.pattern);
    }
  }
/*
Events
name : input
datatype : any
version : none
default :
description : On input event field.
*/
@Output() input: any = new EventEmitter<any>();
/*
Properties
name : enable-popover
datatype : string
version : 4.0 onwards
default :
description : Set enable / disable popover.
*/
  @Input('enable-popover') enablepopover: boolean;
  constructor() {
    this.showToolTip = false;
  }
  // The internal dataviews model
  private innerValue: any = '';
  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
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
  onBlur() {
    this.onTouchedCallback();
    this.showToolTip = false;
    if (this.value < this.minvalue) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
  }
  ngOnInit() {
    this.isComponentValid = this.allowblank;
  }
  onInput(input: any) {
    this.isComponentValid = input.valid;
    this.getValidationClasses(input);
    this.input.emit();
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
  getValidationClasses(inp: any): any {
    let classObj;
    if (!this.allowblank) {
      if (this.innerValue === null || this.innerValue === '') {
        if (inp.touched) {
          classObj = {'input-control-error': true};
          this.setValidationFlag(false);
        } else {
          this.setValidationFlag(false);
        }
      } else if (inp.touched && !this.allowblank && (this.value === '' || this.value === null)) {
        classObj = {'input-control-error': true};
        this.setValidationFlag(false);
      } else {
        if (this.minlength === null && this.maxlength === null) {
          if (this.minvalue !== null && this.maxvalue !== null) {
            if (this.value >= this.minvalue && this.value <= this.maxvalue) {
              this.setValidationFlag(true);
            } else {
              classObj = {'input-control-error': true};
              this.setValidationFlag(false);
            }
          } else if (this.minvalue !== null) {
            if (this.value < this.minvalue) {
              classObj = {'input-control-error': true};
              this.setValidationFlag(false);
            } else {
              this.setValidationFlag(true);
            }
          } else if (this.maxvalue !== null) {
            if (this.value > this.maxvalue) {
              classObj = {'input-control-error': true};
              this.setValidationFlag(false);
            } else {
              this.setValidationFlag(true);
            }
          }
        }
        if ((this.maxvalue === null && this.minvalue === null)) {
          if (this.maxlength !== null && this.minlength !== null) {
            if (this.value && (this.value.toString().length >= this.minlength) && (this.value.toString().length <= this.maxlength)) {
              this.setValidationFlag(true);
            } else {
              classObj = {'input-control-error': true};
              this.setValidationFlag(false);
            }
          } else if (this.minlength !== null) {
            if (this.value && (this.value.toString().length >= this.minlength)) {
              this.setValidationFlag(true);
            } else {
              classObj = {'input-control-error': true};
              this.setValidationFlag(false);
            }
          } else if (this.maxlength !== null) {
            if (this.value && (this.value.toString().length <= this.maxlength)) {
              this.setValidationFlag(true);
            } else {
              classObj = {'input-control-error': true};
              this.setValidationFlag(false);
            }
          }
        }
      }
    }else {
      this.setValidationFlag(true);
    }
    return classObj;
  }
  setValidationFlag(flag: boolean) {
    this.isValid = flag;
    this.isComponentValid = flag;
  }
}
