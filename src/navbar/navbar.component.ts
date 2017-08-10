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
  AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef
} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {CommonHttpService} from "../common.http.service";


@Component({
  selector: 'amexio-menubar',
  template : `
      
          <nav class="navbar navbar-toggleable-md navbar-light bg-faded " [ngClass]="{ 'fixed-bottom dropup':bottom}">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

              <div class="collapse navbar-collapse " id="navbarNavDropdown">
                  <ul class="nav navbar-nav bg-faded">
                      <li class="dropdown amexio-navbar-dropdown-large bg-faded" id="{{elementId}}dd-lr-{{ind}}" *ngFor="let mh of menus let ind = index" >
                          <a class="dropdown-toggle" [ngClass]="{'dropdown-toggle':getToggleClass(mh)}" data-toggle="dropdown" (click)="adjustPosition($event, ind)">
                              <ng-container *ngIf="headerTemplate==null">
                                  &nbsp;&nbsp;{{mh.text}}
                              </ng-container><ng-template *ngIf="headerTemplate!=null" [ngTemplateOutlet]="headerTemplate" [ngOutletContext]="{ $implicit: {}, navHeader:mh }"></ng-template>
                          </a>
                          <ng-container *ngIf="mh.childrens">
                              <ul class="dropdown-menu" id="{{elementId}}dd-m-{{ind}}">
                                <div class="row">
                                  <li class="col-sm-4 amexio-navbar-li-position" *ngFor="let sm of mh.childrens let ind =index">
                                    <ul class="amexio-navbar-align">
                                      <li class="amexio-navbar-li-custom">
                                        <a (click)="menuClick(sm)">
                                          <ng-container *ngIf="childTemplate==null">{{sm.text}}</ng-container>
                                          <ng-template *ngIf="childTemplate!=null" [ngTemplateOutlet]="childTemplate" [ngOutletContext]="{ $implicit: {}, menuHeader:sm }"></ng-template>
                                        </a>
                                      </li>
                                      <ng-container *ngIf="sm.childrens">
                                        <li class="amexio-navbar-ifchild" (nodeClick)="menuClick($event)" amexio-submenu-view [subMenuData]="sm.childrens"  [templates]="subMenuTemplate"></li>
                                      </ng-container>
                                    </ul>
                                  </li>
                                </div>
                                 
                              </ul>
                          </ng-container>
                      </li>
                  </ul>
              </div>
          </nav>
  `,

    styleUrls: ['navbar.custom.css'],
    providers: [CommonHttpService]

})
export class NavbarComponent implements OnInit, AfterViewInit {

  thd: any;
  thdm: any;

  @Input()
  httpUrl: string;

  @Input()
  httpMethod: string;

  @Input()
  dataReader: string;

  @Input()
  bindData: any;

  @Input()
  bottom: boolean;

  @Output()
  selectedNode: any = new EventEmitter<any>();

  menus: any[];

  elementId: any;

  @ContentChild('amexioNavHeaderTmpl') headerTemplate: TemplateRef<any>;

  @ContentChild('amexioMenuHeaderTmpl') childTemplate: TemplateRef<any>;

  @ContentChild('amexioSubMenuTmpl') subMenuTemplate: TemplateRef<any>;

  constructor(private _http: Http, private carouselService: CommonHttpService) {
    this.elementId = 'nav-' + Math.floor(Math.random()*90000) + 10000 + '-';
  }

  adjustPosition(event: any, ind: any) {
    this.thd = document.getElementById(this.elementId + 'dd-lr-' + ind);
    this.thdm = document.getElementById(this.elementId + 'dd-m-' + ind);
    this.thdm.style = 'margin-left: ' + this.thd.offsetLeft + 'px;';
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.httpMethod && this.httpUrl) {
      this.callService();
    } else if (this.bindData) {
      this.setData(this.bindData);
    }
  }

  menuClick(nodeData: any) {
    this.selectedNode.emit(nodeData);
  }

  renderServiceData() {
    this.setData(this.bindData);
  }

  setData(httpResponse: any) {
    this.menus = this.getData(httpResponse);
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

  getToggleClass(data: any) {
    return data.hasOwnProperty('childrens');
  }

}
