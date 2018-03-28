import {
  Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioTextInputComponent), multi: true
};

@Component({
  selector: 'amexio-text-input',
  templateUrl: './textinput.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})

export class AmexioTextInputComponent implements ControlValueAccessor {

  @Input('field-label') fieldlabel: string;

  @Input('min-length') minlength: number;

  @Input('max-length') maxlength: number;

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

  _minerrormsg: string;

  get minerrormsg(): string {
    return this._minerrormsg;
  }

  @Input('min-error-msg')
  set minerrormsg(value: string) {
    this.helpInfoMsg = this.helpInfoMsg + '<b>Min Length<b/>: ' + value + '<br/>';
  }

  _maxerrormsg: string;

  get maxerrormsg(): string {
    return this._maxerrormsg;
  }

  @Input('max-error-msg')
  set maxerrormsg(value: string) {
    this.helpInfoMsg = this.helpInfoMsg + 'Max Length: ' + value;
  }


  @Input('place-holder') placeholder: string;

  @Input() disabled: boolean;

  @Input('icon-feedback') iconfeedback: boolean;

  @Input('font-style') fontstyle: string;

  @Input('font-family') fontfamily: string;

  @Input('font-size') fontsize: string;

  @Input('has-label') haslabel: boolean = true;


  _pattern: string;

  get pattern(): string {
    return this._pattern;
  }
  
  @Input('pattern')
  set pattern(value: string) {
    if (value != null) {
      this._pattern = value;
      this.regEx = new RegExp(this._pattern);
    }
  }

  @Input('enable-popover') enablepopover: boolean;

  regex: RegExp;

  isValid: boolean;

  @ViewChild('ref', {read: ElementRef}) public inputRef: ElementRef;

  @Output() onBlur: any = new EventEmitter<any>();

  @Output() input: any = new EventEmitter<any>();

  @Output() focus: any = new EventEmitter<any>();

  @Output() change: any = new EventEmitter<any>();

  constructor() {
    this.showToolTip = false;
  }

  ngOnInit() {
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
    if (this.value && (this.value.length < this.minlength)) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
    this.onBlur.emit(this.value);
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
    } else if (inp.touched && this.minlength != null) {
      if (this.value && (this.value.length < this.minlength)) {
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



