import {
  Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

@Component({
  selector: 'amexio-nav-textfield',
  template:
  `
  <input type="text" class="top-nav-input-control" [(ngModel)]="value"/>

  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioNavTextFieldComponent), multi: true,
  }],
  encapsulation: ViewEncapsulation.None,
})

export class AmexioNavTextFieldComponent implements ControlValueAccessor, OnInit {
  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {
  }

  ngOnInit() {
  }
  // The internal dataviews model
  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
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
