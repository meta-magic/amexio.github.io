/**
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Created by Ketan Gote on 8/8/17.
 */


import {
    Component, ContentChild, DoCheck, EventEmitter, Input, OnInit, Output, TemplateRef
} from '@angular/core';
import {Http} from "@angular/http";
import {CommonHttpService} from "../common.http.service";



@Component({
    selector: 'amexio-listbox',
    template : `

        <div class="amexio-listbox">
            <ul  class="list-group amexio-listbox-list">
                <li  *ngIf="(filter == true)"  class="list-group-item amexio-listbox-list-item amexio-listbox-search">
                    <input type="text" class="form-control"  [(ngModel)]="filterText"  [placeholder]="searchPlaceHolder" (keyup)="filterData()">
                </li>
                <li class="list-group-item  amexio-listbox-list-item" *ngFor="let row of viewData let rowno = index ">
                    <div>
                <span *ngIf="(enableCheckbox == true)">
                  <input type="checkbox" (click)="selectedCheckBox($event,rowno,row)"/>
                </span>
                    </div>
                    <div>
                <span (click)="onClick(row)" >
                    <ng-container *ngIf="!bodyTemplate"> {{row[displayField]}}</ng-container>
                    <ng-template *ngIf="bodyTemplate" [ngTemplateOutlet]="bodyTemplate" [ngOutletContext]="{ row: row }"></ng-template>
                </span>
                    </div>
                </li>
            </ul>
        </div>


    `

    ,

    styles:[
            `
            .amexio-listbox{

            }

            .amexio-listbox-list{

            }

            .amexio-listbox-list-item{

            }

            .amexio-listbox-search{

            }

        `
    ]

})
export class ListBoxComponent implements OnInit, DoCheck{


    @Input() enableCheckbox : boolean;

    @Input() searchPlaceHolder: string;

    @Input() filter : boolean;

    @Input() data : any;

    @Input() dataReader : string;

    @Input() displayField: string;

    @Output() selectedRows : any = new EventEmitter<any>();

    @Output() rowClick : any = new EventEmitter<any>();

    @Input() httpMethod : string;

    @Input() httpUrl : string;

    @Input() valueField : string;

    @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;

    viewData : any[];

    orgData : any[];

    filterText: string;

    selectedData : any[];

    previousData : any;

    responseData : any;

    constructor(private _http : Http,private amxHttp: CommonHttpService){
        this.filter = false;
        this.enableCheckbox = false;
        this.selectedData = [];
        this.searchPlaceHolder = "Search";
    }


    ngOnInit(){
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
        }
        if (this.data ) {
            this.previousData = JSON.parse(JSON.stringify(this.data));
            this.setData(this.data);
        }
    }

    ngDoCheck(){
        if (JSON.stringify(this.previousData) != JSON.stringify(this.data)){
            this.previousData = JSON.parse(JSON.stringify(this.data));
            this.setData(this.data);
        }
    }

    setData(httpResponse : any){
        let responsedata = httpResponse;
        let dr = this.dataReader.split(".");
        for(let ir = 0 ; ir<dr.length; ir++){
            responsedata = responsedata[dr[ir]];
        }
        this.viewData = responsedata;
        this.orgData = JSON.parse(JSON.stringify(this.viewData));
    }

    filterData(){
        const tData = JSON.parse(JSON.stringify(this.orgData));
        const nodes = this.searchTree(tData, this.filterText);
        this.viewData = nodes;
    }

    searchTree(data: any[], matchingTitle: string) {
        let disp = this.displayField;
        let res = data.filter(function f(node) {

            if (node[disp].toLowerCase().startsWith(matchingTitle.toLowerCase())) {
                return true;
            }
            if (node.children) {
                return (node.children = node.children.filter(f)).length;
            }
        });
        return res;
    }

    selectedCheckBox(event:any,rowno: number,data:any){
        if(event.currentTarget.checked){
            this.selectedData.push(data);
        }
        else{
            var indexOf = this.selectedData.indexOf(data);
            delete this.selectedData[indexOf];
        }

        const sdata = []

        for(var i=0;i<this.selectedData.length;i++){

            if(this.selectedData[i]){
                sdata.push(this.selectedData[i]);
            }
        }

        this.selectedRows.emit(sdata);
    }

    onClick(data:any){
        this.rowClick.emit(data);
    }
}
