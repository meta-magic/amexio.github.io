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
    OnInit, Input, Component, EventEmitter, Output, SimpleChanges, ContentChild, TemplateRef, ChangeDetectorRef,
    AfterViewInit, DoCheck
} from '@angular/core';
import {CommonHttpService} from '../common.http.service';

@Component({
    selector : 'amexio-tree-view',
    template : `
        <div *ngIf="data.length== 0">
            <div class="loading-mask amexio-treeview-loadingmask" >
            </div>
        </div>

        <ul class="amexio-treeview-ul" *ngIf="data.length > 0">
            <li style="cursor: pointer" *ngFor="let treeData of data" >
                <div class="d-flex" style="padding-left: 10px;">
                    <ng-container *ngIf="(!treeData.expanded && treeData.children)">
                        <span class="amexio-treeview-navigation-icons" (click)="toggle(treeData)">&#x2795;</span>
                    </ng-container>
                    <ng-container *ngIf="treeData.expanded">
                        <span class="amexio-treeview-navigation-icons"  (click)="toggle(treeData)">&#x2796;</span>
                    </ng-container>
                    <span *ngIf="enableCheckBox">
                         <input type="checkbox" [checked]="'checked'?treeData.checked:null" (click)="emitCheckedData(treeData)"/>                    
                      </span>
                    <span [ngClass]="(treeData.selected && !treeData.children)? 'amexio-treeview-records-selected' : 'amexio-treeview-records'" (click)="emitData(treeData)">
                        <ng-container *ngIf="templates == null">
                          <label >{{treeData.text}}</label>
                        </ng-container>
                        <ng-template *ngIf="templates != null" [ngTemplateOutlet]="parentTmp" [ngTemplateOutletContext]="{ $implicit: { text: treeData.text } , icon: treeData.icon,node : treeData }"></ng-template>
                      </span>
                </div>
                <div *ngIf="treeData.expanded && treeData.expanded  == true" >
                    <ul class="amexio-treeview-ul">
                        <li style="cursor: pointer" *ngFor="let leaf of treeData.children">
                            <div class="d-flex" style="padding-left: 20px;">
                                <ng-container *ngIf="(!leaf.expanded && leaf.children)">
                                    <span class="amexio-treeview-navigation-icons" (click)="toggle(leaf)">&#x2795;</span>
                                </ng-container>
                                <ng-container *ngIf="leaf.expanded">
                                    <span class="amexio-treeview-navigation-icons"  (click)="toggle(leaf)">&#x2796;</span>
                                </ng-container>

                                <span *ngIf="enableCheckBox"><input type="checkbox" [checked]="'checked'?leaf.checked:null" (click)="emitCheckedData(leaf)"/></span>

                                <span [ngClass]="(leaf.selected && !leaf.children)? 'amexio-treeview-records-selected' : 'amexio-treeview-records'" (click)="emitData(leaf)">
                                    <ng-container *ngIf="templates == null"><label>{{leaf.text}}</label></ng-container>
                                    <ng-template *ngIf="templates != null" [ngTemplateOutlet]="parentTmp" [ngTemplateOutletContext]="{ $implicit: { text: leaf.text }, icon: leaf.icon, node : leaf }"></ng-template>
                              </span>

                            </div>

                            <div *ngIf="leaf.expanded && leaf.expanded  == true">
                                <amexio-tree-view [dataTableBindData]="leaf" [dataReader]="'children'" (selectedRecord)="setSelectedRecord($event)" [templates]="templates" (onTreeNodeChecked)="this.onTreeNodeCheck($event)" [enableCheckBox]="enableCheckBox"></amexio-tree-view>
                            </div>
                        </li>
                    </ul>

                </div>
            </li>
        </ul>`,
    providers : [CommonHttpService],
    styles : [`/**
 A Style Sheet for all form inputs common used classes
 */

    .amexio-treeview-records{
        width: 100%;
    }

    .amexio-treeview-records:hover{
        color: #ffffff;
        background-color: #dddddd;
    }

    .amexio-treeview-records-selected{
        width: 100%;
        color: #ffffff;
        background-color: #dddddd;
    }

    .amexio-treeview-navigation-icons{
        vertical-align: middle;
        font-size: 20px;
        padding-left: 10px;
    }

    .amexio-treeview-loadingmask{
        height: 300px;
        width: 400px;
    }
    .amexio-treeview-ul{
        list-style-type: none;
        padding-left: 10px;
    }
    .amexio-treeview-ul li{
        padding-left: 20px;
    }
    .amexio-treeview-ul li div ul{
        padding-left: 10px;
    }
    /** Form Validations & Icon Positioning **/
    .has-feedback-custom {
        position: relative;
    }
    .has-feedback-custom .form-control {
        padding-right: 47.5px;
    }

    .form-control-feedback-custom {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        display: block;
        width: 38px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        pointer-events: none;
    }

    .has-feedback-custom label ~ .form-control-feedback-custom {
        top: 32px;
    }
    .has-feedback-custom label.sr-only ~ .form-control-feedback-custom {
        top: 0;
    }


    `]
})

export class TreeViewComponent implements  OnInit, AfterViewInit, DoCheck {

    @Input()
    httpUrl : string;

    @Input()
    httpMethod : string;

    @Input()
    dataReader : string;

    @Input()
    dataTableBindData : any;

    @Output()
    selectedRecord : any = new EventEmitter<any>();

    @Input()
    templates : any ;

    @Input()
    headerKey : any;

    @Input()
    cookieName : string;

    @Input()  enableCheckBox = false;

    @ContentChild('amexioTreeTemplate')   parentTmp : TemplateRef<any>;

    @Output() onTreeNodeChecked : any = new EventEmitter<any>();

    data : any[] = [];

    lazyNode : any;

    responseData: any;

    previousValue: any;

    constructor (private  treeViewService : CommonHttpService, private cdf : ChangeDetectorRef){}

    ngOnInit(){

    }

    ngAfterViewInit(){
        if (this.httpMethod && this.httpUrl){

            this.treeViewService.fetchData(this.httpUrl, this.httpMethod).subscribe(
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
        else if (this.dataTableBindData) {
            this.previousValue = JSON.parse(JSON.stringify(this.dataTableBindData));
            this.setData(this.dataTableBindData);
        }

        if (this.parentTmp != null){
            this.templates = {treeNodeTemplate : this.parentTmp};
        }
        else if (this.templates != null){
            this.parentTmp = this.templates.treeNodeTemplate;
            this.cdf.detectChanges();
        }
    }

    ngDoCheck() {
        if (JSON.stringify(this.previousValue) != JSON.stringify(this.dataTableBindData)) {
            this.previousValue = JSON.parse(JSON.stringify(this.dataTableBindData));
            this.setData(this.dataTableBindData);
        }
    }

    setData(httpResponse: any){
        let treedata = this.getResponseData(httpResponse);
        if (treedata){
            this.data = treedata;
        }
    }

    getResponseData(httpResponse : any){
        let responsedata = httpResponse;
        if ((this.dataReader && this.dataReader.length > 0)){
            let dr = this.dataReader.split('.');
            for (let ir = 0 ; ir < dr.length; ir++){
                responsedata = responsedata[dr[ir]];
            }
        }
        return responsedata;
    }
    toggle(treeData : any){
        if (!treeData.leaf)
            treeData.expanded = !treeData.expanded;

        if (treeData.lazy && treeData.children && treeData.children.length <= 0){
            this.lazyNode = treeData;

            this.treeViewService.fetchData(treeData.lazy.httpUrl, treeData.lazy.httpMethod).subscribe(
                response => {
                    this.responseData = response.json();
                },
                error => {
                },
                () => {
                    this.setLazyData(this.responseData);
                }
            );
        }
    }

    setLazyData(httpResponse: any){
        delete this.lazyNode.leaf;
        this.lazyNode['expanded'] = true;
        for (let di = 0 ; di < httpResponse.data.length; di++){
            this.lazyNode.children.push(httpResponse.data[0]);
        }
    }
    setSelectedRecord(treeData : any){

        this.emitData(treeData);
    }

    emitData(treeData : any){
        this.selectedRecord.emit(JSON.parse(JSON.stringify(treeData)));
        this.resetSelected(this.data, treeData.text);
    }

    emitCheckedData(checkedData : any){
        checkedData.checked = !checkedData.checked;

        if (checkedData.checked){
            if (checkedData.hasOwnProperty('children')){
                checkedData.children.forEach((option) => {
                    option.checked = true;
                    if (option.hasOwnProperty('children')){
                        this.setCheckedStatusFromParent(option);
                    }
                });
            }
            this.onTreeNodeChecked.emit(this.data);
        }
        else {
            if (checkedData.hasOwnProperty('children')){
                checkedData.children.forEach((option) => {
                    option.checked = false;
                    if (option.hasOwnProperty('children')){
                        this.searchObject(option);
                    }
                });
            }
            this.onTreeNodeChecked.emit(this.data);
        }

    }


    searchObject(object : any){
        object.children.forEach((childOption) => {
            childOption.checked = false;
            if (childOption.hasOwnProperty('children')){
                this.searchObject(childOption);
            }
        });
    }

    setCheckedStatusFromParent(object : any){
        object.children.forEach((childOption) => {
            childOption.checked = true;
            if (childOption.hasOwnProperty('children')){
                this.setCheckedStatusFromParent(childOption);
            }
        });
    }

    onTreeNodeCheck(data : any){
        this.onTreeNodeChecked.emit(this.data);
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
            if(data[ir].children){
                this.resetSelected(data[ir].children, text);
            }
        }
    }
}

