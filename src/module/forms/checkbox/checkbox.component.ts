/**
 * Created by ketangote on 11/21/17.
 */

 /*
 Component Name : Amexio Checkbox
 Component Selector :  <amexio-checkbox>
 Component Description : Single checkbox having boolean based values.
 
*/
import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioCheckBoxComponent), multi: true
};

@Component({
  selector: 'amexio-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./checkbox.component.scss']
})
export class AmexioCheckBoxComponent implements ControlValueAccessor {

  /*
Properties 
name : field-label
datatype : string
version : 4.0 onwards
default : none 
description : The label of this field
*/
  @Input('field-label') fieldlabel: string;

  /*
Properties 
name : disabled
datatype : boolean
version : 4.0 onwards
default : false
description :  If true will not react on any user events and show disable icon over
*/
  @Input() disabled: boolean;

    /*
    not in use
 */
  @Input() required: string;

  /*
Events
name : onSelection
datatype : any
version : none
default : none
description :  Event fired on checkbox click.
*/
  @Output() onSelection: any = new EventEmitter<any>();

  constructor() {

  }

  onClick() {
    this.value = !this.value;
    this.onSelection.emit(this.value);
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

  onFocus() {
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
