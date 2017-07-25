/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas
 *
 */

import {Input} from '@angular/core';

/**
 * Base class Used to Inject into all Form Fields Components.
 */
export class FormInputBase {

  @Input()   fieldLabel: string;

  @Input()   fieldName: string;

  @Input()   minLength: number;

  @Input()   minErrorMsg: string;

  @Input()   maxLength: number;

  @Input()   maxErrorMsg: string;

  @Input()   allowBlank: string;

  @Input()   errorMsg: string;

  @Input()   placeholder: string;

  @Input()   disabled: boolean;

  @Input()   iconFeedBack: boolean;

  @Input()   fontStyle: string;

  @Input()   fontFamily: string;

  @Input()   fontSize: string;

  @Input()   fieldIcon: string;

  @Input()   hasLabel: boolean = true;

  @Input()   pattern: string;

  @Input()   popoverPlacement: string;

  @Input()   enablePopOver : boolean;


  elementId: string;

  spanId : string;

  iconName : string;

  helpInfoMsg: string;

  isValid: boolean;

  divCss : string;

  iconClassName : string;

  fieldglyphIcon : string;

  popoverField : string;

  regEx : RegExp ;

    constructor() {
       /* if (Messenger != null){
            Messenger.options = {
                extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                theme: 'air'
            };
        }
        else{
          console.warn('Please Include Messenger JS Library from http://github.hubspot.com/messenger/docs/welcome/');
        }
*/


    }

  validate(){
    this.isValid = this.isValidInput();
  }

  isValidInput() {
    return null;
  }

  setValidClassNames() {
    this.divCss = 'form-group has-danger has-feedback has-feedback-custom';
    this.iconName = 'danger';
    this.iconClassName = 'fa fa-times';
  }

  setInvalidatedClassNames() {
    this.divCss = 'form-group has-success has-feedback has-feedback-custom';
    this.iconName = 'success';
    this.iconClassName = 'fa fa-check';
  }
}
