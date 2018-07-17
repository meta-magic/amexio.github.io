/**
 * Created by ketangote on 11/21/17.
 */
 /*
 Component Name : Amexio Checkbox
 Component Selector :  <amexio-checkbox>
 Component Description : Single checkbox having boolean based values.
*/
import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
const noop = () => {
};

@Component({
  selector: 'amexio-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioCheckBoxComponent), multi: true,
  }],
  styleUrls: ['./checkbox.component.scss'],
})
export class AmexioCheckBoxComponent implements ControlValueAccessor, OnInit {
  // The internal dataviews model
  private innerValue: any = '';
  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

/*
Properties
name : field-label
datatype : string
version : 4.0 onwards
default : none
description :The label of this field
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
Properties
name : required
datatype : boolean
version : 4.0 onwards
default : false
description :  property to set if manditory
*/
  @Input() required = false;
/*
Events
name : onSelection
datatype : any
version : none
default : none
description : Event fired on checkbox click.
*/
  @Output() onSelection: any = new EventEmitter<any>();
/*
Events
name : input
datatype : any
version : none
default : none
description : On input event field.
*/
  @Output() input: any = new EventEmitter<any>();
  isComponentValid: boolean;
  constructor() {
  }
  ngOnInit() {
    this.isComponentValid = !this.required;
  }
  onInput(input: any) {
    this.isComponentValid = this.value;
    this.input.emit(this.value);
  }
  onClick() {
    this.value = !this.value;
    this.isComponentValid = this.value;
    this.onSelection.emit(this.value);
  }
  // get accessor
  get value(): any {
    if (this.required) {
      this.isComponentValid = this.innerValue;
    } else {
      this.isComponentValid = true;
    }
    return this.innerValue;
  }
  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }
  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }
  onFocus() {
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
}
