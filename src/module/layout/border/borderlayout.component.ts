/**
 * Created by ketangote on 1/4/18.
 */

import {Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {BorderLayoutItemComponent} from "./borderlayoutitem.component";

@Component({
  selector: 'amexio-borderlayout',
  templateUrl: './borderlayout.component.html'
})
export class BorderLayoutComponent implements OnInit{


  @ContentChildren(BorderLayoutItemComponent) layout :QueryList<BorderLayoutItemComponent>;

  layoutitems : BorderLayoutItemComponent[];

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
