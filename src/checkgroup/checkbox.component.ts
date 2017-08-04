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

import {OnInit, SimpleChange, Input, Output, EventEmitter, Component} from '@angular/core';
import {CommonHttpService} from '../common.http.service';

export const CHECK_COLUMN_SIZE = 'col-lg-';
@Component({
    selector : 'amexio-checkbox',
    template: `
        <div [attr.class]="divCss">
            <label  *ngIf="fieldLabel" [attr.for]="elementId">{{fieldLabel}}</label>
            <div class="" [ngClass]="{'row':column || column!='','list-group':!column ||column==''}">
                <li class="list-group-item col-sm-12" *ngIf="searchBox"><span class="col-sm-12"><input [(ngModel)]="textValue" type="text" class="form-control" placeholder="Please select" (keyup)="filterData($event)"></span></li>
                <li class="list-group-item" [ngClass]="calculatedColSize" *ngFor="let row of viewData">
                    <label class="form-check-label">
                        <input  type="checkbox" [checked]="row[valueField]"  (click)="setSelectedCheckBox(row, $event)"> {{row[displayField]}}
                    </label>
                </li>
            </div>
        </div>
    `,
    providers : [CommonHttpService],
    styles : [`
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

        .searchIconPos{
            position: absolute;
            right: 5px;
            top: 15px;
            bottom: 0;
            height: 14px;
            margin: auto;
            font-size: 14px;
            cursor: pointer;
            color: #ccc;
        }
        .showIcon{
            visibility: visible;
        }
        .hideIcon{
            visibility: hidden;
        }
        .scrollable-options {
            height: auto;
            max-height: 200px;
            overflow-x: hidden;
        }
    `]
})

export class CheckBoxGroup implements  OnInit{

    @Input() fieldLabel : string;

    @Input() fieldName : string;

    @Input() dataReader : string;

    @Input() httpMethod : string;

    @Input() httpUrl : string;

    @Input() displayField : string;

    @Input() valueField : string;

    @Input()  searchBox :boolean;

    @Input() checkBoxGroupDownBindData : any;

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


    constructor(private amxHttp: CommonHttpService) {
        this.elementId = 'check-box-group-'+new Date().getTime();
        this.selectedCheckBox = [];
    }

    ngOnInit() {
        this.calculatedColSize = CHECK_COLUMN_SIZE+this.column;
        if(this.httpMethod && this.httpUrl){
            this.amxHttp.fetchData(this.httpUrl,this.httpMethod).subscribe(
                response=>{
                    this.responseData = response.json();
                },
                error=>{
                },
                ()=>{
                    this.setData(this.responseData);
                }
            );
        }else if(this.checkBoxGroupDownBindData){
            this.setData(this.checkBoxGroupDownBindData);
        }
    }

    ngAfterViewInit(){
        /*  this.column = CHECK_COLUMN_SIZE+this.column;
         if(this.httpMethod && this.httpUrl){
         this.amxHttp.fetchData(this.httpUrl,this.httpMethod).subscribe(
         response=>{
         this.responseData = response.json();
         },
         error=>{
         },
         ()=>{
         this.setData(this.responseData);
         }
         );
         }else if(this.checkBoxGroupDownBindData){
         this.setData(this.checkBoxGroupDownBindData);
         }*/
    }

    setData(httpResponse: any){
        this.data = this.getResponseData(httpResponse);
        this.viewData = this.getResponseData(httpResponse);
    }


    getResponseData(httpResponse : any){
        let responsedata = httpResponse;
        let dr = this.dataReader.split(".");
        for(let ir = 0 ; ir<dr.length; ir++){
            responsedata = responsedata[dr[ir]];
        }
        return responsedata;
    }

    filterData(event : any){
        if(this.textValue.length>0){
            this.viewData = [];
            for(let vd = 0 ; vd<this.data.length;vd++){
                let displayData = this.data[vd][this.displayField];
                if(displayData.toLowerCase().startsWith(this.textValue)){
                    this.viewData.push(this.data[vd]);
                }
            }
        }else{
            this.viewData = this.data;
        }

    }

    setSelectedCheckBox(rowData:any, event:any){
        if(event.currentTarget.checked){
            this.selectedCheckBox.push(rowData);
        }
        else{
            let indexOf = this.selectedCheckBox.indexOf(rowData);
            delete this.selectedCheckBox[indexOf];
        }
        this.emitSelectedRows();
    }

    emitSelectedRows(){
        let sRows = [];
        for(let sr=0; sr<this.selectedCheckBox.length;sr++){
            if(this.selectedCheckBox[sr]){
                sRows.push(this.selectedCheckBox[sr]);
            }
        }
        this.selectedValue.emit(sRows);

    }
}
