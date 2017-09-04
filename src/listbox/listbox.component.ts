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
    Component, ContentChild, EventEmitter, Input, OnInit, Output,
    TemplateRef
} from '@angular/core';
import {Http} from "@angular/http";
import {CommonHttpService} from "../common.http.service";



@Component({
    selector: 'amexio-listbox',
    template : `
        <div [ngClass]="cClass" style="padding: 10px;" >
            <table class="list-group">
                <tr *ngIf="(filter == true)" class="list-group-item">
                    <td colspan="2" width="90%">
                        <input type="text" class="form-control"  [(ngModel)]="filterText"  placeholder="Search" (keyup)="filterData()">
                    </td>
                </tr>
                <tr class="list-group-item" *ngFor="let row of viewData let rowno = index ">
                    <td *ngIf="(enableCheckbox == true)" style="padding: 10px; ">
                        <input type="checkbox" (click)="selectedCheckBox($event,rowno,row)"/>
                    </td>
                    <td (click)="onClick(row)" style="cursor: pointer;" >
                        <ng-container *ngIf="!bodyTemplate"> {{row[displayField]}}</ng-container>
                        <ng-template *ngIf="bodyTemplate" [ngTemplateOutlet]="bodyTemplate" [ngOutletContext]="{ row: row }"></ng-template>
                    </td>
                </tr>
            </table>
        </div>
    `

})
export class ListBoxComponent implements OnInit{


    @Input() enableCheckbox : boolean;

    @Input() filter : boolean;

    @Input() data : any;

    @Input() dataReader : string;

    @Input() displayField: string;

    @Output() selectedRows : any = new EventEmitter<any>();

    @Output() rowClick : any = new EventEmitter<any>();

    @Input() httpUrl: string;

    @Input() httpMethod: string;

    @Input() cClass:string;

    @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;

    viewData : any[];

    orgData : any[];

    filterText: string;

    selectedData : any[];

    response : any;

    constructor(private _http : Http,private listBoxService: CommonHttpService){
        this.filter = false;
        this.enableCheckbox = false;
        this.selectedData = [];
    }


    ngOnInit(){
      if (this.httpMethod && this.httpUrl) {
        this.listBoxService.fetchData(this.httpUrl, this.httpMethod).subscribe(
          response => {
            this.response = response.json();
          },
          error => {
          },
          () => {
            this.setData(this.response);
          }
        );
      }
        else if(this.data){
            this.setData(this.data);
        }
    }

    setData(httpResponse : any){
        let responsedata = httpResponse;
        if(this.dataReader != null){
          let dr = this.dataReader.split(".");
          for(let ir = 0 ; ir<dr.length; ir++){
            responsedata = responsedata[dr[ir]];
          }
        }
        else{
          responsedata = httpResponse;
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
