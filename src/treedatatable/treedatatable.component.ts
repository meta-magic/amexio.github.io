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

import {
    OnInit, Input, Component, SimpleChange, EventEmitter, Output, QueryList, ContentChildren, AfterContentInit
} from '@angular/core';
import {CommonHttpService} from '../common.http.service';
import {ColumnComponent} from "../datatable/column.component";


@Component({
    selector : 'amexio-tree-data-table',
    template : `<table  class="table table-hover table-bordered ">
        <thead>
        <tr>
            <td [attr.colspan]="columns.length" width="100%" align="right">

          <span class="amexio-tredatatable-float-left">
            <b>{{title}}</b>
          </span>

                <span class="amexio-tredatatable-float-right">
            <div class="dropdown">
              <a data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-list" aria-hidden="true"></i></a>
                  <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                          &nbsp;&nbsp;<b> Show Columns</b>
                      </li>
                      <li *ngFor="let cols of columns">
                          <div class="checkbox">
                              <label>
                                  &nbsp;&nbsp;<input type="checkbox" (click)="setColumnVisiblity(cols.dataIndex)" [attr.checked]="!cols.hidden ? true: null"> {{cols.text +" "}}
                              </label>
                          </div>
                      </li>
                  </ul>
            </div>
          </span>
            </td>
        </tr>


        <tr>
            <td  *ngFor="let cols of columns" [hidden]="cols.hidden" >
                <b><a (click)="setSortColumn(cols)">{{cols.text}}</a></b>
            </td>
        </tr>

        </thead>

        <tr [ngClass]="{'amexio-treedatatable-hiderow' : !(viewRows.length > 0),'amexio-treedatatable-showrow' : viewRows.length > 0}"  *ngFor="let row of viewRows let rowIndex = index" [hidden]="!row.visible" (click)="setSelectedRow(row, $event)">
            <td *ngFor="let cols of columns let colIndex = index" [hidden] ="cols.hidden" >
                <div class="amexio-treedatatable-col-0" *ngIf="colIndex == 0" 
                     [ngStyle]="{left: row.level*15+'px'}" (click)="toggle(row,rowIndex)">
                  <span *ngIf="colIndex == 0" class="fa " [ngClass]="{'fa-minus': row.expanded, 'fa-plus': (!row.expanded && row.haschildren)}" aria-hidden="true">
                  </span>
                    {{row[cols.dataIndex]}}
                </div>

                <span *ngIf="colIndex > 0" >{{row[cols.dataIndex]}}</span>

            </td>
        </tr>

        <tr *ngIf="viewRows.length == 0">
            <td colspan="3" class="loading-mask amexio-treedatatable-loadingmask-height">

            </td>
        </tr>
    </table>`,
    providers : [CommonHttpService],
    styleUrls: [
        '../baseclass/loading-mask.css',
        'treedatatable.custom.css'
    ]
})

export class TreeDataTableComponent implements  OnInit, AfterContentInit{

    @Input()    title: string;

    @Input()    httpUrl: string;

    @Input()    httpMethod: string;

    @Input()    dataReader: string;

    @Input()    dataTableBindData: any[];

    @Input()    pageSize: number;

    @Output()    selectedRecord: any = new EventEmitter<any>();

    data: any;

    viewRows: any[] = [];

    columns: any[] = [];

    sortColumn: any;

    responseData: any;

    @ContentChildren(ColumnComponent) columnRef: QueryList<ColumnComponent>;

    constructor (private  treeDataTableService: CommonHttpService) {
    }

    ngOnInit(){
        if (this.httpMethod && this.httpUrl){

            this.treeDataTableService.fetchData(this.httpUrl, this.httpMethod).subscribe(
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
    }

    ngAfterContentInit() {
        this.createConfig();
    }

    createConfig() {
        let columnRefArray = [];
        columnRefArray = this.columnRef.toArray();
        for (let cr = 0 ; cr < columnRefArray.length; cr++) {
            const columnConfig = columnRefArray[cr];
            let columnData: any;
            if (columnConfig.bodyTemplate == null && columnConfig.headerTemplate == null) {
                columnData = {
                    text: columnConfig.text, dataIndex: columnConfig.dataIndex,
                    hidden: columnConfig.hidden, dataType : columnConfig.dataType
                };
            }

            this.columns.push(columnData);
        }
    }

    ngOnChanges(change: SimpleChange){
        if (this.dataTableBindData){
            this.setData(this.dataTableBindData);
        }
    }

    setData(httpResponse: any){
        let treedata = this.getResponseData(httpResponse);
        if (treedata){
            this.data = treedata;
        }

        this.viewRows = this.createViewRows(this.data, null);
        this.renderData();
    }

    toggle(rowData: any , rowIndex: number){
        this.toggleViewRows(rowData, !rowData.expanded, this.viewRows);
    }

    toggleViewRows(rowData : any , expanded1 : boolean, viewData: any){
        if (!rowData.leaf)
            rowData.expanded = expanded1;

        let expanded = rowData.expanded;
        let rowId = rowData.rowId;

        if (!rowData.level){
            rowData.level = 0;
        }

        for (let cr = 0 ; cr < viewData.length; cr ++) {
            let childRows = viewData[cr];

            if (childRows.parentId == rowId){
                childRows.visible = expanded;

                childRows.level = rowData.level + 1;
                childRows.tdclass = 'tree-grid-level-' + childRows.level;

                if (childRows.haschildren && !rowData.expanded ){
                    this.toggleViewRows(childRows, rowData.expanded, viewData);
                }
            }


        }
    }

    renderData(){
        for (let vr = 0 ; vr < this.viewRows.length; vr ++) {
            let childRows = this.viewRows[vr];
            if (childRows.parentId)
                childRows.visible = false;

            if (!childRows.parentId)
                childRows.visible = true;
        }
    }

    createViewRows(data : any, parentId : any){
        let viewTreeTableData = [];
        for (let d = 0 ; d < data.length; d ++){
            let td = JSON.parse(JSON.stringify(data[d]));
            let rowId = Math.random();
            if (td.children && td.children.length > 0){
                td['leaf'] = false;
                td['haschildren'] = true;
                td['visible'] = true;
            }else{
                td['leaf'] = true;
                td['haschildren'] = false;
                td['visible'] = false;
            }
            td['expanded'] = false;
            td['rowId'] = rowId;
            td['level'] = 1;
            td['tdclass'] = 'tree-grid-level-1';

            if (parentId)
                td['parentId'] = parentId;


            viewTreeTableData.push(td);

            if (td.children && td.children.length > 0){
                let dataArray : any = this.createViewRows(td.children, rowId);
                for (let d1 = 0 ; d1 < dataArray.length; d1 ++) {
                    let td1 = dataArray[d1];
                    viewTreeTableData.push(td1);
                }
                delete td.children;
            }


        }
        return viewTreeTableData;
    }


    getResponseData(httpResponse : any){
        let responsedata = httpResponse;
        let dr = this.dataReader.split('.');
        for (let ir = 0 ; ir < dr.length; ir++){
            responsedata = responsedata[dr[ir]];
        }
        return responsedata;
    }

    setSelectedRow(rowData : any, event: any){
        this.selectedRecord.emit(rowData);
    }

    setSortColumn(col: any){
        console.log(col);
        this.sortColumn = col;
        this.sortData();
    }

    sortData(){
        if (this.sortColumn){
            if (this.sortColumn.dataIndex && this.sortColumn.dataType){
                let dataIndex = this.sortColumn.dataIndex;
                let sortColDataIndex = dataIndex;
                if (this.sortColumn.dataType == 'string'){
                    this.data.sort((a : any, b : any) => {
                        debugger;
                        let x = a[sortColDataIndex].toLowerCase();
                        let y = b[sortColDataIndex].toLowerCase();
                        if (x < y) {return -1; }
                        if (x > y) {return 1; }
                        return 0;
                    });
                    this.viewRows = this.createViewRows(this.data, null);
                    this.renderData();
                }
                else if (this.sortColumn.dataType == 'number'){
                    this.data.sort((a: any, b: any) => {
                        let x = a[sortColDataIndex];
                        let y = b[sortColDataIndex];
                        return x - y;
                    });
                    this.viewRows = this.createViewRows(this.data, null);
                    this.renderData();
                }
            }
        }
    }


    setColumnVisiblity(dataIndex : string){
        for (let ic = 0; ic < this.columns.length; ic++){
            let col = this.columns[ic];
            if (col.dataIndex == dataIndex){
                col.hidden = !col.hidden;
            }
        }
    }


}
