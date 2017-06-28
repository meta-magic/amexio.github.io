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
    OnInit, Input, Component, EventEmitter, Output, SimpleChanges, ContentChild,
    TemplateRef, ChangeDetectorRef
} from "@angular/core";
import {TreeViewService} from "./treeview.service";

@Component({
    selector : 'amexio-tree-view',
    template : `
        <div *ngIf="data.length== 0">
            <div class="loading-mask"  style="height: 300px;width: 400px;">

            </div>
        </div>

        <ul style="list-style-type: none;" *ngIf="data.length > 0">
            <li style="cursor: pointer" *ngFor="let treeData of data">
                <div >
                    <span [ngClass]="{'glyphicon glyphicon-minus': treeData.expanded, 'glyphicon glyphicon-plus': (!treeData.expanded && treeData.children)}" (click)="toggle(treeData)"> </span>
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
                    <ul style="list-style-type: none;">
                        <li style="cursor: pointer" *ngFor="let leaf of treeData.children">
                            <div>
                                <span [ngClass]="{'glyphicon glyphicon-minus': leaf.expanded, 'glyphicon glyphicon-plus': (!leaf.expanded && leaf.children)}" (click)="toggle(leaf)"> </span>

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
    providers :[TreeViewService],
    styles : [`
        .loading-mask {
            position: relative;
        }

        /*
        Because we set .loading-mask relative, we can span our ::before
        element over the whole parent element
        */
        .loading-mask::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.25);
        }

        /*
        Spin animation for .loading-mask::after
        */
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(359deg);
            }
        }

        /*
        The loading throbber is a single spinning element with three
        visible borders and a border-radius of 50%.
        Instead of a border we could also use a font-icon or any
        image using the content attribute.
        */
        .loading-mask::after {
            content: "";
            position: absolute;
            border-width: 3px;
            border-style: solid;
            border-color: transparent rgb(255, 255, 255) rgb(255, 255, 255);
            border-radius: 50%;
            width: 24px;
            height: 24px;
            top: calc(50% - 12px);
            left: calc(50% - 12px);
            animation: 1s linear 0s normal none infinite running spin;
            filter: drop-shadow(0 0 2 rgba(0, 0, 0, 0.33));
        }

        .hiderow{
            visibility: hidden
        }

        .showrow{
            visibility: visible;
        }
    `]
})

export class TreeViewComponent implements  OnInit{

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

    @Input()  enableCheckBox : boolean = false;

    @ContentChild('amexioTreeTemplate')   parentTmp : TemplateRef<any>;

    @Output() onTreeNodeChecked : any = new EventEmitter<any>();

    data : any[] = [];

    lazyNode : any;

    constructor (private  treeViewService : TreeViewService,private cdf : ChangeDetectorRef){}

    ngOnInit(){

    }

    ngAfterViewInit(){
        if(this.httpMethod && this.httpUrl){
            this.treeViewService.fetchData(this,this.httpUrl,this.httpMethod);
        }
        else if(this.dataTableBindData){
            this.setData(this.dataTableBindData);
        }

        if(this.parentTmp != null){
            this.templates = {treeNodeTemplate : this.parentTmp};
        }
        else if(this.templates != null){
            this.parentTmp = this.templates.treeNodeTemplate;
            this.cdf.detectChanges();
        }
    }

    ngOnChanges(change : SimpleChanges){
        if(change['dataTableBindData']){
            let data = change['dataTableBindData'].currentValue;
            if(data){
                this.setData(data)
            }
        }
    }

    setData(httpResponse: any){
        let treedata = this.getResponseData(httpResponse);
        if(treedata){
            this.data = treedata;
        }
    }

    getResponseData(httpResponse : any){
        let responsedata = httpResponse;
        let dr = this.dataReader.split(".");
        for(let ir = 0 ; ir<dr.length; ir++){
            responsedata = responsedata[dr[ir]];
        }
        return responsedata;
    }

    toggle(treeData : any){
        if(!treeData.leaf)
            treeData.expanded = !treeData.expanded;

        if(treeData.lazy && treeData.children && treeData.children.length<=0){
            this.lazyNode = treeData;
            this.treeViewService.fetchLazyData(this,treeData.lazy.httpUrl,treeData.lazy.httpMethod);
        }
    }

    setLazyData(httpResponse: any){
        delete this.lazyNode.leaf;
        this.lazyNode['expanded'] = true;
        for(let di = 0 ; di < httpResponse.data.length; di++){
            this.lazyNode.children.push(httpResponse.data[0]);
        }
    }
    setSelectedRecord(treeData : any){
        this.emitData(treeData);
    }

    emitData(treeData :any){
        this.selectedRecord.emit(JSON.parse(JSON.stringify(treeData)));
    }

    emitCheckedData(checkedData :any){
        checkedData.checked = !checkedData.checked;
        if(checkedData.hasOwnProperty('children')){
            checkedData.children.forEach((option)=>{
                option.checked = !option.checked;
                if(option.hasOwnProperty('children')){
                    this.searchObject(option);
                }
            });
        }
        this.onTreeNodeChecked.emit(this.data)
    }


    searchObject(object : any){
        object.children.forEach((childOption)=>{
            childOption.checked = !childOption.checked;
            if(childOption.hasOwnProperty('children')){
                this.searchObject(childOption);
            }
        })
    }

    onTreeNodeCheck(data : any){
        this.onTreeNodeChecked.emit(this.data)
    }
}

