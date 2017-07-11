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

import {Injectable} from '@angular/core';

declare var $;
declare var Messenger;
/**
 * A Shared Service class, used mainly for Form Validations And Notification Feedback
 */
@Injectable()
export class WidgetService {

  constructor() {
    if(Messenger != null){
      Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
        theme: 'air'
      }
    }
    else{
      console.warn('Please include Messenger js/css in your assets from http://github.hubspot.com/messenger/');
    }

  }

  /**
   * Sets the the form field to disabled mode.
   * @param inputTexts Reference to Form Components
   * @param fieldName Name of the Field
   * @param disabled  Boolean, Set true | false to disable
   */
  setDisabled(inputTexts : any, fieldName: string, disabled: boolean){

    let components = inputTexts._results;

    for(let iComponents = 0 ; iComponents<components.length; iComponents++){
      let inputText = components[iComponents];

      if(inputText.fieldName == fieldName){
        inputText.disabled = disabled;
      }

    }

  }

  validate(inputTexts: any){

    let components = inputTexts;

    let showMessage = false;

    let errorCounter = 1;

    let title= "<strong>Please validate following fields</strong><br><hr>";
    let validateMsg = "<br>";

    for(let iComponents = 0 ; iComponents<components.length; iComponents++){
      let inputText = components[iComponents];
      let isValid = inputText.isValidInput();

      if(isValid){
        validateMsg = validateMsg +' '+errorCounter +') '+inputText.fieldLabel +"<br/>";
        showMessage = true;
        errorCounter++;
      }
    }

    if(showMessage)
      Messenger().post({
        message: showMessage,
        type: 'error',
        showCloseButton: true
      });

    return showMessage;
  }

  validateAll(inputTexts: any[]){
    let showMessage = false;
    let errorCounter = 1;
    let title= "<strong>Please validate following fields</strong><hr>";
    let validateMsg = "<br>";
    for (let ic = 0; ic < inputTexts.length; ic++){

      let component = inputTexts[ic];
        let isValid = component.isValidInput();

        if(isValid){
          validateMsg = validateMsg + ' '+errorCounter +') '+component.fieldLabel +"<br>";
          showMessage = true;
          errorCounter++;
        }


    }

    if(showMessage)
      Messenger().post({
        message: showMessage,
        type: 'error',
        showCloseButton: true
      });

    return showMessage;
  }

  toasterDanger(title : string,message : string,timeout : string){
    if(timeout != null)
      timeout = '3';
    Messenger().post({
      message: message,
      type: 'error',
      showCloseButton: true,
      hideAfter : timeout
    });
  }
  toasterSuccess(title : string,message : string,timeout : string){
    if(timeout != null)
      timeout = '3';
    Messenger().post({
      message: message,
      type: 'success',
      showCloseButton: true,
      hideAfter : timeout
    });
  }
  toasterInfo(title : string,message : string,timeout : string){
    if(timeout != null)
      timeout = '3';
    Messenger().post({
      message: message,
      type: 'info',
      showCloseButton: true,
      hideAfter : timeout
    });
  }





}
