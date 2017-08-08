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
    AfterViewInit
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
            <li style="cursor: pointer" *ngFor="let treeData of data">
                <div >
                    <span class="fa " [ngClass]="{'fa-minus': treeData.expanded, 'fa-plus': (!treeData.expanded && treeData.children)}" (click)="toggle(treeData)"> </span>
                    <span *ngIf="enableCheckBox">
                    <input type="checkbox" [checked]="'checked'?treeData.checked:null" (click)="emitCheckedData(treeData)"/>                    
                  </span>
                    <label style="cursor: pointer" (click)="emitData(treeData)">
                        <ng-container *ngIf="templates == null">
                            {{treeData.text}}
                        </ng-container>
                        <ng-template *ngIf="templates != null" [ngTemplateOutlet]="parentTmp" [ngOutletContext]="{ $implicit: { text: treeData.text } , icon: treeData.icon,node : treeData }"></ng-template>
                    </label>

                </div>
                <div *ngIf="treeData.expanded && treeData.expanded  == true">
                    <ul class="amexio-treeview-ul">
                        <li style="cursor: pointer" *ngFor="let leaf of treeData.children">
                            <div>
                                <span class="fa " [ngClass]="{'fa-minus': leaf.expanded, 'fa-plus': (!leaf.expanded && leaf.children)}" (click)="toggle(leaf)"> </span>

                                <span *ngIf="enableCheckBox"><input type="checkbox" [checked]="'checked'?leaf.checked:null" (click)="emitCheckedData(leaf)"/></span>

                                <label (click)="emitData(leaf)">
                                    <ng-container *ngIf="templates == null">{{ leaf.text }}</ng-container>
                                    <ng-template *ngIf="templates != null" [ngTemplateOutlet]="parentTmp" [ngOutletContext]="{ $implicit: { text: leaf.text }, icon: leaf.icon, node : leaf }"></ng-template>
                                </label>

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
    styleUrls: [
        '../baseclass/loading-mask.css',
        'treeview.custom.css'
    ]
})

export class TreeViewComponent implements  OnInit, AfterViewInit{

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
        else if (this.dataTableBindData){
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

    ngOnChanges(change : SimpleChanges){
        if (change['dataTableBindData']){
            let data = change['dataTableBindData'].currentValue;
            if (data){
                this.setData(data);
            }
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
}

