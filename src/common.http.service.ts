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
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
declare var $;
@Injectable()
export class CommonHttpService {

  filteredObject: any = [];
  isValid: boolean;
  responseData : any;
  parentRef : any;
  constructor(private http: Http) {

  }

  fetchData(serviceUrl: string, methodType: string): Observable<any> {
    const requestJson = {};
    const headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8'  });
    const options = new RequestOptions({headers : headers, method : methodType});
    if (methodType == 'post') {
      return this.http.post(serviceUrl, requestJson, options);
    }else if (methodType == 'get') {
      return this.http.get(serviceUrl, options);
    }
  }

  /**
   * Sets the the form field to disabled mode.
   * @param inputTexts Reference to Form Components
   * @param fieldName Name of the Field
   * @param disabled  Boolean, Set true | false to disable
   */
  setDisabled(inputTexts: any, fieldName: string, disabled: boolean){

    const components = inputTexts._results;

    for (let iComponents = 0 ; iComponents < components.length; iComponents++){
      const inputText = components[iComponents];

      if (inputText.fieldName == fieldName) {
        inputText.disabled = disabled;
      }

    }

  }

  /* validate(inputTexts: any){

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

   return showMessage;
   }*/

  validateAll(inputTexts: any[]) {
    let validationData: any = {};
    const invalidComponent: any[] = [];
    let invalidMsg: any = {};
    this.isValid = true;
    let errorCounter = 1;
    for (let ic = 0; ic < inputTexts.length; ic++) {
      const component = inputTexts[ic];
      const isValid = component.isValidInput();

      if (isValid) {
        if (component.minErrorMsg) {
          invalidMsg['minErrorMsg'] = component.minErrorMsg;
        }
        if (component.maxErrorMsg) {
          invalidMsg['maxErrorMsg'] =  component.maxErrorMsg;
        }
        if (component.errorMsg) {
          invalidMsg['errorMsg'] = component.errorMsg;
        }
        invalidComponent.push({'componentName': component.fieldLabel , 'errorMsgs': invalidMsg});
        invalidMsg = {};

        this.isValid = false;
        errorCounter++;
      }
    }
    validationData = {'ValidationStatus': this.isValid , 'invalidComponent': invalidComponent};
    return validationData;
  }

  uploadFile(parentRef :any, serviceUrl: string, methodType:string,requestData: any){
    this.parentRef = parentRef;
    let requestJson = requestData;
    let headers = new Headers({ "Access-Control-Allow-Origin":"*"});
    let options = new RequestOptions({headers : headers,method : methodType});
    if(methodType.toUpperCase() == "POST"){
      this.http.post(serviceUrl,requestJson,options).subscribe(
          response=>{
            this.responseData = response.json();
          },
          error=>{
          },
          ()=>{
            this.setData();
          }
      );
    }

  }

  setData(){
    this.parentRef.setData(this.responseData);
  }



}



