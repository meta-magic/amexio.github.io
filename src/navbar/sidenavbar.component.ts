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
  AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output,
  TemplateRef
} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {CommonHttpService} from "../common.http.service";


@Component({
  selector: 'amexio-sidemenubar',
  template: `

      <div [ngClass]="{'sidenavleft':!right, 'sidenavright':right}"  [attr.id]="elementId" (mouseleave)="expanded?null:closeNav()">
          <ul class="navbar-nav">
            <li *ngIf="filter==true">
              <input type="text" class="form-control" [(ngModel)]="filterText"  placeholder="Search" (keyup)="filterData()"  style="width: 100%;" />
            </li>
              <li class="nav-item" *ngFor="let header of menus ">
                  <a class="nav-link"  (click)="expandNode(header)">
                      <ng-container *ngIf="headerTemplate==null">{{header.text}}</ng-container>

                      <ng-template *ngIf="headerTemplate!=null" [ngTemplateOutlet]="headerTemplate" [ngOutletContext]="{ $implicit: {}, navHeader:header }"></ng-template>

                      <span *ngIf="header.childrens "  style="float: right;" class="fa" [ngClass]="{'fa-angle-up':header.expand,'fa-angle-down':!header.expand}"></span>
                  </a>
                  <ng-container *ngIf="header.childrens && header.expand">
                      <div [ngStyle]="header.hstyle" >
                          <ul>
                              <li *ngFor="let level1Menu of header.childrens">
                                  <a (click)="menuClick(level1Menu)">
                                      <ng-container *ngIf="childTemplate==null">{{level1Menu.text}}</ng-container>
                                      <ng-template *ngIf="childTemplate!=null" [ngTemplateOutlet]="childTemplate" [ngOutletContext]="{ $implicit: {}, menuHeader:level1Menu }"></ng-template>
                                  </a>
                                  <ng-container *ngIf="level1Menu.childrens">
                                      <ul  style="list-style: none; padding:0px;" (nodeClick)="menuClick($event)"  [templates]="subMenuTemplate"  amexio-submenu-view [subMenuData]="level1Menu.childrens"></ul>
                                  </ng-container>
                              </li>
                          </ul>
                      </div>
                  </ng-container>

              </li>
          </ul>
      </div>

      <span [ngClass]="{'sidenavopenleft':!right, 'sidenavopenright':right}"  (click)="openNav()">&#9776;</span>

  `,
  styles: [`

      ul li{
          list-style: none;
          padding: 1px;
      }

      a{
          cursor: pointer;
          text-decoration: none;
      }

      .sidenavleft {
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

      .sidenavopenleft{
          position:absolute;
          top:0;
          left:0;
          font-size:30px;
          cursor:pointer
      }

      .sidenavleft >ul >li {
          border-bottom: 1px solid #e7e7e7;
      }

      .sidenavright {
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

      .sidenavopenright{
          position:absolute;
          top:0;
          right:0;
          font-size:30px;
          cursor:pointer
      }

      .sidenavright >ul >li {
          border-bottom: 1px solid #e7e7e7;
      }

      @media screen and (max-height: 450px) {
          .sidenavleft {padding-top: 15px;}
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

  constructor(private _http: Http, private carouselService: CommonHttpService) {
    this.elementId = 'amexio-sidenav-view-' + Math.random() + '-' + new Date().getTime();
    this.expanded = false;
    this.filter = false;
  }


  ngOnInit() {
  }

  ngAfterViewInit() {

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
    this.selectedNode.emit(nodeData);
    if (!nodeData.childrens) {
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
        this.carouselService.fetchData(this.httpUrl, this.httpMethod).subscribe(
            response => {
                this.bindData = response.json();
            },
            error => {
            },
            () => { this.renderServiceData();

            }
        );

    }


 /* callService() {

    let requestJson = {};
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8'  });
    let options = new RequestOptions({headers : headers, method : this.httpMethod});
    if (this.httpMethod === 'post') {
      this._http.post(this.httpUrl, requestJson,  options).subscribe(
          response => {
            this.bindData = response.json();
          },
          error => {
          },
          () => {
            this.renderServiceData();
          }
      );
    }else if (this.httpMethod === 'get') {
      this._http.get(this.httpUrl, options).subscribe(
          response => {
            this.bindData = response.json();
          },
          error => {
          },
          () => {
            this.renderServiceData();
          }
      );
    }
  }*/

  openNav() {
    document.getElementById(this.elementId).style.width = '250px';
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

}
