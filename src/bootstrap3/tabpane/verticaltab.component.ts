/**
 * Created by ketangote on 7/17/17.
 */


import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {TabComponent} from "./tabpill.component";
declare var $ : any;

@Component({
  selector: 'amexio-vertical-tab-pane',
  template : `

    <ul [ngClass]="tapPosition">
      <li *ngFor="let tab of tabs"  [ngClass]="{'active':tab.active}">
        <a (click)="tabActive(tab.elementId)" [attr.id]="tab.elementId">
          <i *ngIf="tab.icon" [ngClass]="tab.icon"></i>
          {{tab.title}}&nbsp;
        </a>        
      </li>
     
    </ul>
 
  `,
  styles :[
    `

      .tabs-left, .tabs-right {
        border-bottom: none;
        padding-top: 2px;
      }
      .tabs-left {
        border-right: 1px solid #ddd;
      }
      .tabs-right {
        border-left: 1px solid #ddd;
      }
      .tabs-left>li, .tabs-right>li {
        float: none;
        margin-bottom: 2px;
      }
      .tabs-left>li {
        margin-right: -1px;
      }
      .tabs-right>li {
        margin-left: -1px;
      }
      .tabs-left>li.active>a,
      .tabs-left>li.active>a:hover,
      .tabs-left>li.active>a:focus {
        border-bottom-color: #ddd;
        border-right-color: transparent;
      }

      .tabs-right>li.active>a,
      .tabs-right>li.active>a:hover,
      .tabs-right>li.active>a:focus {
        border-bottom: 1px solid #ddd;
        border-left-color: transparent;
      }
      .tabs-left>li>a {
        border-radius: 4px 0 0 4px;
        margin-right: 0;
        display:block;
      }
      .tabs-right>li>a {
        border-radius: 0 4px 4px 0;
        margin-right: 0;
      }
      .vertical-text {
        margin-top:50px;
        border: none;
        position: relative;
      }
      .vertical-text>li {
        height: 20px;
        width: 120px;
        margin-bottom: 100px;
      }
      .vertical-text>li>a {
        border-bottom: 1px solid #ddd;
        border-right-color: transparent;
        text-align: center;
        border-radius: 4px 4px 0px 0px;
      }
      .vertical-text>li.active>a,
      .vertical-text>li.active>a:hover,
      .vertical-text>li.active>a:focus {
        border-bottom-color: transparent;
        border-right-color: #ddd;
        border-left-color: #ddd;
      }
      .vertical-text.tabs-left {
        left: -50px;
      }
      .vertical-text.tabs-right {
        right: -50px;
      }

      .vertical-text.tabs-right>li {
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        transform: rotate(90deg);
      }
      .vertical-text.tabs-left>li {
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        transform: rotate(-90deg);
      }      
    `
  ]
})
export class VerticalTabPaneComponent implements OnInit,AfterViewInit {

  @Input() icons: boolean;

  @Input() closable: boolean;

  @Input() tabs: TabComponent[];

  @Input() tapPosition : string;

  @Input() verticalText : boolean;

  @Output() onSelectTab = new EventEmitter(false);

  elementId: string;


  constructor() {
    this.elementId = 'vertical-tabpane-' + new Date().getTime();

  }

  ngOnInit() {
    console.log("tab pos--->"+this.tapPosition);

    if(this.tapPosition.toLowerCase() == "right"){
      this.tapPosition = "nav nav-tabs tabs-right ";
      if(this.verticalText){
        this.tapPosition = "nav nav-tabs tabs-right vertical-text";
      }
    }else if(this.tapPosition.toLowerCase() == "left"){
      this.tapPosition = "nav nav-tabs tabs-left";
      if(this.verticalText){
        this.tapPosition = "nav nav-tabs tabs-left vertical-text";
      }
    }


  }

  tabActive(tabId:string){
    this.onSelectTab.emit(tabId);
  }


  ngAfterViewInit() {

  }

  ngAfterContentInit() {
  }






}
