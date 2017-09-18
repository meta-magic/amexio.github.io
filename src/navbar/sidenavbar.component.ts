/**
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Created by Ketan Gote on 7/4/17.
 */

import {
  AfterViewInit, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output,
  TemplateRef
} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {CommonHttpService} from "../common.http.service";


@Component({
  selector: 'amexio-sidemenubar',
  template: `

      <div [style.margin-top]="toPosition" [ngClass]="{'amexio-sidenavbar-sidenavleft':!right, 'amexio-sidenavbar-sidenavright':right}"  [attr.id]="elementId" (mouseleave)="expanded?null:closeNav()" class="scrollbar">
          <ul class="navbar-nav">
            <li *ngIf="filter==true">
                <div class="amexio-sidenavbar-filter">
                    <input type="text" class="form-control amexio-sidenavbar-input-width" [(ngModel)]="filterText"  placeholder="Search" (keyup)="filterData()" />
                </div>
            </li>
              <li class="nav-item" *ngFor="let header of menus;let i = index;">
                  <a class="nav-link amexio-sidenavbar-nav-link-a" [ngClass]="(header.selected && !header.childrens)? 'amexio-link-selected' : 'amexio-link-notselected'" (click)="expandNode(header)" data-toggle="collapse" [attr.data-target]="'#'+i+elementId+'sub-menu'" aria-expanded="false" [attr.aria-controls]="i+elementId+'sub-menu'">
                      <ng-container *ngIf="headerTemplate==null">{{header.text}}</ng-container>

                      <ng-template *ngIf="headerTemplate!=null" [ngTemplateOutlet]="headerTemplate" [ngOutletContext]="{ $implicit: {}, navHeader:header }"></ng-template>

                      <span *ngIf="header.childrens " class="amexio-sidenavbar-child-header fa" [ngClass]="{'fa-angle-up':header.expand,'fa-angle-down':!header.expand}"></span>
                  </a>
                  <ng-container *ngIf="header.childrens && header.expand">
                      <div class="collapse" [attr.id]="i+elementId+'sub-menu'">
                          <ul>
                              <li *ngFor="let level1Menu of header.childrens">
                                  <a (click)="menuClick(level1Menu)" [ngClass]="(level1Menu.selected && !level1Menu.childrens)? 'amexio-link-selected' : 'amexio-link-notselected'" >
                                     
                                      <ng-container *ngIf="childTemplate==null">{{level1Menu.text}}</ng-container>
                                      <ng-template *ngIf="childTemplate!=null" [ngTemplateOutlet]="childTemplate" [ngOutletContext]="{ $implicit: {}, menuHeader:level1Menu }"></ng-template>
                                  </a>
                                  <ng-container *ngIf="level1Menu.childrens">
                                      <ul class="amexio-sidenavbar-level1-child" (nodeClick)="menuClick($event)"  [templates]="subMenuTemplate"  amexio-submenu-view [subMenuData]="level1Menu.childrens"></ul>
                                  </ng-container>
                              </li>
                          </ul>
                      </div>
                  </ng-container>

              </li>
          </ul>
      </div>

      <span *ngIf="enableToggleButton" [style.margin-top]="toPosition"  [ngClass]="{'amexio-sidenavbar-sidenavopenleft':!right, 'amexio-sidenavbar-sidenavopenright':right}"  (click)="openNav()">&#9776;</span>

  `,
  styles : [`
      ul li{
          list-style: none;
          padding: 1px;
      }

      a{
          cursor: pointer;
          text-decoration: none;
      }


      .scrollbar{
          background-color:lightgray;
      }

      .scrollbar::-webkit-scrollbar{
          width: 9px;
          background-color:#eaeaea;
      }

      .scrollbar::-webkit-scrollbar-thumb{
          background-color:#c3c3c3;
          border-radius:10px;
      }
      .scrollbar::-webkit-scrollbar-thumb:hover{
          background-color::#c3c3c3;
          border:1px solid #333333;
      }
      .scrollbar::-webkit-scrollbar-thumb:active{
          background-color::#c3c3c3;
          border:1px solid #333333;
      }
      .amexio-link-selected{

      }
      .amexio-link-notselected{

      }
      .amexio-sidenavbar-sidenavleft {
          height: 100%;
          width: 0;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          background-color: #ffffff;
          overflow-x: hidden;
          transition: 0.5s;
          overflow: auto;
      }

      .amexio-sidenavbar-sidenavopenleft{
          position:absolute;
          top:0;
          left:0;
          font-size:30px;
          cursor:pointer
      }

      .amexio-sidenavbar-sidenavleft >ul >li {
          border-bottom: 1px solid #e7e7e7;
      }

      .amexio-sidenavbar-sidenavright {
          height: 100%;
          width: 0;
          position: fixed;
          z-index: 1;
          top: 0;
          right: 0;
          background-color: #ffffff;
          overflow-x: hidden;
          transition: 0.5s;
          overflow: auto;
      }

      .amexio-sidenavbar-sidenavopenright{
          position:absolute;
          top:0;
          right:0;
          font-size:30px;
          cursor:pointer
      }

      .amexio-sidenavbar-sidenavright >ul >li {
          border-bottom: 1px solid #e7e7e7;
      }

      @media screen and (max-height: 450px) {
          .amexio-sidenavbar-sidenavleft {padding-top: 15px;}
      }
      .amexio-sidenavbar-filter{
          padding-top: 5px;
          padding-bottom: 5px;
          padding-left: 10px;
      }
      .amexio-sidenavbar-input-width{
          width: 100%;
      }
      .amexio-sidenavbar-nav-link-a{
          padding-left: 10px;
          padding-right: 10px;
      }
      .amexio-sidenavbar-child-header{
          float: right;
      }
      .amexio-sidenavbar-level1-child{
          list-style: none;
          padding:0px;
      }
  `],
    providers: [CommonHttpService]
})

export class SideNavBarComponent implements OnInit, AfterViewInit {

  @Input()
  httpUrl: string;

  @Input()
  httpMethod: string;

  @Input()
  dataReader: string;

  @Input()
  bindData: any;

  @Input()
  expanded: boolean;

  @Input()
  filter: boolean;

  @Input()
  toPosition: string;

  @Input()
  width : string;

  @Input()
  enableToggleButton: boolean;



  @Output()
  selectedNode: any = new EventEmitter<any>();

  menus: any[];

  orgMenus: any[];

  @Input()
  right: boolean;

  elementId: string;

  filterText: string;


  @ContentChild('amexioNavHeaderTmpl') headerTemplate: TemplateRef<any>;

  @ContentChild('amexioMenuHeaderTmpl') childTemplate: TemplateRef<any>;

  @ContentChild('amexioSubMenuTmpl') subMenuTemplate: TemplateRef<any>;

  constructor(private _http: Http, private navService: CommonHttpService,private cdf : ChangeDetectorRef) {
    this.elementId = 'amexio-sidenav-view-' + Math.floor(Math.random()*90000) + 10000;
    this.expanded = false;
    this.filter = false;
    this.width = "20%";
    this.enableToggleButton = true;
  }


  ngOnInit() {
      this.toPosition = this.toPosition+'px';
    if (this.httpMethod && this.httpUrl) {
      this.callService();
    } else if (this.bindData) {
      this.setData(this.bindData);
    }
    // this.openNav();

    if (this.expanded) {
      setTimeout(() => {
        this.openNav();
      });
    }
  }

  ngAfterViewInit() {

   /* if (this.httpMethod && this.httpUrl) {
      this.callService();
    } else if (this.bindData) {
      this.setData(this.bindData);
    }
    // this.openNav();

    if (this.expanded) {
      setTimeout(() => {
        this.openNav();
      });
    }*/
  }



  expandNode(node: any) {
    node.expand = !node.expand;

    if (node.expand) {
      node.hstyle = {
        'display': 'block'
      };
    }else {
      node.hstyle  = {
        'display': 'none'
      };
    }

    let nodeClick = JSON.parse(JSON.stringify(node));
    delete nodeClick.hstyle;
    delete nodeClick.expand;
    this.menuClick(nodeClick);
  }

  menuClick(nodeData: any) {
    this.resetSelected(this.menus, nodeData.text);
    this.selectedNode.emit(nodeData);
    if (!nodeData.childrens && !this.expanded) {
      this.closeNav();
    }
  }

  renderServiceData() {
    this.setData(this.bindData);
  }

  setData(httpResponse: any) {
    this.menus = this.getData(httpResponse);
    this.orgMenus = JSON.parse(JSON.stringify(this.menus));
  }

  getData(httpResponse: any) {
    let responsedata = httpResponse;
    if ((this.dataReader && this.dataReader.length > 0)) {
      let dr = this.dataReader.split('.');
      for (let ir = 0 ; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
      }
    }
    return responsedata;
  }


    callService() {
        this.navService.fetchData(this.httpUrl, this.httpMethod).subscribe(
            response => {
                this.bindData = response.json();
            },
            error => {
            },
            () => { this.renderServiceData();
              this.cdf.markForCheck();
            }
        );

    }



  openNav() {
    document.getElementById(this.elementId).style.width = this.width;
  }

  closeNav() {
    document.getElementById(this.elementId).style.width = '0';
  }

  filterData() {
    if (this.filterText.length >= 1) {
      let mdata = JSON.parse(JSON.stringify(this.orgMenus));
      let mnodes = this.searchTree(mdata, this.filterText);
      this.menus = mnodes;
    }else {
      this.menus = JSON.parse(JSON.stringify(this.orgMenus));
    }
  }

  searchTree(data: any[], matchingTitle: string) {
    let res = data.filter(function f(node) {
      node.expand = true;
      if (node.text.toLowerCase().startsWith(matchingTitle.toLowerCase())) {
        return true;
      }

      if (node.childrens) {
        return (node.childrens = node.childrens.filter(f)).length;
      }
    });

    return res;
  }

  resetSelected(data: any[], text:string) {
    for (let ir = 0 ; ir < data.length; ir++) {

      if(data[ir].text === "Sample Form"){

      }
      if(data[ir].text === text){
        data[ir].selected = true;
      }else{
        data[ir].selected = false;
      }
      if(data[ir].childrens){
        this.resetSelected(data[ir].childrens, text);
      }
    }
  }

  navToggle(){
    if(document.getElementById(this.elementId).style.width=='0px'){
      this.openNav();
    }else {
      this.closeNav();
    }

  }

}
