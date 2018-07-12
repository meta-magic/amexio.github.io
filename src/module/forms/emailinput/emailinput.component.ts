/*
 Component Name : Amexio Email Input
 Component Selector :  <amexio-email-input>
 Component Description : Email input field
 */
import {Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
const noop = () => {
};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioEmailInputComponent), multi: true,
};
@Component({
  selector: 'amexio-email-input',
  templateUrl: './emailinput.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class AmexioEmailInputComponent implements ControlValueAccessor, OnInit {
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
   name : has-label
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : Flag to set label
   */
  @Input('has-label') hasLabel = true;
  /*
   Properties
   name : allow-blank
   datatype : string
   version : 4.0 onwards
   default :
   description : Sets if field is required
   */
  @Input('allow-blank') allowblank: boolean;
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
  isComponentValid: boolean;
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
  emailpatter: any = /\S+@\S+\.\S+/;
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
  isValid: boolean;
  constructor() {
    this.showToolTip = false;
  }
  ngOnInit() {
    this.isComponentValid = this.allowblank;
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
  onblur() {
    this.onTouchedCallback();
    this.showToolTip = false;
    this.onBlur.emit(this.value);
    if (!this.emailpatter.test(this.value)) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
  }
  onFocus() {
    this.showToolTip = true;
    this.focus.emit(this.value);
  }
  onInput(input: any) {
    this.isComponentValid = input.valid;
    this.getValidationClasses(input);
    this.input.emit(this.value);
  }
  onChangeEv() {
    this.change.emit(this.value);
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
          this.isValid = false;
          this.isComponentValid = false;
        } else {
          this.isValid = false;
          this.isComponentValid = false;
        }
      } else if (inp.touched && !this.allowblank && (this.value === '' || this.value === null)) {
        classObj = {'input-control-error': true};
        this.isValid = false;
        this.isComponentValid = false;
      } else if (!this.emailpatter.test(this.value)) {
        classObj = {'input-control-error': true};
        this.isValid = false;
        this.isComponentValid = false;
      } else {
        classObj = {
          'input-control-error': inp.invalid && (inp.dirty || inp.touched),
          'input-control-success': inp.valid && (inp.dirty || inp.touched),
        };
        if (inp.valid) {
          this.isValid = true;
          this.isComponentValid = true;
        }
      }
    } else {
      this.isValid = true;
      this.isComponentValid = true;
    }
    return classObj;
  }
}
