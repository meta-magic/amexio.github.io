/*
 Component Name : Amexio Email Input
 Component Selector :  <amexio-email-input>
 Component Description : Email input field
 */
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators } from '@angular/forms';
import { ValueAccessorBase } from '../../base/value-accessor';

@Component({
  selector: 'amexio-email-input',
  templateUrl: './emailinput.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioEmailInputComponent), multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioEmailInputComponent), multi: true,
  }],
})
export class AmexioEmailInputComponent extends ValueAccessorBase<string> implements OnInit, Validators {

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
  @ViewChild(NgModel) model: NgModel;

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

  emailpattern: any = /\S+@\S+\.\S+/;

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
  @Input('name') name: string;
  constructor() {
    super();
    this.showToolTip = false;
  }

  ngOnInit() {
    this.name = this.generateName(this.name, this.fieldlabel, 'textinput');
  }
  // THIS METHOD USED FOR BLUR EVENT.
  onblur() {
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
    this.isValid = this.isFieldValid();
    this.input.emit(this.value);
  }
  // THIS METHOD USED FOR CHANGE EVENT  .
  onChangeEv() {
    this.change.emit(this.value);
  }

  // THIS MEHTOD CHECK INPUT IS VALID OR NOT
  checkValidity(): boolean {
    return (this.inputRef && this.inputRef.nativeElement &&
      this.inputRef.nativeElement.validity && this.inputRef.nativeElement.validity.valid);
  }

  // THIS METHOD IS USED FOR VALIDATION
  isFieldValid(): boolean {
    return (!this.allowblank  && this.emailpattern.test(this.value)) || this.allowblank;
  }
  public validate(c: FormControl) {
    return this.isFieldValid() ? null : {
      jsonParseError: {
        valid: true,
      },
    };
  }
}
