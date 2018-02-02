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
  OnInit,
  Input,
  Component,
  SimpleChange,
  EventEmitter,
  Output,
  QueryList,
  ContentChildren,
  AfterContentInit,
  DoCheck,
  ViewChildren
} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";
import {AmexioGridColumnComponent} from "../datagrid/data.grid.column";

@Component({
  selector: 'amexio-tree-data-table', template: `
    <div class="datatable">
      <div class="datatable-header">
        <ng-container *ngFor="let cols of columns;let i = index">
          <ng-container *ngIf="cols.datatype=='string'">
            <div class="datatable-col" [ngClass]="{'header' : i == 0}"> {{cols.text}}</div>
          </ng-container>
          <ng-container *ngIf="cols.datatype=='number'">
            <span class="float-right">
               <div class="datatable-col" [ngClass]="{'header' : i == 0}"> {{cols.text}}</div>
            </span>
          </ng-container>
        </ng-container>
      </div>
    </div>

    <div class="datatable">
      <div class="datatable-row" *ngFor="let row of viewRows;let i=index" (click)="setSelectedRow(row, $event)">
        <ng-container *ngFor="let cols of columns;let colIndex = index">
          <ng-container *ngIf="cols.datatype=='string'">
            <div class="datatable-col" [attr.data-label]="cols.text">
              <ng-container *ngIf="colIndex == 0">
              <span [ngStyle]="{'padding-left':(20*row.level)+'px'}">
                    
                <!--<i *ngIf="!row.expanded && row.children" class="fa fa-plus" aria-hidden="true" (click)="toogle(row,i)"></i>-->
                <ng-container *ngIf="!row.expanded && row.children">
                  <amexio-data-icon key="tree_collapse" (onClick)="toogle(row,i)"></amexio-data-icon>
                </ng-container>

                <!--<i *ngIf="row.expanded && row.children" class="fa fa-minus" aria-hidden="true" (click)="toogle(row,i)"></i>-->
                <ng-container *ngIf="row.expanded && row.children">
                  <amexio-data-icon key="tree_expand" (onClick)="toogle(row,i)"></amexio-data-icon>
                </ng-container>
                     {{row[cols.dataindex]}}
               </span>
              </ng-container>

              <ng-container *ngIf="colIndex > 0">
                {{row[cols.dataindex]}}
              </ng-container>
            </div>
          </ng-container>
          <ng-container *ngIf="cols.datatype=='number'">
            <div class="datatable-col" [attr.data-label]="cols.text" >
              <ng-container *ngIf="colIndex == 0">
              <span [ngStyle]="{'padding-left':(20*row.level)+'px'}">
                    
                <!--<i *ngIf="!row.expanded && row.children" class="fa fa-plus" aria-hidden="true" (click)="toogle(row,i)"></i>-->
                <ng-container *ngIf="!row.expanded && row.children">
                  <amexio-data-icon key="tree_collapse" (onClick)="toogle(row,i)"></amexio-data-icon>
                </ng-container>

                <!--<i *ngIf="row.expanded && row.children" class="fa fa-minus" aria-hidden="true" (click)="toogle(row,i)"></i>-->
                <ng-container *ngIf="row.expanded && row.children">
                  <amexio-data-icon key="tree_expand" (onClick)="toogle(row,i)"></amexio-data-icon>
                </ng-container>
                 <span class="float-right">
                     {{row[cols.dataindex]}}
                 </span>
               </span>
              </ng-container>

              <ng-container *ngIf="colIndex > 0">
               <span class="float-right">
                {{row[cols.dataindex]}}
               </span>
              </ng-container>
            </div>
              
           
          </ng-container>
        </ng-container>
       
       
      </div>
    </div>

  `,

})

export class TreeDataTableComponent implements OnInit {

  @Input() data: any;

  @Input('data-reader') datareader: string;

  @Input('http-method') httpmethod: string;

  @Input('http-url') httpurl: string;

  @Input('display-field') displayfield: string;

  @Input('value-field') valuefield: string;

  @Output() selectedRecord: any = new EventEmitter<any>();

  responseData: any;

  columns: any[] = [];

  previousValue: any;

  viewRows: any;

  @ContentChildren(AmexioGridColumnComponent) columnRef: QueryList<AmexioGridColumnComponent>;

  constructor(public treeDataTableService: CommonDataService) {

  }

  ngOnInit() {

    if (this.httpmethod && this.httpurl) {

      this.treeDataTableService.fetchData(this.httpurl, this.httpmethod).subscribe(response => {
        this.responseData = response.json();
      }, error => {
      }, () => {
        this.setData(this.responseData);
      });
    } else if (this.data) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  ngAfterContentInit() {
    this.createConfig();
  }

  createConfig() {
    let columnRefArray = [];
    columnRefArray = this.columnRef.toArray();
    for (let cr = 0; cr < columnRefArray.length; cr++) {
      const columnConfig = columnRefArray[cr];
      let columnData: any;
      if (columnConfig.bodyTemplate == null && columnConfig.headerTemplate == null) {
        columnData = {
          text: columnConfig.text,
          dataindex: columnConfig.dataindex,
          hidden: columnConfig.hidden,
          datatype: columnConfig.datatype
        };
      }

      this.columns.push(columnData);
    }
  }

  setData(httpResponse: any) {
    let treedata = this.getResponseData(httpResponse);
    this.viewRows = treedata;
    this.viewRows.forEach((row: any, index: any) => {
      this.viewRows[index].level = 1;
      this.viewRows[index].expand = false;
    });
  }

  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      let dr = this.datareader.split('.');
      for (let ir = 0; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
      }
    } else {
      responsedata = httpResponse;
    }

    return responsedata;
  }

  toogle(row: any, index: number) {
    row.expanded = !row.expanded;
    if (row.expanded) {
      this.addRows(row, index);
    } else {
      this.removeRows(row);
    }
  }

  addRows(row: any, index: number) {
    for (let i = 0; i < row.children.length; i++) {
      let node = row.children[i];
      if (!row.level) {
        row.level = 1;
      }
      if (node.children) {
        node.expanded = false;
      }
      node.level = (row.level + 1);
      this.viewRows.splice(index + (i + 1), 0, node);
    }
  }

  removeRows(node: any) {
    for (let i = 0; i < node.children.length; i++) {

      for (let j = 0; j < this.viewRows.length; j++) {

        if (this.viewRows[j] === node.children[i]) {
          if (node.children[i].children) this.removeRows(node.children[i]);

          this.viewRows.splice(this.viewRows.indexOf(node.children[i]), 1);

        }
      }
    }
  }

  setSelectedRow(rowData: any, event: any) {
    this.selectedRecord.emit(rowData);
  }

}
