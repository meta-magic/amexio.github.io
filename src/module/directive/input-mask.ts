/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the 'License');
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an 'AS IS' BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by Ketan Gote on 05 June, 2019.
* Reference to : https://codepen.io/estelle/pen/LVQLRq?editors=1111
*
*/

import { Directive, HostListener, Input, Optional } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';

@Directive({
    selector: '[amexio-mask-pattern]',
})
export class AmexioInputPatternDirective {

    @Input('amexio-mask-pattern') inputPattern: string;

    isInt: any;
    isLetter: any;
    matchesNumber: any;
    matchesLetter: any;
    newValue1: any;

    constructor( @Optional() public model: NgModel, public ngControl: NgControl) {

    }

    @HostListener('keyup', ['$event'])
    onModelChange(event: any) {
        const isCharsetPresent = this.ngControl.valueAccessor['data-charset'];
        const placeholder = isCharsetPresent || this.inputPattern;
        const e = event.target.value;
        const strippedValue = isCharsetPresent ? e.replace(/\W/g, '') : e.replace(/\D/g, '');
        const newVal = this.handleCurrentValue(strippedValue, placeholder, isCharsetPresent, e);
        this.model.update.emit(newVal);
    }

    handleCurrentValue(strippedValue: any, placeholder: any, isCharsetPresent: any, e: any) {
        this.getOperatingValues(isCharsetPresent, strippedValue, placeholder);
        if (this.ngControl.valueAccessor['data-valid-example']) {
            return this.validateProgress(e, this.newValue1);
        }
        return this.newValue1;
    }

    getOperatingValues(isCharsetPresent: any, strippedValue: any, placeholder: any) {
        let newValue = '';
        this.newValue1 = '';
        for (let i = 0, j = 0; i < placeholder.length; i++) {
            this.valueInitialize(strippedValue[j], placeholder[i]);
            if ((this.matchesNumber && this.isInt) || (isCharsetPresent && this.matchesLetter && this.isLetter)) {
                newValue += strippedValue[j++];
            } else if ((!isCharsetPresent && !this.isInt && this.matchesNumber) ||
                (isCharsetPresent && ((this.matchesLetter && !this.isLetter) || (this.matchesNumber && !this.isInt)))) {
                return newValue;
            } else {
                newValue += placeholder[i];
            }
            if (strippedValue[j] === undefined) {
                break;
            }
        }
        this.newValue1 = newValue;
    }

    valueInitialize(strippedValue: any, placeholder: any) {
        this.isInt = !isNaN(parseInt(strippedValue, 10));
        this.isLetter = strippedValue ? strippedValue.match(/[A-Z]/i) : false;
        this.matchesNumber = 'XdDmMyY9'.indexOf(placeholder) >= 0;
        this.matchesLetter = '_'.indexOf(placeholder) >= 0;
    }

    validateProgress(e: any, value: any) {
        const validExample = this.ngControl.valueAccessor['data-valid-example'];
        const pattern = new RegExp(this.ngControl.valueAccessor['data-pattern']);
        const placeholder = this.inputPattern;

        const l = value.length;
        const testValue = '';

        // convert to months
        if (l === 1 && placeholder.toUpperCase().substr(0, 2) === 'MM') {
            if (value > 1 && value < 10) {
                value = '0' + value;
            }
            return value;
        }
        // test the value, removing the last character, until what you have is a submatch
        for (let i = l; i >= 0; i--) {
            const testValue1 = value + validExample.substr(value.length);
            if (pattern.test(testValue1)) {
                return value;
            } else {
                value = value.substr(0, value.length - 1);
            }
        }
        return value;
    }
}
