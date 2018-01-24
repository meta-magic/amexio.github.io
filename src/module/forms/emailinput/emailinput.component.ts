import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioEmailInputComponent), multi: true
};

@Component({
  selector: 'amexio-email-input',
  templateUrl: './emailinput.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./emailinput.component.scss']
})
export class AmexioEmailInputComponent implements ControlValueAccessor {


  @Input('field-label') fieldlabel: string;

  @Input('allow-blank') allowblank: string;

  helpInfoMsg: string;

  regEx: RegExp;

  showToolTip: boolean;

  _errormsg: string;

  get errormsg(): string {
    return this._errormsg;
  }

  @Input('error-msg')
  set errormsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  @Input('place-holder') placeholder: string;

  @Input() disabled: boolean;

  @Input('icon-feedback') iconfeedback: boolean;

  @Input('font-style') fontstyle: string;

  @Input('font-family') fontfamily: string;

  @Input('font-size') fontsize: string;

  emailpatter: any = /\S+@\S+\.\S+/;

  _pattern: string;

  get pattern(): string {
    return this._pattern;
  }

  @Input('pattern')
  set pattern(value: string) {
    if (value != null) this.regEx = new RegExp(this.pattern);
  }

  @Input('enable-popover') enablepopover: boolean;

  @Output() onBlur: any = new EventEmitter<any>();

  @Output() input: any = new EventEmitter<any>();

  @Output() focus: any = new EventEmitter<any>();

  @Output() change: any = new EventEmitter<any>();

  isValid: boolean;

  constructor() {
    this.showToolTip = false;
  }

  // The internal dataviews model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
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

  onInput() {
    this.input.emit(this.value);
  }

  onChangeEv() {
    this.change.emit(this.value);
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  getValidationClasses(inp: any): any {
    let classObj;
    if (inp.touched && !this.allowblank && (this.value == '' || this.value == null)) {
      classObj = {'input-control-error': true};
      this.isValid = false;
    } else if (inp.touched) {
      if (!this.emailpatter.test(this.value)) {
        classObj = {'input-control-error': true};
        this.isValid = false;
      } else {
        this.isValid = true;
      }

    } else {
      classObj = {
        'input-control-error': inp.invalid && (inp.dirty || inp.touched),
        'input-control-success': inp.valid && (inp.dirty || inp.touched)
      };
      if (inp.valid && (inp.dirty || inp.touched)) this.isValid = true;
    }
    return classObj;
  }

}



