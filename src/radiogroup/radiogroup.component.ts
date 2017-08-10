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

import {OnInit, SimpleChange, Input, Output, EventEmitter, Component} from "@angular/core";
import {CommonHttpService} from "../common.http.service";

export const COLUMN_SIZE = 'col-lg-';
@Component({
    selector : 'amexio-radio-group',
    template : `
        <div class="form-group">
            <br>
            <label  [attr.for]="elementId">{{fieldLabel}}</label>

            <div class="" [ngClass]="{'row':column || column!='','list-group':!column ||column==''}">
                <li class="list-group-item col-sm-12" *ngIf="searchBox"><span class="col-sm-12">
              <input [(ngModel)]="textValue" type="text" class="form-control" placeholder="Please select" (keyup)="filterData($event)">
            </span></li>
                <li class="list-group-item" [ngClass]="calculatedColSize"  *ngFor="let row of viewData;let i = index">
                    <label class="custom-control custom-radio">
                        <input class="custom-control-input" [attr.id]="elementId+'CNT'+i" type="radio" [required]="allowBlank ? true: null"  [attr.name] = "fieldName" (click)="setSelectedCheckBox(row, $event)">
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">{{row[displayField]}}</span>
                    </label>
                </li>
            </div>

        </div>

    `,
    styleUrls : [
        `../baseclass/form.inputs.base.css`
    ]
})

export class RadioGroupComponent implements  OnInit{

    @Input()    fieldLabel : string;

    @Input()    fieldName : string;

    @Input()    allowBlank : boolean;

    @Input()    dataReader : string;

    @Input()    httpMethod : string;

    @Input()    httpUrl : string;

    @Input()    displayField : string;

    @Input()    valueField : string;

    @Input()    radioGroupBindData : any;

    @Input()    searchBox : boolean;

    @Input()    column: string;

    @Output()   selectedValue : any = new EventEmitter<any>();

    elementId : string;

    data : any[];

    viewData : any[];

    textValue : string;

    selectedCheckBox : any[];

    responseData : any;

    calculatedColSize : any;


    constructor(private amxHttp: CommonHttpService) {
        this.elementId = "radio-group-"+Math.floor(Math.random()*90000) + 10000;
        this.selectedCheckBox = [];
    }

    ngOnInit() {
        this.calculatedColSize = COLUMN_SIZE+this.column;
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
        }else if(this.radioGroupBindData){
            this.setData(this.radioGroupBindData);
        }
    }

    ngAfterViewInit(){

    }

    setData(httpResponse: any){
        this.data = this.getResponseData(httpResponse);
        this.viewData = this.getResponseData(httpResponse);
    }


    getResponseData(httpResponse : any){
        let responsedata = httpResponse;
        let dr = this.dataReader.split(".");
        if(dr!=null){
            for(let ir = 0 ; ir<dr.length; ir++){
                responsedata = responsedata[dr[ir]];
            }
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
