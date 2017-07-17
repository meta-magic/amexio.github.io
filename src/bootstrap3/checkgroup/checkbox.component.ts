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
import {CheckBoxService} from "./checkbox.service";

export const CHECK_COLUMN_SIZE = 'col-lg-';
@Component({
    selector : 'amexio-checkbox',
    template: `
        <div [attr.class]="divCss">
            <br>
            <label  [attr.for]="elementId">{{fieldLabel}}</label>
            <div style="overflow: auto;">
                <ul class="list-group">
                    <li class="list-group-item" *ngIf="searchBox"><span><input [(ngModel)]="textValue" type="text" class="form-control" placeholder="Please select" (keyup)="filterData($event)"></span></li>
                    <li [attr.class]="'list-group-item '+column" *ngFor="let row of viewData">
                        <label>
                            <input  type="checkbox" [checked]="row[valueField]"  (click)="setSelectedCheckBox(row, $event)"> {{row[displayField]}}
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    `,
    providers : [CheckBoxService]
})

export class CheckBoxComponent implements  OnInit{

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

    elementId : string;

    data : any[];

    viewData : any[];

    textValue : string;

    selectedCheckBox : any[];

    divCss : string;


    constructor(private checkBoxGroupService: CheckBoxService) {
        this.elementId = "check-box-group-"+new Date().getTime();
        this.selectedCheckBox = [];
    }

    ngOnInit() {
    }

    ngAfterViewInit(){
      this.column = CHECK_COLUMN_SIZE+this.column;
        if(this.httpMethod && this.httpUrl){
            this.checkBoxGroupService.fetchData(this,this.httpUrl,this.httpMethod);
        }else if(this.checkBoxGroupDownBindData){
            this.setData(this.checkBoxGroupDownBindData);
        }
    }

    setData(httpResponse: any){
        this.data = this.getResponseData(httpResponse);
        this.viewData = this.getResponseData(httpResponse);
    }


    getResponseData(httpResponse : any){
        var responsedata = httpResponse;
        var dr = this.dataReader.split(".");
        for(var ir = 0 ; ir<dr.length; ir++){
            responsedata = responsedata[dr[ir]];
        }
        return responsedata;
    }

    filterData(event : any){
        if(this.textValue.length>0){
            this.viewData = [];
            for(var vd = 0 ; vd<this.data.length;vd++){
                var displayData = this.data[vd][this.displayField];
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
            var indexOf = this.selectedCheckBox.indexOf(rowData);
            delete this.selectedCheckBox[indexOf];
        }
        this.emitSelectedRows();
    }

    emitSelectedRows(){
        var sRows = [];
        for(var sr=0; sr<this.selectedCheckBox.length;sr++){
            if(this.selectedCheckBox[sr]){
                sRows.push(this.selectedCheckBox[sr]);
            }
        }
        this.selectedValue.emit(sRows);

    }
}
