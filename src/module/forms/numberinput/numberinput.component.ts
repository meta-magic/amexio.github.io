import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmexioNumberInputComponent),
  multi: true
};

@Component({
  selector: 'amexio-number-input',
  templateUrl: './numberinput.component.html',
  providers : [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./numberinput.component.scss']
})
export class AmexioNumberInputComponent implements ControlValueAccessor{


  @Input()   fieldLabel: string;

  @Input()   allowBlank: string;

  @Input()   minValue: number;

  @Input()   maxValue: number;

  helpInfoMsg: string;

  regEx : RegExp ;

  showToolTip : boolean;

  _errorMsg : string;

  get errorMsg(): string {
    return this._errorMsg;
  }

  @Input('errorMsg')
  set errorMsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  _minErrorMsg : string;

  get minErrorMsg() : string{
    return this._minErrorMsg;
  }

  @Input('minErrorMsg')
  set minErrorMsg(value : string){
    this.helpInfoMsg = this.helpInfoMsg + 'Min value: ' + value + '<br/>';
  }

  _maxErrorMsg : string;

  get maxErrorMsg() : string{
    return this._maxErrorMsg;
  }

  @Input('maxErrorMsg')
  set maxErrorMsg(value : string){
    this.helpInfoMsg = this.helpInfoMsg + 'Max value: ' + value;
  }

  isValid : boolean;


  @Input()   placeholder: string;

  @Input()   minLength: number;

  @Input()   maxLength: number;

  @Input()   disabled: boolean;

  @Input()   iconFeedBack: boolean;

  @Input()   fontStyle: string;

  @Input()   fontFamily: string;

  @Input()   fontSize: string;

  @Input()   hasLabel: boolean = true;

  _pattern : string;

  get pattern() : string{
    return this._pattern;
  }

  @Input('pattern')
  set pattern(value : string){
    if(value!=null)
      this.regEx = new RegExp(this.pattern);
  }

  @Input()   enablePopOver : boolean;

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
  onBlur() {
    this.onTouchedCallback();
    this.showToolTip = false;
    if(this.value.length < this.minLength){
      this.isValid = false;
    }
    else {
      this.isValid = true;
    }
  }

  onFocus(){
    this.showToolTip = true;
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

  getValidationClasses(inp :  any) : any{
    let classObj;
    if(inp.touched && !this.allowBlank && (this.value == '' || this.value == null)){
      classObj = {'input-control-error' : true};
      this.isValid = false;
    }
    else if(inp.touched && this.minLength != null){
      if(this.value.length < this.minLength) {
        classObj = {'input-control-error' : true};
        this.isValid = false;
      }
    else {
        this.isValid = true;
      }
    }
    else{
      classObj =  {'input-control-error' : inp.invalid && (inp.dirty || inp.touched),'input-control-success' : inp.valid && (inp.dirty || inp.touched)};
      if(inp.valid && (inp.dirty || inp.touched))
        this.isValid = true;
    }
    return classObj;
  }

}



