/*
 Component Name : Amexio Number Input
 Component Selector :  <amexio-number-input>
 Component Description : Number input component has been created
 with different configurable attributes for validation
 (min/max value,allow blank, custom regex), custom error message, help, custom styles
*/
import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild,
 } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';
import { AmexioFormValidator } from './../form-validator/amexio.form.validator.component';

const noop = () => {
};

@Component({
  selector: 'amexio-number-input',
  templateUrl: './numberinput.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioNumberInputComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioNumberInputComponent), multi: true,
}],
})
export class AmexioNumberInputComponent extends AmexioFormValidator implements OnInit, ControlValueAccessor, Validators {

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

  componentClass: any;

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
  @Output() isComponentValid: any = new EventEmitter<any>();
  @ViewChild('ref', {read: ElementRef}) public inputRef: ElementRef;
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
    super();
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

  ngOnInit() {
    this.generateName();
    this.isComponentValid.emit(this.allowblank);
  }

  onFocus() {
    this.showToolTip = true;
  }
  // Set touched on blur
  onBlur(input: any) {
    this.onTouchedCallback();
    this.showToolTip = false;
    this.componentClass = this.validateClass(input);
  }
  // THIS METHOD IS USED FOR COMPONENT VALIDATION
  onChangeEv() {
  }
  onInput(input: any) {
    this.componentClass = this.validateClass(input);
    this.input.emit();
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
    const flag = this.checkValidity();
    if (!flag) {
      classObj = this.getCssClass();
    }
    this.setValidationFlag(flag);
    this.isComponentValid.emit(this.isValid);
    return classObj;
  }
  setValidationFlag(flag: boolean) {
    this.isValid = flag;
  }
  // THIS MEHTOD CHECK INPUT IS VALID OR NOT
  checkValidity(): boolean {
    return (this.inputRef && this.inputRef.nativeElement &&
      this.inputRef.nativeElement.validity && this.inputRef.nativeElement.validity.valid);
  }

  isFieldValidate(): boolean {
    return this.value && (this.value > this.minvalue && this.value < this.maxvalue);
  }

  public validate(c: FormControl) {
    return ((!this.allowblank && this.isFieldValidate()) || this.allowblank) ? null : {
        jsonParseError: {
            valid: true,
        },
    };
}
// THIS METHOD GENERATE RANDOM STRING
generateName() {
  if (!this.name && this.fieldlabel ) {
    console.log('sassas');
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
