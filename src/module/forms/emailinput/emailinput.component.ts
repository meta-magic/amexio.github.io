/*
 Component Name : Amexio Email Input
 Component Selector :  <amexio-email-input>
 Component Description : Email input field
 */
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {
};
@Component({
  selector: 'amexio-email-input',
  templateUrl: './emailinput.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioEmailInputComponent), multi: true,
  }],
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
  @Output() isComponentValid: any = new EventEmitter<any>();

  @ViewChild('ref', { read: ElementRef }) public inputRef: ElementRef;

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

  componentClass: any;
 // The internal dataviews model
 private innerValue: any = '';
 // Placeholders for the callbacks which are later provided
 // by the Control Value Accessor
 private onTouchedCallback: () => void = noop;
 private onChangeCallback: (_: any) => void = noop;
  isValid: boolean;

  constructor() {
    this.showToolTip = false;
  }
  ngOnInit() {
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
  onFocus() {
    this.showToolTip = true;
    this.focus.emit(this.value);
  }
  // Set touched on blur
  onblur(input: any) {
    this.onTouchedCallback();
    this.showToolTip = false;
    this.componentClass = this.validateClasses(input);
    this.onBlur.emit(this.value);
  }
  onInput(input: any) {
    this.componentClass = this.validateClasses(input);
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
  validateClasses(inp: any): any {
    let classObj;
    if (!this.allowblank) {
      classObj = this.onBlank(inp);
    } else {
      this.isValid = true;
    }
    this.isComponentValid.emit(this.isValid);
    return classObj;
  }

  onBlank(inp: any) {
    let classObj;
    if (this.innerValue === null || this.innerValue === '') {
      if (inp.touched) {
        classObj = this.getCssClass();
        this.isValid = false;
      } else {
        this.isValid = false;
      }
    } else if ((inp.touched && !this.allowblank
      && (this.value === '' || this.value === null))
      || (!this.emailpatter.test(this.value))) {
      classObj = this.getCssClass();
      this.isValid = false;
    } else {
      classObj = {
        'input-control-error': inp.invalid && (inp.dirty || inp.touched),
        'input-control-success': inp.valid && (inp.dirty || inp.touched),
      };
      if (inp.valid) {
        this.isValid = true;
      }
    }
    return classObj;
  }

  getCssClass(): any {
    return { 'input-control-error': true };
  }

  // THIS MEHTOD CHECK INPUT IS VALID OR NOT
  checkValidity(): boolean {
    return (this.inputRef && this.inputRef.nativeElement &&
      this.inputRef.nativeElement.validity && this.inputRef.nativeElement.validity.valid);
  }
}
