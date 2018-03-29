/**
 * Created by ketangote on 1/4/18.
 */

/*
 Component Name : Amexio BorderLayout
 Component Selector : <amexio-borderlayout>
 Component Description : Amexio border layout lays out a container, arranging and resizing its components to fit in five regions: north, south, east, west, and center..

*/

import {Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {AmexioBorderLayoutItemComponent} from "./borderlayoutitem.component";

@Component({
  selector: 'amexio-borderlayout',
  templateUrl: './borderlayout.component.html'
})
export class AmexioBorderLayoutComponent implements OnInit{


  @ContentChildren(AmexioBorderLayoutItemComponent) layout :QueryList<AmexioBorderLayoutItemComponent>;

  layoutitems : AmexioBorderLayoutItemComponent[];

  borderclass : string ="borderlayout-container";

  constructor()
  {

  }

  ngOnInit(){

  }

  ngAfterContentInit() {
    this.layoutitems = this.layout.toArray();

    this.layoutitems.forEach((item : any) => {
      this.borderclass = this.borderclass + "-"+item.getClassType();

    });
  }

}
