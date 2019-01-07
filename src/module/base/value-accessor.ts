import { ControlValueAccessor } from '@angular/forms';

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

  // THIS METHOD GENERATE RANDOM STRING
  generateName(name: string, fieldlabel: string, inputType: string): string {
    let newName: string;
    if (!name && fieldlabel) {
      newName = fieldlabel.replace(/\s/g, '');
    } else if (!name && !fieldlabel) {
      newName = inputType + '-' + this.getRandomString();
    }
    return newName;
  }
  getRandomString(): string {
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    for (let i = 0; i < 6; i++) {
      randomString += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }
    return randomString;
  }

  createCompId(inputType: any, name: any) {
    return inputType + '_' + name + '_' + Math.floor(Math.random() * 1000 + 999);
  }
}
