/**
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Created by Ketan Gote on 6/28/17.
 */


import {
  AfterViewInit, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output,
  TemplateRef
} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {CommonHttpService} from "../common.http.service";


@Component({
  selector: 'amexio-tree-filter-view',
  template : `

      <div class="col-lg-12">
          <div class="col-lg-12">
            <div class="input-group">
              <input type="text" class="form-control" aria-label="Text input with dropdown button" [(ngModel)]="filterText"  placeholder="Search" (keyup)="filterData()">
              <div class="input-group-btn">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" *ngFor="let opt of filterOptionData" (click)="filterOption(opt)">{{opt.key}}&nbsp;<i [class]="opt.checkedStatus" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
              <ng-container *ngIf="isDataFound">
                  <amexio-tree-view
                          [dataTableBindData]="treeData"
                          [enableCheckBox] ="enableCheckBox"
                          (onTreeNodeChecked) = "onCheckSelect($event)"
                          (selectedRecord)="onRowSelect($event)" [templates]="templates">
                  </amexio-tree-view>
              </ng-container>
              <ng-container *ngIf="!isDataFound">
                  <p>No Data Found.</p>
              </ng-container>

          </div>
      </div>


  `,
  providers: [CommonHttpService]
})
export class FilterTreeViewComponent implements OnInit, AfterViewInit{

  @Input()
  httpUrl: string;

  @Input()
  httpMethod: string;

  @Input()
  dataReader: string;

  @Input()
  dataTableBindData: any;

  @Input()
  enableCheckBox = false;

  @Output()
  selectedRecord: any = new EventEmitter<any>();

  @Output() onTreeNodeChecked: any = new EventEmitter<any>();

  @Input()
  triggerChar: number;

  treeData: any;

  orgTreeData: any;

  filterText: string;

  filterIndex: number;

  templates: any ;

  isDataFound= true;

  onClickSearch= false;

  filterOptionData: any;

  @ContentChild('amexioTreeTemplate')   parentTmp: TemplateRef<any>;

  constructor(private _http: Http, private cdf: ChangeDetectorRef, private  treeViewFilterService : CommonHttpService){
    this.filterIndex = 3;
    this.triggerChar=1;
    this.filterOptionData=[
      {
        "key":"Is Equal To",
        "value":"1",
        "type":"string",
        "checkedStatus":""
      },
      {
        "key":"Is Not Equal To",
        "value":"2",
        "type":"string",
        "checkedStatus":""
      },
      {
        "key":"Start With",
        "value":"3",
        "type":"string",
        "checkedStatus":"fa fa-check"
      },
      {
        "key":"Ends With",
        "value":"4",
        "type":"string",
        "checkedStatus":""
      },
      {
        "key":"Contains",
        "value":"5",
        "type":"string",
        "checkedStatus":""
      },
    ];
  }


  ngOnInit() {
    if (this.parentTmp != null) {
      this.templates = {treeNodeTemplate : this.parentTmp};
    } else if (this.templates != null) {
      this.parentTmp = this.templates.treeNodeTemplate;
      // this.cdf.detectChanges();
    }
  }

  ngAfterViewInit() {
    if (this.parentTmp != null) {
      this.templates = {treeNodeTemplate : this.parentTmp};
    } else if (this.templates != null) {
      this.parentTmp = this.templates.treeNodeTemplate;
      // this.cdf.detectChanges();
    }

    if (this.httpMethod && this.httpUrl) {
      this.callService();
    } else if (this.dataTableBindData) {
      this.setData(this.dataTableBindData);
    }
  }

  filterData() {
    if (this.filterText.length >= this.triggerChar) {
      const tData = JSON.parse(JSON.stringify(this.orgTreeData));
      const treeNodes = this.searchTree(tData, this.filterText);
      this.treeData = treeNodes;
      if (this.treeData.length === 0) {
        this.isDataFound = false;
      } else {
        this.isDataFound = true;
      }
    }else if (this.onClickSearch) {
      let tData = JSON.parse(JSON.stringify(this.orgTreeData));
      let treeNodes = this.searchTree(tData, this.filterText);
      this.treeData = treeNodes;
      this.onClickSearch = false;
      if (this.treeData.length == 0) {
        this.isDataFound = false;
      } else {
        this.isDataFound = true;
      }
    } else {
      this.isDataFound = true;
      this.treeData = this.orgTreeData;
    }
  }

  searchTree(data: any[], matchingTitle: string) {
    let fi = this.filterIndex;
    let res = data.filter(function f(node) {

      if (fi == 5 && node.text.toLowerCase().includes(matchingTitle.toLowerCase())) {
        return true;
      }

      if (fi == 3 && node.text.toLowerCase().startsWith(matchingTitle.toLowerCase())) {
        return true;
      }
      if (fi == 1 && node.text.toLowerCase() == matchingTitle.toLowerCase()) {
        return true;
      }
      if (fi == 2 && node.text.toLowerCase() != matchingTitle.toLowerCase()) {
        return true;
      }
      if (fi == 4 && node.text.toLowerCase().endsWith(matchingTitle.toLowerCase())) {
        return true;
      }

      if (node.children) {
        return (node.children = node.children.filter(f)).length;
      }
    });
    return res;
  }

  filterOption(data: any) {
    this.onClickSearch = true;
    this.filterIndex = data.value;
    this.filterOptionData.forEach((opt) => {
      if (opt.value!=data.value) {
        opt.checkedStatus = '';
      }else {
        opt.checkedStatus = 'fa fa-check';
      }
    });
    this.filterData();
  }

  renderServiceData() {
    this.setData(this.dataTableBindData);
  }

  setData(httpResponse: any){
    let tdata = this.getData(httpResponse);
    if (tdata) {
      this.orgTreeData = JSON.parse(JSON.stringify(tdata));
      this.treeData = tdata;
    }
  }

  getData(httpResponse: any){
    let responsedata = httpResponse;
    let dr = this.dataReader.split('.');
    for (let ir = 0 ; ir < dr.length; ir++) {
      responsedata = responsedata[dr[ir]];
    }
    return responsedata;
  }

  callService(){
    this.treeViewFilterService.fetchData(this.httpUrl, this.httpMethod).subscribe(
        response => {
          this.dataTableBindData = response.json();
        },
        error => {
        },
        () => {
          this.renderServiceData();
        }
    );
  }

  onRowSelect(data: any) {
    this.selectedRecord.emit(data);
  }

  onCheckSelect(data: any) {
    this.onTreeNodeChecked.emit(data);
  }
}
