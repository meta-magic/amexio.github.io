/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by Ankita
*/

import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AmexioCreditCardModel } from '../../../models/creditcardmodel.component';
const noop = () => {
};
@Component({
  selector: 'amexio-creditcard',
  templateUrl: './creditcard.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioCreditcardComponent), multi: true,
  }],
  styleUrls: ['./creditcard.component.css'],
})
export class AmexioCreditcardComponent implements ControlValueAccessor, OnInit {
  /*
  Properties
  name : yearcount
  datatype : string
  version : 5.2.3onwards
  default :
  description : the minexp will set the dropdown to user defined dropdown.
  */
  @Input('year-count') yearcount = 12;
  /*
 Properties
 name : showlabel
 datatype : boolean
 version : 5.2.3onwards
 default :
 description : the showlabel will set the label of creditcard.
 */
  @Input('show-label') showlabel = 'false';
  /*
 Properties
 name : template
 datatype : String
 version : 5.2.3onwards
 default :
 description : the template
 */
  @Input('template') template: string;
  templateFlag: boolean;
  creditCardModel: AmexioCreditCardModel;
  inp: string;
  cardName: any;
  cardPattern: any;
  isNameValid = false;
  isCvvValid = false;
  cardRegexMap: Map<any, string>;
  cardPatternMap: Map<any, string>;
  visaEagerReg: any = /^4/;
  visaReg: any = /^4\d{12}(\d{3}|\d{6})?$/;
  mastropattern: any = /^(?:5[06789]\d\d|(?!6011[0234])(?!60117[4789])(?!60118[6789])(?!60119)(?!64[456789])(?!65)6\d{3})\d{8,15}$/;
  masttroeagerPattern: any = /^(5(018|0[23]|[68])|6[37]|60111|60115|60117([56]|7[56])|60118[0-5]|64[0-3]|66)/;
  masterpattern: any = /^5[1-5]\d{14}$/;
  mastereagerPattern: any = /^5[1-5]/;
  validEagerCard: any;
  validPatternCard: any;
  isFullCardValid = false;
  cvvRegex: any = /^[0-9]{3,4}$/;
  dateData: any;
  year: Date = new Date();
  currentYear: any;
  yearList: any[] = [];
  eagarflag: boolean;
  eagarValue = '';
  fullPatternValue = '';
  fullPatternflag: boolean;
  isValidFullString: boolean;
  cardGroupData: any;
  cardNumberValue: string;
  dummyCreditCardNumber: string;
  dummyMonth: string;
  // The internal dataviews model
  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // From ControlValueAccessor Interface
  writeValue(modelValue: any) {
    if (modelValue) {
      this.creditCardModel = modelValue;
      this.onChangeCardNumber(this.creditCardModel.cardnumber);
      this.onChangeMonth('0' + this.creditCardModel.expMonth);
      this.onChangeYear(this.creditCardModel.expYear);
      this.isCvvValid = this.cvvRegex.test(this.creditCardModel.cvv);
      this.cardRegexMap.forEach((value: any, key: string) => {
        const isEagarValid = value.test(this.dummyCreditCardNumber);
        if (isEagarValid) {
          this.eagarflag = isEagarValid;
          this.eagarValue = key;
        }
      });
      this.validEagerCard = this.eagarValue;
      this.switchCaseMethod();
      this.onCheckValidation();

    }
  }
  onChangeCardNumber(event: any) {
    this.dummyCreditCardNumber = this.creditCardNumberSpaceRemove(event);
    const concatCardNumber = this.replaceSpace(this.dummyCreditCardNumber);
    this.cardPatternMap.forEach((value: any, key: string) => {
      // Condition for Full String Regex
      this.isValidFullString = value.test(concatCardNumber);
      if (this.isValidFullString) {
        this.fullPatternflag = this.isValidFullString;
        this.fullPatternValue = key;
      }
    });
    this.validPatternCard = this.fullPatternValue;
    this.creditCardModel.cardnumber = +concatCardNumber;
  }
  // From ControlValueAccessor Interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  // From ControlValueAccessor Interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  // method to check owners length
  onNameClick(inp: any) {
    if (inp.model.length > 0) {
      this.isNameValid = true;
    } else {
      this.isNameValid = false;
    }
  }
  // method to check Cvv Number
  onClick(inpcvv: any) {
    this.isCvvValid = this.cvvRegex.test(inpcvv.model);
  }
  // method to check Card Number
  onInput(inp: any) {
    // Condition for null check
    if (inp.model !== '') {
      let fullPatternFlag: boolean;
      let isValidFullString: boolean;
      let fullPatternValue = '';
      const concatValue = this.replaceSpace(inp.model);
      this.cardPatternMap.forEach((value: any, key: string) => {
        // Condition for Full String Regex
        isValidFullString = value.test(concatValue);
        if (isValidFullString) {
          fullPatternFlag = isValidFullString;
          fullPatternValue = key;
        }
      });
      this.validPatternCard = fullPatternValue;
      let eagarflag: boolean;
      let eagarValue = '';
      this.cardRegexMap.forEach((value: any, key: string) => {
        const isEagarValid = value.test(concatValue);
        if (isEagarValid) {
          eagarflag = isEagarValid;
          eagarValue = key;
        }
      });
      this.validEagerCard = eagarValue;
    } else {
      this.validEagerCard = '';
    }
    this.switchCaseMethod();
    this.onCheckValidation();
    if (inp.model !== '') {
      this.cardNumberValue = this.creditCardNumberSpaceRemove(inp.model);
    }

  }
  // THIS MEHTOD IS SUED FOR REPALCE SPACE WITH STRING AND RETURN TO REGEX
  private replaceSpace(value: any): string {
    let newString = '';
    if (value) {
      const stringArray = value.split(' ');
      if (stringArray) {
        stringArray.forEach((element: any) => {
          newString = newString.concat(element);
        });
      }
    }
    return newString;
  }
  // Map Implementation for key value pair
  ngOnInit() {
    this.creditCardModel = new AmexioCreditCardModel();
    this.cardRegexMap = new Map();
    this.cardPatternMap = new Map();
    this.cardRegexMap.set('eagerflagvisa', this.visaEagerReg);
    this.cardRegexMap.set('mastereagerPattern', this.mastereagerPattern);
    this.cardRegexMap.set('masttroeagerPattern', this.masttroeagerPattern);
    this.cardPatternMap.set('visaReg', this.visaReg);
    this.cardPatternMap.set('masterpattern', this.masterpattern);
    this.cardPatternMap.set('mastropattern', this.mastropattern);
    this.cardName = '';
    this.currentYear = this.year.getFullYear();

    if (this.template === 'single-column') {
      this.templateFlag = true;
    } else if (this.template === 'double-column') {
      this.templateFlag = false;
    }
    for (let i = 0; i < this.yearcount; i++) {
      this.yearList.push(this.currentYear + i);
    }
  }
  creditCardNumberSpaceRemove(value: any) {
    if (value) {
    value = value.toString();
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    let len;
    let i;
    for (i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  }
}
  switchCaseMethod() {
    switch (this.validEagerCard) {
      case 'eagerflagvisa':
        this.cardName = 'fa fa-cc-visa';
        break;
      case 'mastereagerPattern':
        this.cardName = 'fa fa-cc-mastercard';
        break;
      case 'masttroeagerPattern':
        this.cardName = 'fa fa-credit-card';
        break;
      case '':
        this.cardName = '';
        break;
      default:
        this.cardName = '';
        break;
    }
  }
  onCheckValidation() {
    this.cardGroupData.forEach((element: any) => {
      if (element.key === this.validEagerCard) {
        element.color = 'blue';
      } else {
        element.color = 'black';
      }
    });
  }
  constructor() {
    if (this.template === 'single-column') {
      this.templateFlag = true;
    } else if (this.template === 'double-column') {
      this.templateFlag = false;
    }
    this.creditCardModel = new AmexioCreditCardModel();
    this.dummyMonth = '0' + this.creditCardModel.expMonth;
    this.dateData = [
      {
        month: '01',
      },
      {
        month: '02',
      },
      {
        month: '03',
      },
      {
        month: '04',
      },
      {
        month: '05',
      },
      {
        month: '06',
      },
      {
        month: '07',
      },
      {
        month: '08',
      },
      {
        month: '09',
      },
      {
        month: '10',
      },
      {
        month: '11',
      },
      {
        month: '12',
      },
    ];
    this.cardGroupData = [
      {
        iconName: 'fa fa-cc-visa',
        key: 'eagerflagvisa',
        color: 'black',
      },
      {
        iconName: 'fa fa-cc-mastercard',
        key: 'mastereagerPattern',
        color: 'black',
      },
      {
        iconName: 'fa fa-credit-card',
        key: 'masttroeagerPattern',
        color: 'black',
      },
    ];
  }
  onChangeMonth(event: any) {
    this.dummyMonth = event;
    this.creditCardModel.expMonth = +this.dummyMonth;
  }
  onChangeYear(event: any) {
    this.creditCardModel.expYear = event;
  }
}
