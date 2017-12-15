/**
 * Created by ketangote on 12/1/17.
 */



import {
  AfterContentInit,
  AfterViewInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, Renderer2,
  ViewChild
} from '@angular/core';
import {AmexioTabPill} from "./tab.pill.component";

@Component({
  selector: 'amexio-tab-view',
  templateUrl : './tab.component.html',
  styleUrls : ['tab.component.scss']
})
export class AmexioTabComponent  implements  OnInit, AfterViewInit,AfterContentInit{

  @Input() closable : boolean;

  @Input() position: string;

  @ViewChild('tab', { read: ElementRef }) public tabs: ElementRef;

  @ContentChildren(AmexioTabPill)  queryTabs: QueryList<AmexioTabPill>;

  tabCollection: AmexioTabPill[];

  showprev : boolean = false;

  shownext : boolean = false;

  content : string;

  constructor(public render: Renderer2){}

  ngOnInit(){

  }

  ngAfterViewInit() {
    if(this.tabs.nativeElement.scrollWidth > this.tabs.nativeElement.clientWidth){
      this.shownext = true;
    }
  }

  ngAfterContentInit() {
    this.tabCollection = this.queryTabs.toArray();
  }

  onTabClick(tab:any){
    for(let i=0;i<this.tabCollection.length;i++){
      if(this.tabCollection[i]=== tab){
        this.tabCollection[i]['active'] = true;
      }else{
        this.tabCollection[i]['active'] = false;
      }
    }

    // this.content = tab.title;
  }

  next(){
    let nxt = this.tabs.nativeElement;
    nxt.scrollLeft=nxt.scrollLeft+200;

    if ((nxt.scrollWidth - nxt.offsetWidth - nxt.scrollLeft ) <= 0) {
      this.shownext=false;
    }
    this.showprev = true;
  }

  previous(){
    let prev = this.tabs.nativeElement;
    prev.scrollLeft=prev.scrollLeft-200;

    if (prev.scrollLeft == 0 ) {
      this.showprev = false;
    }
    this.shownext = true;
  }

  closeTab(tabNode : AmexioTabPill) {
    const newTab : AmexioTabPill[]  = [];
    const tabs = this.tabs;
    let index = 0;
    let tabHighlightIndex = 0;

    this.tabCollection.forEach(tab => {
      tab.active = false;
      if (tab.tabId == tabNode.tabId) {
        tabHighlightIndex = index;
      }
      if (tab.tabId != tabNode.tabId) {
        newTab.push(tab);
      }
      index++;
    });

    if (tabHighlightIndex == newTab.length) {
      tabHighlightIndex--;
    }
    this.activateTab(newTab[tabHighlightIndex].tabId);
    this.tabCollection = newTab;
    if (this.tabCollection.length == 1) {
      this.closable = false;
    }
  }

  activateTab(tabId: number) {
    const tabs = this.tabs;
    this.tabCollection.forEach(tab => {
      tab.active = false;
      if (tab.tabId == tabId) {
        tab.active = true;
      }
    });
  }


}
