/**
 * Created by ketangote on 12/1/17.
 */

/*
 Component Name : Amexio sidenav node
 Component Selector : <amexio-sidenav-node>
 Component Description : The Side Nav Bar Component is a familiar side navigation pattern for users. Side nav bar can be placed on left or right side. It can fit as many navigation links as needed, scrolling when the content exceeds the viewport. Take a look at Datastructure format which this component can consume in datasource tab.
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-sidenav-node', templateUrl: './sidenavnode.component.html'
})
export class SideNavNodeComponent implements OnInit {

  /*
Properties 
name : data
datatype : any
version : 4.0 onwards
default : none
description : Local data for sidenav.
*/
  @Input() data: any[];


  /*
Events 
name : onClick
datatype : none
version : none
default : none
description : fires on the click event
*/
  @Output() onClick: any = new EventEmitter<any>();

  /*
Events 
name : nodeClick
datatype : none
version : none
default : none
description : Fire when sidenav bar menu click
*/
  @Output() nodeClick: any = new EventEmitter<any>();


  constructor() {
  }


  ngOnInit() {
  }


  getOnClick(node: any) {
    this.onClick.emit(node);
  }

  activateNode(data: any[], node: any) {
    for (let i = 0; i < data.length; i++) {
      if (node === data[i] && !data[i]['children']) {
        data[i]['active'] = true;
      } else {
        data[i]['active'] = false;
      }

      if (data[i]['children']) {
        this.activateNode(data[i]['children'], node);
      }
    }
  }

  getOnNodeClick(node: any) {
    this.nodeClick.emit(node);
  }
}



