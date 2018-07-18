/**
 * Created by ketangote on 12/1/17.
 */

/*
 Component Name : Amexio sidenav node
 Component Selector : <amexio-sidenav-node>
 Component Description : The Side Nav Bar Component is a familiar side
 navigation pattern for users. Side nav bar can be placed on left or right side.
 It can fit as many navigation links as needed, scrolling when the content
 exceeds the viewport. Take a look at Datastructure format which this component can consume in datasource tab.
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-sidenav-node', templateUrl: './sidenavnode.component.html',
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
   Properties
   name : enable-drag
   datatype : boolean
   version : 5.0.0 onwards
   default : false
   description : nodes can be dragged
   */
  @Input('enable-drag') enabledrag: boolean;

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

  /*
   Events
   name : onDrag
   datatype : none
   version : 4.2.9
   default : none
   description : Fire when you drag node
   */
  @Output() onDrag: any = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  getOnClick(node: any) {
    this.onClick.emit(node);
  }

  activateNode(data: any[], node: any) {
    for (const i of data) {
      if (node === i && !i['children']) {
        i['active'] = true;
      } else {
        i['active'] = false;
      }

      if (i['children']) {
        this.activateNode(i['children'], node);
      }
    }
  }

  getOnNodeClick(node: any) {
    this.nodeClick.emit(node);
  }

  dragStartEvent(nodeData: any) {
    this.onDrag.emit(nodeData);
  }
}
