import {ControlValueAccessor} from '@angular/forms';

const noop = () => {
};

export abstract class ValueAccessorBase<T> implements ControlValueAccessor {

    onTouchedCallback: () => void = noop;
    onChangeCallback: (_: any) => void = noop;

    innerValue: T;

    // get accessor
    get value(): T {
      return this.innerValue;
    }

    // set accessor including call the onchange callback
    set value(v: T) {
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
