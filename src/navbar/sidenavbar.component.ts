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

        <div [style.margin-top]="toPosition" [ngClass]="getSideNavbarClass()"  [attr.id]="elementId" (mouseleave)="expanded?null:closeNav()">
            <ul class="navbar-nav">
                <li *ngIf="filter==true">
                    <div class="amexio-sidenavbar-filter">
                        <input type="text" class="form-control amexio-sidenavbar-input-width" [(ngModel)]="filterText"  placeholder="Search" (keyup)="filterData()" />
                    </div>
                </li>
                <li class="nav-item" *ngFor="let header of menus"  [ngClass]="{'amexio-sidenavbar-subheader':header.childrens,  'amexio-link-selected':(header.selected && !header.childrens)  }">
                    <div (click)="expandNode(header)">
                        <ng-container *ngIf="headerTemplate==null">
                            <a [ngClass]="(header.selected && !header.childrens)? 'amexio-link-selected' : 'amexio-link-notselected'" >
                                {{header.text}}
                            </a>
                        </ng-container>

                        <ng-template *ngIf="headerTemplate!=null" [ngTemplateOutlet]="headerTemplate" [ngTemplateOutletContext]="{ $implicit: {}, navHeader:header }"></ng-template>

                        <span *ngIf="header.childrens " class="amexio-sidenavbar-child-header fa" [ngClass]="{'fa-angle-up':header.expand,'fa-angle-down':!header.expand}"></span>
                    </div>
                    <ng-container *ngIf="header.childrens && header.expand">
                        <div [ngStyle]="header.hstyle" >
                            <ul  class="navbar-nav">
                                <li class="nav-item" *ngFor="let level1Menu of header.childrens" (click)="menuClick(level1Menu);" [ngClass]="{'amexio-link-selected':(level1Menu.selected && !level1Menu.childrens)  }" >
                                    <ng-container *ngIf="childTemplate==null">
                                        <a [ngClass]="(level1Menu.selected && !level1Menu.childrens)? 'amexio-link-selected' : 'amexio-link-notselected'" >
                                            {{level1Menu.text}}
                                        </a>
                                    </ng-container>
                                    <ng-template *ngIf="childTemplate!=null" [ngTemplateOutlet]="childTemplate" [ngTemplateOutletContext]="{ $implicit: {}, menuHeader:level1Menu }"></ng-template>

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

        <span *ngIf="enableToggleButton && position!='relative' " [style.margin-top]="toPosition"  [ngClass]="{'amexio-sidenavbar-sidenavopenleft':(!right && position!='relative'), 'amexio-sidenavbar-sidenavopenright':right}"  (click)="openNav()">&#9776;</span>

    `,
    styles : [`


        .amexio-link-selected{

        }
        .amexio-link-notselected{

        } /*this is for relative position of sidenavbar*/
        .amexio-sidenavbar-sidenav-relative{
            height: 100%;
            position: relative;
            z-index: 1;
            background-color: #ffffff;
            overflow-x: hidden;
            transition: 0.5s;
            overflow: auto;
        }
        .amexio-sidenav-left {
            height: 100%;
            width: 0;
            position: fixed;
            z-index: 1;

            left: 0;
            background-color: #ffffff;
            overflow-x: hidden;
            transition: 0.5s;
            overflow: auto;
        }


        .amexio-sidenav-left .nav-item{
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid #dddddd;
        }

        .amexio-sidenavbar-subheader .nav-item{
            border: none;
        }

        .amexio-navbarsubmenu-ul li{
            padding: 10px;
        }

        .amexio-sidenavbar-sidenavopenleft{
            position:absolute;
            top:0;
            left:0;
            font-size:30px;
            cursor:pointer
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
            .amexio-sidenav-left {padding-top: 15px;}
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

    @Input()
    position:string;


    @Output()
    selectedNode: any = new EventEmitter<any>();

    menus: any[];

    orgMenus: any[];

    @Input()
    right: boolean;

    elementId: string;

    filterText: string;

    amexioSidenavbarStr:string;

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

    //this is method use for sidebar menu btn position
    getSideNavbarToggleBtnClass(){
        if(!this.right){
            this.amexioSidenavbarStr='amexio-sidenavbar-sidenavopenleft';
        }else if(this.right){
            this.amexioSidenavbarStr='amexio-sidenavbar-sidenavopenright';
        }
    }
    //this is method is for loading css class for side menu position
    getSideNavbarClass(){
        if(!this.right && this.position!='relative' ){
            this.amexioSidenavbarStr='amexio-sidenav-left';
        }else if(this.right){
            this.amexioSidenavbarStr='amexio-sidenavbar-sidenavright';
        }else if(this.position=="relative"){
            this.amexioSidenavbarStr='amexio-sidenavbar-sidenav-relative';
        }
        return this.amexioSidenavbarStr;
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
        if(document.getElementById(this.elementId) && document.getElementById(this.elementId).style){
            document.getElementById(this.elementId).style.width = this.width;
        }

    }

    closeNav() {
        if(document.getElementById(this.elementId) && document.getElementById(this.elementId).style) {
            document.getElementById(this.elementId).style.width = '0';
        }
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
