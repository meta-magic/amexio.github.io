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

import {OnInit, Input, Output, EventEmitter, Component, DoCheck} from '@angular/core';
import {CommonHttpService} from '../common.http.service';

export const CHECK_COLUMN_SIZE = 'col-lg-';
@Component({
    selector : 'amexio-checkbox',
    template: `
      
      <ng-container *ngIf="enableBoxStyle">
        <div [attr.class]="divCss">
          <label  *ngIf="fieldLabel" [attr.for]="elementId">{{fieldLabel}}</label>
          <div class="" [ngClass]="{'row':column || column!='','list-group':!column ||column==''}">
            <li class="list-group-item col-sm-12" *ngIf="searchBox"><span class="col-sm-12"><input [(ngModel)]="textValue" type="text" class="form-control" placeholder="Please select" (keyup)="filterData($event)"></span></li>
            <li class="list-group-item" [ngClass]="calculatedColSize" *ngFor="let row of viewData">
              <label class="form-check-label">
                <input [attr.id]="row.id" class="amexio-checkbox" type="checkbox" [checked]="row[valueField]"  (click)="setSelectedCheckBox(row, $event)"> 
                <label [attr.for]="row.id">
                  {{row[displayField]}}
                </label>
              </label>
            </li>
          </div>
        </div>
      </ng-container>

      <ng-container *ngIf="!enableBoxStyle">
        <div [attr.class]="divCss">
          <label  *ngIf="fieldLabel" [attr.for]="elementId">{{fieldLabel}}</label>
          <div class="" [ngClass]="{'row':column || column!='','list-group':!column ||column==''}">
            <span class="col-sm-12" *ngIf="searchBox"><span class="col-sm-12"><input [(ngModel)]="textValue" type="text" class="form-control" placeholder="Please select" (keyup)="filterData($event)"></span></span>
            <span class="" [ngClass]="calculatedColSize" *ngFor="let row of viewData">
              <label class="form-check-label">
                <input [attr.id]="row.id" class="amexio-checkbox" type="checkbox" [checked]="row[valueField]"  (click)="setSelectedCheckBox(row, $event)"> 
                <label [attr.for]="row.id">
                  {{row[displayField]}}
                </label>
              </label>
            </span>
          </div>
        </div>
      </ng-container>
  
    `,
    providers : [CommonHttpService],
    styles : [`
        /**
 A Style Sheet for all form inputs common used classes
 */

/** Form Validations & Icon Positioning **/
.has-feedback-custom {
    position: relative;
}
.has-feedback-custom .form-control {
    padding-right: 47.5px;
}

.form-control-feedback-custom {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    display: block;
    width: 38px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    pointer-events: none;
}

.has-feedback-custom label ~ .form-control-feedback-custom {
    top: 32px;
}
.has-feedback-custom label.sr-only ~ .form-control-feedback-custom {
    top: 0;
}
      .amexio-checkbox-group{  
      }
    `]
})

export class CheckBoxGroup implements  OnInit, DoCheck {

    @Input() enableBoxStyle = false;

    @Input() fieldLabel : string;

    @Input() fieldName : string;

    @Input() dataReader : string;

    @Input() httpMethod : string;

    @Input() httpUrl : string;

    @Input() displayField : string;

    @Input() valueField : string;

    @Input()  searchBox : boolean;

    @Input()  checkBoxGroupBindData : any;

    @Input()    column: string;

    @Output() selectedValue : any = new EventEmitter<any>();

    calculatedColSize : any;

    elementId : string;

    data : any[];

    viewData : any[];

    textValue : string;

    selectedCheckBox : any[];

    divCss : string;

    responseData : any;

    previousValue : any;

    constructor(private amxHttp: CommonHttpService) {
        this.elementId = 'check-box-group-' + Math.floor(Math.random() * 90000) + 10000;
        this.selectedCheckBox = [];
       this.divCss = 'amexio-checkbox-group';
    }

    ngOnInit() {
        this.calculatedColSize = CHECK_COLUMN_SIZE + this.column;
        if (this.httpMethod && this.httpUrl) {
            this.amxHttp.fetchData(this.httpUrl, this.httpMethod).subscribe(
                response => {
                    this.responseData = response.json();
                },
                error => {
                },
                () => {
                    this.setData(this.responseData);
                }
            );
        }else if (this. checkBoxGroupBindData) {
            this.previousValue = JSON.parse(JSON.stringify(this.checkBoxGroupBindData));
            this.setData(this. checkBoxGroupBindData);
        }
    }

    ngDoCheck() {
        if (JSON.stringify(this.previousValue) != JSON.stringify(this.checkBoxGroupBindData)) {
            this.previousValue = JSON.parse(JSON.stringify(this.checkBoxGroupBindData));
            this.setData(this.checkBoxGroupBindData);
        }
    }

    setData(httpResponse: any){
        this.data = this.getResponseData(httpResponse);
        this.viewData = this.getResponseData(httpResponse);
        let viewDataWithIdArray: any[] = [];
        this.viewData.forEach(
          (viewDataObject) => {
            viewDataObject.id = 'checkbox' + Math.floor(Math.random() * 90000) + 10000;
            viewDataWithIdArray.push(viewDataObject);
          }
        );
        this.viewData = [];
        this.viewData = viewDataWithIdArray;
    }


    getResponseData(httpResponse: any) {
        let responsedata = httpResponse;
        let dr = this.dataReader.split('.');
        for (let ir = 0 ; ir < dr.length; ir++){
            responsedata = responsedata[dr[ir]];
        }
        return responsedata;
    }

    filterData(event: any) {
        if (this.textValue.length > 0){
            this.viewData = [];
            for (let vd = 0 ; vd < this.data.length; vd++){
                let displayData = this.data[vd][this.displayField];
                if (displayData.toLowerCase().startsWith(this.textValue)){
                    this.viewData.push(this.data[vd]);
                }
            }
        }else{
            this.viewData = this.data;
        }

    }

    setSelectedCheckBox(rowData: any, event: any){
        if (event.currentTarget.checked){
            this.selectedCheckBox.push(rowData);
        } else {
            let indexOf = this.selectedCheckBox.indexOf(rowData);
            delete this.selectedCheckBox[indexOf];
        }

        this.emitSelectedRows();
    }

    emitSelectedRows(){
        let sRows = [];
      let cloneSelectedChecks = JSON.parse(JSON.stringify(this.selectedCheckBox));
        for (let sr = 0; sr < cloneSelectedChecks.length; sr++) {
            if (cloneSelectedChecks[sr]) {
                //remove id from selected value
                delete cloneSelectedChecks[sr].id;
                sRows.push(cloneSelectedChecks[sr]);
            }
        }
        this.selectedValue.emit(sRows);
    }
}
