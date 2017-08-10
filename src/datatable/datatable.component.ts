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
  Input, OnInit, forwardRef, Component, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter,
   SimpleChanges, AfterViewChecked, OnDestroy, ChangeDetectorRef, AfterViewInit, OnChanges
} from '@angular/core';
import { NG_VALUE_ACCESSOR} from '@angular/forms';
import {ColumnComponent} from './column.component';
import {CommonHttpService} from '../common.http.service';


const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DataTableComponent),
    multi: true
};
declare var $;
@Component({
    selector: 'amexio-data-table',
    template : `
        <div>
          <ng-content></ng-content>
        </div>
        <div class="amexio-datatable-wrap">
          <table class="table table-sm  table-bordered amexio-datatable-width" [attr.id]="elementId" (window:resize)="onResize($event)">
            <tr>
              <td [attr.colspan]="columns?.length + (checkboxSelect? 1: 0)" width="100%" data align="right">
        <span class="amexio-datatable-title">
      <b>{{title}}</b>
      </span>
      <span class="col-xs-12 amexio-datatable-opertions">
        <div class="btn-group btn-group-sm" role="group" aria-label="Button group with nested dropdown">
            <ng-container *ngIf="groupByColumn">
                   <amexio-dropdown [(ngModel)]="groupByColumnIndex"
                                    [placeholder]="'Choose Column'"
                                    name="groupByColumnIndex"
                                    [dataReader]="'response.data'"
                                    [data]="dropdownData"
                                    [displayField]="'text'"
                                    [valueField]="'dataIndex'"
                                    (onSingleSelect)="setColumnData()">
                   </amexio-dropdown>
               </ng-container>
          <button type="button" class="btn btn-secondary" aria-label="Previous" (click)="prev()"><span aria-hidden="true">&laquo;</span></button>
          <button type="button" class="btn btn-secondary">({{currentPage}} of {{maxPage}})</button>
          <div class="input-group-btn">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-bars"></i> Page - {{currentPage}}
            </button>
            <div class="dropdown-menu dropdown-menu-right amexio-datatable-dropdown-action">
              <li *ngFor="let row of pageNumbers let pageNo = index " class="dropdown-item" value="{{pageNo+1}}"><a (click)="setPageNo(pageNo+1)">{{pageNo+1}}</a></li>
            </div>
          </div>
          <div class="input-group-btn">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item"><b> Show Columns</b></a>
              <a class="dropdown-item" *ngFor="let cols of columns;let i = index;">
              <label class="form-check-label">
              <input class="form-check-input" type="checkbox" (click)="setColumnVisiblity(cols.dataIndex)" [attr.checked]="!cols.hidden ? true: null"> {{cols.text +" "}}
              </label>
              </a>
            </div>
          </div>
          <button type="button" class="btn btn-secondary" aria-label="Next" (click)="next()"><span aria-hidden="true">&raquo;</span></button>
        </div>
      </span>
              </td>
            </tr>
          </table>
          <!--filtering changes-->
          <table class="table table-sm">
            <tr *ngIf="filtering && !groupByColumn">
              <ng-container *ngIf="!smallScreen">
                <td *ngIf="checkboxSelect" style="width: 10%"></td>
                <td *ngFor="let cols of columns let index=index" [hidden]="cols.hidden">
                  <amexio-filter-component [column]="cols" (filterObject)="getFilteredData($event)"></amexio-filter-component>
                </td>
              </ng-container>
              <ng-container *ngIf="smallScreen">
                <td>
                  <div class="amexio-datatable-small-word-wrap" *ngFor="let cols of columns" [hidden]="cols.hidden">
                    <amexio-filter-component [column]="cols" (filterObject)="getFilteredData($event)"></amexio-filter-component>
                  </div>
                </td>
              </ng-container>
            </tr>
          </table>
          <table class="table table-sm  table-hover  table-bordered ">
            <tr *ngIf="!smallScreen">
              <td *ngIf="checkboxSelect" style="width: 10%">
                <input type="checkbox" (click)="selectAllVisibleRows()">
              </td>
              <td *ngFor="let cols of columns let index=index" [hidden]="cols.hidden">
    <span style="cursor: pointer;" (click)="sortOnColHeaderClick(cols)">
      <!-- If user hasnt embedded view -->
      <ng-container *ngIf="!cols?.headerTemplate"><b>{{cols.text}}</b></ng-container>
      <!--Check if user has embedded view inserted then -->
      <ng-template *ngIf="cols?.headerTemplate" [ngTemplateOutlet]="cols?.headerTemplate" [ngOutletContext]="{ $implicit: { header: cols.text } }"></ng-template>
    </span>
                <span class="btn-group amexio-datatable-btngroup-span" role="group">
      <span class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="glyphicon glyphicon-triangle-bottom" style="color:#93a1a1"></span>
      </span>
      <div class="dropdown-menu dropdown-menu-right">
        <button class="btn btn-link" (click)="setSortColumn(cols,1)">
        <span class="glyphicon glyphicon glyphicon-sort-by-attributes pull-left"></span><span>&nbsp;Sort Ascending</span>
        </button>
        <button class="btn btn-link" (click)="setSortColumn(cols,2)">
        <span class="glyphicon glyphicon glyphicon glyphicon-sort-by-attributes-alt pull-left"></span><span>&nbsp;Sort Descending</span>
        </button>
      </div>
    </span>
              </td>
            </tr>
          </table>
          <div [ngStyle]="setHeight()">
            <table class="table table-sm   table-bordered ">
              <tbody *ngIf="!smallScreen">
              <ng-container *ngIf="groupByColumn">
                <tr [ngClass]="{'hiderow' : !(viewRows?.length > 0),'showrow' : viewRows?.length > 0}">
                  <td [attr.colspan]="columns?.length + (checkboxSelect? 1: 0)" width="100%">
                    <div class="list-group amexio-datatable-list-group" *ngFor="let row of viewRows;let i=index;">
              <span (click)="iconSwitch(row)" style="cursor: pointer;color: black;" data-toggle="collapse" [attr.data-target]="'#'+i" data-parent="#menu">
              <span [ngClass]="{'fa-caret-down':row.expanded,'fa-caret-right':!row.expanded}" class="fa " > &nbsp;&nbsp;</span>{{row.group}} <span class="badge badge-pill badge-default amexio-datatable-pagenumber">{{row.groupData?.length}}</span>
              </span>
                      <div [attr.id]="i" class="sublinks collapse">
                        <table class="table table-striped table-hover table-bordered">
                          <tbody>
                          <tr *ngFor="let rows of row.groupData let rowIndex = index" id="{{'row'+rowIndex}}" (click)="rowClick(rows, rowIndex)">
                            <td *ngIf="checkboxSelect" style="width: 10%">
                              <input type="checkbox" id="checkbox-{{elementId}}-{{rowIndex}}" [attr.checked]="selectAll? true: null" (click)="setSelectedRow(rows, $event)">
                            </td>
                            <td *ngFor="let cols of columns" [hidden]="cols.hidden">
                              <!-- If user hasnt specified customized cell use default -->
                              <ng-container *ngIf="!cols?.bodyTemplate">{{rows[cols.dataIndex]}}</ng-container>
                              <!-- else insert customized code -->
                              <ng-template *ngIf="cols.bodyTemplate" [ngTemplateOutlet]="cols.bodyTemplate" [ngOutletContext]="{ $implicit: { text : rows[cols.dataIndex] }, row: rows }"></ng-template>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr *ngIf="viewRows?.length == 0">
                  <td [attr.colspan]="columns?.length+1" class="loading-mask amexio-datatable-loadingmask">
                  </td>
                </tr>
              </ng-container>
              <ng-container *ngIf="!groupByColumn">
                <tr *ngIf="viewRows?.length==0">
                  <td class="amexio-datatable-width" >
                    <span>No Records Found</span>
                  </td>
                </tr>
                <tr [ngClass]="{'hiderow' : !(viewRows?.length > 0),'showrow' : viewRows?.length > 0}" style="cursor: pointer;" *ngFor="let row of viewRows let rowIndex = index " id="{{'row'+rowIndex}}" (click)="rowClick(row, rowIndex)" [class.info]="isSelected(rowIndex)">
                  <td *ngIf="checkboxSelect" style="width: 10%" >
                    <input type="checkbox" id="checkbox-{{elementId}}-{{rowIndex}}" [attr.checked]="selectAll? true: null" (click)="setSelectedRow(row, $event)">
                  </td>
                  <td *ngFor="let cols of columns let index=index" [hidden]="cols.hidden">
                    <!-- If user hasnt specified customized cell use default -->
                    <ng-container *ngIf="!cols?.bodyTemplate">{{row[cols.dataIndex]}}</ng-container>
                    <!-- else insert customized code -->
                    <ng-template *ngIf="cols.bodyTemplate" [ngTemplateOutlet]="cols.bodyTemplate" [ngOutletContext]="{ $implicit: { text : row[cols.dataIndex] }, row: row }"></ng-template>
                  </td>
                </tr>
                <tr *ngIf="viewRows?.length == 0">
                  <td [attr.colspan]="columns?.length+1" class="loading-mask amexio-datatable-loadingmask">
                  </td>
                </tr>
              </ng-container>
              </tbody>
              <tbody *ngIf="smallScreen">
              <ng-container *ngIf="groupByColumn">
                <tr [ngClass]="{'hiderow' : !(viewRows?.length > 0),'showrow' : viewRows?.length > 0}">
                  <td [attr.colspan]="columns?.length + (checkboxSelect? 1: 0)" width="100%">
                    <div class="list-group amexio-datatable-list-group" *ngFor="let row of viewRows;let i=index;">
              <span (click)="iconSwitch(row)" style="cursor: pointer;color: black;" data-toggle="collapse" [attr.data-target]="'#'+i" data-parent="#menu">
              <span [ngClass]="{'fa-caret-down':row.expanded,'fa-caret-right':!row.expanded}" class="fa " > &nbsp;&nbsp;</span>{{row.group}}<span class="badge amexio-datatable-float-right">{{row.groupData?.length}}</span>
              </span>
                      <div [attr.id]="i" class="sublinks collapse">
                        <table class="table table-bordered">
                          <tbody>
                          <tr *ngFor="let rows of row.groupData let rowIndex = index" id="{{'row'+rowIndex}}" (click)="rowClick(rows, rowIndex)">
                            <td *ngIf="checkboxSelect" style="width: 10%">
                              <input type="checkbox" id="checkbox-{{elementId}}-{{rowIndex}}" [attr.checked]="selectAll? true: null" (click)="setSelectedRow(rows, $event)">
                            </td>
                            <td [attr.colspan]="columns?.length-1">
                              <div class="amexio-datatable-small-word-wrap" *ngFor="let cols of columns" [hidden]="cols.hidden">
                                <b>{{cols.text}}</b> :
                                <!-- If user hasnt specified customized cell use default -->
                                <ng-container *ngIf="!cols?.bodyTemplate">{{rows[cols.dataIndex]}}</ng-container>
                                <!-- else insert customized code -->
                                <ng-template *ngIf="cols.bodyTemplate" [ngTemplateOutlet]="cols.bodyTemplate" [ngOutletContext]="{ $implicit: { text : rows[cols.dataIndex] }, row: rows }"></ng-template>
                              </div>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </ng-container>
              <ng-container *ngIf="!groupByColumn">
                <tr *ngIf="viewRows?.length==0">
                  <td class="amexio-datatable-width">
                    <span>No Records Found</span>
                  </td>
                </tr>
                <tr [ngClass]="{'hiderow' : !(viewRows?.length > 0),'showrow' : viewRows?.length > 0}" style="cursor: pointer" *ngFor="let row of viewRows let rowIndex = index " id="{{'row'+rowIndex}}" (click)="rowClick(row, rowIndex)" [class.info]="isSelected(rowIndex)">
                  <td *ngIf="checkboxSelect" style="width: 10%" >
                    <input type="checkbox" id="checkbox-{{elementId}}-{{rowIndex}}" [attr.checked]="selectAll? true: null" (click)="setSelectedRow(row, $event)">
                  </td>
                  <td>
                    <div class="amexio-datatable-small-word-wrap" *ngFor="let cols of columns" [hidden]="cols.hidden">
                      <b>{{cols.text}}</b> :
                      <!-- If user hasnt specified customized cell use default -->
                      <ng-container *ngIf="!cols?.bodyTemplate">{{row[cols.dataIndex]}}</ng-container>
                      <!-- else insert customized code -->
                      <ng-template *ngIf="cols.bodyTemplate" [ngTemplateOutlet]="cols.bodyTemplate" [ngOutletContext]="{ $implicit: { text : row[cols.dataIndex] }, row: row }"></ng-template>
                    </div>
                  </td>
                </tr>
              </ng-container>
              <tr *ngIf="viewRows?.length == 0">
                <td [attr.colspan]="columns?.length+1" class="loading-mask amexio-datatable-loadingmask">
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
    `,
    providers : [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CommonHttpService],
    styleUrls: ['datatable.custom.css']

})

export class DataTableComponent  implements OnInit, AfterContentInit, AfterViewInit, OnChanges {

    @Input() title: string;

    @Input() pageSize: number;

    @Input() httpUrl: string;

    @Input() httpMethod: string;

    @Input() dataReader: string;

    @Input() checkboxSelect: boolean;

    @Input() dataTableBindData: any;

    @Output()
    rowSelect: any = new EventEmitter <any>();

    @Output()
    selectedRowData: any = new EventEmitter<any>();

    @Input() height: string;

    @Input() width: string;

    @Input() groupByColumn = false;

    @Input() groupByColumnIndex: string;

    @Input() filtering: boolean;

    columns: any[];

    data: any[];

    viewRows: any[]= [];

    maxPage: number;

    currentPage: number;

    sortColumn: any;

    pageNumbers: number[];

    elementId: string;

    selectedRowNo: number;

    selectAll: boolean;

    selectedRows: any[];

    summary: any[];

    summaryData: any[];

    isSummary: boolean;

    smallScreen: boolean;

    sortBy: number;

    randomIDCheckALL: string;

    cloneData: any;

    dropdownData: any;

    responseData: any;

    filterCloneData: any;

    rowId : any;

    @ContentChildren(ColumnComponent) columnRef: QueryList<ColumnComponent>;
    constructor(private dataTableSevice: CommonHttpService, private cd: ChangeDetectorRef) {
        this.pageNumbers = [];
        this.currentPage = 1;
        this.elementId = 'mytable-' + Math.random();
        this.selectAll = false;
        this.selectedRows = [];
        this.isSummary = false;
        this.summaryData = [];
        this.summary = [];
        this.smallScreen = false;
        this.sortBy = -1;
        this.randomIDCheckALL = 'checkall-' + Math.floor(Math.random()*90000) + 10000;
    }

    ngOnInit() {
        if (window.innerWidth < 768) {
            this.smallScreen = true;
        }else {
            this.smallScreen = false;
          }
        if (this.httpMethod && this.httpUrl) {
            this.dataTableSevice.fetchData(this.httpUrl, this.httpMethod).subscribe(
                response => {
                    this.responseData = response.json();
                },
                error => {
                },
                () => {
                    this.setData(this.responseData);
                }
            );
        } else if (this.dataTableBindData) {
            this.setData(this.dataTableBindData);
        }
    }

    ngAfterViewInit() {

    }


    setHeight() {
        let height: any;
        if (this.height) {
            height = this.height + 'px';
        }
        let tableHeight;
        tableHeight = {
            'height': height,
            'overflow-y': 'auto'
        };
        return tableHeight;
    }


    ngAfterContentInit() {
        this.createConfig();
    }

    createConfig() {
        this.columns = [];
        this.createColumnConfig();
        for (let ir = 0 ; ir < this.columns.length; ir++){
            const column = this.columns[ir];

            if (column.summaryType && column.dataType && column.dataType === 'number') {
              this.isSummary = true;
            }
            this.summaryData.push(0);
            this.summary.push({summaryType: column.summaryType, summaryCaption : column.summaryCaption, data: []});
        }
        this.dropdownData = {
            'response': {
                'data': this.columns
            }
        };

    }

    createColumnConfig() {
        let columnRefArray = [];

        columnRefArray = this.columnRef.toArray();
        for (let cr = 0 ; cr < columnRefArray.length; cr++) {
            const columnConfig = columnRefArray[cr];
            let columnData: any;

            if (columnConfig.headerTemplate != null && columnConfig.bodyTemplate != null) {
              columnData = {
                text: columnConfig.text,
                dataIndex: columnConfig.dataIndex,
                hidden: columnConfig.hidden,
                dataType: columnConfig.dataType,
                headerTemplate: columnConfig.headerTemplate,
                bodyTemplate: columnConfig.bodyTemplate
              };
            } else if (columnConfig.headerTemplate != null && columnConfig.bodyTemplate == null) {
                columnData = {
                  text: columnConfig.text, dataIndex: columnConfig.dataIndex,
                  hidden: columnConfig.hidden, dataType : columnConfig.dataType,
                  headerTemplate : columnConfig.headerTemplate
                };
            } else if (columnConfig.bodyTemplate != null && columnConfig.headerTemplate == null) {
                columnData = {
                  text: columnConfig.text, dataIndex: columnConfig.dataIndex,
                  hidden: columnConfig.hidden, dataType : columnConfig.dataType,
                  bodyTemplate : columnConfig.bodyTemplate
                };
            } else if (columnConfig.bodyTemplate == null && columnConfig.headerTemplate == null) {
                columnData = {
                  text: columnConfig.text, dataIndex: columnConfig.dataIndex,
                  hidden: columnConfig.hidden, dataType : columnConfig.dataType
                };
            }
            if (columnConfig.summaryType) {
                columnData['summaryType'] = columnConfig.summaryType;
            }

            if (columnConfig.summaryCaption) {
                columnData['summaryCaption'] = columnConfig.summaryCaption;
            }

            this.columns.push(columnData);
        }

        /*------For column filtering icon switch--------*/
        this.columns.forEach((opt) => {
            opt['filterIcon'] = false;
        });

    }

    ngOnChanges(change: SimpleChanges) {
        if (change['dataTableBindData']) {
            const data: any = change['dataTableBindData'].currentValue;
            if (data) {
                this.setData(data);
            }
        }
    }

    setData(httpResponse: any) {
        this.data = this.getResponseData(httpResponse);
        if (this.groupByColumn) {
            this.cloneData = JSON.parse(JSON.stringify(this.data));
        }
        if (this.filtering) {
            this.filterCloneData = JSON.parse(JSON.stringify(this.data));
        }
        if (this.data.length > (1 * this.pageSize)) {
            this.maxPage = Math.floor((this.data.length / this.pageSize));

            if ((this.data.length % this.pageSize) > 0) {
                this.maxPage ++;
            }
        }
        for (let pageNo = 1; pageNo <= this.maxPage; pageNo++) {
            this.pageNumbers.push(pageNo);
        }
        this.createSummaryData();
        this.renderData();
        if (this.groupByColumn) {
            this.setColumnData();
        }

    }

    createSummaryData () {
        for (let sd = 0 ; sd < this.data.length; sd++) {
            const localData = this.data[sd];
            if (this.isSummary) {
                for (let ir = 0 ; ir < this.columns.length; ir++) {
                    const column = this.columns[ir];

                    if (column.summaryType && column.dataType && column.dataType === 'number') {
                        const colData = localData[column.dataIndex];

                        if (colData) {
                            const summaryData  = this.summary[ir];
                            if (summaryData && summaryData !== '') {
                              summaryData.data.push(colData);
                            }
                        }
                    }
                }
            }
        }

        for (let is = 0 ; is < this.summaryData.length ; is ++){
            if (this.summaryData[is] === 0) {
                this.summaryData[is] = '';
            }

            const summarized = this.summary[is];
            if (summarized) {
                const summaryType = summarized.summaryType;
                const summarizeData = summarized.data.sort((a: any, b: any) => {return a - b; });
                const summaryCaption = summarized.summaryCaption;

                if (summaryType) {
                    if (summaryType === 'sum') {
                        let sumValue = 0;
                        for (let s = 0 ; s < summarizeData.length ; s++) {
                            sumValue = sumValue + summarizeData[s];
                        }
                        this.summaryData[is] = summaryCaption + ' ' + sumValue;
                    } else if (summaryType === 'min') {
                        if (summarizeData) {
                            this.summaryData[is] = summaryCaption + ' ' + summarizeData[0];
                        }
                    } else if (summaryType === 'max') {
                        if (summarizeData) {
                            this.summaryData[is] = summaryCaption + ' ' + summarizeData[summarizeData.length - 1];
                        }
                    } else if (summaryType === 'avg') {
                        if (summarizeData) {
                            let sumValue = 0;
                            for (let s = 0 ; s < summarizeData.length ; s++) {
                                sumValue = sumValue + summarizeData[s];
                            }
                            this.summaryData[is] = summaryCaption + ' ' + Math.round(sumValue / summarizeData.length) ;
                        }
                    }
                }
            }
        }

    }

    getResponseData(httpResponse: any) {
        let responsedata = httpResponse;
        const dr = this.dataReader.split('.');
        for (let ir = 0 ; ir < dr.length; ir++) {
            responsedata = responsedata[dr[ir]];
        }
        return responsedata;
    }

    renderData() {
        if (this.pageSize > 1) {
            const rowsTemp = this.data;
            const newRows = [];
            let startIndex = 0;
            let endIndex = this.pageSize;
            if (this.currentPage > 1) {
                startIndex  = (this.currentPage - 1) * this.pageSize;
                endIndex = startIndex + this.pageSize;
            }
            while (startIndex <= endIndex) {
                if (rowsTemp[startIndex]) {
                    newRows.push(rowsTemp[startIndex]);
                }
                startIndex++;
            }
            this.viewRows = newRows;

        }else{
            this.viewRows = this.data;
        }
        this.selectedRowNo = -1;
    }

    sortData() {
        if (this.sortColumn) {
            let sortColDataIndex: any;
            const sortOrder = this.sortBy;
            if (this.sortColumn.dataIndex && this.sortColumn.dataType) {
                const dataIndex = this.sortColumn.dataIndex;
                sortColDataIndex = dataIndex;
                if (this.sortColumn.dataType === 'string') {

                    if (this.groupByColumn) {
                        this.data.sort(function(a, b){
                            const x = a.group.toLowerCase();
                            const y = b.group.toLowerCase();

                            if (sortOrder === 2) {
                                if (x < y) {return 1; }
                                if (x > y) {return -1; }
                            }else {
                                if (x < y) {return -1; }
                                if (x > y) {return 1; }
                            }

                            return 0;
                        });
                    }else {
                        this.data.sort(function(a, b){
                            const x = a[sortColDataIndex].toLowerCase();
                            const y = b[sortColDataIndex].toLowerCase();

                            if (sortOrder === 2) {
                                if (x < y) {return 1; }
                                if (x > y) {return -1; }
                            }else {
                                if (x < y) {return -1; }
                                if (x > y) {return 1; }
                            }
                            return 0;
                        });
                    }
                } else if (this.sortColumn.dataType === 'number') {
                    if (this.groupByColumn) {
                        this.data.sort(function(a, b){
                            const  x = a.group;
                            const  y = b.group;

                            if (sortOrder === 2) {
                                return y - x;
                            }else {
                                return x - y;
                            }

                        });
                    }else {
                        this.data.sort(function(a, b){
                            const x = a[sortColDataIndex];
                            const y = b[sortColDataIndex];
                            if (sortOrder === 2) {
                                return y - x;
                            }else {
                                return x - y;
                            }
                        });
                    }
                }
            }
        }
        this.renderData();
    }

    next() {
        if (this.currentPage < this.maxPage) {
            this.currentPage++;
        }
        this.renderData();
    }

    prev() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }else {
            this.currentPage = 1;
        }
        this.renderData();
    }

    sortOnColHeaderClick(sortCol: any) {
        if (this.sortBy === -1) {
          this.sortBy = 1;
        } else if (this.sortBy === 1) {
          this.sortBy = 2;
        } else if (this.sortBy === 2) {
          this.sortBy = 1;
        }
        this.setSortColumn(sortCol, this.sortBy);
    }

    setSortColumn(sortCol: any, _sortBy: number) {
        this.sortBy = _sortBy;
        this.sortColumn = sortCol;
        this.sortData();
    }

    setPageNo(value: any) {
        this.currentPage = value;
        this.renderData();
    }

    setUserPageNo() {
        this.renderData();
    }

    rowClick(rowData: any, rowIndex: any) {
        rowIndex = 'row' + rowIndex;
        if (this.rowId) {
            document.getElementById(this.rowId).style.backgroundColor = 'white' ;
             }
        this.rowId = rowIndex;
        document.getElementById(rowIndex).style.backgroundColor = 'lightgray' ;
        this.rowSelect.emit(rowData);
        this.selectedRowNo = rowIndex;
    }

    isSelected(rowNo: any) {
        return rowNo === this.selectedRowNo;
    }

    setColumnVisiblity(dataIndex: string) {
        for (let ic = 0; ic < this.columns.length; ic++) {
            const col = this.columns[ic];
            if (col.dataIndex === dataIndex) {
                col.hidden = !col.hidden;
            }
        }
    }

    selectAllVisibleRows() {
        this.selectAll = !this.selectAll;
        if (this.selectAll) {
            for (let vr = 0; vr < this.viewRows.length; vr++) {
                this.selectedRows.push(this.viewRows[vr]);
            }
        }else {
            this.selectedRows = [];
        }
        this.emitSelectedRows();
    }

    setSelectedRow(rowData: any, event: any) {
        if (event.currentTarget.checked) {
            this.selectedRows.push(rowData);
        } else {
            const indexOf = this.selectedRows.indexOf(rowData);
            delete this.selectedRows[indexOf];
        }
        this.emitSelectedRows();
    }

    emitSelectedRows() {
        const sRows = [];
        for (let sr = 0; sr < this.selectedRows.length; sr++) {
            if (this.selectedRows[sr]) {
                sRows.push(this.selectedRows[sr]);
            }
        }
        this.selectedRowData.emit(sRows);

    }

    onResize(event: any) {
        if (event.target.innerWidth < 768) {
            this.smallScreen = true;
        } else {
            this.smallScreen = false;
        }
    }

    setColumnData() {
        this.data = this.cloneData;
        const groups = {};
        this.data.forEach((option) => {
            const groupName = option[this.groupByColumnIndex];
            if (!groups[groupName]) {
                groups[groupName] = [];
            }
            groups[groupName].push(option);
        });
        this.data = [];
        for (const groupName in groups) {
            this.data.push({expanded: false, group: groupName, groupData: groups[groupName]});
        }

        /*-------Aggregation---------*/

        /* this.data.forEach((groupdata)=>{
         let aggregateValue :  number;
         let dummyA={};
         let k;
         let arrayIndex;
         this.columns.forEach((columnOption)=> {
         if(columnOption.aggregate==true) {
         k = columnOption.dataIndex;
         aggregateValue =0;
         groupdata.groupData.forEach((childData, index) => {
         aggregateValue = +(aggregateValue + Number(childData[columnOption.dataIndex]));
         arrayIndex = index;

         });
         dummyA[k]=aggregateValue;
         }

         });

         groupdata.groupData[arrayIndex+1]=dummyA;

         });*/
        this.renderData();
        this.cd.detectChanges();
    }

    iconSwitch(groupData: any) {
        groupData.expanded = !groupData.expanded;
    }

    getFilteredData(filteredObj: any) {
        let status = false;
        if (filteredObj.length > 0) {
            this.data = [];
            this.filterCloneData.forEach((option) => {
                status = this.filterOpertion(option, filteredObj);
                if (status) {
                    this.data.push(option);
                    status = false;
                }
            });
            if (this.data.length > (1 * this.pageSize)) {
                this.pagingRegenration();
                this.renderData();
            } else {
                this.viewRows = this.data;
                this.currentPage = 1;
                this.maxPage = 1;
                this.cd.detectChanges();
            }

        } else {
            this.data = this.filterCloneData;
            this.pagingRegenration();
            this.renderData();
        }

    }


    filterOpertion(data: any, filteredObj: any) {
        const statusArray: any = [];
        let condition: any;
        filteredObj.forEach((filterOpt) => {
            if (filterOpt.filter === '3') {
                if (filterOpt.type === 'string') {
                    condition = data[filterOpt.key].toLowerCase().includes(filterOpt.value.toLowerCase());
                }
                statusArray.push(condition);
            }
            if (filterOpt.filter === '1') {
                if (filterOpt.type === 'string') {
                    condition = data[filterOpt.key].toLowerCase().startsWith(filterOpt.value.toLowerCase());
                }
                statusArray.push(condition);
            } else if (filterOpt.filter === '2') {
                if (filterOpt.type === 'string') {
                    condition = data[filterOpt.key].toLowerCase().endsWith(filterOpt.value.toLowerCase());
                }
                statusArray.push(condition);
            } else if (filterOpt.filter === '<') {
                if (filterOpt.type === 'number') {
                    condition = data[filterOpt.key] > filterOpt.value;
                } statusArray.push(condition);
            } else if (filterOpt.filter === '>') {
                if (filterOpt.type === 'number') {
                    condition = data[filterOpt.key] < filterOpt.value;
                } statusArray.push(condition);
            } else if (filterOpt.filter === '>=') {
                if (filterOpt.type === 'number') {
                    condition = data[filterOpt.key] <= filterOpt.value;
                } statusArray.push(condition);
            } else if (filterOpt.filter === '=<') {
                if (filterOpt.type === 'number') {
                    condition = data[filterOpt.key] >= filterOpt.value;
                } statusArray.push(condition);
            } else if (filterOpt.filter === '==') {
                if (filterOpt.type === 'number') {
                    condition = data[filterOpt.key] === filterOpt.value;
                }else {
                    condition = data[filterOpt.key].toLowerCase() === filterOpt.value.toLowerCase();
                }
                statusArray.push(condition);
            }else if (filterOpt.filter === '!=') {
                if (filterOpt.type === 'number') {
                    condition = data[filterOpt.key] !== filterOpt.value;
                }else {
                    condition = data[filterOpt.key].toLowerCase() !== filterOpt.value.toLowerCase();
                }
                statusArray.push(condition);
            }
        });
        statusArray.forEach((opt) => {
            if (opt === false) {
                condition = false;
            }
        });
        return condition;
    }

    /*---filter paging-----*/

    pagingRegenration() {
        this.maxPage = Math.floor((this.data.length / this.pageSize));
        if ((this.data.length % this.pageSize) > 0) {
            this.maxPage ++;
        }
        for (let pageNo = 1; pageNo <= this.maxPage; pageNo++) {
            this.pageNumbers.push(pageNo);
        }
        this.cd.detectChanges();
    }

}
