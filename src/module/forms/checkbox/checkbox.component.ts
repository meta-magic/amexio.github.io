/**
 * Created by ketangote on 11/21/17.
 */

import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmexioCheckBoxComponent),
  multi: true
};

@Component({
  selector: 'amexio-checkbox',
  templateUrl : './checkbox.component.html',
  providers : [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  styleUrls : ['./checkbox.component.scss']
})
export class AmexioCheckBoxComponent implements ControlValueAccessor{

  @Input() fieldLabel : string;

  @Input() horizontal: boolean;

  @Input()   disabled: boolean;

  @Input()   allowBlank: string;

  @Output() selectedValue : any = new EventEmitter<any>();

  constructor(){

  }

  onClick(){
    this.value = !this.value;
    this.selectedValue.emit(this.value);
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
    // this.showToolTip = false;
  }

  onFocus(){
    // this.showToolTip = true;
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



}
