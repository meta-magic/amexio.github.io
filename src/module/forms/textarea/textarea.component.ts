import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmexioTextAreaComponent),
  multi: true
};

@Component({
  selector: 'amexio-textarea-input',
  templateUrl: './textarea.component.html',
  providers : [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./textarea.component.scss']
})
export class AmexioTextAreaComponent implements ControlValueAccessor{


  @Input()   fieldlabel: string;

  @Input()    rows : number;

  @Input()    columns : number;

  @Input()   allowblank: string;

  helpInfoMsg: string;

  regEx : RegExp ;

  showToolTip : boolean;

  _errormsg : string;

  get errormsg(): string {
    return this._errormsg;
  }

  @Input('errormsg')
  set errormsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  _minerrormsg : string;

  get minerrormsg() : string{
    return this._minerrormsg;
  }

  @Input('minerrormsg')
  set minerrormsg(value : string){
    this.helpInfoMsg = this.helpInfoMsg + '<b>Min Length<b/>: ' + value + '<br/>';
  }

  _maxerrormsg : string;

  get maxerrormsg() : string{
    return this._maxerrormsg;
  }

  @Input('maxerrormsg')
  set maxerrormsg(value : string){
    this.helpInfoMsg = this.helpInfoMsg + 'Max Length: ' + value;
  }


  @Input()   placeholder: string;

  @Input()   disabled: boolean;

  @Input()   iconfeedback: boolean;

  @Input()   fontstyle: string;

  @Input()   fontfamily: string;

  @Input()   fontsize: string;

  @Input()   haslabel: boolean = true;

  _pattern : string;

  isValid : boolean;

  get pattern() : string{
    return this._pattern;
  }

  @Input('pattern')
  set pattern(value : string){
    if(value!=null)
      this.regEx = new RegExp(this.pattern);
  }

  @Input()   enablepopover : boolean;

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
    if(inp.touched && !this.allowblank && (this.value == '' || this.value == null)){
      classObj = {'input-control-error' : true};
      this.isValid = false;
    }
    else{
      classObj =  {'input-control-error' : inp.invalid && (inp.dirty || inp.touched),'input-control-success' : inp.valid && (inp.dirty || inp.touched)};
      if(inp.valid && (inp.dirty || inp.touched))
        this.isValid = true;
    }
    return classObj;
  }

}



