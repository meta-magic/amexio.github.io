/**
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Created by Ketan Gote on 6/30/17.
 */


import {
  Component, ContentChild, EventEmitter, Input, OnInit, Output,
  TemplateRef
} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";


@Component({
  selector: 'amexio-navbar',
  template : `

    <nav class="navbar navbar-default navbar-static">
      <div class="navbar-header">
        <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".js-navbar-collapse">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse js-navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="dropdown dropdown-large" id="dd-lr-{{ind}}" *ngFor="let mh of menus let ind = index" >
            <a class="dropdown-toggle" data-toggle="dropdown"  (click)="adjustPosition($event, ind)">
              <ng-container *ngIf="headerTemplate==null">
                {{mh.text}}
              </ng-container><ng-template *ngIf="headerTemplate!=null" [ngTemplateOutlet]="headerTemplate" [ngOutletContext]="{ $implicit: {}, navHeader:mh }"></ng-template>
              <b *ngIf="mh.childrens" class="caret" ></b>
            </a>
            <ng-container *ngIf="mh.childrens">
              <ul class="dropdown-menu row" id="dd-m-{{ind}}">
                <li class="col-sm-4" style="position: static !important" *ngFor="let sm of mh.childrens let ind =index">
                  <ul style="padding: 0px;margin: 0px;">
                    <li style="list-style: none;color: #428bca;font-size: 18px;padding: 3px 2px;position: static !important">
                      <a  style="text-decoration: none;color: #428bca" (click)="menuClick(sm)">
                        <ng-container *ngIf="childTemplate==null">{{sm.text}}</ng-container>
                        <ng-template *ngIf="childTemplate!=null" [ngTemplateOutlet]="childTemplate" [ngOutletContext]="{ $implicit: {}, menuHeader:sm }"></ng-template>
                      </a>
                    </li>
                    <ng-container *ngIf="sm.childrens">
                      <li (nodeClick)="menuClick($event)"  style="list-style: none; padding:0px;"  amexio-submenu-view [subMenuData]="sm.childrens"  [templates]="subMenuTemplate"></li>
                    </ng-container>
                  </ul>
                </li>
              </ul>
            </ng-container>
          </li>
        </ul>
      </div>
    </nav>
    



  `,
  styles:[
    `
      .dropdown-large {
        position: static !important;
      }
      
      .dropdown-menu-large {
        padding: 10px 0px;
      }

    `
  ]

})
export class NavbarComponent implements OnInit{

  thd: any;
  thdm:any;

  @Input()
  httpUrl : string;

  @Input()
  httpMethod : string;

  @Input()
  dataReader : string;

  @Input()
  bindData: any;

  @Output()
  selectedNode : any = new EventEmitter<any>();

  menus: any[];

  @ContentChild('amexioNavHeaderTmpl') headerTemplate: TemplateRef<any>;

  @ContentChild('amexioMenuHeaderTmpl') childTemplate: TemplateRef<any>;

  @ContentChild('amexioSubMenuTmpl') subMenuTemplate : TemplateRef<any>;

  constructor(private _http : Http){
  }

  adjustPosition(event:any, ind:any){
    this.thd = document.getElementById("dd-lr-"+ind);
    this.thdm = document.getElementById("dd-m-"+ind);
    this.thdm.style = "margin-left: "+this.thd.offsetLeft+"px;"
  }


  ngOnInit(){
  }

  ngAfterViewInit() {

    if(this.httpMethod && this.httpUrl) {
      this.callService();
    } else if(this.bindData){
      this.setData(this.bindData);
    }
  }

  menuClick(nodeData:any){
    this.selectedNode.emit(nodeData);
  }

  renderServiceData(){
    this.setData(this.bindData);
  }

  setData(httpResponse: any) {
    this.menus = this.getData(httpResponse);
  }

  getData(httpResponse : any){
    let responsedata = httpResponse;
    if((this.dataReader && this.dataReader.length>0)){
      let dr = this.dataReader.split(".");
      for(let ir = 0 ; ir<dr.length; ir++){
        responsedata = responsedata[dr[ir]];
      }
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
          this.bindData = response.json();
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
          this.bindData = response.json();
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
