
import {
  AfterContentInit,
  Component, ContentChildren, Input, OnInit, Output,
  QueryList
} from '@angular/core';
import {HorizontalTabPaneComponent} from "./horizontaltab.component";
import {TabComponent} from "./tabpill.component";
declare var $ : any;
@Component({
  selector: 'amexio-tab-pane',
  template : `
    
      <div *ngIf="position==1">
        <amexio-horizontal-tab-pane [closable]="closable" [tabs]="tabs" (onSelectTab)="activateTab($event)" >

        </amexio-horizontal-tab-pane>
      </div>


      <div  [ngClass]="tabPosition" style=" padding: 0px;overflow: scroll; "  *ngIf="position==2">
        <amexio-vertical-tab-pane [closable]="closable" [tabs]="tabs" (onSelectTab)="activateTab($event)" [tapPosition]="tapPosition" [verticalText]="verticalText">
        </amexio-vertical-tab-pane>
      </div>

      <div [ngClass]="contentCol"  style="border: 2px solid #cccc ">
        <ng-content ></ng-content>
      </div>
    
  `,
  styles:[
    `
      .tabcontent {
        float: left;
        padding: 0px 12px;
      }      
    
    `
  ]

})
export class TabPaneComponent implements OnInit,AfterContentInit  {

  @Input() closable : boolean;

  @Input() vertical : boolean;

  @Input() tapPosition : string;

  @Input() verticalText : boolean;

  @ContentChildren(TabComponent)  queryTabs: QueryList<TabComponent>;

  tabs : TabComponent[];

  position : number;



  tabPosition : string;

  contentCol : string;

  constructor() {
    this.position = 1;
    this.vertical = false;
    this.tapPosition = "left";
    this.contentCol = "tabcontent col-md-12";
    this.verticalText = false;
  }

  ngOnInit() {
    if(this.vertical){
      this.position = 2;
      this.contentCol = "col-md-10";

      if(this.verticalText && this.tapPosition.toLowerCase() == "left"){
        this.tabPosition = "col-md-1"
      }
      else if(this.tapPosition.toLowerCase() == "right"  && !this.verticalText){
        this.tabPosition = "col-md-2 col-md-push-10"
        this.contentCol = "col-md-10 col-md-pull-2";
      }
      else if(this.tapPosition.toLowerCase() == "right" && this.verticalText){
        this.tabPosition = "col-md-1 col-md-push-11"
        this.contentCol = "col-md-11 col-md-pull-1";
      }

    }
  }

  ngAfterContentInit() {
    this.tabs = this.queryTabs.toArray();
  }


  activateTab(tabId:string){
    let tabs = this.tabs;
     tabs.forEach(tab => {
     tab.active = false;
     if(tab.elementId == tabId)
     tab.active = true;
     });
  }

}
