/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author -  Dattaram Gawas
 *
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataTableService} from "./datatable.service";

declare var $;
@Component({
    selector: 'filter-component',
    template:`
        <div class="row">
            <div class="col-md-6 col-xs-8">
                <ng-container *ngIf="column.dataType==='string'">
                    <div class="input-group">
                        <input  [attr.id]="column.text"  type="text" class="form-control" [(ngModel)]="filterValue" [attr.placeholder]="column.text" aria-describedby="basic-addon1" (keyup)="keyUpSearch(column)">
                    </div>
                </ng-container>
                <ng-container *ngIf="column.dataType==='number'">
                    <div class="input-group" >
                        <input [attr.id]="column.text"  type="number" class="form-control" [(ngModel)]="filterValue" [attr.placeholder]="column.text" aria-describedby="basic-addon1" (keyup)="keyUpSearch(column)">
                    </div>
                </ng-container>
            </div>
            <div class="col-md-2 col-xs-2  ">
                <div class="btn-group">
                    <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        <span class="glyphicon glyphicon-filter" aria-hidden="true"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li *ngFor="let opt of filterOptions"><a (click)="selectedOption(column,opt)" *ngIf="opt.type==column.dataType">{{opt.key}}</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-2 col-xs-2 ">
                <button *ngIf="column.filterIcon" type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" (click)="removeFilter(column)" >
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
            </div>

        </div>



    `
})
export class FilterComponent implements OnInit {
    @Input() column: any;

    @Output() filterObject: any = new EventEmitter<any>();

    filterValue :any;

    filterOptions : any;
    constructor(private dataTableService : DataTableService) {

        this.filterOptions=[
            {
                "key":"Is Equal To",
                "value":"==",
                "type":"string",
            },
            {
                "key":"Is Not Equal To",
                "value":"!=",
                "type":"string"
            },
            {
                "key":"Start With",
                "value":"1",
                "type":"string"
            },
            {
                "key":"Ends With",
                "value":"2",
                "type":"string"
            },
            {
                "key":"Is Equal To",
                "value":"==",
                "type":"number",
            },
            {
                "key":"Is Not Equal To",
                "value":"!=",
                "type":"number"
            },
            {
                "key":"Is greater Than",
                "value":"<",
                "type":"number"
            },
            {
                "key":"Is less Than",
                "value":">",
                "type":"number"
            },

            {
                "key":"Is less Than or equal to",
                "value":">=",
                "type":"number"
            },
            {
                "key":"Is greater Than or equal to",
                "value":"=<",
                "type":"number"
            }
        ]

    }

    ngOnInit() {
    }

    selectedOption(col : any,opt: any){
        if(this.filterValue){
            let filter : any = {};
            col.filterIcon = true;
            filter['key']=col.dataIndex;
            filter['value']=this.filterValue;
            filter['filter']=opt.value;
            filter['type']=col.dataType;
            this.dataTableService.filteredObject.forEach((option,index)=>{
                if(option.key==col.dataIndex){
                    this.dataTableService.filteredObject.splice(index,1);
                }
            });
            this.dataTableService.filteredObject.push(filter);
            this.filterObject.emit(this.dataTableService.filteredObject);
        }
    }

    keyUpSearch(col : any){
        debugger;
        col.filterIcon = true;
        let filter : any = {};
        filter['key']=col.dataIndex;
        filter['value']=this.filterValue;
        if(col.dataType=='string')
            filter['filter']=1;
        else
            filter['filter']='=<';
        filter['type']=col.dataType;
        this.dataTableService.filteredObject.forEach((option,index)=>{
            if(option.key==col.dataIndex){
                this.dataTableService.filteredObject.splice(index,1);
            }
        });
        this.dataTableService.filteredObject.push(filter);
        this.filterObject.emit(this.dataTableService.filteredObject);
    }

    removeFilter(column : any){
        column.filterIcon=false;
        $('#'+column.text).val("");
        this.dataTableService.filteredObject.forEach((option,index)=>{
            if(option.key==column.dataIndex){
                this.dataTableService.filteredObject.splice(index,1);
            }
        });
        this.filterObject.emit(this.dataTableService.filteredObject);

    }
}
