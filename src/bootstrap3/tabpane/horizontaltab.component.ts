/**
 * Created by ketangote on 7/17/17.
 */



import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {TabComponent} from "./tabpill.component";
declare var $ : any;

@Component({
  selector: 'amexio-horizontal-tab-pane',
  template : `

    <div [attr.id]="elementId" (window:resize)="onResize($event)">
      <div (click)="leftClick()" class="scroller scroller-left" >
        <span style="display: none"  [attr.id]="'left-'+elementId"><i class="glyphicon glyphicon-chevron-left"></i></span>
      </div>
      <div (click)="rightClick()" class="scroller scroller-right">
        <span  style="display: block"  [attr.id]="'right-'+elementId"><i class="glyphicon glyphicon-chevron-right"></i></span>
      </div>

      <div class="wrapper" [attr.id]="'wrapper-'+elementId">
        <ul class="nav nav-tabs list" [attr.id]="'list-'+elementId">
          <li *ngFor="let tab of tabs" [ngClass]="{'active':tab.active}">
            <a (click)="tabActive(tab.elementId)" [attr.id]="tab.elementId" style=" cursor: pointer;">
              <i *ngIf="tab.icon" [ngClass]="tab.icon"></i>
              {{tab.title}}&nbsp;
              <a *ngIf="closable" id="'closable-'+{{tab.elementId}}" style="vertical-align: top; cursor: pointer;" (click)="closeTab(tab.elementId)">×</a>
            </a>

          </li>
        </ul>
      </div>
    </div>

  `,
  styles: [`

    .list {
      position:absolute;
      left:0px;
      top:0px;
      margin-left:12px;
      margin-top:0px;
    }

    .list li{
      display:table-cell;
      position:relative;
      text-align:center;
      cursor:grab;
      cursor:-webkit-grab;
      color:#efefef;
      vertical-align:middle;
    }

    .wrapper {
      position:relative;
      margin:0 auto;
      overflow:hidden;
      padding:5px;
      height: 50px;
    }

    .scroller {
      text-align:center;
      cursor:pointer;
      padding-top:15px;
      vertical-align:middle;
    }

    .scroller-right{
      float:right;
    }

    .scroller-left {
      float:left;
    }

  `]
})
export class HorizontalTabPaneComponent implements OnInit,AfterViewInit {

  @Input()  icons : boolean;

  @Input()  closable : boolean;

  @Input()  tabs : TabComponent[];

  @Output() onSelectTab = new EventEmitter(false);

  elementId : string;


  constructor() {
    this.elementId = 'horizontal-tabpane-'+new Date().getTime();
  }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.reAdjust();
  }

  ngAfterContentInit() {
  }

  tabActive(tabId:string){
    this.onSelectTab.emit(tabId);
  }

  closeTab(elementId :string){
    let newTab  = [];
    let tabs = this.tabs;
    let index = 0;
    let tabHighlightIndex =0;
    debugger;

    tabs.forEach(tab => {
      tab.active = false;
      if(tab.elementId == elementId){
        tabHighlightIndex = index;
      }
      if(tab.elementId != elementId)
      {
        newTab.push(tab);
      }
      index++;
    });

    if(tabHighlightIndex == newTab.length){
      tabHighlightIndex--;
    }
    document.getElementById(elementId).parentNode.removeChild(document.getElementById(elementId));
    this.tabActive(newTab[tabHighlightIndex].elementId);
    this.tabs = newTab;
    if(this.tabs.length ==1){
      this.closable = false;
    }
    this.reAdjust();
  }

  widthOfList(){
    let itemsWidth = 0;
    $('#list-'+this.elementId+ ' li').each(function(){
      var itemWidth = $(this).outerWidth();
      itemsWidth+=itemWidth;
    });
    return itemsWidth;
  }

  rightClick(){
    debugger;
    this.navAdjust("left-"+this.elementId,"block");
    let ts = document.getElementById("wrapper-"+this.elementId);
    ts.scrollLeft +=200;

    if((ts.scrollWidth-ts.offsetWidth-ts.scrollLeft )<=0){
      this.navAdjust("right-"+this.elementId,"none");
    }
  }

  leftClick(){
    this.navAdjust("right-"+this.elementId,"block");
    let ts = document.getElementById("wrapper-"+this.elementId);
    ts.scrollLeft -=200;
    if(ts.scrollLeft ==0 ){
      this.navAdjust("left-"+this.elementId,"none");
    }
  }

  reAdjust(){
    let listWidth1 = Math.round(this.widthOfList())+1;
    let listWidth  = Math.round($('#'+this.elementId).outerWidth())+10;

    console.log(listWidth +"--"+listWidth1);

    if(listWidth1>listWidth){
      listWidth = listWidth1;
      this.navAdjust("right-"+this.elementId,"block");
    }else{
      this.navAdjust("right-"+this.elementId,"none");
      this.navAdjust("left-"+this.elementId,"none");
    }
    $("#list-"+this.elementId).css('minWidth',listWidth+'px');
  }

  navAdjust(elementId:string, display:string){
    $("#"+elementId).css('display',display);
  }


  onResize(event:any){
    this.reAdjust();
  }

}
