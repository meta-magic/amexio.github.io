/**
 * Created by pratik on 28/12/17.
 */
import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const noop = () => {
};

export const CUSTOM_SLIDER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmexioSliderComponent),
  multi: true
};

@Component({
 selector: 'amexio-slider',
 template: `
   <input type="range"
          [(ngModel)]="value"
          #inp="ngModel"
          [ngClass]="{'input-control-error' : inp.invalid && (inp.dirty || inp.touched),'input-control-success' : inp.valid && (inp.dirty || inp.touched)}"
          (input)="onInput()"
          (blur)="onblur()"
          (focus)="onFocus()"
          (change)="onChange($event)" 
          [attr.min]="minvalue" 
          [attr.max]="maxvalue" 
          [attr.step]="stepvalue"
          orient="vertical"
          value="15" [ngStyle]="{'background-image' : '-webkit-gradient(linear, left top, right top,color-stop(' + val + ', #94A14E),color-stop(' + val + ', #C5C5C5)'}">

 `,
  providers : [CUSTOM_SLIDER_CONTROL_VALUE_ACCESSOR]
})

export class AmexioSliderComponent implements OnInit, ControlValueAccessor {

  @Input()  minvalue  : number;

  @Input()  maxvalue  : number;

  @Input()  stepvalue : number;

  @Input()   iconfeedback: boolean;

  @Output()   onBlur : any = new EventEmitter<any>();

  @Output()   input : any = new EventEmitter<any>();

  @Output()   focus : any = new EventEmitter<any>();

  @Output()   change : any = new EventEmitter<any>();

  val : any;

  constructor() { }

  ngOnInit() { }

  onChange(event : any){
    this.val = (this.value - this.minvalue) / (this.maxvalue - this.minvalue);
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
    // this.showToolTip = false;
    this.onBlur.emit();
  }

  onFocus(){
    // this.showToolTip = true;
    this.change.emit();
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

  onInput(){
    this.input.emit();
  }
}
