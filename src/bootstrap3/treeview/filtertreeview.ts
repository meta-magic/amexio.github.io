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
import {Http, Headers, RequestOptions} from "@angular/http";


@Component({
  selector: 'amexio-filter-tree-view',
  template : `

    <div class="col-lg-12">
      <div class="col-lg-12">
       
        <div class="input-group">
          <input type="text" class="form-control" [(ngModel)]="filterText"  placeholder="Search" (keyup)="filterData()" >
          <div class="input-group-btn">
            <button type="button" class="btn btn-default dropdown-toggle glyphicon glyphicon-filter" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            </button>
            <ul class="dropdown-menu dropdown-menu-right">
              <li><a href="#" (click)="filterOption('1')">Is equal to</a></li>
              <li><a href="#" (click)="filterOption('2')">Is not equal to</a></li>
              <li><a href="#" (click)="filterOption('3')">Starts with</a></li>
              <li><a href="#" (click)="filterOption('4')">Ends with</a></li>
            </ul>
          </div><!-- /btn-group -->
        </div><!-- /input-group -->
        
        <amexio-tree-view
           [dataTableBindData]="treeData"
           (selectedRecord)="onRowSelect($event)" [templates]="templates">
        </amexio-tree-view>
      </div>
    </div>


  `
})
export class FilterTreeViewComponent implements OnInit{

  @Input()
  httpUrl : string;

  @Input()
  httpMethod : string;

  @Input()
  dataReader : string;

  @Input()
  dataTableBindData: any;

  treeData : any;

  orgTreeData : any;

  filterText : string;

  filterIndex : number;

  templates : any ;

  @ContentChild('amexioTreeTemplate')   parentTmp : TemplateRef<any>;

  constructor(private _http : Http, private cdf : ChangeDetectorRef){
    this.filterIndex = 3;
  }


  ngOnInit(){
    if(this.parentTmp != null){
      this.templates = {treeNodeTemplate : this.parentTmp};
    }
    else if(this.templates != null){
      this.parentTmp = this.templates.treeNodeTemplate;
      //this.cdf.detectChanges();
    }
  }

  ngAfterViewInit() {
    if(this.parentTmp != null){
      this.templates = {treeNodeTemplate : this.parentTmp};
    }
    else if(this.templates != null){
      this.parentTmp = this.templates.treeNodeTemplate;
      //this.cdf.detectChanges();
    }

    debugger;
    if(this.httpMethod && this.httpUrl) {
      this.callService();
    } else if(this.dataTableBindData){
      this.setData(this.dataTableBindData);
    }
  }

  filterData(){
    this.treeData = this.orgTreeData;
    if(this.filterText.length>=3){
      let tData = JSON.parse(JSON.stringify(this.orgTreeData));
      let treeNodes = this.searchTree(tData, this.filterText);
      this.treeData = treeNodes;
      console.log(treeNodes)
    }
  }

  searchTree(element : any[], matchingTitle:string){
    let filterNodes = [];
    for (let i =0 ; i<element.length; i++){
      let node = element[i];


      if(this.filterIndex == 3 && node.text.toLowerCase().startsWith(matchingTitle.toLowerCase())){
        filterNodes.push(node);
      }
      if(this.filterIndex == 1 && node.text.toLowerCase() == matchingTitle.toLowerCase()){
        filterNodes.push(node);
      }
      if(this.filterIndex == 2 && node.text.toLowerCase() != matchingTitle.toLowerCase()){
        filterNodes.push(node);
      }
      if(this.filterIndex == 4 && node.text.toLowerCase().endsWith(matchingTitle.toLowerCase())){
        filterNodes.push(node);
      }

      if (node.children)
      {
        var innerFilterNodes = this.searchTree(node.children,matchingTitle);

        if(innerFilterNodes.length>0)
        {
          node['children'] = innerFilterNodes;
          filterNodes.pop();
          filterNodes.push(node);
        }
      }
    }
    return filterNodes;
  }

  filterOption(fi : any){
    this.filterIndex = fi;
    this.filterData();
  }

  renderServiceData(){
    this.setData(this.dataTableBindData);
  }

  setData(httpResponse: any){
    let tdata = this.getData(httpResponse);
    if(tdata){
      this.orgTreeData = JSON.parse(JSON.stringify(tdata));
      this.treeData = tdata;
    }
  }

  getData(httpResponse : any){
    let responsedata = httpResponse;
    let dr = this.dataReader.split(".");
    for(let ir = 0 ; ir<dr.length; ir++){
      responsedata = responsedata[dr[ir]];
    }
    return responsedata;
  }

  callService(){
    let requestJson = {};
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8'  });
    let options = new RequestOptions({headers : headers,method : this.httpMethod});
    if(this.httpMethod == "post"){
      this._http.post(this.httpUrl,requestJson,options).subscribe(
        response=>{
          this.dataTableBindData = response.json();
        },
        error=>{
        },
        ()=>{
          this.renderServiceData();
        }
      );
    }else if(this.httpMethod == "get"){
      this._http.get(this.httpUrl,options).subscribe(
        response=>{
          this.dataTableBindData = response.json();
        },
        error=>{
        },
        ()=>{
          this.renderServiceData();
        }
      );
    }
  }


}
